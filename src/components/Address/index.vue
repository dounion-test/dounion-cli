<template>
  <div class="dv-address">
    <a-dropdown :trigger="['click']" :visible="isVisible" @visible-change="handleVolumechange">
      <div class="dv-input">
        {{ addressText ? addressText : selectedAddress }}
        <down-outlined />
      </div>
      <template #overlay>
        <div class="address-box">
          <span @click="handleClearClick" class="dv-clear">清空</span>
          <a-tabs v-model:activeKey="activeName">
            <a-tab-pane :tab="provinceLabel" key="province">
              <a-row :gutter="[10, 10]">
                <a-col
                  :span="6"
                  v-for="item of provinceList"
                  :key="item.value"
                  :class="provinceCodeFmt == item.value ? 'el-col-active' : ''"
                >
                  <div class="sheng" @click="provinceClick(item.value, item.name)">
                    {{ item.name }}
                  </div>
                </a-col>
              </a-row>
            </a-tab-pane>
            <a-tab-pane :tab="cityLabel" key="city">
              <a-row :gutter="[10, 10]">
                <a-col
                  :span="6"
                  v-for="item of cityList[provinceCodeFmt]"
                  :key="item.value"
                  :class="cityCodeFmt == item.value ? 'el-col-active' : ''"
                  ><div class="sheng" @click="cityClick(item.value, item.name)">
                    {{ item.name }}
                  </div></a-col
                >
              </a-row>
            </a-tab-pane>
            <a-tab-pane :tab="areaLabel" key="area">
              <a-row :gutter="[10, 10]">
                <a-col
                  :span="6"
                  v-for="item of areaList[cityCodeFmt]"
                  :class="areaCodeFmt == item.value ? 'el-col-active' : ''"
                  :key="item.value"
                  ><div class="sheng" @click="areaClick(item.value, item.name)">{{
                    item.name
                  }}</div></a-col
                >
              </a-row>
            </a-tab-pane>
          </a-tabs>
        </div>
      </template>
    </a-dropdown>
  </div>
</template>

<script lang="ts">
  import { defineComponent, reactive, toRefs, watch } from 'vue';
  import { Dropdown, Tabs, TabPane, Row, Col } from 'ant-design-vue';
  import { DownOutlined } from '@ant-design/icons-vue';
  export default defineComponent({
    name: 'AddressCom',
    components: {
      ADropdown: Dropdown,
      ATabs: Tabs,
      ATabPane: TabPane,
      ARow: Row,
      ACol: Col,
      DownOutlined,
    },
    props: {
      provinceList: {
        type: Array,
        default: () => [],
      },
      cityList: {
        type: [Object, String] as PropType<Recordable | string>,
        default: () => ({}),
      },
      areaList: {
        type: [Object, String] as PropType<Recordable | string>,
        default: () => ({}),
      },
      selectedAddress: {
        type: String,
        default: () => '',
      },
      provinceCode: {
        type: String,
        default: () => '',
      },
      cityCode: {
        type: String,
        default: () => '',
      },
      areaCode: {
        type: String,
        default: () => '',
      },
      provinceLabel: {
        type: String,
        default: () => '省份',
      },
      cityLabel: {
        type: String,
        default: () => '城市',
      },
      areaLabel: {
        type: String,
        default: () => '区县',
      },
    },
    emits: ['selectProvince', 'selectCity', 'selectArea', 'clearSelected'],
    setup(props, { emit }) {
      const state = reactive({
        isVisible: false,
        activeName: 'province',
        provinceName: '',
        cityName: '',
        areaName: '',
        addressText: props.selectedAddress,
        provinceCodeFmt: props.provinceCode,
        cityCodeFmt: props.cityCode,
        areaCodeFmt: props.areaCode,
      });
      watch(
        () => props.provinceCode,
        (val) => {
          state.provinceCodeFmt = val;
        },
      );
      watch(
        () => props.cityCode,
        (val) => {
          state.cityCodeFmt = val;
        },
      );
      watch(
        () => props.areaCode,
        (val) => {
          state.areaCodeFmt = val;
        },
      );
      const provinceClick = (code, name) => {
        state.provinceCodeFmt = code;
        state.provinceName = name;
        state.activeName = 'city';
        state.addressText = name;
        emit('selectProvince', code);
      };
      const cityClick = (code, name) => {
        state.cityCodeFmt = code;
        state.cityName = name;
        state.activeName = 'area';
        state.addressText = `${state.provinceName}/${state.cityName}`;
        emit('selectCity', code);
      };
      const areaClick = (code, name) => {
        state.areaCodeFmt = code;
        state.areaName = name;
        state.addressText = `${state.provinceName}/${state.cityName}/${state.areaName}`;
        emit('selectArea', {
          code,
          name: `${state.provinceName}/${state.cityName}/${state.areaName}`,
        });
      };
      const handleClearClick = () => {
        state.provinceCodeFmt = '';
        state.cityCodeFmt = '';
        state.areaCodeFmt = '';
        state.activeName = 'province';
        state.addressText = '';
        emit('clearSelected');
      };
      const handleVolumechange = (e) => {
        state.isVisible = e;
      };
      return {
        ...toRefs(state),
        provinceClick,
        cityClick,
        areaClick,
        handleClearClick,
        handleVolumechange,
      };
    },
  });
