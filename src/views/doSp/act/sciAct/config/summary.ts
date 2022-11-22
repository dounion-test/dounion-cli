/*
 * @Author: 江雪松 576053154@qq.com
 * @Date: 2022-08-11 14:31:56
 * @LastEditors: 江雪松 576053154@qq.com
 * @LastEditTime: 2022-08-20 21:38:22
 * @FilePath: /rural-revitalization/src/views/expstore/activity/list/config/summary.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { h } from 'vue';
import { uploadApi } from '/@/api/sys/upload';
import { Tinymce } from '/@/components/Tinymce/index';
import { FormSchema } from '/@/components/Form/index';

export const schemas: FormSchema[] = [
  {
    field: 'name',
    component: 'Input',
    label: '活动主题',
    colProps: {
      span: 19,
    },
    slot: 'name',
  },
  {
    field: 'content',
    component: 'Input',
    label: '活动内容',
    colProps: {
      span: 19,
    },
    slot: 'content',
  },
  {
    field: 'date',
    component: 'Input',
    label: '举办日期',
    colProps: {
      span: 19,
    },
    slot: 'date',
  },
  // {
  //   field: 'attendPerson',
  //   component: 'Input',
  //   label: '出席人员',
  //   colProps: {
  //     span: 13,
  //   },
  // },
  {
    field: 'invite',
    component: 'Input',
    label: '出席人员',
    colProps: {
      span: 19,
    },
    slot: 'invite',
  },
  {
    field: 'attendNumber',
    component: 'Input',
    label: '出席人数',
    colProps: {
      span: 13,
    },
    itemProps: {
      wrapperCol: { span: 10, xxl: 8 },
    },
  },
  {
    field: 'reviewContent',
    component: 'Input',
    label: '活动回顾',
    defaultValue: '',
    colProps: {
      span: 24,
    },
    itemProps: {
      wrapperCol: { span: 16, xxl: 12 },
    },
    render: ({ model, field }) => {
      return h(Tinymce, {
        value: model[field],
        onChange: (value: string) => {
          model[field] = value;
        },
      });
    },
  },
  {
    field: 'achieveContent',
    component: 'Input',
    label: '活动成果',
    defaultValue: '',
    colProps: {
      span: 24,
    },
    itemProps: {
      wrapperCol: { span: 16, xxl: 12 },
    },
    render: ({ model, field }) => {
      return h(Tinymce, {
        value: model[field],
        onChange: (value: string) => {
          model[field] = value;
        },
      });
    },
  },
  {
    field: 'gradeList',
    component: 'Input',
    label: '专家表现评价',
    colProps: {
      span: 24,
    },
    slot: 'gradeList',
  },
  {
    field: 'pictures',
    component: 'Input',
    label: '图册照片',
    colProps: {
      span: 19,
    },
    slot: 'pictures',
  },
  {
    field: 'summaryAttachments',
    component: 'Upload',
    label: '上传附件',
    colProps: {
      span: 19,
    },
    componentProps: {
      api: uploadApi,
      uploadParams: {
        groupName: '52030-30',
      },
    },
  },
];
