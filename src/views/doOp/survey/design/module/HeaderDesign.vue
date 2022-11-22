<!--
 * @Author: 江雪松 576053154@qq.com
 * @Date: 2022-07-28 10:56:57
 * @LastEditors: 江雪松 576053154@qq.com
 * @LastEditTime: 2022-08-01 11:31:52
 * @FilePath: /rural-revitalization/src/views/demo/survey-demo/module/HeaderDesign.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div>
    <div class="flex">
      <div class="flex-1 flex mr-2">
        <div class="mr-4"><p class="lineHeight-32">表头设计</p></div>
        <ul class="flex-1">
          <li v-for="(item, index) in headerList" :key="index" class="mb-2">
            <a-input v-model:value="item.columeName" placeholder="请填写" />
          </li>
        </ul>
      </div>
      <div class="flex-1 flex ml-2">
        <div class="mr-4"><p class="lineHeight-32">逻辑映射</p></div>
        <ul class="flex-1">
          <li v-for="(item, index) in headerList" :key="index" class="mb-2 flex items-center">
            <a-select
              v-model:value="item.type"
              placeholder="请选择"
              style="width: 100%"
              :options="headerOptions"
              :fieldNames="{ label: 'name' }"
              @change="(value) => handleChange(value, index)"
            />
            <Icon
              v-if="headerList.length > 1"
              class="cursor-pointer ml-2"
              @click.stop="handleDelete(index)"
              icon="ant-design:minus-circle-outlined"
            />
          </li>
        </ul>
      </div>
    </div>
    <div
      class="items-center header-icon inline-flex"
      @click="handleAdd"
      v-if="headerList.length < headerOptions.length"
    >
      <Icon icon="ant-design:plus-square-outlined" />
      <span class="ml-1">增加条目</span>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref, onMounted, inject } from 'vue';
  import { Icon } from '/@/components/Icon';
  import { Input, Select } from 'ant-design-vue';
  // import { headerArr } from '../config/index';
  import { opTemplateViewDesign } from '/@/api/doOp/index';
  import { ucenterCodeCombox } from '/@/api/common/index';
  export default defineComponent({
    components: {
      Icon,
      AInput: Input,
      ASelect: Select,
    },
    setup() {
      const headerList: any = inject('headerList');
      // headerList.value = headerArr;

      const handleAdd = () => {
        headerList.value.push({
          columeName: undefined,
          type: undefined,
        });
      };

      const handleDelete = (index) => {
        headerList.value.splice(index, 1);
      };

      const handleChange = (value, index) => {
        headerList.value.forEach((it, ind) => {
          if (it.type == value && ind !== index) {
            it.type = undefined;
          }
        });
      };

      const headerOptions = ref([]);
      onMounted(() => {
        ucenterCodeCombox({ type: '10001-52044' }).then((res) => {
          headerOptions.value = res?.list;
        });
      });

      return {
        headerList,
        headerOptions,
        handleAdd,
        handleDelete,
        handleChange,
      };
    },
  });
</script>

<style lang="less" scoped>
  .header-icon {
    color: @primary-color;
    cursor: pointer;
  }

  .lineHeight-32 {
    line-height: 32px;
  }
</style>
