<!--
 * @Author: 江雪松 576053154@qq.com
 * @Date: 2022-07-19 16:08:17
 * @LastEditors: 江雪松 576053154@qq.com
 * @LastEditTime: 2022-08-04 15:36:51
 * @FilePath: /vben-ucenter/src/views/demo/system/survey/module/MidWrap.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <ScrollContainer ref="scrollRef">
    <a-collapse v-model:activeKey="activeKey" accordion>
      <!-- <a-collapse-panel key="1" header="表名设计">
        <div class="mid-title mid-shadow">
          <h1 class="mid-nav">
            <a-input class="mid-input mid-dashed" v-model:value="title" :bordered="false" />
          </h1>
          <div class="mid-nav relative" id="mid-titleDesc">
             <Tinymce
              v-model="titleDesc"
              @change="handleTinymceChange"
              :showImageUpload="false"
              width="100%"
              :toolbar="['fontsizeselect | bold | italic | underline']"
              :options="{
                inline: true,
                auto_focus: false,
                menubar: false,
                selector: '#editorBody',
                fontsize_formats: '12px 14px 18px 24px 36px 48px',
                fixed_toolbar_container: `#mid-titleDesc`,
              }"
            >
              <div id="editorBody" class="mid-dashed"></div>
            </Tinymce>
          </div>
        </div>
      </a-collapse-panel> -->
      <a-collapse-panel key="2" header="表头设计">
        <HeaderDesign class="mid-shadow" />
      </a-collapse-panel>
    </a-collapse>

    <ul class="middle mt-5">
      <li
        v-for="(item, index) in midArr"
        @click="handleClick(item, index)"
        :key="`${item.id}-${index}`"
        :data-id="item.id"
        :id="item.id"
        class="mb-2 mid-item"
      >
        <div
          class="shadow-md rounded quest-module-wrap"
          v-if="item.type == 'module'"
          @click.stop="handlerModuleClick(item)"
          :class="{ actived: item.isActived }"
        >
          <div class="quest-module-con">
            <div class="qs-md-hd">
              <div class="qs-md-num">
                <!-- <span class="c-requird">*</span> -->
                <em>{{ ToLower(index + 1) }}、</em>
              </div>
              <div class="qs-md-title">
                <a-input
                  @click="(e) => input(item, e)"
                  v-model:value="item.label"
                  :bordered="false"
                  :class="`title-focus`"
                />
              </div>
            </div>
            <div
              class="qs-md-bd"
              :class="{ hiddenChildren: item.hiddenChildren, 'pt-4': !item.hiddenChildren }"
            >
              <ModuleItem
                :isSave="isSave"
                :modulePut="true"
                :moduleType="item.type"
                :sortableModule="`ModuleItem${item.id}`"
                :moduleArr="item.children"
                v-model:children="item.children"
                @set-key="++item.key"
                @scroll-bottom="scrollBottom"
                @set-mid-arr="handlerModuleClick"
                @clear-actived="$emit('clearActived')"
                @delete-mid-arr-item="deleteMidArrItem"
                @set-logic="setLogic"
              />
            </div>
          </div>
          <div class="qs-md-operate">
            <a-tooltip>
              <template #title>{{ item.hiddenChildren ? '展开' : '隐藏' }}</template>
              <Icon
                :icon="
                  !item.hiddenChildren ? 'fluent:eye-24-regular' : 'fluent:eye-hide-20-regular'
                "
                @click="handleShow(item)"
                color="#707070"
                size="18px"
                class="mx-1 cursor-pointer setting-icon"
              />
            </a-tooltip>
            <a-badge size="small" :count="categoryLogicSize(item.id)">
              <a-tooltip>
                <template #title>逻辑设置</template>
                <Icon
                  icon="ant-design:branches-outlined"
                  @click.stop="handleLogicSetting(item)"
                  color="#707070"
                  size="18px"
                  class="mx-2 setting-icon cursor-pointer"
                />
              </a-tooltip>
            </a-badge>
            <a-tooltip>
              <template #title>长按拖动表单</template>
              <Icon
                icon="ant-design:drag-outlined"
                color="#707070"
                size="18px"
                class="mx-1 mid-move cursor-move setting-icon"
              />
            </a-tooltip>
            <a-tooltip>
              <template #title>删除</template>
              <Icon
                icon="fluent:delete-28-regular"
                @click="handleDelete(item, index)"
                color="#707070"
                size="18px"
                class="mx-1 cursor-pointer setting-icon"
              />
            </a-tooltip>
          </div>
        </div>
      </li>
      <AEmpty
        class="mid-empty"
        :image="simpleImage"
        description="请点击表单或将左侧表单拖入此区域"
        v-if="!midArr || midArr.length == 0"
      />
    </ul>
    <div class="module-item stembox mt-5">
      <div class="module-shadow quest-warpper">
        <h1 class="module-nav mb-2 relative">
          <a-input
            class="module-input module-dashed"
            v-model:value="fillPersonSubject.stem"
            :bordered="false"
          />
          <div class="module-number">
            <span v-if="fillPersonSubject.isRequired" style="color: red">*</span>
            <!-- <span class="text-align: left;"></span> -->
          </div>
        </h1>
        <div class="module-type-input mb-2" :class="[fillPersonSubject.inputSize]">{{
          fillPersonSubject.defaultText
        }}</div>
      </div>
    </div>
  </ScrollContainer>
