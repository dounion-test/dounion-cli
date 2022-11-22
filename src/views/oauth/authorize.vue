<!--
 * @Author: 江雪松 576053154@qq.com
 * @Date: 2022-09-02 11:13:21
 * @LastEditors: 江雪松 576053154@qq.com
 * @LastEditTime: 2022-09-06 21:31:59
 * @FilePath: /rural-revitalization/src/views/oauth/authorize.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div></div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { useLoading } from '/@/components/Loading';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { useDesign } from '/@/hooks/web/useDesign';
  import { useUserStore } from '/@/store/modules/user';
  import { domesOauthAuthorize } from '/@/api/oauth/index';

  export default defineComponent({
    setup() {
      const data = window.location.href.split('?');
      const { t } = useI18n();
      const { notification, createErrorModal } = useMessage();
      const userStore = useUserStore();
      const { prefixCls } = useDesign('login');
      console.log(data, 'data');
      const [openFullLoading, closeFullLoading] = useLoading({
        tip: '加载中...',
      });

      const getUrl = async () => {
        let res = await domesOauthAuthorize();
        window.location.href = res.authorizeUrl;
      };

      const handleLogin = async (code) => {
        try {
          openFullLoading();
          const userInfo = await userStore.oauthLogin({
            code,
            mode: 'none', //不要默认的错误提示
          });
          if (userInfo) {
            notification.success({
              message: t('sys.login.loginSuccessTitle'),
              description: `${t('sys.login.loginSuccessDesc')}: ${userInfo.realName}`,
              duration: 3,
            });
          }
        } catch (error) {
          createErrorModal({
            title: t('sys.api.errorTip'),
            content: (error as unknown as Error).message || t('sys.api.networkExceptionMsg'),
            getContainer: () => document.body.querySelector(`.${prefixCls}`) || document.body,
          });
        } finally {
          closeFullLoading();
        }
      };

      const isLogin = () => {
        if (data.length > 1) {
          let codeArr = data[1].split('#');
          let code = codeArr[0].split('=')[1];
          handleLogin(code);
        } else {
          getUrl();
        }
      };

      isLogin();

      return {};
    },
  });
</script>

<style scoped></style>
