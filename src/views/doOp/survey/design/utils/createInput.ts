import { createID } from './index';
import { Input } from '../types/input';
import { ComponentType, InputSize } from '../enums';
/**
 * 创建填空题题型
 */
export const createInput = (): Input => {
  return {
    // 题目唯一id
    id: createID('input'),
    // 题目类型title
    stem: '填空题',
    // 题目的回答
    answer: '',
    // 题目类型
    type: ComponentType.Input,
    // 单位
    unit: '——',
    // 必填
    isRequired: false,
    // 是否当前选中
    isActived: false,
    // 输入框大小 small/middle/big
    inputSize: InputSize.Small,
    // 开启输入校验 default/number/email/phoneNumber/ID
    textType: '',
    // 最小输入文字长度
    minTextLength: null,
    // 最大输入文字长度
    maxTextLength: null,
    // 输入框默认文本
    defaultText: '',
    // 是否显示题干说明
    hasStem: false,
    // 题干说明文本
    remark: '请输入题干说明',
    // 输入框提示文本
    placeholder: '请输入',
    // 是否有填写设置
    hasWriteSetting: true,
    // 是否有选项设置
    hasOpionSetting: false,
    // 是否有整题设置
    hasQuestionSetting: true,
    // 子问题
    children: [],
  };
};
