import { FormSchema } from '/@/components/Form/index';
import { Tinymce } from '/@/components/Tinymce/index';
import { uploadApi } from '/@/api/sys/upload';
import { getUcenterOrgTree, getUcenterOrgPersonTree } from '/@/api/testDemo/dept';
import { ucenterCodeCombox } from '/@/api/common/index';
import { h } from 'vue';
export const FORM_ORDER = ['One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight'];
const flatten = (arr) => {
  for (const item of arr) {
    if (item.children && Array.isArray(item.children) && item.listPerson) {
      item.id = `${item.id}${item.code}`;
      item.disabled = true;
      item.listPerson.forEach((it) => {
        // it.id = `${item.id}-${it.id}`;
        it.cname = it.name;
      });
      item.children = [...item.children, ...item.listPerson];
      flatten(item.children);
    }
  }

  return arr;
};
export const createPersonConfig = (index = 0): FormSchema => {
  return {
    field: `personId-${index}`,
    component: 'ApiTreeSelect',
    label: '报名人员',

    componentProps: {
      api: getUcenterOrgPersonTree,
      params: { isMain: 1 },
      fieldNames: { key: 'id', label: 'cname', value: 'id' },
      showSearch: true,
      treeNodeFilterProp: 'name',
      afterFetch: flatten,
    },
    colProps: {
      span: 12,
    },
  };
};
export const createRoleConfig = (index = 0): FormSchema => {
  return {
    field: `role-${index}`,
    component: 'ApiSelect',
    label: '角色',
    colProps: {
      span: 8,
    },
    componentProps: () => {
      return {
        api: ucenterCodeCombox,
        params: {
          type: '10001-52006',
        },
        resultField: 'list',
        labelField: 'name',
        valueField: 'value',
      };
    },
  };
};
export const createBtnConfig = (index = 0): FormSchema => {
  return {
    field: index + '',
    component: 'Input',
    label: ' ',
    colProps: {
      span: 4,
    },
    slot: 'add',
  };
};
export const basicSchemas: FormSchema[] = [
  {
    field: 'name',
    component: 'Input',
    label: '标题名称',

    colProps: {
      span: 24,
    },
  },
  {
    field: 'type',
    component: 'ApiSelect',
    label: '类型',
    colProps: {
      span: 12,
    },
    componentProps: ({ formModel, formActionType }) => {
      return {
        api: ucenterCodeCombox,
        params: {
          type: '10001-52005',
        },
        resultField: 'list',
        labelField: 'name',
        valueField: 'value',
      };
    },
  },
  {
    field: 'subType',
    component: 'ApiSelect',
    label: '课题类别',
    colProps: {
      span: 12,
    },
    show: ({ values }) => {
      return values.type == '52005-10';
    },
    componentProps: () => {
      return {
        api: ucenterCodeCombox,
        params: {
          type: '52005-10',
        },
        resultField: 'list',
        labelField: 'name',
        valueField: 'value',
      };
    },
  },
];

export const announcementSchemas: FormSchema[] = [
  {
    field: 'eventContent',
    component: 'Input',
    label: '公告内容',
    defaultValue: '',
    rules: [{ required: true }],
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
    field: '[applyStime, applyEtime]',
    label: '申报起止时间',
    component: 'RangePicker',
    componentProps: {
      format: 'YYYY-MM-DD HH:mm',
      placeholder: ['开始时间', '结束时间'],
      showTime: { format: 'HH:mm' },
    },
  },
  {
    field: 'eventAttachments',
    component: 'Upload',
    label: '上传附件',
    colProps: {
      span: 8,
    },
    componentProps: {
      api: uploadApi,
      uploadParams: {
        groupName: '52030-20',
      },
    },
  },
];

export const reportSchemas: FormSchema[] = [
  createPersonConfig(),
  createRoleConfig(),
  createBtnConfig(),
];

export const messageSchema: FormSchema[] = [
  {
    field: 'code',
    component: 'Input',
    label: '内部项目编号',

    colProps: {
      span: 12,
    },
  },
  {
    field: '[proDate, proEndDate]',
    label: '立项时间',
    component: 'RangePicker',
    componentProps: {
      format: 'YYYY-MM-DD HH:mm',
      placeholder: ['开始时间', '结束时间'],
      showTime: { format: 'HH:mm' },
    },
    colProps: {
      span: 12,
    },
  },
  {
    field: '[startDate, endDate]',
    label: '科研时间',
    component: 'RangePicker',
    componentProps: {
      format: 'YYYY-MM-DD HH:mm',
      placeholder: ['开始时间', '结束时间'],
      showTime: { format: 'HH:mm' },
    },
    colProps: {
      span: 12,
    },
  },
  {
    field: 'deptId',
    component: 'ApiTreeSelect',
    label: '上级部门',

    componentProps: {
      api: getUcenterOrgTree,
      params: { compType: '10027-10' },
      fieldNames: { key: 'id', label: 'cname', value: 'id' },
      showSearch: true,
      treeNodeFilterProp: 'cname',
    },
    colProps: {
      span: 12,
    },
  },
  {
    field: 'projPeriod',
    component: 'Input',
    label: '项目实施周期',
    colProps: {
      span: 6,
    },
  },
  {
    field: 'periodUnit',
    component: 'Input',
    label: '周期单位',
    colProps: {
      span: 6,
    },
  },
  {
    field: 'funds',
    component: 'Input',
    label: '课题经费',

    colProps: {
      span: 12,
    },
  },
  {
    field: 'feeUnit',
    component: 'Input',
    label: '费用单位',

    colProps: {
      span: 12,
    },
  },
  createPersonConfig(),
  createRoleConfig(),
  createBtnConfig(),
];

