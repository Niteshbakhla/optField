import { useEffect, useRef, useState } from 'react'
import './App.css'

function App() {
  const [otpFields, setOtpFields] = useState(new Array(4).fill(""))
  const ref = useRef([])

  useEffect(() => {
    ref.current[0].focus()
  }, []);

  const backHandleChange = (e, index) => {
    const copyOtpFields = [...otpFields]
    if (e.keyCode === 8) {
      if (copyOtpFields[index] === "" && index > 0) {
        ref.current[index - 1].focus();
      } else {
        copyOtpFields[index] = ""
      }
      setOtpFields(copyOtpFields);
    }
  }

  const handlePaste = (e) => {
    const data = e.clipboardData.getData("text")

    if (!Number(data) || data.length !== otpFields.length) {
      return
    }

    const pastCode = data.split("");
    setOtpFields(pastCode);
    ref.current[otpFields.length - 1].focus();
  }

  const handleChange = (e, index) => {
    const val = e.target.value
    const copyOtpFields = [...otpFields]
    copyOtpFields[index] = val
    setOtpFields(copyOtpFields); // Update state first
    if (index < copyOtpFields.length - 1 && val) {
      ref.current[index + 1].focus()
    }
  }

  return (
    <>
      <div className='parent'>
        <h1>Enter otp</h1>
        <div>
          {
            otpFields.map((data, index) => (
              <input
                value={data}
                ref={(currentInput) => ref.current[index] = currentInput}
                key={index}
                maxLength={1}
                type='text'
                onPaste={handlePaste}
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => backHandleChange(e, index)}
              />
            ))
          }

        </div>
        <button>Submit</button>
      </div>
    </>
  )
}

export default App
