<!--
 * @Author: your name
 * @Date: 2022-05-24 18:05:16
 * @LastEditTime: 2022-10-27 18:11:51
 * @LastEditors: 江雪松 576053154@qq.com
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /vben-admin-thin-next-main/src/views/systemManager/ucenterPerson/pageSave.vue
-->
<template>
  <PageWrapper contentFullHeight contentBackground>
    <div class="pl-3 pr-3 flex flex-col h-full" :class="autoHeight ? 'info-wrap' : ''">
      <a-tabs v-model:activeKey="activeKey" class="tab-full" @change="tabsChange">
        <a-tab-pane key="1" tab="基本信息">
          <BasicInfo
            ref="BasicInfoRef"
            :basicFormObj="basicFormObj"
            :fillbackImgObj="fillbackImgObj"
          />
        </a-tab-pane>
        <a-tab-pane key="2" tab="组织信息" force-render>
          <OrganizationInfo
            ref="OrganizationInfoRef"
            :backfillKeys="organizeKeys"
            :backfillOrgs="backfillOrgs"
          />
        </a-tab-pane>
        <a-tab-pane key="3" tab="角色信息" force-render>
          <RoleInfo ref="RoleInfoRef" :backfillKeys="roleKeys" />
        </a-tab-pane>
        <a-tab-pane key="4" tab="其他信息" force-render>
          <OtherInfo ref="OtherInfoRef" :otherFormObj="otherFormObj" />
        </a-tab-pane>
      </a-tabs>
      <div class="text-right form-button">
        <a-button class="m-3" type="primary" :loading="btnLoading" @click="validateForm"
          >保存</a-button
        >
        <a-button class="mr-3" @click="goBack()">取消</a-button>
      </div>
    </div>
  </PageWrapper>
</template>

