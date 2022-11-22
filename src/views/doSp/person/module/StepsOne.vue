<!--
 * @Author: 江雪松 576053154@qq.com
 * @Date: 2022-08-09 14:57:02
 * @LastEditors: 江雪松 576053154@qq.com
 * @LastEditTime: 2022-10-26 11:54:47
 * @FilePath: /rural-revitalization/src/views/expstore/expert/module/StepsOne.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div style="width: 90%" class="mt-8 m-auto rule-form-wrap">
    <div class="nav-title">基本信息</div>
    <BasicForm @register="registerForm" autoFocusFirstItem>
      <template #spNumber="{ model, field }">
        <a-input
          v-model:value="model[field]"
          class="person-spNumber"
          :maxLength="4"
          :disabled="spNumberDisabled"
        >
          <template #prefix>
            <div>{{ spNumberPrefix }}</div>
          </template>
        </a-input>
      </template>
      <template #provinceCityCounty>
        <address-com
          :provinceList="provinceList"
          :cityList="cityList"
          :areaList="areaList"
          :selectedAddress="selectedAddress"
          :provinceCode="addressForm.homeProvince"
          :cityCode="addressForm.homeCity"
          :areaCode="addressForm.homeCounty"
          @select-province="selectProvince"
          @select-city="selectCity"
          @select-area="selectArea"
          @clear-selected="clearSelected"
        />
      </template>

      <template #nature>
        <address-com
          provinceLabel="专家性质一级"
          cityLabel="专家性质二级"
          areaLabel="专家性质三级"
          :provinceList="natureFirstList"
          :cityList="natureSecondList"
          :areaList="natureThirdList"
          :selectedAddress="selectedNature"
          :provinceCode="natureForm.natureFirst"
          :cityCode="natureForm.natureSecond"
          :areaCode="natureForm.natureThird"
          @select-province="natureSelectProvince"
          @select-city="natureSelectCity"
          @select-area="natureSelectArea"
          @clear-selected="natureClearSelected"
        />
      </template>

      <template #jobTitle>
        <a-form-item-rest>
          <a-space>
            <a-cascader
              style="width: 150px"
              v-model:value="jobTitleId"
              :options="jobTitleList"
              dropdownClassName="person-cascader"
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
                (jobTitleId && jobTitleId[jobTitleId.length - 1] === '52052-2601') ||
                (jobTitleId && jobTitleId[jobTitleId.length - 1] === '52052-1011')
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
              dropdownClassName="person-cascader"
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
                (position && position[position.length - 1] === '52051-109') ||
                (position && position[position.length - 1] === '52051-207')
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
          accept=".png,.jpeg,.jpg"
          :multiple="true"
          @change="handleChange"
          groupName="52030-220"
          :field="field"
        />
      </template>
    </BasicForm>

    <div class="nav-title">联系地址</div>
    <BasicForm @register="registerContactForm" autoFocusFirstItem>
      <template #provinceCityCounty>
        <div class="address-form"
          ><address-com
            :provinceList="provinceList"
            :cityList="cityList"
            :areaList="areaList"
            :selectedAddress="selectedAddress"
            :provinceCode="addressForm.homeProvince"
            :cityCode="addressForm.homeCity"
            :areaCode="addressForm.homeCounty"
            @select-province="selectProvince"
            @select-city="selectCity"
            @select-area="selectArea"
            @clear-selected="clearSelected" />
          <a-input v-model:value="addressForm.address" placeholder="详细地址"
        /></div>
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
  import { schemasOne, schemasContactOne } from '../config/add';
  import { ucenterCodeCombox, ucenterCodeTree } from '/@/api/common/index';
  import { useRoute } from 'vue-router';

  export default defineComponent({
    components: {
      Icon,
      BasicForm,
      AddressCom,
      ImageUpload,
      AInput: Input,
      AFormItemRest: Form.ItemRest,
      ASpace: Space,
      ACascader: Cascader,
    },
    setup() {
      const route = useRoute();
      const schoolList = ref([{ value: undefined }]);
      const editInfo: any = inject('editInfo');
      const spNumberPrefix = ref('');
      const spNumberDisabled = ref(true);
      const state = reactive({
        provinceList: ref([]),
        cityList: ref<any>([]),
        areaList: ref<any>([]),
        selectedAddress: ref(''),
        addressForm: {
          address: '',
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
      const nature = reactive({
        natureFirstList: ref([]),
        natureSecondList: ref<any>([]),
        natureThirdList: ref<any>([]),
        selectedNature: ref(''),
        natureForm: {
          natureFirst: '',
          natureSecond: '',
          natureThird: '',
        },
      });
      const [registerForm, { validateFields, getFieldsValue, setFieldsValue, updateSchema }] =
        useForm({
          labelWidth: 120,
          schemas: schemasOne,
          showResetButton: false,
          showSubmitButton: false,
          actionColOptions: {
            span: 24,
          },
        });
      const [
        registerContactForm,
        {
          validateFields: contactValidateFields,
          getFieldsValue: contactGetFieldsValue,
          setFieldsValue: contactSetFieldsValue,
        },
      ] = useForm({
        labelWidth: 120,
        schemas: schemasContactOne,
        showResetButton: false,
        showSubmitButton: false,
        actionColOptions: {
          span: 24,
        },
      });

      const handleChange = (list) => {
        setFieldsValue({ pictures: list });
      };

      onMounted(() => {
        if (route.params.type == 'add') {
          spNumberDisabled.value = true;
        } else {
          spNumberDisabled.value = false;
        }

        getComboxList('10001-52038');
        getComboxList('10001-52039');
        getComboxList('10001-52040');
        getComboxList('10001-10033');
        getComboxList('10001-10034');
        getComboxList('10001-10035');

        getUcenterCodeTree('10001-52051');
        getUcenterCodeTree('10001-52052');
      });

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
          case '10001-52038':
            nature.natureFirstList = data?.list;
            break;
          case '10001-52039':
            natureFormatCity(data?.list || [], 'city');
            break;
          case '10001-52040':
            natureFormatCity(data?.list || [], 'area');
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

      // 专家类型
      const natureFormatCity = (list, type) => {
        let cityMap = {};
        list.forEach((item) => {
          if (cityMap[item.parent]) {
            cityMap[item.parent].push(item);
          } else {
            cityMap[item.parent] = [item];
          }
        });
        if (type == 'city') {
          nature.natureSecondList = cityMap;
        } else {
          nature.natureThirdList = cityMap;
        }
      };
      const natureSelectProvince = (val) => {
        console.log(val, 'val');
        nature.natureForm.natureFirst = val;
        if (val === '52038-10') {
        }
        natureSelectCity('');
        nature.natureForm.natureThird = '';
        nature.natureForm.natureFirst &&
          nature.natureForm.natureSecond &&
          nature.natureForm.natureThird &&
          setFieldsValue({ nature: '1' });
      };
      const natureSelectCity = (val) => {
        nature.natureForm.natureSecond = val;
        nature.natureForm.natureThird = '';
        nature.natureForm.natureFirst &&
          nature.natureForm.natureSecond &&
          nature.natureForm.natureThird &&
          setFieldsValue({ nature: '1' });
      };
      const natureSelectArea = ({ code, name }) => {
        nature.natureForm.natureThird = code;
        nature.selectedNature = name;
        nature.natureForm.natureFirst &&
          nature.natureForm.natureSecond &&
          nature.natureForm.natureThird &&
          setFieldsValue({ nature: '1' });
      };
      const natureClearSelected = () => {
        nature.natureForm.natureFirst = '';
        nature.natureForm.natureSecond = '';
        nature.natureForm.natureThird = '';
        nature.selectedNature = '';
        setFieldsValue({ nature: undefined });
      };

      // 毕业院校
      const handleAddSchool = () => {
        schoolList.value.push({ value: undefined });
      };
      const handleDelSchool = (index) => {
        schoolList.value.splice(index, 1);
      };

      watch(
        () => editInfo,
        () => {
          if (route.params.type == 'edit') {
            // 专家编码
            spNumberPrefix.value = editInfo.value.spNumber.substring(0, 7);
            // 毕业院校
            let schoolArr = editInfo.value.school?.split(',') || [];
            schoolArr.length && schoolList.value.splice(0, 1);
            schoolArr.forEach((item) => {
              schoolList.value.push({ value: item ? item : undefined });
            });
            // 专家类型
            nature.natureForm.natureFirst = editInfo.value.natureFirst;
            nature.natureForm.natureSecond = editInfo.value.natureSecond;
            nature.natureForm.natureThird = editInfo.value.natureThird;
            nature.selectedNature = `${editInfo.value.natureFirstName}/${editInfo.value.natureSecondName}/${editInfo.value.natureThirdName}`;

            //职务职位
            if (state.jobTitleList.length > 0) {
              state.jobTitleList.forEach((item) => {
                item.children.forEach((it) => {
                  if (it.value == editInfo.value.jobTitleId) {
                    state.jobTitleId = [item.value, it.value];
                  }
                });
              });
            }
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
            state.addressForm.address = editInfo.value.address;
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
          }
        },
        { deep: true },
      );

      return {
        schoolList,
        ...toRefs(state),
        ...toRefs(nature),
        // 省市区
        formatCity,
        selectProvince,
        selectCity,
        selectArea,
        clearSelected,
        // 专家类型
        natureFormatCity,
        natureSelectProvince,
        natureSelectCity,
        natureSelectArea,
        natureClearSelected,
        // form表单
        registerForm,
        validateFields,
        getFieldsValue,
        setFieldsValue,
        handleAddSchool,
        handleDelSchool,
        handleChange,
        spNumberPrefix,
        spNumberDisabled,
        // contactForm表单
        registerContactForm,
        contactValidateFields,
        contactGetFieldsValue,
        contactSetFieldsValue,
      };
    },
  });
</script>

<style lang="less" scoped>
  @import '/@/design/rule-form.less';
</style>

<style lang="less">
  .person-cascader {
    .ant-cascader-menu {
      min-width: 150px;
    }
  }

  .person-spNumber {
    .ant-input-prefix {
      margin-right: 0px;
    }
  }
</style>
