<template>
  <h2
    ><span v-if="data.docType">{{ `【${data.docType}】` }}</span
    >{{ props.data.title }}</h2
  >
  <div class="doc-hd"
    ><div class="hd-left"
      ><span>ID编号：{{ props.data.code || '-' }}</span
      ><span>来源：{{ props.data.sourceMedia || '-' }}</span
      ><span>作者：{{ props.data.author || '-' }}</span
      ><span>属性分类：{{ props.data.atrType || '-' }}</span></div
    ><div class="hd-right">发布时间：{{ props.data.pulishTime || '-' }}</div></div
  >
  <div class="doc-bd">
    <p v-html="props.data.content"></p>
    <p class="annex" v-if="data.originalAttachments && data.originalAttachments.length"
      >附件：<ViewFile :fileList="data.originalAttachments"
    /></p>
    <ul class="other-info">
      <li class="single">关键词：{{ props.data.keywordNames || '-' }}</li>
      <li class="single">媒体机构：{{ props.data.orgNames || '-' }}</li>
      <li class="single">网页地址：{{ props.data.webAddr || '-' }}</li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
  import ViewFile from '/@/views/doSp/sciSubjManage/sciSubject/modules/viewFile.vue';
  const props = defineProps({
    data: { type: Object, default: () => {} },
  });
</script>
