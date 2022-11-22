import { ComponentType } from '../enums';

export interface Checkbox {
  // 唯一id
  id: string;
  // label文本
  stem: string;
  // 组件类型
  type: ComponentType.Checkbox;
  // 单位
  unit: string;
  // 是否必填
  isRequired: boolean;
  // 是否当前选中
  isActived: boolean;
  // 是否有填写设置
  hasWriteSetting: boolean;
  // 是否有选项设置
  hasOpionSetting: boolean;
  // 是否有整题设置
  hasQuestionSetting: boolean;
  // 是否显示题干说明
  hasStem: boolean;
  // 题干说明文本
  remark: string;
  // 选项
  options: CheckboxOptionsItem[];
  // 是否有选项说明
  hasOptionsStem: boolean;
  // 选项说明text
  optionsStemValue: string;
  // 子问题
  children: any[];
  [Checkbox: string]: any;
}

export interface CheckboxOptionsItem {
  label: string;
  value: string;
  // 唯一id
  id: string;
  // 是否在选项后添加填空框
  hasInput: boolean;
  // 是否添加选项说明
  hasOptionsItemStem: boolean;
  // 选项说明文本
  remark: string;
  // 是否开启选项设置
  hasOptionsItemSetting: boolean;

  [CheckboxOptionsItem: string]: any;
}
