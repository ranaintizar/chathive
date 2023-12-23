import React from 'react'
import * as Yup from 'yup'

import Forms from './customForm'

interface Props {
  theme: string
  setFlow: (arg: number) => void
}

const Verify = ({ setFlow, theme }: Props) => {
  const fields = [
    {
      id: 'verificationCode',
      placeholder: 'Verfication Code',
      key: 1,
    },
  ]

  const schema = Yup.object().shape({
    verificationCode: Yup.mixed().required('Verification code is required'),
  })
  return (
    <Forms
      schema={schema}
      theme={theme}
      flow={2}
      height="400px"
      fields={fields}
      initialVals={{ verificationCode: '' }}
      title="Verify"
      desc="Verification code sent to admin@yourdomain.com."
      specialText="Resend"
      setFlow={setFlow}
    />
  )
}

export default Verify
