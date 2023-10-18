<template>
  <div class="SwagHero SwagHero--developer">
    <div class="grid gap-10 md:grid-cols-2 items-center">
      <div class="grid gap-4">
        <div class="SwagHero_label h-label"><slot name="label">Label</slot></div>
        <div class="SwagHero_title"><slot name="title">Title</slot></div>
        <div class="SwagHero_content"><slot name="content">Content</slot></div>
        <div class="SwagHero_links"><slot name="links">Links</slot></div>
      </div>
      <div>
        <div class="SwagHero_image"><slot name="image">Image</slot></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

</script>

<style lang="scss">
.SwagHero {
  &_label {
  }
  &_title {
    font-family: Poppins, sans-serif;
    font-weight: 700;
    font-size: 3rem;
    letter-spacing: -0.09rem;
    line-height: 100%;
  }
  &_content {
    font-size: 1.25rem;
    font-weight: 500;
    line-height: 2rem;
    letter-spacing: 0.0375rem;
  }
  &_links {
    @apply flex gap-4 mt-2 items-center;
  }
  &_image {

  }
}
</style>