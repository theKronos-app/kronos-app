<script lang="ts">
import { onMount } from "svelte";
import * as dialog from "@tauri-apps/plugin-dialog";
import * as fs from "@tauri-apps/plugin-fs";

import * as path from "@tauri-apps/api/path";
import { writable } from "svelte/store";
import { appState, updateVaultPath } from "$lib/stores/vault";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "$lib/components/ui/card";
import { Button } from "$lib/components/ui/button";
import { FolderOpen } from "lucide-svelte";

let isSetup = false;
const isLoading = false;

$: vaultPath = $appState.vaultPath;

onMount(async () => {
	try {
		const appDataDir = await path.appDataDir();
		const configPath = await path.join(appDataDir, "kronos_config.json");
		const config = await fs.readTextFile(configPath);
		const parsedConfig = JSON.parse(config);
		updateVaultPath(parsedConfig.vaultPath);
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
			updateVaultPath(vaultDir);
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
  <div class="flex items-center justify-center min-h-screen bg-background">
    <Card class="w-[350px]">
      <CardHeader>
        <CardTitle class="text-2xl font-bold">Welcome to Kronos</CardTitle>
        <CardDescription>
          Choose a location for your vault to get started.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p class="text-sm text-muted-foreground mb-4">
          Your vault is where all your notes and tasks will be stored securely on your device.
        </p>
      </CardContent>
      <CardFooter>
        <Button 
          on:click={selectVaultLocation} 
          class="w-full" 
          variant="default"
          disabled={isLoading}
        >
          {#if isLoading}
            <span class="mr-2">Setting up...</span>
          {:else}
            <FolderOpen class="mr-2 h-4 w-4" />
            <span>Select Vault Location</span>
          {/if}
        </Button>
      </CardFooter>
    </Card>
  </div>
{:else}
  <slot />
{/if}
