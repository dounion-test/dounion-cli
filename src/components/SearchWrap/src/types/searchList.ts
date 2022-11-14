/*
 * @Author: 江雪松 576053154@qq.com
 * @Date: 2022-08-19 18:17:56
 * @LastEditors: 江雪松 576053154@qq.com
 * @LastEditTime: 2022-10-27 09:47:46
 * @FilePath: /rural-revitalization/src/components/SearchWrap/src/types/searchList.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

export type searchListType = searchListItem[];

export interface fieldNamesType {
  // 树下拉名称
  label: string;
  // 树下拉值
  value: string | number;
  // 树下拉值
  key: string | number;
}

export interface searchListOptions {
  // 下拉名称
  label: string;
  // 下拉值
  value: string | number;
}

export interface searchListItem {
  // 名称
  label: string;
  // 表单类型 (input、select、ApiSelect、rangePicker、datePicker)
  type: string;
  // 表单字段
  field: string;
  // 表单值
  value: any;
  // 表单占位提示
  placeholder?: string;
  // 下拉列表
  options?: searchListOptions[];
  // 远程下拉请求函数
  api?: any;
  // 远程请求参数
  searchParams?: any;
  // 远程数据在下一个层级
  resultField?: string;
  // 远程下拉名称字段替换 (当type为tag为必填)
  labelField?: string;
  // 远程下拉值字段替换 (当type为tag为必填)
  valueField?: string;
  // 类型为tag时，是否可多选
  isMultiple?: boolean;
  // 类型为tag时，是否增加全部选项
  hasAll?: boolean;
  // 类型为rangePicker时, value的时间格式
  valueFormat?: string;
  // 树形下拉字段替换
  fieldNames?: fieldNamesType;
  // 树形下拉搜索字段
  treeNodeFilterProp?: string;
  // 日期选择器的类型 (date | week | month | quarter | year)
  picker?: string;
  // 是否多级分类
  isChildren?: boolean;
  //　是否隐藏
  isShow?: boolean;
  //　回调
  componentProps?: object | Function;
  // 长度
  span?: number;
}

export interface SearchFunc {
  (val: string): void;
}
