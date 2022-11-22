<template>
  <CollapseContainer title="智库成果" :canExpan="false"> eee </CollapseContainer>
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
