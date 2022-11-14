<template>
  <PageWrapper class="pb-10" id="pageWrapper">
    <div class="flex">
      <div class="main-left">
        <CollapseContainer title="基础信息" id="basicSchemas">
          <div class="form1 width-80">
            <BasicForm :actionColOptions="{ span: 16 }" @register="registerOne" />

            <CropperAvatar
              class="ml-5"
              :uploadApi="uploadApi"
              :value="avatar"
              :isRenderAvatar="false"
              btnText="更换图片"
              :btnProps="{ preIcon: 'ant-design:cloud-upload-outlined' }"
              :options="{ aspectRatio: NaN }"
              :circled="false"
              :showCropperPreview="false"
              title="图片上传"
              @change="updateAvatar"
              width="300"
              height="150"
              type="10001"
            />
          </div>
        </CollapseContainer>

        <CollapseContainer title="公告" class="mt-5" id="announcementSchemas">
          <BasicForm :actionColOptions="{ span: 16 }" @register="registerTwo" class="width-80" />
        </CollapseContainer>

        <CollapseContainer title="申报" class="mt-5" id="reportSchemas">
          <BasicForm :actionColOptions="{ span: 16 }" @register="registerThree" class="width-80">
            <template #add="{ field }">
              <Button v-if="Number(field) === 0" @click="handleAddDeclarant(1)">+</Button>
              <Button v-if="field > 0" @click="handleDelDeclarant(field, 1)">-</Button>
            </template>
          </BasicForm>
        </CollapseContainer>

        <CollapseContainer title="立项信息" class="mt-5" id="messageSchema">
          <BasicForm :actionColOptions="{ span: 16 }" @register="registerFour" class="width-80">
            <template #add="{ field }">
              <Button v-if="Number(field) === 0" @click="handleAddDeclarant(2)">+</Button>
              <Button v-if="field > 0" @click="handleDelDeclarant(field, 2)">-</Button>
            </template>
          </BasicForm>
        </CollapseContainer>

        <CollapseContainer title="立项需要的材料" class="mt-5" id="materialSchema1">
          <BasicForm :actionColOptions="{ span: 16 }" @register="registerFive" class="width-80" />
        </CollapseContainer>

        <CollapseContainer title="中期检查需要的材料" class="mt-5" id="materialSchema2">
          <BasicForm :actionColOptions="{ span: 16 }" @register="registerSix" class="width-80" />
        </CollapseContainer>

        <CollapseContainer title="变更需要的材料" class="mt-5" id="materialSchema3">
          <BasicForm :actionColOptions="{ span: 16 }" @register="registerSeven" class="width-80" />
        </CollapseContainer>

        <CollapseContainer title="结题归档需要的材料" class="mt-5" id="materialSchema4">
          <BasicForm :actionColOptions="{ span: 16 }" @register="registerEight" class="width-80" />
        </CollapseContainer>
      </div>
      <div class="anchor-right flex-1 ml-5">
        <a-anchor
          @click="handleClick"
          :get-container="getContainer"
          :offsetTop="100"
          style="width: 100%"
        >
          <a-anchor-link
            v-for="item in anchorList"
            :key="item.href"
            :href="item.href"
            :title="item.title"
          />
        </a-anchor>
      </div>
    </div>
    <template #rightFooter>
      <a-button
        type="primary"
        @click="saveForm(1)"
        :loading="endLoading"
        :disabled="endLoading || saveLoading"
        class="my-2 mr-5"
        >完成课题</a-button
      >
      <a-button
        type="primary"
        @click="saveForm(0)"
        :loading="saveLoading"
        :disabled="endLoading || saveLoading"
        class="my-2 mr-5"
        >保存</a-button
      >
      <a-button @click="goBack(true)">取消</a-button>
    </template>
  </PageWrapper>
</template>

