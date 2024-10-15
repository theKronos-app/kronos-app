<script lang="ts">
  import { onMount } from "svelte";
  import Editor from "@/components/Editor/Editor.svelte";
  import { appState, initializeStore, saveStore } from "$lib/stores/vault";

  let stateLoaded = false;

  onMount(async () => {
    await initializeStore();
    stateLoaded = true;
  });

  $: if (stateLoaded && $appState) {
    saveStore($appState);
  }

  // appState.update((state) => ({ ...state, vaultPath: "whateves" }));
  // saveStore($appState);

  console.log($appState.vaultPath);
</script>

<div class="h-full py-6 px-2 my-6">
  hello

  <Editor />
</div>
