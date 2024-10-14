<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { Menu } from "lucide-svelte";
  import { Button } from "$lib/components/ui/button/index.js";
  import type { PaneAPI } from "paneforge";

  export let sidebar: PaneAPI;

  const dispatch = createEventDispatcher();

  function handle_toggle() {
    dispatch("toggleSidebar");
    // sidebar should also exapnd/collapse

    if (sidebar.isCollapsed()) {
      sidebar.expand();
    } else {
      sidebar.collapse();
    }
  }
</script>

<header
  class="flex items-center px-4 h-14 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
>
  <Button variant="ghost" size="icon" class="mr-4" on:click={handle_toggle}>
    <Menu size={20} />
    <span class="sr-only">Toggle menu</span>
  </Button>
  <h1 class="text-lg font-semibold">Kronos</h1>
</header>
