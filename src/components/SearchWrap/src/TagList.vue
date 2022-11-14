<!--
 * @Author: 江雪松 576053154@qq.com
 * @Date: 2022-08-19 11:58:00
 * @LastEditors: 江雪松 576053154@qq.com
 * @LastEditTime: 2022-10-26 16:53:33
 * @FilePath: /rural-revitalization/src/components/SearchWrap/src/TagList.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <ul v-if="isCategory" class="category-tag">
    <li
      v-for="(item, index) in categoryList"
      :key="item.value"
      class="flex flex-wrap category-tag-li"
    >
      <strong>{{ item.name }}：</strong>
      <div class="flex-1">
        <a-checkable-tag
          class="search-tag"
          @change="(e) => categoryCheckChange(e, index, ind)"
          v-for="(it, ind) in item.children"
          v-model:checked="it.checked"
          :key="ind"
          :title="it[record.labelField]"
        >
          {{ it[record.labelField] }}
        </a-checkable-tag>
      </div>
    </li>
  </ul>
  <template v-else>
    <a-checkable-tag
      class="search-tag"
      @change="(e) => handleCheckChange(e, index)"
      v-for="(it, index) in list"
      v-model:checked="it.checked"
      :key="index"
      :title="it[record.labelField]"
    >
      {{ it[record.labelField] }}
    </a-checkable-tag>
  </template>
</template>

<script lang="ts">
  import { defineComponent, ref, inject, watch } from 'vue';
  import { Tag } from 'ant-design-vue';

  export default defineComponent({
    components: {
      ACheckableTag: Tag.CheckableTag,
    },
    props: {
      itemIndex: Number,
      record: {
        type: Object,
        default: () => {},
      },
    },
    emits: ['change'],
    setup(props, { emit }) {
      let allItem = {
        [props.record.labelField]: '全部',
        [props.record.valueField]: 0,
        checked: true,
      };
      const list: any = ref([]);
      const isReset: any = inject('isReset');
      const closeField: any = inject('closeField');
      const isCategory = ref(false);
      const categoryList: any = ref([]);

      //获取筛选条件
      const getFilterData = async () => {
        let res: any = await props.record.api(props.record.searchParams);
        // 判断返回的数据（data下）是否还有一层数据
        if (props.record.resultField) {
          // 判断是否有分类
          if (props.record?.isChildren) {
            isCategory.value = true;
            res[props.record.resultField].forEach((i) =>
              i.children.forEach((j) => (j.checked = false)),
            );
            categoryList.value = [...res[props.record.resultField]];
          } else {
            res[props.record.resultField].forEach((item) => {
              item.checked = false;
            });
            list.value = [...res[props.record.resultField]];
          }
        } else {
          // 判断是否有分类
          if (props.record?.isChildren) {
            isCategory.value = true;
            res.forEach((i) => i.children.forEach((j) => (j.checked = false)));
            categoryList.value = [...res];
          } else {
            res.forEach((item) => {
              item.checked = false;
            });
            list.value = [...res];
          }
        }
        // 判断是否需要加全部选项 (有分类的不添加全部选项)
        if (props.record.hasAll && !props.record.isChildren) {
          list.value.unshift(allItem);
        }
        //判断是否多级联动
        if (props.record.unlink) {
        }
      };

      // 判断是接口获取，还是本地数据
      if (!props.record?.options && !props.record?.options?.length) {
        getFilterData();
      } else {
        list.value = props.record.options as any;
      }

      const handleCheckChange = (checked, index) => {
        let optionsValue = list.value[index][props.record.valueField];
        // 判断多选还是单选
        if (optionsValue) {
          if (checked) {
            // 判断选择的是不是全部按钮
            if (props.record.hasAll) {
              // 如果有全部选项让他为false
              if (props.record.hasAll) {
                list.value[0].checked = false;
              }
            } else {
              // 判断是不是多选
              if (!props.record.isMultiple) {
                list.value.forEach((item) => {
                  item.checked = false;
                });
              }
            }
          }
        } else {
          list.value.forEach((item) => {
            item.checked = false;
          });
        }
        list.value[index].checked = checked;
        let ids: any = [];
        list.value.forEach((item) => {
          if (item.checked) {
            // item[props.record.valueField] && ids.push(item);
            // props.record.hasAll && ids.push(item);
            if (props.record.hasAll) {
              item[props.record.valueField] && ids.push(item);
            } else {
              ids.push(item);
            }
          }
        });
        emit('change', ids, props.itemIndex);
      };

      const categoryCheckChange = (checked, index, ind) => {
        // 如果是单选
        if (checked && !props.record.isMultiple) {
          categoryList.value.forEach((item) => {
            item.children.forEach((it) => {
              it.checked = false;
            });
          });
        }
        categoryList.value[index]['children'][ind].checked = checked;
        let ids: any = [];
        categoryList.value.forEach((item) => {
          item.children.forEach((it) => {
            if (it.checked) {
              ids.push(it);
            }
          });
        });
        emit('change', ids, props.itemIndex);
      };

      watch(
        () => props.record.searchParams,
        () => {
          getFilterData();
        },
        { deep: true },
      );

      watch(
        () => isReset.value,
        () => {
          list.value.forEach((item) => {
            item.checked = false;
          });
          isCategory.value &&
            categoryList.value.forEach((item) => {
              item.children.forEach((j) => {
                j.checked = false;
              });
            });
        },
        { deep: true },
      );

      watch(
        () => closeField.value,
        () => {
          if (closeField.value == props.record.field) {
            list.value.forEach((item) => {
              item.checked = false;
            });
            isCategory.value &&
              categoryList.value.forEach((item) => {
                item.children.forEach((j) => {
                  j.checked = false;
                });
              });
          }
        },
        { deep: true },
      );

      return {
        list,
        handleCheckChange,

        isCategory,
        categoryList,
        categoryCheckChange,
      };
    },
  });
</script>

<style lang="less" scoped>
  .search-tag {
    width: 95px;
    overflow: hidden;
    text-overflow: ellipsis;
    padding: 0;
    text-align: center;
  }

  .category-tag-li {
    line-height: 32px;
  }
</style>