<script lang="ts">
  import RoleInfo from './module/RoleInfo.vue';
  import BasicInfo from './module/BasicInfo.vue';
  import OtherInfo from './module/OtherInfo.vue';
  import OrganizationInfo from './module/OrganizationInfo.vue';
  import { defineComponent, ref, reactive, toRefs, nextTick } from 'vue';
  import { Tabs, TabPane, Row, Col, Checkbox, CheckboxGroup } from 'ant-design-vue';
  import { schemas, schemasOther, stateInterface } from './config/add';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { useRoute, useRouter } from 'vue-router';
  import { cloneDeep } from 'lodash-es';
  import { useTabs } from '/@/hooks/web/useTabs';
  import { PageWrapper } from '/@/components/Page';
  import {
    ucenterPersonAddNewApi,
    ucenterPersonTypeViewApi,
    ucenterPersonSaveNewApi,
  } from '/@/api/testDemo/person';
  import {
    UcenterPersonAddParams,
    UcenterPersonSaveParams,
  } from '/@/api/testDemo/model/personModel';
  export default defineComponent({
    components: {
      BasicInfo,
      RoleInfo,
      OtherInfo,
      ATabs: Tabs,
      ATabPane: TabPane,
      [Row.name]: Row,
      [Col.name]: Col,
      [Checkbox.name]: Checkbox,
      [CheckboxGroup.name]: CheckboxGroup,
      PageWrapper,
      OrganizationInfo,
    },
    setup() {
      const BasicInfoRef = ref<InstanceType<typeof BasicInfo>>();
      const OrganizationInfoRef = ref<InstanceType<typeof OrganizationInfo>>();
      const RoleInfoRef = ref<InstanceType<typeof RoleInfo>>();
      const OtherInfoRef = ref<InstanceType<typeof OtherInfo>>();
      let activeKey = ref('1');
      let autoHeight = ref(false);
      const route = useRoute();
      const router = useRouter();
      const { close, refreshOtherPage } = useTabs();
      const state = reactive<stateInterface>({
        roleIds: [],
        ucenterPersonOrgs: [],
        ucenterPersonOrgsStatsu: false,
        editRes: {},
        btnLoading: false,
        basicFormObj: {},
        otherFormObj: {},
        organizeKeys: [],
        backfillOrgs: [],
        roleKeys: [],
        fillbackImgObj: {},
      });
      const { createMessage } = useMessage();
      // 表单提交
      const validateForm = async () => {
        try {
          // 验证基本信息
          await BasicInfoRef.value?.validateFields();
          const basicForm = await BasicInfoRef.value?.getFieldsValue();
          // 验证组织信息
          const organizeList: any[] | undefined = OrganizationInfoRef.value?.organizeList;
          const organizeValue = OrganizationInfoRef.value?.organizeValue;
          if (organizeList?.length === 0) {
            activeKey.value = '2';
            createMessage.warning('请选择组织信息');
            return false;
          }
          if (!organizeValue) {
            activeKey.value = '2';
            createMessage.warning('请在组织信息中选择是否主组织');
            return false;
          }
          state.ucenterPersonOrgs = [];
          organizeList?.forEach((item) => {
            state.ucenterPersonOrgs.push({
              deptId: item.id,
              isMain: item.id == organizeValue ? '1' : '0',
              isMainPerson: item.cadre ? '1' : '0',
            });
          });
          // 验证角色信息
          const roleList: any[] | undefined = RoleInfoRef.value?.roleList;
          if (roleList?.length === 0) {
            activeKey.value = '3';
            createMessage.warning('请选择角色信息');
            return false;
          }
          state.roleIds = roleList?.map((item) => item.id);
          // 获取其他信息
          const otherForm: any = await OtherInfoRef.value?.getFieldsValue();
          const partyId = cloneDeep(otherForm.partyId);
          otherForm.partyId = partyId ? partyId.key : '';
          otherForm.partyName = partyId ? partyId.label : '';
          // 合并数据
          const sendFormData = {
            ...basicForm,
            ...otherForm,
            // 头像
            personImg: BasicInfoRef.value?.imgObj ? JSON.stringify(BasicInfoRef.value.imgObj) : '',
            ucenterPersonOrgs: JSON.stringify(state.ucenterPersonOrgs),
            roleIds: state.roleIds?.join(','),
          };
          state.btnLoading = true;
          let res = route.params.id
            ? ucenterPersonSaveNewApi({
                ...sendFormData,
                id: route.params.id as unknown as string,
              } as UcenterPersonSaveParams)
            : ucenterPersonAddNewApi(sendFormData as UcenterPersonAddParams);
          res
            .then(() => {
              state.btnLoading = false;
              createMessage.success('操作成功');
              goBack(true);
            })
            .catch(() => {
              state.btnLoading = false;
            });
        } catch (error: any) {
          activeKey.value = '1';
          createMessage.warning(error.errorFields[0].errors[0]);
        }
      };
      // 回填函数
      const getUcenterPersonView = () => {
        ucenterPersonTypeViewApi({ id: route.params.id as unknown as number }).then((res) => {
          state.editRes = res;
          // 回填基本信息
          schemas.forEach((item) => {
            state.basicFormObj[item.field] = res[item.field];
          });
          // 回填其他信息
          schemasOther.forEach((item) => {
            if (item.field == 'partyId') {
              state.otherFormObj[item.field] = {
                label: res.partyName,
                value: res.partyName,
                key: res.partyId,
              };
            } else {
              state.otherFormObj[item.field] = res[item.field];
            }
          });
          // 回填组织信息
          state.backfillOrgs = res.ucenterPersonOrgs;
          state.ucenterPersonOrgs = res.ucenterPersonOrgs;
          state.organizeKeys = res.ucenterPersonOrgs.map((item) => item.deptId);
          //角色回填
          let arr = res.roleIds ? res.roleIds.split(',') : [];
          state.roleKeys = arr.map((it) => it - 0);
          // 头像回填
          state.fillbackImgObj = res.personImg;
        });
      };
      // 取消
      const goBack = (status = false) => {
        close(router.currentRoute.value);
        if (status) {
          refreshOtherPage('UcenterPersonList');
        } else {
          router.push({ name: 'UcenterPersonList' });
        }
      };
      // 编辑
      if (route.params.type === 'edit') {
        nextTick(() => {
          getUcenterPersonView();
        });
      }
      const tabsChange = (tab) => {
        autoHeight.value = tab == 2 || tab == 3 ? true : false;
      };
      return {
        ...toRefs(state),
        activeKey,
        autoHeight,
        BasicInfoRef,
        OrganizationInfoRef,
        RoleInfoRef,
        OtherInfoRef,
        validateForm,
        goBack,
        tabsChange,
      };
    },
  });
</script>

<style lang="less" scoped>
  .info-wrap {
    display: flex;
    flex-direction: column;
    height: calc(100vh - 120px);
  }

  .tab-full {
    height: 100%;

    :deep(.ant-tabs-content) {
      height: 100%;
    }

    :deep(.ant-row),
    :deep(.ant-col) {
      height: 100%;
    }
  }
</style>
