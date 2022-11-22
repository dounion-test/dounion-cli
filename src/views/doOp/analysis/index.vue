<template>
  <PageWrapper contentFullHeight contentBackground>
    <div class="pl-10 pt-10">
      <Authority value="OpAnalysisManage">
        <a-button type="primary" @click="getOpFineBiCombox(1)" class="mr-5">统计管理</a-button>
      </Authority>
      <Authority value="OpAnalysisView">
        <a-button @click="getOpFineBiCombox(0)">统计查看</a-button>
      </Authority>
    </div>
  </PageWrapper>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { PageWrapper } from '/@/components/Page';
  import { opFineBiCombox } from '/@/api/doOp/analysis';
  import { Authority } from '/@/components/Authority';

  export default defineComponent({
    components: {
      PageWrapper,
      Authority,
    },
    setup() {
      const getOpFineBiCombox = async (type) => {
        const { url } = await opFineBiCombox({ type });

        window.open(url, 'fanruan');
      };

      return {
        getOpFineBiCombox,
      };
    },
  });
</script>
