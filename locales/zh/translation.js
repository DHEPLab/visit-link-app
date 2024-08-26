export default {
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
        version: "版本号"
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
        submit: "提交"
    },
    SignIn: {
        loginSuccess: "登录成功",
        enterUsername: "请输入账户名称",
        enterPassword: "请输入账户密码",
        forgotPassword: "忘记密码",
        badCredentials: "您输入的账号名称/账号密码可能有误",
        login: "登录"
    },
    App: {
        submitFailed: "提交失败",
        networkError: "网络发生错误，请稍后重试",
        understood: "知道了"
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
        attentionTooltip: "预产日期已过时请联系并确认是否已出生，若已出生则修改宝宝为已出生并填写准确的出生日期，若尚未出生请修改并延长预产日期。注意：当宝宝成长阶段由待产期调为已出生后不可改回待产期。",
        noBabyInfo: "尚未添加宝宝信息",
        noMatchingBaby: "暂无匹配的宝宝信息"
    },
    ListFooter: {
        noMoreData: "无更多数据"
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
    Navigator:{
        account:"个人中心",
        resetPassword: "修改账户密码",
    },
    Common: {
        back: "返回",
    },
    enum: {
        BabyStage: {
            EDC: "待产期",
            BIRTH: "已出生"
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
    },
    BabyForm: {
        nameValidation: "请输入2个以上的汉字，最多10个字符",
        required: "此项为必填",
        babyInfo: "宝宝信息",
        babyName: "宝宝姓名",
        enterBabyName: "请输入2-10个汉字",
        babyGender: "宝宝性别",
        growthStage: "成长阶段",
        dueDate: "预产日期",
        birthDate: "出生日期",
        supplementFood: "添加辅食",
        feedingMethods: "喂养状态",
        submit: "提交"
    },
    DatePicker: {
        selectDate: "请选择年/月/日",
    },
    CreateBabyStep1: {
        nextStep: "下一步",
        attention: "提示",
        loseEditedContent: "已编辑内容将丢失是否返回至宝宝列表",
        exit: "退出",
        thinkAgain: "再想想"
    },
    CreateBabyStep2: {
        setPrimaryCarer: "必须设置一个主看护人",
        carerList: "看护人列表",
        maxCarers: "最多可添加4位看护人",
        addCarer: "添加看护人",
        nextStep: "下一步"
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
        nameValidation: "请输入2个以上的汉字，最多10个字符",
        required: "此项为必填",
        phoneValidation: "请输入正确的手机号",
        wechatValidation: "最多20个字符",
        setPrimaryCaregiver: "请至少设置一个主看护人",
        confirmEdit: "确认修改宝宝信息吗？",
        caregiver: "看护人",
        primaryCaregiver: "主看护人",
        realName: "真实姓名",
        enterName: "请输入2-10个汉字",
        relationship: "亲属关系",
        phoneNumber: "联系电话",
        enterPhone: "请输入11位手机号码",
        wechatAccount: "微信号码",
        enterWechat: "请输入微信号",
        submit: "提交",
        add: "添加"
    },
    AddressForm: {
        required: "此项为必填",
        locationMaxLength: "最多200个字符",
        addressInfo: "地址信息",
        area: "所在区域",
        selectArea: "请选择省/市/县（区）/乡（镇）",
        detailedAddress: "详细地址",
        enterDetailedAddress: "请输入详细地址，精确到门牌号",
        submit: "提交"
    },
    CreateBabyStep3: {
        submitSuccess: "提交成功",
        submitMessage: "稍后可在列表中查看结果，新建宝宝需要督导员审核，如需尽快审核，请直接联系您的督导员。",
    },
    Baby: {
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
        submitSuccessMessage: "宝宝信息修改需要经过您的督导员审核，如需尽快审核，请直接联系您的督导员。",
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
}