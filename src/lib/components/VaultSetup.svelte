<script lang="ts">
import { onMount } from "svelte";
import * as dialog from "@tauri-apps/plugin-dialog";
import * as fs from "@tauri-apps/plugin-fs";

import * as path from "@tauri-apps/api/path";
import { writable } from "svelte/store";
import { appState } from "$lib/stores/vault";

let isSetup = false;

$: vaultPath = $appState.vaultPath;

onMount(async () => {
	try {
		const appDataDir = await path.appDataDir();
		const configPath = await path.join(appDataDir, "kronos_config.json");
		const config = await fs.readTextFile(configPath);
		const parsedConfig = JSON.parse(config);
		vaultPath.set(parsedConfig.vaultPath);
		isSetup = true;
	} catch (error) {
		console.log("No existing configuration found");
	}
});

async function selectVaultLocation() {
	try {
		const selected = await dialog.open({
			directory: true,
			multiple: false,
			title: "Select Vault Location",
		});

		if (selected) {
			const vaultDir = await path.join(selected as string, "kronos");
			await fs.mkdir(vaultDir, { recursive: true });
			vaultPath.set(vaultDir);

			const appDataDir = await path.appDataDir();
			const configPath = await path.join(appDataDir, "kronos_config.json");
			await fs.writeTextFile(
				configPath,
				JSON.stringify({ vaultPath: vaultDir }),
			);
			isSetup = true;
		}
	} catch (error) {
		console.error("Error selecting vault location:", error);
	}
}
</script>

{#if !isSetup}
  <div class="flex flex-col items-center justify-center h-full">
    <h1 class="text-2xl font-bold mb-4">Welcome to Kronos</h1>
    <p class="mb-4">Please select a location for your vault:</p>
    <button
      class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      on:click={selectVaultLocation}
    >
      Select Vault Location
    </button>
  </div>
{:else}
  <slot />
{/if}
