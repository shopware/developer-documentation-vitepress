<template>
  <input type="text"
         :placeholder="placeholder"
         class="form-control"
         v-model="myValue"/>
</template>

<script setup lang="ts">
import {ref, watch} from "vue";

const props = defineProps(['modelValue', 'placeholder'])
const emit = defineEmits(['update:modelValue'])

const myValue = ref(props.modelValue);

watch(myValue, () => {
  emit('update:modelValue', myValue.value)
})
</script>