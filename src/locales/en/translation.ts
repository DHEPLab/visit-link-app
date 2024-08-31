export default {
  Navigator: {
    home: "Home",
    babyList: "Babies",
    visit: "Visit",
    account: "Account",
    resetPassword: "Reset Password",
  },
  Me: {
    account: "Account",
    myAccount: "My Account",
    username: "Username",
    password: "Password",
    resetMyPassword: "Reset Password",
    mySupervisor: "My Supervisor",
    supervisorName: "Supervisor Name",
    supervisorPhoneNumber: "Supervisor Phone Number",
    logOut: "Log Out",
    logOutSuccessfully: "Log Out Successfully",
    logOutConfirmation: "Are you sure you want to log out?",
    cancel: "Cancel",
    id: "ID",
    version: "Version",
  },
  ChangePassword: {
    oldPasswordRequired: "Old password is required",
    passwordMinLength: "Password must be at least 6 characters",
    passwordRequired: "Password is required",
    oldPasswordIncorrect: "Old password is incorrect",
    passwordChangeWarning:
      "Please remember the changed account password, which will not be displayed after submission.",
    passwordChangeSuccess: "Password Reset Successfully. Please log in again.",
    oldPassword: "Old Password",
    newPassword: "New Password",
    confirmPassword: "Confirm New Password",
    passwordMismatch: "Two new passwords are not the same",
    submit: "Submit",
  },
  SignIn: {
    loginSuccess: "Log In Successfully",
    enterUsername: "Please enter username",
    enterPassword: "Please enter password",
    forgotPassword: "Forgot password",
    badCredentials: "Incorrect username or password",
    login: "Log In",
  },
  App: {
    submitFailed: "Submission Failed",
    networkError: "Internet error, please try again later.",
    understood: "OK",
  },
  Babies: {
    searchPlaceholder: "Search by baby name",
    backupPrompt: "Please backup baby data locally for offline use. ",
    backupLink: "Click here for one-click backup",
    backupSuccess: "Backup Successful",
    offlineMode: "The system is currently in offline mode",
    babyList: "Baby List",
    sortBy: "Sort by: ",
    name: "Name",
    creationTime: "Creation Time",
    attention: "Attention",
    addBaby: "Add Baby",
    attentionTooltip:
      'The baby\'s due date has passed. Please contact to confirm if the baby has been born. If the baby has been born, update the status to "born" and enter the correct birth date. If the baby has not been born, update and extend the due date. Note: Once the baby\'s growth stage is changed from "due" to "born," it cannot be changed back to "due."',
    noBabyInfo: "No baby information added yet",
    noMatchingBaby: "No matching baby information",
  },
  ListFooter: {
    noMoreData: "No more data",
  },
  MiniBaby: {
    babyDueDateArrived: "Baby's due date has arrived",
    idNotFilled: "None",
    days: "day(s)",
  },
  ApproveStatus: {
    approved: "Approved",
    pending: "Pending",
  },
  Common: {
    back: "Back",
    edit: "Edit",
    cancel: "Cancel",
    submit: "Submit",
    ok: "Ok",
    start: "Start",
    confirm: "Confirm",
  },
  enum: {
    BabyStage: {
      EDC: "EDC",
      BIRTH: "Born",
    },
    Gender: {
      FEMALE: "Female",
      MALE: "Male",
      UNKNOWN: "Unknown",
    },
    AssistedFood: {
      TRUE: "Add",
      FALSE: "No Add",
    },
    FeedingPattern: {
      BREAST_MILK: "Breast Milk",
      MILK_POWDER: "Milk Powder",
      MIXED: "Mixed",
      TERMINATED: "Terminated",
    },
    RELATIVES: {
      MOTHER: "Mother",
      FATHER: "Father",
      GRANDMOTHER: "Grandmother",
      GRANDMA: "Grandma",
      GRANDFATHER: "Grandfather",
      GRANDPA: "Grandpa",
      OTHER: "Other",
    },
    VisitStatus: {
      NOT_SUBMIT: "To be submitted",
      NOT_STARTED: "Scheduled",
      UNDONE: "Incomplete",
      EXPIRED: "Expired",
      DONE: "Completed",
    },
  },
  BabyForm: {
    nameValidation: "Please enter 2-10 characters",
    required: "This field is required",
    babyInfo: "Baby Info",
    babyName: "Baby Name",
    enterBabyName: "Please enter Baby Name",
    babyGender: "Baby Gender",
    growthStage: "Growth Stage",
    dueDate: "Due Date",
    birthDate: "Birth Date",
    supplementFood: "Supplement Food",
    feedingMethods: "Feeding Methods",
    submit: "Submit",
  },
  DatePicker: {
    selectDate: "Please select year/month/day",
  },
  CreateBabyStep1: {
    nextStep: "Next Step",
    attention: "Confirmation",
    loseEditedContent:
      "The edited content will be lost. Are you sure to return to the baby list?",
    exit: "Confirm",
    thinkAgain: "Cancel",
  },
  CreateBabyStep2: {
    setPrimaryCarer: "Please set a primary caregiver",
    carerList: "Caregiver List",
    maxCarers: "You can add up to 4 caregivers",
    addCarer: "Add Caregiver",
    nextStep: "Next Step",
  },
  CarerItem: {
    caregiver: "Caregiver {{number}}",
    primaryCaregiver: "Primary Caregiver",
    setPrimaryCaregiver: "Set as Primary Caregiver",
    delete: "Delete",
    edit: "Edit",
    caregiverName: "Caregiver Name",
    relationship: "Relatives",
    phoneNumber: "Phone",
    wechatAccount: "IM Account",
  },
  CreateCarer: {
    nameValidation: "Please enter characters",
    required: "This field is required",
    phoneValidation: "Please enter phone number",
    wechatValidation: "No more than 20 characters.",
    setPrimaryCaregiver: "Please set a primary caregiver",
    confirmEdit: "Are you sure you want to edit the baby's information?",
    caregiver: "Caregiver",
    primaryCaregiver: "Primary Caregiver",
    realName: "Name",
    enterName: "Please enter 2-10 characters",
    relationship: "Relatives",
    phoneNumber: "Phone",
    enterPhone: "Please enter phone number",
    wechatAccount: "IM Account",
    enterWechat: "Please enter instant messaging account.",
    submit: "Submit",
    add: "Add",
  },
  AddressForm: {
    required: "This field is required",
    locationMaxLength: "No more than 200 characters。",
    addressInfo: "Address",
    area: "Area",
    selectArea: "Please select area",
    detailedAddress: "Detailed Address",
    enterDetailedAddress:
      "Please enter a detailed address, including the house number",
    submit: "Submit",
  },
  CreateBabyStep3: {
    submitSuccess: "Submission Successful",
    submitMessage:
      "You can view the results in the list later. New baby creation requires supervisor approval. For expedited approval, please contact your supervisor directly.",
  },
  Baby: {
    editCarer: "Edit Carer",
    editAddress: "Edit Address",
    editBabyTitle: "Edit Baby Information",
    selectBaby: "Select Baby",
    babyDetails: "Baby Details",
    id: "ID",
    notAvailable: "None",
    babyDueDateArrived: "The baby's due date has arrived",
    babyAge: "{{stage}} {{days}} days",
    feedingStatus: "Feeding Method",
    editInfo: "Edit",
    visitRecords: "Visit Records",
    familyInfo: "Family Info",
    understood: "OK",
    submitSuccess: "Submission Successful",
    submitSuccessMessage:
      "Editing baby requires supervisor approval. For expedited approval, please contact your supervisor directly.",
    cannotCreateVisit: "Unable to schedule a visit",
    offlineVisitExists:
      "An offline visit has been created, cannot create duplicate",
    noMatchingClass: "No matching session. Please contact the administrator.",
    waitForApproval: "Please wait for baby approval",
    offlineMode: "The system is currently in offline mode",
    plannedVisits: "Planned Visits",
    completedIncompleteExpiredVisits: "Completed/Incomplete/Expired Visits",
    noResults: "No Data",
    newVisit: "New Visit",
    remarks: "Comments",
    edit: "Edit",
    add: "Add",
    addressInfo: "Address",
    area: "Area",
    detailedAddress: "Detailed Address",
    caregiverInfo: "Caregiver Info",
    setPrimaryCarerFirst:
      "Please set a new primary caregiver before this operation",
    deactivateBaby: "Archive Baby",
    deactivateBabyConfirm: "Are you sure to archive baby?",
    enterDeactivationReason: "Please enter the reason",
    deactivate: "Submit",
    addRemarks: "Add Comments",
    enterBabyRemarks: "Please enter comments",
    deleteCaregiver: "Delete Caregiver",
    confirmDeleteCaregiver: "Are you sure to delete this caregiver?",
    delete: "Delete",
    cancel: "Cancel",
    confirmEditInfo: "Are you sure to submit?",
  },
  ConfirmModal: {
    defaultTitle: "Confirmation",
    defaultContent: "Are you sure you want to {{content}}?",
    confirm: "Confirm",
    cancel: "Cancel",
  },
  CreateBabyNavigator: {
    addBaby: "Add Baby",
    babyInfo: "Baby Info",
    caregiverInfo: "Caregiver Info",
    addressInfo: "Address Info",
  },
  Ghost: {
    back: "Back",
  },
  Form: {
    pleaseInput: "Please enter content",
  },
  Visits: {
    visitArrangement: "Visit Arrangement",
    foldCalender: "Collapse Calendar",
    unfoldCalender: "Show Calendar",
    noVisitSchedule: "No visit for this date",
    selectBabyMessage:
      "According to system rules, some babies cannot have visits scheduled at this time, so they are unavailable for selection.",
    emptyBaby: "No available baby",

    selectVisitDate: "Select Visit Date",
    selectVisitTime: "Select Visit Time",
    visitTimeConflict: "Visit Time Conflict",
    VisitTimeConflictMessage:
      "The time you selected overlaps with a nearby home visit schedule. This may lead to a scheduling conflict. Are you sure you want to proceed with this time selection?",

    notStartMessage: "Class cannot be started because the time has not arrived",
    continueLesson: "Continue Lesson",
    startLesson: "Start Lesson",
    cancelVisit: "Cancel Visit",
    canNotStartLessonMessage: "Can't start Lesson",
    confirmStartLessonMessage:
      "Are you sure you want to start this home visit now?",
    visitSchedule: "The schedule for this visit is",
    cancelVisitReason: "Cancel Visit Reason",
    later: "Later",
    inputVisitReason: "Please enter reason of cancelling the visit",
    scheduleVisit: "Schedule Visit",
    vistEdit: "Edit",
    vistSelect: "Select",
    lessonScheduleTip1:
      "The next visit session for the baby in the current stage is {{lessonName}}, with the earliest start time being {{date}}.",
    lessonScheduleTip2:
      "If the baby progresses to the next stage after {{date}}, he/she will miss the session(s) in the current stage.",
    noLessonTip:
      "The course schedule will be displayed automatically after selecting a baby to visit",
    offlineBooking: "Offline Booking",
    sessionIncluded: "Session(s) Included",
    module: "Module",
    preview: "Preview",
    visitInfo: "Visit Info",
    carerName: "Primary Caregiver",
    carerPhone: "Phone",
    area: "Area",
    location: "Address",
    startTime: "Start Time",
    endTime: "Complete Time",
    edit: "Edit",
    unavailableMessage:
      "Please update the course resources on the homepage first",
    inputRemark: "Visit Incomplete Reason",
    babyName: "Baby Name",
    lessonName: " Session Name",
    visitTime: "Visit Time",
    visitDetail: "Visit Detail",
    remarkTitle: "Comments",
    expiredReason: "Expired Reason",
    undoneReason: "Incomplete Reason",
    upComingVisit: "Upcoming Visit",
  },
  BabyItem: {
    primaryCaregiver: "Primary Caregiver",
    contactInfo: "Phone",
    none: "None",
  },
  Home: {
    downloadSuccess: "Download the latest course successfully!",
    downloadError: "Failed to download the latest course resources!",
    waitForSync: "Wait for sync",
    waitForMessage:
      "You have class records that haven't been synced yet, and will be automatically synced when the internet connection is restored",
    nextVisitDate: "Your next visit: ",
    noVisitMessage: "You have no visit scheduled. Please schedule a new visit:",
    download: "Download now",
    update: "Update now",
  },
};
