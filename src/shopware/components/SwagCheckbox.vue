<template>
  <div class="SwagCheckbox">
    <input id="cb" type="checkbox" class="form-checkbox" v-model="myValue"/>
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

<script setup lang="ts">
import {ref, watch} from "vue";

const props = defineProps(['modelValue', 'placeholder'])
const emit = defineEmits(['update:modelValue'])

const myValue = ref(props.modelValue);

watch(myValue, () => {
  emit('update:modelValue', newValue)
})
</script>