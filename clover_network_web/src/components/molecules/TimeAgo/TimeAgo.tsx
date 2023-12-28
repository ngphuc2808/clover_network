import { useEffect, useState } from 'react'

const TimeAgo = ({ timestamp }: { timestamp: string }) => {
  const [timeAgo, setTimeAgo] = useState('')

  useEffect(() => {
    const currentTime = new Date().getTime()
    const postTime = new Date(timestamp).getTime()
    const difference = currentTime - postTime

    const seconds = Math.floor(difference / 1000)
    const minutes = Math.floor(seconds / 60)
    const hours = Math.floor(minutes / 60)
    const days = Math.floor(hours / 24)

    let newTimeAgo = ''

    if (days > 0) {
      if (days === 1) {
        newTimeAgo = `${days} day ago`
      } else {
        newTimeAgo = `${days} days ago`
      }
    } else if (hours > 0) {
      if (hours === 1) {
        newTimeAgo = `${hours} hour ago`
      } else {
        newTimeAgo = `${hours} hours ago`
      }
    } else if (minutes > 0) {
      if (minutes === 1) {
        newTimeAgo = `${minutes} minute ago`
      } else {
        newTimeAgo = `${minutes} minutes ago`
      }
    } else {
      if (seconds === 1) {
        newTimeAgo = `${seconds} second ago`
      } else {
        newTimeAgo = `${seconds} seconds ago`
      }
    }

    setTimeAgo(newTimeAgo)
  }, [timeAgo])

  return <span>{timeAgo}</span>
}

export default TimeAgo
