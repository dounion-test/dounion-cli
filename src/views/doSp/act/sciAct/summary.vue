<!--
 * @Author: 江雪松 576053154@qq.com
 * @Date: 2022-08-09 14:57:02
 * @LastEditors: 江雪松 576053154@qq.com
 * @LastEditTime: 2022-09-22 09:54:26
 * @FilePath: /rural-revitalization/src/views/expstore/expert/module/StepsOne.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <PageWrapper contentBackground>
    <div class="p-4 rule-form-wrap">
      <h2 class="!font-bold title-bar"> 活动总结 </h2>
      <BasicForm @register="registerForm">
        <template #name>
          <div>【{{ editInfo.categoryTypeName }}】{{ editInfo.name }}</div>
        </template>
        <template #content>
          <div style="padding-top: 5px" v-html="editInfo.actContent"></div>
        </template>
        <template #invite>
          <div class="tag-add-list">
            <span v-for="(item, index) in inventList" :key="index">
              <a-tag @close="handleClose(index)" v-if="!item.id" closable>{{ item.name }}</a-tag>
              <a-tag v-if="item.id" closable class="!inline-flex">
                <template #closeIcon>
                  <a-form-item-rest>
                    <a-tooltip>
                      <template #title>专家是否出席</template>
                      <a-checkbox v-model:checked="item.isAttend" />
                    </a-tooltip>
                  </a-form-item-rest>
                </template>
                {{ item.name }}
              </a-tag>
            </span>
            <a-input
              v-if="inputVisible"
              ref="inputRef"
              v-model:value="inputValue"
              type="text"
              size="small"
              :style="{ width: '78px' }"
              @blur="handleInputConfirm"
              @keyup.enter="handleInputConfirm"
            />
            <a-tag v-else style="background: #fff; border-style: dashed" @click="showInput">
              <Icon :size="12" icon="ant-design:plus-outlined" />
              增加出席人
            </a-tag>
          </div>
        </template>
        <template #count>
          <div>{{ editInfo.personCounts }}人</div>
        </template>
        <template #date>
          <div>{{ editInfo.startDate }} ~ {{ editInfo.endDate }}</div>
        </template>
        <template #gradeList>
          <ul class="m-0">
            <li
              v-for="(item, index) in gradeList"
              :key="index"
              class="flex items-center"
              :class="index === 0 ? 'mt-0' : 'mt-2'"
            >
              <a-form-item-rest>
                <a-input
                  v-model:value="item.name"
                  style="width: 200px"
                  placeholder="请输入名称"
                  class="!mr-2"
                />
                <a-input-number
                  v-model:value="item.score"
                  style="width: 100px"
                  placeholder="分数(1~10分)"
                  :min="1"
                  :max="10"
                />
                <span class="ml-2">分</span>
                <Icon
                  :size="20"
                  class="cursor-pointer ml-4"
                  icon="ant-design:plus-circle-outlined"
                  @click="handleAdd"
                />
                <Icon
                  :size="20"
                  class="cursor-pointer ml-2"
                  icon="ant-design:minus-circle-outlined"
                  @click="hanldeDelete"
                  v-if="gradeList.length > 1"
                />
              </a-form-item-rest>
            </li>
          </ul>
        </template>
        <template #pictures="{ model, field }">
          <ImageUpload @change="handleChange" groupName="52030-240" :field="field" />
        </template>
      </BasicForm>
    </div>
    <div class="bg-white" style="text-align: right">
      <a-button class="m-3" type="primary" :loading="btnLoading" @click="validateForm"
        >保存</a-button
      >
      <a-button class="mr-3" @click="goBack()">取消</a-button>
    </div>
  </PageWrapper>
</template>

