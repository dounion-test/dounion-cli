<template>
  <ul :id="sortableModule">
    <li
      v-for="(item, index) in moduleArr"
      :key="`${item.id}-${index}`"
      :data-id="item.id"
      class="mb-4 module-item"
    >
      <a-row v-if="item.type == 'input'" class="module-shadow">
        <a-col :span="18" class="relative">
          <h1 class="module-nav">
            <a-input
              class="module-input module-dashed"
              v-model:value="item.label"
              :bordered="false"
            />
            <div class="module-number">
              <span v-if="item.required" style="color: red">*</span>
              <!-- <span class="text-align: left;"></span> -->
            </div>
          </h1>
          <div class="module-type-input"></div>
        </a-col>
        <a-col :span="6">
          <div class="module-icon">
            <a-tooltip>
              <template #title>长按拖动表单</template>
              <Icon
                icon="ant-design:drag-outlined"
                color="#707070"
                size="18px"
                class="mx-1 module-move"
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
      <a-row v-if="item.type == 'textarea'" class="module-shadow">
        <a-col :span="18" class="relative">
          <h1 class="module-nav">
            <a-input
              class="module-input module-dashed"
              v-model:value="item.label"
              :bordered="false"
            />
            <div class="module-number">
              <span v-if="item.required" style="color: red">*</span>
              <!-- <span class="text-align: left;"></span> -->
            </div>
          </h1>
          <div class="module-type-textarea"></div>
        </a-col>
        <a-col :span="6">
          <div class="module-icon">
            <a-tooltip>
              <template #title>长按拖动表单</template>
              <Icon
                icon="ant-design:drag-outlined"
                color="#707070"
                size="18px"
                class="mx-1 module-move"
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
        class="module-shadow"
      >
        <a-row>
          <a-col :span="18" class="relative">
            <h1 class="module-nav">
              <a-input
                class="module-input module-dashed"
                v-model:value="item.label"
                :bordered="false"
              />
              <div class="module-number">
                <span v-if="item.required" style="color: red">*</span>
                <!-- <span class="text-align: left;"></span> -->
              </div>
            </h1>
          </a-col>
          <a-col :span="6">
            <div class="module-icon">
              <a-tooltip>
                <template #title>长按拖动表单</template>
                <Icon
                  icon="ant-design:drag-outlined"
                  color="#707070"
                  size="18px"
                  class="mx-1 module-move"
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
          :midID="midID"
          :moduleID="item.id"
          :options="item.options"
          :formType="item.type"
          :optionsID="`optionsItem${item.id}`"
        />
        <div class="module-add-option" @click.stop="handleAddOption(item, index)">
          <Icon icon="ant-design:plus-square-outlined" />
          <span class="ml-1">添加选项</span>
        </div>
      </div>
    </li>
    <AEmpty
      class="module-empty"
      :image="simpleImage"
      description="请点击表单或将左侧表单拖入此区域"
      v-if="moduleArr.length == 0"
    />
  </ul>
</template>

