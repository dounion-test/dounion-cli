/*
 * @Author: 江雪松 576053154@qq.com
 * @Date: 2022-08-19 17:08:36
 * @LastEditors: 江雪松 576053154@qq.com
 * @LastEditTime: 2022-10-11 18:14:02
 * @FilePath: /rural-revitalization/src/views/doMail/config/add.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { FormSchema } from '/@/components/Form/index';
import { Tinymce } from '/@/components/Tinymce/index';
import { uploadApi } from '/@/api/sys/upload';
import { domesOpPersonAllPersonTreeApi } from '/@/api/doOp/person';
import { h } from 'vue';
export const FORM_ORDER = ['One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight'];
const flatten = (arr) => {
  for (const item of arr) {
    item.id = item.key;
    item.disabled = true;
    item.name = item.deptName;
    item.children.forEach((it) => {
      it.id = it.personId;
    });
  }
  return arr;
};

export const materialSchema1: FormSchema[] = [
  {
    field: 'receiveIds',
    component: 'ApiTreeSelect',
    label: '收件人',
    componentProps: {
      api: domesOpPersonAllPersonTreeApi,
      labelInValue: true,
      fieldNames: { key: 'id', label: 'name', value: 'id' },
      showSearch: true,
      treeNodeFilterProp: 'name',
      afterFetch: flatten,
      multiple: true,
    },
    colProps: {
      span: 24,
    },
    itemProps: {
      wrapperCol: { span: 12, xxl: 12 },
    },
  },
  {
    field: 'copyIds',
    component: 'ApiTreeSelect',
    label: '抄送人',
    componentProps: {
      api: domesOpPersonAllPersonTreeApi,
      labelInValue: true,
      fieldNames: { key: 'id', label: 'name', value: 'id' },
      showSearch: true,
      treeNodeFilterProp: 'name',
      afterFetch: flatten,
      multiple: true,
    },
    colProps: {
      span: 24,
    },
    itemProps: {
      wrapperCol: { span: 12, xxl: 12 },
    },
  },
  {
    field: 'topic',
    component: 'Input',
    label: '主题',
    colProps: {
      span: 24,
    },
    itemProps: {
      wrapperCol: { span: 12, xxl: 12 },
    },
    required: true,
  },
  {
    field: 'content',
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
    itemProps: {
      wrapperCol: { span: 19, xxl: 12 },
    },
  },
  {
    field: 'oaAttachment',
    component: 'Upload',
    label: '上传附件',
    colProps: {
      span: 24,
    },
    itemProps: {
      wrapperCol: { span: 19, xxl: 12 },
    },
    componentProps: {
      api: uploadApi,
      uploadParams: {
        groupName: '25001-80',
      },
    },
  },
];
