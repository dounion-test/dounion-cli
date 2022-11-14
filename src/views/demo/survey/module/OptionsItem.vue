<!--
 * @Author: 江雪松 576053154@qq.com
 * @Date: 2022-07-20 15:19:42
 * @LastEditors: 江雪松 576053154@qq.com
 * @LastEditTime: 2022-07-22 16:23:43
 * @FilePath: /vben-ucenter/src/views/demo/system/survey/module/OptionsItem.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <a-row class="mid-type-select" :id="optionsID">
    <a-col
      class="!flex items-center mb-2 options-item"
      v-for="(item, index) in options"
      :data-id="item.value"
      :key="item.value"
      :span="18"
    >
      <Icon class="mid-show options-move" icon="ant-design:holder-outlined" />
      <a-input class="mid-dashed !mx-2" v-model:value="item.label" :bordered="false">
        <template #prefix>
          <Icon v-if="formType == 'select'" icon="ant-design:caret-down-outlined" />
          <div v-if="formType == 'radio'" class="icon-round"></div>
          <div v-if="formType == 'checkbox'" class="icon-square"></div>
        </template>
      </a-input>
      <Icon
        class="mid-show cursor-pointer"
        @click.stop="handleDelete(item, index)"
        icon="ant-design:minus-circle-outlined"
      />
    </a-col>
  </a-row>
</template>

<script lang="ts">
  import { defineComponent, onMounted, nextTick, inject, watch, ref } from 'vue';
  import { Icon } from '/@/components/Icon';
  import { Row, Col, Input, Tooltip } from 'ant-design-vue';
  import Sortable from 'sortablejs';
  import { cloneDeep } from 'lodash';

  export default defineComponent({
    components: {
      Icon,
      ARow: Row,
      ACol: Col,
      ATooltip: Tooltip,
      AInput: Input,
    },
    props: {
      midID: String,
      optionsID: String,
      formType: String,
      isSave: Boolean,
      moduleID: {
        type: String,
        default: () => '',
      },
      options: {
        type: Array,
        default: () => [],
      },
    },
    setup(props) {
      const sortableobj = ref();
      const midArr: any = inject('midArr');

      // 注册拖拽
      const rowDrop = () => {
        const sortableMid = document.querySelector(`#${props.optionsID}`);
        sortableobj.value = Sortable.create(sortableMid as HTMLElement, {
          animation: 500,
          handle: '.options-move',
          dataIdAttr: 'data-id',
          group: {
            name: 'ceshi',
            pull: false,
            put: false,
          },
        });
      };

      // 删除选项
      const handleDelete = (item, index) => {
        if (props.moduleID) {
          midArr.value.forEach((it) => {
            if (it.id == props.midID) {
              it.children.forEach((i) => {
                if (i.id == props.moduleID) {
                  i.deleteID.push(item.value);
                  i.deleteID.sort();
                  i.options.splice(index, 1);
                }
              });
            }
          });
        } else {
          midArr.value.forEach((it) => {
            if (it.id == props.midID) {
              it.deleteID.push(item.value);
              it.deleteID.sort();
              it.options.splice(index, 1);
            }
          });
        }
      };

      onMounted(() => {
        nextTick(() => {
          rowDrop();
        });
      });

      watch(
        () => props.isSave,
        () => {
          let sortableArr = sortableobj.value.toArray();
          let itemOptions: any = [];
          let newOptions: any = [];
          let moduleIndex = 0;
          let index = 0;
          if (props.moduleID) {
            midArr.value.forEach((item, ind) => {
              if (item.id == props.midID) {
                index = ind;
                item.children.forEach((it, i) => {
                  if (it.id == props.moduleID) {
                    moduleIndex = i;
                    itemOptions = it.options;
                  }
                });
              }
            });
            sortableArr.forEach((item) => {
              itemOptions.forEach((it) => {
                if (it.value == item) {
                  newOptions.push(cloneDeep(it));
                }
              });
            });
            midArr.value[index].children[moduleIndex].options = newOptions;
          } else {
            midArr.value.forEach((item, i) => {
              if (item.id == props.midID) {
                itemOptions = item.options;
                index = i;
              }
            });
            sortableArr.forEach((item) => {
              itemOptions.forEach((it) => {
                if (it.value == item) {
                  newOptions.push(cloneDeep(it));
                }
              });
            });
            midArr.value[index].options = newOptions;
          }
        },
      );

      return {
        handleDelete,
      };
    },
  });
</script>

<style lang="less" scoped>
  .mid-show {
    visibility: hidden;
  }

  .mid-dashed {
    border-radius: 2px;
    border: 1px dashed;
    border-color: #fff;
  }

  .options-item {
    margin-left: -25px;
  }

  .options-item:hover {
    .mid-dashed {
      border-color: #d9d9d9;
    }

    .mid-show {
      visibility: initial;
    }
  }

  .icon-round {
    width: 14px;
    height: 14px;
    border-radius: 50%;
    border: 1px solid #d9d9d9;
  }

  .icon-square {
    width: 14px;
    height: 14px;
    border: 1px solid #d9d9d9;
  }
</style>
