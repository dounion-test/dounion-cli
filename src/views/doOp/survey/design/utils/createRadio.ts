import { createID } from './index';
import { Radio, RadioOptionsItem } from '../types/radio';
import { ComponentType } from '../enums';
/**
 * 创建单选题型选项
 */
export const createRadioOptionsItem = (id): RadioOptionsItem => {
  return {
    label: '选项',
    value: `${id}`,
    id: `${id}`,
    // 是否在选项后添加填空框
    hasInput: false,
    // 是否添加选项说明
    hasOptionsItemStem: false,
    // 选项说明文本
    remark: '请输入选项说明',
    // 是否开启选项设置
    hasOptionsItemSetting: false,
  };
};

/**
 * 创建单选题型其他选项
 */
export const createRadioOptionsOtherItem = (id): RadioOptionsItem => {
  return {
    label: '其他选项',
    value: `${id}`,
    id: `${id}`,
    // 是否在选项后添加填空框
    hasInput: true,
    // 是否添加选项说明
    hasOptionsItemStem: false,
    // 选项说明文本
    remark: '请输入选项说明',
    // 是否开启选项设置
    hasOptionsItemSetting: false,
  };
};

/**
 * 创建单选题型
 */
export const createRadio = (): Radio => {
  const radio = {
    // 唯一id
    id: createID('radio'),
    // label文本
    stem: '单选题',
    // 组件类型
    type: ComponentType.Radio,
    // 单位
    unit: '——',
    // 是否必填
    isRequired: false,
    // 是否当前选中
    isActived: false,
    // 是否有填写设置
    hasWriteSetting: false,
    // 是否有选项设置
    hasOpionSetting: true,
    // 是否有整题设置
    hasQuestionSetting: true,
    // 是否显示题干说明
    hasStem: false,
    // 题干说明文本
    remark: '请输入题干说明',
    // 是否有选项说明
    hasOptionsStem: false,
    // 选项说明text
    optionsStemValue: '请输入选项说明',
    // 选项
    options: <Recordable>[],
    // 子问题
    children: <Recordable>[],

    key: 0,
  };

  // 默认添加2个选项
  radio.options = [createRadioOptionsItem(radio.id + 1), createRadioOptionsItem(radio.id + 2)];

  return radio as Radio;
};
