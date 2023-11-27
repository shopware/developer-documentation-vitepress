<template>
  <div class="SwagNewsletter">
    <div id="SwagNewsletter_Form" class="text-subtle"></div>
  </div>
</template>

<style lang="scss">
.hs-richtext {
  @apply text-sm;
}

#SwagNewsletter_Form {
  form {
    @apply max-w-360px flex flex-col gap-6 text-left items-center justify-center text-sm;
  }

  .hs-email {
    @apply w-full;
  }
}

.SwagNewsletter {
  form {
    position: relative;
    gap: 1rem !important;
  }

  > h3,
  > p,
  .hs-richtext {
    @apply hidden;
  }

  input[name="email"] {
    background-color: var(--bottom-bg);
    border: 1px solid var(--bottom-bg--light);
    &,
    &::placeholder {
      color: var(--sw-c-gray-300);
    }
  }

  .hs_submit {
    @apply absolute top-[2.35rem] right-[.5rem];
    .btn {
      @apply px-4 py-2 text-xs;
    }
  }
}
</style>

<script setup lang="ts">
import {onMounted} from "vue";

const loadScript = (src: string, umdName: string) => {
  return new Promise((resolve, reject) => {
    const script = window.document.createElement('script');
    script.src = src;
    script.defer = true;
    script.async = true;
    script.onload = () => resolve((window as any)[umdName]);
    script.onerror = reject;
    window.document.head.appendChild(script);
  });
}

const identifier = 'SwagNewsletter_Form';

onMounted(async () => {
  const hbspt = await loadScript('https://js.hsforms.net/forms/embed/v2.js', 'hbspt');

  hbspt.forms.create({
    region: "na1",
    portalId: "6506294",
    formId: "1fff50e7-f278-42aa-a61c-1d784872bee2",
    target: '#SwagNewsletter_Form',
    cssRequired: '',
    submitButtonClass: 'btn --primary',
  });
})
</script>