</template>

<script lang="ts">
  import { defineComponent, provide, inject, ref, toRef, unref, watch, reactive } from 'vue';
  import { Icon } from '/@/components/Icon';
  import ModuleItem from './ModuleItem.vue';
  import HeaderDesign from './HeaderDesign.vue';
  import { ScrollContainer, ScrollActionType } from '/@/components/Container';
  import { Input, Empty, Tooltip, Collapse, CollapsePanel, Badge } from 'ant-design-vue';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { ToLower } from '../utils';
  import { categoryLogicSize } from '../config/logic';
  import { createInput } from '../utils/index';
  import { mergeWith } from 'lodash';
  export default defineComponent({
    components: {
      Icon,
      ModuleItem,
      HeaderDesign,
      ScrollContainer,
      ABadge: Badge,
      AEmpty: Empty,
      ATooltip: Tooltip,
      AInput: Input,
      ACollapse: Collapse,
      ACollapsePanel: CollapsePanel,
    },
    props: {
      isSave: Boolean,
    },
    emits: ['item-click', 'clearActived', 'deleteMidArrItem', 'setLogic'],
    setup(_, { emit }) {
      const activeKey = ref('2');
      const title = ref('问卷标题');
      const titleDesc = ref('问卷描述');
      const scrollRef = ref<Nullable<ScrollActionType>>(null);
      const { createWarningModal, createConfirm } = useMessage();
      const midArr: any = inject('midArr');
      const currentModule: any = inject('currentModule');
      const fillPersonSubject: any = inject('fillPersonSubject');
      const midScroll = ref(false);

      // 获取Scroll对象
      const getScroll = () => {
        const scroll = unref(scrollRef);
        if (!scroll) {
          throw new Error('scroll is Null');
        }
        return scroll;
      };

      // 滚动到底部
      const scrollBottom = () => {
        getScroll()?.scrollBottom();
      };

      // 点击
      const handleClick = (item, index) => {
        emit('item-click', item, index, -1);
      };

      // 删除表单
      const handleDelete = (item, index) => {
        // 检查当前分类是否包含逻辑或者被关联逻辑
        const { id } = item;

        const logicSize = categoryLogicSize(id);

        if (logicSize >= 1) {
          createWarningModal({ title: '提示', content: '该分类包含逻辑设置，不能删除！' });
          return false;
        }
        createConfirm({
          iconType: 'warning',
          title: '提示',
          content: '此操作会删除该表单, 是否继续?',
          showCancelBtn: true,
          onOk() {
            midArr.value.splice(index, 1);
            emit('clearActived');
          },
        });
      };

      const deleteMidArrItem = (id) => {
        console.log('当前的删除id:', id);
        emit('deleteMidArrItem', id);
      };

      /**
       * 设置当前模块的选中状态
       */
      const handlerModuleClick = (item) => {
        emit('clearActived');

        const isActived = toRef(item, 'isActived');

        isActived.value = true;

        currentModule.value = item;
      };

      /**
       * 显示隐藏子问题
       */
      const handleShow = (item) => {
        const hiddenChildren = toRef(item, 'hiddenChildren');

        hiddenChildren.value = !hiddenChildren.value;
      };

      /**
       * 遍历题目，判断模块中是否有题目添加了逻辑
       * @id 模块children
       * @arr 是否返回id数组
       */
      const eachTree = (arr, isIds) => {
        let hasLogic = false;
        let ids: any = [];
        arr.forEach((item) => {
          if (isIds) {
            ids.push(item.id);
          }
          if (!isIds && item.logicNum) {
            hasLogic = true;
          }
          if (!isIds && !hasLogic && item.children.length > 0) {
            eachTree(item.children, false);
          }
          if (isIds && item.children.length > 0) {
            eachTree(item.children, isIds);
          }
        });
        return isIds ? ids : hasLogic;
      };

      watch(
        () => midScroll.value,
        () => {
          scrollBottom();
        },
      );

      provide('midScroll', midScroll);

      const setLogic = (params) => {
        emit('setLogic', params);
      };

      // 逻辑设置
      // 逻辑设置
      const handleLogicSetting = ({ id }) => {
        emit('clearActived');
        emit('setLogic', { categoryId: id, index: null, isModule: true });
      };

      const input = ({ isActived }, e) => {
        !isActived && e.target.select();
      };

      return {
        activeKey,
        title,
        midArr,
        titleDesc,
        scrollRef,
        simpleImage: Empty.PRESENTED_IMAGE_SIMPLE,
        fillPersonSubject,
        handleLogicSetting,
        handleClick,
        handleDelete,
        scrollBottom,
        handlerModuleClick,
        deleteMidArrItem,
        handleShow,
        ToLower,
        setLogic,
        categoryLogicSize,
        input,
      };
    },
  });
