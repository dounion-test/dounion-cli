<!--
 * @Author: your name
 * @Date: 2022-05-23 14:48:56
 * @LastEditTime: 2022-09-01 11:13:56
 * @LastEditors: 江雪松 576053154@qq.com
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /vben-admin-thin-next-main/src/views/systemManager/ucenterPerson/index.vue
-->
<template>
  <PageWrapper contentBackground contentFullHeight>
    <BasicTable
      @register="registerTable"
      :searchInfo="searchParams"
      class="!p-0"
      title="导入结果预览"
    >
      <template #toolbar>
        <div class="table-toolbar"
          ><a-upload accept=".xlsx,.xls" :showUploadList="false" :before-upload="beforeUpload">
            <a-button class="ml-4" type="primary"
              ><Icon icon="ant-design:cloud-upload-outlined" size="18" />选择文件</a-button
            >
          </a-upload>
          <a-button type="primary" @click="handleImportTemplate"
            ><Icon icon="ant-design:download-outlined" />下载模板</a-button
          >
          <a-button type="primary" @click="handleAdd"> 确认新增 </a-button>
          <a-button @click="goBack()"> 返回 </a-button>
        </div>
      </template>
      <template #account="{ record }">
        <span @click.stop="toDetail(record)" class="name flex items-center">
          {{ record.account }}
          <Icon v-if="record.accountStatus == 2" icon="ant-design:lock-outlined" color="#f56c6c" />
        </span>
      </template>
      <template #isBusinessAcct="{ record }">
        <span>{{ record.isBusinessAcct ? '是' : '否' }}</span>
      </template>
      <template #isMonitorUser="{ record }">
        <span>{{ record.isMonitorUser ? '是' : '否' }}</span>
      </template>
      <template #result="{ record }">
        <span :class="record.result === '成功' ? 'cgreen' : 'cred'">{{
          record.result
        }}</span></template
      >
    </BasicTable>
  </PageWrapper>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { Upload } from 'ant-design-vue';
  import { Icon } from '/@/components/Icon';
  import { PageWrapper } from '/@/components/Page';
  import { BasicTable, useTable } from '/@/components/Table';
  import { columns } from './config/batchimport';
  import { useRouter } from 'vue-router';
  import { useTabs } from '/@/hooks/web/useTabs';
  import { useMessage } from '/@/hooks/web/useMessage';
  import type { UploadProps } from 'ant-design-vue';
  import { sysParameterLoad } from '/@/api/common';
  import { domesOpPersonImportPreviewApi, domesOpPersonAddListApi } from '/@/api/doOp/person';

  export default defineComponent({
    name: 'OpPersonBatchimport',
    components: {
      Icon,
      PageWrapper,
      BasicTable,
      AUpload: Upload,
    },
    setup() {
      const router = useRouter();
      const { close, refreshOtherPage } = useTabs();
      const fileList: any = ref([]);
      const tableList: any = ref([]);
      const { createMessage } = useMessage();
      /**
       * table 列表
       */
      const [registerTable, { setLoading, setTableData }] = useTable({
        rowKey: 'id',
        columns,
        immediate: false,
        useSearchForm: false,
        canResize: false,
        showTableSetting: true,
        showIndexColumn: true,
        bordered: false,
        ellipsis: false,
      });

      //导入模板
      const handleImportTemplate = async () => {
        const { value } = await sysParameterLoad({
          orgId: 0,
          keies: 'viewPointUserImportTemplate',
        });

        let A = document.createElement('a');
        A.href = `/dofile${value}`;
        A.click();
        A.remove();
      };

      // 导入
      const beforeUpload: UploadProps['beforeUpload'] = (file) => {
        if (
          file &&
          file.type !== 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        ) {
          createMessage.warning('请选择.xlsx或.xls文件，或点击下载模板');
          return true;
        }
        fileList.value = [file];
        spPersonImportByExcel();
        return false;
      };

      // 导入接口
      const spPersonImportByExcel = async () => {
        setLoading(true);
        const formData = new FormData();
        fileList.value.forEach((item) => {
          formData.append('file', item);
        });
        try {
          let res = await domesOpPersonImportPreviewApi(formData);
          if (!res.length) {
            setLoading(false);
            return createMessage.warning('上传文件数据有误，请先下载模板，修改上传。');
          }
          tableList.value = res;
          setTableData(tableList.value);
          setLoading(false);
        } catch (e) {
          console.log('spPersonImportByExcel:e', e);
          setLoading(false);
        }
      };

      const handleAdd = async () => {
        console.log(tableList.value.length, 'tableList.value.1');
        if (!tableList.value.length) {
          return createMessage.warning('请选择文件');
        }
        let arr = tableList.value.filter((item) => {
          return item.result == '成功';
        });
        await domesOpPersonAddListApi({ opPersonList: JSON.stringify(arr) });
        createMessage.success('操作成功');
        goBack(true);
      };

      // 取消
      const goBack = (status = false) => {
        close();
        if (status) {
          refreshOtherPage('OpPersonList');
        } else {
          router.push({ name: 'OpPersonList' });
        }
      };

      return {
        registerTable,
        beforeUpload,
        handleAdd,
        goBack,
        handleImportTemplate,
      };
    },
  });
</script>
