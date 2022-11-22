import { h } from 'vue';
import ViewFile from '../modules/viewFile.vue';
export const viewSchema = [
  {
    label: '成果描述',
    field: 'name',
    labelMinWidth: 100,
    labelStyle: { textAlign: 'right' },
    render: (_, data) => {
      return h('div', {
        innerHTML: data.name,
      });
    },
  },
  {
    label: '成分分类',
    field: 'categoryTypeName',
    labelMinWidth: 100,
    labelStyle: { textAlign: 'right' },
    render: (_, form) => {
      return form.categoryTypeName || '-';
    },
  },
  {
    label: '分类',
    field: 'categoryTypeName',
    labelMinWidth: 100,
    labelStyle: { textAlign: 'right' },
    render: (_, form) => {
      return form.categoryChildTypeName || '-';
    },
  },
  {
    label: '成果取得日期',
    field: 'sciDate',
    labelMinWidth: 100,
    labelStyle: { textAlign: 'right' },
    render: (_, form) => {
      return form.sciDate || '-';
    },
  },
  {
    label: '内外部',
    field: 'inOutTypeName',
    labelMinWidth: 100,
    contentMinWidth: 400,
    labelStyle: { textAlign: 'right' },
    render: (_, form) => {
      return form.inOutTypeName || '-';
    },
  },
  {
    label: '附件',
    field: 'applyFile',
    contentMinWidth: 400,
    labelStyle: { textAlign: 'right' },
    labelMinWidth: 100,
    render: (_, form) => {
      return h(ViewFile, {
        fileList: form.applyFile ? [form.applyFile] : [],
      });
    },
  },
];
