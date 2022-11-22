<!--
 * @Author: 江雪松 576053154@qq.com
 * @Date: 2022-07-20 15:19:42
 * @LastEditors: 江雪松 576053154@qq.com
 * @LastEditTime: 2022-08-04 11:02:14
 * @FilePath: /vben-ucenter/src/views/demo/system/survey/module/OptionsItem.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="type-select-box" :id="optionsID">
    <SlickList
      lockToContainerEdges
      :lockOffset="['0%', '0%']"
      @sort-end="sortEnd"
      use-drag-handle
      axis="y"
      v-model:list="baseOptions"
    >
      <SlickItem
        :class="[
          `options-item`,
          `item-id-${item.id}`,
          item.opActive ? 'op-active' : '',
          item.inputFocused ? 'input-focused' : '',
        ]"
        v-for="(item, index) in baseOptions"
        :data-id="item.id + ''"
        :index="index"
        :key="item.id"
      >
        <a-tooltip>
          <template #title>长按拖动</template>
          <Icon
            v-handle
            class="options-move cursor-pointer"
            icon="teenyicons:drag-vertical-solid"
          />
        </a-tooltip>
        <div
          class="options-text"
          :style="{ 'border-color': item.hasOptionsItemSetting ? '#ccc' : '' }"
        >
          <div
            :class="['input-model', item.hasInput ? 'add-input' : '']"
            :id="`${optionsID}-${item.value}-wrap`"
          >
            <Icon v-if="formType == 'radio'" icon="carbon:radio-button" />
            <Icon
              v-if="formType == 'checkbox'"
              icon="fluent:checkbox-unchecked-20-regular"
              size="18"
            />
            <Tinymce
              class="inline-block"
              v-model="item.label"
              :showImageUpload="false"
              :toolbar="toolbar"
              :options="{
                ...tinymceOptions,
                selector: `#${optionsID}-${item.value}`,
                fixed_toolbar_container: `#${optionsID}-${item.value}-wrap`,
              }"
            >
              <div :id="`${optionsID}-${item.value}`" class="tinymce-con"></div>
            </Tinymce>
          </div>

          <div class="mid-nav richTextEdit" v-if="item.hasOptionsItemStem">
            <Tinymce
              v-model="item.remark"
              :showImageUpload="false"
              width="100%"
              :toolbar="['fontsizeselect | bold | italic | underline']"
              :options="{
                ...tinymceOptions,
                selector: `#${optionsID}-${index}-remark`,
              }"
            >
              <div :id="`${optionsID}-${index}-remark`" class="mid-dashed"></div>
            </Tinymce>
          </div>
        </div>
        <div
          class="options-operate"
          :style="{ display: item.hasOptionsItemSetting ? 'block' : 'none' }"
        >
          <a-tooltip>
            <template #title>设置</template>
            <Icon class="icon-set" icon="ep:setting" @click.stop="handleSet(item)" />
          </a-tooltip>
          <a-tooltip>
            <template #title>删除</template>
            <Icon
              class="icon-remove"
              icon="ant-design:minus-circle-outlined"
              @click.stop="handleDelete(index)"
            />
          </a-tooltip>
        </div>
      </SlickItem>
    </SlickList>
  </div>
</template>

