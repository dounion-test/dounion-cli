import { ModuleType } from '../enums';

export interface Module {
  // 题目唯一id
  id: string;
  // 题目类型title
  label: string;
  // 题目类型
  type: ModuleType.Module;
  // 是否当前选中
  isActived: boolean;
  // 隐藏所有子问题
  hiddenChildren: boolean;

  key: number;
  // 子问题
  children: any[];
}
