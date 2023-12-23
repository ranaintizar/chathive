import React, { useState } from 'react'

import {
  deleteFile,
  handleDelMsg,
  downloadFile,
} from 'src/lib/firebaseFunctions'
import MoreBtn from 'components/more-btn'
import Dropdown from 'components/dropdown'
import Icon from 'assets/file.svg'

import stl from './FIleThumbnail.module.scss'

interface Props {
  theme: string
  fileInfo: any
  left: Boolean
  chatId: string
  msgId: string
}

const FileThumbnail = ({ theme, fileInfo, left, chatId, msgId }: Props) => {
  const [isVisible, setIsVisible] = useState(false)
  const [showDropdown, setShowDropdown] = useState(false)

  const formatBytes = () => {
    const KB = 1024
    const MB = 1024 * 1024

    if (fileInfo.fileSize < KB) {
      return fileInfo.fileSize + ' bytes'
    } else if (fileInfo.fileSize < MB) {
      return (fileInfo.fileSize / KB).toFixed(2) + ' KB'
    } else {
      return (fileInfo.fileSize / MB).toFixed(2) + ' MB'
    }
  }

  const handleListItemClick = (item: string) => {
    if (item === 'Delete') {
      deleteFile(fileInfo.fileName)
      handleDelMsg(chatId, msgId)
    } else if (item === 'Download') {
      downloadFile(fileInfo)
    }
  }

  const File = () => (
    <div className={stl.fileThumbnail}>
      <Icon />
      <span className={stl.size}>{formatBytes()}</span>
    </div>
  )

  const MoreOpt = ({ handleOnClick }: any) => (
    <MoreBtn visible={isVisible} theme={theme} handleOnClick={handleOnClick} />
  )

  return (
    <div
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      className={stl.file}
    >
      {left ? (
        <>
          <MoreOpt handleOnClick={() => setShowDropdown(true)} />
          <Dropdown
            showDropdown={showDropdown}
            setShowDropdown={setShowDropdown}
            transformOrigin="top right"
            top="50%"
            left="-104%"
            theme={theme}
            width={140}
            height={110}
            handleListItemClick={handleListItemClick}
            list={['Delete', 'Download']}
          />
          <File />
        </>
      ) : (
        <>
          <File />
          <Dropdown
            showDropdown={showDropdown}
            setShowDropdown={setShowDropdown}
            transformOrigin="top left"
            top="40%"
            left="90%"
            theme={theme}
            width={140}
            height={110}
            handleListItemClick={handleListItemClick}
            list={['Delete', 'Download']}
          />
          <MoreOpt handleOnClick={() => setShowDropdown(true)} />
        </>
      )}
    </div>
  )
}

export default FileThumbnail
