<template>
    <svg class="svg-icon" aria-hidden="true">
      <use :xlink:href="innerIcon"></use>
    </svg>
  </template>
  <script setup>
  import { computed } from "vue";
  const props = defineProps({
    icon: {
      type: String,
      required: true,
    },
  });
  
  const innerIcon = computed(() => "#icon-" + props.icon);
  </script>
  <style lang="scss" scoped>
  .svg-icon {
    overflow: hidden;
    width: 1em;
    height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    color:darkgrey;
  }
  </style>
  