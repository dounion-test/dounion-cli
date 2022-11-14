<!--
 * @Author: 江雪松 576053154@qq.com
 * @Date: 2022-08-18 20:51:36
 * @LastEditors: 江雪松 576053154@qq.com
 * @LastEditTime: 2022-09-20 09:58:11
 * @FilePath: /rural-revitalization/src/components/SearchWrap/src/SearchList.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <ScrollContainer>
    <div
      class="search-con-box"
      :class="{
        'overflow-y-auto': show,
        'si-max-h': searchCount < 6,
        'si-box': searchCount > 6,
      }"
    >
      <a-row class="p-4">
        <a-col
          class="!flex search-form-item"
          v-for="(item, index) in searchList"
          :key="item.field"
          :span="item.isShow === false ? 0 : item.span || 24"
          :class="{ 'si-col-h': index >= searchCount }"
        >
          <div v-show="index < searchCount" class="label">{{ item.label }}</div>
          <div v-show="index < searchCount" class="flex-1">
            <!-- 文本框 -->
            <a-input
              class="input-text"
              v-if="item.type == 'input'"
              v-model:value="item.value"
              :bordered="false"
              allow-clear
              :placeholder="item.placeholder"
            />
            <!-- 选择框 -->
            <a-select
              @click.stop
              class="input-select"
              v-if="item.type == 'select'"
              v-model:value="item.value"
              allowClear
              labelInValue
              :bordered="false"
              :options="item.options"
              :placeholder="item.placeholder"
              :getPopupContainer="getContainerBox"
            />
            <!-- ApiSelect -->
            <ApiSelect
              :api="item.api"
              allowClear
              :bordered="false"
              labelInValue
              class="input-select"
              v-if="item.type == 'ApiSelect'"
              v-model:value="item.value"
              :filterOption="false"
              :resultField="item.resultField"
              :labelField="item.labelField"
              :valueField="item.valueField"
              :params="item.searchParams"
              :placeholder="item.placeholder"
              :getPopupContainer="getContainerBox"
            />
            <!-- ApiTreeSelect -->
            <ApiTreeSelect
              :api="item.api"
              allowClear
              :bordered="false"
              labelInValue
              class="input-select"
              v-if="item.type == 'ApiTreeSelect'"
              v-model:value="item.value"
              :filterOption="false"
              :fieldNames="item.fieldNames"
              :treeNodeFilterProp="item.treeNodeFilterProp"
              :params="item.searchParams"
              :placeholder="item.placeholder"
              :getPopupContainer="getContainerBox"
            />
            <!-- 选择tag -->
            <TagList
              v-if="item.type == 'tag'"
              :record="item"
              @change="(ids, index) => handleTagChange(ids, index, item)"
              :itemIndex="index"
            />

            <a-checkable-tag
              v-if="item.type == 'defaultTag'"
              v-for="(j, i) in item.options"
              v-model:checked="j.checked"
              :key="item.value"
              @change="handleCheckChange(j, i, item)"
            >
              {{ j.label }}
            </a-checkable-tag>

            <!-- 日期选择 -->
            <a-date-picker
              class="w-full sl-range-picker"
              allowClear
              :bordered="false"
              :picker="item.picker"
              :valueFormat="item.valueFormat"
              v-if="item.type == 'datePicker'"
              v-model:value="item.value"
              :getPopupContainer="getContainerBox"
            />

            <!-- 开始时间-结束时间 -->
            <a-range-picker
              class="w-full sl-range-picker"
              allowClear
              :bordered="false"
              :valueFormat="item.valueFormat"
              v-if="item.type == 'rangePicker'"
              v-model:value="item.value"
              :getPopupContainer="getContainerBox"
            />
          </div>
        </a-col>
      </a-row>
    </div>
    <div @click="handleShow" class="si-more mt-1 pl-4" v-if="searchList.length > 6">
      <span class="mr-1">{{ show ? '收起' : '查看更多搜索条件' }}</span>
      <Icon icon="ant-design:down-outlined" :class="{ 'si-rotate': show }" />
    </div>
  </ScrollContainer>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { Row, Col, Input, Select, DatePicker, Tag } from 'ant-design-vue';
  import { ApiSelect, ApiTreeSelect } from '/@/components/Form';
  import TagList from './TagList.vue';
  import { Icon } from '/@/components/Icon';
  import { ScrollContainer } from '/@/components/Container';
  import { searchListItem } from './types/searchList';
  import { mergeWith } from 'lodash';

  export default defineComponent({
    components: {
      Icon,
      TagList,
      ApiSelect,
      ApiTreeSelect,
      ARow: Row,
      ACol: Col,
      AInput: Input,
      ASelect: Select,
      ScrollContainer,
      ARangePicker: DatePicker.RangePicker,
      ADatePicker: DatePicker,
      ACheckableTag: Tag.CheckableTag,
    },
    props: {
      searchList: {
        type: Array,
        default: () => [],
      },
    },
    setup(props) {
      const show = ref(false);
      const searchCount = ref(6);

      const handleShow = () => {
        show.value = !show.value;
        if (show.value) {
          searchCount.value = props.searchList.length;
        } else {
          searchCount.value = 6;
        }
      };

      const updateSchema = (params: searchListItem) => {
        const { field, ...attr } = params;

        props.searchList.map((list: searchListItem) => {
          if (list.field === field) {
            mergeWith(list, attr);
          }
        });
      };

      const handleTagChange = (ids, index, item) => {
        props.searchList.forEach((item: any, i) => {
          if (i == index) {
            item.value = ids.length > 0 ? ids : undefined;
          }
        });

        //搜索联动
        let { componentProps, value } = item;
        if (componentProps && typeof componentProps == 'function') {
          //更新
          const formActionType = { updateSchema };
          componentProps = componentProps({ formActionType });
          let { onChange } = componentProps;
          if (typeof onChange !== 'function') return;
          onChange({ value });
        }
      };

      const getContainerBox = () => {
        return document.querySelector(`.si-wrap`);
      };

      const handleCheckChange = (item, index: number, target) => {
        target?.options?.forEach((j: any, i: number) => {
          j.checked = index === i;
        });
        const newList: any = props.searchList.filter((k) => k.field === target.field);
        if (newList.length) {
          newList[0].value = item;
          props.searchList = newList;
        }
      };

      return {
        show,
        searchCount,
        handleShow,
        getContainerBox,
        handleTagChange,
        handleCheckChange,
      };
    },
  });
