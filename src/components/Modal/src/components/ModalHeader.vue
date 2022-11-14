<template>
  <BasicTitle :helpMessage="helpMessage">
    <Icon :icon="titleIcon" v-if="titleIcon" size="20" />
    {{ title }}
  </BasicTitle>
</template>
<script lang="ts">
  import type { PropType } from 'vue';
  import { defineComponent } from 'vue';
  import { Icon } from '/@/components/Icon';
  import { BasicTitle } from '/@/components/Basic';

  export default defineComponent({
    name: 'BasicModalHeader',
    components: { BasicTitle, Icon },
    props: {
      helpMessage: {
        type: [String, Array] as PropType<string | string[]>,
      },
      title: { type: String },
      titleIcon: { type: String },
    },
    emits: ['dblclick'],
  });
</script>

<style lang="less" scoped>
  @prefix-cls: ~'@{namespace}-basic-title';
  .@{prefix-cls}{
    display: inline-flex;
    align-items: center;
    .app-iconify{
      margin-right: 10px;
    }
  }
</style>
