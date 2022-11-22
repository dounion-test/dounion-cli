<!--
 * @Author: 江雪松 576053154@qq.com
 * @Date: 2022-09-14 15:48:13
 * @LastEditors: 江雪松 576053154@qq.com
 * @LastEditTime: 2022-09-14 16:29:47
 * @FilePath: /rural-revitalization/src/views/doInfo/synthesize/expert/expertView.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <PageWrapper contentFullHeight>
    <div class="view-con">
      <div class="view-left mr-10">
        <img class="view-img" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />
        <div class="ml-5 mb-2">姓名：张天住</div>
        <div class="ml-5 mb-2">性别：男</div>
        <div class="ml-5 mb-2">所在单位：测试单位</div>
        <div class="ml-5 mb-2">单位所在地区：北京</div>
      </div>
      <div class="flex-1">
        <div class="mb-4 mt-4">籍贯：湖南宜章</div>
        <div class="mb-4">出生年月：1967年11月</div>
        <div class="mb-4">学位：园艺学博士</div>
        <div class="mb-4">研究方向：柑橘品种选良和品种选育研究</div>
        <div class="mb-4"
          >教育经历：1981年从湖南农业大学本科毕业后，考取农业大学研究生，先后获硕士、博士学位</div
        >
        <div class="mb-4">职称：中国工程院院士</div>
        <div
          >职务：上课的坎坷、撒打算打算打算的、撒打算打算打算的、撒打算打算打算风味的、撒打算打算打算的撒打算大、撒打算大打算的撒打算打算的阿斯顿、撒大色分为册、哦够薄够开放你快乐文件创建</div
        >
      </div>
    </div>
  </PageWrapper>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { PageWrapper } from '/@/components/Page';

  export default defineComponent({
    components: {
      PageWrapper,
    },
    setup() {
      return {};
    },
  });
</script>

<style lang="less" scoped>
  .view-con {
    background: #b8cdb3;
    display: flex;
    padding: 30px;
  }

  .view-left {
    background: #fff;
    width: 300px;
    padding: 40px;
  }

  .view-img {
    width: 120px;
    height: 160px;
    margin: 0 auto;
    margin-bottom: 16px;
  }
</style>
