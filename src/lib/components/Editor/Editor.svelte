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
let currentFile: string | null = null;

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
		onUpdate: ({ editor }) => {
			if (currentFile) {
				saveFile(currentFile, editor.getHTML());
			}
		},
	});
});

onDestroy(() => {
	if (editor) {
		editor.destroy();
	}
});

$: vaultPath = $appState.vaultPath;

async function loadFile(filePath: string) {
	try {
		const content = await fs.readTextFile(filePath);
		editor.commands.setContent(content);
		currentFile = filePath;
	} catch (error) {
		console.error("Error loading file:", error);
	}
}

async function saveFile(filePath: string, content: string) {
	try {
		await fs.writeTextFile(filePath, content);
	} catch (error) {
		console.error("Error saving file:", error);
	}
}

async function createNewFile() {
	const newFilePath = await path.join(vaultPath, `new_note_${Date.now()}.md`);
	await fs.writeTextFile(newFilePath, "");
	loadFile(newFilePath);
}
</script>

<div class="h-full w-full flex flex-col">
  <div class="mb-4">
    <button
      class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
      on:click={createNewFile}
    >
      New File
    </button>
  </div>
  <div class="flex-grow"><div bind:this={element} /></div>
</div>
