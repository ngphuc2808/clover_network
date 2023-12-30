import { useState } from 'react'
import Cropper from 'react-easy-crop'
import { IoMdClose } from 'react-icons/io'

import Button from '@/components/atoms/Button'
import getCroppedImg from '@/functions'
import { usePostUploadAvatar } from '@/hook'
import { useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'

interface Props {
  image: string | ArrayBuffer | null
  setModalCrop: (modalCrop: boolean) => void
  setPreviewImg: (previewImg: string) => void
}

const CropImage = ({ image, setModalCrop, setPreviewImg }: Props) => {
  const queryClient = useQueryClient()

  const uploadAvatarApi = usePostUploadAvatar()

  const [crop, setCrop] = useState<{ x: number; y: number }>({ x: 0, y: 0 })
  const [zoom, setZoom] = useState<number>(1)
  const [rotation, setRotation] = useState<number>(0)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<CropPixelType>({
    width: 0,
    height: 0,
    x: 0,
    y: 0,
  })

  const cropComplete = ({}, croppedAreaPixels: CropPixelType) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }

  const onCrop = async () => {
    const croppedImage = await getCroppedImg(image, croppedAreaPixels, rotation)

    const result = croppedImage as {
      file: Blob
      url: string
    }

    const fileAvt = new File(
      [result.file],
      `imageFile-${Math.floor(Math.random() * 100000)}.${
        result.file.type.split('/')[1]
      }`,
      {
        type: result.file.type,
      },
    )
    const formData = new FormData()
    formData.append('imageFile', fileAvt)

    uploadAvatarApi.mutate(formData, {
      onSuccess() {
        queryClient.invalidateQueries({ queryKey: ['UserInfo'] })
        toast.success('Updated avatar successfully!')
        setPreviewImg(result.url)
        setModalCrop(false)
      },
    })
  }

  return (
    <div className='fixed bottom-0 left-0 right-0 top-0 z-[999] flex items-center justify-center'>
      <div
        className='absolute z-0 h-full w-full bg-black opacity-40'
        onClick={() => setModalCrop(false)}
      ></div>
      <div className='fixed left-[50%] top-[50%] z-[999] flex w-full max-w-[90%] -translate-x-1/2 -translate-y-1/2 flex-col justify-start rounded-lg bg-[#fff] shadow lg:max-w-4xl'>
        <div className='relative flex items-center border-b border-gray-300 px-6 py-[18px] '>
          <h1 className='text-xl'>Drop image</h1>
          <span
            className='absolute right-5 cursor-pointer text-2xl hover:text-red-500'
            onClick={() => setModalCrop(false)}
          >
            <IoMdClose />
          </span>
        </div>
        <div className='grid grid-cols-1 lg:flex lg:items-start'>
          <div className='relative z-10 col-span-1 h-[400px] bg-[#000] lg:w-2/3'>
            <Cropper
              image={image as string | undefined}
              crop={crop}
              zoom={zoom}
              maxZoom={10}
              rotation={rotation}
              aspect={1}
              cropShape={'rect'}
              onZoomChange={setZoom}
              onRotationChange={setRotation}
              onCropChange={setCrop}
              onCropComplete={cropComplete}
            />
          </div>
          <div className='col-span-1 mx-6 my-4 flex flex-col items-center justify-end p-2 lg:w-1/3'>
            <div className='w-full font-bold'>
              <p>Zoom: {(zoom - 1) * 10}%</p>
              <input
                className='mx-0 my-5 h-2.5 w-full cursor-pointer appearance-none rounded-xl bg-[#d3d3d3] accent-primaryColor outline-none'
                type='range'
                min={1}
                max={11}
                step={1}
                value={zoom}
                onInput={(e) => setZoom(Number(e.currentTarget.value))}
              />
            </div>
            <div className='w-full font-bold'>
              <p>Rotation: {rotation}°</p>
              <input
                className='mx-0 my-5 h-2.5 w-full cursor-pointer appearance-none rounded-xl bg-[#d3d3d3] accent-primaryColor outline-none'
                type='range'
                min={0}
                max={360}
                step={1}
                value={rotation}
                onInput={(e) => setRotation(Number(e.currentTarget.value))}
              />
            </div>
            <div className='flex items-center justify-center'>
              <Button
                className='mx-2 mt-6 w-[125px] rounded bg-primaryColor px-0 py-1.5 tracking-[1px] text-white hover:bg-secondColor'
                onClick={onCrop}
              >
                Lưu
              </Button>
              <Button
                className='mx-2 mt-6 w-[125px] rounded bg-primaryColor px-0 py-1.5 tracking-[1px] text-white hover:bg-secondColor'
                onClick={() => setModalCrop(false)}
              >
                Hủy
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CropImage
