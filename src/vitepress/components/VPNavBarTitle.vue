<template>
  <a class="VPNavBarTitle" href="/">
    <img src="/img/logo.svg" alt="Shopware" class="w-36px h-36px mr-2" />
    <span class="text-lg font-bold">Shopware Docs</span>
  </a>
</template>

<style scoped>
.VPNavBarTitle {
  display: flex;
  align-items: center;
  padding-top: 1px;
  height: var(--vt-nav-height);
  transition: opacity 0.25s;
}

.VPNavBarTitle:hover {
  opacity: 0.6;
}
</style>
