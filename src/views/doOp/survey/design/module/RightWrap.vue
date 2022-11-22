<!--
 * @Author: 江雪松 576053154@qq.com
 * @Date: 2022-07-19 17:10:18
 * @LastEditors: 江雪松 576053154@qq.com
 * @LastEditTime: 2022-10-26 18:02:57
 * @FilePath: /vben-ucenter/src/views/demo/system/survey/module/RightWrap.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="right h-full bg-white p-2">
    <a-tabs v-model:activeKey="activeKey" @change="change" type="card" size="small">
      <a-tab-pane key="1" tab="全局设置" class="form-setting">
        <!-- <div>
          <h2 class="child-title">全局设置</h2>

          <div class="setting-box">
            <div class="child-setting">
              <span>背景设置</span>

              <span v-if="sourceValue" @click="openModal" class="relative cursor-pointer">
                <img class="bg-img" :src="sourceValue" />
                <Icon
                  class="bg-img-delete"
                  icon="ant-design:minus-circle-filled"
                  color="#ff6d56"
                  @click.stop="sourceValue = ''"
                />
              </span>
              <span class="bg-upload" v-else @click="openModal">上传图片</span>
            </div>
          </div>
        </div> -->

        <div class="mt-2">
          <slot name="control"></slot>
        </div>
      </a-tab-pane>
      <a-tab-pane
        key="2"
        tab="表单设置"
        :disabled="!Object.keys(config).length"
        class="form-setting"
        force-render
      >
        <!-- <div v-if="config."></div> -->
        <p class="subtitle" @click="show(config)">题目设置</p>
        <strong class="questionType">{{ config.stem }}</strong>
        <div v-if="config.hasQuestionSetting">
          <h2 class="child-title">整题设置</h2>

          <div class="setting-box">
            <div class="child-setting" v-if="config.hasOwnProperty('isRequired')">
              <span>此题必答</span>

              <a-switch v-model:checked="config.isRequired" size="small" />
            </div>

            <div class="child-setting" v-if="config.hasOwnProperty('showOrder')">
              <span>显示序号</span>

              <a-switch v-model:checked="config.showOrder" size="small" />
            </div>

            <div class="child-setting" v-if="config.hasOwnProperty('unit')">
              <span>设置单位</span>

              <a-input v-model:value="config.unit" />
            </div>
            <div class="child-setting" v-if="config.hasOwnProperty('hasStem')">
              <span>题干说明</span>

              <a-switch v-model:checked="config.hasStem" size="small" />
            </div>
          </div>
        </div>

        <div v-if="config.hasWriteSetting">
          <h3 class="child-title">填写设置</h3>

          <div class="setting-box">
            <div class="child-setting" v-if="config.hasOwnProperty('textType')">
              <span>格式限制</span>

              <Select
                size="small"
                ref="select"
                v-model:value="config.textType"
                style="width: 100px"
                :dropdownMatchSelectWidth="150"
              >
                <SelectOption :value="option.value" :key="i" v-for="(option, i) in valueTypeList"
                  ><span style="font-size: 12px">{{ option.name }}</span></SelectOption
                >
              </Select>
            </div>
            <div class="child-setting" v-if="config.hasOwnProperty('inputSize')">
              <span>输入框大小</span>

              <RadioGroup v-model:value="config.inputSize" size="small">
                <RadioButton value="small">小</RadioButton>
                <RadioButton value="middle">中</RadioButton>
                <RadioButton value="big">大</RadioButton>
              </RadioGroup>
            </div>

            <div class="child-setting" v-if="config.hasOwnProperty('minTextLength')">
              <span>最少填写</span>

              <a-input v-model:value="config.minTextLength" />
            </div>

            <div class="child-setting" v-if="config.hasOwnProperty('maxTextLength')">
              <span>最多填写</span>

              <a-input v-model:value="config.maxTextLength" />
            </div>

            <div class="child-setting" v-if="config.hasOwnProperty('defaultText')">
              <span>默认文本</span>

              <a-input v-model:value="config.defaultText" />
            </div>
          </div>
        </div>
        <div v-if="config.hasOpionSetting">
          <h3 class="child-title">选项设置</h3>
          <div class="setting-box">
            <div :key="item.id" v-for="item in config.options">
              <template v-if="item.hasOptionsItemSetting">
                <div class="child-setting">
                  <span>选项说明</span>

                  <a-switch v-model:checked="item.hasOptionsItemStem" size="small" />
                </div>
              </template>
              <template v-if="item.hasOptionsItemSetting">
                <div class="child-setting">
                  <span>在选项后添加填空框</span>
                  <a-switch v-model:checked="item.hasInput" size="small" />
                </div>
              </template>
            </div>
          </div>
        </div>
      </a-tab-pane>
    </a-tabs>
    <CopperImgModal
      @register="register"
      @upload-success="handleUploadSuccess"
      :uploadApi="uploadApi"
      :src="sourceValue"
      type="10001"
      :circled="false"
      :options="{ aspectRatio: NaN }"
    />
    <ViewDrawer @register="registerDrawer" />
  </div>
