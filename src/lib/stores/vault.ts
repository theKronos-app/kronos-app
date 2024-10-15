import { writable } from "svelte/store";
import { createStore } from "@tauri-apps/plugin-store";

export interface AppState {
	vaultPath: string | null;
}

const initialState: AppState = {
	vaultPath: null,
};

export const appState = writable<AppState>(initialState);

let tauriStore: Awaited<ReturnType<typeof createStore>>;

export async function initializeStore() {
	tauriStore = await createStore("app_store.bin");
	const storedState = await tauriStore.get<AppState>("appState");
	if (storedState) {
		appState.set(storedState);
	}
}

export async function saveStore(state: AppState) {
	if (tauriStore) {
		await tauriStore.set("appState", state);
		await tauriStore.save();
	}
}

export async function updateVaultPath(path: string) {
	appState.update((state) => ({ ...state, vaultPath: path }));
	await saveStore({ ...appState, vaultPath: path });
}
