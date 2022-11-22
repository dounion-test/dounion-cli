<template>
  <h2
    ><span v-if="data.docType">{{ `【${data.docType}】` }}</span
    >{{ props.data.title }}</h2
  >
  <h2>{{ props.data.titleEn }}</h2>
  <div class="doc-hd"
    ><div class="hd-left"
      ><span>ID编号：{{ props.data.code || '-' }}</span
      ><span>来源媒体：{{ props.data.sourceMedia || '-' }}</span
      ><span>作者：{{ props.data.author || '-' }}</span>
      <span v-if="props.data.pagecount && props.data.jumpPage"
        >总{{ props.data.pagecount }}页数，跳转至{{ props.data.jumpPage }}页</span
      ></div
    ><div class="hd-right">收录时间：{{ props.data.recordTime || '-' }}</div></div
  >
  <div class="doc-bd">
    <div class="abstract-con">
      <p>摘要：</p>
      <p v-html="props.data.abstractCn"></p>
    </div>
    <p class="annex" v-if="data.originalAttachments && data.originalAttachments.length"
      >附件：<ViewFile :fileList="data.originalAttachments"
    /></p>
    <ul class="other-info">
      <li class="single">中文刊名：{{ props.data.name }} </li>
      <li class="single">英文刊名: {{ props.data.nameEn }} </li>
      <li>cnno号：{{ props.data.cnnoNumber || '-' }}</li>
      <li>issn号：{{ props.data.issnNumber || '-' }}</li>
      <li class="single">基金：{{ props.data.fund || '-' }}</li>
      <li>年：{{ props.data.year || '-' }}</li>
      <li>卷：{{ props.data.volume || '-' }}</li>
      <li>第一作者：{{ props.data.firstAuthor || '-' }}</li>
      <li>期：{{ props.data.phase || '-' }}</li>
      <li>DOI：{{ props.data.doi || '-' }}</li>
      <li>带归属机构的作者：{{ props.data.authorWithAff || '-' }}</li>
      <li>文献语言：{{ props.data.docLanguage || '-' }}</li>
      <li>PubMed ID：{{ props.data.pubmedId || '-' }}</li>
      <li class="single">机构：{{ props.data.orgNames || '-' }}</li>
      <li class="single">专家：{{ props.data.expertNames || '-' }}</li>
      <li class="single">中文关键词：{{ props.data.keywordNames || '-' }}</li>
      <li class="single">英文关键词：{{ props.data.keywordEnNames || '-' }}</li>
      <li class="single">机构：{{ props.data.newsOrgName || '-' }}</li>
      <li class="single">全文地址：{{ props.data.webAddr || '-' }}</li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
  import ViewFile from '/@/views/doSp/sciSubjManage/sciSubject/modules/viewFile.vue';
  const props = defineProps({
    data: { type: Object, default: () => {} },
  });
</script>
