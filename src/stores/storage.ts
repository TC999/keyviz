import { invoke } from '@tauri-apps/api/core';
import { getCurrentWindow } from '@tauri-apps/api/window';
import { load } from '@tauri-apps/plugin-store';
import { StateStorage } from 'zustand/middleware';

// only allow writes from the settings window
const isSender = getCurrentWindow().label === "settings";

const portablePath = await invoke<string | null>('get_portable_store_path');
const store = await load(portablePath ?? 'store.json', {
    autoSave: 1000,
    defaults: {},
});

//create the storage adapter for Zustand
export const tauriStorage: StateStorage = {
    getItem: async (name: string): Promise<string | null> => {
        return (await store.get<string>(name)) ?? null;
    },

    setItem: async (name: string, value: string): Promise<void> => {
        if (!isSender) return;
        await store.set(name, value);
    },
    
    removeItem: async (name: string): Promise<void> => {
        if (!isSender) return;
        await store.delete(name);
    },
};