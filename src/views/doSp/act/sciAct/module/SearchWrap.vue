<!--
 * @Author: 江雪松 576053154@qq.com
 * @Date: 2022-08-10 15:31:46
 * @LastEditors: 江雪松 576053154@qq.com
 * @LastEditTime: 2022-09-17 15:07:00
 * @FilePath: /rural-revitalization/src/views/expstore/activity/list/module/SearchWrap.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <ul class="search-wrap">
    <li
      v-for="(item, index) in searchList"
      :key="index"
      :class="{ 'search-wrap-border': item.border }"
    >
      <span
        v-if="item.type != 'inputList'"
        class="inline-flex label-text"
        :class="item.type == 'tag' || item.type == 'treeTag' ? 'items-start' : 'items-center'"
        >{{ item.label }}：</span
      >
      <span class="label-con">
        <a-input
          @blur="handleBlur"
          style="width: 250px"
          v-if="item.type == 'input'"
          v-model:value="item.value"
        />
      </span>
      <div v-if="item.type == 'inputNumber'">
        <a-input-number @blur="handleBlur" style="width: 100px" v-model:value="item.value" />
        <slot name="inputNumber"></slot>
      </div>
      <a-range-picker
        style="width: 250px"
        valueFormat="YYYY-MM-DD"
        @change="handleRangePicker"
        v-if="item.type == 'rangePicker'"
        v-model:value="item.value"
      />
      <div class="flex-1 tag-list" v-if="item.type == 'tag'">
        <a-checkable-tag
          class="!mb-2"
          @change="(e) => handleCheckChange(e, index, ind)"
          v-for="(it, ind) in item.options"
          v-model:checked="it.checked"
          :key="ind"
        >
          {{ it.name }}
        </a-checkable-tag>
      </div>
      <div class="flex-1 tag-list" v-if="item.type == 'treeTag'">
        <div v-for="(it, ind) in item.options" :key="ind">
          <strong>{{ it.name }}：</strong>
          <a-checkable-tag
            class="!mb-2"
            @change="(e) => handleTreeTag(e, index, ind, j)"
            v-for="(i, j) in it.children"
            v-model:checked="i.checked"
            :key="j"
          >
            {{ i.name }}
          </a-checkable-tag>
        </div>
      </div>
      <a-row v-if="item.type == 'inputList'">
        <a-col :span="it.span" v-for="(it, ind) in item.options" :key="ind">
          <div class="flex m-2" v-if="it.type == 'input'">
            <span class="search-inputList-label">{{ it.label }}：</span>
            <a-input class="flex-1" @blur="handleBlur" v-model:value="it.value" />
          </div>
          <div class="flex m-2" v-if="it.type == 'ApiSelect'">
            <span class="search-inputList-label">{{ it.label }}：</span>
            <ApiSelect
              class="flex-1"
              :api="it.api"
              allowClear
              v-model:value="it.value"
              :filterOption="false"
              :resultField="it.resultField"
              :labelField="it.labelField"
              :valueField="it.valueField"
              :params="it.searchParams"
              @change="handleApiSelect"
            />
          </div>
          <div class="flex m-2" v-if="it.type == 'select'">
            <span class="search-inputList-label">{{ it.label }}：</span>
            <a-select
              @change="handleSelect"
              v-model:value="it.value"
              class="flex-1"
              allowClear
              :options="it.options"
            />
          </div>
        </a-col>
      </a-row>
    </li>
    <slot name="button"></slot>
  </ul>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { Input, Tag, DatePicker, Row, Col, Select, InputNumber } from 'ant-design-vue';
  import { ApiSelect } from '/@/components/Form/index';

  export default defineComponent({
    components: {
      ApiSelect,
      ARow: Row,
      ACol: Col,
      ASelect: Select,
      AInput: Input,
      AInputNumber: InputNumber,
      ARangePicker: DatePicker.RangePicker,
      ACheckableTag: Tag.CheckableTag,
    },
    props: {
      searchList: {
        type: Array as PropType<any[]>,
        default: () => [],
      },
    },
    emits: ['change'],
    setup(props, { emit }) {
      const handleBlur = () => {
        emit('change');
      };

      const handleCheckChange = (checked, index, ind) => {
        let value = (props.searchList[index] as any).value;
        let optionsValue = (props.searchList[index] as any).options[ind].value;
        let isMultiple = (props.searchList[index] as any).isMultiple;
        //判断多选还是单选
        if (isMultiple) {
          // 多选
          if (checked) {
            // 判断选择的是不是全部按钮
            if (optionsValue) {
              value.push(optionsValue);
              if (!(props.searchList[index] as any).options[0].value) {
                (props.searchList[index] as any).options[0].checked = false;
              }
            } else {
              value = [];
              (props.searchList[index] as any).options.forEach((item) => {
                if (item.value) {
                  item.checked = false;
                }
              });
            }
          } else {
            if (optionsValue) {
              let valueIndex = value.indexOf(optionsValue);
              value.splice(valueIndex, 1);
            }
          }
        } else {
          // 单选
          if (checked) {
            if (optionsValue) {
              value.splice(0, 1);
              value.push(optionsValue);
              (props.searchList[index] as any).options.forEach((item) => {
                item.checked = false;
                if (item.value === optionsValue) {
                  item.checked = true;
                }
              });
            } else {
              value.splice(0, 1);
              (props.searchList[index] as any).options.forEach((item) => {
                if (item.value) {
                  item.checked = false;
                }
              });
            }
          } else {
            if (optionsValue) {
              value.splice(0, 1);
            }
          }
        }
        emit('change');
      };

      const handleTreeTag = (checked, index, ind, j) => {
        let value = (props.searchList[index] as any).value;
        let optionsValue = (props.searchList[index] as any).options[ind]['children'][j].value;
        let isMultiple = (props.searchList[index] as any).isMultiple;
        //判断多选还是单选
        //判断多选还是单选
        if (isMultiple) {
          // 多选
          if (checked) {
            // 判断选择的是不是全部按钮
            value.push(optionsValue);
          } else {
            let valueIndex = value.indexOf(optionsValue);
            value.splice(valueIndex, 1);
          }
        } else {
          // 单选
          if (checked) {
            value.splice(0, 1);
            value.push(optionsValue);
            (props.searchList[index] as any).options.forEach((item) => {
              item.children.forEach((it) => {
                it.checked = false;
                if (it.value === optionsValue) {
                  it.checked = true;
                }
              });
            });
          } else {
            value.splice(0, 1);
          }
        }
      };

      const handleRangePicker = () => {
        emit('change');
      };

      const handleSelect = () => {
        emit('change');
      };

      const handleApiSelect = () => {
        emit('change');
      };

      return {
        handleBlur,
        handleCheckChange,
        handleRangePicker,
        handleSelect,
        handleApiSelect,
        handleTreeTag,
      };
    },
  });
</script>

<style lang="less" scoped>
  .search-wrap {
    border: 1px solid #d9d9d9;
    padding: 0 20px;

    li {
      display: flex;
      margin-top: 10px;
    }

    &-border {
      border-bottom: 1px solid #d9d9d9;
    }
  }

  .search-inputList-label {
    display: block;
    width: 70px;
    text-align: right;
  }
  [data-theme='dark'] {
    .search-wrap {
      border-color: #303030;
    }
  }
</style>
