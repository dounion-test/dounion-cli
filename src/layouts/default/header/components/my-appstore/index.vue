<template>
  <Dropdown
    :class="`${prefixCls}-appstore`"
    placement="bottomLeft"
    :overlayClassName="`${prefixCls}-dropdown-overlay`"
  >
    <span :class="`${prefixCls}-trigger ${prefixCls}-appstore light`" style="z-index: 1">
      <appstore-outlined class="icon" />
      <span class="text">我的应用</span>
    </span>

    <template #overlay>
      <Menu :class="`${prefixCls}-appstore-Menu`">
        <MenuItem
          @click="changeRoute(item.id)"
          v-for="item in getAppList"
          :key="item.id"
          class="item"
        >
          <user-outlined class="user" />
          <span>{{ item.name }}</span>
        </MenuItem>
      </Menu>
    </template>
  </Dropdown>
</template>

<script lang="ts">
  import { defineComponent, ref, reactive } from 'vue';
  import { AppstoreOutlined, UserOutlined } from '@ant-design/icons-vue';
  import { useDesign } from '/@/hooks/web/useDesign';
  import { Dropdown, Menu } from 'ant-design-vue';
  import { usePermissionStore, usePermissionStoreWithOut } from '/@/store/modules/permission';
  import { resetRouter } from '/@/router';
  import type { RouteRecordRaw, RouteLocationRaw } from 'vue-router';
  import { PAGE_NOT_FOUND_ROUTE } from '/@/router/routes/basic';
  import { useTabs } from '/@/hooks/web/useTabs';
  import { useRouter } from 'vue-router';
  import { RootRoute } from '/@/router/routes';
  export default defineComponent({
    components: {
      AppstoreOutlined,
      UserOutlined,
      Dropdown,
      Menu,
      MenuItem: Menu.Item,
    },
    setup() {
      const { getAppList, setCurrentAppID, buildRoutesAction } = reactive(
        usePermissionStoreWithOut(),
      );
      const newPermissionStore = usePermissionStore();
      const { closeAll } = useTabs();
      const router = useRouter();
      const { prefixCls } = useDesign('layout-header');
      let showDown = ref(true);

      const changeRoute = async (id) => {
        setCurrentAppID(id);
        closeAll();
        resetRouter();
        const routes = await buildRoutesAction();

        routes.forEach((route) => {
          router.addRoute(route as unknown as RouteRecordRaw);
        });

        /**侵入式修改 自定义首页 */
        router.removeRoute('Root');
        RootRoute.redirect = newPermissionStore.homePath;
        router.addRoute(RootRoute as unknown as RouteRecordRaw);
        router.addRoute(PAGE_NOT_FOUND_ROUTE as unknown as RouteRecordRaw);
        console.log(routes, router);

        // 寻找菜单中第一个路由
        const redirect = routes[0].redirect as RouteLocationRaw;

        router.replace(redirect);
      };

      return {
        prefixCls,
        showDown,
        Dropdown,
        Menu,
        MenuItem: Menu.Item,
        getAppList,
        changeRoute,
      };
    },
  });
</script>

<style lang="less" scoped>
  .flex-b {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
  }
</style>
