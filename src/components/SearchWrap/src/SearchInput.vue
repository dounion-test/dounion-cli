<template>
  <ClickOutSide @click-outside="handleClickOutside">
    <div class="si-wrap relative" :class="searchArr.length ? 'search-wrapper' : 'search-simple'">
      <div class="bg-white si-shadow">
        <a-input
          :bordered="false"
          v-model:value="searchValue"
          :placeholder="placeholder"
          @keydown.enter="handleKeyDown"
          @change="handleCanplay"
          allowClear
        >
          <template #prefix>
            <Icon icon="ant-design:search-outlined" class="search-icon" />
          </template>
          <template #suffix v-if="searchArr.length">
            <div @click="handleShow" class="cursor-pointer si-suffix">
              <span class="mr-2">高级搜索</span>
              <Icon
                icon="ant-design:down-outlined"
                :class="{ 'sl-rotate-180': show, 'sl-rotate-0': !show }"
              />
            </div>
          </template>
        </a-input>
      </div>
      <ExpandTransition>
        <SearchList
          @search="handleSearch"
          @reset="handleReset()"
          v-show="show"
          :searchList="searchArr"
        />
      </ExpandTransition>
      <div class="selected-tags" v-if="hasCondition && tagList.length">
        <a-tag
          closable
          v-for="(item, index) in tagList"
          :key="item.value"
          @close="handleClose(item, index)"
        >
          {{ item.label }}：{{ item.labelValue }}
        </a-tag>
        <span v-if="tagList.length > 0" class="clear" @click="handleReset()">清除</span>
      </div>
    </div>
  </ClickOutSide>
</template>

