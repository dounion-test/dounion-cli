import { BasicColumn, FormProps } from '/@/components/Table';
import { FormSchema } from '/@/components/Form/index';
import { ucenterCodeCombox } from '/@/api/common/index';
import { h } from 'vue';
import { Tinymce } from '/@/components/Tinymce/index';
import { uploadApi } from '/@/api/sys/upload';
export const columns: BasicColumn[] = [
  {
    title: '流程标题',
    dataIndex: 'title',
    width: 200,
    align: 'left',
  },
  {
    title: '流程名称',
    dataIndex: 'bizName',
    width: 120,
    align: 'left',
  },
  {
    title: '提交人',
    dataIndex: 'createName',
    width: 60,
    align: 'left',
  },
  {
    title: '提交日期',
    dataIndex: 'createTime',
    width: 120,
    align: 'left',
  },
  {
    title: '当前节点',
    dataIndex: 'taskName',
    width: 120,
    align: 'left',
  },
  {
    title: '审批状态',
    dataIndex: 'statusName',
    width: 60,
    align: 'left',
    slots: { customRender: 'statusName' },
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'name',
    component: 'Input',
    label: '内容',
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

export const basicSchemas: FormSchema[] = [
  {
    field: 'categoryType',
    component: 'ApiSelect',
    label: '成果类别',
    colProps: {
      span: 12,
    },
    componentProps: ({ formModel, formActionType }) => {
      return {
        api: ucenterCodeCombox,
        params: {
          type: '10001-52007',
        },
        resultField: 'list',
        labelField: 'name',
        valueField: 'value',
        onChange: (value) => {
          const { updateSchema } = formActionType;
          if (!value) {
            formModel.categoryChildType = '';
            updateSchema({
              field: 'categoryChildType',
              componentProps: {
                disabled: true,
              },
            });
          } else {
            formModel.categoryChildType = '';
            updateSchema({
              field: 'categoryChildType',
              componentProps: () => {
                return {
                  api: ucenterCodeCombox,
                  disabled: false,
                  params: { type: value },
                  resultField: 'list',
                  labelField: 'name',
                  valueField: 'value',
                };
              },
            });
          }
        },
      };
    },
  },
  {
    field: 'categoryChildType',
    component: 'ApiSelect',
    label: '成果子分类',
    colProps: {
      span: 12,
    },
    componentProps: ({ formModel }) => {
      return {
        api: ucenterCodeCombox,
        disabled: formModel.categoryType ? false : true,
        params: {
          type: formModel.categoryType || '10001-52008',
        },
        resultField: 'list',
        labelField: 'name',
        valueField: 'value',
      };
    },
  },
  {
    field: 'inOutType',
    component: 'ApiSelect',
    label: '内外部类型',
    colProps: {
      span: 12,
    },
    componentProps: () => {
      return {
        api: ucenterCodeCombox,
        params: {
          type: '10001-52033',
        },
        resultField: 'list',
        labelField: 'name',
        valueField: 'value',
      };
    },
  },
  {
    field: 'name',
    component: 'Input',
    label: '内容',
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
  {
    field: 'sciDate',
    component: 'DatePicker',
    label: '成果日期',
    colProps: {
      span: 24,
    },
    itemProps: {
      wrapperCol: {
        span: 7,
      },
    },
  },
  {
    field: 'applyFile',
    component: 'Upload',
    label: '上传附件',
    colProps: {
      span: 24,
    },
    componentProps: {
      api: uploadApi,
      maxNumber: 1,
      uploadParams: {
        groupName: '52030-20',
      },
    },
  },
];

export const statusObj = {
  '21002-10': '#c88740', // 草稿
  '21002-20': '#ffaa2b', // 已提交
  '21002-30': '#ffaa2b', // 审批中
  '21002-40': '#87d068', // 审批完成
  '21002-50': '#ffaa2b', // 已追回
  '21002-60': '#f8363f', // 已驳回
  '21002-70': '#f8363f', // 反对
};
