<template>
  <div>
    <PageWrapper title="课题/项目" contentFullHeight contentBackground contentClass="p-4">
      <template #headerLeft
        ><span class="total-text"
          >（{{ curYear }}年已有<em>{{ total }}</em
          >个课题/项目立项！）</span
        ></template
      >
      <template #headerContent>
        <div class="flex">
          <SearchWrap placeholder="请输入课题或项目名称" @search="renderTable" />
          <!-- <div class="search-box">
          <a-input-search
            v-model:value="searchValue"
            placeholder="请输入课题或项目的名称"
            style="width: 300px"
            @search="renderTable"
            :disabled="spinning"
          />
        </div> -->
          <Authority value="SpSciSubjectAdd">
            <a-button class="ml-4" @click="handleCreate" type="primary"
              ><Icon icon="ant-design:plus-outlined" />新增</a-button
            >
          </Authority>
          <!-- <a-button class="ml-2" @click="renderTable"
            ><Icon icon="ant-design:reload-outlined" />刷新</a-button
          > -->
        </div>
      </template>
      <a-spin :spinning="spinning">
        <div v-if="tableList.length" class="content">
          <div v-for="(items, index) in tableList" :key="index">
            <a-typography-title :level="4">{{ items.date }}</a-typography-title>

            <a-list class="project-flowlist">
              <a-list-item
                v-for="item in items.sciSubList"
                :key="item.id"
                @dblclick="handleEdit(item.id)"
              >
                <a-list-item-meta>
                  <template #avatar>
                    <img
                      class="pic"
                      v-if="getImgUrl(item.projectPictureFile)"
                      :src="getImgUrl(item.projectPictureFile)"
                    />
                    <template v-else>
                      <div class="flex items-center justify-center no-pic"><img :src="logo" /></div>
                    </template>
                  </template>
                  <template #title>
                    <h3
                      :class="{ 'c-link': hasPermission('SpSciSubjectView') }"
                      @click="(e) => goView(e, item)"
                      >【{{ item.typeName }}】{{ item.name }}</h3
                    >
                    <Authority value="SpSciSubjectEdit">
                      <a-tooltip placement="bottom" v-if="!item.isFinished">
                        <template #title>
                          <span>编辑</span>
                        </template>
                        <Icon
                          class="ml-5 edit"
                          tooltip="编辑"
                          icon="eva:edit-2-outline"
                          size="18"
                          @click="handleEdit(item.id)"
                        />
                      </a-tooltip>
                    </Authority>

                    <Authority value="SpSciSubjectDelete">
                      <a-tooltip placement="bottom">
                        <template #title>
                          <span>删除</span>
                        </template>
                        <Icon
                          class="ml-5"
                          color="red"
                          tooltip="删除"
                          icon="fluent:delete-28-regular"
                          size="18"
                          @click="handleDelete(item.id)"
                        />
                      </a-tooltip>
                    </Authority>
                  </template>
                  <template #description>
                    <div class="info">
                      <span class="mr-5 ml-3"
                        >负责人：{{ getPersonName(item, true) }} 项目小组：{{
                          getPersonName(item, false)
                        }}
                        <!-- <a-button @click="handleAuth(item)" class="ml-5" type="primary" size="small"
                        >授权管理</a-button
                      > --> </span
                      ><span>起止时间：{{ item.startDate }} 至 {{ item.endDate }}</span>
                    </div>

                    <ul class="flow-list mt-1">
                      <li>
                        <div
                          class="title"
                          :class="{ isActivated: item.estabRhtxtId || item.isFinished }"
                        >
                          <span class="icon">
                            <Icon icon="fluent:clipboard-task-add-24-regular" size="22" />
                          </span>
                          <strong>立项</strong>
                        </div>
                        <span class="arrow"><double-right-outlined /></span>
                      </li>
                      <li>
                        <div
                          class="title"
                          :class="{ isActivated: item.reviewRhtxtId || item.isFinished }"
                        >
                          <span class="icon">
                            <Icon icon="uil:comment-shield" size="22" />
                          </span>
                          <strong>评审或咨询</strong>
                        </div>
                        <span class="arrow"><double-right-outlined /></span>
                      </li>
                      <li>
                        <div
                          class="title"
                          :class="{ isActivated: item.openRhtxtId || item.isFinished }"
                        >
                          <span class="icon">
                            <Icon icon="mdi:calendar-start-outline" size="22"
                          /></span>
                          <strong>开题</strong>
                        </div>
                        <span class="arrow"><double-right-outlined /></span>
                      </li>
                      <li>
                        <div
                          class="title"
                          :class="{ isActivated: item.checkRhtxtId || item.isFinished }"
                        >
                          <span class="icon"> <Icon icon="lucide:inspect" size="22" /></span>
                          <strong>中期检查</strong>
                        </div>
                        <span class="arrow"><double-right-outlined /></span>
                      </li>
                      <li v-if="item.isClosed">
                        <div
                          class="title"
                          :class="{ isActivated: item.altrRhtxtId || item.isFinished }"
                        >
                          <span class="icon"> <Icon icon="gis:layer-alt-edit" size="22" /></span>
                          <strong>变更</strong>
                        </div>

                        <span class="arrow"><double-right-outlined /></span>
                      </li>
                      <li>
                        <div
                          class="title"
                          :class="{ isActivated: item.projcRhtxtId || item.isFinished }"
                        >
                          <span class="icon">
                            <Icon icon="mdi:file-replace-outline" size="22"
                          /></span>
                          <strong>结题归档</strong>
                          <!-- <strong>结束时间：{{ item.conclusTime }}</strong> -->
                        </div>
                      </li>

                      <li class="ml-15 flow-status">
                        <span class="icon end"
                          ><check-circle-outlined :class="{ isActivated: item.isFinished }"
                        /></span>
                        <strong>完成</strong>
                      </li>
                    </ul>
                  </template>
                </a-list-item-meta>
              </a-list-item>
            </a-list>
          </div>
        </div>
        <a-empty v-else />
      </a-spin>

      <div class="text-right" v-if="total">
        <a-pagination
          @change="handlePageChange"
          v-model:current="pageNo"
          v-model:page-size="pageSize"
          :total="total"
          size="small"
          show-quick-jumper
          :show-total="(total) => `共 ${total} 条数据`"
        />
      </div>
    </PageWrapper>

    <BasicModal @register="registerModal" :width="800" title="团队成员赋予管理权限" @ok="handleOk">
      <BasicForm :actionColOptions="{ span: 16 }" @register="register" class="width-80">
        <template #add="{ field }">
          <Button v-if="Number(field) === 0" @click="handleAddDeclarant(1)">+</Button>
          <Button v-if="field > 0" @click="handleDelDeclarant(field, 1)">-</Button>
        </template>
      </BasicForm>
    </BasicModal>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref, onMounted, unref, nextTick, reactive, toRefs } from 'vue';
  import { useRouter } from 'vue-router';
  import { List, Pagination, Spin, Tooltip, Typography, Empty } from 'ant-design-vue';
  import { PageWrapper } from '/@/components/Page';
  import { Authority } from '/@/components/Authority';
  import { getSpSciSubjectList, spSciSubjectDelete } from '/@/api/testDemo/scientific';
  import { statusObj, basicSchemas } from './config/index';
  import { BasicModal, useModal } from '/@/components/Modal';
  import { Icon } from '/@/components/Icon';
  import demoImg from '/@/assets/images/demo.png';
  import { DoubleRightOutlined, CheckCircleOutlined } from '@ant-design/icons-vue';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { createPersonConfig, createRoleConfig, createBtnConfig } from './config/add';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { SearchWrap } from '/@/components/SearchWrap';
  import { usePermission } from '/@/hooks/web/usePermission';
  import dayjs from 'dayjs';
  import logo from '/@/assets/images/logo.png';

  export default defineComponent({
    name: 'SpSciSubjectList',
    components: {
      PageWrapper,
      SearchWrap,
      Authority,
      BasicModal,
      [List.name]: List,
      [List.Item.name]: List.Item,
      AListItemMeta: List.Item.Meta,
      DoubleRightOutlined,
      CheckCircleOutlined,
      BasicForm,
      Icon,
      APagination: Pagination,
      ASpin: Spin,
      ATooltip: Tooltip,
      ATypographyTitle: Typography.Title,
      AEmpty: Empty,
    },
    setup() {
      const router = useRouter();
      const { hasPermission } = usePermission();
      const { createConfirm, createMessage } = useMessage();
      const curYear = ref(dayjs().format('YYYY'));
      /**
       * 授权管理
       */
      const [
        register,
        {
          validateFields,
          getFieldsValue,
          setFieldsValue,
          appendSchemaByField,
          removeSchemaByFiled,
        },
      ] = useForm({
        labelWidth: 100,
        schemas: basicSchemas,
        showActionButtonGroup: false,
      });
      const n = ref<number>(1);
      const handleAddDeclarant = () => {
        appendSchemaByField(createPersonConfig(n.value), '');
        appendSchemaByField(createRoleConfig(n.value), '');
        appendSchemaByField(createBtnConfig(n.value), '');
        n.value++;
      };

      const handleDelDeclarant = (field) => {
        removeSchemaByFiled([`personId-${field}`, `role-${field}`, field]);
      };

      /**
       * tabs key
       */
      const tabsActiveKey = ref<string>('1');

      /**
       * 搜索 value和 事件
       */
      const searchValue = ref<string>('');
      const onSearch = () => {};

      /**
       * 申报课题
       */
      const [registerModal, { openModal, closeModal }] = useModal();

      const handleOk = async () => {
        // await getFieldsValue();
        closeModal();
      };

      /**
       * table 列表
       */
      const tableList = ref<Recordable>([]);
      const spinning = ref<Boolean>(false);
      const pagination = reactive({
        pageNo: 1,
        pageSize: 10,
        total: 0,
      });
      const handlePageChange = (pageNo, pageSize) => {
        pagination.pageNo = pageNo;
        pagination.pageSize = pageSize;
        renderTable();
      };
      const renderTable = (val?: string | object) => {
        spinning.value = true;
        let nameQueryLike: string | object | undefined = undefined;
        if (val instanceof PointerEvent) {
          nameQueryLike = undefined;
        } else {
          nameQueryLike = val;
        }
        getSpSciSubjectList({ ...pagination, nameQueryLike })
          .then((res) => {
            tableList.value = res?.list;

            pagination.total = res?.total;

            spinning.value = false;
          })
          .catch(() => {
            spinning.value = false;
          });
      };
      onMounted(() => renderTable());
      const selectRowRecord = ref<Recordable>({});

      const getImgUrl = (fileList) => {
        if (!fileList || !fileList?.length) return '';
        return '/dofile' + fileList[0]?.filePath;
      };
      // 获取负责人
      const getPersonName = ({ teamPersons }, isTeam) => {
        if (teamPersons?.length == 0) {
          return '暂无';
        } else {
          let names = '';
          teamPersons?.forEach((item, i) => {
            if (isTeam) {
              if (item.role === '52006-10') {
                names = names + item.personName + (i === item.length ? '' : '　 ');
              }
            } else {
              if (item.role !== '52006-10') {
                names = names + item.personName + (i === item.length ? '' : '　 ');
              }
            }
          });
          return names || '暂无';
        }
      };

      const handleCreate = () => {
        router.push({
          name: 'SpSciSubjectAdd',
          params: { type: 'add' },
        });
      };

      const handleEdit = (id) => {
        if (!hasPermission('SpSciSubjectEdit')) {
          createMessage.warning('对不起，您暂无查看权限！');
          return false;
        }
        router.push({
          name: 'SpSciSubjectEdit',
          params: { type: 'edit', id },
        });
      };

      // 查看
      const handleView = ({ id }) => {
        router.push({
          name: 'scientificView',
          params: {
            id,
          },
        });
      };

      // 授权管理
      const anthId = ref(null);
      const handleAuth = (record) => {
        anthId.value = record.id;
        openModal(true, { isUpdate: true });

        nextTick(() => {
          /**
           * 处理报名人员字段
           */
          const { teamPersons } = record;
          let teamPersons_1 = unref<Recordable>({});

          teamPersons.forEach((item, i) => {
            if (i == 0) {
              setFieldsValue({ 'personId-0': item.personId, 'role-0': item.role });
            } else {
              teamPersons_1['personId-' + n.value] = item.personId;
              teamPersons_1['role-' + n.value] = item.role;
              handleAddDeclarant();
              setFieldsValue(teamPersons_1);
            }
          });
        });
      };

      const handleDelete = (id) => {
        createConfirm({
          iconType: 'warning',
          title: '提示',
          content: '此操作会删除该数据, 是否继续?',
          onOk() {
            spSciSubjectDelete({ ids: id + '' }).then(() => {
              renderTable();
            });
          },
        });
      };

      const goView = (e, { id }) => {
        e.stopPropagation();
        router.push({
          name: 'SpSciSubjectView',
          params: {
            id,
          },
        });
      };

      const getStatus = ({ status }) => {
        let value = statusObj.get(status);

        return value || { label: '无', type: 'warning' };
      };

      return {
        tabsActiveKey,
        searchValue,
        selectRowRecord,
        onSearch,
        handleView,
        registerModal,
        handleOk,
        handleCreate,
        handleEdit,
        handleDelete,
        getImgUrl,
        getPersonName,
        goView,
        handleAuth,
        handleAddDeclarant,
        handleDelDeclarant,
        register,
        ...toRefs(pagination),
        handlePageChange,
        renderTable,
        demoImg,
        getStatus,
        tableList,
        spinning,
        hasPermission,
        curYear,
        logo,
      };
    },
  });
