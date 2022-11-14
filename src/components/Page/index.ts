import { withInstall } from '/@/utils';

import pageFooter from './src/PageFooter.vue';
import pageWrapper1 from './src/PageWrapper.vue';
import pageCollapsed from './src/pageCollapsed.vue';

export const PageFooter = withInstall(pageFooter);
export const PageWrapper = withInstall(pageWrapper1);
export const PageCollapsed = withInstall(pageCollapsed);

export const PageWrapperFixedHeightKey = 'PageWrapperFixedHeight';
