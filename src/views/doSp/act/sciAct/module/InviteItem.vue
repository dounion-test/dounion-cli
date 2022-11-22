<!--
 * @Author: 江雪松 576053154@qq.com
 * @Date: 2022-08-12 11:13:46
 * @LastEditors: 江雪松 576053154@qq.com
 * @LastEditTime: 2022-10-25 14:44:35
 * @FilePath: /rural-revitalization/src/views/expstore/activity/list/module/InviteItem.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="invite-item">
    <div class="flex items-center">
      <img class="invite-item-img mr-4" :src="expertAvatar" />
      <div class="mr-4">
        <div>
          <span class="font-bold mr-1">{{ record.name }}</span>
          <span>{{ record.educationName }}</span>
        </div>
        <p
          >技术职称：{{
            record.jobTitleId === '52052-1011' || record.jobTitleId === '52052-2601'
              ? record.otherJobTitle
              : record.jobTitleIdName || '-'
          }}</p
        >
        <p v-if="record.certSdate">入驻时间：{{ record.certSdate }}</p>
        <p>手机：{{ record.mobile ? record.mobile : '-' }}</p>
      </div>
    </div>
    <div v-show="showAction" class="flex justify-between mt-4">
      <a-checkbox @change="(e) => handleChange(e, 'isContact')" v-model:checked="checked">{{
        checked ? '已联系' : '未联系'
      }}</a-checkbox>
      <a-switch
        v-if="checked"
        v-model:checked="switchValue"
        checked-children="能出席"
        un-checked-children="不能出席"
        @change="(e) => handleChange(e, 'isAttend')"
      />
      <a-button v-else size="small" type="primary" @click="handleContact">联系</a-button>
    </div>
    <div v-show="!showAction" class="flex justify-between mt-4">
      <span>已联系</span>
      <a-switch
        v-model:checked="switchValue"
        checked-children="能出席"
        un-checked-children="不能出席"
        @change="handleContactChange"
      />
    </div>
    <InviteItemModal @register="registerModal" @success="handleSuccess" />
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref, computed, watch } from 'vue';
  import { Checkbox, Switch } from 'ant-design-vue';
  import InviteItemModal from './InviteItemModal.vue';
  import { useModal } from '/@/components/Modal';
  import { getAppEnvConfig } from '/@/utils/env';
  import defaultAvatar from '/@/assets/images/default-avatar.jpg';
  export default defineComponent({
    components: {
      InviteItemModal,
      ACheckbox: Checkbox,
      ASwitch: Switch,
    },
    props: {
      record: {
        type: Object,
        default: () => {},
      },
      showAction: {
        type: Boolean,
        default: true,
      },
      isAttend: {
        type: Boolean,
        default: false,
      },
      isContact: {
        type: Boolean,
        default: false,
      },
      itemIndex: Number,
    },
    emits: ['change'],
    setup(props, { emit }) {
      const checked = ref(false);
      const switchValue = ref(false);
      if (props.isAttend) {
        switchValue.value = true;
      }
      const [registerModal, { openModal }] = useModal();

      const { VITE_GLOB_DOFILE_URL } = getAppEnvConfig();
      const expertAvatar = computed(() => {
        if (props.record.headImgFile && props.record.headImgFile.length) {
          return `${VITE_GLOB_DOFILE_URL}${props.record.headImgFile[0].filePath}`;
        } else if (props.record.pictures && props.record.pictures.length) {
          return `${VITE_GLOB_DOFILE_URL}${props.record.pictures[0].filePath}`;
        } else {
          return defaultAvatar;
        }
      });

      const handleContact = () => {
        openModal(true, { record: props.record });
      };

      const handleChange = (e, name) => {
        let checked = name == 'isContact' ? e.target.checked : e;
        emit('change', checked, props.itemIndex, name);
      };

      // 已联系列表switch切换
      const handleContactChange = () => {
        emit('change', props.itemIndex);
      };

      const handleSuccess = (isChecked, isSwitchValue) => {
        checked.value = isChecked;
        switchValue.value = isSwitchValue;
        emit('change', checked.value, props.itemIndex, 'isContact');
        emit('change', switchValue.value, props.itemIndex, 'isAttend');
      };

      watch(
        () => props.isContact,
        () => {
          checked.value = props.isContact;
        },
        { immediate: true },
      );

      watch(
        () => props.isAttend,
        () => {
          switchValue.value = props.isAttend;
        },
        { immediate: true },
      );

      return {
        checked,
        switchValue,
        expertAvatar,
        registerModal,
        handleContact,
        handleChange,
        handleSuccess,
        handleContactChange,
      };
    },
  });
</script>

<style lang="less" scoped>
  .invite-item {
    width: 100%;
    border-bottom: 1px solid #d9d9d9;
    padding: 10px 0;
    border-radius: 2px;
  }

  .invite-item-img {
    width: 55px;
    height: 65px;
  }

  [data-theme='dark'] {
    .invite-item {
      border-color: #303030;
    }
  }
</style>
