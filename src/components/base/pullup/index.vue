<template>
    <div ref="rootRef">
      <slot></slot>
    </div>
  </template>
  <script setup>
  import { usePullup } from "./use-pullup";
  const props = defineProps({
    probeType: {
      type: Number,
      default: 1,
    },
    // click: {
    //   type: Boolean,
    //   default: true,
    // },
  });
  const emit = defineEmits(["scroll"]);
  const { rootRef ,isPullUpLoad, newdata} = usePullup();
  
  // 暴露出去给父组件用
//   defineExpose({
//     scroll,
//   });
  </script>
  <style lang="scss" scoped></style>
  