<script lang="ts">
  import { defineComponent, provide, ref } from 'vue';
  import { Input, Tag } from 'ant-design-vue';
  import { Icon } from '/@/components/Icon';
  import SearchList from './SearchList.vue';
  import { ExpandTransition } from '/@/components/Transition';
  import { ClickOutSide } from '/@/components/ClickOutSide';
  import { searchListType, searchListItem } from './types/searchList';
  import { cloneDeep, merge } from 'lodash';

  export default defineComponent({
    name: 'SearchIput',
    components: {
      Icon,
      SearchList,
      ClickOutSide,
      ExpandTransition,
      AInput: Input,
      ATag: Tag,
    },
    props: {
      // 是否有搜索条件tag区域
      hasCondition: {
        type: Boolean,
        default: true,
      },
      // input占位
      placeholder: {
        type: String,
        default: '',
      },
      // 高级筛选列表（具体配置可查看type/searchList.ts）
      searchList: {
        type: Array as PropType<searchListType>,
        default: () => [],
      },
    },
    emits: ['search'],
    setup(props, { emit }) {
      const show = ref(false);
      const tagList: any = ref([]);
      const isReset = ref(false);
      const closeField = ref('');
      const searchValue = ref('');
      const searchArr = ref(props.searchList);

      const handleShow = () => {
        show.value = !show.value;
        searchValue.value = '';
      };

      const handleClickOutside = () => {
        show.value = false;
      };

      const handleKeyDown = () => {
        handleReset(true);
        show.value = false;
        emit('search', searchValue.value, tagList.value);
      };

      // 输入框置空时触发
      const handleCanplay = (e) => {
        if (!e.target.value) {
          handleKeyDown();
        }
      };

      const handleSearch = () => {
        let allSearchList: any = [];
        tagList.value = [];
        searchValue.value = '';
        searchArr.value?.forEach((item: any) => {
          if (item.type == 'rangePicker') {
            allSearchList.push({
              label: item.label,
              labelValue: item.value ? `${item.value[0]} - ${item.value[1]}` : '',
              value: item.value,
              field: item.field,
              type: item.type,
            });
            item.value &&
              tagList.value.push({
                label: item.label,
                labelValue: `${item.value[0]} - ${item.value[1]}`,
                value: item.value,
                field: item.field,
                type: item.type,
              });
          }
          if (item.type == 'datePicker') {
            allSearchList.push({
              label: item.label,
              labelValue: item.value,
              value: item.value,
              field: item.field,
              type: item.type,
            });
            item.value &&
              tagList.value.push({
                label: item.label,
                labelValue: item.value,
                value: item.value,
                field: item.field,
                type: item.type,
              });
          }
          if (item.type == 'tag') {
            let tagLable: any = [];
            let tagValue: any = [];
            if (item.value) {
              item.value.forEach((it) => {
                tagLable.push(it[item.labelField]);
                tagValue.push(it[item.valueField]);
              });
              tagList.value.push({
                label: item.label,
                labelValue: tagLable.join(','),
                value: tagValue.join(','),
                field: item.field,
                type: item.type,
              });
            }

            allSearchList.push({
              label: item.label,
              labelValue: tagLable.length > 0 ? tagLable.join(',') : '',
              value: tagValue.length > 0 ? tagValue.join(',') : undefined,
              field: item.field,
              type: item.type,
            });
          }
          if (item.type == 'defaultTag') {
            allSearchList.push({
              label: item.label,
              labelValue: item.value.label,
              value: item.value.value,
              field: item.field,
              type: item.type,
            });
            if (item.value) {
              tagList.value.push({
                label: item.label,
                labelValue: item.value.label,
                value: item.value.value,
                field: item.field,
                type: item.type,
              });
            }
          }
          if (item.type == 'input') {
            allSearchList.push({
              label: item.label,
              labelValue: item.value,
              value: item.value,
              field: item.field,
              type: item.type,
            });
            item.value &&
              tagList.value.push({
                label: item.label,
                labelValue: item.value,
                value: item.value,
                field: item.field,
                type: item.type,
              });
          }
          if (item.type == 'select' || item.type == 'ApiSelect' || item.type == 'ApiTreeSelect') {
            allSearchList.push({
              label: item.label,
              labelValue: item.value ? item.value.label : '',
              value: item.value?.value,
              field: item.field,
              type: item.type,
            });
            item.value &&
              tagList.value.push({
                label: item.label,
                labelValue: item.value?.label,
                value: item.value?.value,
                field: item.field,
                type: item.type,
              });
          }
        });
        show.value = false;
        emit('search', searchValue.value, allSearchList);
      };

      //更新方法
      const updateSchema = (params: searchListItem) => {
        const { field, ...attr } = params;
        searchArr.value.map((list: searchListItem) => {
          if (list.field === field) {
            Object.assign(list, attr);
          }
        });
      };

      const handleClose = (item, index) => {
        let allSearchList: any = cloneDeep(tagList.value);
        searchValue.value = '';
        closeField.value = item.field;
        searchArr.value.forEach((it: any) => {
          if (it.field == item.field) {
            it.value = undefined;

            //搜索删除联动
            let { componentProps } = it;
            if (componentProps) {
              const formActionType = { updateSchema };
              componentProps = componentProps({ formActionType });
              let { deleteChange } = componentProps;
              if (typeof deleteChange !== 'function') return;
              deleteChange({ value: undefined }, (field) => {
                let index = tagList.value.findIndex((v) => v.field === field);
                tagList.value.splice(index, 1);
                allSearchList[index].value = undefined;
              });
            }
          }
        });
        allSearchList[index].value = undefined;
        tagList.value.splice(index, 1);
        emit('search', searchValue.value, allSearchList);
      };

      const handleReset = (isEmit) => {
        isReset.value = !isReset.value;
        tagList.value = [];
        let valueList: any = [];
        searchArr.value.forEach((item: any) => {
          item.value = undefined;
          valueList.push({
            value: item.value,
            field: item.field,
            type: item.type,
          });
        });
        !isEmit && emit('search', null, valueList);
      };

      provide('isReset', isReset);
      provide('closeField', closeField);

      return {
        show,
        tagList,
        searchArr,
        searchValue,
        handleShow,
        handleClose,
        handleReset,
        handleSearch,
        handleKeyDown,
        handleClickOutside,
        handleCanplay,
      };
    },
  });
</script>

<style lang="less" scoped>
  .search-wrapper {
    width: 550px;
  }

  .si-shadow {
    :deep(.ant-input-affix-wrapper-borderless) {
      border: 1px solid #d9d9d9;
    }
  }

  .search-simple {
    width: 300px;
  }

  .selected-tags {
    padding-top: 5px;

    .ant-tag {
      margin-right: 5px;
      margin-top: 5px;
      line-height: 24px;
    }

    .clear {
      padding-left: 5px;
      color: @primary-color;
      cursor: pointer;
    }
  }

  .search-icon {
    color: #999;
    font-size: 20px !important;
  }

  .sl-rotate-180 {
    transform: rotate(180deg);
    transition: transform 0.2s;
  }

  .sl-rotate-0 {
    transform: rotate(0deg);
    transition: transform 0.2s;
  }

  [data-theme='dark'] {
    .si-shadow {
      :deep(.ant-input-affix-wrapper-borderless) {
        border-color: #303030;
      }
    }
  }
</style>
