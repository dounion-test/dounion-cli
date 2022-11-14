<!--
 * @Author: your name
 * @Date: 2022-05-27 09:11:35
 * @LastEditTime: 2022-09-01 20:09:45
 * @LastEditors: 江雪松 576053154@qq.com
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /vben-admin-thin-next-main/src/views/systemManager/ucenterPerson/personView.vue
-->
<template>
  <PageWrapper>
    <div class="personView">
      <Description
        size="middle"
        title="基本信息"
        :bordered="false"
        :column="2"
        :data="DetailRes"
        :schema="basicDetailSchema"
      />
      <Description
        size="middle"
        title="岗位信息"
        :bordered="false"
        :column="1"
        :data="DetailRes"
        :schema="postDetailSchema"
      />
      <Description
        size="middle"
        title="其他信息"
        :bordered="false"
        :column="2"
        :data="DetailRes"
        :schema="otherDetailSchema"
      />
      <div class="personImg">
        <img v-if="filePath" :src="`${VITE_GLOB_DOFILE_URL}${filePath}`" />
        <Icon
          v-if="!filePath"
          icon="ant-design:user-outlined"
          color="#d6d6d6"
          size="80px"
          style="margin-top: 30px; margin-left: 30px"
        />
      </div>
    </div>
    <div class="bg-white pt-6 pb-8" style="text-align: right">
      <a-button class="mr-3" @click="goBack()">返回</a-button>
    </div>
  </PageWrapper>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import { Divider } from 'ant-design-vue';
  import { Icon } from '/@/components/Icon';
  import { useTabs } from '/@/hooks/web/useTabs';
  import { getAppEnvConfig } from '/@/utils/env';
  import { PageWrapper } from '/@/components/Page';
  import { Description } from '/@/components/Description/index';
  import { ucenterPersonTypeViewApi } from '/@/api/testDemo/person';
  import { basicDetailSchema, otherDetailSchema, postDetailSchema } from './config/add';

  export default defineComponent({
    components: { PageWrapper, Description, [Divider.name]: Divider, Icon },
    setup() {
      const route = useRoute();
      const router = useRouter();
      const { closeCurrent } = useTabs();
      const DetailRes = ref({});
      const filePath = ref({});
      const routerName = ref<string>('');
      const { VITE_GLOB_DOFILE_URL } = getAppEnvConfig();
      const getUcenterPersonView = async () => {
        await ucenterPersonTypeViewApi({ id: route.params.id as unknown as number }).then((res) => {
          DetailRes.value = res;
          filePath.value = res.personImg.filePath;
        });
      };
      getUcenterPersonView();
      const goBack = () => {
        closeCurrent();
        router.back();
      };
      return {
        routerName,
        DetailRes,
        filePath,
        basicDetailSchema,
        otherDetailSchema,
        postDetailSchema,
        getUcenterPersonView,
        VITE_GLOB_DOFILE_URL,
        goBack,
      };
    },
  });
</script>

<style lang="less" scoped>
  .personView {
    position: relative;

    .personImg {
      width: 140px;
      height: 140px;
      position: absolute;
      top: 70px;
      right: 50px;
      background: #fafafa;
      border: 1px solid #d9d9d9;

      img {
        width: 100%;
      }
    }

    ::v-deep(.dounion-collapse-container__header) {
      border-bottom: none;
      background-color: #f4f4f4;
    }

    ::v-deep(.dounion-basic-title)::before {
      content: '';
      height: 12px;
      border-left: 4px solid #118af7;
      position: absolute;
      left: 0;
      top: 6px;
    }
  }
</style>
