<template>
  <a href="/chat.html" class="SwagCopilotMenu">
    <SwagIcon icon="sparkles" type="solid" />
    <span class="hidden xl:block">Ask AI Copilot</span>
  </a>
</template>

<style lang="scss">
.SwagCopilotMenu {
  @apply flex gap-2 items-center w-[48px] md:w-auto justify-center;
  color: #fff;
  grid-column: 2;
  order: 2;
  font-size: 0.875rem;
  .SwagIcon {
    --icon-size: 1rem;
  }
}
</style>