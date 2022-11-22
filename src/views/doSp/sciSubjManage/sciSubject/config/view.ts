export const titleArr = [
  {
    label: '立项',
    id: 'topic',
  },
  {
    label: '评审或咨询',
    id: 'consult',
  },
  {
    label: '开题',
    id: 'kaiti',
  },
  {
    label: '中期检查',
    id: 'inspection',
  },
  {
    label: '变更',
    id: 'change',
  },
  {
    label: '结题归档',
    id: 'placeOnFile',
  },
];

const getPersonName = (teamPersons, isTeam) => {
  if (!teamPersons || teamPersons?.length == 0) {
    return '-';
  } else {
    let names = '';
    teamPersons.forEach((item, i) => {
      if (isTeam) {
        if (item.role === '52006-10') {
          names = names + item.personName + (i === item?.length ? '' : '，');
        }
      } else {
        if (item.role !== '52006-10') {
          names = names + item.personName + (i === item?.length ? '' : '，');
        }
      }
    });
    if (names) {
      names = names.slice(0, names.length - 1);
    }
    return names || '-';
  }
};

export const viewSchemaOne = [
  {
    label: '内部项目编号',
    id: 'code',
    labelMinWidth: 80,
    contentMinWidth: 150,
    render: (_, form) => {
      return form.code || '-';
    },
  },
  {
    label: '立项日期',
    id: 'proDate',
    labelMinWidth: 80,
    contentMinWidth: 150,
    render: (_, form) => {
      return (form.proDate || '-') + ' 至 ' + (form.proEndDate || '-');
    },
  },
  {
    label: '上级部门',
    id: 'deptName',
    render: (_, form) => {
      return form.deptName || '-';
    },
  },
  {
    label: '课题发布部门',
    id: 'publishDeptName',
    render: (_, form) => {
      return form.deptName || '-';
    },
  },
  {
    label: '项目实施周期',
    id: 'projPeriod',
    render: (value, form) => {
      return (form.projPeriod || '-') + form.periodUnit;
    },
  },
  {
    label: '负责人',
    id: 'teamPersons',
    render: (_, form) => {
      return getPersonName(form.teamPersons, true);
    },
  },
  {
    label: '课题经费',
    id: 'funds',
    render: (_, form) => {
      return (form.funds || '-') + form.feeUnit;
    },
  },
  {
    label: '参与人员',
    id: 'teamPersons',
    render: (_, form) => {
      return getPersonName(form.teamPersons, false);
    },
  },
];
