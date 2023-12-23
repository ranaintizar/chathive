import React from 'react'

import { sendVerificationEmail } from 'src/lib/firebaseFunctions'

import stl from './VerifyMsg.module.scss'

interface Props {
  email?: string | null
}

const VerifyMsg = ({ email }: Props) => (
  <div className={stl.verifyMsg}>
    <h2>
      Verification email sent to <span>{email}</span>.
    </h2>
    <h2>Verify your Email to Continue!</h2>
    <button onClick={sendVerificationEmail} className={stl.btn}>
      Resend
    </button>
  </div>
)

export default VerifyMsg
