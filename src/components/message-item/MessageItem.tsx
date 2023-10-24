import React, { useState } from 'react'

import { handleDelMsg } from 'src/lib/firebaseFunctions'
import MoreBtn from 'components/more-btn'
import Dropdown from 'components/dropdown'

import stl from './MessageItem.module.scss'

interface Props {
  variant: string
  content: string
  theme: string
  left: Boolean
  msgId: string
  chatId: string
  handleListItemClick: (arg: string) => void
}

const MessageItem = ({
  theme,
  variant,
  content,
  left,
  msgId,
  chatId,
}: Props) => {
  const [showDropdown, setShowDropdown] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  const Message = () => (
    <div
      style={
        variant === 'primary'
          ? theme === 'dark'
            ? { background: '#7cacf8' }
            : { background: '#ecf3fe' }
          : theme === 'dark'
          ? { background: ' #303030' }
          : { background: '#f2f2f2' }
      }
      className={stl.msgItem}
    >
      <span
        style={
          variant === 'primary'
            ? { color: '#202124' }
            : theme === 'dark'
            ? { color: '#eae8ed' }
            : { color: '#202124' }
        }
        className={stl.message}
      >
        {content}
      </span>
    </div>
  )

  const MoreOpt = () => (
    <MoreBtn
      visible={isVisible}
      theme={theme}
      handleOnClick={() => setShowDropdown(true)}
    />
  )

  const handleCopy = () => {
    const textarea = document.createElement('textarea')
    textarea.value = content
    document.body.appendChild(textarea)
    textarea.select()
    document.execCommand('copy')
    document.body.removeChild(textarea)

    document.addEventListener('copy', function (event) {
      alert('Text copied to clipboard!')
    })
  }

  const handleListItemClick = (item: string) => {
    if (item === 'Delete') {
      handleDelMsg(chatId, msgId)
    } else if (item === 'Copy Text') {
      handleCopy()
    }
  }

  return (
    <div
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      className={stl.container}
    >
      {left ? (
        <>
          <MoreOpt />
          <Dropdown
            transformOrigin="top right"
            top="40%"
            left="-47%"
            theme={theme}
            showDropdown={showDropdown}
            setShowDropdown={setShowDropdown}
            list={['Delete', 'Copy Text']}
            width={130}
            height={110}
            handleListItemClick={handleListItemClick}
          />
          <Message />
        </>
      ) : (
        <>
          <Message />
          <Dropdown
            transformOrigin="top left"
            top="45%"
            left="97%"
            theme={theme}
            showDropdown={showDropdown}
            setShowDropdown={setShowDropdown}
            list={['Delete', 'Copy Text']}
            width={130}
            height={110}
            handleListItemClick={handleListItemClick}
          />
          <MoreOpt />
        </>
      )}
    </div>
  )
}

MessageItem.defaultProps = {
  variant: 'primary',
  content:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus id libero non velit ultricies sodales.',
  handleListItemClick: (item: string) => console.log(item),
}

export default MessageItem
