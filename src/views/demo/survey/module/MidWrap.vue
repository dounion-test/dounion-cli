<!--
 * @Author: 江雪松 576053154@qq.com
 * @Date: 2022-07-19 16:08:17
 * @LastEditors: 江雪松 576053154@qq.com
 * @LastEditTime: 2022-07-25 11:19:00
 * @FilePath: /vben-ucenter/src/views/demo/system/survey/module/MidWrap.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <ScrollContainer ref="scrollRef">
    <div class="mid-title mid-shadow">
      <h1 class="mid-nav">
        <a-input class="mid-input mid-dashed" v-model:value="title" :bordered="false" />
      </h1>
      <div class="mid-nav">
        <a-textarea
          style="resize: none"
          class="mid-dashed"
          v-model:value="titleDesc"
          :bordered="false"
        />
      </div>
    </div>
    <ul class="middle">
      <li
        v-for="(item, index) in midArr"
        @click="handleClick(item, index)"
        :key="`${item.id}-${index}`"
        :data-id="item.id"
        class="mb-4 mid-item"
      >
        <a-row v-if="item.type == 'input'" class="mid-shadow">
          <a-col :span="18" class="relative">
            <h1 class="mid-nav">
              <a-input class="mid-input mid-dashed" v-model:value="item.label" :bordered="false" />
              <div class="mid-number">
                <span v-if="item.required" style="color: red">*</span>
                <span class="text-align: left;">{{ index + 1 }}</span>
              </div>
            </h1>
            <div class="mid-type-input"></div>
          </a-col>
          <a-col :span="6">
            <div class="mid-icon">
              <a-tooltip>
                <template #title>长按拖动表单</template>
                <Icon
                  icon="ant-design:drag-outlined"
                  color="#707070"
                  size="18px"
                  class="mx-1 mid-move"
                />
              </a-tooltip>
              <a-tooltip>
                <template #title>删除</template>
                <Icon
                  @click="handleDelete(item, index)"
                  icon="fluent:delete-28-regular"
                  color="#707070"
                  size="18px"
                  class="mx-1"
                />
              </a-tooltip>
            </div>
          </a-col>
        </a-row>
        <a-row v-if="item.type == 'textarea'" class="mid-shadow">
          <a-col :span="18" class="relative">
            <h1 class="mid-nav">
              <a-input class="mid-input mid-dashed" v-model:value="item.label" :bordered="false" />
              <div class="mid-number">
                <span v-if="item.required" style="color: red">*</span>
                <span class="text-align: left;">{{ index + 1 }}</span>
              </div>
            </h1>
            <div class="mid-type-textarea"></div>
          </a-col>
          <a-col :span="6">
            <div class="mid-icon">
              <a-tooltip>
                <template #title>长按拖动表单</template>
                <Icon
                  icon="ant-design:drag-outlined"
                  color="#707070"
                  size="18px"
                  class="mx-1 mid-move"
                />
              </a-tooltip>
              <a-tooltip>
                <template #title>删除</template>
                <Icon
                  icon="fluent:delete-28-regular"
                  @click="handleDelete(item, index)"
                  color="#707070"
                  size="18px"
                  class="mx-1"
                />
              </a-tooltip>
            </div>
          </a-col>
        </a-row>
        <div
          v-if="item.type == 'select' || item.type == 'radio' || item.type == 'checkbox'"
          class="mid-shadow"
        >
          <a-row>
            <a-col :span="18" class="relative">
              <h1 class="mid-nav">
                <a-input
                  class="mid-input mid-dashed"
                  v-model:value="item.label"
                  :bordered="false"
                />
                <div class="mid-number">
                  <span v-if="item.required" style="color: red">*</span>
                  <span class="text-align: left;">{{ index + 1 }}</span>
                </div>
              </h1>
            </a-col>
            <a-col :span="6">
              <div class="mid-icon">
                <a-tooltip>
                  <template #title>长按拖动表单</template>
                  <Icon
                    icon="ant-design:drag-outlined"
                    color="#707070"
                    size="18px"
                    class="mx-1 mid-move"
                  />
                </a-tooltip>
                <a-tooltip>
                  <template #title>删除</template>
                  <Icon
                    icon="fluent:delete-28-regular"
                    @click="handleDelete(item, index)"
                    color="#707070"
                    size="18px"
                    class="mx-1"
                  />
                </a-tooltip>
              </div>
            </a-col>
          </a-row>
          <OptionsItem
            :isSave="isSave"
            :options="item.options"
            :formType="item.type"
            :midID="item.id"
            :optionsID="`optionsItem${item.id}`"
          />
          <div class="mid-add-option" @click.stop="handleAddOption(item, index)">
            <Icon icon="ant-design:plus-square-outlined" />
            <span class="ml-1">添加选项</span>
          </div>
        </div>
        <div v-if="item.type == 'module'" class="mid-shadow">
          <a-row>
            <a-col :span="18" class="relative">
              <h1 class="mid-nav">
                <a-input
                  class="mid-input mid-dashed"
                  v-model:value="item.label"
                  :bordered="false"
                />
                <div class="mid-number">
                  <span style="color: red">*</span>
                  <span class="text-align: left;">{{ index + 1 }}</span>
                </div>
              </h1>
            </a-col>
            <a-col :span="6">
              <div class="mid-icon">
                <a-tooltip>
                  <template #title>长按拖动表单</template>
                  <Icon
                    icon="ant-design:drag-outlined"
                    color="#707070"
                    size="18px"
                    class="mx-1 mid-move"
                  />
                </a-tooltip>
                <a-tooltip>
                  <template #title>删除</template>
                  <Icon
                    icon="fluent:delete-28-regular"
                    @click="handleDelete(item, index)"
                    color="#707070"
                    size="18px"
                    class="mx-1"
                  />
                </a-tooltip>
              </div>
            </a-col>
          </a-row>
          <ModuleItem
            :isSave="isSave"
            :midID="item.id"
            :sortableModule="`ModuleItem${item.id}`"
            :moduleArr="item.children"
            @scroll-bottom="scrollBottom"
          />
        </div>
      </li>
      <AEmpty
        class="mid-empty"
        :image="simpleImage"
        description="请点击表单或将左侧表单拖入此区域"
        v-if="midArr.length == 0"
      />
    </ul>
  </ScrollContainer>
