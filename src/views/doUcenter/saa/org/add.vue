<template>
  <div>
    <PageWrapper>
      <CollapseContainer title="基本信息">
        <BasicForm
          :autoFocusFirstItem="true"
          @register="register"
          :showResetButton="false"
          :showSubmitButton="false"
        />
      </CollapseContainer>
    </PageWrapper>

    <PageFooter>
      <a-button type="primary" @click="validateForm" :loading="saveLoading" class="my-2 mr-5"
        >保存</a-button
      >
      <a-button @click="goBack(true)">取消</a-button>
    </PageFooter>
  </div>
</template>

<script lang="ts">
  import { defineComponent, onMounted, ref } from 'vue';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { CollapseContainer } from '/@/components/Container';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { PageWrapper, PageFooter } from '/@/components/Page';
  import {
    getUcenterDeptPersonAdd,
    getUcenterDeptPersonEdit,
    getUcenterDeptPersonView,
  } from '/@/api/testDemo/dept';
  import { schemas } from './config/add';
  import { useRouter } from 'vue-router';
  import { useGo } from '/@/hooks/web/usePage';
  import { useTabs } from '/@/hooks/web/useTabs';

  export default defineComponent({
    name: 'UcenterOrgAdd',
    components: {
      BasicForm,
      CollapseContainer,
      PageWrapper,
      PageFooter,
    },
    setup() {
      const { close } = useTabs();
      const [register, { setFieldsValue, validateFields }] = useForm({
        labelWidth: 120,
        schemas,
        actionColOptions: {
          span: 24,
        },
      });
      const router = useRouter();
      const {
        currentRoute: {
          value: {
            params: { type, id },
          },
        },
      } = router;
      const isEdit = type === 'edit';
      const title = ref(isEdit ? '编辑部门' : '新增部门');
      const { createMessage } = useMessage();
      const go = useGo();
      let saveLoading = ref(false);
      const handleSubmit = async (data) => {
        try {
          Object.assign(
            data,
            { compType: '10027-10', parentName: '综合管理' },
            isEdit ? { id } : {},
          );
          const api = isEdit ? getUcenterDeptPersonEdit : getUcenterDeptPersonAdd;
          await api(data);
          createMessage.success('操作成功');
          goBack();

          saveLoading.value = false;
        } catch {
          saveLoading.value = false;
        }
      };
      const validateForm = async () => {
        try {
          const res = await validateFields();
          saveLoading.value = true;
          handleSubmit(res);
        } catch (error) {
          console.log('not passing', error);
        }
      };
      const goBack = (status = false) => {
        if (status) {
          router.push({ name: 'UcenterOrgList' });
        } else {
          go('/doUcenter/org');
        }
        close(router.currentRoute.value);
      };
      onMounted(async () => {
        if (isEdit) {
          try {
            const getViewParams = { id };
            const data = await getUcenterDeptPersonView(getViewParams);

            setFieldsValue(data);
          } catch {}
        }
      });
      return {
        register,
        goBack,
        title,
        validateForm,
        saveLoading,
      };
    },
  });
</script>
