<template>
  <PageWrapper fixedHeight contentFullHeight>
    <a-row id="sortableBox" class="h-full" :gutter="18">
      <a-col :span="5">
        <LeftWrap @addfrom="handleAddFrom" />
      </a-col>
      <a-col :span="14" class="h-full">
        <MidWrap :midArr="midArr" ref="midWrapRef" :isSave="isSave" @item-click="handleItemClick" />
      </a-col>
      <a-col :span="5" class="h-full">
        <RightWrap
          @save="handleSave"
          :midItem="midItem"
          :midIndex="midIndex"
          :moduleIndex="moduleIndex"
        />
      </a-col>
    </a-row>
  </PageWrapper>
</template>

<script lang="ts">
  import { defineComponent, ref, onMounted, nextTick, provide, reactive, toRefs } from 'vue';
  import LeftWrap from './module/LeftWrap.vue';
  import MidWrap from './module/MidWrap.vue';
  import RightWrap from './module/RightWrap.vue';
  import { PageWrapper } from '/@/components/Page';
  import { Row, Col } from 'ant-design-vue';
  import { leftArr, formObj } from './config';
  import Sortable from 'sortablejs';
  import { cloneDeep } from 'lodash';

  export default defineComponent({
    components: {
      MidWrap,
      LeftWrap,
      RightWrap,
      PageWrapper,
      ARow: Row,
      ACol: Col,
    },
    setup() {
      const midArr = ref<any[]>([]);
      const addID = ref(0);
      const isSave = ref(false);
      const midWrapRef = ref<InstanceType<typeof MidWrap>>();
      const sortableobj = ref();
      const state = reactive({
        midItem: {},
        midIndex: 0,
        moduleIndex: -1,
      });

      // 注册拖拽
      const rowDrop = () => {
        const sortableLeft = document.querySelector(`#sortableBox .ant-col .left`);
        const sortableMid = document.querySelector(`#sortableBox .ant-col .middle`);
        Sortable.create(sortableLeft as HTMLElement, {
          animation: 100,
          sort: false,
          forceFallback: true,
          group: {
            name: 'ceshi',
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
            name: 'ceshi',
            // 是否允许拖出
            pull: false,
            // 是否允许拖入
            put: true,
          },
          // 元素从一个列表拖拽到另一个列表
          onAdd(evt) {
            if (evt.pullMode == 'clone') {
              addID.value++;
              let sortableArr = sortableobj.value.toArray();
              let newSortableArr: any = [];
              // 给克隆后的dom添加监听点击事件
              evt.clone.addEventListener('click', function (e) {
                addID.value++;
                let index = (e.target as HTMLElement).attributes['from-key'].value;
                let obj = cloneDeep(formObj[index]);
                obj.id = `${obj.type}${addID.value}`;
                let newSortableArr: any = filterArr(sortableArr);
                newSortableArr.push(obj);
                midArr.value = newSortableArr;
                midWrapRef.value?.scrollBottom();
              });
              let index = evt.item.attributes['from-key'].value;
              let obj = cloneDeep(formObj[index]);
              obj.id = `${obj.type}${addID.value}`;
              newSortableArr = filterArr(sortableArr);
              newSortableArr.splice(evt.newIndex as number, 0, obj);
              midArr.value = newSortableArr;
              evt.item.remove();
            }
          },
          onEnd(evt) {
            console.log(evt, 'evt');
          },
        });
      };

      // 点击左侧列表按钮
      const handleAddFrom = (item) => {
        addID.value++;
        let sortableArr = sortableobj.value.toArray();
        let obj = cloneDeep(formObj[item.value]);
        obj.id = `${obj.type}${addID.value}`;
        let newSortableArr: any = filterArr(sortableArr);
        newSortableArr.push(obj);
        midArr.value = newSortableArr;
        midWrapRef.value?.scrollBottom();
      };

      // 点击中间列表
      const handleItemClick = (item, midIndex, moduleIndex) => {
        state.midItem = item;
        state.midIndex = midIndex;
        state.moduleIndex = moduleIndex;
      };

      const handleSave = () => {
        let newSortableArr: any = [];
        let sortableArr = sortableobj.value.toArray();
        newSortableArr = filterArr(sortableArr);
        midArr.value = newSortableArr;
        isSave.value = !isSave.value;
        console.log(midArr.value, 'midArr.value');
      };

      const filterArr = (arr) => {
        let newSortableArr: any = [];
        arr.forEach((item) => {
          midArr.value.forEach((it) => {
            if (item == it.id) {
              newSortableArr.push(cloneDeep(it));
            }
          });
        });
        return newSortableArr;
      };

      onMounted(() => {
        nextTick(() => {
          rowDrop();
        });
      });

      provide('midArr', midArr);
      provide('addID', addID);
      provide('sortableMid', sortableobj);

      return {
        ...toRefs(state),
        isSave,
        leftArr,
        midArr,
        midWrapRef,
        handleAddFrom,
        handleSave,
        handleItemClick,
      };
    },
  });
</script>

<style lang="less">
  #sortableBox {
    ul {
      margin-bottom: 0;
    }

    .show-from {
      width: 100%;
      display: none;
    }

    .middle {
      min-height: 500px;
    }

    .middle .show-from {
      display: block;
    }

    .middle .show-btn {
      display: none;
    }
  }
</style>
