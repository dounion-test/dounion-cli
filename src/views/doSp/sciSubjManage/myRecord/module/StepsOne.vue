<!--
 * @Author: 江雪松 576053154@qq.com
 * @Date: 2022-08-09 14:57:02
 * @LastEditors: 江雪松 576053154@qq.com
 * @LastEditTime: 2022-09-22 10:00:47
 * @FilePath: /rural-revitalization/src/views/expstore/expert/module/StepsOne.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div style="width: 90%" class="mt-8 rule-form-wrap">
    <BasicForm auto-focus-first-item @register="registerForm">
      <template #address>
        <address-com
          :provinceList="provinceList"
          :cityList="cityList"
          :areaList="areaList"
          :selectedAddress="selectedAddress"
          :provinceCode="addressForm.homeProvince"
          :cityCode="addressForm.homeCity"
          :areaCode="addressForm.homeCounty"
          @selectProvince="selectProvince"
          @selectCity="selectCity"
          @selectArea="selectArea"
          @clearSelected="clearSelected"
        />
      </template>

      <template #jobTitle>
        <a-form-item-rest>
          <a-space>
            <a-cascader
              style="width: 150px"
              v-model:value="jobTitleId"
              :options="jobTitleList"
              :field-names="{ label: 'name', value: 'value' }"
            >
              <template #displayRender="{ labels, selectedOptions }">
                <span v-for="(label, index) in labels" :key="selectedOptions[index].value">
                  <span v-if="index === labels.length - 1">
                    {{ label }}
                  </span>
                </span>
              </template>
            </a-cascader>
            <a-input
              allowClear
              v-model:value="otherJobTitle"
              v-if="
                jobTitleId[jobTitleId.length - 1] === '52052-2601' ||
                jobTitleId[jobTitleId.length - 1] === '52052-1011'
              "
            />
          </a-space>
        </a-form-item-rest>
      </template>

      <template #position>
        <a-form-item-rest>
          <a-space>
            <a-cascader
              style="width: 150px"
              v-model:value="position"
              :options="positionList"
              :field-names="{ label: 'name', value: 'value' }"
            >
              <template #displayRender="{ labels, selectedOptions }">
                <span v-for="(label, index) in labels" :key="selectedOptions[index].value">
                  <span v-if="index === labels.length - 1">
                    {{ label }}
                  </span>
                </span>
              </template>
            </a-cascader>
            <a-input
              allowClear
              v-model:value="otherPosition"
              v-if="
                position[position.length - 1] === '52051-109' ||
                position[position.length - 1] === '52051-207'
              "
            />
          </a-space>
        </a-form-item-rest>
      </template>

      <template #school>
        <a-form-item-rest>
          <ul class="m-0">
            <li
              v-for="(item, index) in schoolList"
              :key="index"
              class="flex items-center form-item"
            >
              <a-input v-model:value="item.value" />
              <Icon
                @click="handleAddSchool"
                class="cursor-pointer ml-2"
                :size="20"
                icon="ant-design:plus-circle-outlined"
              />
              <Icon
                v-if="schoolList.length > 1"
                @click="handleDelSchool(index)"
                class="cursor-pointer ml-2"
                :size="20"
                icon="ant-design:minus-circle-outlined"
              />
            </li>
          </ul>
        </a-form-item-rest>
      </template>
      <template #pictures="{ model, field }">
        <ImageUpload
          :multiple="true"
          :field="field"
          groupName="52030-220"
          accept=".png,.jpeg,.jpg"
          @change="handleChange"
        />
      </template>
    </BasicForm>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref, reactive, toRefs, onMounted, inject, watch } from 'vue';
  import { Input, Form, Space, Cascader } from 'ant-design-vue';
  import { Icon } from '/@/components/Icon';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import AddressCom from '/@/components/Address/index.vue';
  import { ImageUpload } from '/@/components/ImageUpload';
  import { schemasOne } from '../config/add';
  import { ucenterCodeCombox, ucenterCodeTree } from '/@/api/common/index';
  import { useRoute } from 'vue-router';

  export default defineComponent({
    components: {
      BasicForm,
      AddressCom,
      ImageUpload,
      Icon,
      AInput: Input,
      AFormItemRest: Form.ItemRest,
      ASpace: Space,
      ACascader: Cascader,
    },
    setup() {
      const route = useRoute();
      const schoolList = ref([{ value: undefined }]);
      const editInfo: any = inject('editInfo');
      const state = reactive({
        provinceList: ref([]),
        cityList: ref<any>([]),
        areaList: ref<any>([]),
        selectedAddress: ref(''),
        addressForm: {
          homeProvince: '',
          homeCity: '',
          homeCounty: '',
        },

        jobTitleId: ref<any>([]),
        otherJobTitle: ref<string | undefined>(undefined),
        jobTitleList: ref<any>([]),

        position: ref<any>([]),
        otherPosition: ref<string | undefined>(undefined),
        positionList: ref<any>([]),
      });

      const [registerForm, { validateFields, getFieldsValue, setFieldsValue }] = useForm({
        labelWidth: 120,
        schemas: schemasOne,
        showResetButton: false,
        showSubmitButton: false,
        actionColOptions: {
          span: 24,
        },
      });

      onMounted(() => {
        getComboxList('10001-10033');
        getComboxList('10001-10034');
        getComboxList('10001-10035');

        getUcenterCodeTree('10001-52051');
        getUcenterCodeTree('10001-52052');
      });

      watch(
        () => editInfo,
        () => {
          if (route.params.type == 'edit') {
            // 毕业院校
            let schoolArr = editInfo.value?.school?.split(',') || [];
            schoolArr.length && schoolList.value.splice(0, 1);
            schoolArr?.forEach((item) => {
              schoolList.value.push({ value: item ? item : undefined });
            });

            //职务职位
            state.jobTitleList?.forEach((item) => {
              item.children.forEach((it) => {
                if (it.value == editInfo.value.jobTitleId) {
                  state.jobTitleId = [item.value, it.value];
                }
              });
            });
            state.otherJobTitle = editInfo.value.otherJobTitle;

            state.positionList?.forEach((item) => {
              item.children.forEach((it) => {
                if (it.value == editInfo.value.position) {
                  state.position = [item.value, it.value];
                }
              });
            });
            state.otherPosition = editInfo.value.otherPosition;

            // 省市区
            state.addressForm.homeProvince = editInfo.value.homeProvince;
            state.addressForm.homeCity = editInfo.value.homeCity;
            state.addressForm.homeCounty = editInfo.value.homeCounty;
            if (
              editInfo.value.homeProvinceName &&
              editInfo.value.homeCityName &&
              editInfo.value.homeCountyName
            ) {
              state.selectedAddress = `${editInfo.value.homeProvinceName}/${editInfo.value.homeCityName}/${editInfo.value.homeCountyName}`;
            }
            if (
              editInfo.value.homeProvinceName &&
              editInfo.value.homeCityName &&
              !editInfo.value.homeCountyName
            ) {
              state.selectedAddress = `${editInfo.value.homeProvinceName}/${editInfo.value.homeCityName}`;
            }
            if (
              editInfo.value.homeProvinceName &&
              !editInfo.value.homeCityName &&
              !editInfo.value.homeCountyName
            ) {
              state.selectedAddress = `${editInfo.value.homeProvinceName}`;
            }
            setFieldsValue({ attachments: editInfo.value.attachments });
          }
        },
        { deep: true },
      );

      const getComboxList = async (type) => {
        const data = await ucenterCodeCombox({ type });
        switch (type) {
          case '10001-10033':
            state.provinceList = data?.list;
            break;
          case '10001-10034':
            formatCity(data?.list || [], 'city');
            break;
          case '10001-10035':
            formatCity(data?.list || [], 'area');
            break;
          default:
            return;
        }
      };

      const getUcenterCodeTree = async (type) => {
        const data = await ucenterCodeTree({ type });
        switch (type) {
          case '10001-52051':
            state.positionList = data;
            if (route.params.type == 'edit' && editInfo.value && editInfo.value.position) {
              state.positionList.forEach((item) => {
                item.children.forEach((it) => {
                  if (it.value == editInfo.value.position) {
                    state.position = [item.value, it.value];
                  }
                });
              });
            }
            break;
          case '10001-52052':
            state.jobTitleList = data;
            if (route.params.type == 'edit' && editInfo.value && editInfo.value.jobTitleId) {
              state.jobTitleList.forEach((item) => {
                item.children.forEach((it) => {
                  if (it.value == editInfo.value.jobTitleId) {
                    state.jobTitleId = [item.value, it.value];
                  }
                });
              });
            }
            break;
          default:
            return;
        }
      };

      //地址
      const formatCity = (list, type) => {
        let cityMap = {};
        list.forEach((item) => {
          if (cityMap[item.parent]) {
            cityMap[item.parent].push(item);
          } else {
            cityMap[item.parent] = [item];
          }
        });
        if (type == 'city') {
          state.cityList = cityMap;
        } else {
          state.areaList = cityMap;
        }
      };
      const selectProvince = (val) => {
        state.addressForm.homeProvince = val;
        selectCity('');
        state.addressForm.homeCounty = '';
      };
      const selectCity = (val) => {
        state.addressForm.homeCity = val;
        state.addressForm.homeCounty = '';
      };
      const selectArea = ({ code, name }) => {
        state.addressForm.homeCounty = code;
        state.selectedAddress = name;
      };
      const clearSelected = () => {
        state.addressForm.homeProvince = '';
        state.addressForm.homeCity = '';
        state.addressForm.homeCounty = '';
        state.selectedAddress = '';
      };

      // 毕业院校
      const handleAddSchool = () => {
        schoolList.value.push({ value: undefined });
      };
      const handleDelSchool = (index) => {
        schoolList.value.splice(index, 1);
      };

      //图片附件
      const handleChange = (list) => {
        setFieldsValue({ pictures: list });
      };

      return {
        ...toRefs(state),

        formatCity,
        selectProvince,
        selectCity,
        selectArea,
        clearSelected,

        schoolList,
        handleAddSchool,
        handleDelSchool,

        handleChange,

        registerForm,
        validateFields,
        getFieldsValue,
        setFieldsValue,
      };
    },
  });
</script>

<style scoped lang="less">
  @import '/@/design/rule-form.less';
</style>
