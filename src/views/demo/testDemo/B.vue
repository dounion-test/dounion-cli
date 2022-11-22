<template>
  <div>{{ content }}</div>
</template>

<script>
  import { defineComponent, ref } from 'vue';
  export default defineComponent({
    name: 'TestRouterB',
    setup() {
      const content = ref('我是测试B');

      return {
        content,
      };
    },
  });
</script>