<script lang="ts">
  import { defineComponent, onMounted, nextTick, ref, inject, watch } from 'vue';
  import { Icon } from '/@/components/Icon';
  import OptionsItem from './OptionsItem.vue';
  import { Row, Col, Input, Empty, Tooltip } from 'ant-design-vue';
  import { useMessage } from '/@/hooks/web/useMessage';
  import Sortable from 'sortablejs';
  import { cloneDeep } from 'lodash-es';
  import { formObj } from '../config';

  export default defineComponent({
    components: {
      Icon,
      OptionsItem,
      ARow: Row,
      ACol: Col,
      AEmpty: Empty,
      ATooltip: Tooltip,
      AInput: Input,
    },
    props: {
      midID: String,
      isSave: Boolean,
      sortableModule: String,
      moduleArr: {
        type: Array,
        default: () => [],
      },
    },
    emits: ['scroll-bottom'],
    setup(props) {
      const moduleID = ref(0);
      const addID: any = inject('addID');
      const midArr: any = inject('midArr');
      const midScroll: any = inject('midScroll');
      const sortableMid: any = inject('sortableMid');
      const { createConfirm } = useMessage();
      let sortableobj = ref();

      // 注册拖拽
      const rowDrop = () => {
        const sortableModule = document.querySelector(`#${props.sortableModule}`);
        sortableobj.value = Sortable.create(sortableModule as HTMLElement, {
          animation: 100,
          dataIdAttr: 'data-id',
          handle: '.module-move',
          forceFallback: true,
          bubbleScroll: true,
          scrollSensitivity: 100,
          group: {
            name: 'ceshi',
            pull: false,
            put: true,
          },
          onAdd(evt) {
            if (evt.pullMode == 'clone') {
              moduleID.value++;
              evt.clone.addEventListener('click', function (e) {
                addID.value++;
                let sortableArr = sortableMid.value.toArray();
                let index = (e.target as HTMLElement).attributes['from-key'].value;
                let obj = cloneDeep(formObj[index]);
                obj.id = `${obj.type}${addID.value}`;
                let newSortableArr = filterArr(sortableArr, midArr.value);
                newSortableArr.push(obj);
                midArr.value = newSortableArr;
                midScroll.value = !midScroll.value;
              });
              let index = evt.item.attributes['from-key'].value;
              let obj = cloneDeep(formObj[index]);
              obj.id = `${obj.type}${moduleID.value}`;
              if (obj.type == 'module') {
                evt.item.remove();
                return false;
              }
              midArr.value.forEach((item) => {
                if (item.id == props.midID) {
                  let sortableArr = sortableobj.value.toArray();
                  let newSortableArr = filterArr(sortableArr, item.children);
                  newSortableArr.splice(evt.newIndex as number, 0, obj);
                  item.children = newSortableArr;
                }
              });
              evt.item.remove();
            }
          },
        });
      };

      // 筛选
      const filterArr = (arrID, arrObj) => {
        let newSortableArr: any = [];
        arrID.forEach((item) => {
          arrObj.forEach((it) => {
            if (item == it.id) {
              newSortableArr.push(cloneDeep(it));
            }
          });
        });
        return newSortableArr;
      };

      // 删除表单
      const handleDelete = (item, index) => {
        console.log(item, index, 'item, index');
        createConfirm({
          iconType: 'warning',
          title: '提示',
          content: '此操作会删除该表单, 是否继续?',
          onOk() {
            midArr.value.forEach((item) => {
              if (item.id == props.midID) {
                item.children.splice(index, 1);
              }
            });
          },
        });
      };

      // 添加选项
      const handleAddOption = (_item, index) => {
        let midIndex = 0;
        midArr.value.forEach((it, ind) => {
          if (it.id == props.midID) {
            midIndex = ind;
          }
        });
        if (midArr.value[midIndex].children[index].deleteID.length > 0) {
          midArr.value[midIndex].children[index].options.push({
            label: `选项${midArr.value[midIndex].children[index].deleteID[0]}`,
            value: midArr.value[midIndex].children[index].deleteID[0],
          });
          midArr.value[midIndex].children[index].deleteID.splice(0, 1);
        } else {
          midArr.value[midIndex].children[index].idNum++;
          midArr.value[midIndex].children[index].options.push({
            label: `选项${midArr.value[midIndex].children[index].idNum}`,
            value: midArr.value[midIndex].children[index].idNum,
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
          midArr.value.forEach((item) => {
            if (item.id == props.midID) {
              let sortableArr = sortableobj.value.toArray();
              let newSortableArr = filterArr(sortableArr, item.children);
              item.children = newSortableArr;
            }
          });
        },
      );

      return {
        simpleImage: Empty.PRESENTED_IMAGE_SIMPLE,
        handleDelete,
        handleAddOption,
      };
    },
  });
</script>

<style lang="less" scoped>
  .module-shadow {
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 2px 4px 1px rgb(0 0 0 / 10%);
    margin-bottom: 20px;
    padding: 15px 50px;
  }

  .module-title {
    height: 120px;
  }

  .module-input {
    font-size: @font-size-b4;
  }

  .module-icon {
    text-align: right;
    display: none;

    .app-iconify {
      cursor: pointer;
    }
  }

  .module-item:hover {
    .module-icon {
      display: block;
    }
  }

  .module-number {
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

  .module-dashed {
    border-radius: 2px;
    border: 1px dashed;
    border-color: #fff;
  }

  .module-nav:hover {
    .module-dashed {
      border-color: #d9d9d9;
    }
  }

  .module-type-input {
    height: 30px;
    padding: 4px 11px;
    border-radius: 2px;
    border: 1px solid #d9d9d9;
    color: #aaa;
    margin-left: 11px;
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
    margin-left: 11px;
    color: @primary-color;
    cursor: pointer;
  }

  .module-empty {
    border-radius: 2px;
    border: 1px dashed #aaa;
    padding: 150px 0;
    margin: 0;
  }
</style>
