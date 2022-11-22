<template>
  <CollapseContainer title="发展理念" :canExpan="false"> eee </CollapseContainer>
</template>
<script lang="ts">
  import { defineComponent, onMounted } from 'vue';
  import { CollapseContainer } from '/@/components/Container';
  export default defineComponent({
    components: {
      CollapseContainer,
    },
    setup() {
      onMounted(async () => {});

      return {};
    },
  });
</script>