<script lang="ts">
  import { defineComponent, ref, provide, reactive, nextTick, toRefs } from 'vue';
  import { Form, Input, InputNumber, Tag, Checkbox, Tooltip } from 'ant-design-vue';
  import { PageWrapper } from '/@/components/Page';
  import { Icon } from '/@/components/Icon';
  import { ImageUpload } from '/@/components/ImageUpload';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { schemas } from './config/summary';
  import { useRoute, useRouter } from 'vue-router';
  import { useTabs } from '/@/hooks/web/useTabs';
  import { spSciActSummaryApi, spSciActSummaryViewApi } from '/@/api/doSp/act/sciAct';
  import { cloneDeep } from 'lodash';

  interface State {
    inventList: any[];
    inputVisible: boolean;
    inputValue: string;
  }

  export default defineComponent({
    name: 'SpSciActSummary',
    components: {
      Icon,
      BasicForm,
      PageWrapper,
      ImageUpload,
      AFormItemRest: Form.ItemRest,
      AInput: Input,
      ATag: Tag,
      ACheckbox: Checkbox,
      ATooltip: Tooltip,
      AInputNumber: InputNumber,
    },
    setup() {
      const route = useRoute();
      const router = useRouter();
      const editInfo: any = ref({});
      const btnLoading = ref(false);
      const gradeList = ref([{ name: undefined, score: undefined }]);
      const inputRef = ref();
      const state = reactive<State>({
        inventList: [],
        inputVisible: false,
        inputValue: '',
      });
      const { close, refreshOtherPage } = useTabs();
      const [registerForm, { getFieldsValue, setFieldsValue }] = useForm({
        labelWidth: 120,
        schemas,
        showResetButton: false,
        showSubmitButton: false,
        actionColOptions: {
          span: 24,
        },
      });

      //总结编辑-查看
      const spSciActSummaryView = async () => {
        let res = await spSciActSummaryViewApi({ id: route.params.id });
        editInfo.value = res;
        if (res.gradeList.length > 0) {
          gradeList.value = cloneDeep(res.gradeList);
        }
        res.inventList?.forEach((item) => {
          state.inventList.push({
            ...item,
            isAttend: item.isAttend ? true : false,
          });
        });
        res.attendPersonList?.forEach((item) => {
          state.inventList.push({ name: item });
        });
        setFieldsValue({
          attendPerson: res.attendPerson,
          attendNumber: res.attendNumber,
          reviewContent: res.reviewContent,
          achieveContent: res.achieveContent,
          summaryAttachments: res.summaryAttachments,
        });
      };
      spSciActSummaryView();

      // 上传图片
      const handleChange = (list) => {
        setFieldsValue({ pictures: list });
      };

      // 保存
      const validateForm = async () => {
        const formData = await getFieldsValue();
        if (formData.pictures) {
          let pictures = formData.pictures;
          formData.pictures = pictures.map((item: any) => item.response.data[0]);
        }
        let gradeArr = gradeList.value.filter((item) => {
          return item.name && item.score;
        });
        let inventList: any = [];
        let attendPersonList: any = [];
        state.inventList?.forEach((item) => {
          if (item.id) {
            inventList.push({
              ...item,
              isAttend: item.isAttend ? 1 : 0,
            });
          } else {
            attendPersonList.push(item.name);
          }
        });
        let data: any = {
          id: route.params.id,
          ...formData,
          gradeList: JSON.stringify(gradeArr),
          inventList: JSON.stringify(inventList),
          attendPersonList: attendPersonList.join(','),
        };
        data.pictures = data.pictures ? JSON.stringify(data.pictures) : JSON.stringify([]);
        data.summaryAttachments = data.summaryAttachments
          ? JSON.stringify(data.summaryAttachments)
          : JSON.stringify([]);
        spSciActSummary(data);
      };

      const spSciActSummary = async (obj) => {
        await spSciActSummaryApi(obj);
        goBack();
      };

      const handleAdd = () => {
        gradeList.value.push({ name: undefined, score: undefined });
      };
      const hanldeDelete = (index) => {
        gradeList.value.splice(index, 1);
      };

      const handleClose = (index) => {
        state.inventList.splice(index, 1);
      };

      const showInput = () => {
        state.inputVisible = true;
        nextTick(() => {
          inputRef.value.focus();
        });
      };

      const handleInputConfirm = () => {
        const inputValue = state.inputValue;
        if (inputValue) {
          state.inventList.push({ name: inputValue });
        }
        state.inputVisible = false;
        state.inputValue = '';
      };

      // 取消
      const goBack = (status = false) => {
        close(router.currentRoute.value);
        if (status) {
          refreshOtherPage('SpSciActList');
        } else {
          router.push({ name: 'SpSciActList' });
        }
      };

      provide('editInfo', editInfo);

      return {
        editInfo,
        btnLoading,
        gradeList,
        registerForm,
        handleChange,
        validateForm,
        handleAdd,
        hanldeDelete,
        goBack,

        ...toRefs(state),
        handleClose,
        showInput,
        handleInputConfirm,
        inputRef,
      };
    },
  });
</script>

<style lang="less" scoped>
  @import '/@/design/rule-form.less';
  .tag-add-list {
    margin-top: -8px;
    :deep(.ant-tag) {
      margin-top: 8px;
    }
  }
</style>
