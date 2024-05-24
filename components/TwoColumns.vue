<script setup lang="ts">
import { PortableText } from '@portabletext/vue'
const props = defineProps({
  values: Object,
  components: Object
})
</script>

<template>
  <div v-for="content in values" :key="content._key">
    <div class="flex" :class="content.style">
      <div v-if="content.left" class="flex-1">
        <div v-for="el in content.left">
          {{el.children[0].text}}
        </div>
      </div>
      <div v-if="content.right" class="flex-1">
        <div v-for="el in content.left">
          {{el.children[0].text}}
        </div>
      </div>
    </div>
  </div>

</template>

<style scoped>
.two-columns {
  display: flex;
}
.p-0 {
  padding: 0;
}
.p-6 {
  padding: 6px;
}
.p-12 {
  padding: 12px;
}
</style>