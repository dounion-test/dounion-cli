<template>
  <BasicModal
    v-bind="$attrs"
    destroyOnClose
    :defaultFullscreen="true"
    @register="registerModal"
    :title="title"
    @ok="handleSave"
  >
    <div class="filling-wrap" v-loading="loadingRef">
      <ul class="filling-form-list" v-if="categoryList.length">
        <li v-for="(item, index) in categoryList" :key="item.id">
          <a-typography-title :level="4" class="item-nav">{{
            item.categoryName
          }}</a-typography-title>
          <FormItem
            :categoryIndex="index"
            :isSave="isSave"
            @save="handleFormSave"
            class="form-item"
          />
        </li>
      </ul>
    </div>
  </BasicModal>
</template>

<script lang="ts">
  import { defineComponent, ref, provide } from 'vue';
  import { TypographyTitle } from 'ant-design-vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import FormItem from './FormItem.vue';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { opAnswerReportApprovalFillSaveApi } from '/@/api/doOp/approval';
  import { opAnswerReportLoadSurveyApi } from '/@/api/doOp/index';

  export default defineComponent({
    components: { BasicModal, FormItem, ATypographyTitle: TypographyTitle },
    emits: ['success'],
    setup(_, { emit }) {
      const loadingRef = ref(false);
      const isSave = ref(false);
      const info: any = ref({});
      const title = ref('');
      const answerArr: any = ref([]);
      const categoryList: any = ref([]);
      const taskObjectId: any = ref();
      const { createMessage } = useMessage();

      const [registerModal, { closeModal, setModalProps }] = useModalInner(async (data) => {
        info.value = data.records;
        title.value = data.records.name;
        taskObjectId.value = data.taskObjectId;
        loadingRef.value = true;
        try {
          await getList({
            taskObjectId: data.taskObjectId,
            templateId: data.records.templateId,
          });
          loadingRef.value = false;
        } catch (error) {
          loadingRef.value = false;
        }
      });

      const getList = async (obj) => {
        let res = await opAnswerReportLoadSurveyApi(obj);
        categoryList.value = res.categoryList;
      };

      const handleSave = () => {
        answerArr.value = [];
        isSave.value = !isSave.value;
      };

      // 子组件保存回调
      const handleFormSave = async (data, index) => {
        answerArr.value[index] = data;
        let isNextStep = false;
        for (let i = 0; i < answerArr.value.length; i++) {
          if (!answerArr.value[i]) {
            isNextStep = true;
          }
        }
        if (isNextStep || answerArr.value.length != categoryList.value.length) {
          return false;
        }
        let answerObj = {};
        answerArr.value.forEach((item) => {
          Object.assign(answerObj, item);
        });
        let answerDetailList = await flatten(categoryList.value, answerObj, []);
        try {
          setModalProps({ confirmLoading: true });
          await opAnswerReportApprovalFillSaveApi({
            taskObjectId: taskObjectId.value,
            answerDetailList: JSON.stringify(answerDetailList),
          });
          createMessage.success('操作成功');
          emit('success');
          closeModal();
        } catch (error) {
          setModalProps({ confirmLoading: false });
        }
      };

      // 遍历树型结构数组
      const flatten = (arr, answerObj, answerArr) => {
        let list = answerArr;
        for (const item of arr) {
          if (
            (item.children || item.subjectList) &&
            (Array.isArray(item.children) || Array.isArray(item.subjectList))
          ) {
            for (let key in answerObj) {
              if (item.categoryId && key == `form-${item.id}`) {
                let selectValue = undefined;
                let otherInput = '';
                if (item.type == '52020-20') {
                  selectValue = answerObj[key];
                  otherInput = answerObj[`${key}-other`] ? answerObj[`${key}-other`] : undefined;
                }
                if (item.type == '52020-30') {
                  selectValue = answerObj[key].join(',');
                  otherInput = answerObj[`${key}-other`] ? answerObj[`${key}-other`] : undefined;
                }
                let itemObj: any = {
                  templateId: info.value.templateId,
                  subjectId: item.id,
                  orderNo: item.orderNo,
                  selectValue,
                  blankValue: item.type == '52020-10' ? answerObj[key] : otherInput,
                };
                if (item.answerDetailList.length > 0) {
                  itemObj.id = item.answerDetailList[0].id;
                }
                list.push(itemObj);
              }
            }
            flatten(item.children || item.subjectList, answerObj, answerArr);
          }
        }
        return list;
      };

      provide('categoryList', categoryList);

      return {
        info,
        title,
        isSave,
        loadingRef,
        categoryList,
        registerModal,
        handleSave,
        handleFormSave,
      };
    },
  });
</script>

<style lang="less" scoped>
  .filling-wrap {
    min-width: 750px;
    width: 70%;
    margin: 0 auto;
    padding: 30px 0 50px;

    :deep(.ant-typography) {
      h3 {
        font-size: @font-size-b16;
      }
    }

    .desc {
      padding: 20px 0 10px;
      font-size: @font-size-b4;
    }

    .item-nav {
      padding: 5px 15px;
      font-weight: normal;
      text-align: left;
      background: #f5f5f5;
    }
  }

  .filling-form-list {
    li {
      border: 1px solid #d9d9d9;
      margin-bottom: 10px;
      font-size: @font-size-b4;

      .form-item {
        margin: 0 15px;
        margin-top: 15px;
      }
    }
  }
</style>
