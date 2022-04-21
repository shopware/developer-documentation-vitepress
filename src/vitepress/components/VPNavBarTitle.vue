<template>
  <div class="flex items-center">
    <a class="VPNavBarTitle" href="/">
      <img src="./../assets/shopware-docs.svg" alt="Shopware" class="h-40px" />
    </a>
    <a href="/installation.html"><span class="accent ml-5 text-xl">EA</span></a>
  </div>
</template>

<style scoped>
.VPNavBarTitle {
  display: flex;
  align-items: center;
  padding-top: 1px;
  height: var(--vt-nav-height);
  color: var(--vt-c-brand);
  transition: opacity 0.25s;
}

.VPNavBarTitle:hover {
  opacity: 0.6;
}
</style>
