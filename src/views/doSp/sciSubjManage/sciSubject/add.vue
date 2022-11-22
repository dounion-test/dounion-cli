<template>
  <PageWrapper class="pb-10" id="pageWrapper">
    <a-row :gutter="[16, 16]">
      <a-col :span="20">
        <CollapseContainer title="基础信息" id="basicSchemas" :isTitleLine="true">
          <a-row class="form-box">
            <a-col :span="12">
              <BasicForm
                :autoFocusFirstItem="true"
                :actionColOptions="{ span: 16 }"
                @register="registerOne"
              />
            </a-col>
            <a-col :span="12">
              <div class="flex justify-end">
                <CropperAvatar
                  class="pr-4 ml-5"
                  :uploadApi="uploadApi"
                  :value="imgUrl"
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
            </a-col>
          </a-row>
        </CollapseContainer>

        <!-- <CollapseContainer title="申报" class="mt-5" id="reportSchemas">
          <BasicForm :actionColOptions="{ span: 16 }" @register="registerThree" class="width-80">
            <template #add="{ field }">
              <Button v-if="Number(field) === 0" @click="handleAddDeclarant(1)">+</Button>
              <Button v-if="field > 0" @click="handleDelDeclarant(field, 1)">-</Button>
            </template>
          </BasicForm>
        </CollapseContainer> -->

        <CollapseContainer title="立项信息" class="mt-5" id="messageSchema" :isTitleLine="true">
          <div class="form-box">
            <BasicForm :actionColOptions="{ span: 16 }" @register="registerFour">
              <template #add="{ field }">
                <Icon
                  v-if="Number(field) === 0"
                  :size="20"
                  class="cursor-pointer ml-4"
                  icon="ant-design:plus-circle-outlined"
                  @click="handleAddDeclarant(2)"
                />
                <Icon
                  v-if="field > 0"
                  :size="20"
                  class="cursor-pointer ml-4"
                  icon="ant-design:minus-circle-outlined"
                  @click="handleDelDeclarant(field, 2)"
                />
              </template>

              <template #funds>
                <a-input type="number" v-model:value="funds">
                  <template #addonAfter>
                    <a-select v-model:value="feeUnit" style="width: 80px">
                      <a-select-option
                        v-for="item in feeUnitOptions"
                        :key="item.value"
                        :value="item.value"
                        >{{ item.name }}</a-select-option
                      >
                    </a-select>
                  </template>
                </a-input>
              </template>

              <template #projPeriod>
                <a-input type="number" v-model:value="projPeriod">
                  <template #addonAfter>
                    <a-select v-model:value="periodUnit" style="width: 80px">
                      <a-select-option
                        v-for="item in periodUnitOptions"
                        :key="item.value"
                        :value="item.value"
                        >{{ item.name }}</a-select-option
                      >
                    </a-select>
                  </template>
                </a-input>
              </template>
            </BasicForm>
          </div>
        </CollapseContainer>

        <CollapseContainer
          title="立项需要的材料"
          class="mt-5"
          id="materialSchema1"
          :isTitleLine="true"
        >
          <BasicForm :actionColOptions="{ span: 16 }" @register="registerFive" class="form-box" />
        </CollapseContainer>

        <CollapseContainer
          title="评审或咨询"
          class="mt-5"
          id="announcementSchemas"
          :isTitleLine="true"
          :show="false"
        >
          <BasicForm :actionColOptions="{ span: 16 }" @register="registerTwo" class="form-box" />
        </CollapseContainer>

        <CollapseContainer
          title="开题"
          class="mt-5"
          id="announcementSchema5"
          :isTitleLine="true"
          :show="false"
        >
          <BasicForm :actionColOptions="{ span: 16 }" @register="registerNine" class="form-box" />
        </CollapseContainer>

        <CollapseContainer
          title="中期检查需要的材料"
          class="mt-5"
          id="materialSchema2"
          :isTitleLine="true"
          :show="false"
        >
          <BasicForm :actionColOptions="{ span: 16 }" @register="registerSix" class="form-box" />
        </CollapseContainer>

        <CollapseContainer
          title="变更需要的材料"
          class="mt-5"
          id="materialSchema3"
          :isTitleLine="true"
          :show="false"
        >
          <BasicForm :actionColOptions="{ span: 16 }" @register="registerSeven" class="form-box" />
        </CollapseContainer>

        <CollapseContainer
          title="结题归档需要的材料"
          class="mt-5"
          id="materialSchema4"
          :isTitleLine="true"
          :show="false"
        >
          <BasicForm :actionColOptions="{ span: 16 }" @register="registerEight" class="form-box" />
        </CollapseContainer>

        <div class="text-right form-button" style="text-align: right">
          <a-button
            type="primary"
            @click="saveForm(1)"
            :loading="endLoading"
            :disabled="endLoading || saveLoading"
            class="my-2 mr-3 mt-3"
            >完成课题</a-button
          >
          <a-button
            type="primary"
            @click="saveForm(0)"
            :loading="saveLoading"
            :disabled="endLoading || saveLoading"
            class="my-2 mr-3"
            >保存</a-button
          >
          <a-button @click="goBack(true)">取消</a-button>
        </div>
      </a-col>
      <a-col :span="4">
        <div class="anchor-right">
          <a-anchor
            style="width: 100%"
            @click="handleClick"
            :get-container="getContainer"
            :offsetTop="100"
          >
            <a-anchor-link
              v-for="item in anchorList"
              :key="item.href"
              :href="item.href"
              :title="item.title"
            />
          </a-anchor>
        </div>
      </a-col>
    </a-row>
  </PageWrapper>
