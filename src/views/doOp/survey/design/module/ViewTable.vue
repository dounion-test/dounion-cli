<!--
 * @Author: 江雪松 576053154@qq.com
 * @Date: 2022-09-06 09:23:51
 * @LastEditors: 江雪松 576053154@qq.com
 * @LastEditTime: 2022-10-19 18:10:12
 * @FilePath: /RuralSurveyPc/src/views/doPc/survey/module/ViewTable.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div>
    <BasicTable @register="registerTable" :isFixedHeader="false">
      <template #bodyCell="{ column, record }">
        <div
          v-if="column.dataIndex == '52044-10'"
          style="text-align: left"
          :style="{ marginLeft: `${record.ml}px` }"
        >
          <span :innerHTML="record['52044-10']"></span>
        </div>
        <div v-if="column.dataIndex == '52044-30'">
          <div v-if="!record['52044-30']"></div>
          <div v-if="record['52044-30'] && record['52044-30'].blankValue">
            {{ record['52044-30'].blankValue }}
          </div>
          <div v-if="record['52044-30'] && record['52044-30'].selectedOptionList.length > 0">
            <span
              v-for="item in record['52044-30'].selectedOptionList"
              :key="item.id"
              v-html="item.optionValue"
            ></span>
          </div>
        </div>
      </template>
    </BasicTable>
  </div>
</template>

<script lang="ts">
  import { cloneDeep } from 'lodash';
  import { defineComponent, nextTick, watch } from 'vue';
  import { BasicTable, useTable, BasicColumn } from '/@/components/Table';

  export default defineComponent({
    components: {
      BasicTable,
    },
    props: {
      records: {
        type: Object,
        default: () => {},
      },
    },
    setup(props) {
      /**
       * table 列表
       */
      const [registerTable, { reload, setColumns, setTableData }] = useTable({
        rowKey: 'id',
        columns: [],
        striped: false,
        immediate: false,
        useSearchForm: false,
        canResize: false,
        showTableSetting: false,
        showIndexColumn: false,
        bordered: true,
        pagination: false,
      });

      /**
       * @description: 将树形数据展开
       * @param {*} tree 树形数据
       * @param {*} name 顶级父级名称
       * @param {*} ml margin初始距离
       * @return {*} 返回一个展开的数组
       */
      const treeToList = (tree: any, name, ml) => {
        const result: any = [...tree];
        for (let i = 0; i < result.length; i++) {
          result[i]['categoryName'] = name;
          // 设置margin距离
          result[i]['ml'] = result[i]['ml'] ? result[i]['ml'] : ml;
          if (!result[i].children) continue;
          result[i].children.forEach((it) => {
            it.ml = result[i].ml + 20;
          });
          result.splice(i + 1, 0, ...result[i].children);
        }
        return result;
      };

      const init = async () => {
        // 设置table colums
        let colums: BasicColumn[] = [
          {
            title: '',
            dataIndex: 'categoryName',
            align: 'center',
            width: 120,
            colSpan: 0,
            customCell: (record) => {
              if (record.isFirst) {
                return { rowSpan: record.count };
              } else {
                return { rowSpan: 0 };
              }
            },
          },
        ];
        let surveyMappingList = cloneDeep(props.records.surveyMappingList);
        surveyMappingList.forEach((item) => {
          switch (item.type) {
            case '52044-10':
              colums.push({
                title: item.typeName,
                dataIndex: item.type,
                align: 'center',
                colSpan: 2,
                ellipsis: false,
              });
              break;
            case '52044-20':
              colums.push({
                title: item.typeName,
                dataIndex: item.type,
                align: 'center',
                width: 80,
              });
              break;
            case '52044-30':
              colums.push({
                title: item.typeName,
                dataIndex: item.type,
                align: 'center',
                width: 250,
                ellipsis: false,
              });
              break;
            case '52044-40':
              colums.push({
                title: item.typeName,
                dataIndex: item.type,
                align: 'center',
                width: 200,
              });
              break;

            default:
              break;
          }
        });
        setColumns(colums);
        // 设置table数据
        let tableArr: any = [];
        let tableData: any = [];
        let categoryArr = cloneDeep(props.records.categoryList);
        await categoryArr.forEach(async (item) => {
          let subjectList = await treeToList(item.subjectList, item.categoryName, 0);
          if (subjectList.length > 0) {
            subjectList[0].isFirst = true;
            subjectList[0].count = subjectList.length;
          }
          tableArr = [...tableArr, ...subjectList];
        });
        await tableArr.forEach((item) => {
          tableData.push({
            ml: item.ml,
            isFirst: item.isFirst ? true : false,
            count: item.count ? item.count : 0,
            categoryName: item.categoryName,
            '52044-10': item.stem,
            '52044-20': item.unit,
            '52044-30': item?.answerDetailList?.length > 0 ? item?.answerDetailList[0] : undefined,
            '52044-40': item.remark,
          });
        });
        setTableData(tableData);
      };

      nextTick(() => init());

      watch(
        () => props.records,
        () => init(),
        { deep: true },
      );

      return {
        registerTable,
      };
    },
  });
</script>
