<!--
 * @Author: 江雪松 576053154@qq.com
 * @Date: 2022-09-05 09:21:22
 * @LastEditors: 江雪松 576053154@qq.com
 * @LastEditTime: 2022-11-03 14:49:56
 * @FilePath: /RuralSurveyPc/src/views/doPc/survey/module/FormItem.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div>
    <BasicForm @register="registerForm" :showIndexColumn="true" class="approval-form">
      <template #radioGroup="{ field, model, schema }">
        <a-radio-group v-model:value="model[field]" @change="(e) => handleRadiochange(e, schema)">
          <a-radio
            class="!flex !items-baseline !ml-0 !mb-4"
            v-for="item in schema.componentProps.options"
            :value="item.id"
            :key="item.id"
          >
            <div class="flex">
              <span class="mr-2" v-html="item.optionValue"></span>
              <a-input
                v-model:value="model[`${field}-other`]"
                v-if="item.isAddBlank"
                size="small"
                class="flex-1"
              />
            </div>
            <div class="text-secondary !ml-0" v-if="item.remark" v-html="item.remark"></div>
          </a-radio>
        </a-radio-group>
      </template>
      <template #checkboxGroup="{ field, model, schema }">
        <a-checkbox-group
          v-model:value="model[field]"
          @change="(e) => handleCheckboxChange(e, schema)"
        >
          <a-checkbox
            class="!flex !items-baseline !ml-0 !mb-4"
            v-for="item in schema.componentProps.options"
            :value="item.id"
            :key="item.id"
          >
            <div class="flex">
              <span class="mr-2" v-html="item.optionValue"></span>
              <a-input
                v-model:value="model[`${field}-other`]"
                v-if="item.isAddBlank"
                size="small"
                class="flex-1"
              />
            </div>
            <div class="text-secondary !ml-0" v-if="item.remark" v-html="item.remark"></div>
          </a-checkbox>
        </a-checkbox-group>
      </template>
    </BasicForm>
  </div>
</template>

