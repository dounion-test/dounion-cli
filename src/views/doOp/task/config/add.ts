/*
 * @Author: 江雪松 576053154@qq.com
 * @Date: 2022-08-29 15:47:40
 * @LastEditors: 江雪松 576053154@qq.com
 * @LastEditTime: 2022-09-27 15:40:03
 * @FilePath: /rural-revitalization/src/views/doOp/task/config/add.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { FormSchema } from '/@/components/Form/index';
import { Tinymce } from '/@/components/Tinymce/index';
import { ucenterCodeCombox } from '/@/api/common/index';
import { domesOpPersonTreeApi } from '/@/api/doOp/person';
import { domesOpSurveyListComboxApi, domesOpTaskFillWayApi } from '/@/api/doOp/task';
import { h } from 'vue';

// 遍历树型结构数组
const flatten = (arr) => {
  for (const item of arr) {
    if (item.children && Array.isArray(item.children)) {
      item.id = item.parentId ? `${item.parentId}-${item.id}` : item.id;
      item.children.forEach((it) => {
        it.parentId = item.id;
      });
      flatten(item.children);
    }
  }
};

export const schemas: FormSchema[] = [
  {
    field: 'surId',
    component: 'ApiSelect',
    label: '关联调研表',
    colProps: {
      span: 18,
    },
    componentProps: ({ formActionType }) => {
      return {
        api: domesOpSurveyListComboxApi,
        params: {
          pageNo: 1,
          pageSize: 100000,
        },
        resultField: 'list',
        labelField: 'surName',
        valueField: 'id',
        class: 'task-form-w',
        onChange: async (e: any, it) => {
          const { updateSchema, setFieldsValue, getFieldsValue } = formActionType;
          const { viewIds } = await getFieldsValue();
          if (viewIds) {
            setFieldsValue({ viewIds: undefined });
          }

          if (e && it.objectType) {
            updateSchema([
              {
                field: 'viewIds',
                component: 'TreeSelect',
                componentProps: {
                  loading: true,
                  treeData: [],
                  labelInValue: true,
                  multiple: true,
                },
              },
              {
                field: 'bizType',
                component: 'Select',
                componentProps: {
                  loading: true,
                  options: [],
                },
              },
            ]);
            const bizTypeArr = await domesOpTaskFillWayApi({ surId: it.value });
            const res = await domesOpPersonTreeApi({ objectType: it.objectType });
            await flatten(res);
            updateSchema([
              {
                field: 'viewIds',
                component: 'TreeSelect',
                componentProps: {
                  loading: false,
                  treeData: res,
                  showSearch: true,
                  labelInValue: true,
                  multiple: true,
                  treeNodeFilterProp: 'nodeName',
                  class: 'task-form-w',
                  fieldNames: { key: 'id', label: 'nodeName', value: 'id' },
                },
              },
              {
                field: 'bizType',
                component: 'Select',
                componentProps: {
                  loading: false,
                  options: bizTypeArr,
                  fieldNames: { key: 'bizType', label: 'bizTypeName', value: 'bizType' },
                },
              },
            ]);
          } else {
            updateSchema([
              {
                field: 'viewIds',
                component: 'TreeSelect',
                componentProps: {
                  treeData: [],
                  labelInValue: true,
                  multiple: true,
                },
              },
              {
                field: 'bizType',
                component: 'Select',
                componentProps: {
                  options: [],
                },
              },
            ]);
          }
        },
      };
    },
    rules: [
      {
        required: true,
        validator: async (_rule, value) => {
          if (!value) {
            return Promise.reject('关联调研表');
          }
        },
        trigger: 'change',
      },
    ],
  },
  {
    field: 'viewIds',
    component: 'TreeSelect',
    label: '填报单位',
    required: true,
    componentProps: {
      treeCheckable: true,
      class: 'task-form-w',
      labelInvalue: true,
      multiple: true,
    },
    colProps: {
      span: 18,
    },
  },
  {
    field: 'bizType',
    component: 'Select',
    label: '审批类型',
    required: true,
    componentProps: {
      class: 'task-form-w',
    },
    colProps: {
      span: 18,
    },
  },
  {
    field: 'type',
    component: 'ApiSelect',
    label: '填报方式',
    colProps: {
      span: 18,
    },
    componentProps: {
      api: ucenterCodeCombox,
      params: {
        type: '10001-52018',
      },
      resultField: 'list',
      labelField: 'name',
      valueField: 'value',
      class: 'task-form-w',
    },
    rules: [{ required: true, message: '填报方式', trigger: 'blur' }],
  },
  {
    field: '[beginDate, endDate]',
    label: '举办日期',
    component: 'RangePicker',
    componentProps: {
      format: 'YYYY-MM-DD',
      valueFormat: 'YYYY-MM-DD',
      class: 'task-form-w',
    },
    colProps: {
      span: 18,
    },
    required: true,
  },
  {
    field: 'taskTitle',
    component: 'Input',
    label: '标题',
    colProps: {
      span: 24,
    },
    required: true,
  },
  {
    field: 'content',
    component: 'Input',
    label: '公告内容',
    defaultValue: '',
    render: ({ model, field }) => {
      return h(Tinymce, {
        value: model[field],
        onChange: (value: string) => {
          model[field] = value;
        },
      });
    },
    colProps: {
      span: 24,
    },
  },
];