</script>

<style scoped lang="less">
  [data-theme='dark'] {
    .search-box,
    .content {
      background-color: #151515;
    }
  }

  .content {
    background-color: #fff;
  }

  :deep(.ant-tabs) {
    padding: 6px;

    .ant-tabs-nav {
      margin-bottom: 0 !important;
    }
  }

  .pic {
    width: 150px;
    height: 120px;
    border-radius: 10px;
  }

  .flow-list {
    display: flex;
    padding-top: 5px;

    li {
      position: relative;
      display: flex;
      justify-content: center;
      width: 100px;

      > div:first-child {
        display: flex;
        flex-direction: column;
        align-items: center;
      }

      .end .isActivated {
        color: #87d068;
      }

      .title {
        .icon {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 50px;
          height: 50px;
          color: #999;
          border-radius: 100%;
          border-width: 2px;
          border-style: solid;
        }

        strong {
          margin-top: 5px;
          font-weight: normal;
        }

        &.isActivated {
          color: #000;

          .icon {
            color: @primary-color;
            border-color: @primary-color;
          }

          .arrow {
            color: #666;
          }
        }
      }

      &.flow-status {
        flex-direction: column;
        align-items: center;

        .icon {
          display: inline-flex;
          align-items: center;
          height: 50px;
        }

        .anticon {
          font-size: @font-size-b16;
        }

        strong {
          margin-top: 5px;
          font-size: @font-size-b2;
          font-weight: normal;
        }
      }

      .arrow {
        position: absolute;
        right: -8px;
        top: 16px;
        color: #999;

        > span {
          font-size: @font-size-b6;
        }
      }
    }
  }

  :deep(.ant-upload-list-item) {
    margin-top: 0;
  }

  :deep(.ant-list-item-meta-title) {
    display: flex;
    align-items: center;

    .app-iconify {
      cursor: pointer;
    }

    h3 {
      margin-bottom: 0;
      font-size: @font-size-b4;
      font-weight: 600;

      &.c-link {
        cursor: pointer;

        &:hover {
          color: @primary-color !important;
        }
      }
    }

    .edit {
      color: @primary-color;
    }
  }

  .no-pic {
    height: 100%;
    color: #666;
    background: #e8e8e8;
    width: 150px;
    height: 120px;
    border-radius: 10px;

    img {
      max-height: 60%;
      object-fit: contain;
    }
  }
</style>
