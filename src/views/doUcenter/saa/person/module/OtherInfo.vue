<!--
 * @Author: 江雪松 576053154@qq.com
 * @Date: 2022-06-01 14:11:59
 * @LastEditors: 江雪松 576053154@qq.com
 * @LastEditTime: 2022-09-01 18:00:31
 * @FilePath: /vben-ucenterF/src/views/doUcenter/person/basicInfo.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <a-row>
    <a-col :span="16">
      <BasicForm @register="registerFour">
        <template #remoteSearch="{ model, field }">
          <ApiSelect
            :api="ucenterOrgListApi"
            showSearch
            label-in-value
            allowClear
            v-model:value="model[field]"
            :filterOption="false"
            resultField="list"
            labelField="cname"
            valueField="id"
            :params="searchParams"
            @search="onSearch"
          />
        </template>
      </BasicForm>
    </a-col>
  </a-row>
</template>

<script lang="ts">
  import { defineComponent, ref, unref, computed, watch, nextTick } from 'vue';
  import { BasicForm, useForm, ApiSelect } from '/@/components/Form/index';
  import { schemasOther } from '../config/add';
  import { Row, Col } from 'ant-design-vue';
  import { useDebounceFn } from '@vueuse/core';
  import { cloneDeep } from 'lodash-es';
  import { ucenterOrgListApi } from '/@/api/testDemo/person';
  export default defineComponent({
    components: { BasicForm, ApiSelect, [Row.name]: Row, [Col.name]: Col },
    props: {
      otherFormObj: {
        type: Object,
        default: () => {},
      },
    },
    setup(props) {
      const cNameOrCodeOrSnameOrLinkerQueryLike = ref<string>('');
      const searchParams = computed<Recordable>(() => {
        return {
          cNameOrCodeOrSnameOrLinkerQueryLike: unref(cNameOrCodeOrSnameOrLinkerQueryLike),
          compType: '10027-40',
        };
      });
      const [registerFour, { validateFields, getFieldsValue, setFieldsValue }] = useForm({
        labelWidth: 120,
        schemas: schemasOther,
        showResetButton: false,
        showSubmitButton: false,
        actionColOptions: {
          span: 24,
        },
      });
      // 党支部搜索
      function onSearch(value: string) {
        cNameOrCodeOrSnameOrLinkerQueryLike.value = value;
      }
      watch(
        () => props.otherFormObj,
        (val) => {
          nextTick(() => {
            setFieldsValue(cloneDeep(val));
          });
        },
        { immediate: true, deep: true },
      );
      return {
        searchParams,
        registerFour,
        validateFields,
        getFieldsValue,
        setFieldsValue,
        ucenterOrgListApi,
        onSearch: useDebounceFn(onSearch, 300),
      };
    },
  });
</script>
