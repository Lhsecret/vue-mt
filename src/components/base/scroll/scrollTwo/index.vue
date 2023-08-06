<template>
    <div ref="rootRef">
      <slot></slot>
    </div>
  </template>
  <script setup>
  import { useScroll } from "./use-scroll";
  const props = defineProps({
    probeType: {
      type: Number,
      default: 3,
    },      
    click: {
      type: Boolean,
      default: true,
    },
  });
  const emit = defineEmits(["scroll"]);
  const { rootRef } = useScroll(props, emit);
  
  // 暴露出去给父组件用
//   defineExpose({
//     scroll,
//   });
  </script>
  <style lang="scss" scoped></style>