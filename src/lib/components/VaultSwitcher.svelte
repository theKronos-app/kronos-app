<script lang="ts">
  import { appState, switchVault, type Vault } from "$lib/stores/vault";
  import { Button } from "$lib/components/ui/button";
  import * as DropdownMenu from "$lib/components/ui/dropdown-menu";
  import { Check, ChevronsUpDown } from "lucide-svelte";

  let currentVault: Vault | undefined;

  $: {
    currentVault = $appState.vaults.find(
      (v) => v.id === $appState.currentVaultId,
    );
  }

  function handleVaultSwitch(vaultId: string) {
    switchVault(vaultId);
  }
</script>

<DropdownMenu.Root>
  <DropdownMenu.Trigger asChild>
    <Button variant="outline" class="w-full justify-between">
      {currentVault?.name ?? "Select vault"}
      <ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
    </Button>
  </DropdownMenu.Trigger>
  <DropdownMenu.Content class="w-[200px]">
    <DropdownMenu.Group>
      {#each $appState.vaults as vault (vault.id)}
        <DropdownMenu.Item on:click={() => handleVaultSwitch(vault.id)}>
          <Check
            class="mr-2 h-4 w-4"
            opacity={vault.id === $appState.currentVaultId ? 1 : 0}
          />
          {vault.name}
        </DropdownMenu.Item>
      {/each}
    </DropdownMenu.Group>
  </DropdownMenu.Content>
</DropdownMenu.Root>
