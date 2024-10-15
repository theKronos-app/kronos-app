import { writable } from "svelte/store";
import { createStore } from "@tauri-apps/plugin-store";

export interface Vault {
	id: string;
	name: string;
	path: string;
}

export interface AppState {
	vaults: Vault[];
	currentVaultId: string | null;
}

const initialState: AppState = {
	vaults: [],
	currentVaultId: null,
};

export const appState = writable<AppState>(initialState);

let tauriStore: Awaited<ReturnType<typeof createStore>>;

export async function initializeStore() {
	tauriStore = await createStore("app_store.bin");
	const storedState = await tauriStore.get<AppState>("appState");
	if (storedState) {
		appState.set(storedState);
		return storedState;
	}
	await saveStore(initialState);
	return initialState;
}

export async function saveStore(state: AppState) {
	if (tauriStore) {
		await tauriStore.set("appState", state);
		await tauriStore.save();
	}
}

export async function addVault(vault: Vault) {
	return new Promise<void>((resolve) => {
		appState.update((state) => {
			const newState = {
				...state,
				vaults: Array.isArray(state.vaults)
					? [...state.vaults, vault]
					: [vault],
				currentVaultId: state.currentVaultId || vault.id,
			};
			saveStore(newState);
			resolve();
			return newState;
		});
	});
}

export async function switchVault(vaultId: string) {
	return new Promise<void>((resolve) => {
		appState.update((state) => {
			const newState = { ...state, currentVaultId: vaultId };
			saveStore(newState);
			resolve();
			return newState;
		});
	});
}

export async function getState(): Promise<AppState> {
	return new Promise((resolve) => {
		let unsubscribe: () => void;
		unsubscribe = appState.subscribe((state) => {
			if (unsubscribe) {
				unsubscribe();
			}
			resolve(state);
		});
	});
}

// Add this new function for resetting the store in tests
export function resetStore() {
	appState.set(initialState);
}