<script lang="ts">
  import { defineComponent, ref, onMounted } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { Anchor } from 'ant-design-vue';
  import { CropperAvatar } from '/@/components/Cropper';
  import demoImg from '/@/assets/images/demo.png';
  import { uploadApi } from '/@/api/sys/upload';
  import { CollapseContainer } from '/@/components/Container';
  import { PageWrapper } from '/@/components/Page';
  import type { AnchorProps } from 'ant-design-vue';
  import { spSciSubjectAdd } from '/@/api/testDemo/scientific';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { useTabs } from '/@/hooks/web/useTabs';
  import {
    basicSchemas,
    announcementSchemas,
    reportSchemas,
    messageSchema,
    materialSchema1,
    materialSchema2,
    materialSchema3,
    materialSchema4,
    anchorList,
    createPersonConfig,
    createRoleConfig,
    createBtnConfig,
    FORM_ORDER,
  } from './config/add';
  export default defineComponent({
    name: 'ScientificAdd',
    components: {
      BasicForm,
      CropperAvatar,
      CollapseContainer,
      PageWrapper,
      AAnchor: Anchor,
      AAnchorLink: Anchor.Link,
    },
    setup() {
      /**
       * 创建表单
       */
      const [
        registerOne,
        {
          validateFields: validateFieldsOne,
          getFieldsValue: getFieldsValueOne,
          setFieldsValue: setFieldsValueOne,
        },
      ] = useForm({
        labelWidth: 100,
        schemas: basicSchemas,
        showActionButtonGroup: false,
      });

      const [
        registerTwo,
        {
          validateFields: validateFieldsTwo,
          getFieldsValue: getFieldsValueTwo,
          setFieldsValue: setFieldsValueTwo,
        },
      ] = useForm({
        labelWidth: 100,
        schemas: announcementSchemas,
        showActionButtonGroup: false,
      });

      const [
        registerThree,
        {
          validateFields: validateFieldsThree,
          getFieldsValue: getFieldsValueThree,
          setFieldsValue: setFieldsValueThree,
          appendSchemaByField: appendSchemaByFieldThree,
          removeSchemaByFiled: removeSchemaByFiledThree,
        },
      ] = useForm({
        labelWidth: 100,
        schemas: reportSchemas,
        showActionButtonGroup: false,
      });

      const [
        registerFour,
        {
          validateFields: validateFieldsFour,
          getFieldsValue: getFieldsValueFour,
          setFieldsValue: setFieldsValueFour,
          appendSchemaByField: appendSchemaByFieldFour,
          removeSchemaByFiled: removeSchemaByFiledFour,
        },
      ] = useForm({
        labelWidth: 100,
        schemas: messageSchema,
        showActionButtonGroup: false,
      });

      const [
        registerFive,
        {
          validateFields: validateFieldsFive,
          getFieldsValue: getFieldsValueFive,
          setFieldsValue: setFieldsValueFive,
        },
      ] = useForm({
        labelWidth: 100,
        schemas: materialSchema1,
        showActionButtonGroup: false,
      });

      const [
        registerSix,
        {
          validateFields: validateFieldsSix,
          getFieldsValue: getFieldsValueSix,
          setFieldsValue: setFieldsValueSix,
        },
      ] = useForm({
        labelWidth: 100,
        schemas: materialSchema2,
        showActionButtonGroup: false,
      });

      const [
        registerSeven,
        {
          validateFields: validateFieldsSeven,
          getFieldsValue: getFieldsValueSeven,
          setFieldsValue: setFieldsValueSeven,
        },
      ] = useForm({
        labelWidth: 100,
        schemas: materialSchema3,
        showActionButtonGroup: false,
      });

      const [
        registerEight,
        {
          validateFields: validateFieldsEight,
          getFieldsValue: getFieldsValueEight,
          setFieldsValue: setFieldsValueEight,
        },
      ] = useForm({
        labelWidth: 100,
        schemas: materialSchema4,
        showActionButtonGroup: false,
      });

      // 课题图片地址
      const avatar = ref('');
      const imgSrc = ref<string>(demoImg);

      const handleCropend = () => {};

      const handleReady = () => {};

      const updateAvatar = () => {};

      const n = ref<number>(1);
      const handleAddDeclarant = (num) => {
        if (num === 1) {
          addDeclarant(appendSchemaByFieldThree);
        } else {
          addDeclarant(appendSchemaByFieldFour);
        }
      };

      const addDeclarant = (appendSchemaByField) => {
        appendSchemaByField(createPersonConfig(n.value), '');
        appendSchemaByField(createRoleConfig(n.value), '');
        appendSchemaByField(createBtnConfig(n.value), '');
        n.value++;
      };

      const handleDelDeclarant = (field, num) => {
        if (num === 1) {
          removeSchemaByFiledThree([`personId-${field}`, `role-${field}`, field]);
        } else {
          removeSchemaByFiledFour([`personId-${field}`, `role-${field}`, field]);
        }
      };
      const getContainer = (): HTMLElement => {
        return document.querySelector(`.layouts-scroll .scrollbar__wrap`) as HTMLElement;
      };
      const handleClick: AnchorProps['onClick'] = (e, link) => {
        e.preventDefault();
      };

      /**
       * 保存/完成课题
       */
      const saveLoading = ref(false);
      const endLoading = ref(false);
      const { createMessage } = useMessage();
      const { close, refreshOtherPage } = useTabs();
      const route = useRoute();
      const router = useRouter();
      const saveForm = async (type = 0) => {
        /**
         * 表单验证并获取表单
         */
        let order = 0,
          formObj = {};
        while (order < FORM_ORDER.length) {
          // 验证
          await eval(`validateFields${FORM_ORDER[order]}`)();
          // 获取
          let form = await eval(`getFieldsValue${FORM_ORDER[order]}`)();

          // 处理申报人员字段
          if (FORM_ORDER[order] === 'Three' || FORM_ORDER[order] === 'Four') {
            let formKeys = Object.keys(form);
            // 常规表单属性
            let routineAttr = [],
              // 需要处理的属性
              withAttr = [],
              // 角色keys
              roleKeys = [],
              // 人员keys
              personKeys = [];
            // 给key分组
            formKeys.forEach((key) =>
              key.indexOf('-') === -1 ? routineAttr.push(key) : withAttr.push(key),
            );
            //  withAttr中拆分出角色keys和人员keys
            withAttr.forEach((key) =>
              (key as String).indexOf('role') !== -1 ? roleKeys.push(key) : personKeys.push(key),
            );

            let persons = [];
            roleKeys.forEach((key, i) => {
              persons.push({
                personId: form[personKeys[i]],
                role: form[key],
              });
            });
            if (routineAttr.length) {
              routineAttr.forEach((key) => {
                Object.assign(formObj, {
                  [key]: form[key],
                });
              });
            }
            Object.assign(formObj, {
              [FORM_ORDER[order] === 'Three' ? 'signPersons' : 'teamPersons']: persons,
            });
          } else {
            Object.assign(formObj, form);
          }

          ++order;
        }
        Object.assign(formObj, { isFinished: type });
        // 操作按钮
        setBthStatus(true, type);
        try {
          await spSciSubjectAdd(formObj);

          createMessage.success('操作成功');

          setBthStatus(false, type);

          goBack(true);
        } catch (err) {
          setBthStatus(false, type);
          createMessage.error('操作失败');
          console.log(err);
        }
      };
      const goBack = (status = false) => {
        close(router.currentRoute.value);
        if (status) {
          refreshOtherPage('ScientificManager');
        } else {
          router.push({ name: 'ScientificManager' });
        }
      };
      const setBthStatus = (status, type) => {
        if (type == 1) {
          endLoading.value = status;
        } else {
          saveLoading.value = status;
        }
      };
      return {
        basicSchemas,
        imgSrc,
        avatar,
        uploadApi: uploadApi as any,
        anchorList,
        saveLoading,
        endLoading,
        getContainer,
        handleCropend,
        handleReady,
        updateAvatar,
        registerOne,
        registerTwo,
        registerThree,
        registerFour,
        registerFive,
        registerSix,
        registerSeven,
        registerEight,
        handleAddDeclarant,
        handleDelDeclarant,
        handleClick,
        saveForm,
        goBack,
      };
    },
  });
</script>

<style lang="less" scoped>
  .form1 {
    display: flex;
    justify-content: space-between;
    width: 80%;
  }

  .width-80 {
    width: 80%;
  }

  :deep(.ant-anchor-ink::before) {
    background-color: #fff !important;
  }
</style>
