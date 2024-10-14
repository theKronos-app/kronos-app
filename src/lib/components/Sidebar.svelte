<script lang="ts">
  import { Inbox, File, Send, Trash2, Archive } from "lucide-svelte";
  import { Button, type Variant } from "$lib/components/ui/button/index.js";
  import * as Tooltip from "$lib/components/ui/tooltip/index.js";
  import type { Writable } from "svelte/store";

  export let isCollapsed: Writable<boolean>;
  type Link = {
    title: string;
    label: string;
    icon: typeof File;
    variant: Variant;
    href: string;
  };

  const links: Link[] = [
    { title: "Journal", label: "", icon: File, variant: "ghost", href: "/" },
    { title: "Tasks", label: "5", icon: Inbox, variant: "ghost", href: "/" },
    { title: "Calendar", label: "", icon: Send, variant: "ghost", href: "/" },
    { title: "Archive", label: "", icon: Archive, variant: "ghost", href: "/" },
    { title: "Trash", label: "", icon: Trash2, variant: "ghost", href: "/" },
  ];
</script>

<aside
  class="h-full bg-muted/40 overflow-y-auto py-4"
  data-collapsed={$isCollapsed}
>
  <nav
    class="grid gap-1 px-3 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-3"
  >
    {#each links as link}
      {#if $isCollapsed}
        <Tooltip.Root>
          <Tooltip.Trigger asChild>
            <Button variant={link.variant} size="icon" class="h-9 w-9">
              <svelte:component this={link.icon} class="h-4 w-4" />
              <span class="sr-only">{link.title}</span>
            </Button>
          </Tooltip.Trigger>
          <Tooltip.Content side="right" class="flex items-center gap-4">
            {link.title}
            {#if link.label}
              <span class="ml-auto text-muted-foreground">{link.label}</span>
            {/if}
          </Tooltip.Content>
        </Tooltip.Root>
      {:else}
        <Button variant={link.variant} size="sm" class="justify-start w-full">
          <svelte:component this={link.icon} class="mr-2 h-4 w-4" />
          {link.title}
          {#if link.label}
            <span class="ml-auto">{link.label}</span>
          {/if}
        </Button>
      {/if}
    {/each}
  </nav>

  <div class="my-4 mx-4">
    <hr class="border-t border-muted-foreground/20" />
  </div>
</aside>
