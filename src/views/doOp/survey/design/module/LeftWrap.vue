<!--
 * @Author: 江雪松 576053154@qq.com
 * @Date: 2022-07-19 15:59:32
 * @LastEditors: 江雪松 576053154@qq.com
 * @LastEditTime: 2022-07-27 16:32:19
 * @FilePath: /vben-ucenter/src/views/demo/system/survey/module/LeftWrap.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="left p-2 h-full bg-white">
    <a-tabs v-model:activeKey="activeKey" size="small">
      <a-tab-pane key="1" tab="题库">
        <BasicTree
          toolbar
          search
          :checkStrictly="true"
          :expandOnSearch="true"
          :clickRowToExpand="false"
          :load-data="onLoadData"
          :treeData="treeData"
          ref="treeRef"
          @select="handleSelect"
          class="org-tree"
          :fieldNames="{ title: 'label', key: 'id' }"
          :before-right-click="beforeRightClick"
        >
          <template #title="node">
            <span class="node-title"
              ><span class="handle-title">{{ getTitle(node) }}</span>
              <a-tooltip :mouseEnterDelay="0.2" placement="right">
                <template #title>
                  <span>{{ getTitle(node) }}</span>
                </template>
                <Icon v-if="typeof node.id !== 'string'" icon="iconoir:eye-empty" size="20" />
              </a-tooltip>
            </span>
          </template>
        </BasicTree>
      </a-tab-pane>
      <a-tab-pane key="2" tab="组件" force-render>
        <div>
          <div>题型</div>
          <ul class="question">
            <li v-for="item in questionArr" :key="item.value" :from-key="item.type">
              <a-button :from-key="item.type" class="show-btn">
                <!-- from-key 属性必须，移动元素后创建了新dom, 只能监听新dom的点击事件，from-key保证能在监听中获取到value -->
                <span :from-key="item.type">{{ item.label }}</span>
              </a-button>
              <div class="show-from p-1 bg-red-300"></div>
            </li>
          </ul>
        </div>
        <div>
          <div>组件</div>
          <ul class="component">
            <li
              v-for="item in componentArr"
              @click.stop="handleClick(item)"
              :key="item.value"
              :from-key="item.type"
            >
              <a-button :from-key="item.type" class="show-btn">
                <!-- from-key 属性必须，移动元素后创建了新dom, 只能监听新dom的点击事件，from-key保证能在监听中获取到value -->
                <span :from-key="item.type">{{ item.label }}</span>
              </a-button>
              <div class="show-from p-1 bg-red-300"></div>
            </li>
          </ul>
        </div>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref, unref, onMounted, toRef, inject, nextTick } from 'vue';
  import { Tabs, TabPane, Tooltip } from 'ant-design-vue';
  import type { TreeProps } from 'ant-design-vue';
  import { questionArr, componentArr } from '../config';
  import { opQuestionBankCategoryList, opQuestionBankLayeredList } from '/@/api/doOp/index';
  import { BasicTree, TreeItem, TreeActionType } from '/@/components/Tree';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { cloneDeep, mergeWith } from 'lodash';
  import { Icon } from '/@/components/Icon';
  import {
    ComponentsMap,
    comTypeMapOpposite,
    createID,
    createRadioOptionsItem as createOptionsItem,
  } from '../utils';
  import { ComponentType } from '../enums';

  export default defineComponent({
    components: {
      ATabs: Tabs,
      ATabPane: TabPane,
      ATooltip: Tooltip,
      BasicTree,
      Icon,
    },
    emits: ['addfrom', 'clearActived'],
    setup(_, { emit }) {
      const { createMessage } = useMessage();
      const midArr: any = inject('midArr');
      const treeData: any = inject('treeData');
      const currentModule: any = inject('currentModule');
      const handleClick = (item) => {
        emit('addfrom', item);
      };

      const activeKey = ref('1');

      // 题库列表
      // const treeData = ref<TreeItem[]>([]);
      const treeRef = ref<Nullable<TreeActionType>>(null);
      const getTree = () => {
        const tree = unref(treeRef);
        if (!tree) {
          throw new Error('tree is null!');
        }
        return tree;
      };
      const requestStemTree = async () => {
        const data = (await opQuestionBankCategoryList()) as unknown as TreeItem[];
        // 处理数据结构
        data.map((v) => {
          v.label = v.categoryName + ` (${v.subjectCount})`;
          v.id = v.categoryName;
          v.children = v.subjectList;
          delete v.subjectList;
          v.class = 'parent';
          v.children?.map((w) => {
            w.isLeaf = true;
            w.label = w.stem;
            const type = comTypeMapOpposite.get(w.type);
            const mappingParentId = `mapping-parent-${v.id}`;
            const mappingSelfId = `mapping-self-${w.id}`;
            w.class = `children stem-type-${type} ${mappingParentId} ${mappingSelfId}`;
            if (w.children?.length) {
              w.baseChildren = w.children;
              delete w.children;
            }
          });
        });
        console.log(treeData.value, 'treeData.value');
        treeData.value = data;
      };

      // 异步加载树节点
      const onLoadData: TreeProps['loadData'] = (treeNode) => {
        return new Promise((resolve) => {
          if (treeNode.children?.length) {
            resolve();
            return;
          }

          const { categoryName } = treeNode;
          opQuestionBankLayeredList({ categoryName }).then((res) => {
            let index = treeData.value.findIndex((v) => v.categoryName === treeNode.categoryName);
            if (!res.length) {
              const isLeaf = toRef(treeNode, 'isLeaf');
              isLeaf.value = true;
              resolve();
              return;
            }

            const children = toRef(treeData.value[index], 'children');

            children.value = res.map((v) => {
              v.baseChildren = v.children;
              delete v.children;
              const type = comTypeMapOpposite.get(v.type);
              const mappingParentId = `mapping-parent-${categoryName}`;
              const mappingSelfId = `mapping-self-${v.id}`;
              return {
                ...v,
                label: v.stem,
                isLeaf: true,
                class: `children stem-type-${type} ${mappingParentId} ${mappingSelfId}`,
              };
            });
            resolve();
          });
        });
      };

      const handleSelect = (_, node) => {};

      const clickRightNode: any = ref(null);
      const clickRightEvent: any = ref(null);
      const beforeRightClick = (node, event) => {
        if (typeof node.id !== 'number') return;
        deleteClassName();
        deleteMenu();

        // 记录上一次右键node
        clickRightNode.value = node;
        clickRightEvent.value = event;
        addClassName();
        createMenu(node.id, event);
      };

      const deleteClassName = () => {
        clickRightEvent.value?.target?.classList.remove('clickRight');
      };
      const addClassName = () => {
        clickRightEvent.value.target.classList.add('clickRight');
      };

      const deleteMenu = () => {
        if (clickRightNode.value && clickRightEvent.value) {
          const menu = document.getElementById('menu-' + clickRightNode.value.id);
          if (menu) {
            clickRightEvent.value?.target.removeChild(menu);
          }
        }
      };

      const createMenu = (id, event) => {
        const menu = document.createElement('ul');
        menu.setAttribute('id', 'menu-' + id);
        menu.className = 'create-menu';

        if (document.body.clientHeight - event.clientY - 29 * midArr.value.length - 10 - 30 >= 0) {
          menu.style.top = '10px';
          menu.style.right = '0px';
        } else {
          menu.style.bottom = '10px';
          menu.style.right = '0px';
        }

        menu.addEventListener('mouseleave', () => {
          deleteMenu();
          deleteClassName();
        });
        createMenuList().forEach((item) => {
          menu.appendChild(item);
        });
        midArr.value.length && event.target.appendChild(menu);
      };

      const createMenuList = () => {
        return midArr.value.map((item, index) => {
          const li = document.createElement('li');
          li.setAttribute('data-id', item.id);
          li.innerText = item.label;
          li.className = 'create-menu-item';
          li.addEventListener('click', () => addStem(index));
          return li;
        });
      };

      const addStem = (index) => {
        let data: any = {};
        for (let key in clickRightNode.value.dataRef) {
          if (key !== 'label') {
            data[key] = clickRightNode.value.dataRef[key];
          }
          if (key === 'baseChildren') {
            data['children'] = cloneDeep(clickRightNode.value.dataRef[key]);
          }
        }
        const stems = { children: [data] };
        setTimeout(() => {
          initComponents(stems);
          let component: any = stems.children[0];
          // 设置选中
          component.isActived = true;
          currentModule.value = component;
          midArr.value[index].children.push(component);
          nextTick(() => {
            let scrollTop = 0;
            midArr.value.forEach((item, i) => {
              if (i < index) {
                scrollTop += (document.getElementById(item.id)?.offsetHeight as number) + 10;
              }
            });
            let content = (
              document.getElementById('edit-content') as HTMLDivElement
            ).getElementsByClassName('scrollbar__wrap')[0];
            const antCollapseHeight = (
              document.getElementsByClassName('ant-collapse')[0] as HTMLDivElement
            )?.offsetHeight;
            const curOffsetTop = document.getElementById(component.id)?.offsetTop as number;

            content.scrollTop = curOffsetTop + antCollapseHeight + scrollTop;
          });
        });
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

      const getTitle = ({ id, stem, label }) => {
        if (typeof id === 'string') {
          return label;
        }
        return stem;
      };

      const getComponent = (com) => {
        let type = comTypeMapOpposite.get(com.type);
        if (type === undefined) {
          createMessage.error(`初始化${type}失败！`);
          throw new Error(`初始化${type}失败！`);
        }
        return { component: ComponentsMap.get(type)(), type };
      };

      onMounted(() => requestStemTree());
      return {
        questionArr,
        componentArr,
        activeKey,
        treeData,
        onLoadData,
        handleClick,
        handleSelect,
        getTitle,
        beforeRightClick,
      };
    },
  });
</script>

<style lang="less" scoped>
  .left {
    border-radius: 2px;
    box-shadow: 0 2px 4px 0 rgb(0 0 0 / 10%);

    li {
      margin: 2%;
    }

    .show-btn {
      width: 50%;
    }
  }

  :deep(.ant-col-5),
  :deep(.ant-tabs),
  :deep(.ant-tabs-content),
  :deep(.ant-spin-container),
  :deep(.scroll-container) {
    height: 100% !important;
  }

  :deep(.ant-spin-nested-loading) {
    height: calc(100% - 38px);
  }

  :deep(.ant-tree-title) {
    overflow: initial !important;
  }

  :deep(.clickRight) {
    background-color: #f5f5f5 !important;
  }

  :deep(.create-menu) {
    position: absolute;

    border: 1px solid #ccc;
    min-width: 100px;
    border-radius: 3px;
    background: #fff;
    z-index: 9;
    opacity: 1;

    .create-menu-item {
      line-height: 22px;
      border-bottom: 1px solid #ccc;
      padding: 3px 10px;
      transition: all 0.3s;
      cursor: pointer;
    }

    .create-menu-item:hover {
      background: #ccc;
      opacity: 0.6;
    }

    .create-menu-item:last-child {
      border-bottom: none;
    }
  }

  .node-title {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;

    > span:first-child {
      width: 100%;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    :deep(.anticon) {
      opacity: 0;
      transition: all 0.3s;
    }
  }

  .node-title:hover {
    :deep(.anticon) {
      opacity: 1;
    }
  }
</style>
