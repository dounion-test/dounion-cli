import { ref } from 'vue';
import { FormSchema } from '/@/components/Form/index';
import { infoTypeFirstLevel, infoTypeSecondLevel, infoTypeDoc } from '/@/api/doInfo/index';
import { jigou } from './formSchema/jigou';
import { jijinxiangmu } from './formSchema/jijinxiangmu';
import { kejibaogao } from './formSchema/kejibaogao';
import { qikan } from './formSchema/qikan';
import { zhengce } from './formSchema/zhengce';
import { zhuanjia } from './formSchema/zhuanjia';
import { xinwen } from './formSchema/xinwen';

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
      wrapperCol: { span: 12, xxl: 12 },
    },
    rules: [{ required: true, trigger: 'blur', message: '请选择文献', type: 'string' }],
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
    field: 'firstLevel',
    component: 'ApiSelect',
    label: '一级类目',
    colProps: {
      span: 8,
    },
    itemProps: {
      wrapperCol: { span: 12, xxl: 12 },
    },
    componentProps: ({ formModel, formActionType }) => {
      return {
        api: infoTypeFirstLevel,
        resultField: 'list',
        labelField: 'firstLevelName',
        valueField: 'firstLevel',
        onChange: async (value: any) => {
          const { updateSchema } = formActionType;
          formModel.secondLevel = '';
          if (!value) {
            updateSchema({
              field: 'secondLevel',
              componentProps: {
                disabled: true,
              },
            });
          } else {
            updateSchema({
              field: 'secondLevel',
              componentProps: {
                api: infoTypeSecondLevel,
                resultField: 'list',
                labelField: 'secondLevelName',
                valueField: 'secondLevel',
                disabled: false,
                params: { firstLevel: value },
              },
            });
          }
        },
      };
    },
    rules: [
      {
        required: true,
        trigger: 'blur',
        type: 'string',
        message: '请选择一级类目',
      },
    ],
  },
  {
    field: 'secondLevel',
    component: 'ApiSelect',
    label: '二级分类',
    colProps: {
      span: 8,
    },
    itemProps: {
      wrapperCol: { span: 12, xxl: 12 },
    },
    rules: [{ required: true, trigger: 'blur', message: '请选择二级分类', type: 'string' }],
    componentProps: ({ formModel }) => {
      return {
        api: infoTypeSecondLevel,
        disabled: formModel.firstLevel ? false : true,
        params: {
          firstLevel: formModel.firstLevel || '',
        },
        resultField: 'list',
        labelField: 'secondLevelName',
        valueField: 'secondLevel',
      };
    },
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
