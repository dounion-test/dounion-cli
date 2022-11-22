/*
 * @Author: 江雪松 576053154@qq.com
 * @Date: 2022-06-22 10:00:28
 * @LastEditors: 江雪松 576053154@qq.com
 * @LastEditTime: 2022-06-22 10:01:00
 * @FilePath: /vben-ucenter/src/views/doUcenter/role/config/add.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { FormSchema } from '/@/components/Table';
import vPinyin from '/@/utils/v-py.js';

export const schemas: FormSchema[] = [
  {
    field: 'name',
    component: 'Input',
    label: '名称',
    labelWidth: 55,
    colProps: {
      span: 24,
    },
    itemProps: {
      wrapperCol: { span: 12 },
    },
    required: true,
    componentProps: ({ formModel, formActionType }) => {
      return {
        onChange: (e: any) => {
          formModel.city = undefined; //  reset city value
          const { setFieldsValue } = formActionType;

          setFieldsValue({
            code: vPinyin.chineseToPinYin(e.target.value),
          });
        },
      };
    },
  },
  {
    field: 'code',
    component: 'Input',
    label: '代码',
    labelWidth: 55,
    colProps: {
      span: 24,
    },
    itemProps: {
      wrapperCol: { span: 12 },
    },
    required: true,
  },
  {
    field: 'memo',
    component: 'InputTextArea',
    label: '备注',
    labelWidth: 55,
    colProps: {
      span: 24,
    },
    componentProps: {
      showCount: true,
      maxlength: 100,
    },
  },
];
