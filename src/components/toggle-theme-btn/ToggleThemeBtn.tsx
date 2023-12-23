import React from 'react'
import clsx from 'clsx'

import SunIcon from 'assets/sun.svg'
import MoonIcon from 'assets/moon.svg'

import stl from './ToggleThemeBtn.module.scss'

interface Props {
  handleOnClick: any
  customClass?: string
}

const ToggleThemeBtn = ({ handleOnClick, customClass }: Props) => {
  const [isActive, setIsActive] = React.useState(false)

  return (
    <div
      className={clsx(stl.toggleBtn, customClass)}
      onClick={() => {
        handleOnClick()
        setIsActive(!isActive)
      }}
    >
      <div
        className={clsx(
          stl.iconContainer,
          isActive ? stl.activeBtn : undefined
        )}
      >
        <MoonIcon />
        <SunIcon />
      </div>
      <span
        className={clsx(stl.dotBtn, isActive ? stl.active : undefined)}
      ></span>
    </div>
  )
}

export default ToggleThemeBtn
