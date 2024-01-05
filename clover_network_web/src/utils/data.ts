import { FaEarthAsia } from 'react-icons/fa6'
import { RiGroup2Fill, RiGitRepositoryPrivateFill } from 'react-icons/ri'

export const listAudience = [
  {
    icon: FaEarthAsia,
    key: 'PUBLIC',
    value: 'Public',
    desc: 'Anyone on or off Clover',
  },
  {
    icon: RiGroup2Fill,
    key: 'LIMITED_GROUP',
    value: 'Limited group',
    desc: '',
  },
]

export const listAudienceUser = [
  {
    icon: FaEarthAsia,
    key: 'PUBLIC',
    value: 'Public',
    desc: 'Anyone can see',
  },
  {
    icon: RiGroup2Fill,
    key: 'LIMITED_GROUP',
    value: 'Limited group',
    desc: '',
  },
]

export const listAudienceGroup = [
  {
    icon: FaEarthAsia,
    key: 'PUBLIC',
    value: 'Public',
    desc: 'Anyone can see',
  },
  {
    icon: RiGitRepositoryPrivateFill,
    key: 'PRIVATE',
    value: 'Private',
    desc: '',
  },
]
