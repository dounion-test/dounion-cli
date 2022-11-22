export const personInfo = (data) => [
  {
    label: '中文名',
    value: data.name || '-',
  },
  {
    label: '政治面貌',
    value: data.politicalName || '-',
  },
  {
    label: '性别',
    value: data.sexName || '-',
    span: '24',
  },
  {
    label: '民族',
    value: data.nationName || '-',
  },
  {
    label: '手机号',
    value: data.mobile || '-',
  },
  {
    label: '出生日期',
    value: data.birthday || '-',
  },
  {
    label: '电子邮件',
    value: data.email || '-',
  },
  {
    label: '身份证号码',
    value: data.idNo || '-',
  },
  {
    label: '工作单位',
    value: data.companyName || '-',
  },
  {
    label: '联系地址',
    value:
      `${data.homeProvinceName || ''}${data.homeCityName || ''}${data.homeCountyName || ''}` || '-',
  },
  {
    label: '技术职称',
    value:
      data.jobTitleId === '52052-1011' || data.jobTitleId === '52052-2601'
        ? data.otherJobTitle
        : data.jobTitleIdName || '-',
  },
  {
    label: '邮政编码',
    value: data.zipCode || '-',
  },
  {
    label: '职务',
    value:
      data.position === '52051-109' || data.position === '52051-207'
        ? data.otherPosition
        : data.positionName || '-',
  },
  {
    label: '毕业院校',
    value: data.school ? `${data.school.split(',').join('，')}` : '-',
  },
  {
    label: '学历',
    value: data.educationName || '-',
  },
  {
    label: '开户行',
    value: data.bankName || '-',
  },
  {
    label: '银行卡',
    value: data.bankNo || '-',
  },
];

export const menuList = [
  {
    label: '人物经历',
    id: 'CharacterExperience',
    children: [
      {
        label: '教育经历',
        id: 'eduDetailList',
      },
      {
        label: '工作经历',
        id: 'workDetailList',
      },
      {
        label: '社会兼职',
        id: 'socialDetailList',
      },
    ],
  },
  {
    label: '研究领域或行业领域',
    id: 'researchFieldList',
    children: [],
  },
  {
    label: '近年来承担的主要课题/项目',
    id: 'subjectList',
    children: [],
  },
  {
    label: '学术成果',
    id: 'sciAchieveList',
    children: [],
  },
  {
    label: '附件',
    id: 'attachments',
    children: [],
  },
];
