<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import { Editor } from "@tiptap/core";
  import StarterKit from "@tiptap/starter-kit";
  import { Markdown } from "tiptap-markdown";
  import * as fs from "@tauri-apps/plugin-fs";
  import * as path from "@tauri-apps/api/path";

  import { appState } from "$lib/stores/vault";

  let element: HTMLElement;
  let editor: Editor;

  onMount(async () => {
    editor = new Editor({
      element: element,
      extensions: [StarterKit, Markdown],
      editorProps: {
        attributes: {
          class:
            "prose dark:prose-invert prose-sm sm:prose-base lg:prose-lg xl:prose-xl max-w-none focus:outline-none scroll-smooth",
        },
      },
    });
  });

  onDestroy(() => {
    if (editor) {
      editor.destroy();
    }
  });
</script>

<div class="h-full w-full flex flex-col">
  <div class="flex-grow"><div bind:this={element} /></div>
</div>