</template>

<script lang="ts">
  import { defineComponent, computed, ref, watch, inject, onMounted } from 'vue';
  import { Icon } from '/@/components/Icon';
  import { Switch, Tabs, TabPane, Radio, Select } from 'ant-design-vue';
  import ViewDrawer from './ViewDrawer.vue';
  import CopperImgModal from '/@/components/Cropper/src/CopperImgModal.vue';
  import { useRouter } from 'vue-router';
  import { useModal } from '/@/components/Modal';
  import { useDrawer } from '/@/components/Drawer';
  import { uploadApi } from '/@/api/sys/upload';
  import { getAppEnvConfig } from '/@/utils/env';

  import { ucenterCodeCombox } from '/@/api/common/index';
  import { useMessage } from '/@/hooks/web/useMessage';

  export default defineComponent({
    components: {
      Icon,
      ViewDrawer,
      CopperImgModal,
      ASwitch: Switch,
      ATabs: Tabs,
      ATabPane: TabPane,
      RadioGroup: Radio.Group,
      RadioButton: Radio.Button,
      Select,
      SelectOption: Select.Option,
    },
    props: {
      // isRequired: {
      //   type: Boolean,
      //   default: () => true,
      // },
      midItem: Object,
      midIndex: Number,
      moduleIndex: Number,
    },
    emits: ['save', 'setLocalStorageWidthMidArr', 'clearActived'],
    setup(props, { emit }) {
      const router = useRouter();
      const { createMessage } = useMessage();
      let activeKey = ref('1');
      const sourceValue = ref('');
      const logicArr: any = inject('logicArr');
      const { VITE_GLOB_DOFILE_URL } = getAppEnvConfig();
      const [register, { openModal }] = useModal();
      const [registerDrawer, { openDrawer }] = useDrawer();

      const config: any = inject('currentModule');

      const goPreview = () => {
        emit('setLocalStorageWidthMidArr');

        router.push({
          name: 'SurveyPreview',
          params: {
            id: 123,
          },
        });
      };

      const handleUploadSuccess = ({ data }) => {
        sourceValue.value = `${VITE_GLOB_DOFILE_URL}${data.data[0].filePath}`;
      };

      // 获取填空题格式限制list
      const valueTypeList = ref([]);
      const getValueTypeList = async () => {
        try {
          const { list } = await ucenterCodeCombox({ type: '10001-52045' });
          valueTypeList.value = list;
        } catch {
          createMessage.error('获取填空题型格式限制设置项失败！');
        }
      };

      const change = () => {
        emit('clearActived');
      };

      onMounted(() => {
        getValueTypeList();
      });

      watch(
        () => props.midItem,
        (value) => {
          activeKey.value = (value as Object).hasOwnProperty('id') ? '2' : '1';
        },
      );

      return {
        register,
        uploadApi,
        sourceValue,
        registerDrawer,
        // isRequired: computed(() => {
        //   return props.isRequired;
        // }),
        activeKey,
        config,
        valueTypeList,
        goPreview,
        openModal,
        handleUploadSuccess,
        change,
      };
    },
  });
</script>
<style lang="less" scoped>
  ::-webkit-scrollbar {
    width: 2px;
  }

  ::-webkit-scrollbar-thumb {
    background: #e5e7eb;
  }

  .right {
    border-radius: 2px;
    box-shadow: 0 2px 4px 0 rgb(0 0 0 / 10%);
    overflow-y: auto;
  }

  .bg-img {
    width: 35px;
    height: 23px;
  }

  .bg-upload {
    color: @primary-color;
    cursor: pointer;
  }

  .bg-img-delete {
    position: absolute;
    top: -8px;
    right: -8px;
  }

  :deep(.ant-tabs-nav-list) {
    width: 100%;

    .ant-tabs-tab {
      // width: 50%;
      justify-content: center;
    }
  }

  :deep(.ant-divider-horizontal) {
    margin: 12px 0;
  }

  .form-setting {
    .subtitle {
      font-size: @font-size-base;
      color: #aaa;
    }

    .questionType {
      font-size: @font-size-b6;
      color: #484848;
      font-weight: 600;
      line-height: 1;
    }

    .child-title {
      margin-top: 18px;
      color: #484848;
      font-size: @font-size-b2;
      padding: 14px 0;
      line-height: 1;
      font-weight: 600;
    }

    .setting-box {
      padding: 6px 0;
      border-top: 1px solid #eaeaea;
      border-bottom: 1px solid #eaeaea;

      .child-setting {
        padding: 6px 18px 6px 0;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: @font-size-base;
        color: #484848;

        :deep(.ant-input) {
          width: 40%;
          font-size: @font-size-base;
        }

        :deep(.ant-select-selection-item),
        :deep(.ant-radio-button-wrapper),
        :deep(.ant-select-item-option-content) {
          font-size: @font-size-base;
        }
      }
    }
  }

  [data-theme='dark'] {
    .setting-box {
      border-color: #303030 !important;
    }
  }
</style>
