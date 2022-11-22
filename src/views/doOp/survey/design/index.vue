<template>
  <a-spin class="logic-spin" tip="正在为您初始化数据，请耐心等候..." :spinning="spinning">
    <PageWrapper fixedHeight contentFullHeight>
      <a-row id="sortableBox" class="h-full" :gutter="18">
        <a-col :span="4" class="h-100">
          <LeftWrap @clear-actived="clearActived" @addfrom="handleAddFrom" />
        </a-col>
        <a-col :span="16" class="h-full" id="edit-content">
          <MidWrap
            :midArr="midArr"
            ref="midWrapRef"
            :isSave="isSave"
            :key="key"
            @item-click="handleItemClick"
            @clear-actived="clearActived"
            @delete-mid-arr-item="deleteMidArrItem"
            @set-logic="setLogic"
          />
        </a-col>
        <a-col :span="4" class="h-full" @click.stop="null">
          <RightWrap
            @clear-actived="clearActived"
            :midItem="currentModule"
            :midIndex="midIndex"
            :moduleIndex="moduleIndex"
          >
            <template #control>
              <a-button
                class="mr-3"
                :disabled="saveLoading"
                preIcon="ant-design:eye-outlined"
                @click="handleOpenDrawer"
                >预览</a-button
              >
              <a-button class="mr-3" :loading="saveLoading" @click="handleSave">{{
                saveText
              }}</a-button>
              <!-- <a-button @click="handleOpenDrawer">提交</a-button> -->
            </template>
          </RightWrap>
        </a-col>
      </a-row>
      <ViewDrawer @register="register" />

      <LogicSettingDrawer @register="registerDrawer" />
    </PageWrapper>
  </a-spin>
</template>

