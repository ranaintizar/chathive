import React from 'react'

import stl from './Spinner.module.scss'

interface Props {
  color: string
  spinnerColor: string
  borderWidth: number
  width: number
  height: number
  title?: string
}

const Spinner = ({
  title,
  spinnerColor,
  color,
  borderWidth,
  width,
  height,
}: Props) => (
  <div className={stl.loading}>
    <div style={{ width, height }} className={stl.spinner}>
      <div
        style={{
          borderColor: `${spinnerColor} transparent transparent transparent`,
          borderWidth: borderWidth + 'px',
          width: (80 / 100) * width + 'px',
          height: (80 / 100) * height + 'px',
        }}
      />
      <div
        style={{
          borderColor: `${spinnerColor} transparent transparent transparent`,
          borderWidth: borderWidth + 'px',
          width: (80 / 100) * width + 'px',
          height: (80 / 100) * height + 'px',
        }}
      />
      <div
        style={{
          borderColor: `${spinnerColor} transparent transparent transparent`,
          borderWidth: borderWidth + 'px',
          width: (80 / 100) * width + 'px',
          height: (80 / 100) * height + 'px',
        }}
      />
      <div
        style={{
          borderColor: `${spinnerColor} transparent transparent transparent`,
          borderWidth: borderWidth + 'px',
          width: (80 / 100) * width + 'px',
          height: (80 / 100) * height + 'px',
        }}
      />
    </div>
    {title && (
      <span style={{ color: color }} className={stl.title}>
        {title}
      </span>
    )}
  </div>
)

Spinner.defaultProps = {
  color: '#000',
  spinnerColor: '#1e90ff',
  borderWidth: 6,
  width: 100,
  height: 100,
}

export default Spinner