</script>

<style lang="less" scoped>
  .search-form-item {
    margin-top: 5px;

    &:first-child {
      margin-top: 0;
    }

    .label {
      width: 120px;
      line-height: 32px;
      display: inline-flex;
      align-items: flex-start;
    }

    .input-text,
    .input-select {
      border: 0 none;
      border-bottom: 1px solid #d9d9d9;
    }

    :deep(.ant-tag) {
      padding: 0 15px;
      margin-bottom: 1px;
      margin-right: 2px;
      line-height: 30px;

      &:hover {
        background-color: #f0f7ff;
      }

      &-checkable-checked {
        color: #fff;

        &:hover {
          color: @primary-color;
        }
      }
    }
  }

  .si-rotate {
    transform: rotate(180deg);
    transition: transform 0.2s;
  }

  .sl-range-picker {
    border-bottom-color: #d9d9d9 !important;
  }

  .si-col-h {
    height: 0;
    margin-bottom: 0;
  }

  .search-con-box {
    max-height: 246px;
    overflow: hidden;

    .ant-row {
      max-height: 246px;
      overflow: auto;
    }
  }

  .si-box {
    height: 246px;
  }

  .si-max-h {
    max-height: 246px;
  }

  .si-more {
    font-size: 12px;
    color: @primary-color;
    display: flex;
    align-items: center;
  }
  .ant-col-0 {
    display: none !important;
  }
  [data-theme='dark'] {
    .search-form-item {
      .input-text,
      .input-select {
        border-bottom-color: #999;
      }
      .sl-range-picker {
        border-bottom-color: #999 !important;
      }
    }
  }
</style>
