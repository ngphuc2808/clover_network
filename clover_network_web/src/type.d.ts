interface iUserinfo {
  userId: string
  userWallId: string
  avatarUrl: string | null
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

interface iDataFeed {
  authorId: string
  content: string
  htmlContent: string
  privacyGroupId: string
  privacyType: string
  toUserId: null
  authorRoleGroup: null
  dynamicLink: null
  createdTime: null
  updatedTime: null
  lastActive: null
  totalReaction: null
  currentUserReact: null
  postToUserWall: false
  delFlag: false
  isPin: false
  pin: false
  postId: string
}

type FeedsType = Omit<iDataFeed, 'pin' | 'postId'>

type ResponseFeedsType = {
  data: Omit<iDataFeed, 'pin'>
  code: number
  messageEN: string
  messageVN: string
}
