<!--
 * @Author: 江雪松 576053154@qq.com
 * @Date: 2022-09-03 17:27:38
 * @LastEditors: 江雪松 576053154@qq.com
 * @LastEditTime: 2022-09-15 18:17:42
 * @FilePath: /RuralSurveyPc/src/views/doPc/survey/surveyForm.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <PageWrapper contentFullHeight contentBackground v-loading="loadingRef">
    <a-row :gutter="[16, 16]">
      <a-col :span="20">
        <div class="m-auto filling-wrap">
          <a-typography v-if="surveyInfo">
            <a-typography-title :level="3" class="text-center">{{
              surveyInfo.surName
            }}</a-typography-title>
            <p class="desc">{{ surveyInfo.remark }}</p>
          </a-typography>
          <template v-if="surveyInfo.templateList?.length">
            <div v-for="(items, i) in surveyInfo.templateList" :key="i">
              <ul class="filling-form-list" v-if="items.categoryList.length">
                <li v-for="(item, index) in items.categoryList" :key="item.id" :id="item.id">
                  <a-typography-title :level="4" class="item-nav">{{
                    item.categoryName
                  }}</a-typography-title>
                  <FormItem
                    :data="item"
                    :categoryIndex="index"
                    :isSave="isSave"
                    class="form-item"
                  />
                </li>
              </ul>
            </div>
          </template>

          <!-- <p class="thank-text">感谢您的参与！</p>
      <div class="mt-4 form-button">
        <a-button @click="handleSave" type="primary">保存</a-button>
        <a-button class="ml-4" @click="goBack()">取消</a-button>
      </div> -->
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
  import { defineComponent, ref, provide } from 'vue';
  import { Typography, TypographyTitle, Anchor, AnchorLink, Row, Col } from 'ant-design-vue';
  import { PageWrapper } from '/@/components/Page';
  import FormItem from './module/FormItem.vue';
  import { opTemplateLoadSurveyByFillCombox } from '/@/api/doOp/index';
  import { useRoute, useRouter } from 'vue-router';
  import { useMessage } from '/@/hooks/web/useMessage';
  import type { AnchorProps } from 'ant-design-vue';

  export default defineComponent({
    components: {
      FormItem,
      PageWrapper,
      ATypography: Typography,
      ATypographyTitle: TypographyTitle,
      aAnchor: Anchor,
      aAnchorLink: AnchorLink,
      ARow: Row,
      ACol: Col,
    },
    setup() {
      const isSave = ref(false);
      const loadingRef = ref(false);
      const route = useRoute();
      const router = useRouter();
      const surveyInfo: any = ref({});
      const answerArr: any = ref([]);
      const categoryList = ref([]);
      const anchorList: any = ref([]);
      const { createMessage } = useMessage();

      const getList = async () => {
        loadingRef.value = true;
        surveyInfo.value = await opTemplateLoadSurveyByFillCombox({
          // taskObjectId: route.params.taskObjectId,
          // templateId: route.params.templateId,
          surId: route.params.id,
        });
        surveyInfo.value.templateList.forEach((v) => {
          v.categoryList?.forEach((w) => {
            anchorList.value.push({
              title: w.categoryName,
              href: `#${w.id}`,
            });
          });
        });

        console.log(anchorList.value, '==========');

        loadingRef.value = false;
      };
      getList();

      const handleSave = () => {
        answerArr.value = [];
        isSave.value = !isSave.value;
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
                let otherInput = '';
                if (item.type == '52020-20') {
                  selectValue = answerObj[key];
                  otherInput = answerObj[`${key}-other`] ? answerObj[`${key}-other`] : undefined;
                }
                if (item.type == '52020-30') {
                  selectValue = answerObj[key].join(',');
                  otherInput = answerObj[`${key}-other`] ? answerObj[`${key}-other`] : undefined;
                }
                list.push({
                  templateId: route.params.templateId,
                  subjectId: item.id,
                  orderNo: item.orderNo,
                  selectValue,
                  blankValue: item.type == '52020-10' ? answerObj[key] : otherInput,
                });
              }
            }
            flatten(item.children || item.subjectList, answerObj, answerArr);
          }
        }
        return list;
      };

      provide('categoryList', categoryList);
      const getContainer = (): HTMLElement => {
        return document.querySelector(`.layouts-scroll .scrollbar__wrap`) as HTMLElement;
      };
      const handleClick: AnchorProps['onClick'] = (e, link) => {
        e.preventDefault();
      };
      return {
        isSave,
        loadingRef,
        surveyInfo,
        categoryList,
        anchorList,
        handleSave,
        goBack,
        getContainer,
        handleClick,
      };
    },
  });
</script>

<style lang="less" scoped>
  .filling-wrap {
    min-width: 750px;
    width: 70%;
    max-width: 1000px;
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

      .form-item {
        margin: 0 15px;
        margin-top: 15px;
      }
    }
  }

  .thank-text {
    font-size: @font-size-b2;
  }

  .form-button {
    text-align: center;

    .ant-btn {
      width: 154px;
      height: 48px;
      border-radius: 8px;
    }
  }

  @media screen and (max-width: 1537px) {
    .form-button {
      .ant-btn {
        width: 104px;
        height: 38px;
      }
    }
  }

  .anchor-right {
    height: 100%;
    padding-top: 30px;
  }
</style>
