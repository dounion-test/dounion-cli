<template>
  <h2
    ><span v-if="data.docType">{{ `【${data.docType}】` }}</span
    >{{ props.data.title }}</h2
  >
  <div class="doc-hd"
    ><div class="hd-left"
      ><span>项目名称：{{ props.data.name || '-' }}</span
      ><span
        >费用：{{ props.data.cost ? `${props.data.cost}${props.data.costUnitName}` : '-' }}</span
      ><span>来源基金名称：{{ props.data.sourceFundName || '-' }}</span></div
    ><div class="hd-right">通过日期：{{ props.data.passDate || ' - ' }}</div></div
  >
  <div class="doc-bd">
    <div class="abstract-con">
      <p>摘要：</p>
      <p v-html="props.data.abstractCn"></p>
    </div>
    <p class="annex" v-if="props.data.originalAttachments && props.data.originalAttachments.length"
      >附件：<ViewFile :fileList="props.data.originalAttachments"
    /></p>
    <ul class="other-info">
      <li>申请号：{{ props.data.applyCode || '-' }}</li>
      <li>申请日期：{{ props.data.applyDate || '-' }}</li>
      <li>地区代码：{{ props.data.publicCountryCode || '-' }}</li>
      <li>专利识别代码：{{ props.data.publicIdentifyCode || '-' }}</li>
      <li>结束日期：{{ props.data.endDate || '-' }}</li>
      <li>发明人：{{ props.data.authorWithAff || '-' }}</li>
      <li>机构名称：{{ props.data.inputOrg || '-' }}</li>
      <li class="single">中文关键词：{{ props.data.keywordNames || '-' }}</li>
      <li class="single"
        >国家地区：{{
          props.data.arear || `${props.data.country ? `-${props.data.country}` : ''}` || '-'
        }}</li
      >
      <li class="single">网页链接：{{ props.data.webAddr || '-' }}</li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
  import ViewFile from '/@/views/doSp/sciSubjManage/sciSubject/modules/viewFile.vue';
  const props = defineProps({
    data: { type: Object, default: () => {} },
  });
</script>
