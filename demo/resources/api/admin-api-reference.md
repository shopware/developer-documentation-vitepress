---
page: true
footer: false
---

<div class="p-3 bg-#f5f7f9 text-sm border-b-1px border-b-#ddd sticky top-80px z-10">
    <div class="max-w-1376px mx-auto">
        Resources > HTTP APIs > Admin API Reference
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
  projectId="cHJqOjEwNjA0Mw"
  router="hash"
  collapseTableOfContents="true"
  hideMocking="true"
  hideTryIt="true"> </elements-stoplight-project>
</ClientOnly>