<script lang="ts">
  import { defineComponent, inject, ref, onMounted, watch } from 'vue';
  import { Input, Radio, Checkbox } from 'ant-design-vue';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { debounce } from '/@/utils';
  import dayjs from 'dayjs';

  export default defineComponent({
    components: {
      BasicForm,
      AInput: Input,
      ARadio: Radio,
      ARadioGroup: Radio.Group,
      ACheckbox: Checkbox,
      ACheckboxGroup: Checkbox.Group,
    },
    props: {
      isSave: Boolean,
      categoryIndex: Number,
    },
    emits: ['save'],
    setup(props, { emit }) {
      const categoryList: any = inject('categoryList');
      const subjectList: any = ref([]);
      const [
        registerForm,
        {
          validateFields,
          setFieldsValue,
          setProps,
          scrollToField,
          updateSchema,
          validate,
          getFieldsValue,
        },
      ] = useForm({
        layout: 'vertical',
        schemas: [],
        showActionButtonGroup: false,
      });

      const getSchemas = async () => {
        let schemas: any = [];
        let showFormIds: any = [];
        let hideFormIds: any = [];
        let answerArr: any = {};
        let categoryItem = categoryList.value[props.categoryIndex as number];
        subjectList.value = treeToListss(categoryItem.subjectList, 0);
        subjectList.value.forEach((item: any) => {
          switch (item.type) {
            case '52020-10':
              // 判断显示/隐藏
              let inputShow = true;
              if (item.loicSettingDetailList.length > 0) {
                item.loicSettingDetailList.forEach((it) => {
                  if (it.handleMethod == '52023-10') {
                    let optionType = eachSubjectListById(it.logicalSubjectId, it.logicalId);
                    if (optionType == '52046-10') {
                      inputShow = false;
                    }
                  }
                });
              }
              // 创建formItem
              let inputObj = {
                field: `form-${item.id}`,
                component: 'Input',
                label: `${item.orderNo ? item.orderNo : ''}　${item.stem}${
                  !item.unit || item.unit == '——' ? '' : `（${item.unit}）`
                }`,
                subLabel: item.remark,
                colProps: {
                  span: 23,
                  style: { marginLeft: `${item.ml}px` },
                },
                componentProps: {
                  style: { width: `calc(80% - ${item.ml}px)` },
                },
                ifShow: inputShow,
                loicSettingList: item.loicSettingList,
                rules: [
                  {
                    required: item.isRequired ? true : false,
                    validator: async (_, value) => {
                      let dataForm = getFieldsValue();
                      if (!value) {
                        if (item.isRequired) {
                          return Promise.reject(`请输入${item.stem}`);
                        } else {
                          return Promise.resolve();
                        }
                      }
                      if (value) {
                        // 数值(10.0)
                        if (item.textType == '52045-31') {
                          const isNumber =
                            /(^([-]?)[1-9]([0-9]+)?(\.[0-9]{1,1})?$)|(^([-]?)(0){1}$)|(^([-]?)[0-9]\.[0-9]([0-9])?$)/;
                          if (!isNumber.test(value)) {
                            return Promise.reject(`请输入不超过一位小数的数值（例如：10.0）`);
                          }
                        }
                        // 数值(10.00)
                        if (item.textType == '52045-30') {
                          const isNumber =
                            /(^([-]?)[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^([-]?)(0){1}$)|(^([-]?)[0-9]\.[0-9]([0-9])?$)/;
                          if (!isNumber.test(value)) {
                            return Promise.reject(`请输入不超过两位小数的数值（例如：10.00）`);
                          }
                        }
                        // 数值(10.000)
                        if (item.textType == '52045-29') {
                          const isNumber =
                            /(^([-]?)[1-9]([0-9]+)?(\.[0-9]{1,3})?$)|(^([-]?)(0){1}$)|(^([-]?)[0-9]\.[0-9]([0-9])?$)/;
                          if (!isNumber.test(value)) {
                            return Promise.reject(`请输入不超过三位小数的数值（例如：10.000）`);
                          }
                        }
                        // 数值(10.0000)
                        if (item.textType == '52045-28') {
                          const isNumber =
                            /(^([-]?)[1-9]([0-9]+)?(\.[0-9]{1,4})?$)|(^([-]?)(0){1}$)|(^([-]?)[0-9]\.[0-9]([0-9])?$)/;
                          if (!isNumber.test(value)) {
                            return Promise.reject(`请输入不超过四位小数的数值（例如：10.0000）`);
                          }
                        }
                        // 数值(10.00000)
                        if (item.textType == '52045-27') {
                          const isNumber =
                            /(^([-]?)[1-9]([0-9]+)?(\.[0-9]{1,5})?$)|(^([-]?)(0){1}$)|(^([-]?)[0-9]\.[0-9]([0-9])?$)/;
                          if (!isNumber.test(value)) {
                            return Promise.reject(`请输入不超过五位小数的数值（例如：10.00000）`);
                          }
                        }
                        // 整数
                        if (item.textType == '52045-40') {
                          const isInteger = /^[0-9]*[1-9][0-9]*$/; //正整数
                          const isIntegerF = /^-[0-9]*[1-9][0-9]*$/; //负整数
                          if (!isInteger.test(value) && !isIntegerF.test(value)) {
                            return Promise.reject(`请输入整数`);
                          }
                        }
                        // 日期格式（yyyy-MM-dd）
                        if (item.textType == '52045-20') {
                          const isTime = /^(\d{4})-(0\d{1}|1[0-2])-(0\d{1}|[12]\d{1}|3[01])$/;
                          if (!isTime.test(value)) {
                            return Promise.reject(
                              `请输入正确的日期格式，例如：${dayjs().format('YYYY-MM-DD')}`,
                            );
                          }
                        }
                        // 判断是否有逻辑设置
                        if (item.loicSettingList.length > 0) {
                          for (let i = 0; i < item.loicSettingList.length; i++) {
                            let logic = item.loicSettingList[i];
                            let num = 0;
                            let ruleSms = '';
                            logic.loicSettingDetailList.forEach((j, ind) => {
                              ruleSms = ruleSms + `${item.orderNo}.${j.subjectOrderNo}`;
                              if (ind === 0) {
                                if (dataForm[`form-${j.subjectId}`]) {
                                  num = Number(dataForm[`form-${j.subjectId}`]);
                                }
                                let nextItem = logic.loicSettingDetailList[ind + 1];
                                console.log(nextItem, 'nextItem');
                                if (nextItem) {
                                  if (dataForm[`form-${nextItem.subjectId}`]) {
                                    // 加
                                    if (j.calcMethod == '52024-10') {
                                      ruleSms = ruleSms + '+';
                                      num += Number(dataForm[`form-${nextItem.subjectId}`]);
                                    }
                                    // 减
                                    if (j.calcMethod == '52024-20') {
                                      ruleSms = ruleSms + '-';
                                      num -= Number(dataForm[`form-${nextItem.subjectId}`]);
                                    }
                                    // 乘
                                    if (j.calcMethod == '52024-30') {
                                      ruleSms = ruleSms + '*';
                                      num *= Number(dataForm[`form-${nextItem.subjectId}`]);
                                    }
                                    // 除
                                    if (j.calcMethod == '52024-40') {
                                      ruleSms = ruleSms + '/';
                                      num /= Number(dataForm[`form-${nextItem.subjectId}`]);
                                    }
                                  } else {
                                    // 加
                                    if (j.calcMethod == '52024-10') {
                                      ruleSms = ruleSms + '+';
                                    }
                                    // 减
                                    if (j.calcMethod == '52024-20') {
                                      ruleSms = ruleSms + '-';
                                    }
                                    // 乘
                                    if (j.calcMethod == '52024-30') {
                                      ruleSms = ruleSms + '*';
                                    }
                                    // 除
                                    if (j.calcMethod == '52024-40') {
                                      ruleSms = ruleSms + '/';
                                    }
                                  }
                                }
                              } else {
                                let nextItem = logic.loicSettingDetailList[ind + 1];
                                if (nextItem) {
                                  if (dataForm[`form-${nextItem.subjectId}`]) {
                                    // 加
                                    if (j.calcMethod == '52024-10') {
                                      ruleSms = ruleSms + '+';
                                      num += Number(dataForm[`form-${nextItem.subjectId}`]);
                                    }
                                    // 减
                                    if (j.calcMethod == '52024-20') {
                                      ruleSms = ruleSms + '-';
                                      num -= Number(dataForm[`form-${nextItem.subjectId}`]);
                                    }
                                    // 乘
                                    if (j.calcMethod == '52024-30') {
                                      ruleSms = ruleSms + '*';
                                      num *= Number(dataForm[`form-${nextItem.subjectId}`]);
                                    }
                                    // 除
                                    if (j.calcMethod == '52024-40') {
                                      ruleSms = ruleSms + '/';
                                      num /= Number(dataForm[`form-${nextItem.subjectId}`]);
                                    }
                                  } else {
                                    // 加
                                    if (j.calcMethod == '52024-10') {
                                      ruleSms = ruleSms + '+';
                                    }
                                    // 减
                                    if (j.calcMethod == '52024-20') {
                                      ruleSms = ruleSms + '-';
                                    }
                                    // 乘
                                    if (j.calcMethod == '52024-30') {
                                      ruleSms = ruleSms + '*';
                                    }
                                    // 除
                                    if (j.calcMethod == '52024-40') {
                                      ruleSms = ruleSms + '/';
                                    }
                                  }
                                }
                              }
                            });
                            console.log(ruleSms, 'ruleSms');
                            // 大于
                            if (logic.judgeMethod == '52022-10') {
                              if (Number(value) > num) {
                                return Promise.resolve();
                              } else {
                                return Promise.reject(`该值应大于${ruleSms}`);
                              }
                            }
                            // 大于等于
                            if (logic.judgeMethod == '52022-20') {
                              if (Number(value) >= num) {
                                return Promise.resolve();
                              } else {
                                return Promise.reject(`该值应大于等于${ruleSms}`);
                              }
                            }
                            // 等于
                            if (logic.judgeMethod == '52022-30') {
                              if (Number(value) == num) {
                                return Promise.resolve();
                              } else {
                                return Promise.reject(`该值应等于${ruleSms}`);
                              }
                            }
                            // 小于
                            if (logic.judgeMethod == '52022-40') {
                              if (Number(value) < num) {
                                return Promise.resolve();
                              } else {
                                return Promise.reject(`该值应小于${ruleSms}`);
                              }
                            }
                            // 小于等于
                            if (logic.judgeMethod == '52022-50') {
                              if (Number(value) <= num) {
                                return Promise.resolve();
                              } else {
                                return Promise.reject(`该值应小于等于${ruleSms}`);
                              }
                            }
                          }
                        }
                        // 判断是否被设置逻辑
                        if (item.loicSettingDetailList.length > 0) {
                          // 添加防抖函数，在保存时使validateFields()只触发一次
                          debounce(() => {
                            validateFields([
                              `form-${item.loicSettingDetailList[0].logicalSubjectId}`,
                            ]);
                          }, 100);
                        }
                        return Promise.resolve();
                      }
                    },
                    trigger: 'change',
                  },
                ],
              };
              // 如果该项隐藏，则其子问题也隐藏
              if (!inputShow) {
                hideFormIds = [...hideFormIds, ...eachTree([item])];
              }
              schemas.push(inputObj);
              // 数据回填
              if (item.answerDetailList.length > 0) {
                Object.assign(answerArr, {
                  [`form-${item.id}`]: item.answerDetailList[0].blankValue,
                });
              } else {
                if (item.lastYearAnswerDetailList.length > 0) {
                  Object.assign(answerArr, {
                    [`form-${item.id}`]: item.lastYearAnswerDetailList[0].blankValue,
                  });
                }
              }
              break;
            case '52020-20':
              // 判断显示/隐藏
              let radioShow = true;
              if (item.loicSettingDetailList.length > 0) {
                item.loicSettingDetailList.forEach((it) => {
                  if (it.handleMethod == '52023-10') {
                    let optionType = eachSubjectListById(it.logicalSubjectId, it.logicalId);
                    if (optionType == '52046-10') {
                      radioShow = false;
                    }
                  }
                });
              }
              // 判断其选项中有没有其他选项
              item.subjectOptionsList.forEach((it) => {
                if (it.isAddBlank) {
                  let radioOtherObj = {
                    field: `form-${item.id}-other`,
                    component: 'Input',
                    show: false,
                    required: item.isRequired ? true : false,
                  };
                  schemas.push(radioOtherObj);
                }
              });
              // 创建formItem
              let radioObj = {
                field: `form-${item.id}`,
                component: 'RadioGroup',
                label: `${item.orderNo ? item.orderNo : ''}　${item.stem}${
                  !item.unit || item.unit == '——' ? '' : `（${item.unit}）`
                }`,
                subLabel: item.remark,
                required: item.isRequired ? true : false,
                colProps: {
                  span: 23,
                  style: { marginLeft: `${item.ml}px` },
                },
                componentProps: {
                  options: item.subjectOptionsList,
                },
                ifShow: radioShow,
                loicSettingList: item.loicSettingList,
                slot: 'radioGroup',
              };
              // 如果该项隐藏，则其子问题也隐藏
              if (!radioShow) {
                hideFormIds = [...hideFormIds, ...eachTree([item])];
              }
              schemas.push(radioObj);
              // 数据回填
              if (item.answerDetailList.length > 0) {
                let id = Number(item.answerDetailList[0].selectValue);
                let codeArr: any = [];
                item.subjectOptionsList.forEach((it) => {
                  if (id == it.id) {
                    codeArr.push(it.code);
                  }
                });
                Object.assign(answerArr, {
                  [`form-${item.id}`]: id,
                });
                // 回填其他input
                if (item.answerDetailList[0].blankValue) {
                  Object.assign(answerArr, {
                    [`form-${item.id}-other`]: item.answerDetailList[0].blankValue,
                  });
                }
                // 判断选中的项，有没有逻辑设置的项
                if (item.loicSettingList.length > 0) {
                  item.loicSettingList.forEach((it) => {
                    if (codeArr.indexOf(it.compareValue) != -1) {
                      it.loicSettingDetailList.forEach((i) => {
                        if (it.optionType == '52046-10') {
                          showFormIds = [...showFormIds, ...eachTreeById(i.subjectId)];
                        } else {
                          hideFormIds = [...hideFormIds, ...eachTreeById(i.subjectId)];
                        }
                      });
                    }
                  });
                }
              } else {
                if (item.lastYearAnswerDetailList.length > 0) {
                  let id = Number(item.lastYearAnswerDetailList[0].selectValue);
                  let codeArr: any = [];
                  item.subjectOptionsList.forEach((it) => {
                    if (id == it.id) {
                      codeArr.push(it.code);
                    }
                  });
                  Object.assign(answerArr, {
                    [`form-${item.id}`]: id,
                  });
                  // 回填其他input
                  if (item.lastYearAnswerDetailList[0].blankValue) {
                    Object.assign(answerArr, {
                      [`form-${item.id}-other`]: item.lastYearAnswerDetailList[0].blankValue,
                    });
                  }
                  // 判断选中的项，有没有逻辑设置的项
                  if (item.loicSettingList.length > 0) {
                    item.loicSettingList.forEach((it) => {
                      if (codeArr.indexOf(it.compareValue) != -1) {
                        it.loicSettingDetailList.forEach((i) => {
                          if (it.optionType == '52046-10') {
                            showFormIds = [...showFormIds, ...eachTreeById(i.subjectId)];
                          } else {
                            hideFormIds = [...hideFormIds, ...eachTreeById(i.subjectId)];
                          }
                        });
                      }
                    });
                  }
                }
              }
              break;
            case '52020-30':
              // 判断显示/隐藏
              let checkboxShow = true;
              if (item.loicSettingDetailList.length > 0) {
                item.loicSettingDetailList.forEach((it) => {
                  if (it.handleMethod == '52023-10') {
                    let optionType = eachSubjectListById(it.logicalSubjectId, it.logicalId);
                    if (optionType == '52046-10') {
                      checkboxShow = false;
                    }
                  }
                });
              }
              // 创建formItem
              let checkboxObj = {
                field: `form-${item.id}`,
                component: 'CheckboxGroup',
                label: `${item.orderNo ? item.orderNo : ''}　${item.stem}${
                  !item.unit || item.unit == '——' ? '' : `（${item.unit}）`
                }`,
                subLabel: item.remark,
                required: item.isRequired ? true : false,
                colProps: {
                  span: 23,
                  style: { marginLeft: `${item.ml}px` },
                },
                componentProps: {
                  options: item.subjectOptionsList,
                },
                ifShow: checkboxShow,
                loicSettingList: item.loicSettingList,
                slot: 'checkboxGroup',
              };
              // 判断其选项中有没有其他选项
              item.subjectOptionsList.forEach((it) => {
                if (it.isAddBlank) {
                  let checkboxOtherObj = {
                    field: `form-${item.id}-other`,
                    component: 'Input',
                    show: false,
                  };
                  schemas.push(checkboxOtherObj);
                }
              });
              // 如果该项隐藏，则其子问题也隐藏
              if (!checkboxShow) {
                hideFormIds = [...hideFormIds, ...eachTree([item])];
              }
              schemas.push(checkboxObj);
              // 数据回填
              if (item.answerDetailList.length > 0) {
                let selectValue = item.answerDetailList[0].selectValue
                  ? item.answerDetailList[0].selectValue.split(',')
                  : [];
                let ids = selectValue.map((it) => Number(it));
                let codeArr: any = [];
                item.subjectOptionsList.forEach((it) => {
                  if (ids.indexOf(it.id) != -1) {
                    codeArr.push(it.code);
                  }
                });
                Object.assign(answerArr, {
                  [`form-${item.id}`]: ids,
                });
                // 回填其他input
                if (item.answerDetailList[0].blankValue) {
                  Object.assign(answerArr, {
                    [`form-${item.id}-other`]: item.answerDetailList[0].blankValue,
                  });
                }
                // 判断选中的项，有没有逻辑设置的项
                if (item.loicSettingList.length > 0) {
                  item.loicSettingList.forEach((it) => {
                    if (codeArr.indexOf(it.compareValue) != -1) {
                      it.loicSettingDetailList.forEach((i) => {
                        if (it.optionType == '52046-10') {
                          showFormIds = [...showFormIds, ...eachTreeById(i.subjectId)];
                        } else {
                          hideFormIds = [...hideFormIds, ...eachTreeById(i.subjectId)];
                        }
                      });
                    }
                  });
                }
              } else {
                if (item.lastYearAnswerDetailList.length > 0) {
                  let selectValue = item.lastYearAnswerDetailList[0].selectValue.split(',');
                  let ids = selectValue.map((it) => Number(it));
                  let codeArr: any = [];
                  item.subjectOptionsList.forEach((it) => {
                    if (ids.indexOf(it.id) != -1) {
                      codeArr.push(it.code);
                    }
                  });
                  Object.assign(answerArr, {
                    [`form-${item.id}`]: ids,
                  });
                  // 回填其他input
                  if (item.lastYearAnswerDetailList[0].blankValue) {
                    Object.assign(answerArr, {
                      [`form-${item.id}-other`]: item.lastYearAnswerDetailList[0].blankValue,
                    });
                  }
                  // 判断选中的项，有没有逻辑设置的项
                  if (item.loicSettingList.length > 0) {
                    item.loicSettingList.forEach((it) => {
                      if (codeArr.indexOf(it.compareValue) != -1) {
                        it.loicSettingDetailList.forEach((i) => {
                          if (it.optionType == '52046-10') {
                            showFormIds = [...showFormIds, ...eachTreeById(i.subjectId)];
                          } else {
                            hideFormIds = [...hideFormIds, ...eachTreeById(i.subjectId)];
                          }
                        });
                      }
                    });
                  }
                }
              }
              break;
            default:
              break;
          }
        });
        await schemas.forEach((item, index) => {
          if (hideFormIds.indexOf(item.field) != -1) {
            item.ifShow = false;
          }
          if (showFormIds.indexOf(item.field) != -1) {
            item.ifShow = true;
          }
          item.orderIndex = index;
        });
        await setProps({ schemas });
        await setFieldsValue(answerArr);
      };

      const handleRadiochange = (e, schema) => {
        let id = e.target.value;
        let codeArr: any = [];
        let options = schema.componentProps.options;
        options.forEach((item) => {
          if (id == item.id) {
            codeArr.push(item.code);
          }
        });
        //判断有没有逻辑设置
        if (schema.loicSettingList.length > 0) {
          schema.loicSettingList.forEach((item) => {
            // 判断选择了逻辑设置中设置的项
            if (e && codeArr.indexOf(item.compareValue) != -1) {
              item.loicSettingDetailList.forEach((it) => {
                // 设置显示/隐藏
                // if (item.optionType == '52046-10') {
                //   setShowHide(it.subjectId, true);
                // } else {
                //   setShowHide(it.subjectId, false);
                // }
                newSetShowHide(item, it, true);
              });
            } else {
              item.loicSettingDetailList.forEach((it) => {
                // 设置显示/隐藏
                // if (item.optionType == '52046-10') {
                //   setShowHide(it.subjectId, false);
                // } else {
                //   setShowHide(it.subjectId, true);
                // }
                newSetShowHide(item, it, false);
              });
            }
          });
        }
      };

      // 选项变化触发逻辑设置
      const handleCheckboxChange = (e, schema) => {
        let codeArr: any = [];
        let options = schema.componentProps.options;
        if (e) {
          options.forEach((item) => {
            if (e.indexOf(item.id) != -1) {
              codeArr.push(item.code);
            }
          });
        }
        //判断有没有逻辑设置
        if (schema.loicSettingList.length > 0) {
          let list = schema.loicSettingList;
          for (let i = 0; i < list.length; i++) {
            // 判断选择了逻辑设置中设置的项
            if (e && codeArr.indexOf(list[i].compareValue) != -1) {
              list[i].loicSettingDetailList.forEach((it) => {
                // 设置显示/隐藏
                // if (list[i].optionType == '52046-10') {
                //   setShowHide(it.subjectId, true);
                // } else {
                //   setShowHide(it.subjectId, false);
                // }
                newSetShowHide(list[i], it, true);
              });
            } else {
              list[i].loicSettingDetailList.forEach((it) => {
                // 设置显示/隐藏
                // if (list[i].optionType == '52046-10') {
                //   setShowHide(it.subjectId, false);
                // } else {
                //   setShowHide(it.subjectId, true);
                // }
                newSetShowHide(list[i], it, false);
              });
            }
          }
        }
      };

      /**
       * @description: 设置问题以及其子问题的显示和隐藏
       * @param {*} id 问题id
       * @param {*} isShow 显示(true)/隐藏(false)
       * @return {*}
       */
      const setShowHide = async (id, isShow) => {
        let ids = [];
        let item: any = '';
        for (let i = 0; i < subjectList.value.length; i++) {
          if (subjectList.value[i].id == id) {
            item = subjectList.value[i];
            ids = eachTree([subjectList.value[i]]);
            break;
          }
        }
        ids.forEach((j) => {
          updateSchema({
            field: j,
            ifShow: isShow,
          });
        });
        let formData: any = {};
        try {
          // 判断该项有没有逻辑设置控制其他问题的显示 / 隐藏;
          formData = await validate([`form-${id}`]);
        } catch (error: any) {
          formData = error.values;
        }
        if (!formData[`form-${id}`]) {
          return false;
        }
        if (item.type == '52020-20' && item.loicSettingList.length > 0) {
          let radioCode: any = [];
          item.subjectOptionsList.forEach((it) => {
            if (it.id == formData[`form-${id}`]) {
              radioCode.push(it.code);
            }
          });
          item.loicSettingList.forEach((it) => {
            if (radioCode.indexOf(it.compareValue) != -1) {
              it.loicSettingDetailList.forEach((i) => {
                setShowHide(i.subjectId, isShow);
              });
            } else {
              it.loicSettingDetailList.forEach((i) => {
                setShowHide(i.subjectId, false);
              });
            }
          });
        }
        // 判断该项有没有逻辑设置控制其他问题的显示/隐藏
        if (item.type == '52020-30') {
          let checkboxCode: any = [];
          let ids = formData[`form-${id}`];
          item.subjectOptionsList.forEach((it) => {
            if (ids.indexOf(it.id) != -1) {
              checkboxCode.push(it.code);
            }
          });
          item.loicSettingList.forEach((it) => {
            if (checkboxCode.indexOf(it.compareValue) != -1) {
              it.loicSettingDetailList.forEach((i) => {
                setShowHide(i.subjectId, isShow);
              });
            } else {
              it.loicSettingDetailList.forEach((i) => {
                setShowHide(i.subjectId, false);
              });
            }
          });
        }
      };

      /**
       * @description: 设置问题和其子问题以及其逻辑控制的题的显示和隐藏
       * @param {*} id 问题id
       * @param {*} isShow 显示(true)/隐藏(false)
       * @return {*}
       */
      const newSetShowHide = async (item, it, isChecked) => {
        let ids = [];
        let subjectItem: any = '';
        for (let i = 0; i < subjectList.value.length; i++) {
          if (subjectList.value[i].id == it.subjectId) {
            subjectItem = subjectList.value[i];
            ids = eachTree([subjectList.value[i]]);
            break;
          }
        }

        // 判断逻辑控制项的显示/隐藏
        if (item.optionType == '52046-10') {
          // 如果逻辑设置是：选择->显示
          if (isChecked) {
            ids.forEach((j) => {
              updateSchema({
                field: j,
                ifShow: true,
              });
            });
          } else {
            ids.forEach((j) => {
              updateSchema({
                field: j,
                ifShow: false,
              });
              setFieldsValue({ [j]: null });
            });
          }
        } else {
          // 如果逻辑设置是：未选择->显示
          if (isChecked) {
            ids.forEach((j) => {
              updateSchema({
                field: j,
                ifShow: false,
              });
              setFieldsValue({ [j]: null });
            });
          } else {
            ids.forEach((j) => {
              updateSchema({
                field: j,
                ifShow: true,
              });
            });
          }
        }

        // 判断逻辑控制项是不是选择题
        if (subjectItem.type != '52020-10') {
          // 判断有没有逻辑设置
          if (subjectItem.loicSettingList.length > 0) {
            subjectItem.loicSettingList.forEach((it) => {
              it.loicSettingDetailList.forEach((i) => {
                newSetShowHide(it, i, false);
              });
            });
          }
        }
      };

      /**
       * @description: 将树形数据展开
       * @param {*} tree 树形数据
       * @param {*} name 顶级父级名称
       * @param {*} ml margin初始距离
       * @return {*} 返回一个展开的数组
       */
      const treeToListss = (tree: any, ml) => {
        const result: any = [...tree];
        for (let i = 0; i < result.length; i++) {
          // 设置margin距离
          result[i]['ml'] = result[i]['ml'] ? result[i]['ml'] : ml;
          if (!result[i].children) continue;
          result[i].children.forEach((it) => {
            it.ml = result[i].ml + 30;
            it.orderNo = `${result[i].orderNo}.${it.orderNo}`;
          });
          result.splice(i + 1, 0, ...result[i].children);
        }
        return result;
      };

      /**
       * @description: 遍历树形数据，返回id集合
       * @param {*} tree 树形数据
       * @return {*} id集合
       */
      const eachTree = (tree: any) => {
        const result: any = [...tree];
        const ids: any = [];
        for (let i = 0; i < result.length; i++) {
          ids.push(`form-${result[i].id}`);
          if (!result[i].children) continue;
          result.splice(i + 1, 0, ...result[i].children);
        }
        return ids;
      };

      /**
       * @description: 根据id查找树形数据，遍历数据，返回全部id
       * @param {*} id id
       * @return {*} id集合
       */
      const eachTreeById = (id: any) => {
        let itemArr: any = [];
        for (let i = 0; i < subjectList.value.length; i++) {
          if (subjectList.value[i].id == id) {
            itemArr.push(subjectList.value[i]);
          }
        }
        return eachTree(itemArr);
      };

      /**
       * @description: 根据id查找SubjectList，遍历数据，返回逻辑设置
       * @param {*} logicalSubjectId 问题id
       * @param {*} logicalId 逻辑id
       * @return {*} optionType 选择/未选择
       */
      const eachSubjectListById = (logicalSubjectId: any, logicalId: any) => {
        let optionType = '';
        subjectList.value.forEach((item) => {
          if (item.id == logicalSubjectId) {
            item.loicSettingList.forEach((it) => {
              if (it.id == logicalId) {
                optionType = it.optionType;
              }
            });
          }
        });
        return optionType;
      };

      onMounted(() => {
        getSchemas();
      });

      watch(
        () => props.isSave,
        async () => {
          try {
            const formData = await validateFields();
            emit('save', formData, props.categoryIndex);
          } catch (error: any) {
            console.log(error, 'error');
            if (error.errorFields && error.errorFields.length > 0) {
              scrollToField(error.errorFields[0].name);
            }
          }
        },
      );

      return {
        registerForm,
        handleRadiochange,
        handleCheckboxChange,
      };
    },
  });
</script>

<style lang="less">
  .survey-input-w {
    width: 80%;
  }

  .approval-form {
    .text-secondary {
      display: block;
      margin-left: 20px;
    }
  }
</style>