</template>

<script lang="ts">
  import { defineComponent, provide, inject, ref, unref, watch } from 'vue';
  import { Icon } from '/@/components/Icon';
  import OptionsItem from './OptionsItem.vue';
  import ModuleItem from './ModuleItem.vue';
  import { ScrollContainer, ScrollActionType } from '/@/components/Container';
  import { Row, Col, Input, Empty, Tooltip } from 'ant-design-vue';
  import { useMessage } from '/@/hooks/web/useMessage';

  export default defineComponent({
    components: {
      Icon,
      OptionsItem,
      ModuleItem,
      ScrollContainer,
      ARow: Row,
      ACol: Col,
      AEmpty: Empty,
      ATooltip: Tooltip,
      AInput: Input,
      ATextarea: Input.TextArea,
    },
    props: {
      isSave: Boolean,
    },
    emits: ['item-click'],
    setup(_, { emit }) {
      const title = ref('问卷标题');
      const titleDesc = ref('问卷描述');
      const scrollRef = ref<Nullable<ScrollActionType>>(null);
      const { createConfirm } = useMessage();
      const midArr: any = inject('midArr');
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
      const handleDelete = (_item, index) => {
        createConfirm({
          iconType: 'warning',
          title: '提示',
          content: '此操作会删除该表单, 是否继续?',
          onOk() {
            midArr.value.splice(index, 1);
          },
        });
      };

      //删除选项
      const handleAddOption = (_item, index) => {
        if (midArr.value[index].deleteID.length > 0) {
          midArr.value[index].options.push({
            label: `选项${midArr.value[index].deleteID[0]}`,
            value: midArr.value[index].deleteID[0],
          });
          midArr.value[index].deleteID.splice(0, 1);
        } else {
          midArr.value[index].idNum++;
          midArr.value[index].options.push({
            label: `选项${midArr.value[index].idNum}`,
            value: midArr.value[index].idNum,
          });
        }
      };

      watch(
        () => midScroll.value,
        () => {
          scrollBottom();
        },
      );

      provide('midScroll', midScroll);

      return {
        title,
        midArr,
        titleDesc,
        scrollRef,
        simpleImage: Empty.PRESENTED_IMAGE_SIMPLE,
        handleClick,
        handleDelete,
        handleAddOption,
        scrollBottom,
      };
    },
  });
</script>

<style lang="less" scoped>
  .mid-shadow {
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 2px 4px 0 rgb(0 0 0 / 10%);
    margin-bottom: 20px;
    padding: 15px 50px;
  }

  .mid-title {
    height: 120px;
  }

  .mid-input {
    font-size: 16px;
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
    font-size: 16px;
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
