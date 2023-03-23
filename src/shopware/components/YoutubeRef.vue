<template>
  <div
      class="flex gap-3 flex-col border-1px border-#eeeeee rounded-md p-4 shadow-md bg-#fdfdfd mb-6 dark:border-#444 dark:bg-#222"
  >
    <h4>{{ title }}</h4>
    <iframe width="100%"
            style="aspect-ratio: 16/9;"
            :src="`https://www.youtube-nocookie.com/embed/${video}`"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen></iframe>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  video: string;
  title: string;
}>();
</script>
