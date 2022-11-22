<template>
  <div style="width: 100%">
    <SlickList
      class="qs-md-list"
      @sort-end="sortEnd"
      axis="y"
      use-drag-handle
      v-model:list="baseModuleArr"
      :id="sortableModule"
    >
      <SlickItem
        v-for="(item, index) in baseModuleArr"
        :key="item.id"
        @click.stop="handlerItemClick(item)"
        class="module-item"
        :data-id="item.id"
        :id="item.id"
        :index="index"
        @dragstart.stop="dragstart"
        @dragend="dragend"
        :class="{
          actived: item.isActived,
          hasBorder: !item.parentId,
          'input-item': item.type == 'input',
          'choose-item': item.type != 'input',
        }"
      >
        <a-row
          @mouseenter="mouseenter(item)"
          @mouseleave="mouseleave(item)"
          v-if="item.type == 'input'"
          class="module-shadow quest-warpper"
        >
          <a-col :span="18" class="relative">
            <h1 class="module-nav mb-2">
              <a-input
                class="module-input module-dashed"
                v-model:value="item.stem"
                @click="(e) => input(item, e)"
                :bordered="false"
              />
              <div class="module-number">
                <span v-if="item.isRequired" style="color: red">*</span>
                <em>{{ getStemNo(index) }}</em>
                <!-- <span class="text-align: left;"></span> -->
              </div>
            </h1>

            <div class="mid-nav richTextEdit mb-2" v-if="item.hasStem">
              <Tinymce
                v-model="item.remark"
                :showImageUpload="false"
                width="100%"
                :toolbar="['fontsizeselect | bold | italic | underline']"
                :options="{
                  ...tinymceOptions,
                  selector: `#${item.id}stem`,
                }"
              >
                <div :id="item.id + 'stem'" class="mid-dashed"></div>
              </Tinymce>
            </div>
            <div class="module-type-input mb-2" :class="[item.inputSize]">{{
              item.defaultText
            }}</div>

            <div class="flex" v-show="item.isActived">
              <div class="module-add-option m-2">
                <a-dropdown :trigger="['click']">
                  <a class="ant-dropdown-link" @click.prevent>
                    <Icon icon="ant-design:plus-square-outlined" />
                    <span class="ml-1">添加子问题</span>
                  </a>
                  <template #overlay>
                    <a-menu>
                      <a-menu-item
                        v-for="(it, ind) in inputChild"
                        :key="ind"
                        @click.stop="handleAddSon(item, it)"
                      >
                        {{ it.label }}
                      </a-menu-item>
                    </a-menu>
                  </template>
                </a-dropdown>
              </div>
            </div>
          </a-col>
          <a-col :span="6" class="relative q-operate">
            <div>
              <a-tooltip v-if="item.children.length">
                <template #title>{{ item.hiddenChildren ? '展开' : '隐藏' }}</template>
                <Icon
                  :icon="
                    !item.hiddenChildren ? 'fluent:eye-24-regular' : 'fluent:eye-hide-20-regular'
                  "
                  @click="() => (item.hiddenChildren = !item.hiddenChildren)"
                  color="#707070"
                  size="18px"
                  class="mx-1 cursor-pointer setting-icon"
                />
              </a-tooltip>
              <a-tooltip>
                <template #title>长按拖动表单</template>
                <Icon
                  v-handle
                  icon="ant-design:drag-outlined"
                  color="#707070"
                  size="18px"
                  class="mx-2 module-move setting-icon module-icon"
                  :class="{ 'show-icon': item.isMouseenter }"
                />
              </a-tooltip>
              <a-badge
                v-if="!item.parentId"
                size="small"
                :count="stemLogicSize(sortableModule?.replace('ModuleItem', ''), item.id)"
              >
                <a-tooltip>
                  <template #title>逻辑设置</template>
                  <Icon
                    icon="ant-design:branches-outlined"
                    @click.stop="handleLogicSetting(item, index)"
                    color="#707070"
                    size="18px"
                    class="mx-2 setting-icon cursor-pointer"
                  />
                </a-tooltip>
              </a-badge>
              <a-badge style="position: relative">
                <a-tooltip>
                  <template #title>复制</template>
                  <Icon
                    icon="fluent:document-copy-24-regular"
                    @click.stop="handleCopy(item, index)"
                    color="#707070"
                    size="18px"
                    class="mx-2 setting-icon module-icon"
                    :class="{ 'show-icon': item.isMouseenter }"
                  />
                  <a-dropdown :trigger="['click']">
                    <Icon
                      icon="ic:sharp-arrow-drop-down"
                      style="position: absolute; right: -10px; bottom: 0px"
                      color="#707070"
                      size="18px"
                      class="mx-1 cursor-pointer setting-icon module-icon"
                      :class="{ 'show-icon': item.isMouseenter }"
                    />
                    <template #overlay>
                      <a-menu>
                        <a-menu-item @click.stop="handleCopy(item, index, true)">
                          同时复制设置项
                        </a-menu-item>
                      </a-menu>
                    </template>
                  </a-dropdown>
                </a-tooltip>
              </a-badge>

              <a-tooltip>
                <template #title>删除</template>
                <Icon
                  icon="fluent:delete-28-regular"
                  @click="handleDelete(item, index)"
                  color="#707070"
                  size="18px"
                  class="mx-2 ml-3 setting-icon module-icon cursor-pointer"
                  :class="{ 'show-icon': item.isMouseenter }"
                />
              </a-tooltip>
            </div>
          </a-col>
          <ModuleItem
            :class="{ hiddenChildren: item.hiddenChildren }"
            :isSave="isSave"
            :modulePut="true"
            :stemNo="getStemNo(index)"
            :sortableModule="`ModuleItem${item.id}`"
            :moduleArr="item.children"
            @clearActived="clearActived"
            @deleteMidArrItem="deleteMidArrItem"
          />
        </a-row>

        <a-row
          @mouseenter="mouseenter(item)"
          @mouseleave="mouseleave(item)"
          v-if="item.type == 'select' || item.type == 'radio' || item.type == 'checkbox'"
          class="quest-warpper"
        >
          <a-col :span="18" class="relative quest-box hover-show-icon">
            <div class="q-hd">
              <div class="module-number">
                <span v-if="item.isRequired" class="c-requird">*</span>
                <em>{{ index + 1 }}</em>
                <!-- <Icon icon="fa6-regular:circle-question" /> -->
              </div>
              <div class="q-title">
                <a-input
                  @click="(e) => input(item, e)"
                  v-model:value="item.stem"
                  :bordered="false"
                />
              </div>
              <div
                class="mid-nav richTextEdit"
                :id="`Tinymce${item.id}StemWrap`"
                v-if="item.hasStem"
              >
                <Tinymce
                  v-model="item.remark"
                  :showImageUpload="false"
                  width="100%"
                  :toolbar="['fontsizeselect | bold | italic | underline']"
                  :options="{
                    ...tinymceOptions,
                    selector: `#${item.id}stem`,
                    fixed_toolbar_container: `#Tinymce${item.id}StemWrap`,
                  }"
                >
                  <div :id="item.id + 'stem'" class="mid-dashed"></div>
                </Tinymce>
              </div>
            </div>
          </a-col>
          <a-col :span="6" class="relative q-operate">
            <a-tooltip>
              <template #title>长按拖动表单</template>
              <Icon
                v-handle
                icon="ant-design:drag-outlined"
                color="#707070"
                size="18px"
                class="mx-1 module-move setting-icon module-icon"
                :class="{ 'show-icon': item.isMouseenter }"
              />
            </a-tooltip>
            <a-badge
              size="small"
              :count="stemLogicSize(sortableModule?.replace('ModuleItem', ''), item.id)"
            >
              <a-tooltip>
                <template #title>逻辑设置</template>
                <Icon
                  icon="ant-design:branches-outlined"
                  @click.stop="handleLogicSetting(item, index)"
                  color="#707070"
                  size="18px"
                  class="mx-2 setting-icon cursor-pointer"
                />
              </a-tooltip>
            </a-badge>
            <a-badge style="position: relative">
              <a-tooltip>
                <template #title>复制</template>
                <Icon
                  icon="fluent:document-copy-24-regular"
                  @click.stop="handleCopy(item, index)"
                  color="#707070"
                  size="18px"
                  class="mx-2 setting-icon module-icon"
                  :class="{ 'show-icon': item.isMouseenter }"
                />
                <a-dropdown :trigger="['click']">
                  <Icon
                    icon="ic:sharp-arrow-drop-down"
                    style="position: absolute; right: -10px; bottom: 0px"
                    color="#707070"
                    size="18px"
                    class="mx-1 cursor-pointer setting-icon module-icon"
                    :class="{ 'show-icon': item.isMouseenter }"
                  />
                  <template #overlay>
                    <a-menu>
                      <a-menu-item @click.stop="handleCopy(item, index, true)">
                        同时复制设置项
                      </a-menu-item>
                    </a-menu>
                  </template>
                </a-dropdown>
              </a-tooltip>
            </a-badge>
            <a-tooltip>
              <template #title>删除</template>
              <Icon
                icon="fluent:delete-28-regular"
                @click="handleDelete(item, index)"
                color="#707070"
                size="18px"
                class="mx-1 ml-3 setting-icon module-icon"
                :class="{ 'show-icon': item.isMouseenter }"
              />
            </a-tooltip>
          </a-col>
          <OptionsItem
            :isSave="isSave"
            :moduleID="item.id"
            v-model:options="item.options"
            :formType="item.type"
            :key="item.key || 0"
            :optionsID="`optionsItem${item.id}`"
            @set-actived="() => handlerItemClick(item)"
          />
          <a-col :span="18">
            <div
              class="mid-nav richTextEdit"
              :id="`Tinymce${item.id}optionsStemWrap`"
              v-if="item.hasOptionsStem"
            >
              <Tinymce
                v-model="item.optionsStemValue"
                :showImageUpload="false"
                width="100%"
                :toolbar="['fontsizeselect | bold | italic | underline']"
                :options="{
                  ...tinymceOptions,
                  selector: `#${item.id}optionsStem`,
                  fixed_toolbar_container: `#Tinymce${item.id}optionsStemWrap`,
                }"
              >
                <div :id="item.id + 'optionsStem'" class="mid-dashed"></div>
              </Tinymce>
            </div>
          </a-col>

          <ul class="q-menu" style="width: 100%" v-show="item.isActived">
            <li @click.stop="handleAddOption(item)">
              <Icon icon="fluent:add-square-20-regular" size="20" />
              <span class="label">添加选项</span>
            </li>
            <li @click.stop="handleAddOption(item, true)">
              <Icon icon="fluent:add-square-20-regular" size="20" />
              <span class="label">添加其他项</span>
            </li>
          </ul>
        </a-row>
      </SlickItem>

      <AEmpty
        class="module-empty"
        :image="simpleImage"
        description="请点击表单或将左侧表单拖入此区域"
        v-if="moduleArr.length == 0 && moduleType === 'module'"
      />
    </SlickList>
  </div>
