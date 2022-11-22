import { ref } from 'vue';
import { FormSchema } from '/@/components/Form/index';
import {
  infoTypeFirstLevel,
  infoTypeSecondLevel,
  infoTypeDoc,
  infoTypeLevelTree,
} from '/@/api/doInfo/index';
import { jigou } from './formSchema/jigou';
import { jijinxiangmu } from './formSchema/jijinxiangmu';
import { kejibaogao } from './formSchema/kejibaogao';
import { qikan } from './formSchema/qikan';
import { zhengce } from './formSchema/zhengce';
import { zhuanjia } from './formSchema/zhuanjia';
import { xinwen } from './formSchema/xinwen';
import { ucenterCodeCombox } from '/@/api/common/index';

export const type = ref('');

export const basicSchema: FormSchema[] = [
  {
    field: 'docType',
    component: 'ApiSelect',
    label: '文献类型',
    colProps: {
      span: 8,
    },
    itemProps: {
      wrapperCol: { span: 15, xxl: 12 },
    },
    rules: [{ required: true, trigger: 'blur', message: '请选择文献类型', type: 'string' }],
    componentProps: {
      api: infoTypeDoc,
      labelField: 'docTypeName',
      valueField: 'docType',
      onChange: (value) => {
        type.value = value;
      },
    },
  },
  {
    field: 'secondLevelNames',
    component: 'ApiTreeSelect',
    label: '类目',
    colProps: {
      span: 8,
    },
    itemProps: {
      wrapperCol: { span: 15, xxl: 12 },
    },
    componentProps: ({ formModel, formActionType }) => {
      return {
        api: infoTypeLevelTree,
        multiple: true,
        fieldNames: { key: 'id', label: 'levelName', value: 'level' },
        afterFetch: (res) => {
          return res.map((v) => {
            return {
              ...v,
              disabled: true,
            };
          });
          console.log(res);
        },
        // onChange: async (value: any) => {
        //   const { updateSchema } = formActionType;
        //   formModel.secondLevel = '';
        //   if (!value) {
        //     updateSchema({
        //       field: 'secondLevel',
        //       componentProps: {
        //         disabled: true,
        //       },
        //     });
        //   } else {
        //     updateSchema({
        //       field: 'secondLevel',
        //       componentProps: {
        //         api: infoTypeSecondLevel,
        //         resultField: 'list',
        //         labelField: 'secondLevelName',
        //         valueField: 'secondLevel',
        //         disabled: false,
        //         params: { firstLevel: value },
        //       },
        //     });
        //   }
        // },
      };
    },

    rules: [
      {
        required: true,
        trigger: 'blur',
        type: 'array',
        message: '请选择类目',
      },
    ],
  },
  {
    field: 'sourceType',
    component: 'ApiSelect',
    label: '文献来源',
    colProps: {
      span: 8,
    },
    itemProps: {
      wrapperCol: { span: 15, xxl: 12 },
    },
    componentProps: ({ formModel }) => {
      return {
        api: ucenterCodeCombox,
        params: {
          type: '10001-52010',
        },
        resultField: 'list',
        labelField: 'name',
        valueField: 'value',
      };
    },
    rules: [{ required: true, trigger: 'blur', message: '请选择文献来源', type: 'string' }],
  },
];

const formMap = new Map();
formMap.set('期刊', qikan);
formMap.set('专家', zhuanjia);
formMap.set('机构', jigou);
formMap.set('科技报告', kejibaogao);
formMap.set('政策', zhengce);
formMap.set('基金', jijinxiangmu);
formMap.set('新闻', xinwen);
export { formMap };
