<!--
 * @Author: 江雪松 576053154@qq.com
 * @Date: 2022-07-29 13:29:17
 * @LastEditors: 江雪松 576053154@qq.com
 * @LastEditTime: 2022-08-04 09:42:31
 * @FilePath: /rural-revitalization/src/views/demo/survey-demo/module/LogicSettingDrawer.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <BasicDrawer
    v-bind="$attrs"
    @close="close"
    @register="register"
    :isDetail="true"
    title="逻辑设置"
    @visible-change="visibleChange"
    :loading="loading"
    loadingTip="初始化数据中，请耐心等耐..."
  >
    <div class="LogicSettingDrawer">
      <div>
        <div class="header-box">
          <a-select
            v-model:value="allselectValue"
            style="width: 300px"
            class="!mr-2"
            @change="handleSelectQuestion(allselectValue)"
          >
            <a-select-option v-for="item in allselectOption" :key="item.id" :value="item.value"
              ><div class="options-box"
                ><span :innerHTML="item.label"></span>
                <span class="icon-box" v-if="getLogicTotal(item.value)"
                  ><Icon
                    icon="ant-design:branches-outlined"
                    color="#707070"
                    size="16px"
                    class="mx-1 icon"
                  />
                  <span class="total">{{ getLogicTotal(item.value) }}</span></span
                ></div
              ></a-select-option
            >
          </a-select>
          <a-button
            preIcon="ant-design:plus-circle-outlined"
            class="mb-2 mr-2 addLogicBtn"
            @click="handleAdd"
          >
            添加逻辑
          </a-button>
          <a-button preIcon="line-md:uploading-loop" class="mb-2 addLogicBtn" @click="handleSave">
            {{ saveBtnLoading ? '保存中...' : '保存逻辑' }}
          </a-button>
        </div>
      </div>
      <ul
        v-if="
          allselectValue == 0 ||
          (logicMap.get(allselectValue) && logicMap.get(allselectValue).length)
        "
      >
        <li
          class="logic-card-item"
          :class="{ isActived: item.isActived, isActivedError: item.isHuChi }"
          v-for="(item, index) in getLogicMap"
          @click="handleClick(item)"
          :key="index"
        >
          <div>
            <span class="mr-2 condition-text">{{ item.type == 'input' ? '设置' : '如果' }}</span>
            <a-select
              v-model:value="item.selectQuestionValue"
              style="width: 200px"
              disabled
              :options="allselectOption"
              class="!mr-2"
              @change="handleSelectQuestion(item)"
            />
            <span v-if="item.type == '52020-10'" class="mr-2">答案结果</span>
            <a-select
              v-model:value="item[item.type == '52020-10' ? 'judgeMethod' : 'selectLogicValue']"
              style="width: 120px"
              :options="item.type != '52020-10' ? options1 : options2"
              placeholder="请选择"
              @change="handleSelectLogicValue(item)"
              class="!mr-2"
            />
            <a-select
              v-if="item.type != 'input' && !item.hideSelectValue"
              v-model:value="item.selectValue"
              style="width: 200px"
              placeholder="请选择"
              @change="handleChange(item)"
            >
              <a-select-option
                :value="op.code"
                v-for="op in getSelectOptions(item.selectQuestionValue)"
                :key="op.id"
                ><p :innerHTML="op.optionValue"></p
              ></a-select-option>
            </a-select>
          </div>
          <div v-if="item.isHuChi" class="logic-same">逻辑条件与其他条件相同，请重新设置</div>
          <a-divider v-if="item.type != 'input'" class="!my-3" dashed />
          <div v-if="item.type != '52020-10'">
            <span class="mr-2 condition-text">则</span>
            <a-select
              v-model:value="item.showOptionValue"
              class="!mr-2"
              style="width: 80px"
              :options="showOption"
            />
            <a-select
              v-model:value="item.reflectChildrenValue"
              class="!mr-2"
              style="width: 200px"
              :options="item.relevanceStem"
              @change="(e, options) => handlereflectChildrenValue(e, options, item)"
            />
            <span>，否则不显示</span>
            <!-- <Icon
            icon="ant-design:plus-circle-outlined"
            color="#707070"
            size="16px"
            class="mx-1 mid-move"
          /> -->
          </div>
          <div v-else>
            <span class="mr-2 condition-text"
              ><Icon
                icon="ant-design:plus-circle-outlined"
                color="#707070"
                size="16px"
                class="mx-1 mid-move"
                @click="handleAddInputLogic(item)"
            /></span>

            <a-select
              v-model:value="item.selectLogicValue"
              style="width: 200px"
              placeholder="请选择"
              @change="handleSelectLogicValue(item)"
              class="!mr-2"
            >
              <a-select-option :value="op.id" v-for="op in getInputOptions(item)" :key="op.id"
                ><p :innerHTML="op.label"></p
              ></a-select-option>
            </a-select>
            <spa class="mr-2">答案结果</spa>
            <a-select
              v-model:value="item.calcMethod"
              style="width: 60px"
              :options="options3"
              placeholder="请选择"
              @change="handleSelectLogicValue(item)"
              class="!mr-2"
            />

            <div v-for="(logic, i) in item.loicSettingDetailList" :key="i" class="mt-2">
              <span class="mr-2 condition-text"
                ><Icon
                  icon="ph:minus-circle"
                  color="#707070"
                  size="16px"
                  class="mx-1 mid-move"
                  @click="handleDeleteInputLogic(item, i)"
              /></span>

              <a-select
                v-model:value="logic.selectLogicValue"
                style="width: 200px"
                placeholder="请选择"
                @change="handleSelectLogicValue(logic)"
                class="!mr-2"
              >
                <a-select-option :value="op.id" v-for="op in getInputOptions(item)" :key="op.id"
                  ><p :innerHTML="op.label"></p
                ></a-select-option>
              </a-select>
              <spa class="mr-2">答案结果</spa>
              <a-select
                v-model:value="logic.calcMethod"
                style="width: 60px"
                :options="options3"
                placeholder="请选择"
                @change="handleSelectLogicValue(item)"
                class="!mr-2"
              />
            </div>
          </div>
          <Icon
            v-if="allselectValue == item.relevanceValue || !item.relevanceValue"
            class="cursor-pointer logic-delete"
            @click.stop="handleDelete(item)"
            icon="ant-design:minus-circle-filled"
            color="#ff6d56"
          />

          <div
            v-if="item.relevanceValue && allselectValue != item.relevanceValue"
            class="light"
          ></div>
        </li>
      </ul>

      <div v-else class="empty-img-box">
        <div>
          <img class="" :src="EmptyImg" alt="" />
          <p
            >您还未设置任何逻辑
            <span class="cursor-pointer" @click="handleAdd"><span>添加逻辑</span></span></p
          >
        </div>
      </div>
    </div>
  </BasicDrawer>
