import { FaUser, FaUserFriends } from 'react-icons/fa'
import { FaEarthAsia } from 'react-icons/fa6'
import { RiGroup2Fill } from 'react-icons/ri'

export const listAudience = [
  {
    icon: FaEarthAsia,
    key: 'PUBLIC',
    value: 'Public',
    desc: 'Anyone on or off Clover',
  },
  {
    icon: FaUserFriends,
    key: 'FRIEND',
    value: 'Friends',
    desc: 'Your friends on Clover',
  },
  {
    icon: FaUser,
    key: 'ONLY_ME',
    value: 'Only me',
    desc: '',
  },
  {
    icon: RiGroup2Fill,
    key: 'LIMITED_GROUP',
    value: 'Limited group',
    desc: '',
  },
]
