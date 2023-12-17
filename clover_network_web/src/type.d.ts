interface iUserinfo {
  userId: string
  userWallId: string
  avatar: string | null
  firstname?: string
  lastname?: string
  email: string
  password: string
  dayOfBirth?: string
  gender?: number | string
  phoneNo?: null | string | number
  status: string
  userRole: string
}

type LoginType = Pick<iUserinfo, 'email' | 'password'>

type RegisterType = iUserinfo

type UpdateInfoType = Pick<
  iUserinfo,
  'firstname' | 'lastname' | 'phoneNo' | 'dayOfBirth' | 'gender'
>

type ForgotPasswordType = Pick<iUserinfo, 'email'>

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

type ResponseLogoutType = {
  code: number
  data: null
  messageEN: string
  messageVN: string
}

type ResponseUserType = {
  data: Omit<iUserinfo, 'password'>
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

type ResponseSearchUserType = {
  code: number
  data: {
    users: Omit<iUserinfo, 'password'>[]
    groups: null
    feeds: null
  }
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
  level: number
}

type FeedsType = Omit<iDataFeed, 'pin' | 'postId'>

type FeedCommentType = Pick<
  iDataFeed,
  'postId' | 'authorId' | 'content' | 'level'
>

type ResponseFeedsType = {
  data: Omit<iDataFeed, 'pin'>
  code: number
  messageEN: string
  messageVN: string
}

type PostType = {
  postId: string
  authorId: string
  toUserId: string | null
  authorRoleGroup: string
  content: string
  htmlContent: string
  dynamicLink: string
  privacyGroupId: string
  privacyType: string
  createdTime: string
  updatedTime: string
  lastActive: string
  totalReaction: null | string
  currentUserReact: null | string
  postToUserWall: boolean
  delFlag: boolean
  pin: boolean
}

type FeedsDataType = {
  [key: string]: PostType
}

type RoleType = {
  roleId: string
  enablePost: boolean
  enableComment: boolean
  enableShare: boolean
}

type UserRoleDataType = {
  [key: string]: RoleType
}

type GroupType = {
  id: number
  groupId: string
  groupName: string
  avatarImgUrl: string | null
  bannerImgUrl: string | null
  groupDesc: string
  groupOwnerId: string
  groupType: number
  groupPrivacy: string
  enableComment: boolean
  enablePost: boolean
  enableReaction: boolean
  createdTime: string
  updatedTime: string
  delFlag: boolean
}

type GroupDataType = {
  [key: string]: GroupType
}

type UserType = {
  userId: string
  groupRole: string | null
  displayName: string
  avatarImgUrl: string
  phoneNo: string
  email: string
  userWallId: string
}

type UserDataType = {
  [key: string]: UserType
}

type AuthorType = {
  userId: string
  displayName: string
  avatarImgUrl: string
  phoneNo: string
  email: string
  userWallId: string
}

type CommentType = {
  commentId: number
  postId: string
  authorProfile: AuthorType
  content: string
  createdTime: string
  updatedTime: string
  parentCommentId: null
  level: number
  author: boolean
}

type CommentDataType = {
  [key: string]: CommentType[]
}

type FeedPostType = {
  canPost: boolean
  currentUserRoles: UserRoleDataType
  feeds: FeedsDataType
  groups: GroupDataType
  comments: CommentDataType
  postIds: string[]
  reactions: string | null
  users: UserDataType
}

type ResponseListFeedType = {
  data: FeedPostType
  code: number
  messageEN: string
  messageVN: string
  nextPageToken?: string
}

interface iGroup {
  id: number
  groupId: string
  groupName: string
  avatarImgUrl: null | string
  bannerImgUrl: null | string
  description: string
  groupDesc: string
  groupOwnerId: string
  groupType: number
  groupPrivacy: string
  enableComment: boolean
  enablePost: boolean
  enableReaction: boolean
  createdTime: string
  updatedTime: string
  delFlag: boolean
}

type CreateGroupType = Pick<
  iGroup,
  'groupName' | 'groupPrivacy' | 'description'
>

type ResponseCreateGroupType = {
  data: Omit<iGroup, 'description'>
  code: number
  messageEN: string
  messageVN: string
}

// Other
type CropPixelType = {
  width: number
  height: number
  x: number
  y: number
}
