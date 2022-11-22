import { ref } from 'vue';
import { opLoicSettingListAll } from '/@/api/doOp/index';
import { useMessage } from '/@/hooks/web/useMessage';

const { createMessage } = useMessage();
const allLogicMap = ref(new Map());
export const requestAllLogic = async (params, cb) => {
  // allLogicMap.value.clear();
  try {
    const data = await opLoicSettingListAll(params);

    if (!data?.length) {
      cb && cb();
      return;
    }
    allLogicMap.value.clear();
    data.forEach((item) => {
      // 判断是否存在分类栏id
      const hasCategoryKey = allLogicMap.value.has(item.categoryId);
      const isInputStem = item.type === '52020-10';
      if (hasCategoryKey) {
        const categoryValue = allLogicMap.value.get(item.categoryId);
        // 判断是否存在题目id
        const hasStemKey = categoryValue.has(item.subjectId);
        if (hasStemKey) {
          const stemValue = categoryValue.get(item.subjectId);
          !isInputStem && stemValue.push(item.loicSettingDetailList[0]?.subjectId);
        } else {
          categoryValue.set(
            item.subjectId,
            isInputStem ? [] : [item.loicSettingDetailList[0]?.subjectId],
          );
        }
      } else {
        const map = new Map();
        map.set(item.subjectId, isInputStem ? [] : [item.loicSettingDetailList[0]?.subjectId]);

        allLogicMap.value.set(item.categoryId, map);
      }
    });
    cb && cb();
  } catch (error) {
    cb && cb();
    console.error(error);
    createMessage.error('获取逻辑数据失败');
  }
};

export const categoryLogicSize = (categoryId) => {
  let size = 0;
  if (allLogicMap.value.has(categoryId)) {
    const categoryValue = allLogicMap.value.get(categoryId);
    Array.from(categoryValue.values()).forEach((item) => {
      if (Array.isArray(item)) {
        size += item.length ? item.length * 2 : 1;
      } else {
        size += 1;
      }
    });
  }

  return size;
};

export const stemLogicSize = (categoryId, stemId) => {
  // alert(categoryId, stemId);
  const hasCategoryKey = allLogicMap.value.has(Number(categoryId));
  let size = 0;
  if (hasCategoryKey) {
    const categoryValue = allLogicMap.value.get(Number(categoryId));
    const hasStemId = categoryValue.has(stemId);
    if (hasStemId) {
      const value = categoryValue.get(stemId);
      size += value.length || 1;
    }

    if (categoryValue) {
      Array.from(categoryValue.values())
        .flat()
        .forEach((v) => {
          if (v == stemId) {
            ++size;
          }
        });
    }

    return size;
  } else {
    return size;
  }
};

export { allLogicMap };