export const materialSchema1: FormSchema[] = [
  {
    field: 'projectContent',
    component: 'Input',
    label: '内容',
    defaultValue: '',
    rules: [{ required: true }],
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
    field: 'projectAttachments',
    component: 'Upload',
    label: '上传附件',
    colProps: {
      span: 8,
    },
    componentProps: {
      api: uploadApi,
      uploadParams: {
        groupName: '52030-20',
      },
    },
  },
];

export const materialSchema2: FormSchema[] = [
  {
    field: 'midCheckContent',
    component: 'Input',
    label: '内容',
    defaultValue: '',
    rules: [{ required: true }],
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
    field: '[checkStime, checkEtime]',
    label: '检查时间',
    component: 'RangePicker',
    componentProps: {
      format: 'YYYY-MM-DD HH:mm',
      placeholder: ['开始时间', '结束时间'],
      showTime: { format: 'HH:mm' },
    },
    colProps: {
      span: 12,
    },
  },
  {
    field: 'midCheckAttachments',
    component: 'Upload',
    label: '上传附件',
    colProps: {
      span: 8,
    },
    componentProps: {
      api: uploadApi,
      uploadParams: {
        groupName: '52030-20',
      },
    },
  },
];

export const materialSchema3: FormSchema[] = [
  {
    field: 'isClosed',
    component: 'Switch',
    label: '是否开启变更',
    colProps: {
      span: 24,
    },
    labelWidth: 200,
  },
  {
    field: 'changeContent',
    component: 'Input',
    label: '内容',
    defaultValue: '',
    rules: [{ required: true }],
    show: ({ values }) => {
      return values.isClosed;
    },
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
    field: '[altrStime, altrEtime]',
    label: '检查时间',
    component: 'RangePicker',
    componentProps: {
      format: 'YYYY-MM-DD HH:mm',
      placeholder: ['开始时间', '结束时间'],
      showTime: { format: 'HH:mm' },
    },
    show: ({ values }) => {
      return values.isClosed;
    },
    colProps: {
      span: 12,
    },
  },
  {
    field: 'changeAttachments',
    component: 'Upload',
    label: '上传附件',
    show: ({ values }) => {
      return values.isClosed;
    },
    colProps: {
      span: 8,
    },
    componentProps: {
      api: uploadApi,
      uploadParams: {
        groupName: '52030-20',
      },
    },
  },
];

export const materialSchema4: FormSchema[] = [
  {
    field: 'tinymce',
    component: 'Input',
    label: '内容',
    defaultValue: '',
    rules: [{ required: true }],
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
    field: '[conclusStime, conclusEtime]',
    label: '归档时间',
    component: 'RangePicker',
    componentProps: {
      format: 'YYYY-MM-DD HH:mm',
      placeholder: ['开始时间', '结束时间'],
      showTime: { format: 'HH:mm' },
    },
    colProps: {
      span: 12,
    },
  },
  {
    field: 'Upload',
    component: 'Upload',
    label: '上传附件',
    colProps: {
      span: 8,
    },
    componentProps: {
      api: uploadApi,
      uploadParams: {
        groupName: '52030-20',
      },
    },
  },
];

type AnchorListType = {
  title: string;
  href: string;
};

export const anchorList: AnchorListType[] = [
  {
    title: '基础信息',
    href: '#basicSchemas',
  },
  {
    title: '公告',
    href: '#announcementSchemas',
  },
  {
    title: '申报',
    href: '#reportSchemas',
  },
  {
    title: '立项信息',
    href: '#messageSchema',
  },
  {
    title: '立项需要的材料',
    href: '#materialSchema1',
  },
  {
    title: '中期检查需要的材料',
    href: '#materialSchema2',
  },
  {
    title: '变更需要的材料',
    href: '#materialSchema3',
  },
  {
    title: '结题归档需要的材料',
    href: '#materialSchema4',
  },
];
