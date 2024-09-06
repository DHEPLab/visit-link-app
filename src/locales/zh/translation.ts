export default {
  Component: {
    question: "问卷",
    locationMessage: "定位权限未打开，无法开始课堂",
    waitingSubmit: "待提交",
    currentSelection: "当前选择：",
  },
  Navigator: {
    home: "首页",
    visit: "家访安排",
    account: "个人中心",
    resetPassword: "修改账户密码",
    babyList: "宝宝列表",
  },
  Me: {
    account: "个人中心",
    myAccount: "我的账户",
    username: "账户名称",
    password: "账户密码",
    resetMyPassword: "修改密码",
    mySupervisor: "我的督导",
    supervisorName: "督导姓名",
    supervisorPhoneNumber: "督导电话",
    logOut: "退出登录",
    logOutSuccessfully: "您已退出登录",
    logOutConfirmation: "您确定要退出登录吗?",
    cancel: "稍后再说",
    id: "ID",
    version: "版本号",
  },
  ChangePassword: {
    oldPasswordRequired: "旧密码不能为空",
    passwordMinLength: "密码必须至少 6 个字符",
    passwordRequired: "不能为空",
    oldPasswordIncorrect: "旧密码错误",
    passwordChangeWarning: "请您牢记修改的账户密码，提交后将不再显示。",
    passwordChangeSuccess: "修改成功，请重新登录",
    oldPassword: "旧密码",
    newPassword: "新密码",
    confirmPassword: "确认密码",
    passwordMismatch: "您两次输入的新密码不一致",
    submit: "提交",
  },
  SignIn: {
    loginSuccess: "登录成功",
    enterUsername: "请输入账户名称",
    enterPassword: "请输入账户密码",
    forgotPassword: "忘记密码",
    badCredentials: "您输入的账号名称/账号密码可能有误",
    login: "登录",
  },
  App: {
    submitFailed: "提交失败",
    networkError: "网络发生错误，请稍后重试",
    understood: "知道了",
    offlineMessage: "当前处于离线模式",
    formValidate: "表单校验失败",
    locationServiceMessage: "未打开手机定位服务，无法获取位置信息！",
  },
  Babies: {
    searchPlaceholder: "请您输入要搜索的宝宝姓名",
    backupPrompt: "请及时备份宝宝数据到本地，以便离线时正常使用, ",
    backupLink: "点此一键备份",
    backupSuccess: "备份成功",
    offlineMode: "当前系统处于离线模式",
    babyList: "宝宝列表",
    sortBy: "排序方式：",
    name: "姓名",
    creationTime: "创建时间",
    attention: "请注意",
    addBaby: "添加宝宝",
    attentionTooltip:
      "预产日期已过时请联系并确认是否已出生，若已出生则修改宝宝为已出生并填写准确的出生日期，若尚未出生请修改并延长预产日期。注意：当宝宝成长阶段由待产期调为已出生后不可改回待产期。",
    noBabyInfo: "尚未添加宝宝信息",
    noMatchingBaby: "暂无匹配的宝宝信息",
  },
  ListFooter: {
    noMoreData: "无更多数据",
  },
  MiniBaby: {
    babyDueDateArrived: "宝宝预产期已到",
    idNotFilled: "未填写",
    days: "天",
  },
  ApproveStatus: {
    approved: "已审核",
    pending: "待审核",
  },
  Common: {
    back: "返回",
    edit: "编辑",
    cancel: "放弃",
    submit: "提交",
    ok: "知道了",
    start: "开始",
    confirm: "确定",
  },
  enum: {
    QuestionType: {
      Text: "填空",
      Checkbox: "多选",
      Radio: "单选",
    },
    ModuleStatus: {
      DONE: "已完成",
      UNDONE: "待开始",
    },
    BabyStage: {
      EDC: "待产期",
      BIRTH: "已出生",
    },
    FeedingPattern: {
      BREAST_MILK: "纯母乳喂养",
      MILK_POWDER: "纯奶粉喂养",
      MIXED: "母乳奶粉混合喂养",
      TERMINATED: "已终止母乳/奶粉喂养",
    },
    AssistedFood: {
      TRUE: "已添加",
      FALSE: "未添加",
    },
    RELATIVES: {
      MOTHER: "妈妈",
      FATHER: "爸爸",
      GRANDMOTHER: "奶奶",
      GRANDMA: "外婆",
      GRANDFATHER: "爷爷",
      GRANDPA: "外公",
      OTHER: "其他",
    },
    VisitStatus: {
      NOT_SUBMIT: "待提交",
      NOT_STARTED: "待开始",
      UNDONE: "未完成",
      EXPIRED: "已过期",
      DONE: "已完成",
    },
  },
  BabyForm: {
    nameValidation: "只允许1-50个字符，不包含特殊字符",
    required: "此项为必填",
    babyInfo: "宝宝信息",
    babyName: "宝宝姓名",
    enterBabyName: "请输入1-50个字符",
    babyGender: "宝宝性别",
    growthStage: "成长阶段",
    dueDate: "预产日期",
    birthDate: "出生日期",
    supplementFood: "添加辅食",
    feedingMethods: "喂养状态",
    submit: "提交",
  },
  DatePicker: {
    selectDate: "请选择年/月/日",
  },
  CreateBabyStep1: {
    nextStep: "下一步",
    attention: "提示",
    loseEditedContent: "已编辑内容将丢失是否返回至宝宝列表",
    exit: "退出",
    thinkAgain: "再想想",
  },
  CreateBabyStep2: {
    setPrimaryCarer: "必须设置一个主看护人",
    carerList: "看护人列表",
    maxCarers: "最多可添加4位看护人",
    addCarer: "添加看护人",
    nextStep: "下一步",
  },
  CarerItem: {
    caregiver: "看护人{{number}}",
    primaryCaregiver: "主看护人",
    setPrimaryCaregiver: "设为主看护人",
    delete: "删除",
    edit: "修改",
    caregiverName: "看护人姓名",
    relationship: "亲属关系",
    phoneNumber: "联系电话",
    wechatAccount: "微信号码",
  },
  CreateCarer: {
    nameValidation: "只允许1-50个字符，不包含特殊字符",
    required: "此项为必填",
    phoneValidation: "只允许5-20个数字",
    wechatValidation: "最多20个字符",
    setPrimaryCaregiver: "请至少设置一个主看护人",
    confirmEdit: "确认修改宝宝信息吗？",
    caregiver: "看护人",
    primaryCaregiver: "主看护人",
    realName: "真实姓名",
    realNamePlaceholder: "请输入真实姓名",
    enterName: "请输入1-50个字符",
    relationship: "亲属关系",
    phoneNumber: "联系电话",
    enterPhone: "请输入5-20位手机号码",
    wechatAccount: "微信号码",
    enterWechat: "请输入微信号",
    submit: "提交",
    add: "添加",
  },
  AddressForm: {
    required: "此项为必填",
    locationMaxLength: "最多200个字符",
    addressInfo: "地址信息",
    area: "所在区域",
    selectArea: "请选择省/市/县（区）/乡（镇）",
    detailedAddress: "详细地址",
    enterDetailedAddress: "请输入详细地址，精确到门牌号",
    submit: "提交",
  },
  CreateBabyStep3: {
    submitSuccess: "提交成功",
    submitMessage:
      "稍后可在列表中查看结果，新建宝宝需要督导员审核，如需尽快审核，请直接联系您的督导员。",
  },
  Baby: {
    editCarer: "编辑看护人",
    editAddress: "修改地址信息",
    editBabyTitle: "修改宝宝信息",
    selectBaby: "选择宝宝",
    babyDetails: "宝宝详情",
    id: "ID",
    notAvailable: "暂无",
    babyDueDateArrived: "宝宝预产期已到",
    babyAge: "{{stage}} {{days}} 天",
    feedingStatus: "喂养状态",
    editInfo: "修改资料",
    visitRecords: "家访记录",
    familyInfo: "家庭信息",
    understood: "知道了",
    submitSuccess: "提交成功",
    submitSuccessMessage:
      "宝宝信息修改需要经过您的督导员审核，如需尽快审核，请直接联系您的督导员。",
    cannotCreateVisit: "无法新建家访",
    offlineVisitExists: "已创建离线家访，不可重复创建",
    noMatchingClass: "没有匹配的课堂，无法创建家访",
    waitForApproval: "请等待宝宝完成审核",
    offlineMode: "当前系统处于离线模式",
    plannedVisits: "计划中的家访",
    completedIncompleteExpiredVisits: "已完成/未完成/已过期家访",
    noResults: "没有相关结果",
    newVisit: "新建家访",
    remarks: "备注信息",
    edit: "修改",
    add: "添加",
    addressInfo: "地址信息",
    area: "所在区域",
    detailedAddress: "详细地址",
    caregiverInfo: "看护人信息",
    setPrimaryCarerFirst: "需重新设置主看护人再进行此操作",
    deactivateBaby: "注销宝宝",
    deactivateBabyConfirm: "你是否要注销宝宝账户？",
    enterDeactivationReason: "请输入宝宝的注销原因",
    deactivate: "注销",
    addRemarks: "添加备注信息",
    enterBabyRemarks: "请输入宝宝的备注信息",
    deleteCaregiver: "删除此看护人",
    confirmDeleteCaregiver: "确认要删除此看护人？",
    delete: "删除",
    cancel: "取消",
    confirmEditInfo: "确认提交修改信息？",
  },
  ConfirmModal: {
    defaultTitle: "提示信息",
    defaultContent: "确认{{content}}？",
    confirm: "确认",
    cancel: "取消",
  },
  CreateBabyNavigator: {
    addBaby: "添加宝宝",
    babyInfo: "宝宝信息",
    caregiverInfo: "看护人信息",
    addressInfo: "地址信息",
  },
  Ghost: {
    back: "返回",
  },
  Form: {
    pleaseInput: "请输入",
    pleaseSelect: "请选择",
  },
  Visits: {
    visitArrangement: "家访日程安排",
    foldCalender: "收起日历",
    unfoldCalender: "展开日历",
    noVisitSchedule: "该日期暂时没有家访安排",
    selectBabyMessage:
      "根据系统规则，部分宝宝在该时间无法安排家访，因此不可选。",
    emptyBaby: "暂无可用宝宝",

    selectVisitDate: "选择家访日期",
    selectVisitTime: "选择家访时间",
    visitTimeConflict: "家访时间冲突",
    VisitTimeConflictMessage:
      "您所选的时间段有邻近的家访安排，可能会时间冲突，确定选择该时间吗？",

    notStartMessage: "时间未到，无法开始课堂",
    continueLesson: "继续课堂",
    startLesson: "开始课堂",
    cancelVisit: "取消家访",
    canNotStartLessonMessage: "无法开始课堂",
    confirmStartLessonMessage: "您确定要立即开始本次家访吗？",
    visitSchedule: "本次拜访日程为",
    cancelVisitReason: "取消家访原因",
    later: "再想想",
    inputVisitReason: "请填写取消家访原因",
    scheduleVisit: "新建家访",
    vistEdit: "修改",
    vistSelect: "选择",
    lessonScheduleTip1:
      "当前阶段宝宝的下一次家访课堂为“{{lessonName}}”，最早开始时间为{{date}},",
    lessonScheduleTip2:
      "{{date}}之后宝宝将进入下一阶段则会错过当前阶段的课堂。",
    noLessonTip: "课程安排将在选择家访对象后自动展示",
    offlineBooking: "离线预约",
    sessionIncluded: "课程安排",
    module: "模块",
    preview: "预览",
    visitInfo: "家访对象",
    carerName: "主照料人",
    carerPhone: "联系电话",
    area: "所在区域",
    location: "详细地址",
    startTime: "开始时间",
    endTime: "结束时间",
    edit: "修改",
    unavailableMessage: "请先到首页更新课程资源",
    inputRemark: "请填写备注",
    inputIncompleteRemark: "请填写备注",
    babyName: "宝宝名称",
    lessonName: "课堂名称",
    visitTime: "家访时间",
    visitDetail: "家访详情",
    remarkTitle: "备注",
    expiredReason: "过期原因",
    undoneReason: "未完成原因",
    upComingVisit: "即将到来的家访",
  },
  Session: {
    next: "下一步",
    locationPermissionMessage: "未授予获取用户位置的权限，无法进行家访任务！",
    locationClosedMessage: "未打开手机定位服务，无法进行家访任务！",
    completeTip: "你需要在本次家访中完成\n如下全部模块",
    completeVisit: "完成家访",
    unableToCompleteVisit: "无法完成家访",
    quizTips: "有未完成题目，请全部作答",
  },
  Question: {
    exit: "退出问卷",
    complete: "完成",
    unsaved: "无法保存问卷",
  },
  BabyItem: {
    primaryCaregiver: "主要看护人",
    contactInfo: "联系方式",
    none: "无",
  },
  Module: {
    exit: "退出模块",
    complete: "完成",
    next: "下一步",
    previous: "上一步",
  },
  Home: {
    downloadSuccess: "下载最新课程资源成功！",
    downloadError: "下载最新课程资源失败！",
    waitForSync: "等待同步",
    waitForMessage: "您有尚未同步的上课记录，恢复网络连接后将自动同步",
    nextVisitDate: "您的下一次家访: ",
    noVisitMessage: "您没有家访安排，\n请创建新的家访：",
    download: "一键下载",
    update: "一键更新",
  },
};
