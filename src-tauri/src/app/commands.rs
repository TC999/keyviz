use std::sync::Mutex;

use tauri::{Manager, PhysicalPosition, PhysicalSize};

use crate::app::state::AppState;

const MONITOR_MODE_MERGED: &str = "__keyviz_monitor_merged__";
const MONITOR_MODE_EACH: &str = "__keyviz_monitor_each__";

#[tauri::command]
pub fn log(message: String) {
    println!("[LOG] {}", message);
}

#[tauri::command]
pub fn set_toggle_shortcut(app: tauri::AppHandle, shortcut: Vec<String>) {
    let state = app.state::<Mutex<AppState>>();
    let mut app_state = state.lock().unwrap();
    app_state.toggle_shortcut = shortcut;
}

#[tauri::command]
pub fn set_main_window_monitor(app: tauri::AppHandle, monitor_name: String) {
    let state = app.state::<Mutex<AppState>>();
    let mut app_state = state.lock().unwrap();

    let is_special = monitor_name == MONITOR_MODE_MERGED || monitor_name == MONITOR_MODE_EACH;

    if !is_special && app_state.monitor_name == Some(monitor_name.clone()) {
        return;
    }

    if let Some(window) = app.get_webview_window("main") {
        let monitors = window.available_monitors().unwrap_or_default();

        if is_special {
            let mut min_x = i32::MAX;
            let mut min_y = i32::MAX;
            let mut max_x = i32::MIN;
            let mut max_y = i32::MIN;

            for monitor in &monitors {
                let position = monitor.position();
                let size = monitor.size();
                min_x = min_x.min(position.x);
                min_y = min_y.min(position.y);
                max_x = max_x.max(position.x + size.width as i32);
                max_y = max_y.max(position.y + size.height as i32);
            }

            if min_x == i32::MAX || min_y == i32::MAX || max_x == i32::MIN || max_y == i32::MIN {
                return;
            }

            // Update window
            window
                .set_position(PhysicalPosition { x: min_x, y: min_y })
                .unwrap_or(());
            window
                .set_size(PhysicalSize {
                    width: (max_x - min_x) as u32,
                    height: (max_y - min_y) as u32,
                })
                .unwrap_or(());

            // Update AppState
            app_state.monitor_name = Some(monitor_name.clone());
            app_state.monitor_scale = window.scale_factor().unwrap_or(1.0);
            app_state.monitor_position = (min_x, min_y);
            return;
        }

        let target_monitor = monitors.iter().find(|m| m.name() == Some(&monitor_name));

        if let Some(monitor) = target_monitor {
            let position = monitor.position();
            let size = monitor.size();
            let scale = monitor.scale_factor();

            // Update AppState
            app_state.monitor_name = Some(monitor_name.clone());
            app_state.monitor_scale = scale;
            app_state.monitor_position = (position.x, position.y);

            // Update window
            window
                .set_position(PhysicalPosition {
                    x: position.x,
                    y: position.y,
                })
                .unwrap_or(());
            window
                .set_size(PhysicalSize {
                    width: size.width,
                    height: size.height,
                })
                .unwrap_or(());
        }
    }
}
