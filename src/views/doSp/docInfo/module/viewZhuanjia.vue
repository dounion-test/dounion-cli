<template>
  <h2
    ><span v-if="data.docType">{{ `【${data.docType}】` }}</span
    >{{ props.data.name }}</h2
  >
  <div class="doc-hd"
    ><div class="hd-left"
      ><span>专家编号：{{ props.data.code || '-' }}</span
      ><span>性别：{{ props.data.sexName || '-' }}</span
      ><span>学位：{{ props.data.degreeName || '-' }}</span></div
    ><div class="hd-right"
      ><span>更新时间：{{ props.data.docUpdateTime }}</span></div
    ></div
  >
  <div class="doc-bd">
    <p v-html="props.data.content"></p>
    <p v-html="props.data.contentEn"></p>
    <p class="annex" v-if="data.originalAttachments && data.originalAttachments.length"
      >附件：<ViewFile :fileList="data.originalAttachments"
    /></p>
    <div class="education-info">教育经历：<p v-html="props.data.eduExperience"></p></div>
    <ul class="other-info">
      <li>职称：{{ props.data.rank || '-' }}</li>
      <li>出生年月：{{ props.data.birthYm || '-' }}</li>
      <li class="single">职务：{{ props.data.position || '-' }}</li>
      <li class="single">研究方向：{{ props.data.rescDirection || '-' }}</li>
      <li>一级机构：{{ props.data.firstOrgName || '-' }}</li>
      <li>机构名称：{{ props.data.inputOrg || '-' }}</li>
      <li>单位所在地区：{{ props.data.unitLocation || '-' }}</li>
      <li>作者省份：{{ props.data.specProvince || '-' }}</li>
      <li>发文数量：{{ props.data.docNum || '-' }}</li>
      <li>在综合信息显示：{{ props.data.keywordNames || '-' }}</li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
  import ViewFile from '/@/views/doSp/sciSubjManage/sciSubject/modules/viewFile.vue';
  const props = defineProps({
    data: { type: Object, default: () => {} },
  });
</script>
