<script lang="ts">
import { writable } from "svelte/store";
import Header from "@/components/Header.svelte";
import Sidebar from "@/components/Sidebar.svelte";
import * as Resizable from "$lib/components/ui/resizable/index.js";
import "../app.css";
import type { PaneAPI } from "paneforge";
import { windowSizeStore } from "svelte-legos";
import VaultSetup from "@/components/VaultSetup.svelte";

const window_size = windowSizeStore();
const is_collapsed = writable(true);

let sidebar: PaneAPI;

$: is_mobile = $window_size.width < 768;

const nav_collapsed_size = 3; // in rem
const mobile_nav_collapsed_size = 0;
const nav_expanded_size = 20; // in rem

function toggle_sidebar() {
	is_collapsed.update((value) => !value);
}
</script>

<VaultSetup>
  <div class="flex flex-col h-screen overflow-hidden">
    <Header on:toggleSidebar={toggle_sidebar} {sidebar} />
    <Resizable.PaneGroup direction="horizontal" class="h-[calc(100vh-3.5rem)]">
      {#if is_mobile}
        <Resizable.Pane
          defaultSize={nav_expanded_size}
          minSize={mobile_nav_collapsed_size}
          maxSize={nav_expanded_size}
          bind:pane={sidebar}
          collapsible={true}
          collapsedSize={mobile_nav_collapsed_size}
          onCollapse={() => ($is_collapsed = true)}
          onExpand={() => ($is_collapsed = false)}
          class="transition-all duration-300 ease-in-out"
        >
          <Sidebar isCollapsed={is_collapsed} />
        </Resizable.Pane>
      {:else}
        <Resizable.Pane
          defaultSize={nav_expanded_size}
          minSize={nav_collapsed_size}
          maxSize={nav_expanded_size}
          bind:pane={sidebar}
          collapsible={true}
          collapsedSize={nav_collapsed_size}
          onCollapse={() => ($is_collapsed = true)}
          onExpand={() => ($is_collapsed = false)}
          class="transition-all duration-300 ease-in-out"
        >
          <Sidebar isCollapsed={is_collapsed} />
        </Resizable.Pane>
      {/if}
      <Resizable.Handle />
      <Resizable.Pane>
        <main class="h-full p-6 overflow-auto">
          <slot />
        </main>
      </Resizable.Pane>
    </Resizable.PaneGroup>
  </div>
</VaultSetup>

<style>
  :global(body) {
    @apply m-0 p-0 font-sans bg-background text-foreground;
  }
</style>
