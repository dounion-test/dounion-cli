import { FormSchema } from '/@/components/Form/index';
import { Tinymce } from '/@/components/Tinymce/index';
import { uploadApi } from '/@/api/sys/upload';
import { getUcenterOrgTree, getUcenterOrgPersonTree } from '/@/api/testDemo/dept';
import { ucenterCodeCombox } from '/@/api/common/index';
import { h } from 'vue';
import { opPublicList } from '/@/api/testDemo/scientific';
export const FORM_ORDER = ['One', 'Two', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];

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
    label: '项目组成员',
    rules: [{ required: true, type: 'number', message: '请选择项目组成员' }],
    componentProps: {
      api: opPublicList,
      params: { isMain: 1 },
      fieldNames: { key: 'personId', label: 'realName', value: 'personId' },
      showSearch: true,
      treeNodeFilterProp: 'name',
      afterFetch: flatten,
    },
    colProps: {
      span: 12,
    },
    itemProps: {
      wrapperCol: { span: 17, xxl: 8 },
    },
  };
};
export const createRoleConfig = (index = 0): FormSchema => {
  return {
    field: `role-${index}`,
    component: 'ApiSelect',
    label: '角色',
    colProps: {
      span: 9,
      xxl: 6,
    },
    itemProps: {
      wrapperCol: { span: 16 },
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
    label: '',
    colProps: {
      span: 3,
    },
    itemProps: {
      wrapperCol: { span: 16, xxl: 10 },
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
    itemProps: {
      wrapperCol: { span: 17, xxl: 8 },
    },
  },
  {
    field: 'type',
    component: 'ApiSelect',
    label: '类型',
    colProps: {
      span: 24,
    },
    itemProps: {
      wrapperCol: { span: 17, xxl: 8 },
    },
    componentProps: () => {
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
      span: 24,
    },
    itemProps: {
      wrapperCol: { span: 17, xxl: 8 },
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
    field: 'reviewContent',
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
    field: '[reviewStime, reviewEtime]',
    label: '评审或咨询',
    component: 'RangePicker',
    componentProps: {
      format: 'YYYY-MM-DD',
    },
    colProps: {
      span: 12,
    },
    itemProps: {
      wrapperCol: { span: 17, xxl: 8 },
    },
  },
  {
    field: 'reviewAttachments',
    component: 'Upload',
    label: '上传附件',
    colProps: {
      span: 24,
    },
    itemProps: {
      wrapperCol: { span: 22, xxl: 16 },
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
    itemProps: {
      wrapperCol: { span: 17, xxl: 8 },
    },
  },
  {
    field: '[proDate, proEndDate]',
    label: '立项日期',
    component: 'RangePicker',
    componentProps: {
      format: 'YYYY-MM-DD',
    },
    colProps: {
      span: 12,
    },
    itemProps: {
      wrapperCol: { span: 17, xxl: 8 },
    },
  },
  {
    field: 'startDate',
    component: 'DatePicker',
    label: '科研开始日期',
    required: true,
    colProps: {
      span: 12,
    },
    itemProps: {
      wrapperCol: { span: 17, xxl: 8 },
    },
  },
  {
    field: 'endDate',
    component: 'DatePicker',
    required: true,
    label: '科研结束日期',
    colProps: {
      span: 12,
    },
    itemProps: {
      wrapperCol: { span: 17, xxl: 8 },
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
    itemProps: {
      wrapperCol: { span: 17, xxl: 8 },
    },
  },
  {
    field: 'publishDeptId',
    component: 'ApiTreeSelect',
    label: '课题发布部门',
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
    itemProps: {
      wrapperCol: { span: 17, xxl: 8 },
    },
  },
  {
    field: 'projPeriod',
    component: 'Input',
    label: '项目实施周期',
    colProps: {
      span: 12,
    },
    slot: 'projPeriod',
    itemProps: {
      wrapperCol: { span: 17, xxl: 8 },
    },
  },
  {
    field: 'periodUnit',
    component: 'Input',
    label: '周期单位',
    colProps: {
      span: 12,
    },
    ifShow: false,
    itemProps: {
      wrapperCol: { span: 17, xxl: 8 },
    },
  },
  {
    field: 'funds',
    component: 'Input',
    label: '课题经费',
    slot: 'funds',
    colProps: {
      span: 12,
    },
    itemProps: {
      wrapperCol: { span: 17, xxl: 8 },
    },
    componentProps: {
      type: 'number',
    },
  },
  {
    field: 'feeUnit',
    component: 'Input',
    label: '费用单位',
    ifShow: false,
    colProps: {
      span: 12,
    },
    itemProps: {
      wrapperCol: { span: 17, xxl: 8 },
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
      span: 24,
    },
    itemProps: {
      wrapperCol: { span: 22, xxl: 16 },
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
      format: 'YYYY-MM-DD',
    },
    colProps: {
      span: 12,
    },
    itemProps: {
      wrapperCol: { span: 17, xxl: 8 },
    },
  },
  {
    field: 'midCheckAttachments',
    component: 'Upload',
    label: '上传附件',
    colProps: {
      span: 24,
    },
    itemProps: {
      wrapperCol: { span: 22, xxl: 16 },
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
  },
  {
    field: 'changeContent',
    component: 'Input',
    label: '内容',
    defaultValue: '',
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
      format: 'YYYY-MM-DD',
    },
    show: ({ values }) => {
      return values.isClosed;
    },
    colProps: {
      span: 10,
    },
    itemProps: {
      wrapperCol: { span: 20, xxl: 10 },
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
      span: 24,
    },
    itemProps: {
      wrapperCol: { span: 22, xxl: 16 },
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
    field: 'archiveContent',
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
    field: '[conclusStime, conclusEtime]',
    label: '归档时间',
    component: 'RangePicker',
    componentProps: {
      format: 'YYYY-MM-DD',
    },
    colProps: {
      span: 12,
    },
    itemProps: {
      wrapperCol: { span: 17, xxl: 8 },
    },
  },
  {
    field: 'archiveAttachments',
    component: 'Upload',
    label: '上传附件',
    colProps: {
      span: 24,
    },
    itemProps: {
      wrapperCol: { span: 22, xxl: 16 },
    },
    componentProps: {
      api: uploadApi,
      uploadParams: {
        groupName: '52030-20',
      },
    },
  },
];

export const materialSchema5: FormSchema[] = [
  {
    field: 'openContent',
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
    field: '[openStime, openEtime]',
    label: '开题时间',
    component: 'RangePicker',
    componentProps: {
      format: 'YYYY-MM-DD',
    },
    colProps: {
      span: 12,
    },
    itemProps: {
      wrapperCol: { span: 17, xxl: 8 },
    },
  },
  {
    field: 'openAttachments',
    component: 'Upload',
    label: '上传附件',
    colProps: {
      span: 24,
    },
    itemProps: {
      wrapperCol: { span: 22, xxl: 16 },
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

  // {
  //   title: '申报',
  //   href: '#reportSchemas',
  // },
  {
    title: '立项信息',
    href: '#messageSchema',
  },
  {
    title: '立项需要的材料',
    href: '#materialSchema1',
  },
  {
    title: '评审或咨询',
    href: '#announcementSchemas',
  },
  {
    title: '开题',
    href: '#announcementSchema5',
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
