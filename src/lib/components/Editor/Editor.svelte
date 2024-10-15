<script>
  // @ts-nocheck

  import { onMount, onDestroy } from "svelte";
  import { Editor } from "@tiptap/core";
  import StarterKit from "@tiptap/starter-kit";
  import { Markdown } from "tiptap-markdown";

  let element;
  let editor;

  onMount(() => {
    editor = new Editor({
      element: element,
      extensions: [StarterKit, Markdown],
      editorProps: {
        attributes: {
          class:
            "prose dark:prose-invert prose-sm sm:prose-base lg:prose-lg xl:prose-xl max-w-none focus:outline-none scroll-smooth	",
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

<div class="h-full w-full"><div bind:this={element} /></div>
