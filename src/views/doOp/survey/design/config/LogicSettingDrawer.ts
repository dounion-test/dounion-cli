import { ref } from 'vue';
import { ucenterCodeCombox } from '/@/api/common/index';
const options1 = ref([]);
const options2 = ref([]);
const options3 = ref([]);

ucenterCodeCombox({ type: '10001-52046' }).then((res) => {
  options1.value = res.list.map((v) => {
    return {
      label: v.name,
      ...v,
    };
  });
});

ucenterCodeCombox({ type: '10001-52022' }).then((res) => {
  options2.value = res.list.map((v) => {
    return {
      label: v.name,
      ...v,
    };
  });
});

ucenterCodeCombox({ type: '10001-52024' }).then((res) => {
  options3.value = res.list.map((v) => {
    return {
      label: v.name,
      ...v,
    };
  });
});

ucenterCodeCombox({ type: '10001-52021' });
ucenterCodeCombox({ type: '10001-52023' });

export const resultOption = [
  {
    label: '加',
    value: 1,
  },
  {
    label: '减',
    value: 2,
  },
  {
    label: '乘',
    value: 3,
  },
  {
    label: '除',
    value: 4,
  },
];

export { options1, options2, options3 };
