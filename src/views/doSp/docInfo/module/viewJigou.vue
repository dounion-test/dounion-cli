<template>
  <h2
    ><span v-if="props.data.docType">{{ `【${props.data.docType}】` }}</span
    >{{ props.data.name }}</h2
  >
  <div class="doc-hd"
    ><div class="hd-left"
      ><span>机构编号：{{ props.data.code ? `【${props.data.code}】` : '-' }}</span
      ><span>机构官网：{{ props.data.websiteName || '-' }}</span></div
    ><div class="hd-right">更新时间：{{ props.data.docUpdateTime || '-' }}</div></div
  >
  <div class="doc-bd">
    <p v-html="props.data.contentEn"></p>
    <p v-html="props.data.content"></p>
    <p class="annex" v-if="props.data.originalAttachments && props.data.originalAttachments.length"
      >附件：<ViewFile :fileList="props.data.originalAttachments"
    /></p>
    <ul class="other-info">
      <li
        >国家地区：{{
          props.data.arear || `${props.data.country ? `-${props.data.country}` : ''}` || '-'
        }}</li
      >
      <li class="single">部门：{{ props.data.deptName || '-' }}</li>
      <li>在综合信息显示：{{ props.data.isShow ? '是' : '否' }}</li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
  import ViewFile from '/@/views/doSp/sciSubjManage/sciSubject/modules/viewFile.vue';
  const props = defineProps({
    data: { type: Object, default: () => {} },
  });
</script>