</template>

<script lang="ts">
  import { defineComponent, onMounted, nextTick, ref, PropType, inject, toRef } from 'vue';
  import { Icon } from '/@/components/Icon';
  import OptionsItem from './OptionsItem.vue';
  import { Row, Col, Input, Empty, Tooltip, Dropdown, Menu, Badge } from 'ant-design-vue';
  import { Tinymce } from '/@/components/Tinymce/index';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { toolbar, tinymceOptions, inputChild } from '../config/index';
  import { useDrawer } from '/@/components/Drawer';
  import Sortable from 'sortablejs';
  import { cloneDeep, mergeWith } from 'lodash-es';
  import {
    ComponentsMap,
    createRadioOptionsItem as createOptionsItem,
    createRadioOptionsOtherItem as createOptionsOtherItem,
    createID,
    comTypeMapOpposite,
  } from '../utils';
  import { ModuleType, ComponentType } from '../enums';
  import { SlickList, SlickItem, HandleDirective } from 'vue-slicksort';
  import { stemLogicSize, allLogicMap } from '../config/logic';
  export default defineComponent({
    name: 'ModuleItem',
    components: {
      Icon,
      Tinymce,
      OptionsItem,
      ARow: Row,
      ACol: Col,
      AEmpty: Empty,
      ATooltip: Tooltip,
      AInput: Input,
      ADropdown: Dropdown,
      AMenu: Menu,
      AMenuItem: Menu.Item,
      ABadge: Badge,
      SlickList,
      SlickItem,
      // InputType,
    },
    directives: {
      handle: HandleDirective,
    },
    props: {
      isSave: Boolean,
      sortableModule: String,
      moduleType: String,
      stemNo: String,
      moduleArr: {
        type: Array as PropType<Recordable[]>,
        default: () => [],
      },
    },
    emits: ['scroll-bottom', 'clearActived', 'deleteMidArrItem', 'update:children', 'setLogic'],
    setup(props, { emit }) {
      const moduleID = ref(0);
      const currentModule: any = inject('currentModule');
      const treeData: any = inject('treeData');
      const { createWarningModal, createConfirm, createMessage } = useMessage();
      let sortableobj = ref();
      const [registerDrawer] = useDrawer();

      const moduleArr = toRef(props, 'moduleArr');

      const baseModuleArr = ref(moduleArr.value);

      const isMove = ref(false);

      const sortEnd = ({ newIndex, oldIndex }) => {
        nextTick(() => {
          /**
           * 检查逻辑设置=》主逻辑不得放置子逻辑后面
           */
          const { id: newId } = baseModuleArr.value[newIndex];
          const categoryId = props.sortableModule?.replace('ModuleItem', '');
          const commonFn = (value) => {
            // 截取 oldIndex =》newIndex 的数据区间
            const sliceData =
              newIndex > oldIndex
                ? baseModuleArr.value.slice(oldIndex, newIndex + 1)
                : baseModuleArr.value.slice(newIndex, oldIndex + 1);

            let flag = sliceData.some((v) => value.some((w) => w == v.id));

            if (flag) {
              const { stem } = baseModuleArr.value[oldIndex];
              createWarningModal({
                title: '提示',
                content: `该题已经与第${
                  newIndex + 1
                }题：<span class="important">【${stem}】</span>逻辑关联，不可移动到逻辑条件题目之前！`,
              });
              // 还原之前的位置
              baseModuleArr.value = moduleArr.value;
            }

            return flag;
          };
          // 获取当前题目逻辑数量
          const size = stemLogicSize(categoryId, newId);
          let isSort = false;
          if (size) {
            const categoryValue = allLogicMap.value.get(Number(categoryId));

            const hasStemKey = categoryValue.has(newId);
            // 判断被拖拽的数据上是否有主逻辑
            if (hasStemKey) {
              const value = categoryValue.get(newId);
              // 截取 oldIndex =》newIndex 的数据区间
              isSort = commonFn(value);
            } else {
              for (let [key, val] of categoryValue.entries()) {
                if (val.some((id) => id === newId)) {
                  isSort = commonFn([key]);
                }
              }
            }
          }

          !isSort && emit('update:children', baseModuleArr.value);

          isMove.value = false;
          // rowDrop();
        });
      };

      // 注册拖拽
      const rowDrop = () => {
        const sortableModule = document.querySelector(`#${props.sortableModule}`);
        sortableobj.value = Sortable.create(sortableModule as HTMLElement, {
          sort: false,
          // draggable: 'question',
          // filter: '.module-item',
          group: {
            name: 'question',
            pull: false,
            put: true,
          },
          onAdd(evt) {
            if (evt.pullMode == 'clone') {
              resetDragElement(evt);
              const classList = Array.from(evt.item.classList);
              const classIndex = classList.findIndex((v) => v.indexOf('stem-type') !== -1);
              const moduleArr = toRef(props, 'moduleArr');
              let value;
              if (classIndex !== -1) {
                // 从题库拖拽过来的
                value = classList[classIndex].replace('stem-type-', '');

                // 获取父级id
                const parentIdIndex = classList.findIndex(
                  (v) => v.indexOf('mapping-parent') !== -1,
                );
                const parentId = classList[parentIdIndex].replace('mapping-parent-', '');
                // 获取自身id
                const selfIdIndex = classList.findIndex((v) => v.indexOf('mapping-self') !== -1);
                const selfId = classList[selfIdIndex].replace('mapping-self-', '');
                // 过滤树查找当前题目数据

                const parentData = treeData.value.filter((v) => v.id === parentId)[0];

                const selfData = parentData.children.filter((v) => v.id == selfId);

                // 初始化题目
                const stems = { children: JSON.parse(JSON.stringify(selfData)) };
                initComponents(stems);
                let component: any = stems.children[0];
                moduleArr.value.splice(evt.newIndex as number, 0, component);
              } else {
                // 从组件拖拽过来的
                value = evt.item.attributes['from-key'].value;
                if (value === ModuleType.Module) {
                  // evt.item.remove();
                  return false;
                }

                moduleID.value++;

                let conponent = ComponentsMap.get(value);
                moduleArr.value.splice(evt.newIndex as number, 0, conponent());
              }

              // evt.item.remove();
            }
          },
        });
      };

      const getStemNo = (index) => {
        return `${props.stemNo ? props.stemNo + '.' + (index + 1) : index + 1 + ''}`;
      };

      const resetDragElement = (evt) => {
        const { from, clone, item } = evt;

        from.insertBefore(item, clone);
        from.removeChild(clone);
      };

      // 删除表单
      const handleDelete = (item, index) => {
        // 检查当前题目是否设置逻辑或者被关联逻辑
        const { id } = item;

        const logicSize = stemLogicSize(props.sortableModule?.replace('ModuleItem', ''), id);

        if (logicSize >= 1) {
          createWarningModal({ title: '提示', content: '该题已参与逻辑设置，不能删除！' });
          return false;
        }

        createConfirm({
          iconType: 'warning',
          title: '提示',
          content: '此操作会删除该表单, 是否继续?',
          cancelText: '取消',
          onOk() {
            const moduleArr = toRef(props, 'moduleArr');
            moduleArr.value.splice(index, 1);
            // console.log(props.moduleArr.value, 'moduleArr===');

            // deleteMidArrItem(item.id);
            clearActived();
          },
        });
      };

      const deleteMidArrItem = (id) => {
        emit('deleteMidArrItem', id);
      };

      // 添加选项/其他
      const handleAddOption = (_item, other?) => {
        const options = toRef(_item, 'options');

        const item = other
          ? createOptionsOtherItem(createID(_item.type + 'item'))
          : createOptionsItem(createID(_item.type + 'item'));

        options.value.push(item);
      };

      // 添加子问题
      const handleAddSon = (item, it) => {
        let component = (ComponentsMap.get(it.type) as Function)();
        component.parentId = item.id;
        item.children.push(component);
      };

      // 逻辑设置
      const handleLogicSetting = ({ categoryId }, index) => {
        emit('clearActived');
        emit('setLogic', { categoryId, index });
      };

      // 复制
      const handleCopy = (item, index, isCopySetting?) => {
        emit('clearActived');
        // 改变id
        let _item;
        // 是否复制设置项
        if (isCopySetting) {
          _item = cloneDeep(item);
          // 需要改变唯一id，包括子问题
          _item.id = createID(item.type + '-copy');
          // 表示新增未保存的数据
          _item.isSave = false;

          // 如果当前复制单选、多选则改变选项id
          if (item.type === ComponentType.Radio || item.type === ComponentType.Checkbox) {
            changeIdAndIssave(_item.options, 'options');
          }
          if (item.type === ComponentType.Input) {
            changeIdAndIssave(_item.children, 'children');
          }
        } else {
          _item = ComponentsMap.get(item.type)();
        }

        const moduleArr = toRef(props, 'moduleArr');

        moduleArr.value.splice(index + 1, 0, _item);

        // 改变子问题和选项Id
        function changeIdAndIssave(data, attr) {
          if (!data?.length) return;

          data.map((v) => {
            v.id = createID(v.type + '-copy');
            v.isSave = false;

            v[attr] && changeIdAndIssave(v[attr], attr);
          });
        }
      };

      const handlerItemClick = (item) => {
        emit('clearActived');

        const isActived = toRef(item, 'isActived');

        isActived.value = true;

        currentModule.value = item;
      };

      const clearActived = () => {
        emit('clearActived');
      };

      const setActived = (item) => {
        clearActived();

        const isActived = toRef(item, 'isActived');

        isActived.value = true;
      };

      const mouseenter = (item) => {
        item.isMouseenter = true;
      };
      const mouseleave = (item) => {
        item.isMouseenter = false;
      };

      const initComponents = (list) => {
        list.children = list.children.map((com) => {
          // 处理必填字段
          com.isRequired = com.isRequired ? true : false;
          // 获取模块组件
          let { component, type } = getComponent(com);
          // 添加标识，区分当前数据是否已保存
          com.isSave = false;

          // 删除code\id
          delete com.id;
          // 处理非填空
          if (type !== ComponentType.Input) {
            com.options = com.subjectOptionsList;
            delete com.subjectOptionsList;

            // 处理选项
            com.options = com.options.map((oItem, index) => {
              // 删除code\id
              delete oItem.id;
              // 添加标识，区分当前数据是否已保存
              oItem.isSave = false;
              // 转换label字段
              oItem.label = oItem.optionValue;
              // 是否有输入框
              oItem.hasInput = oItem.isAddBlank ? true : false;

              let optionsItem = createOptionsItem(createID(`item-${index}`));
              mergeWith(optionsItem, oItem);
              return {
                ...optionsItem,
              };
            });

            delete component.options;
          } else {
            com.children = com.baseChildren || com.children;
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

      const dragstart = (e) => {
        e.preventDefault();
      };
      const dragend = (e) => {
        console.log('结束');
      };

      const input = ({ isActived }, e) => {
        !isActived && e.target.select();
      };

      onMounted(() => {
        nextTick(() => {
          rowDrop();
        });
      });

      return {
        toolbar,
        inputChild,
        tinymceOptions,
        registerDrawer,
        simpleImage: Empty.PRESENTED_IMAGE_SIMPLE,
        handleCopy,
        handleAddSon,
        handleDelete,
        handleAddOption,
        handleLogicSetting,
        handlerItemClick,
        clearActived,
        deleteMidArrItem,
        setActived,
        baseModuleArr,
        sortEnd,
        stemLogicSize,
        mouseenter,
        mouseleave,
        getStemNo,
        stemNo: props.stemNo,
        dragstart,
        dragend,
        input,
      };
    },
  });
</script>

<style lang="less" scoped>
  @import '../css/index.less';

  [data-theme='dark'] {
    .mid-shadow {
      background-color: #151515;
    }

    .mid-dashed {
      border-color: #303030;
    }
  }

  .module-title {
    height: 120px;
  }

  .module-unit {
    font-size: @font-size-b2;
    font-weight: 400;
    color: #aaa;
  }

  .module-icon {
    text-align: right;
    // display: none;
    opacity: 0;
    display: none !important;
    transition: all 0.3s;
    cursor: pointer;

    .app-iconify {
      cursor: pointer;
    }
  }

  .mid-item.actived,
  .module-item.actived {
    transition: all 0.3s;
  }

  .choose-item:hover .module-icon {
    opacity: 1 !important;
    display: inline-flex !important;
  }

  .show-icon {
    opacity: 1 !important;
    display: inline-flex !important;
  }

  .module-nav-bg {
    background: #f0f2f5;
    color: red;

    .module-dashed {
      border-color: #f0f2f5;
    }
  }

  .module-nav:hover {
    .module-dashed {
      border-color: #d9d9d9;
    }
  }

  .module-type-textarea {
    height: 60px;
    padding: 4px 11px;
    border-radius: 2px;
    border: 1px solid #d9d9d9;
    color: #aaa;
    margin-left: 11px;
  }

  .module-type-select {
    margin-left: 11px;
  }

  .module-add-option {
    display: inline-flex;
    align-items: center;
    color: @primary-color;
    cursor: pointer;
  }

  .tinymce-pading {
    padding: 4px 11px;
    margin-bottom: 10px;
  }

  .module-empty {
    border-radius: 2px;
    border: 1px dashed #aaa;
    padding: 150px 0;
    margin: 0;
  }

  .mid-nav:hover {
    .mid-dashed {
      border-color: #d9d9d9;
    }
  }

  .richTextEdit {
    width: 100%;
    padding: 5px 10px;
    color: rgb(72, 72, 72);
    font-size: @font-size-b2;
    line-height: 1.4;
    background: rgb(247, 248, 250);
    margin-bottom: 10px;
    margin-left: 11px;

    :deep(.mce-content-body) > p {
      margin-bottom: 0;
    }
  }

  .mb-2 {
    margin-bottom: 4px !important;
  }

  :deep(.ant-input):focus,
  :deep(.ant-input-focused) {
    background-color: #f4f4f4;
    border: none;
    border-radius: 2px;
    box-shadow: none;
  }
</style>

<style lang="less">
  .q-text-edit,
  .richTextEdit {
    position: relative;

    .tox-tinymce-inline {
      position: absolute;
      top: -40px;
    }
  }

  .important {
    color: @primary-color;
  }

  .module-shadow {
    // background-color: #fff;
    border-radius: 2px;
    // box-shadow: 0 2px 4px 1px rgb(0 0 0 / 10%);
    // margin-bottom: 20px;
    padding: 15px 30px;

    .module-input {
      font-size: @font-size-b2;
    }

    .module-dashed {
      border-radius: 2px;
      border: 1px dashed;
      border-color: #fff;
    }

    .module-type-input {
      height: 30px;
      padding: 4px 11px;
      border-radius: 2px;
      border: 1px solid #d9d9d9;
      color: #aaa;
      margin-left: 11px;
    }
  }

  .module-number {
    min-width: 40px;
    position: absolute;
    left: -40px;
    top: 4px;
    font-size: @font-size-b4;
    text-align: right;
    font-weight: 500;

    span {
      display: inline-block;
    }
  }
</style>
