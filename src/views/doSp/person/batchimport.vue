<!--
 * @Author: your name
 * @Date: 2022-05-23 14:48:56
 * @LastEditTime: 2022-10-27 10:47:36
 * @LastEditors: 江雪松 576053154@qq.com
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /vben-admin-thin-next-main/src/views/systemManager/ucenterPerson/index.vue
-->
<template>
  <PageWrapper contentFullHeight contentBackground>
    <BasicTable @register="registerTable" class="!p-0" title="导入结果预览">
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
        <div class="name flex items-center">
          {{ record.account }}
          <Icon v-if="record.accountStatus == 2" icon="ant-design:lock-outlined" color="#f56c6c" />
        </div>
      </template>
      <template #isBusinessAcct="{ record }">
        <div>{{ record.isBusinessAcct ? '是' : '否' }}</div>
      </template>
      <template #isMonitorUser="{ record }">
        <div>{{ record.isMonitorUser ? '是' : '否' }}</div>
      </template>
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
  import { spPersonImportByExcelApi, spPersonAddListApi } from '/@/api/doSp/person';

  export default defineComponent({
    name: 'SpPersonBatchimport',
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
      });

      //导入模板
      const handleImportTemplate = async () => {
        const { value } = await sysParameterLoad({
          orgId: 0,
          keies: 'expertsImportTemplate',
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
        let res = await spPersonImportByExcelApi(formData);
        if (!res.length) {
          setLoading(false);
          return createMessage.warning('上传文件数据有误，请先下载模板，修改上传。');
        }
        tableList.value = res;
        setTableData(tableList.value);
        setLoading(false);
      };

      const handleAdd = async () => {
        if (!tableList.value.length) {
          return createMessage.warning('请选择文件');
        }
        let arr = tableList.value.filter((item) => {
          return item.errorCode != -1;
        });
        await spPersonAddListApi({ spPersonList: JSON.stringify(arr) });
        createMessage.success('操作成功');
        goBack(true);
      };

      // 取消
      const goBack = (status = false) => {
        close();
        if (status) {
          refreshOtherPage('SpPersonList');
        } else {
          router.push({ name: 'SpPersonList' });
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
