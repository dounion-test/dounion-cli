<!--
 * @Author: 江雪松 576053154@qq.com
 * @Date: 2022-09-14 11:42:59
 * @LastEditors: 江雪松 576053154@qq.com
 * @LastEditTime: 2022-09-14 17:57:51
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
      <div>全文</div>
      <div>收藏</div>
    </div>
  </PageWrapper>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { Typography, Row, Col, Divider } from 'ant-design-vue';
  import { PageWrapper } from '/@/components/Page';

  export default defineComponent({
    name: 'GeneralInfoSearchView',
    components: {
      PageWrapper,
      ARow: Row,
      ACol: Col,
      ADivider: Divider,
      ATypographyTitle: Typography.Title,
    },
    setup() {
      return {
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
          {
            label: '【摘要】',
            value:
              '阿克琉斯的快乐；卡上的坎坷；阿三开空调开阿克琉斯的快乐；卡上的坎坷；阿三开空调开阿克琉斯的快乐；卡上的坎坷；阿三开空调开阿克琉斯的快乐；卡上的坎坷；阿三开空调开阿克琉斯的快乐；卡上的坎坷；阿三开空调开阿克琉斯的快乐；卡上的坎坷；阿三开空调开阿克琉斯的快乐；卡上的坎坷；阿三开空调开阿克琉斯的快乐；卡上的坎坷；阿三开空调开阿克琉斯的快乐；卡上的坎坷；阿三开空调开阿克琉斯的快乐；卡上的坎坷；阿三开空调开阿克琉斯的快乐；卡上的坎坷；阿三开空调开阿克琉斯的快乐；卡上的坎坷；阿三开空调开阿克琉斯的快乐；卡上的坎坷；阿三开空调开',
            span: 24,
          },
          {
            label: '【英文摘要】',
            value:
              ' Kklasdlls lsdal;asdl;asl;da;dl;asldasifasjkdkasjdhjasjk jkasdjkasjdaskjdkajk kasjdkaskjdkahfajka jkaksjdkas kjasjkdjkasfhe uedeu udeu ueuduehuwoasi shdsudias idisaooid iisdioasi wiidjhaoojfcw iisi diqoowihoalfhejfkldkxucui ieii idjqwjidi wiqhdhqwhugdh ioqiowqdioasidj jiasjdiaoshuqwhd oqdiojqw dhsa hduwidjsiajsq jdijaisdj w  qidisioqwpodsia djiwjioqfhshax iqwj idjqjwi djoiq jwd wqiodjoofqhduw iwq iidoiaso doiwqo iodisaihqwu diooasidjhfebd',
            span: 24,
          },
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
    display: flex;

    .label {
      display: block;
      width: 120px;
      color: #1c1f23;
    }

    .con {
      flex: 1;
    }
  }
  [data-theme='dark'] {
    .view-bar {
      background-color: #555;
    }
    .view-item {
      .label {
        color: rgba(255, 255, 255, 0.65);
      }
    }
  }
</style>
