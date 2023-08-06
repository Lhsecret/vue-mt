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
      default: 1,
    },
    click: {
      type: Boolean,
      default: true,
    },
    tip:{
      type:Number,
      default: 3
    }
    
  });
  const emit = defineEmits(["scroll","shoplist","shopList"]);
  // const emits = defineEmits(['shoplist'])
  const { rootRef } = useScroll(props,emit);
  
  // 暴露出去给父组件用
  // defineExpose({
  //   isPullUpLoad,
  // });
  </script>
  <style lang="scss" scoped></style>
  