<!--
 * @Author: 江雪松 576053154@qq.com
 * @Date: 2022-08-10 13:42:08
 * @LastEditors: 江雪松 576053154@qq.com
 * @LastEditTime: 2022-08-20 21:19:17
 * @FilePath: /rural-revitalization/src/views/expstore/expert/module/AppendInput.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <a-row
    :class="['mt-3', index === 0 ? 'mt-0' : '']"
    align="middle"
    v-for="(item, index) in list"
    :key="index"
  >
    <a-col :span="20">
      <a-form-item-rest>
        <a-input v-model:value="item.itemContent" :placeholder="placeholder" />
      </a-form-item-rest>
    </a-col>
    <a-col :span="4">
      <Icon icon="ic:sharp-add-circle" class="add-icon" @click="handleAdd" />
      <Icon
        v-if="list.length > 1"
        icon="fluent:subtract-circle-12-filled"
        class="add-icon"
        @click="handleDelete(index)"
      />
    </a-col>
  </a-row>
</template>

<script lang="ts">
  import { defineComponent, ref, inject, watch } from 'vue';
  import { Input, Row, Col, Form } from 'ant-design-vue';
  import { Icon } from '/@/components/Icon';
  import { createID } from '/@/views/doOp/survey/design/utils/index';

  export default defineComponent({
    components: {
      Icon,
      AInput: Input,
      ARow: Row,
      ACol: Col,
      AFormItemRest: Form.ItemRest,
    },
    props: {
      field: String,
      placeholder: String,
    },
    emits: ['change'],
    setup(props, { emit }) {
      const editInfo: any = inject('editInfo');
      const list = ref([
        { itemContent: undefined, inputId: createID('input1') },
        { itemContent: undefined, inputId: createID('input2') },
        { itemContent: undefined, inputId: createID('input3') },
      ]);
      emit('change', props.field, list.value);

      const handleAdd = () => {
        list.value.push({ itemContent: undefined, inputId: createID('input') });
        emit('change', props.field, list.value);
      };

      const handleDelete = (index) => {
        list.value.splice(index, 1);
        emit('change', props.field, list.value);
      };

      watch(
        () => editInfo,
        () => {
          if (editInfo.value[props.field as string].length > 0) {
            list.value.splice(0, 1);
            list.value.splice(0, 1);
            list.value.splice(0, 1);
            editInfo.value[props.field as string].forEach((item) => {
              list.value.push({ ...item, inputId: createID('input') });
            });
            emit('change', props.field, list.value);
          }
        },
        { deep: true },
      );

      return {
        list,
        handleAdd,
        handleDelete,
      };
    },
  });
</script>

<style lang="less" scoped>
  .add-icon {
    margin-left: 10px;
    color: #666;
    cursor: pointer;
    font-size: @font-size-b8 !important;

    &:hover {
      color: @primary-color;
    }
  }
</style>
