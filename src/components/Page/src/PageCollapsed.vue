<template>
  <Layout :class="prefixCls">
    <Sider
      v-model:collapsed="collapsed"
      :trigger="null"
      collapsible
      collapsedWidth="20"
      :defaultCollapsed="defaultCollapsed"
      :width="width"
      class="bg-white"
      :class="{ 'sider-margin': isMarginRight }"
    >
      <div class="title-bar">
        <div class="t-left" :class="{ hide: collapsed }"
          ><h3>{{ title }}</h3
          ><slot name="iconLink"></slot
        ></div>
        <div class="t-right">
          <MenuUnfoldOutlined
            v-if="collapsed"
            class="trigger"
            @click="() => (collapsed = !collapsed)"
          />
          <MenuFoldOutlined v-else class="trigger" @click="() => (collapsed = !collapsed)" />
        </div>
      </div>
      <div :class="{ hide: collapsed }">
        <slot name="cLeft"></slot>
      </div>
    </Sider>
    <Content>
      <slot name="cRight"></slot>
    </Content>
  </Layout>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { useDesign } from '/@/hooks/web/useDesign';
  import { Layout } from 'ant-design-vue';
  import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons-vue';

  const props = defineProps({
    defaultCollapsed: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: '',
    },
    width: {
      type: String,
      default: '200',
    },
    isMarginRight: {
      type: Boolean,
      default: true,
    },
  });

  const { Sider, Content } = Layout;
  const collapsed = ref<boolean>(false);
  const { prefixCls } = useDesign('page-collapsed');
</script>

<style lang="less" scoped>
  @prefix-cls: ~'@{namespace}-page-collapsed';
  .@{prefix-cls} {
    :deep(.ant-layout-sider) {
      background-color: #fff;

      &-sider {
        .anticon-menu-unfold {
          padding: 2px 10px;
        }
      }

      &-collapsed {
        .title-bar {
          padding: 8px 4px;
          border-bottom: 0 none;
          background-color: #fff;
        }
      }

      &.sider-margin {
        margin-right: 15px;
      }

      .anticon-menu-fold,
      .anticon-menu-unfold {
        font-size: 14px;
      }
    }

    .title-bar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 8px 10px;
      border-bottom: 1px solid #e5e5e5;
      background-color: #fafafa;

      h3 {
        margin-bottom: 0;
        font-size: 14px;
      }

      .t-left,
      .t-right {
        display: inline-flex;
        align-items: center;
      }
    }

    :deep(.ant-layout-content) {
      background-color: #fff;
    }

    .hide {
      display: none !important;
    }
  }

  #components-layout-demo-custom-trigger .trigger {
    font-size: 18px;
    line-height: 64px;
    padding: 0 24px;
    cursor: pointer;
    transition: color 0.3s;
  }

  #components-layout-demo-custom-trigger .trigger:hover {
    color: #1890ff;
  }

  .site-layout .site-layout-background {
    background: #fff;
  }

  [data-theme='dark'] {
    .@{prefix-cls} {
      :deep(.ant-layout-sider),
      :deep(.ant-layout-content),
      .title-bar,
      .site-layout .site-layout-background {
        background: initial;
      }
      .title-bar {
        border-color: #303030;
      }
    }
  }
</style>
