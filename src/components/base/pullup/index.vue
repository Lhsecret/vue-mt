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

  });
  const emit = defineEmits(["scroll"]);
  const { rootRef } = usePullup();
  

  </script>
  <style lang="scss" scoped></style>
  