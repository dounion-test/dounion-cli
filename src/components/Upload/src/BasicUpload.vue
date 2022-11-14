<template>
  <div>
    <Space>
      <a-button
        class="!flex items-center"
        type="primary"
        @click="openUploadModal"
        preIcon="carbon:cloud-upload"
      >
        {{ t('component.upload.upload') }}
      </a-button>
      <!-- <Tooltip placement="bottom" v-if="showPreview">
        <template #title>
          {{ t('component.upload.uploaded') }}
          <template v-if="fileList.length">
            {{ fileList.length }}
          </template>
        </template>
        <a-button @click="openPreviewModal">
          <Icon icon="bi:eye" />
          <template v-if="fileList.length && showPreviewNumber">
            {{ fileList.length }}
          </template>
        </a-button>
      </Tooltip> -->
      <a-button
        class="!flex items-center"
        v-if="fileList.length && showPreviewNumber"
        type="primary"
        preIcon="ant-design:close-outlined"
        color="error"
        @click="handleClear"
      >
        清除所有
      </a-button>
    </Space>

    <SlickList
      class="file-list"
      v-if="fileList.length && showPreviewNumber"
      v-model:list="fileList"
      use-drag-handle
      axis="y"
      @sort-start="sortStart"
      @sort-end="sortEnd"
    >
      <SlickItem
        v-for="(item, index) in fileList"
        :key="index"
        :index="index"
        class="bg-white"
        :class="{ 'is-move': !isMove, 'file-active': isActive === index || item.editable }"
      >
        <div class="info">
          <Icon
            v-handle
            class="options-move cursor-pointer mr-2"
            icon="teenyicons:drag-vertical-solid"
          />
          <SvgIcon class="icon" size="16" :name="fileIcons[item.fileType] || 'fileOther'" />
          <span class="edit-name"
            ><template v-if="!item.editable">{{ item.fileName }}</template>
            <template v-else
              ><a-input
                v-model:value="item.newFileName"
                :placeholder="item.fileName"
                class="file-text"
                ref="inputRef"
                @input="formatFileName(item)"
            /></template>
          </span>
          <span class="size">（{{ renderSize(item.fileSize) }}）</span>
          <Tooltip v-if="!item.editable">
            <template #title>编辑</template>
            <a @click.stop="handleEditName(item, index)" class="edit">
              <Icon icon="eva:edit-2-outline" />
            </a>
          </Tooltip>
        </div>
        <span class="operate">
          <Tooltip v-if="item.editable">
            <template #title>确定</template>
            <a @click="handleEditFile(true, item)" class="sure">
              <Icon icon="charm:tick" />
            </a>
          </Tooltip>
          <Tooltip v-if="!item.editable">
            <template #title>下载</template>
            <a
              :href="fileUrl + item.filePath"
              :name="item.fileName"
              target="_blank"
              :download="item.fileName"
              class="download"
            >
              <Icon icon="ci:download" />
            </a>
          </Tooltip>
          <Tooltip>
            <template #title>删除</template>
            <a @click.stop="handleRemoveFile(item, index)" class="close">
              <Icon icon="eva:close-outline" />
            </a>
          </Tooltip>
        </span>
      </SlickItem>
    </SlickList>

    <UploadModal
      v-bind="bindValue"
      :previewFileList="fileList"
      @register="registerUploadModal"
      @change="handleChange"
      @delete="handleDelete"
    />

    <UploadPreviewModal
      :value="fileList"
      @register="registerPreviewModal"
      @list-change="handlePreviewChange"
      @delete="handlePreviewDelete"
    />
  </div>
