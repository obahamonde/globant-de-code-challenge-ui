<script setup lang="ts">
const props = defineProps({
  url: {
    type: String,
    required: true
  }
})

</script>

<template>
  <div class="col center container">
  <img :src="props.url" alt="Globant" class="max-w-24 max-h-32 scale cp dark:invert" />
    </div>
</template>