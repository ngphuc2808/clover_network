interface iUserinfo {
  userId: string
  userWallId: string
  avatar: string | null
  bannerUrl: string
  firstname?: string
  lastname?: string
  email: string
  password: string
  dayOfBirth?: string
  gender?: number | string
  phoneNo?: null | string | number
  status: string
  userRole: string
  connected: boolean
}

type LoginType = Pick<iUserinfo, 'email' | 'password'>

type RegisterType = iUserinfo

type UpdateInfoType = Pick<
  iUserinfo,
  'firstname' | 'lastname' | 'phoneNo' | 'dayOfBirth' | 'gender'
>

type ForgotPasswordType = Pick<iUserinfo, 'email'>

type ResetPasswordType = {
  email: string
  newPassword: string
  repeatNewPassword: string
  otp: string
}

type ChangePasswordType = {
  email: string
  oldPassword: string
  newPassword: string
  repeatNewPassword: string
}
type ResponseForgotPasswordType = {
  code: number
  data: string
  messageEN: string
  messageVN: string
}

type ResponseChangePasswordType = {
  code: number
  data: {
    oldPassword: string
    newPassword: string
    repeatNewPassword: string
  }
  messageEN: string
  messageVN: string
}

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

type ResponseListRecommendType = {
  code: 100
  data: {
    userProfiles: {
      userId: string
      displayName: string
      avatarImgUrl: string
      phoneNo: string | null
      email: string
      userWallId: string
      connected: boolean
    }[]
    total: number
  }
  messageEN: string
  messageVN: string
}

type ResponseListFriendsType = {
  code: number
  data: {
    userProfiles: {
      userId: string
      displayName: string
      avatarImgUrl: string
      phoneNo: string
      email: string
      userWallId: string
      connected: boolean
    }[]
    total: number
  } | null
  messageEN: string
  messageVN: string
}

type ResponseListFollowType = {
  code: number
  data: {
    userProfiles: {
      userId: string
      displayName: string
      avatarImgUrl: string
      phoneNo: string
      email: string
      userWallId: string
      connected: true
    }[]
    total: number
  }
  messageEN: string
  messageVN: string
}

type ResponseConnectUserType = {
  code: number
  data: string
  messageEN: string
  messageVN: string
}

