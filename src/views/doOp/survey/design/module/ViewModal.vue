<!--
 * @Author: 江雪松 576053154@qq.com
 * @Date: 2022-09-03 17:27:38
 * @LastEditors: 江雪松 576053154@qq.com
 * @LastEditTime: 2022-09-06 13:39:09
 * @FilePath: /RuralSurveyPc/src/views/doPc/survey/surveyForm.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <PageWrapper contentFullHeight contentBackground v-loading="loadingRef">
    <div style="width: 750px" class="m-auto">
      <a-typography v-if="surveyInfo">
        <a-typography-title :level="3" class="text-center">{{
          surveyInfo.name
        }}</a-typography-title>
        <a-typography-paragraph>{{ surveyInfo.remark }}</a-typography-paragraph>
      </a-typography>
      <ul v-if="categoryList.length > 0">
        <li v-for="(item, index) in categoryList" :key="item.id" class="form-module">
          <a-typography-title :level="4" class="text-center item-nav">{{
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
      <div style="text-align: center">感谢您的参与！</div>
      <div style="text-align: center" class="mt-4">
        <a-button @click="handleSave" type="primary">保存</a-button>
        <a-button class="ml-4" @click="goBack()">取消</a-button>
      </div>
    </div>
  </PageWrapper>
</template>

<script lang="ts">
  import { defineComponent, ref, provide } from 'vue';
  import { Typography } from 'ant-design-vue';
  import { PageWrapper } from '/@/components/Page';
  import FormItem from './FormItem.vue';
  import { opAnswerReportLoadSurveyApi } from '/@/api/doOp/index';
  import { useRoute, useRouter } from 'vue-router';
  import { useMessage } from '/@/hooks/web/useMessage';

  export default defineComponent({
    components: {
      FormItem,
      PageWrapper,
      ATypography: Typography,
      ATypographyTitle: Typography.Title,
      ATypographyParagraph: Typography.Paragraph,
    },
    setup() {
      const isSave = ref(false);
      const loadingRef = ref(false);
      const route = useRoute();
      const router = useRouter();
      const surveyInfo = ref();
      const answerArr: any = ref([]);
      const categoryList = ref([]);
      const { createMessage } = useMessage();

      const getList = async () => {
        loadingRef.value = true;
        surveyInfo.value = await opAnswerReportLoadSurveyApi({
          taskObjectId: route.query.id,
          templateId: route.query.templateId,
        });
        categoryList.value = surveyInfo.value.categoryList;
        loadingRef.value = false;
      };
      getList();

      const handleSave = () => {
        answerArr.value = [];
        isSave.value = !isSave.value;
      };

      const handleFormSave = async (data, index) => {
        // answerArr.value[index] = data;
        // if (answerArr.value.length != categoryList.value.length) {
        //   return false;
        // }
        // let answerObj = {};
        // answerArr.value.forEach((item) => {
        //   Object.assign(answerObj, item);
        // });
        // let answerDetailList = await flatten(categoryList.value, answerObj, []);
        // await opAnswerReportSaveFillApi({
        //   taskObjectId: route.params.taskObjectId,
        //   answerDetailList: JSON.stringify(answerDetailList),
        // });
        // createMessage.success('操作成功');
        goBack();
      };

      // 取消
      const goBack = () => {
        router.push({ name: 'SurveyDetailPage', params: { id: route.params.taskObjectId } });
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
              if (key == `form-${item.id}`) {
                let selectValue = undefined;
                if (item.type == '52020-20') {
                  selectValue = answerObj[key];
                }
                if (item.type == '52020-30') {
                  selectValue = answerObj[key].join(',');
                }
                list.push({
                  templateId: route.params.templateId,
                  subjectId: item.id,
                  orderNo: item.orderNo,
                  selectValue,
                  blankValue: item.type == '52020-10' ? answerObj[key] : undefined,
                });
              }
            }
            flatten(item.children || item.subjectList, answerObj, answerArr);
          }
        }
        return list;
      };

      provide('categoryList', categoryList);

      return {
        isSave,
        loadingRef,
        surveyInfo,
        categoryList,
        handleSave,
        handleFormSave,
        goBack,
      };
    },
  });
</script>

<style lang="less" scoped>
  .form-module {
    border: 1px solid #d9d9d9;
    margin-bottom: 30px;
  }

  .item-nav {
    background: #d9d9d9;
  }

  .form-item {
    margin: 0 15px;
    margin-top: 15px;
  }
</style>
