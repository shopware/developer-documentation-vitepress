---
page: true
footer: false
---

<div class="">

<div class="p-3 bg-#f5f7f9 text-sm border-b-1px border-b-#ddd sticky top-80px z-10">
    <div class="max-w-1376px mx-auto">
        Resources > HTTP APIs > Store API Reference
    </div>
</div>

<link rel="stylesheet" href="https://unpkg.com/@stoplight/elements-dev-portal/styles.min.css">

<script setup>
import {onMounted} from 'vue'

onMounted(() => {
  import('@stoplight/elements-dev-portal/web-components.min.js')
})

</script>

<ClientOnly>
  <elements-stoplight-project
  projectId="cHJqOjEwNjA0NQ"
  router="hash"
  collapseTableOfContents="true"
  hideMocking="true"
  hideTryIt="true"> </elements-stoplight-project>
</ClientOnly>

</div>

<style>
/* TODO: Extract into stylesheet */
div > .sl-text-5xl {
  font-weight: 500;
  font-family: 'Poppins', sans-serif;
   background: -webkit-linear-gradient(left, #017bff 15%, #01cfff, #017bff);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: 2.4rem;
  margin-bottom: 40px;
}

.sl-elements-api .sl-bg-canvas-100 {
  background-color: #f5f7f9;
}

.sl-elements-api .sl-bg-primary-tint {
  background-color: #f5f7f9;
  color: #189eff;
  font-weight: 500;
}
</style>
