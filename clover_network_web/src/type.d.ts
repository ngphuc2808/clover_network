interface iUserinfo {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  dayOfBirth: string;
  gender: number;
}

type LoginType = Pick<iUserinfo, "email" | "password">;

type RegisterType = iUserinfo;

type ResponseLoginType = {
  data: {
    expireTime: string;
    tokenId: string;
    userId: string;
    userRole: string;
  };
  code: number;
  messageEN: string;
  messageVN: string;
};

type ResponseRegisterType = {
  data: {
    dayOfBirth: string;
    email: string;
    firstname: string;
    gender: string;
    lastname: string;
    phoneNo: null | string | number;
    status: string;
    userRole: string;
  };
  code: number;
  messageEN: string;
  messageVN: string;
};
