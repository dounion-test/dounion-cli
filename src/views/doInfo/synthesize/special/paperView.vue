<!--
 * @Author: 江雪松 576053154@qq.com
 * @Date: 2022-09-14 11:42:59
 * @LastEditors: 江雪松 576053154@qq.com
 * @LastEditTime: 2022-09-14 15:05:39
 * @FilePath: /rural-revitalization/src/views/doInfo/synthesize/dynamicsJ/view.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <PageWrapper contentFullHeight>
    <a-typography-title :level="4" class="text-center !my-4"
      >【热点事件】奉贤区的乡村治理“三部曲”</a-typography-title
    >
    <a-row :gutter="[10, 0]">
      <a-col v-for="(item, index) in schemasData" :key="index" :span="item.span || 12">
        <div class="view-item"
          ><span class="label">{{ item.label }}</span
          ><span class="con">{{ item.value }}</span></div
        >
        <a-divider class="!my-3" style="border-color: rgba(0, 0, 0, 0.2)" dashed />
      </a-col>
    </a-row>
    <div class="view-bar my-4">
      <div>预览</div>
      <div>收藏</div>
    </div>
    <div class="content">{{ text }}</div>
    <div class="view-bar my-4">
      <div>【相关文献】</div>
    </div>
    <ul>
      <li class="my-4 ml-2" v-for="(item, index) in list" :key="index"
        >[{{ index + 1 }}] {{ item }}</li
      >
    </ul>
  </PageWrapper>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { Typography, Row, Col, Divider } from 'ant-design-vue';
  import { PageWrapper } from '/@/components/Page';

  export default defineComponent({
    components: {
      PageWrapper,
      ARow: Row,
      ACol: Col,
      ADivider: Divider,
      ATypographyTitle: Typography.Title,
    },
    setup() {
      return {
        text: `
        本申请实施例子提供了一种一种基于非人灵长类动物的立体定位PET-MRI脑模板建立的方法，本申请实施例子提供了一种一种基于非人灵长类动物的立体定位PET-MRI脑模板建立的方法，本申请实施例子提供了一种一种基于非人灵长类动物的立体定位PET-MRI脑模板建立的方法，本申请实施例子提供了一种一种基于非人灵长类动物的立体定位PET-MRI脑模板建立的方法，本申请实施例子提供了一种一种基于非人灵长类动物的立体定位PET-MRI脑模板建立的方法，本申请实施例子提供了一种一种基于非人灵长类动物的立体定位PET-MRI脑模板建立的方法，本申请实施例子提供了一种一种基于非人灵长类动物的立体定位PET-MRI脑模板建立的方法，本申请实施例子提供了一种一种基于非人灵长类动物的立体定位PET-MRI脑模板建立的方法，本申请实施例子提供了一种一种基于非人灵长类动物的立体定位PET-MRI脑模板建立的方法…
        `,
        schemasData: [
          {
            label: '【发布时间】',
            value: '2022-03-11',
          },
          {
            label: '【效力级别】',
            value: '部门章规及文件',
          },
          {
            label: '【发布时间】',
            value: '2022-03-11',
          },
          {
            label: '【法规类别】',
            value: '地方规范性文件',
          },
          {
            label: '【时效性】',
            value: '现行有效',
          },
          {
            label: '【发文字号】',
            value: '林规发[2022]20',
          },
          {
            label: '【发布单位】',
            value: '裤短裤长裤短裤长裤短裤长裤短裤川端康成看到我我死敌v吃开始看看',
            span: 24,
          },
          {
            label: '【关键词】',
            value: '阿克琉斯的快乐；卡上的坎坷；阿三开空调开',
            span: 24,
          },
        ],
        list: [
          '国内外实验动物法制化管理现状比较[J]. 巩和凌子,孔琪,刘江宁.  中国比较医学杂志. 2020(09)',
          '国内外实验动物法制化管理现状比较[J]. 巩和凌子,孔琪,刘江宁.  中国比较医学杂志. 2020(09)',
          '国内外实验动物法制化管理现状比较[J]. 巩和凌子,孔琪,刘江宁.  中国比较医学杂志. 2020(09)',
          '国内外实验动物法制化管理现状比较[J]. 巩和凌子,孔琪,刘江宁.  中国比较医学杂志. 2020(09)',
          '国内外实验动物法制化管理现状比较[J]. 巩和凌子,孔琪,刘江宁.  中国比较医学杂志. 2020(09)',
          '国内外实验动物法制化管理现状比较[J]. 巩和凌子,孔琪,刘江宁.  中国比较医学杂志. 2020(09)',
          '国内外实验动物法制化管理现状比较[J]. 巩和凌子,孔琪,刘江宁.  中国比较医学杂志. 2020(09)',
          '国内外实验动物法制化管理现状比较[J]. 巩和凌子,孔琪,刘江宁.  中国比较医学杂志. 2020(09)',
          '国内外实验动物法制化管理现状比较[J]. 巩和凌子,孔琪,刘江宁.  中国比较医学杂志. 2020(09)',
          '国内外实验动物法制化管理现状比较[J]. 巩和凌子,孔琪,刘江宁.  中国比较医学杂志. 2020(09)',
        ],
      };
    },
  });
</script>

<style lang="less" scoped>
  .view-bar {
    display: flex;
    justify-content: space-between;
    background: #d9d9d9;
    padding: 10px;
    border-radius: 2px;
  }

  .content {
    word-break: break-all;
    white-space: pre-line;
  }

  .view-item {
    .label {
      display: inline-block;
      width: 120px;
      color: #1c1f23;
    }
  }
</style>
