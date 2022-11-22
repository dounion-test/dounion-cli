<!--
 * @Author: 江雪松 576053154@qq.com
 * @Date: 2022-08-12 09:59:19
 * @LastEditors: 江雪松 576053154@qq.com
 * @LastEditTime: 2022-10-25 14:30:06
 * @FilePath: /rural-revitalization/src/views/expstore/activity/list/module/AddInvite.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div style="width: 98%">
    <SearchWrap :searchList="searchList">
      <template #button>
        <div class="pb-4 text-right relative">
          <a-button class="ai-search-btn" @click="handleRandomSearch" type="primary"
            >随机查询</a-button
          >
          <a-button class="ai-search-btn-all" @click="handleSearchAll" type="primary"
            >查询全部</a-button
          >
        </div>
        <div class="flex justify-between ai-search-random pt-4 mb-4">
          <div class="flex items-center">
            <span class="ai-search-label">姓名：</span>
            <a-input class="flex-1" v-model:value="nameQueryLike" />
          </div>
          <a-button @click="handleOrientSearch" type="primary">定向查询</a-button>
        </div>
      </template>
      <template #inputNumber>
        <span class="ml-2">人</span>
      </template>
    </SearchWrap>
    <div class="pb-10">
      <div
        v-if="orientList.length > 0 || attendList.length > 0 || unAttendList.length > 0"
        class="bg-white ai-orient flex justify-between"
      >
        <div class="ai-orient-wrap">
          <h3 class="mb-4">筛选的专家列表（{{ orientList.length }}人）</h3>
          <ul>
            <ScrollContainer>
              <li v-for="(item, index) in orientList" :key="item.id" class="pb-4">
                <InviteItem
                  :record="item"
                  :itemIndex="index"
                  :isContact="item.isContact"
                  :isAttend="item.isAttend"
                  @change="handleItemChange"
                />
              </li>
            </ScrollContainer>
          </ul>
        </div>
        <div class="ai-orient-wrap">
          <h3 class="mb-4">能出席的专家列表（{{ attendList.length }}人）</h3>
          <ul class="bg-white">
            <ScrollContainer>
              <li v-for="(item, index) in attendList" :key="item.id" class="pb-4">
                <InviteItem
                  :showAction="false"
                  :isAttend="true"
                  :isContact="true"
                  :record="item"
                  :itemIndex="index"
                  @change="handleAttendChange"
                />
              </li>
            </ScrollContainer>
          </ul>
        </div>
        <div class="ai-orient-wrap">
          <h3 class="mb-4">不能出席的专家列表（{{ unAttendList.length }}人）</h3>
          <ul class="bg-white">
            <ScrollContainer>
              <li v-for="(item, index) in unAttendList" :key="item.id" class="pb-4">
                <InviteItem
                  :isAttend="false"
                  :showAction="false"
                  :isContact="true"
                  :record="item"
                  :itemIndex="index"
                  @change="handleUnAttendChange"
                />
              </li>
            </ScrollContainer>
          </ul>
        </div>
      </div>
      <a-empty
        class="!mt-8"
        v-if="orientList.length == 0 && attendList.length == 0 && unAttendList.length == 0"
      />
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref, inject, watch } from 'vue';
  import { Input, Empty } from 'ant-design-vue';
  import SearchWrap from './SearchWrap.vue';
  import InviteItem from './InviteItem.vue';
  import { ScrollContainer } from '/@/components/Container';
  import { cloneDeep } from 'lodash';
  import { searchArr } from '../config/add';
  import { ucenterCodeTree } from '/@/api/common/index';
  import {
    spPersonComboxApi,
    spMarkComboxApi,
    spPersonInventListByRandomApi,
  } from '/@/api/doSp/person/index';

  export default defineComponent({
    components: {
      SearchWrap,
      InviteItem,
      ScrollContainer,
      AInput: Input,
      AEmpty: Empty,
    },
    emits: ['change'],
    setup(_, { emit }) {
      const nameQueryLike = ref('');
      const orientList: any = ref([]);
      const attendList: any = ref([]);
      const unAttendList: any = ref([]);
      const searchList: any = ref(cloneDeep(searchArr));
      const editInfo: any = inject('editInfo');

      //获取筛选条件
      const getFilterData = async () => {
        const markIdQueryInData = await spMarkComboxApi();
        const jobTitleIdData = await ucenterCodeTree({ type: '10001-52052' });
        markIdQueryInData.forEach((item) => {
          item.checked = false;
          item.name = item.speMarkName;
          item.value = item.id;
        });
        jobTitleIdData.forEach((item) => {
          item.children.forEach((it) => {
            it.checked = false;
          });
        });
        searchList.value[0].options = [...markIdQueryInData];
        searchList.value[1].options = [...jobTitleIdData];
      };
      getFilterData();

      // 定向查询
      const spPersonCombox = async (obj) => {
        let res = await spPersonComboxApi(obj);
        let attendListIds = attendList.value.map((item) => item.id);
        let unAttendListIds = unAttendList.value.map((item) => item.id);
        res.forEach((item) => {
          if (attendListIds.indexOf(item.id) != -1) {
            item.isContact = true;
            item.isAttend = true;
          } else if (unAttendListIds.indexOf(item.id) != -1) {
            item.isContact = true;
            item.isAttend = false;
          } else {
            item.isContact = false;
            item.isAttend = false;
          }
        });
        orientList.value = res;
      };

      // 全部查询
      const spPersonAllCombox = async (obj) => {
        let res = await spPersonComboxApi(obj);
        let attendListIds = attendList.value.map((item) => item.id);
        let unAttendListIds = unAttendList.value.map((item) => item.id);
        let ids = [...attendListIds, ...unAttendListIds];
        let arr: any = [];
        res.forEach((item) => {
          item.isContact = false;
          item.isAttend = false;
          if (ids.indexOf(item.id) == -1) {
            arr.push(item);
          }
        });
        orientList.value = arr;
      };

      // 随机查询
      const spPersonInventListByRandom = async (obj) => {
        let res = await spPersonInventListByRandomApi(obj);
        let attendListIds = attendList.value.map((item) => item.id);
        let unAttendListIds = unAttendList.value.map((item) => item.id);
        let ids = [...attendListIds, ...unAttendListIds];
        let arr: any = [];
        res.forEach((item) => {
          item.isContact = false;
          item.isAttend = false;
          if (ids.indexOf(item.id) == -1) {
            arr.push(item);
          }
        });
        orientList.value = arr;
      };

      // 点击随机查询按钮
      const handleRandomSearch = () => {
        let obj = {
          count: undefined,
          markIdQueryIn: undefined,
          jobTitleId: undefined,
          status: '52002-10',
        };
        searchList.value.forEach((item) => {
          if (item.type == 'tag' || item.type == 'treeTag') {
            obj[item.valueName] = item.value.join(',');
          } else {
            obj[item.valueName] = item.value ? item.value : undefined;
          }
        });
        spPersonInventListByRandom(obj);
      };

      // 点击定向查询按钮
      const handleOrientSearch = () => {
        spPersonCombox({ nameQueryLike: nameQueryLike.value, status: '52002-10' });
      };

      // 查询全部
      const handleSearchAll = () => {
        spPersonAllCombox({ nameQueryLike: '', status: '52002-10' });
      };

      const handleItemChange = (checked, index, name) => {
        orientList.value[index][name] = checked;
        let id = orientList.value[index].id;
        let hasAttendItem = false;
        let hasUnAttendItem = false;
        let orientContactIndex = 0;
        let orientUnAttendIndex = 0;
        let isContact = orientList.value[index].isContact;
        let isAttend = orientList.value[index].isAttend;
        attendList.value.forEach((item, ind) => {
          if (item.id == id) {
            hasAttendItem = true;
            orientContactIndex = ind;
          }
        });
        unAttendList.value.forEach((item, ind) => {
          if (item.id == id) {
            hasUnAttendItem = true;
            orientUnAttendIndex = ind;
          }
        });
        // 能出席
        if (!hasAttendItem) {
          isContact && isAttend && attendList.value.push(orientList.value[index]);
        } else {
          if (!isContact || !isAttend) {
            attendList.value.splice(orientContactIndex, 1);
          }
        }
        // 不能出席
        if (!hasUnAttendItem) {
          isContact && !isAttend && unAttendList.value.push(orientList.value[index]);
        } else {
          if (!isContact || isAttend) {
            unAttendList.value.splice(orientUnAttendIndex, 1);
          }
        }

        emit('change', attendList.value, unAttendList.value);
      };

      const handleAttendChange = (index) => {
        let attendItem = cloneDeep(attendList.value[index]);
        attendItem.isAttend = false;
        orientList.value.forEach((item) => {
          if (item.id == attendItem.id) {
            item.isAttend = false;
          }
        });
        unAttendList.value.push(attendItem);
        attendList.value.splice(index, 1);
      };

      const handleUnAttendChange = (index) => {
        let unAttendItem = cloneDeep(unAttendList.value[index]);
        unAttendItem.isAttend = true;
        orientList.value.forEach((item) => {
          if (item.id == unAttendItem.id) {
            item.isAttend = true;
          }
        });
        attendList.value.push(unAttendItem);
        unAttendList.value.splice(index, 1);
      };

      watch(
        () => editInfo,
        () => {
          let acceptList = cloneDeep(editInfo.value.acceptList);
          let unAcceptList = cloneDeep(editInfo.value.unAcceptList);
          acceptList.forEach((item) => {
            item.isContact = true;
            item.isAttend = true;
          });
          unAcceptList.forEach((item) => {
            item.isContact = true;
            item.isAttend = false;
          });
          attendList.value = acceptList;
          unAttendList.value = unAcceptList;
          emit('change', attendList.value, unAttendList.value);
        },
        { deep: true },
      );

      return {
        nameQueryLike,
        orientList,
        searchList,
        attendList,
        unAttendList,
        handleSearchAll,
        handleOrientSearch,
        handleRandomSearch,
        handleItemChange,
        handleAttendChange,
        handleUnAttendChange,
      };
    },
  });
</script>

<style lang="less" scoped>
  .ai-search-btn {
    position: absolute;
    right: 90px;
    top: -42px;
  }

  .ai-search-btn-all {
    position: absolute;
    right: 0px;
    top: -42px;
  }

  .ai-search-label {
    display: inline-block;
    // text-indent: 2em;
  }

  .ai-search-random {
    border-top: 1px solid #d9d9d9;
  }

  .ai-orient {
    padding: 20px 30px;
    margin-top: 20px;
    border: 1px solid #d9d9d9;
  }

  .ai-orient-wrap {
    width: 32%;
    border-radius: 2px;

    h3 {
      font-size: @font-size-b2;
    }

    ul {
      height: 500px;
      border: 1px solid #d9d9d9;

      li {
        padding: 10px 20px;
      }
    }
  }

  [data-theme='dark'] {
    .ai-search-random,
    .ai-orient,
    .ai-orient-wrap ul {
      border-color: #303030;
    }
  }
</style>
