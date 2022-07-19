<template>
  <div class="flex items-center">
    <a class="VPNavBarTitle" :href="withBase('/')">
      <img
        src="./../assets/shopware-docs.svg"
        alt="Shopware"
        class="VPNavBarImage"
      />
    </a>
    <a :href="withBase('/installation.html')"
      ><span class="accent text-xl">EA</span></a
    >
  </div>
</template>

<script setup>
import { withBase } from "vitepress";
</script>

<style scoped>
.VPNavBarTitle {
  display: flex;
  align-items: center;
  padding-top: 1px;
  height: var(--vt-nav-height);
  color: var(--vt-c-brand);
  transition: opacity 0.25s;
}

.VPNavBarImage {
  width: 90%;
  height: 40px;
}

.VPNavBarTitle:hover {
  opacity: 0.6;
}
</style>
