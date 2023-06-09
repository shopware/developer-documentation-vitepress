<template>
  <div class="SwagCheckbox">
    <input id="cb" type="checkbox" class="form-checkbox"/>
    <label for="cb" class="flex flex-row gap-2 items-center">
      <slot/>
    </label>
  </div>
</template>

<style lang="scss">
.SwagCheckbox {
  @apply flex gap-2 items-center;
}
</style>