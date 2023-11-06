interface iUserinfo {
  firstname: string
  lastname: string
  email: string
  password: string
  dayOfBirth: string
  gender: number
  phoneNo: null | string | number
  status: string
  userRole: string
}

type LoginType = Pick<iUserinfo, 'email' | 'password'>

type RegisterType = iUserinfo

type ResponseLoginType = {
  data: {
    expireTime: string
    tokenId: string
    userId: string
    userRole: string
  }
  code: number
  messageEN: string
  messageVN: string
}

type ResponseUserType = {
  data: Omit<iUserinfo, 'password'>
  code: number
  messageEN: string
  messageVN: string
}
