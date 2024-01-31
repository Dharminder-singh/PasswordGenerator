import { useState, useEffect, useCallback } from "react";

function App() {

  const [password, setpassword ] = useState('')
  const [lenght , setlenght] = useState(8)
  const [number, setnumber] = useState(false)
  const [charchter, setcharchter] = useState(false)
  const [buttonColor ,setbuttonColor] = useState('')
  const [buttonname ,setbuttonname] = useState('copy')

  const passwordChange = useCallback(()=>{
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(number){ 
      str += "1234567890" 
    }
    if(charchter){
      str += "@#^*&_%!"
    }
    for( let i = 1; i <= lenght; i++ ){
    let char = Math.floor(Math.random() * str.length + 1)
    pass += str.charAt(char)
    }
    setpassword(pass)
  },[lenght, number, charchter, setpassword])

  
  const copyPass = ()=>{
    window.navigator.clipboard.writeText(password)
    setbuttonColor('green')
    setbuttonname('copied')
    setTimeout(() => {
      setbuttonColor('blue')
      setbuttonname ('copy')
    }, 2000);
  }
 
  useEffect(()=>{
    passwordChange();  
  },[lenght, number, charchter, passwordChange])
 
  return (
    <>
    <div className="MainApp">
      <div className="password">
      <input type="text" readOnly placeholder="password" value={password}/>
      <button style={{backgroundColor : `${buttonColor}`}} onClick={copyPass}>{buttonname}</button>
      </div>
      <div className="tools">
      <input type="range" max={100} min={0} value={lenght} onChange={(e)=> setlenght(e.target.value)}/>
      <label>lenght:{lenght}</label>
      <input type="checkbox" value={number} onChange={() => setnumber((prev) => !prev)}/>
      <label>Number</label>
      <input type="checkbox" value={charchter} onChange={() => setcharchter((prev )=> !prev)}/>
      <label>charchter</label>

      </div>
    </div>
    </>
  );
}

export default App;
