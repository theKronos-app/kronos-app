import { expect, test, mock, beforeEach } from "bun:test";
import {
	initializeStore,
	addVault,
	switchVault,
	getState,
	resetStore,
} from "./vault";

// Mock Tauri's createStore function
const mockCreateStore = mock(() => ({
	get: mock(async () => null),
	set: mock(async () => {}),
	save: mock(async () => {}),
}));

mock.module("@tauri-apps/plugin-store", () => ({
	createStore: mockCreateStore,
}));

beforeEach(() => {
	resetStore();
});

test("initializeStore initializes with empty state when no stored state", async () => {
	const initialState = await initializeStore();
	expect(initialState).toEqual({ vaults: [], currentVaultId: null });
});

test("addVault adds a new vault and sets it as current", async () => {
	await initializeStore();
	const newVault = { id: "1", name: "Test Vault", path: "/test/path" };
	await addVault(newVault);
	const state = await getState();
	expect(state.vaults).toEqual([newVault]);
	expect(state.currentVaultId).toBe("1");
});

test("switchVault changes the current vault", async () => {
	await initializeStore();
	const vault1 = { id: "1", name: "Vault 1", path: "/path1" };
	const vault2 = { id: "2", name: "Vault 2", path: "/path2" };
	await addVault(vault1);
	await addVault(vault2);
	await switchVault("2");
	const state = await getState();
	expect(state.currentVaultId).toBe("2");
	expect(state.vaults).toEqual([vault1, vault2]);
});

test("addVault handles null or undefined vaults array", async () => {
	// Reset the store to a state where vaults is undefined
	resetStore();
	await initializeStore();

	const newVault = { id: "1", name: "Test Vault", path: "/test/path" };
	await addVault(newVault);
	const state = await getState();
	expect(state.vaults).toEqual([newVault]);
	expect(state.currentVaultId).toBe("1");
});
