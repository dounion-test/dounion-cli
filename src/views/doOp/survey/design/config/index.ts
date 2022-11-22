/*
 * @Author: 江雪松 576053154@qq.com
 * @Date: 2022-07-18 15:37:20
 * @LastEditors: 江雪松 576053154@qq.com
 * @LastEditTime: 2022-08-05 15:09:19
 * @FilePath: /vben-ucenter/src/views/demo/system/survey/config/index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

// 题型列表
export const questionArr = [
  {
    label: '填空题',
    value: 0,
    type: 'input',
  },
  {
    label: '单选题',
    value: 2,
    type: 'radio',
  },
  {
    label: '多选题',
    value: 3,
    type: 'checkbox',
  },
];

export const inputChild = [
  {
    label: '填空题',
    value: 0,
    type: 'input',
  },
];

// 组件列表
export const componentArr = [
  {
    label: '分类栏',
    value: 5,
    type: 'module',
  },
];

export const formObj = [
  {
    // 题目唯一id
    id: '',
    sonIdNum: 2,
    // 题目类型title
    label: '填空题',
    // 题目的回答
    answer: '',
    // 题目类型
    type: 'input',
    // 单位
    unit: '——',
    // 必填
    required: true,
    // 是否当前选中
    isActived: false,
    // 输入框大小 small/middle/big
    inputSize: 'small',
    // 开启输入校验 default/number/email/phoneNumber/ID
    valueType: 'default',
    // 最小输入文字长度
    minTextLength: '',
    // 最大输入文字长度
    maxTextLength: '',
    // 输入框默认文本
    defaultText: '',
    // 是否显示题干说明
    hasStem: false,
    // 题干说明文本
    stemValue: '请输入题干说明',
    // 输入框提示文本
    placeholder: '请输入',
    children: [],
    // 是否有填写设置
    hasWriteSetting: true,
    // 是否有选项设置
    hasOpionSetting: false,
    // 是否有整题设置
    hasQuestionSetting: true,
  },
  {
    id: '',
    idNum: 2,
    sonIdNum: 2,
    otherIdNum: 2,
    label: '下拉选择',
    type: 'select',
    unit: '——',
    required: true,
    placeholder: '请选择',
    deleteID: [],
    isRemark: false,
    remark: '请输入',
    hasInput: false,
    children: [],
    options: [
      {
        label: '选项1',
        value: 1,
      },
      {
        label: '选项2',
        value: 2,
      },
    ],
    isActived: false,
  },
  {
    id: '',
    idNum: 2,
    sonIdNum: 2,
    otherIdNum: 2,
    label: '单选题',
    type: 'radio',
    unit: '——',
    required: true,
    deleteID: [],
    isRemark: false,
    remark: '请输入',
    hasInput: false,
    children: [],
    options: [
      {
        label: '选项1',
        value: 1,
        // 是否在选项后添加填空框
        hasInput: false,
        // 是否添加选项说明
        hasOptionsItemStem: false,
        // 选项说明文本
        remark: '请输入选项说明',
      },
      {
        label: '选项2',
        value: 2,
        // 是否在选项后添加填空框
        hasInput: false,
        // 是否添加选项说明
        hasOptionsItemStem: false,
        // 选项说明文本
        remark: '请输入选项说明',
      },
    ],
    isActived: false,
    // 是否有填写设置
    hasWriteSetting: false,
    // 是否有选项设置
    hasOpionSetting: true,
    // 是否有整题设置
    hasQuestionSetting: true,
    // 是否显示题干说明
    hasStem: false,
    // 题干说明文本
    stemValue: '请输入题干说明',
  },
  {
    id: '',
    idNum: 3,
    sonIdNum: 2,
    otherIdNum: 2,
    label: '多选题',
    type: 'checkbox',
    unit: '——',
    required: true,
    deleteID: [],
    isRemark: false,
    remark: '请输入',
    hasInput: false,
    children: [],
    options: [
      {
        label: '选项1',
        value: 1,
      },
      {
        label: '选项2',
        value: 2,
      },
      {
        label: '选项3',
        value: 3,
      },
    ],
    isActived: false,
  },
  {
    id: '',
    sonIdNum: 2,
    label: '文本框',
    type: 'textarea',
    unit: '——',
    required: true,
    isActived: false,
    placeholder: '请输入',
    children: [],
  },
  {
    id: '',
    label: '分类栏',
    cname: '分类栏',
    type: 'module',
    isActived: false,
    placeholder: '请输入',
    children: [],
  },
];

// 表头设置默认列表
export const getHeaderArr = () => [
  {
    columeName: '指标名称',
    type: '52044-10',
  },
  {
    columeName: '单位',
    type: '52044-20',
  },
  {
    columeName: '结果',
    type: '52044-30',
  },
];

// 表头设置选择项
export const headerOptions = [
  {
    label: '分栏名',
    value: 'cname',
  },
  {
    label: '题干',
    value: 'label',
  },
  {
    label: '单位',
    value: 'unit',
  },
  {
    label: '答案',
    value: 'reault',
  },
];

// 富文本工具栏
export const toolbar = ['fontsizeselect | bold | italic | underline | forecolor'];

// 富文本设置
export const tinymceOptions = {
  inline: true,
  auto_focus: false,
  menubar: false,
  placeholder: '请输入内容',
  fontsize_formats: '12px 14px 18px 24px 36px 48px',
};

// 所有题型
export const ALL_TYPES = ['module', 'input', 'radio', 'checkbox'];

export const valueTypeList = [
  {
    value: 'default',
    label: '不限',
  },
  {
    value: 'number',
    label: '数字',
  },
  {
    value: 'email',
    label: 'Email',
  },
  {
    value: 'phoneNumber',
    label: '手机号码',
  },
  {
    value: 'ID',
    label: '身份证',
  },
];

// 逻辑设置选择项
export const logicOption = {
  '52020-20': [
    {
      label: '选中',
      value: 1,
    },
    {
      label: '未选中',
      value: 2,
    },
    {
      label: '显示',
      value: 3,
    },
    {
      label: '未显示',
      value: 4,
    },
    {
      label: '已答',
      value: 5,
    },
    {
      label: '未答',
      value: 6,
    },
  ],
  '52020-30': [
    {
      label: '选择',
      value: 1,
    },
    {
      label: '未选择',
      value: 2,
    },
  ],
  '52020-10': [
    {
      label: '答案结果(运算)',
      value: 1,
      option: [
        {
          label: '+',
          value: 1,
        },
        {
          label: '-',
          value: 2,
        },
        {
          label: '*',
          value: 3,
        },
        {
          label: '/',
          value: 3,
        },
      ],
    },
    {
      label: '答案结果(比较)',
      value: 2,
      option: [
        {
          label: '大于',
          value: 1,
        },
        {
          label: '等于',
          value: 2,
        },
        {
          label: '小于',
          value: 3,
        },
        {
          label: '小于等于',
          value: 4,
        },
        {
          label: '大于等于',
          value: 5,
        },
      ],
    },
    {
      label: '答案格式',
      value: 3,
      option: [
        {
          label: '文本',
          value: 1,
        },
        {
          label: '日期',
          value: 2,
        },
        {
          label: '数值',
          value: 3,
        },
        {
          label: '整数',
          value: 4,
        },
      ],
    },
  ],
};

export const showOption = [
  {
    label: '显示',
    value: '52023-10',
  },
  // {
  //   label: '跳转',
  //   value: '52023-20',
  // },
];
