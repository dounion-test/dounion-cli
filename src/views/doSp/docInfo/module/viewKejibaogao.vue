<template>
  <h2
    ><span v-if="data.docType">{{ `【${data.docType}】` }}</span
    >{{ props.data.title }}</h2
  >
  <h2>{{ props.data.titleEn }}</h2>
  <div class="doc-hd"
    ><div class="hd-left"
      ><span>报告编号：{{ props.data.code || '-' }}</span
      ><span>文章类型：{{ props.data.articleType || '-' }}</span
      ><span>作者：{{ props.data.author || '-' }}</span></div
    ><div class="hd-right">发布时间：{{ props.data.pulishTime || '-' }}</div></div
  >
  <div class="doc-bd">
    <div class="abstract-con">
      <p>摘要：</p>
      <p v-html="props.data.abstractCn"></p>
      <p v-html="props.data.abstractEn"></p>
    </div>
    <p v-html="props.data.content"></p>
    <p v-html="props.data.contentEn"></p>
    <p class="annex" v-if="data.originalAttachments && data.originalAttachments.length"
      >附件：<ViewFile :fileList="data.originalAttachments"
    /></p>
    <ul class="other-info">
      <li class="single">专家：{{ props.data.expertNames || '-' }}</li>
      <li class="single">机构：{{ props.data.orgNames || '-' }}</li>
      <li class="single">中文标签：{{ props.data.label || '-' }}</li>
      <li class="single">英文标签：{{ props.data.labelEn || '-' }}</li>
      <li class="single">关键词：{{ props.data.keywordNames || '-' }}</li>
      <li>信息源国家：{{ props.data.country || '-' }}</li>
      <li>信息源城市：{{ props.data.city || '-' }}</li>
      <li class="single">信息源网址：{{ props.data.webAddr || '-' }}</li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
  import ViewFile from '/@/views/doSp/sciSubjManage/sciSubject/modules/viewFile.vue';
  const props = defineProps({
    data: { type: Object, default: () => {} },
  });
</script>
