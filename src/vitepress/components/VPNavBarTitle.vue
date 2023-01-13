<template>
  <!--<a class="VPNavBarTitle" href="/">
    <slot name="navbar-title">
      <svg class="logo" viewBox="0 0 128 128" width="24" height="24">
        <path
          fill="#42b883"
          d="M78.8,10L64,35.4L49.2,10H0l64,110l64-110C128,10,78.8,10,78.8,10z"
        />
        <path
          fill="#35495e"
          d="M78.8,10L64,35.4L49.2,10H25.6L64,76l38.4-66H78.8z"
        />
      </svg>
      <span class="text">Vue.js</span>
    </slot>
  </a>-->
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

.VPNavBarTitle:hover {
  opacity: 0.6;
}

.VPNavBarImage {
  width: 90%;
  height: 40px;
}

.logo {
  position: relative;
}

.logo + .text {
  padding-left: 8px;
}

.text {
  font-size: 16px;
  font-weight: 500;
}
</style>
