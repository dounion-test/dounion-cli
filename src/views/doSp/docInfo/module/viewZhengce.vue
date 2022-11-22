<template>
  <h2
    ><span v-if="data.docType">{{ `【${data.docType}】` }}</span
    >{{ props.data.title }}</h2
  >
  <div class="doc-hd"
    ><div class="hd-left"
      ><span>政策法规编号：{{ props.data.code || '-' }}</span
      ><span>来源网站：{{ props.data.websiteName || '-' }}</span
      ><span>类型：{{ props.data.policyType || '-' }}</span></div
    ><div class="hd-right"
      ><span v-if="props.data.publishCompany">发布单位：{{ props.data.publishCompany }}</span
      ><span>发布时间：{{ props.data.pulishTime || '-' }}</span></div
    ></div
  >
  <div class="doc-bd">
    <div class="abstract-con">
      <p>文摘：</p>
      <p v-html="props.data.abstractCn"></p>
    </div>
    <p v-html="props.data.content"></p>
    <p class="annex" v-if="data.originalAttachments && data.originalAttachments.length"
      >附件：<ViewFile :fileList="data.originalAttachments"
    /></p>
    <div class="remark-con">
      <p v-html="props.data.remark"></p>
    </div>
    <ul class="other-info">
      <li
        >国家地区：{{
          props.data.arear || `${props.data.country ? `-${props.data.country}` : ''}` || '-'
        }}</li
      >
      <li class="single">机构：{{ props.data.orgNames || '-' }}</li>
      <li>修订时间：{{ props.data.reviseTime || '-' }}</li>
      <li>实施时间：{{ props.data.implTime || '-' }}</li>
      <li class="single">关键词：{{ props.data.keywordNames || '-' }}</li>
      <li class="single">来源网站链接：{{ props.data.webAddr || '-' }}</li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
  import ViewFile from '/@/views/doSp/sciSubjManage/sciSubject/modules/viewFile.vue';
  const props = defineProps({
    data: { type: Object, default: () => {} },
  });
</script>
