import { h } from 'vue';
import ViewFile from '../../sciSubject/modules/viewFile.vue';
export const viewSchema = [
  {
    label: '课题名称',
    field: 'name',
    span: 2,
    render: (_, form) => {
      return form.name || '-';
    },
  },
  {
    label: '类别',
    field: 'typeName',
    labelMinWidth: 100,
    contentMinWidth: 200,
    render: (_, form) => {
      return form.typeName || '-';
    },
  },
  {
    label: '课题类别',
    field: 'subTypeName',
    labelMinWidth: 100,
    contentMinWidth: 200,
    render: (_, form) => {
      return form.subTypeName || '-';
    },
  },
  {
    label: '课题编号',
    field: 'code',
    render: (_, form) => {
      return form.code || '-';
    },
  },
  {
    label: '申报日期',
    field: 'applyStime',
    render: (_, form) => {
      return form.applyStime || '-';
    },
  },
  {
    label: '上级部门意见',
    field: 'publishUnitName',
    render: (_, form) => {
      return form.publishUnitName || '-';
    },
  },
  {
    label: '发布单位意见',
    field: 'parentUnitName',
    render: (_, form) => {
      return form.publishUnitName || '-';
    },
  },
  {
    label: '申报内容',
    field: 'declareContent',
    span: 2,
    render: (_, form) => {
      return h('div', {
        innerHTML: form.declareContent,
      });
    },
  },

  {
    label: '附件',
    field: 'declareAttachments',
    render: (_, form) => {
      return h(ViewFile, {
        fileList: form.declareAttachments ? form.declareAttachments : [],
      });
    },
  },
];
