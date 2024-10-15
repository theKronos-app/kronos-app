<script lang="ts">
import { onMount } from "svelte";
import * as dialog from "@tauri-apps/plugin-dialog";
import * as fs from "@tauri-apps/plugin-fs";
import * as path from "@tauri-apps/api/path";
import { appState, addVault, initializeStore } from "$lib/stores/vault";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "$lib/components/ui/card";
import { Button } from "$lib/components/ui/button";
import { Input } from "$lib/components/ui/input";
import { FolderOpen } from "lucide-svelte";

let isLoading = false;
let vaultName = "";
let showSetup = true;

onMount(async () => {
	const initialState = await initializeStore();
	if (initialState.vaults && initialState.vaults.length > 0) {
		showSetup = false;
	}
});

async function selectVaultLocation() {
	if (!vaultName.trim()) {
		await dialog.message("Please enter a vault name.", {
			title: "Error",
			type: "error",
		});
		return;
	}

	isLoading = true;
	try {
		const selected = await dialog.open({
			directory: true,
			multiple: false,
			title: "Select Vault Location",
		});

		if (selected) {
			const vaultDir = await path.join(selected as string, vaultName);
			await fs.mkdir(vaultDir, { recursive: true });
			const newVault = {
				id: crypto.randomUUID(),
				name: vaultName,
				path: vaultDir,
			};
			await addVault(newVault);
			showSetup = false;
		}
	} catch (error) {
		await dialog.message("Error creating vault. Please try again.", {
			title: "Error",
			type: "error",
		});
	} finally {
		isLoading = false;
	}
}
</script>

{#if showSetup}
  <div class="flex items-center justify-center min-h-screen bg-background">
    <Card class="w-[350px]">
      <CardHeader>
        <CardTitle class="text-2xl font-bold">Welcome to Kronos</CardTitle>
        <CardDescription>
          Set up your first vault to get started.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form on:submit|preventDefault={selectVaultLocation} class="space-y-4">
          <div class="space-y-2">
            <label for="vault-name" class="text-sm font-medium">Vault Name</label>
            <Input id="vault-name" bind:value={vaultName} placeholder="My Vault" required />
          </div>
        </form>
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
            <span>Create Vault</span>
          {/if}
        </Button>
      </CardFooter>
    </Card>
  </div>
{:else}
  <slot />
{/if}