<script lang="ts">
  import {
    defineComponent,
    ref,
    onMounted,
    nextTick,
    provide,
    reactive,
    toRefs,
    onUnmounted,
    watch,
  } from 'vue';
  import LeftWrap from './module/LeftWrap.vue';
  import MidWrap from './module/MidWrap.vue';
  import RightWrap from './module/RightWrap.vue';
  import ViewDrawer from './module/ViewDrawer.vue';
  import LogicSettingDrawer from './module/LogicSettingDrawer.vue';
  import { PageWrapper } from '/@/components/Page';
  import { Row, Col, Spin } from 'ant-design-vue';
  import { ALL_TYPES } from './config';
  import { useModal } from '/@/components/Modal';
  import Sortable from 'sortablejs';
  import { cloneDeep, mergeWith } from 'lodash';
  import { useDrawer } from '/@/components/Drawer';
  import {
    ComponentsMap,
    comTypeMap,
    comTypeMapOpposite,
    booleanKeysSet,
    createInput,
    createRadioOptionsItem as createOptionsItem,
  } from './utils';
  import { ComponentType, ModuleType } from './enums';
  import { useRoute } from 'vue-router';
  import {
    opTemplateViewDesign,
    opTemplateSaveDesign,
    sysColumnConfigFullList,
  } from '/@/api/doOp/index';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { requestAllLogic } from './config/logic';
  import { getHeaderArr } from './config/index';

  export default defineComponent({
    name: 'OpSurveyDesign',
    components: {
      MidWrap,
      LeftWrap,
      RightWrap,
      ViewDrawer,
      PageWrapper,
      LogicSettingDrawer,
      ARow: Row,
      ACol: Col,
      ASpin: Spin,
    },
    setup() {
      const { createMessage, createConfirm } = useMessage();
      // 获取模板ID
      const route = useRoute();
      const templateId = ref(route.query.templateId);
      const id = ref(route.query.id);
      const spinning = ref(false);
      // const canDrag = ref(true);
      onMounted(() => {
        getDesign();
      });
      // 表头数据
      const headerList = ref<any[]>(getHeaderArr());
      const midArr: any = ref([]);
      const logicArr = ref<any[]>([]);
      const addID = ref(0);
      const isSave = ref(false);
      const midWrapRef = ref<InstanceType<typeof MidWrap>>();
      const sortableobj = ref();
      const currentModule = ref({});

      const treeData = ref<TreeItem[]>([]);
      // 底部默认填空题
      const Input = createInput();
      mergeWith(Input, { code: 'surveyFillPerson', stem: '填报人' });
      const fillPersonSubject = reactive(Input);
      const state = reactive({
        midItem: {},
        midIndex: 0,
        moduleIndex: -1,
      });

      const getDesign = async () => {
        spinning.value = true;
        try {
          const data = await opTemplateViewDesign({
            templateId: templateId.value,
          });

          // 获取表头设计
          const { surveyMappingList } = data;
          if (surveyMappingList.length) {
            headerList.value = surveyMappingList;
          }

          const transData = await initModule(data);

          // 获取逻辑设置
          requestAllLogic({ templateId: templateId.value }, () => {
            midArr.value = transData || [];
          });
          setTimeout(() => (spinning.value = false), 500);
        } catch {
          setTimeout(() => (spinning.value = false), 500);
          createMessage.error('获取数据失败!');
        }
      };

      // 注册拖拽
      const rowDrop = () => {
        const sortableQuestion = document.querySelector(`#sortableBox .ant-col .left .question`);
        const sortableComponent = document.querySelector(`#sortableBox .ant-col .left .component`);
        const sortableStem = document.querySelector(
          `#sortableBox .ant-col .left .ant-tree-list-holder-inner`,
        );

        const sortableMid = document.querySelector(`#sortableBox .ant-col .middle`);
        Sortable.create(sortableQuestion as HTMLElement, {
          animation: 100,
          sort: false,
          forceFallback: true,
          group: {
            name: 'question',
            pull: 'clone',
            put: false,
          },
        });
        Sortable.create(sortableStem as HTMLElement, {
          animation: 100,
          sort: false,
          forceFallback: true,
          filter: '.parent',
          group: {
            name: 'stem',
            pull: 'clone',
            put: false,
          },
        });
        Sortable.create(sortableComponent as HTMLElement, {
          animation: 100,
          sort: false,
          forceFallback: true,
          group: {
            name: 'component',
            pull: 'clone',
            put: false,
          },
        });
        sortableobj.value = Sortable.create(sortableMid as HTMLElement, {
          // 动画时间
          animation: 100,
          scroll: true,
          // 忽略 HTML5拖拽行为，强制回调进行
          forceFallback: true,
          // 拖拽时触发滚动条自动滚动的距离
          scrollSensitivity: 100,
          // 指定元素触发拖拽
          handle: '.mid-move',
          // 标识
          dataIdAttr: 'data-id',
          group: {
            // name一致的列表可相互拖拽
            name: 'component',
            // 是否允许拖出
            pull: false,
            // 是否允许拖入
            put: true,
          },
          // 元素从一个列表拖拽到另一个列表
          onAdd(evt) {
            resetDragElement(evt);
            if (
              evt.from.className == 'question' ||
              evt.from.className == 'ant-tree-list-holder-inner'
            ) {
              // evt.item.remove();
              return false;
            }
            if (evt.pullMode == 'clone') {
              addID.value++;
              // 给克隆后的dom添加监听点击事件
              // evt.clone.addEventListener('click', function (e) {
              //   addID.value++;
              //   let key = evt.item.attributes['from-key'].value;
              //   handlerAddCommonFun(key);
              // });
              let key = evt.item.attributes['from-key'].value;
              let component = ComponentsMap.get(key);

              midArr.value.splice(evt.newIndex as number, 0, component());

              // evt.item.remove();
            }
          },
          onUpdate({ newIndex, oldIndex }) {
            const data = midArr.value[newIndex as number];
            midArr.value.splice(newIndex as number, 1, midArr.value[oldIndex as number]);
            midArr.value.splice(oldIndex as number, 1, data);
          },
        });
      };

      const resetDragElement = (evt) => {
        const { from, clone, item } = evt;

        from.insertBefore(item, clone);
        from.removeChild(clone);
      };

      // 点击左侧列表按钮
      const handleAddFrom = ({ type }) => {
        addID.value++;
        handlerAddCommonFun(type);
      };

      const handlerAddCommonFun = (key) => {
        let component = ComponentsMap.get(key);

        midArr.value.push(component());
        midWrapRef.value?.scrollBottom();
      };

      // 点击中间列表
      const handleItemClick = (item, midIndex, moduleIndex) => {
        state.midItem = item;
        state.midIndex = midIndex;
        state.moduleIndex = moduleIndex;
      };

      /**
       * 清除选中状态
       */
      const clearActived = (children?) => {
        children = children || midArr.value;

        children?.forEach((module) => {
          if (ALL_TYPES.some((type) => type === module.type)) {
            module.isActived = false;

            module.children?.length && clearActived(module.children);

            if (module.type === ComponentType.Checkbox || module.type === ComponentType.Radio) {
              module.options.map((v) => (v.hasOptionsItemSetting = false));
            }
          }
        });

        currentModule.value = {};
      };

      /**
       * 给应用添加点击事件，清除选中状态
       */
      const handlerAppClick = () => {
        document.getElementById('app')?.addEventListener('click', (e) => {
          e.stopPropagation();

          clearActived();
        });
      };

      /**
       * 删除当前选中
       * @id 当前选中id
       */
      const deleteMidArrItem = (id, children?) => {
        children = children || midArr.value;
        let status = false;
        deleteFn(id, children, null);
        function deleteFn(id, module, parent) {
          for (let i = 0; i < module.length; i++) {
            if (status) break;

            if (module[i].id === id) {
              module.splice(i, 1);
              deleteLogicArr(id, parent);
              status = true;
              break;
            }

            if (module[i].children?.length) {
              deleteFn(id, module[i].children, module[i]);
            }
          }
        }
      };
      // 删除表单时删除对应逻辑
      const deleteLogicArr = (id, parent) => {
        if (!parent.logicNum) return false;
        if (parent.type != 'input') {
          if (parent.children.length == 0) {
            parent.logicNum = 0;
          }
          logicArr.value.forEach((it) => {
            if (it.recordChildrenValue == id) {
              it.recordChildrenValue = undefined;
            }
          });
        }
        if (parent.children.length == 0 && parent.type == 'input') {
          parent.logicNum = 0;
          logicArr.value = logicArr.value.filter((item) => {
            return item.selectQuestionValue != parent.id;
          });
        }
      };

      /**
       * 转换数据字段key，符合后端要求
       */
      const transMidArrWidthSave = (data?) => {
        let copyMidArr = data || cloneDeep(midArr.value);

        copyMidArr.map((item, index) => {
          // 转换组件类型type
          item.type = comTypeMap.get(item.type);

          // isSave == false，清除id
          if (!item.isSave) {
            delete item.id;
          }

          // 转换boolean类型key
          Object.keys(item).map((key) => {
            let hasKey = booleanKeysSet.has(key);
            if (hasKey) {
              item[key] = item[key] ? 1 : 0;
            }
          });

          // 增加题目序号
          item.orderNo = index + 1 + '';

          // 转换容器字段
          if (item.type === '52016-10') {
            item.subjectList = item.children;
            delete item.children;

            item.subjectList.length && transMidArrWidthSave(item.subjectList);

            // 处理模块名称
            item.categoryName = item.label;
          }

          // 处理题干说明
          if (item.hasOwnProperty('hasStem')) {
            !item.hasStem && (item.remark = '');
          }

          // 转换单选、多选
          if (item.hasOwnProperty('options')) {
            item.subjectOptionsList = item.options;
            delete item.options;

            // 处理选项
            item.subjectOptionsList.map((oItem, i) => {
              // isSave == false，清除id
              if (!oItem.isSave) {
                delete oItem.id;
              }

              // 转换label字段
              oItem.optionValue = oItem.label;
              // 是否有输入框
              oItem.isAddBlank = oItem.hasInput ? 1 : 0;
              // 加排序
              oItem.orderNo = i + 1 + '';
              // 选项说明
              oItem.remark = oItem.hasOptionsItemStem ? oItem.remark : '';
            });
          }

          if (typeof item.parentId === 'string') {
            delete item.parentId;
          }

          item?.children?.length && transMidArrWidthSave(item.children);
        });

        return copyMidArr;
      };

      /**
       * 转换数据字段key，符合前端要求
       */
      const initModule = (data) => {
        midArr.value.splice(0, midArr.value.length);
        const allData: any = [];
        const { categoryList } = data;
        if (!categoryList?.length) return;
        ++key.value;
        categoryList.forEach((list) => {
          // 获取模块组件
          let { component, type } = getComponent(list);

          // 转换type
          list.type = type;
          // 添加标识，区分当前数据是否已保存
          list.isSave = true;
          // 处理模块
          if (type === ModuleType.Module) {
            list.label = list.categoryName;
            list.children = list.subjectList;
            delete list.subjectList;

            list.children?.length && initComponents(list);
          }

          // 初始化组件
          mergeWith(component, list);
          allData.push(component);
        });
        return allData;
      };

      const initComponents = (list) => {
        list.children = list.children.map((com) => {
          // 处理必填字段
          com.isRequired = com.isRequired ? true : false;
          // 获取模块组件
          let { component, type } = getComponent(com);
          // 添加标识，区分当前数据是否已保存
          com.isSave = true;
          // 处理非填空
          if (type !== ComponentType.Input) {
            com.options = com.subjectOptionsList;
            delete com.subjectOptionsList;

            // 处理选项
            com.options = com.options.map((oItem) => {
              // 添加标识，区分当前数据是否已保存
              oItem.isSave = true;
              // 转换label字段
              oItem.label = oItem.optionValue;
              // 是否有输入框
              oItem.hasInput = oItem.isAddBlank ? true : false;
              // 是否开启选项说明
              oItem.hasOptionsItemStem = oItem.remark ? true : false;

              let optionsItem = createOptionsItem(oItem.id);
              mergeWith(optionsItem, oItem);
              return {
                ...optionsItem,
              };
            });

            delete component.options;
          } else {
            com.children?.length && initComponents(com);
          }

          // 处理题干说明
          com.hasStem = com.remark?.length ? true : false;

          // 转换type
          com.type = type;

          mergeWith(component, com);

          return {
            ...component,
          };
        });
      };

      const getComponent = (com) => {
        let type = comTypeMapOpposite.get(com.type);
        if (type === undefined) {
          createMessage.error(`初始化${type}失败！`);
          throw new Error(`初始化${type}失败！`);
        }
        return { component: ComponentsMap.get(type)(), type };
      };

      const [register, { openDrawer: openDrawer2 }] = useDrawer();
      const handleOpenDrawer = async () => {
        // 先调用保存接口
        await handleSave();
        openDrawer2(true, { open: true });
      };

      /**
       * 保存
       */
      const saveBtn = reactive({
        saveLoading: false,
        saveText: '保存',
      });
      const key = ref(0);
      // 改变保存按钮状态
      const setSaveBtnStatus = (status) => {
        saveBtn.saveLoading = status;
        saveBtn.saveText = status ? '保存中...' : '保存';
      };
      const handleSave = async () => {
        // 获取表单数据
        const categoryList = JSON.stringify(transMidArrWidthSave());
        // 获取表头列数据
        const surveyMappingList = JSON.stringify(headerList.value);
        // 获取填报人数据
        const transFillPersonSubject = JSON.stringify(transMidArrWidthSave([fillPersonSubject])[0]);

        // 改变保存按钮状态
        setSaveBtnStatus(true);
        const params = {
          id: id.value,
          templateId: templateId.value,
          surveyMappingList,
          categoryList,
          fillPersonSubject: transFillPersonSubject,
        };

        try {
          await opTemplateSaveDesign(params);
          setSaveBtnStatus(false);
          createMessage.success('保存成功');
        } catch {
          setSaveBtnStatus(false);
          createMessage.error('保存失败');
        }

        await getDesign();
      };

      /**
       * 逻辑设置
       */
      const [registerDrawer, { openDrawer }] = useDrawer();
      const setLogic = async ({ categoryId, index, isModule }) => {
        if (!categoryId || typeof categoryId === 'string') {
          createConfirm({
            iconType: 'warning',
            title: '提示',
            content: '您尚未保存该问卷，是否立即保存？',
            showCancelBtn: true,
            onOk() {
              handleSave();
              return;
            },
          });
        } else {
          // 先调用保存接口
          await handleSave();

          openDrawer(true, {
            categoryId,
            index,
            isModule,
            templateId: route.query.templateId,
          });
        }
      };

      watch(
        () => key.value,
        () => {
          nextTick(() => rowDrop());
        },
      );

      onMounted(() => {
        nextTick(() => {
          rowDrop();

          handlerAppClick();
        });
      });

      onUnmounted(() => {
        document.getElementById('app')?.removeEventListener('click', clearActived);
      });

      provide('midArr', midArr);
      provide('logicArr', logicArr);
      provide('addID', addID);
      provide('sortableMid', sortableobj);
      provide('currentModule', currentModule);
      provide('headerList', headerList);
      provide('fillPersonSubject', fillPersonSubject);
      provide('treeData', treeData);

      return {
        ...toRefs(state),
        ...toRefs(saveBtn),
        isSave,
        midArr,
        midWrapRef,
        key,
        spinning,
        register,
        handleAddFrom,
        handleSave,
        handleItemClick,
        clearActived,
        currentModule,
        deleteMidArrItem,
        setLogic,
        handleOpenDrawer,
        registerDrawer,
      };
    },
  });
</script>

<style lang="less">
  :deep(.ant-spin-blur) {
    opacity: 0 !important;
  }

  .logic-spin {
    // top: 50% !important;
    // transform: translateY(-60%);
  }

  #sortableBox {
    ul {
      margin-bottom: 0;
    }

    .show-from {
      width: 100%;
      display: none;
    }

    .middle {
      // min-height: 500px;
    }

    .middle .show-from {
      display: block;
    }

    .middle .show-btn {
      display: none;
    }
  }

  .h-100 {
    height: 100%;
  }
</style>
