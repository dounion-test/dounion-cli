import { h } from 'vue';
import ViewFile from '../../sciSubject/modules/viewFile.vue';
export const viewSchema = [
  {
    label: '成果标题',
    field: 'title',
    labelStyle: { textAlign: 'right' },
    span: 2,
    render: (_, data) => {
      return h('div', {
        innerHTML: data.title,
      });
    },
  },
  {
    label: '成分类别',
    field: 'categoryTypeName',
    labelMinWidth: 100,
    contentMinWidth: 300,
    labelStyle: { textAlign: 'right' },
    render: (_, form) => {
      return form.categoryTypeName || '-';
    },
  },
  {
    label: '成果子类别',
    field: 'categoryTypeName',
    labelMinWidth: 100,
    contentMinWidth: 300,
    labelStyle: { textAlign: 'right' },
    render: (_, form) => {
      return form.categoryChildTypeName || '-';
    },
  },

  {
    label: '内外部类型',
    field: 'inOutTypeName',
    labelStyle: { textAlign: 'right' },
    render: (_, form) => {
      return form.inOutTypeName || '-';
    },
  },
  {
    label: '成果取得日期',
    field: 'sciDate',
    labelStyle: { textAlign: 'right' },
    render: (_, form) => {
      return form.sciDate || '-';
    },
  },

  {
    label: '成果描述',
    field: 'name',
    labelStyle: { textAlign: 'right', verticalAlign: 'top' },
    span: 2,
    render: (_, data) => {
      return h('div', {
        innerHTML: data.name,
      });
    },
  },

  {
    label: '附件',
    field: 'applyFile',
    labelStyle: { textAlign: 'right' },
    span: 2,
    render: (_, form) => {
      return h(ViewFile, {
        fileList: !form.applyFile || !Object.keys(form.applyFile)?.length ? [] : [form.applyFile],
      });
    },
  },
  {
    label: '提交人',
    field: 'name',
    labelStyle: { textAlign: 'right' },
    render: (_, data) => {
      const checkList = data?.taskModel?.checkList;
      let name = '-';
      if (checkList) {
        const [step1] = checkList;
        if (step1) {
          name = step1.assigneeName || '-';
        }
      }
      return h('div', {
        innerHTML: name,
      });
    },
  },
  {
    label: '提交时间',
    field: 'name',
    labelStyle: { textAlign: 'right' },
    render: (_, data) => {
      const checkList = data?.taskModel?.checkList;
      let startTime = '-';
      if (checkList) {
        const [step1] = checkList;
        if (step1) {
          startTime = step1.startTime || '-';
        }
      }
      return h('div', {
        innerHTML: startTime,
      });
    },
  },
  {
    label: '审批人',
    field: 'name',
    labelStyle: { textAlign: 'right' },
    render: (_, data) => {
      const checkList = data?.taskModel?.checkList;
      let name = '-';
      if (checkList) {
        const [_, step2] = checkList;
        if (step2) {
          name = step2.assigneeName || '-';
        }
      }
      return h('div', {
        innerHTML: name,
      });
    },
  },
  {
    label: '审批意见',
    field: 'name',
    labelStyle: { textAlign: 'right' },
    render: (_, data) => {
      const checkList = data?.taskModel?.checkList;
      let comment = '-';
      if (checkList) {
        const [_, step2] = checkList;
        if (step2) {
          comment = step2.comment || '-';
        }
      }
      return h('div', {
        innerHTML: comment,
      });
    },
  },
];
