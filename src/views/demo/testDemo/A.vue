<template>
  <div>{{ content }}</div>
</template>

<script>
  import { defineComponent, ref } from 'vue';
  export default defineComponent({
    name: 'TestRouterA',
    setup() {
      const content = ref('我是测试A');

      return {
        content,
      };
    },
  });
</script>
