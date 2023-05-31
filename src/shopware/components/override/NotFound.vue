<script setup lang="ts">
import SwagRelatedArticles from "../SwagRelatedArticles.vue";
</script>

<template>
  <div class="NotFound flex flex-col gap-8 content-center items-center justify-center mt-24 max-w-800px mx-auto px-8">

    <h1 class="accent text-5xl">404</h1>
    <h2 class="text-2xl">PAGE NOT FOUND</h2>

    <blockquote class="quote">
      But if you don't change your direction, and if you keep looking, you may end up where you are heading.
    </blockquote>

    <a class="btn --secondary" href="/" aria-label="go to home">
      Take me home
    </a>

    <SwagRelatedArticles class="w-full" />
  </div>
</template>
