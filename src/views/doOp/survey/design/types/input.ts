import { ComponentType, InputSize } from '../enums';
export interface Input {
  // 题目唯一id
  id: string;
  // 题目类型title
  stem: string;
  // 题目的回答
  answer?: string;
  // 题目类型
  type: ComponentType.Input;
  // 单位
  unit: string;
  // 必填
  isRequired: boolean;
  // 是否当前选中
  isActived: boolean;
  // 输入框大小 small/middle/big
  inputSize: InputSize;
  // 开启输入校验 default/number/email/phoneNumber/ID
  textType: string;
  // 最小输入文字长度
  minTextLength: number | null;
  // 最大输入文字长度
  maxTextLength: number | null;
  // 输入框默认文本
  defaultText: string;
  // 是否显示题干说明
  hasStem: boolean;
  // 题干说明文本
  remark: string;
  // 输入框提示文本
  placeholder: string;
  // 是否有填写设置
  hasWriteSetting: boolean;
  // 是否有选项设置
  hasOpionSetting: boolean;
  // 是否有整题设置
  hasQuestionSetting: boolean;

  parentId?: any;

  [Checkbox: string]: any;
  // 子问题
  children: any[];
}