<script lang="ts">
  import { defineComponent, nextTick, ref, toRef } from 'vue';
  import { Icon } from '/@/components/Icon';
  import { Tooltip } from 'ant-design-vue';
  import { Tinymce } from '/@/components/Tinymce/index';
  import { toolbar, tinymceOptions } from '../config/index';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { SlickList, SlickItem, HandleDirective } from 'vue-slicksort';

  export default defineComponent({
    components: {
      Icon,
      Tinymce,
      ATooltip: Tooltip,
      SlickList,
      SlickItem,
    },
    directives: {
      handle: HandleDirective,
    },
    props: {
      optionsID: String,
      formType: String,
      isSave: Boolean,
      moduleID: {
        type: String,
        default: () => '',
      },
      options: {
        type: Array as PropType<Recordable[]>,
        default: () => [],
      },
    },

    emits: ['inputFocus', 'setActived', 'setKey', 'update:options'],
    setup(props, { emit }) {
      const { createMessage } = useMessage();

      const optinos = toRef(props, 'options');
      const baseOptions = ref(optinos.value);

      const sortEnd = () => {
        nextTick(() => {
          emit('update:options', baseOptions.value);
        });
      };

      //设置选项
      const handleSet = (item) => {
        emit('setActived');

        const hasOptionsItemSetting = toRef(item, 'hasOptionsItemSetting');

        hasOptionsItemSetting.value = true;
      };

      // 删除选项
      const handleDelete = (index) => {
        const options = toRef(props, 'options');

        if (options.value.length <= 2) {
          createMessage.warning('至少保留两个选项！');
          return;
        }

        options.value.splice(index, 1);
      };

      return {
        handleSet,
        handleDelete,
        sortEnd,
        toolbar,
        tinymceOptions,
        baseOptions,
      };
    },
  });
</script>

<style lang="less" scoped>
  @prefix-container: ~'@{namespace}-tinymce-container';

  .@{prefix-container} {
    display: inline-block;
    vertical-align: top;
  }

  .type-select-box {
    margin-left: -17px;
    width: 100%;
  }

  .options-move {
    position: absolute;
    left: -7px;
    top: 6px;
    display: none !important;
    // background-color: #fb4b4b;
    &:hover {
      color: @primary-color;
    }
  }

  .options-operate {
    position: absolute;
    right: 0;
    top: 6px;
    display: none;
    width: 100px;

    .app-iconify {
      cursor: pointer;
      margin-left: 5px;
      padding: 0 5px;
      color: #666;
    }

    .icon-set {
      &:hover {
        color: @primary-color;
      }
    }

    .icon-remove {
      &:hover {
        color: #fb4b4b;
      }
    }
  }

  .options-text {
    width: 100%;
    border: 1px dashed transparent;
  }

  .options-item {
    position: relative;
    display: flex;
    align-items: flex-start;
    width: 80%;
    padding-left: 15px;
    margin-bottom: 5px;
    padding-right: 100px;
    // background-color: blue;
    &:hover {
      .options-move,
      .options-operate {
        display: block !important;
      }

      .options-text {
        border-color: #ccc;
      }
    }
  }

  .op-active,
  .input-focused {
    .options-move,
    .options-operate {
      display: block !important;
    }
  }

  .input-focused {
    .options-text {
      background-color: #f5f5f5;

      &:hover {
        border-color: #f5f5f5;
      }
    }
  }

  .input-model {
    position: relative;
    margin-left: 25px;
    padding: 4px 10px;

    .app-iconify {
      position: absolute;
      left: -15px;
      top: 5px;
      margin-right: 4px;
      color: #ccc;
    }
  }

  .add-input {
    &::after {
      content: '';
      display: inline-block;
      margin-left: 10px;
      width: 66px;
      height: 20px;
      vertical-align: sub;
      border: 1px solid #d9d9d9;
    }
  }

  .mid-a-input {
    position: absolute;
    top: 4px;
  }

  .mid-a-input-hide {
    visibility: hidden;
    height: 30px;
    padding-left: 110px;
    max-width: 350px;
    overflow: hidden;
  }
</style>

<style lang="less">
  .options-text {
    .tox-tinymce-inline {
      position: absolute;
      top: -40px;
      padding: 0 10px;
    }

    .tox-tinymce {
      border: 0 none;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
      background-color: #fff;
    }

    .tox {
      &:not([dir='rtl']) .tox-toolbar__group:not(:last-of-type) {
        border: 0 none;
      }

      .tox-toolbar__group {
        padding: 0;
        margin-left: 1px;
      }

      &-toolbar {
        padding-left: 10px;
        background: 0 none;
      }

      .tox-tbtn--select {
        width: 80px;
      }
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

    :deep(.mce-content-body) > p {
      margin-bottom: 0;
    }
  }
</style>
