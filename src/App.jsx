import { useState, useCallback, useEffect,useRef } from 'react'



function App() {
  const [length, setlength] = useState(8)
  const [numbers, setnumbers] = useState(false)
  const [chars, setchars] = useState(false)
  const [Password, setPassword] = useState("")
  //Ref hook
  const PasswordRef = useRef(null)

  const PasswordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if (numbers) str += "0123456789"
    if (chars) str += "!@#$%^&*()-_=+[]{}|<>?/~"

    for (let i = 0; i <= length; i++) {
      let ch = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(ch)

    }
    setPassword(pass)

  }
    , [length, numbers, chars, setPassword]
  )
const copytoclipboard= useCallback(
  () => {
    PasswordRef.current?.select()
    window.navigator.clipboard.writeText(Password)
  },
  [Password],
)


  useEffect(() => {
    PasswordGenerator()
  }
    , [length, chars, numbers, PasswordGenerator])


  return (
    <>

      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-2 my-8 text-orange-500 bg-gray-800'>
        <h1 className='text-center text-2xl text-white m-4'>Password Generator</h1>
        <div className='flex shadow-sm rounded overflow-hidden mb-4'>
          <input type="text"
           value={Password} 
           placeholder='Password'
            readOnly 
            ref={PasswordRef}
          className='outline-none w-full py-1 px-3 rounded' />
          <button className='bg-blue-600 text-black py-2 px-4'
          onClick={copytoclipboard}>Copy</button>
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
          
            <input type="range"
              min={8}
              max={20}
              value={length}
              className='cursor-pointer'
              onChange={(e) => { setlength(e.target.value) }}
              readOnly
            />
            <label >length:{length}</label>

          </div>
          <div className='flex items-center gap-x-1'>
            <input type="checkbox"
              defaultChecked={numbers}
              id='numbersInput'
              onChange={() => {
                setnumbers((prev) => !prev)

              }}
            />
            <label htmlFor='numbersInput'>Numbers</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input type="checkbox"
              defaultChecked={chars}
              id='charsInput'
              onChange={() => {
                setchars((prev) => !prev)
              }}
            />
            <label htmlFor='charsInput'>Characters</label>
          </div>
        </div>
      </div>

    </>
  )
}

export default App
