import React from 'react'
import { Field } from 'formik'

import { handleForgotPassword } from 'src/lib/firebaseFunctions'

import stl from './Input.module.scss'

interface Props {
  formikProps?: any
  id: string
  placeholder: string
  method?: string
}

const Input = ({ formikProps, id, placeholder, method }: Props) => {
  const handleFocus = (e: any) => {
    const ele = e.target
    ele.classList.add(stl.focused)
  }

  const handleBlur = (e: any) => {
    const ele = e.target
    ele.classList.remove(stl.focused)
  }

  return (
    <div className={stl.inputContainer}>
      <Field
        id={id}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className={stl.input}
        name={id}
        placeholder={placeholder}
        type={id === 'password' ? 'password' : 'text'}
      />
      <span className={stl.errors}>
        {formikProps.touched[id] && formikProps.errors[id]}
      </span>
      {method === 'signin' && id === 'password' && (
        <span
          onClick={() => handleForgotPassword(formikProps)}
          className={stl.forgotPassword}
        >
          Forgot Password?
        </span>
      )}
    </div>
  )
}

Input.defaultProps = {
  id: 'fname',
  placeholder: 'First Name',
}

export default Input