</script>

<style lang="less" scoped>
  .dv-address {
    height: 30px;

    .dv-input {
      width: 100%;
      border-radius: 4px;
      color: #333;
      min-height: 30px; /*no*/
      height: 30px;
      line-height: 30px;
      padding: 0 30px 0 10px;
      min-width: 200px; /*no*/
      overflow: hidden;
      text-overflow: ellipsis;
      border: 1px solid #dcdfe6;
      box-sizing: border-box;
      position: relative;
      white-space: nowrap;

      .anticon {
        position: absolute;
        top: 8px;
        right: 10px;
        font-size: 12px;
        color: #c7c7c7;
      }
    }

    .no-selected {
      color: #ccc;
    }
  }

  .address-box {
    width: 570px;
    padding: 0 15px 10px;
    font-size: 12px;
    position: relative;
    background-color: #fff;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);

    :deep(.el-tabs__header) {
      padding: 0;
    }

    :deep(.el-tabs__item) {
      font-size: 12px !important;
      padding: 0 15px !important;
      height: 33px;
      line-height: 33px;
    }

    .el-col {
      padding: 6px !important;
      height: 34px;
      cursor: pointer;
      color: #333;
    }

    .el-col:hover {
      color: #409eff;
    }

    .el-col-active {
      color: #409eff !important;
      font-weight: 700;

      .el-dropdown-menu__item {
        color: #409eff !important;
      }
    }

    .el-dropdown-menu__item {
      line-height: inherit;
      padding: 0;
      color: #333;
      font-size: 12px;
    }

    .el-dropdown-menu__item:hover {
      color: #409eff;
      background: none !important;
    }

    .dv-clear {
      right: 0;
      top: 6px;
      z-index: 9;
      padding: 0 15px;
      position: absolute;
      background: none;
      color: #909399;
      height: 33px;
      line-height: 33px;
      font-size: 14px;
      &:hover {
        cursor: pointer;
        color: @primary-color;
      }
    }
  }

  .address-container {
    padding: 0 !important;
    border: none !important;

    :deep(.el-tabs__content) {
      height: 256px;
      overflow: auto;
    }
  }

  .a-dropdown-disabled {
    background-color: #f5f7fa;
    border-color: #dfe4ed;
    color: #c0c4cc;

    .dv-input {
      color: #c0c4cc !important;
    }
  }

  .dv-input {
    min-width: auto !important;
  }
  [data-theme='dark'] {
    .dv-address .dv-input {
      border-color: #303030;
    }
  }
</style>
