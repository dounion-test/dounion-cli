import { createID } from './index';
import { Module } from '../types/module';
import { ModuleType } from '../enums';

export const createModule = (): Module => {
  return {
    // 模块唯一id
    id: createID('module'),
    // label文本
    label: '分类栏',
    // 组件类型
    type: ModuleType.Module,
    // 是否当前选中
    isActived: false,
    // 隐藏所有子问题
    hiddenChildren: false,
    key: 0,
    // 子问题
    children: [],
  };
};