type ResponseUserProfileType = {
  data: {
    userInfo: Omit<iUserinfo, 'password'>
    totalConnect: number
    totalConnector: number
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

type ResponseSearchUserType = {
  code: number
  data: {
    users: Omit<iUserinfo, 'password'>[]
    groups: {
      group: {
        groupId: string
        groupName: string
        avatarUrl: string | null
        bannerUrl: string | null
        groupDesc: string
        groupOwnerId: string
        groupType: number
        groupPrivacy: string
        totalMember: number
        createdTime: string
        updatedTime: string
        lastActive: string
        delFlag: boolean
      }
      currentUserRole: {
        roleId: string
        status: string
        enablePost: boolean
        enableComment: boolean
        enableShare: boolean
      } | null
    }[]
    feeds: {
      postId: string
      authorId: string
      toUserId: string | null
      authorRoleGroup: string | null
      content: string
      htmlContent: string
      dynamicLink: string
      privacyGroupId: string
      privacyType: string
      createdTime: string
      updatedTime: string
      lastActive: string
      totalReaction: number | null
      feedImages: string[] | null
      currentUserReact: null
      postToUserWall: string
      delFlag: string
      pin: string
    }[]
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
  toUserId: string | null
  authorRoleGroup: null
  dynamicLink: null
  createdTime: null
  updatedTime: null
  lastActive: null
  totalReaction: null
  currentUserReact: null
  postToUserWall: boolean
  delFlag: false
  isPin: false
  pin: false
  postId: string
  level: number
  userWallId: string
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

type ResponseDeleteFeedsType = {
  data: string
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

type ResponseCheckUserLikeType = {
  code: number
  data: {
    feedId: string
    totalLike: number
    currentUserLike: boolean
  }
  messageEN: string
  messageVN: string
}

type ResponseLikeType = {
  code: number
  data: number
  messageEN: string
  messageVN: string
}

type FeedGroupData = {
  feedItem: {
    postId: string
    authorId: string
    toUserId: string | null
    authorRoleGroup: string | null
    content: string
    htmlContent: string
    dynamicLink: string
    privacyGroupId: string
    privacyType: string
    createdTime: string
    updatedTime: string
    lastActive: string
    totalReaction: number | null
    feedImages: string[] | null
    currentUserReact: string | null
    postToUserWall: boolean
    delFlag: boolean
    pin: boolean
  }
  authorProfile: {
    userId: string
    displayName: string
    avatarImgUrl: string
    phoneNo: string
    email: string
    userWallId: string
    connected: boolean
  }
  groupItem: {
    id: number
    groupId: string
    groupName: string
    avatarUrl: string | null
    bannerUrl: string | null
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
  currentUserRole: {
    roleId: string
    status: string
    enablePost: boolean
    enableComment: boolean
    enableShare: boolean
  } | null
  totalReact: number
  totalComment: number
  currentUserReact: string | null
}

type ResponseListCommentType = {
  code: number
  data: {
    commentId: string
    postId: string
    authorProfile: {
      userId: string
      displayName: string
      avatarImgUrl: string
      phoneNo: string
      email: string
      userWallId: string
      connected: boolean
    }
    content: string
    createdTime: string
    updatedTime: string
    parentCommentId: null
    level: number
    author: boolean
  }[]
  messageEN: string
  messageVN: string
}

type ResponseListCommentType = {
  code: number
  data: {
    commentId: string
    postId: string
    authorProfile: {
      userId: string
      displayName: string
      avatarImgUrl: string
      phoneNo: string
      email: string
      userWallId: string
      connected: boolean
    }
    content: string
    createdTime: string
    updatedTime: string
    parentCommentId: null
    level: number
    author: boolean
  }
  messageEN: string
  messageVN: string
}

type ResponseFeedCardType = {
  code: number
  data: FeedGroupData[]
  messageEN: string
  messageVN: string
}

type ResponseFeedDetail = {
  code: number
  data: FeedGroupData
  messageEN: string
  messageVN: string
}

type ResponseGetLinkFeed = {
  code: number
  data: string
  messageEN: string
  messageVN: string
}

interface iGroup {
  groupId: string //
  groupName: string //
  avatarUrl: null | string //
  bannerUrl: null | string //
  description: string
  groupDesc: string //
  groupOwnerId: string //
  groupType: number //
  groupPrivacy: string //
  enableComment: boolean
  enablePost: boolean
  enableReaction: boolean
  createdTime: string //
  updatedTime: string //
  lastActive: string //
  delFlag: boolean //
  totalMember: number
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

type ResponseDeleteGroupType = {
  code: number
  data: {
    group: Omit<
      iGroup,
      | 'description'
      | 'enableComment'
      | 'enablePost'
      | 'enableReaction'
      | 'totalMember'
    >
    currentUserRole: {
      roleId: string
      status: string
      enablePost: boolean
      enableComment: boolean
      enableShare: boolean
    }
  }
  messageEN: string
  messageVN: string
}

type ResponseJoinLeaveGroupType = {
  code: number
  data: string
  messageEN: string
  messageVN: string
}

type ResponseListMemberWaitingType = {
  code: 200
  data:
    | {
        userId: string
        displayName: string
        avatarImgUrl: string
        phoneNo: string
        email: string
        userWallId: string
        connected: boolean
      }[]
    | string
  messageEN: string
  messageVN: string
}

type ResponseGetListGroupType = {
  data: Omit<iGroup, 'description'>[]
  code: number
  messageEN: string
  messageVN: string
}

type ResponseListMemberGroupType = {
  code: number
  data: {
    members: {
      userId: string
      displayName: string
      avatarImgUrl: string
      phoneNo: string
      email: string
      userWallId: string
      connected: boolean
    }[]
    total: number
  }
  messageEN: string
  messageVN: string
}

type ResponseGetGroupInfoType = {
  data: {
    group: {
      groupId: string
      groupName: string
      avatarUrl: string | null
      bannerUrl: string | null
      groupDesc: string
      groupOwnerId: string
      groupType: 0
      groupPrivacy: string
      createdTime: string
      updatedTime: string
      delFlag: boolean
      totalMember: number
    }
    currentUserRole: {
      roleId: string
      status: string
      enablePost: boolean
      enableComment: boolean
      enableShare: boolean
    } | null
  }
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
