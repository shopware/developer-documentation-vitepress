<template>
  <a class="VPNavBarTitle" href="/">
    <img src="./../assets/shopware-docs.svg" alt="Shopware" class="h-40px" />
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