</template>

<script lang="ts">
  import { defineComponent, ref, onMounted, unref, reactive, toRefs } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { Anchor, AnchorLink, Row, Col, Select, SelectOption } from 'ant-design-vue';
  import { CropperAvatar } from '/@/components/Cropper';
  import { uploadApi } from '/@/api/sys/upload';
  import { CollapseContainer } from '/@/components/Container';
  import { PageWrapper } from '/@/components/Page';
  import { Icon } from '/@/components/Icon';
  import type { AnchorProps } from 'ant-design-vue';
  import { spSciSubjectAdd, spSciSubjectEdit, spSciSubjectView } from '/@/api/testDemo/scientific';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { useTabs } from '/@/hooks/web/useTabs';
  import { ucenterCodeCombox } from '/@/api/common/index';
  import {
    basicSchemas,
    announcementSchemas,
    reportSchemas,
    messageSchema,
    materialSchema1,
    materialSchema2,
    materialSchema3,
    materialSchema4,
    materialSchema5,
    anchorList,
    createPersonConfig,
    createRoleConfig,
    createBtnConfig,
    FORM_ORDER,
  } from './config/add';
  export default defineComponent({
    name: 'SpSciSubjectAdd',
    components: {
      Icon,
      BasicForm,
      CropperAvatar,
      CollapseContainer,
      PageWrapper,
      aAnchor: Anchor,
      aAnchorLink: AnchorLink,
      ARow: Row,
      ACol: Col,
      ASelect: Select,
      ASelectOption: SelectOption,
    },
    setup() {
      const route = useRoute();
      const router = useRouter();
      const id = ref(route.params.id);
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
        labelWidth: 120,
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
        labelWidth: 120,
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
        labelWidth: 120,
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
        labelWidth: 120,
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
        labelWidth: 120,
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
        labelWidth: 120,
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
        labelWidth: 120,
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
        labelWidth: 120,
        schemas: materialSchema4,
        showActionButtonGroup: false,
      });

      const [
        registerNine,
        {
          validateFields: validateFieldsNine,
          getFieldsValue: getFieldsValueNine,
          setFieldsValue: setFieldsValueNine,
        },
      ] = useForm({
        labelWidth: 120,
        schemas: materialSchema5,
        showActionButtonGroup: false,
      });

      onMounted(() => {
        id.value && getSpSciSubjectView({ id: id.value });

        getUnit();
      });
      const getSpSciSubjectView = (params) => {
        spSciSubjectView(params).then(async (res) => {
          // 处理基础信息图片
          projectPictureFile.value = res.projectPictureFile;

          imgUrl.value = res.projectPictureFile[0]?.filePath
            ? '/dofile' + res.projectPictureFile[0]?.filePath
            : '';
          // 处理起止时间字段
          res = {
            ...res,
            ...{
              '[applyStime, applyEtime]': [res.applyStime, res.applyEtime],
            },
            ...{
              '[proDate, proEndDate]': [res.proDate, res.proEndDate],
            },
            ...{
              '[startDate, endDate]': [res.startDate, res.endDate],
            },
            ...{
              '[checkStime, checkEtime]': [res.checkStime, res.checkEtime],
            },
            ...{
              '[altrStime, altrEtime]': [res.altrStime, res.altrEtime],
            },
            ...{
              '[conclusStime, conclusEtime]': [res.conclusStime, res.conclusEtime],
            },
            ...{
              '[reviewStime, reviewEtime]': [res.reviewStime, res.reviewEtime],
            },
            ...{
              '[openStime, openEtime]': [res.openStime, res.openEtime],
            },
          };
          /**
           * 处理报名人员字段
           */
          const { teamPersons } = res;
          let signPersons_1 = unref<Recordable>({}),
            teamPersons_1 = unref<Recordable>({});

          Object.keys(units).forEach((key) => {
            units[key] = res[key];
          });

          teamPersons.forEach((item, i) => {
            if (i == 0) {
              setFieldsValueFour({ 'personId-0': item.personId, 'role-0': item.role });
            } else {
              teamPersons_1['personId-' + n.value] = item.personId;
              teamPersons_1['role-' + n.value] = item.role;
              addDeclarant(appendSchemaByFieldFour);
            }
          });
          /**
           * 表单赋值
           */
          let order = 0;
          while (order < FORM_ORDER.length) {
            let data =
              FORM_ORDER[order] === 'Three'
                ? { ...signPersons_1, ...res }
                : FORM_ORDER[order] === 'Four'
                ? { ...teamPersons_1, ...res }
                : res;
            await eval(`setFieldsValue${FORM_ORDER[order]}`)(data);
            ++order;
          }
        });
      };

      // 课题图片地址
      const imgUrl = ref('');
      const projectPictureFile = ref<Recordable>([]);

      const handleCropend = () => {};

      const handleReady = () => {};

      const updateAvatar = (_, data) => {
        projectPictureFile.value = data?.data;
      };

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

      const saveForm = async (type = 0) => {
        const API = id.value ? spSciSubjectEdit : spSciSubjectAdd;
        const params = id.value ? { id: Number(id.value) } : {};
        /**
         * 表单验证并获取表单
         */
        let order = 0,
          formObj = unref<Recordable>({});
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
              [FORM_ORDER[order] === 'Three' ? 'signPersons' : 'teamPersons']:
                JSON.stringify(persons),
            });
          } else {
            Object.assign(formObj, form);
          }

          ++order;
        }
        // 处理附件转成JSON格式
        formObj.eventAttachments = JSON.stringify(formObj.eventAttachments);
        formObj.projectAttachments = JSON.stringify(formObj.projectAttachments);
        formObj.midCheckAttachments = JSON.stringify(formObj.midCheckAttachments);
        formObj.changeAttachments = JSON.stringify(formObj.changeAttachments);
        formObj.archiveAttachments = JSON.stringify(formObj.archiveAttachments);
        formObj.openAttachments = JSON.stringify(formObj.openAttachments);
        formObj.reviewAttachments = JSON.stringify(formObj.reviewAttachments);
        Object.assign(formObj, {
          isFinished: type,
          projectPictureFile: JSON.stringify(projectPictureFile.value),
          isClosed: formObj.isClosed ? 1 : 0,
          ...units,
        });

        console.log(units, 'units------');

        // 操作按钮
        setBthStatus(true, type);
        try {
          await API({ ...formObj, ...params });

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
          refreshOtherPage('SpSciSubjectList');
        } else {
          router.push({ name: 'SpSciSubjectList' });
        }
      };
      const setBthStatus = (status, type) => {
        if (type == 1) {
          endLoading.value = status;
        } else {
          saveLoading.value = status;
        }
      };

      const feeUnitOptions: any = ref([]);
      const periodUnitOptions: any = ref([]);
      const units = reactive({ funds: '', feeUnit: '', projPeriod: '', periodUnit: '' });
      const getUnit = () => {
        ucenterCodeCombox({ type: '10001-52063' }).then((res) => {
          feeUnitOptions.value = res?.list;
        });
        ucenterCodeCombox({ type: '10001-52064' }).then((res) => {
          periodUnitOptions.value = res?.list;
        });
      };
      return {
        basicSchemas,
        imgUrl,
        uploadApi: uploadApi as any,
        anchorList,
        saveLoading,
        endLoading,
        feeUnitOptions,
        periodUnitOptions,
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
        registerNine,
        handleAddDeclarant,
        handleDelDeclarant,
        handleClick,
        saveForm,
        goBack,
        ...toRefs(units),
      };
    },
  });
</script>

<style lang="less" scoped>
  .form1 {
    display: flex;
    justify-content: space-between;
  }

  .form-box {
    max-width: 95%;
  }

  :deep(.ant-anchor-ink::before) {
    background-color: #fff !important;
  }

  :deep(.ant-input-number) {
    width: 100%;
  }
</style>
