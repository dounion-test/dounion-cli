<!--
 * @Author: 江雪松 576053154@qq.com
 * @Date: 2022-09-05 09:21:22
 * @LastEditors: 江雪松 576053154@qq.com
 * @LastEditTime: 2022-09-07 20:23:28
 * @FilePath: /RuralSurveyPc/src/views/doPc/survey/module/FormItem.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div>
    <BasicForm @register="registerForm" :showIndexColumn="true">
      <template #radioGroup="{ field, model, schema }">
        <a-radio-group v-model:value="model[field]" @change="(e) => handleRadiochange(e, schema)">
          <a-radio
            class="!flex !items-baseline"
            v-for="item in schema.componentProps.options"
            :value="item.id"
            :key="item.id"
          >
            <span v-html="item.optionValue"></span>
          </a-radio>
        </a-radio-group>
      </template>
      <template #checkboxGroup="{ field, model, schema }">
        <a-checkbox-group
          v-model:value="model[field]"
          @change="(e) => handleCheckboxChange(e, schema)"
        >
          <a-checkbox
            class="!flex !items-baseline !ml-0"
            v-for="item in schema.componentProps.options"
            :value="item.id"
            :key="item.id"
          >
            <span v-html="item.optionValue"></span>
          </a-checkbox>
        </a-checkbox-group>
      </template>
    </BasicForm>
  </div>
</template>

<script lang="ts">
  import { defineComponent, inject, ref, onMounted, watch } from 'vue';
  import { Radio, Checkbox } from 'ant-design-vue';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { treeToList } from '/@/utils/helper/treeHelper';

  export default defineComponent({
    components: {
      BasicForm,
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
        { validateFields, setFieldsValue, setProps, scrollToField, updateSchema, validate },
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
        subjectList.value = treeToList(categoryItem.subjectList, { children: 'children' });
        subjectList.value.forEach((item: any) => {
          switch (item.type) {
            case '52020-10':
              // 判断显示/隐藏
              let inputShow = true;
              if (item.loicSettingDetailList.length > 0) {
                item.loicSettingDetailList.forEach((it) => {
                  if (it.handleMethod == '52023-10') {
                    inputShow = false;
                  }
                });
              }
              // 创建formItem
              let inputObj = {
                field: `form-${item.id}`,
                component: 'Input',
                label: item.stem,
                required: item.isRequired ? true : false,
                colProps: {
                  span: 24,
                },
                componentProps: {
                  class: 'survey-input-w',
                },
                ifShow: inputShow,
                loicSettingList: item.loicSettingList,
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
              }
              break;
            case '52020-20':
              // 判断显示/隐藏
              let radioShow = true;
              if (item.loicSettingDetailList.length > 0) {
                item.loicSettingDetailList.forEach((it) => {
                  if (it.handleMethod == '52023-10') {
                    radioShow = false;
                  }
                });
              }
              // 创建formItem
              let radioObj = {
                field: `form-${item.id}`,
                component: 'RadioGroup',
                label: item.stem,
                required: item.isRequired ? true : false,
                colProps: {
                  span: 24,
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
                // 判断选中的项，有没有逻辑设置的项
                if (item.loicSettingList.length > 0) {
                  item.loicSettingList.forEach((it) => {
                    if (codeArr.indexOf(it.compareValue) != -1) {
                      it.loicSettingDetailList.forEach((i) => {
                        if (i.handleMethod == '52023-10') {
                          showFormIds = [...showFormIds, ...eachTreeById(i.subjectId)];
                        }
                      });
                    }
                  });
                }
              }
              break;
            case '52020-30':
              // 判断显示/隐藏
              let checkboxShow = true;
              if (item.loicSettingDetailList.length > 0) {
                item.loicSettingDetailList.forEach((it) => {
                  if (it.handleMethod == '52023-10') {
                    checkboxShow = false;
                  }
                });
              }
              // 创建formItem
              let checkboxObj = {
                field: `form-${item.id}`,
                component: 'CheckboxGroup',
                label: item.stem,
                required: item.isRequired ? true : false,
                colProps: {
                  span: 24,
                },
                componentProps: {
                  options: item.subjectOptionsList,
                },
                ifShow: checkboxShow,
                loicSettingList: item.loicSettingList,
                slot: 'checkboxGroup',
              };
              // 如果该项隐藏，则其子问题也隐藏
              if (!checkboxShow) {
                hideFormIds = [...hideFormIds, ...eachTree([item])];
              }
              schemas.push(checkboxObj);
              // 数据回填
              if (item.answerDetailList.length > 0) {
                let selectValue = item.answerDetailList[0].selectValue.split(',');
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
                // 判断选中的项，有没有逻辑设置的项
                if (item.loicSettingList.length > 0) {
                  item.loicSettingList.forEach((it) => {
                    if (codeArr.indexOf(it.compareValue) != -1) {
                      it.loicSettingDetailList.forEach((i) => {
                        if (i.handleMethod == '52023-10') {
                          // showFormIds.push(`form-${i.subjectId}`);
                          showFormIds = [...showFormIds, ...eachTreeById(i.subjectId)];
                        }
                      });
                    }
                  });
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
                if (it.handleMethod == '52023-10') {
                  setShowHide(it.subjectId, true);
                }
              });
            } else {
              item.loicSettingDetailList.forEach((it) => {
                // 设置显示/隐藏
                if (it.handleMethod == '52023-10') {
                  setShowHide(it.subjectId, false);
                }
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
                if (it.handleMethod == '52023-10') {
                  setShowHide(it.subjectId, true);
                }
              });
              break;
            } else {
              list[i].loicSettingDetailList.forEach((it) => {
                // 设置显示/隐藏
                if (it.handleMethod == '52023-10') {
                  setShowHide(it.subjectId, false);
                }
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
        // 判断该项有没有逻辑设置控制其他问题的显示/隐藏
        let formData = await validate([`form-${id}`]);
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
            if (error.errorFields) {
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
</style>
