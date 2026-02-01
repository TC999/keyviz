import { KeyOverlay } from "@/components/key-overlay";
import { MouseOverlay } from "@/components/mouse-overlay";
import { MONITOR_MODE_EACH } from "@/lib/monitors";
import { KEY_EVENT_STORE, KeyEventStore, useKeyEvent } from "@/stores/key_event";
import { KEY_STYLE_STORE, KeyStyleStore, useKeyStyle } from '@/stores/key_style';
import { listenForUpdates } from '@/stores/sync';
import { EventPayload } from "@/types/event";
import { invoke } from "@tauri-apps/api/core";
import { listen } from "@tauri-apps/api/event";
import { availableMonitors, getCurrentWindow, primaryMonitor } from "@tauri-apps/api/window";
import { useEffect, useState, } from "react";

type PersistApi = {
  hasHydrated?: () => boolean;
  onFinishHydration?: (cb: () => void) => () => void;
};

export function Visualization() {
  const monitor = useKeyStyle((state) => state.appearance.monitor);
  const onEvent = useKeyEvent((state) => state.onEvent);
  const tick = useKeyEvent((state) => state.tick);

  const [keyStyleHydrated, setKeyStyleHydrated] = useState(() => {
    const persist = (useKeyStyle as unknown as { persist?: PersistApi }).persist;
    return persist?.hasHydrated?.() ?? true;
  });

  const [monitorRects, setMonitorRects] = useState<Array<{
    key: string;
    left: number;
    top: number;
    width: number;
    height: number;
  }>>([]);

  // listening for input events
  const [isListening, setIsListening] = useState(true);

  useEffect(() => {
    const unlistenPromises = [
      // ───────────── input event listener ─────────────
      listen<EventPayload>("input-event", (event) => onEvent(event.payload)),
      // ───────────── store sync ─────────────
      listenForUpdates<KeyEventStore>(KEY_EVENT_STORE, useKeyEvent.setState),
      listenForUpdates<KeyStyleStore>(KEY_STYLE_STORE, useKeyStyle.setState),
      // ───────────── settings window open/close ─────────────
      listen<boolean>("settings-window", (event) => {
        useKeyEvent.setState({ settingsOpen: event.payload });
      }),
      // ───────────── listener toggle ─────────────
      listen<boolean>("listening-toggle", (event) => setIsListening(event.payload)),
    ];
    const id = setInterval(tick, 250);

    return () => {
      clearInterval(id);
      unlistenPromises.forEach((p) => p.then((f) => f()));
    };
  }, []);

  useEffect(() => {
    const persist = (useKeyStyle as unknown as { persist?: PersistApi }).persist;
    if (!persist?.onFinishHydration) {
      setKeyStyleHydrated(true);
      return;
    }
    if (persist.hasHydrated?.()) {
      setKeyStyleHydrated(true);
      return;
    }
    return persist.onFinishHydration(() => setKeyStyleHydrated(true));
  }, []);

  useEffect(() => {
    if (!keyStyleHydrated) {
      return;
    }

    let cancelled = false;

    const set_monitor = async () => {
      let monitorName = monitor;
      if (!monitorName) {
        const primary = await primaryMonitor();
        if (cancelled) return;
        monitorName = primary?.name ?? "";
      }
      if (!monitorName) return;
      await invoke("set_main_window_monitor", { monitorName });

      if (monitorName !== MONITOR_MODE_EACH) {
        setMonitorRects([]);
        return;
      }

      const [monitors, scale] = await Promise.all([
        availableMonitors(),
        getCurrentWindow().scaleFactor(),
      ]);
      if (monitors.length === 0 || scale <= 0) {
        setMonitorRects([]);
        return;
      }

      const bounds = monitors.reduce(
        (acc, m) => ({
          minX: Math.min(acc.minX, m.position.x),
          minY: Math.min(acc.minY, m.position.y),
        }),
        { minX: Infinity, minY: Infinity }
      );

      setMonitorRects(monitors.map((m, index) => ({
        key: m.name ?? index.toString(),
        left: (m.position.x - bounds.minX) / scale,
        top: (m.position.y - bounds.minY) / scale,
        width: m.size.width / scale,
        height: m.size.height / scale,
      })));
    }
    set_monitor();
    return () => {
      cancelled = true;
    };
  }, [monitor, keyStyleHydrated]);

  if (!isListening) return null;

  return <div className="w-screen h-screen relative overflow-hidden">
    <MouseOverlay />
    {
      monitor === MONITOR_MODE_EACH && monitorRects.length > 0
        ? monitorRects.map((rect) => (
          <div
            key={rect.key}
            className="absolute top-0 left-0 overflow-hidden"
            style={{
              transform: `translate3d(${rect.left}px, ${rect.top}px, 0)`,
              width: rect.width,
              height: rect.height,
            }}
          >
            <KeyOverlay />
          </div>
        ))
        : <KeyOverlay />
    }
  </div>;
}