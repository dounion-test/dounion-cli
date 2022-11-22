<template>
  <div class="upfile-list-view" v-if="fileList && fileList.length">
    <ul>
      <li class="upfile-item" v-for="item in fileList" :key="item.filePath">
        <div class="upfile-item-left">
          <span class="file-icon">
            <SvgIcon class="icon" size="16" :name="fileIcons[item.fileType] || 'fileOther'" />
          </span>
          <span class="file-text readonly mr-3">{{ item.fileName }}</span>
          <span class="file-size">( {{ formatBytes(item.fileSize, 1) }} )</span>
        </div>
        <div class="upfile-item-right">
          <span class="view-handle">
            <a
              class="file-download"
              :name="item.fileName"
              :href="'/dofile' + item.filePath"
              target="_blank"
            >
              查看
              <!-- @click.stop="ntkoOpenLocal(item)" -->
            </a>
            <a
              class="file-download"
              :href="'/dofile' + item.filePath"
              target="_blank"
              :download="item.fileName"
            >
              下载
            </a>
          </span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
  import { defineComponent, PropType, watch, reactive } from 'vue';
  import { SvgIcon } from '/@/components/Icon';
  export default defineComponent({
    components: { SvgIcon },
    props: {
      fileList: {
        type: Array as PropType<Recordable[]>,
        default: () => [],
      },
    },
    setup(props) {
      const fileIcons = reactive({
        jpg: 'filePic',
        jpeg: 'filePic',
        png: 'filePic',
        doc: 'fileWord',
        docx: 'fileWord',
        xlsx: 'fileExcel',
        ppt: 'filePpt',
        pdf: 'filePdf',
      });

      watch(
        () => props.fileList,
        (value) => console.log(value, '==='),
        { immediate: true, deep: true },
      );
      const formatBytes = (bytes, decimals) => {
        if (bytes == 0) return '0 Bytes';
        let k = 1024,
          dm = decimals || 2,
          sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
          i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
      };

      return {
        formatBytes,
        fileIcons,
      };
    },
  });
</script>

<style scoped lang="less">
  .upfile-list-view {
    max-width: 700px;
    // max-width: 60%;

    .upfile-item {
      height: fit-content;
      line-height: 1.5;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .upfile-item-left {
        width: 100%;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        overflow: hidden;
        flex: 1;
        .file-icon {
          margin-right: 5px;
        }
        .file-size {
          flex: none;
          color: #999;
        }
      }
      .upfile-item-right {
        padding-left: 20px;
        .file-download {
          margin-left: 10px;
        }
      }
    }
  }
</style>
