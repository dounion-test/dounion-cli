import { createCheckbox } from './createCheckbox';
import { createInput } from './createInput';
import { createRadio, createRadioOptionsItem, createRadioOptionsOtherItem } from './createRadio';
import { createModule } from './createModule';
import { ModuleType, ComponentType } from '../enums';
/**
 * 创建组件/模块的id
 * @param type 组件类型
 */
export const createID = (type: string): string => type + '-' + new Date().valueOf().toString();

const ComponentsMap = new Map();
ComponentsMap.set(ModuleType.Module, createModule);
ComponentsMap.set(ComponentType.Input, createInput);
ComponentsMap.set(ComponentType.Radio, createRadio);
ComponentsMap.set(ComponentType.Checkbox, createCheckbox);

export const ToLower = (num) => {
  const changeNum = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九']; //changeNum[0] = "零"
  const unit = ['', '十', '百', '千', '万'];
  num = parseInt(num);
  const getWan = (temp) => {
    const strArr = temp.toString().split('').reverse();
    let newNum = '';
    for (let i = 0; i < strArr.length; i++) {
      newNum =
        (i == 0 && strArr[i] == 0
          ? ''
          : i > 0 && strArr[i] == 0 && strArr[i - 1] == 0
          ? ''
          : changeNum[strArr[i]] + (strArr[i] == 0 ? unit[0] : unit[i])) + newNum;
    }
    return newNum;
  };
  const overWan = Math.floor(num / 10000);
  let noWan = num % 10000;
  if (noWan.toString().length < 4) {
    noWan = '0' + noWan;
  }
  return overWan ? getWan(overWan) + '万' + getWan(noWan) : getWan(num);
};

export const comTypeMap = new Map([
  ['module', '52016-10'],
  ['input', '52020-10'],
  ['radio', '52020-20'],
  ['checkbox', '52020-30'],
]);

export const comTypeMapOpposite = new Map([
  ['52016-10', 'module'],
  ['52020-10', 'input'],
  ['52020-20', 'radio'],
  ['52020-30', 'checkbox'],
]);

export const booleanKeysSet = new Set(['isRequired']);

export {
  createCheckbox,
  createInput,
  createRadio,
  createRadioOptionsItem,
  createRadioOptionsOtherItem,
  ComponentsMap,
};