</template>

<script lang="ts">
  import { defineComponent, ref, inject, computed } from 'vue';
  import { Select, Divider } from 'ant-design-vue';
  import { Icon } from '/@/components/Icon';
  import { BasicDrawer, useDrawerInner } from '/@/components/Drawer';
  import { logicOption, showOption } from '../config/index';
  import {
    opTemplateSubjectTreeCombox,
    opLoicSettingBatchSave,
    opLoicSettingListAll,
  } from '/@/api/doOp/index';
  import { useMessage } from '/@/hooks/web/useMessage';
  import EmptyImg from '/@/assets/images/logic-empty.png';
  import { cloneDeep, mergeWith } from 'lodash';
  import { createID } from '../utils';
  import { options1, options2, options3 } from '../config/LogicSettingDrawer';
  import { requestAllLogic } from '../config/logic';
  import { useRoute } from 'vue-router';
  export default defineComponent({
    components: {
      Icon,
      BasicDrawer,
      ASelect: Select,
      ASelectOption: Select.Option,
      ADivider: Divider,
    },
    emits: ['update-logic'],
    setup(_, { emit }) {
      const route = useRoute();
      const { createMessage, createConfirm } = useMessage();
      const logicArr: any = inject('logicArr');
      const reflectOption: any = ref([]);
      const loading = ref(false);
      // 记录所有题目的逻辑关系
      const logicMap = ref(new Map());
      // 记录所有题目映射父子集逻辑关系
      // const logicMapWithPC = ref(new Map());
      const getLogicTotal = (value) => {
        if (value === 0) {
          return Array.from(logicMap.value.values()).flat().length || 0;
        }
        return logicMap.value.get(value)?.length || 0;
      };
      const getLogicMap = computed(() => {
        if (allselectValue.value == 0) {
          return Array.from(logicMap.value.values()).flat() || [];
        }
        return logicMap.value.get(allselectValue.value) || [];
      });

      const getSelectOptions = (value) => {
        let data = allselectOption.value.filter((v) => v.value === value)[0];

        return data.subjectOptionsList;
      };

      const getRelevanceStem = (value) => {
        let base = cloneDeep(allselectOption.value),
          flag = true;
        base.splice(0, 1);
        base.map((v) => {
          if (flag) {
            v.disabled = true;
          }

          if (v.value == value) {
            flag = false;
          }
        });

        return base;
      };

      const getInputOptions = ({ id }) => {
        const getChildren = (data, arr = []) => {
          if (data.children?.length) {
            data.children.forEach((child) => {
              arr.push(child);
              getChildren(child, arr);
            });
          }
          return arr;
        };

        let children: any = [];

        allselectOption.value.forEach((v) => {
          if (v.id == id && v.allChildrens) {
            children = v.allChildrens;
          }

          if (!children.length && v.allChildrens?.length) {
            v.allChildrens.forEach((w) => {
              if (w.id == id) {
                children = getChildren(w, []);
              }
            });
          }
        });
        return children;
      };

      // 所有选项
      const allselectOption: any = ref([]);
      const allselectValue: any = ref(null);
      const templateId = ref('');
      const categoryId = ref('');
      const [register] = useDrawerInner(async (params) => {
        allselectOption.value = [];
        templateId.value = params.templateId;
        categoryId.value = params.categoryId;
        try {
          loading.value = true;
          const data = await opTemplateSubjectTreeCombox({
            templateId: params.templateId,
            categoryId: params.categoryId,
          });

          const { subjectList } = data[0];

          subjectList.map((item, i) => {
            if (params.isModule) {
              allselectValue.value = 0;
            }
            if (params.index === i) {
              allselectValue.value = `${item.id},${item.type}`;
            }
            item.value = `${item.id},${item.type}`;
            item.label = `${i + 1} ${item.stem}`;
            allselectOption.value.push(item);
            if (item.children?.length) {
              item.allChildrens = fn(item, i + 1, []);
            }
          });

          allselectOption.value.unshift({ label: '全部逻辑', value: 0 });

          function fn(data, index, arr: any = []) {
            data.children.map((item, i) => {
              item.value = `${item.id},${item.type}`;
              item.label = `${index}.${i + 1} ${item.stem}`;
              item.parentIds = [];
              if (data.parentIds?.length) {
                item.parentIds.push(...data.parentIds);
              }
              item.parentIds.push(data.id);
              arr.push(item);
              allselectOption.value.push(item);
              item?.children?.length && fn(item, `${index}.${i + 1}`, arr);
            });
            return arr;
          }

          setTimeout(() => (loading.value = false), 500);
        } catch (error) {
          console.log(error);
          setTimeout(() => (loading.value = false), 500);
          createMessage.error('获取逻辑数据失败！');
        }

        requestLogicAndAnalysis();
      });

      // 请求并解析后端返回的逻辑数据
      const requestLogicAndAnalysis = async () => {
        let params = {
          templateId: templateId.value,
          categoryId: categoryId.value,
        };
        try {
          logicMap.value.clear();
          let data = await opLoicSettingListAll(params);

          if (!data.length) return;

          data.forEach((item) => {
            const key = `${item.subjectId},${item.type}`;
            // 处理映射的子逻辑 isReflect
            const { loicSettingDetailList, type, judgeMethod } = item;
            const option = createMapValueItem({
              type: item.type,
              id: item.subjectId,
              allselectValue: key,
            });

            // 单选多选
            if (loicSettingDetailList?.length && type !== '52020-10') {
              option.selectValue = item.compareValue;
              option.hideSelectValue = false;
              option.selectLogicValue = item.optionType;
              let { handleMethod, subjectId, type } = loicSettingDetailList[0];
              mergeWith(option, {
                showOptionValue: handleMethod,
                reflectChildrenValue: `${subjectId},${type}`,
                childMapValue: `${subjectId},${type}`,
              });
              // 创建子逻辑
              let cloneOptin = cloneDeep(option);
              const childMapId = createID('logic-child');
              mergeWith(cloneOptin, { mapId: childMapId });
              /**
               * 添加映射主子逻辑的辅助属性
               */
              // 主逻辑
              mergeWith(option, {
                relevanceChildMpaId: childMapId,
                relevanceChildValue: `${subjectId},${type}`,
                relevanceChildSubjectId: subjectId,
              });
              add(key, option);
              // 子逻辑
              mergeWith(cloneOptin, { relevanceMpaId: option.mapId, relevanceValue: key });
              add(`${subjectId},${type}`, cloneOptin);
            } else if (loicSettingDetailList.length && type === '52020-10') {
              option.loicSettingDetailList = [];
              loicSettingDetailList.forEach((logic, i) => {
                const { subjectId, calcMethod } = logic;

                if (i === 0) {
                  option.selectLogicValue = subjectId;
                  option.judgeMethod = judgeMethod;
                  option.calcMethod = calcMethod;
                } else {
                  option.loicSettingDetailList.push({ selectLogicValue: subjectId, calcMethod });
                }
              });
              add(key, option);
            } else {
              add(key, option);
            }

            function add(key, option) {
              let hasKey = logicMap.value.has(key);

              if (hasKey) {
                let value = logicMap.value.get(key);
                value.push(option);
              } else {
                logicMap.value.set(key, [option]);
              }
            }
          });
        } catch (error) {
          console.log(error);
          createMessage.error('获取逻辑数据失败！');
        }
      };

      const clearActived = () => {
        Array.from(logicMap.value.values()).map((item) => {
          item.map((v) => (v.isActived = false));
        });
      };

      const createMapValueItem = ({ type, id, allselectValue }) => {
        return {
          selectQuestionValue: allselectValue,
          type,
          id,
          selectLogicValue: '',
          selectOptions: '',
          selectValue: '',
          reflectChildrenValue: '',
          hideSelectValue: true,
          isActived: true,
          isHuChi: false,
          showOptionValue: '',
          calcMethod: '',
          judgeMethod: '',
          mapId: createID('logic'),
          relevanceStem: getRelevanceStem(allselectValue),
          loicSettingDetailList: [],
        };
      };

      // 添加逻辑
      const handleAdd = () => {
        // 清除选中状态
        clearActived();
        const hasKey = logicMap.value.has(allselectValue.value);
        const [id, type] = (allselectValue.value as string).split(',');

        const option = createMapValueItem({ type, id, allselectValue: allselectValue.value });
        if (!hasKey) {
          Object.assign(option, { index: 0 });
          logicMap.value.set(allselectValue.value, [option]);
        } else {
          let value = logicMap.value.get(allselectValue.value);
          Object.assign(option, { index: value.length });
          value.push(option);
        }
      };

      const handleClick = (item) => {
        clearActived();

        item.isActived = true;
      };

      // 删除逻辑
      const handleDelete = (item) => {
        createConfirm({
          iconType: 'warning',
          title: '提示',
          content: '此操作会删除该逻辑, 是否继续?',
          onOk() {
            const { selectQuestionValue, mapId, relevanceChildValue, relevanceChildMpaId } = item;
            // 检查是否有逻辑映射
            if (relevanceChildValue && relevanceChildMpaId) {
              let data = logicMap.value.get(relevanceChildValue);
              let index = data.findIndex((v) => v.mapId === relevanceChildMpaId);

              if (index !== -1) {
                // 删除对应的逻辑映射
                data.splice(index, 1);

                if (data.length === 0) {
                  logicMap.value.delete(relevanceChildValue);
                }
              }
            }
            let value = logicMap.value.get(selectQuestionValue);
            let index = value.findIndex((v) => v.mapId === mapId);
            value.splice(index, 1);

            if (value.length === 0) {
              logicMap.value.delete(selectQuestionValue);
            }
          },
        });
      };

      // 选择题目
      const handleSelectQuestion = (value) => {
        allselectValue.value = value;
        clearActived();
      };

      const handleSelectLogicValue = (item) => {
        if (item.selectLogicValue == '52046-10' || item.selectLogicValue == '52046-20') {
          item.hideSelectValue = false;
        } else {
          item.hideSelectValue = true;
        }
        item.isHuChi = false;
        // 清除后一项
        item.selectValue = '';
      };
      // 选择操作 检查逻辑是否重复或冲突
      const handleChange = (item) => {
        const { selectQuestionValue, mapId, selectValue, selectLogicValue, reflectChildrenValue } =
          item;

        // 检查是否互斥
        let value = logicMap.value.get(selectQuestionValue);

        let data = value.filter(
          (v) => mapId !== v.mapId && v.selectLogicValue === selectLogicValue,
        );

        if (data.length) {
          item.isHuChi = data.some(
            (w) => w.selectValue === selectValue && w.reflectChildrenValue === reflectChildrenValue,
          );
        }
      };

      const handlereflectChildrenValue = (e, { id: relevanceChildSubjectId }, item) => {
        const { selectQuestionValue, reflectChildrenValue, childMapValue } = item;
        handleChange(item);
        const add = () => {
          let value = logicMap.value.get(reflectChildrenValue);
          let cloneItem = cloneDeep(item);
          cloneItem.mapId = createID('logic');
          // 建立映射关系
          item.relevanceChildValue = e;
          item.relevanceChildMpaId = cloneItem.mapId;
          item.relevanceChildSubjectId = relevanceChildSubjectId;
          // 建立被映射关系
          Object.assign(cloneItem, {
            relevanceValue: selectQuestionValue,
            relevanceMpaId: item.mapId,
          });

          if (value) {
            value.push(cloneItem);
          } else {
            logicMap.value.set(reflectChildrenValue, [cloneItem]);
          }

          item.childMapValue = e;
        };
        // 未建立逻辑映射，直接添加
        if (!item.childMapValue) {
          add();
          return;
        }
        // 清除上一题的逻辑映射  再添加
        if (childMapValue !== undefined && childMapValue !== e) {
          let value = logicMap.value.get(childMapValue);
          const { selectQuestionValue, mapId } = item;
          let index = value.findIndex(
            (v) => v.relevanceValue === selectQuestionValue && v.relevanceMpaId === mapId,
          );
          value.splice(index, 1);
          item.childMapValue = undefined;

          add();
        }
      };
      // 关闭清空
      const close = () => {
        logicMap.value.clear();
        allselectValue.value = null;
      };

      const visibleChange = (status) => {
        if (!status) {
          requestAllLogic({ templateId: route.query.templateId });
        }
      };

      // 添加逻辑按钮状态
      const addLogicBtnStatus = computed(() => {
        if (
          allselectValue.value == null ||
          allselectValue.value == 0 ||
          allselectValue.value?.indexOf('52020-10') !== -1
        ) {
          return true;
        }
        return false;
      });

      // 创建填空题逻辑
      const createInputLogic = () => {
        return {
          logicalId: '',
          subjectId: '',
          handleMethod: '',
          calcMethod: '',
          selectLogicValue: '',
        };
      };

      // 增加填空题逻辑
      const handleAddInputLogic = (item) => {
        item.loicSettingDetailList.push(createInputLogic());
      };
      // 删除填空题逻辑
      const handleDeleteInputLogic = (item, i) => {
        item.loicSettingDetailList.splice(i, 1);
      };

      // 保存逻辑
      const saveBtnLoading = ref(false);
      const handleSave = () => {
        let params = { categoryId: categoryId.value, templateId: templateId.value };

        let keys = Array.from(logicMap.value.keys());

        let logicArr: any = [];
        keys.forEach((key) => {
          const values = logicMap.value.get(key);
          values.forEach((val) => {
            /**
             * 获取映射子题目
             * @reflectChildrenValue 子题key
             * @relevanceChildMpaId 子题逻辑唯一id
             */
            const {
              reflectChildrenValue,
              relevanceChildMpaId,
              selectValue,
              id,
              relevanceChildSubjectId,
              selectLogicValue,
              relevanceValue,
              calcMethod,
              loicSettingDetailList,
              judgeMethod,
            } = val;
            if (!selectLogicValue || relevanceValue) return;
            let logicSetting: any = { subjectId: Number(id), loicSettingDetailList: [] };
            if (selectLogicValue == '52046-10' || selectLogicValue == '52046-20') {
              // 文本题传输入值，选择题传选项code）(对应：是否显示
              logicSetting.compareValue = selectValue;
              //结果校验
              logicSetting.logicType = '52021-10';
              // 选项类型
              logicSetting.optionType = selectLogicValue;
              if (reflectChildrenValue && relevanceChildMpaId) {
                logicSetting.loicSettingDetailList.push({
                  logicalId: id,
                  subjectId: relevanceChildSubjectId,
                  handleMethod: '52023-10',
                });
              }
            } else {
              //结果校验
              logicSetting.judgeMethod = judgeMethod;
              logicSetting.logicType = '52021-20';
              logicSetting.loicSettingDetailList.push({
                logicalId: Number(id),
                subjectId: selectLogicValue,
                calcMethod,
              });

              if (loicSettingDetailList?.length) {
                const logics = loicSettingDetailList.map((v) => {
                  return {
                    logicalId: Number(id),
                    subjectId: v.selectLogicValue,
                    calcMethod: v.calcMethod,
                  };
                });

                logicSetting.loicSettingDetailList.push(...logics);
              }
            }

            logicArr.push(logicSetting);
          });
        });
        Object.assign(params, { loicSettingList: JSON.stringify(logicArr) });

        saveBtnLoading.value = true;
        try {
          opLoicSettingBatchSave(params);
          createMessage.success('逻辑保存成功');
          saveBtnLoading.value = false;
          // requestLogicAndAnalysis();
        } catch (error) {
          createMessage.error(error as string);
          saveBtnLoading.value = false;
        }
      };

      return {
        logicArr,
        logicOption,
        showOption,
        reflectOption,
        allselectValue,
        allselectOption,
        EmptyImg,
        logicMap,
        options1,
        options2,
        getLogicMap,
        saveBtnLoading,
        addLogicBtnStatus,
        loading,
        options3,
        register,
        handleAdd,
        handleSave,
        handleDelete,
        handleSelectQuestion,
        handleChange,
        getSelectOptions,
        handleClick,
        handleSelectLogicValue,
        getLogicTotal,
        close,
        handlereflectChildrenValue,
        visibleChange,
        getInputOptions,
        handleAddInputLogic,
        handleDeleteInputLogic,
      };
    },
  });
</script>

<style lang="less" scoped>
  @import '../css/LogicSettingDrawer.less';
</style>

<style lang="less">
  .scrollbar__view {
    height: 100%;

    .LogicSettingDrawer {
      width: 80%;
      height: 100%;
      margin: 0 auto;
    }
  }
</style>