</template>
<script lang="ts">
  import { defineComponent, ref, watch, unref, computed, reactive, nextTick } from 'vue';
  import { Icon, SvgIcon } from '/@/components/Icon';
  import { Tooltip, Space } from 'ant-design-vue';
  import { useModal } from '/@/components/Modal';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { renderSize } from '/@/utils/file/download';
  import { uploadContainerProps } from './props';
  import { omit } from 'lodash-es';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { isArray } from '/@/utils/is';
  import UploadModal from './UploadModal.vue';
  import UploadPreviewModal from './UploadPreviewModal.vue';
  import { SlickList, SlickItem, HandleDirective } from 'vue-slicksort';

  export default defineComponent({
    name: 'BasicUpload',
    components: {
      UploadModal,
      Space,
      UploadPreviewModal,
      Icon,
      SvgIcon,
      Tooltip,
      SlickList,
      SlickItem,
    },
    directives: {
      handle: HandleDirective,
    },
    props: uploadContainerProps,
    emits: ['change', 'delete', 'preview-delete', 'update:value', 'editFile'],

    setup(props, { emit, attrs }) {
      const { t } = useI18n();
      const { createConfirm } = useMessage();
      // 上传modal
      const [registerUploadModal, { openModal: openUploadModal }] = useModal();

      //   预览modal
      const [registerPreviewModal, { openModal: openPreviewModal }] = useModal();

      const inputRef = ref<any>(null);

      const fileList = ref<any[]>([]);
      const fileIcons = reactive({
        jpg: 'filePic',
        png: 'filePic',
        docx: 'fileWord',
        xlsx: 'fileExcel',
        ppt: 'filePpt',
      });
      const isActive = ref<number | null>(null);
      const NODE_ENV = process.env.NODE_ENV === 'production' ? '' : '/dev-api';
      const fileUrl = ref(` ${window.location.origin}${NODE_ENV}/file`);

      const isMove = ref(false);
      const sortStart = (val) => {
        isMove.value = true;
      };
      const sortEnd = () => {
        isMove.value = false;
      };

      const showPreview = computed(() => {
        const { emptyHidePreview } = props;
        if (!emptyHidePreview) return true;
        return emptyHidePreview ? fileList.value.length > 0 : true;
      });

      const bindValue = computed(() => {
        const value = { ...attrs, ...props };
        return omit(value, 'onChange');
      });

      watch(
        () => props.value,
        (value = []) => {
          fileList.value = isArray(value) ? value : [];
        },
        { immediate: true },
      );

      // 上传modal保存操作
      function handleChange(urls: string[]) {
        fileList.value = [...unref(fileList), ...(urls || [])];
        emit('update:value', fileList.value);
        emit('change', fileList.value);
      }

      // 预览modal保存操作
      function handlePreviewChange(urls: string[]) {
        fileList.value = [...(urls || [])];
        emit('update:value', fileList.value);
        emit('change', fileList.value);
      }

      function handleDelete(record: Recordable) {
        emit('delete', record);
      }

      function handlePreviewDelete(url: string) {
        emit('preview-delete', url);
      }

      //编辑单个文件Name
      const handleEditName = (item, index) => {
        isActive.value = index;
        item.editable = true;
        let fileName = item.fileName.split('.');

        if (fileName.length > 1) {
          fileName = fileName.slice(0, -1).join('.');
        } else {
          fileName = item.fileName;
        }
        item.newFileName = fileName;

        nextTick(() => {
          if (inputRef.value && inputRef.value.length) {
            inputRef.value[index]?.focus();
          }
        });
      };
      const formatFileName = (item) => {
        let { newFileName } = item;
        var reg = /[\/\\"<>\?\*]/;
        item.newFileName = newFileName?.replace(reg, '');
      };

      //编辑单个文件
      const handleEditFile = (upReadonly, item) => {
        isActive.value = null;
        if (upReadonly) {
          const newItem = fileList.value.find((item2) => item2.filePath === item.filePath);
          const newFileName = item.newFileName;
          if (item.newFileName && item.newFileName.length > 40) {
            // this.$showWarning('文件名称应小于40个字');
            return;
          }

          let ext;
          let fileName = item.fileName.split('.');
          if (fileName.length > 1) {
            ext = fileName.splice(-1)[0];
            item.fileName = newFileName + '.' + ext;
          } else {
            item.fileName = newFileName;
          }

          newItem.fileName = item.fileName;

          emit('editFile', { filePath: item.filePath, fileName: item.fileName });
        }
        item.editable = false;
      };

      //移除单个文件
      const handleRemoveFile = (item, index, force = false) => {
        if (!force) {
          createConfirm({
            iconType: 'warning',
            title: '提示',
            content: `您确定移除 ${item.fileName}？`,
            onOk() {
              fileList.value.splice(index, 1);
            },
          });
        }
      };

      //全部清除
      const handleClear = () => {
        createConfirm({
          iconType: 'warning',
          title: '提示',
          content: '确定清除所有文件吗?',
          onOk() {
            fileList.value = [];
          },
        });
      };

      return {
        registerUploadModal,
        openUploadModal,
        handleChange,
        handlePreviewChange,
        registerPreviewModal,
        openPreviewModal,
        fileList,
        showPreview,
        bindValue,
        handleDelete,
        handlePreviewDelete,
        t,

        renderSize,
        fileIcons,
        fileUrl,
        isActive,
        handleEditName,
        formatFileName,
        handleEditFile,
        handleRemoveFile,
        handleClear,
        inputRef,
        sortStart,
        sortEnd,
        isMove,
      };
    },
  });
</script>

<style lang="less">
  .is-move {
    padding: 8px 15px;
    border: 1px dashed #d9d9d9;
    .icon {
      margin-right: 10px;
    }
    .info {
      display: flex;
      align-items: center;
      flex: 1;
    }
    .edit {
      margin-left: 10px;
      display: none;
      opacity: 0;
    }
    .edit-name {
      max-width: 100%;
      flex: 1;
    }

    .operate {
      display: none;
      opacity: 0;
      a {
        padding: 0 5px;
      }
    }
    .file-text {
      padding: 0;
      border: 0 none;

      &:focus {
        box-shadow: none;
      }
    }
  }
</style>

<style lang="less" scoped>
  .file-list {
    > div {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 5px;
      padding: 8px 15px;
      border: 1px dashed #d9d9d9;
    }
    .is-move {
      .info {
        .file-text {
          max-width: 98%;
          line-height: 1;
          padding: 0 10px;
          border: 0 none;

          &:focus {
            box-shadow: none;
          }
        }
      }

      .edit {
        margin-left: 10px;
        display: none;
      }

      .operate {
        display: none;
        a {
          padding: 0 5px;
        }
      }

      .edit-name {
        max-width: none;
        flex: none;
      }
      &:hover {
        .operate,
        .edit {
          display: inline-block;
          opacity: 1;
        }
      }
    }

    .file-active {
      .edit-name {
        max-width: 100%;
        flex: 1;
      }
      .operate,
      .edit {
        display: inline-block;
        opacity: 1;
      }
    }
  }
  [data-theme='dark'] {
    .file-list > div {
      border-color: #303030;
    }
  }
</style>
