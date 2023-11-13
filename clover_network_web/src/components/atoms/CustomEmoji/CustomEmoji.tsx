import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'

interface iProps {
  handleEmojiClick: (emoji: string) => void
}

const CustomEmoji = ({ handleEmojiClick }: iProps) => {
  return (
    <Picker
      data={data}
      theme='light'
      onEmojiSelect={(e: data.Skin) => handleEmojiClick(e.native)}
    />
  )
}

export default CustomEmoji
