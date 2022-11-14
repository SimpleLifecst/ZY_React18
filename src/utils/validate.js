const username = [
  { required: true, message: "请输入你的账号" },
  { validator: validatorUsername },
];

const password = [{ required: true, message: "请输入你的密码" }]

const phoneNumber = [
  { required: true, message: "请输入你的手机号" },
  { validator: validatorPhoneNumber },
];

const validateLoginForm = {
  username,
  password,
};

// username validator
function validatorUsername(_, value) {
  const reg = /^[A-Za-z0-9]+$/;

  if (value.trim().length < 5) {
    return Promise.reject("请输入五位以上的账号");
  }

  if (!reg.test(value)) {
    return Promise.reject("请输入由数字或字母组成的账号");
  }

  return Promise.resolve();
}

function validatorPhoneNumber(_, value) {
  const reg = /^1\d{10}$/;

  if (!reg.test(value)) {
    return Promise.reject("你输入正确的手机号");
  }

  return Promise.resolve();
}

const validateStudentForm = {
  phoneNumber,
  name: [{ required: true, message: "请输入你的姓名" }],
  gender: [{ required: true, message: "请选择你的性别" }],
  age: [{ required: true, message: "请输入你的年龄" }],
  idNumber: [{ required: true, message: "请输入你的身份证号" }],
};

const validateTeacherForm = {
  password,
  phoneNumber,
  name: [{ required: true, message: "请输入你的姓名" }],
  username: [{ required: true, message: "请输入你的账号" }],
};

const validateManagerForm = {
  password,
  phoneNumber,
  username: [
    { required: true, message: "请输入你的账号" }
  ],
  name: [{ required: true, message: "请输入你的姓名" }],
  roleId: [{ required: true, message: "请选择你的角色" }],
};

const validateClassForm = {
  name: [{required: true, message: "请输入班级名称"}],
  type: [{required: true, message: "请选择类型"}],
  learningCycle: [{required: true, message: "请选择学习周期"}],
  status: [{required: true, message: "请选择状态"}],
}

export {
  validateLoginForm,
  validateStudentForm,
  validateTeacherForm,
  validateManagerForm,
  validateClassForm,
  password
};