</script>

<style lang="less" scoped>
  @import '../css/index.less';

  :deep(.scrollbar__bar) {
    width: 2px !important;
  }

  [data-theme='dark'] {
    .mid-shadow,
    .stembox {
      background-color: #151515;
    }

    .mid-dashed {
      border-color: #303030;
    }
  }

  .stembox {
    background: #fff;
  }

  .mid-shadow {
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 2px 4px 0 rgb(0 0 0 / 10%);
    margin-bottom: 20px;
    padding: 15px 50px;
  }

  .mid-title {
    min-height: 120px;
  }

  #editorBody {
    padding: 4px 11px;
  }

  .mid-input {
    font-size: @font-size-b4;
  }

  .mid-dashed {
    border-radius: 2px;
    border: 1px dashed;
    border-color: #fff;
  }

  .mid-nav:hover {
    .mid-dashed {
      border-color: #d9d9d9;
    }
  }

  .mid-icon {
    text-align: right;
    display: none;

    .app-iconify {
      cursor: pointer;
    }
  }

  .mid-item:hover {
    .mid-icon {
      display: block;
    }
  }

  .mid-number {
    width: 40px;
    position: absolute;
    left: -40px;
    top: 4px;
    font-size: @font-size-b4;
    text-align: right;

    span {
      display: inline-block;
    }
  }

  .mid-type-input {
    height: 30px;
    padding: 4px 11px;
    border-radius: 2px;
    border: 1px solid #d9d9d9;
    color: #aaa;
    margin-left: 11px;
  }

  .mid-type-textarea {
    height: 60px;
    padding: 4px 11px;
    border-radius: 2px;
    border: 1px solid #d9d9d9;
    color: #aaa;
    margin-left: 11px;
  }

  .mid-type-select {
    margin-left: 11px;
  }

  .mid-add-option {
    display: inline-flex;
    align-items: center;
    margin-left: 22px;
    color: @primary-color;
    cursor: pointer;
  }

  .mid-empty {
    border-radius: 2px;
    border: 1px dashed #aaa;
    padding: 150px 0;
    margin: 0;
  }
</style>

<style lang="less">
  .tox-toolbar {
    border-top: none !important;
  }

  #mid-titleDesc {
    .tox-tinymce-inline {
      position: absolute;
      top: -40px;
    }
  }
</style>
