import { useState, useEffect, useCallback } from "react";

function App() {

  const [password, setpassword ] = useState('')
  const [lenght , setlenght] = useState(8)
  const [number, setnumber] = useState(false)
  const [character, setcharacter] = useState(false)
  const [buttonColor ,setbuttonColor] = useState('')
  const [buttonname ,setbuttonname] = useState('copy')

  const passwordChange = useCallback(()=>{
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(number){ 
      str += "1234567890" 
    }
    if(character){
      str += "@#^*&_%!"
    }
    for( let i = 1; i <= lenght; i++ ){
    let char = Math.floor(Math.random() * str.length + 1)
    pass += str.charAt(char)
    }
    setpassword(pass)
  },[lenght, number, character, setpassword])

  
  const copyPass = ()=>{
    if(lenght >= 1){
    window.navigator.clipboard.writeText(password)
    setbuttonColor('green')
    setbuttonname('copied')
    }
    setTimeout(() => {
      setbuttonColor('blue')
      setbuttonname ('copy')
    }, 2000);
  }
 
  useEffect(()=>{
    passwordChange();  
  },[lenght, number, character, passwordChange])
 
  return (
    <>
    <div className="MainApp">
      <div className="passwordApp">
        <div className="password">
          <input type="text" readOnly placeholder="password" value={password}/>
          <button style={{backgroundColor : `${buttonColor}`}} onClick={copyPass}>{buttonname}</button>
        </div>
        <div className="tools">
          <div className="range">
            <input type="range" id="lenght" max={100} min={0} value={lenght} onChange={(e)=> setlenght(e.target.value)}/>
            <label htmlFor="lenght">lenght:{lenght}</label>
          </div>
          <div className="number">
            <input type="checkbox" value={number} onChange={() => setnumber((prev) => !prev)}/>
            <label>Number</label>
          </div>
          <div className="character">
            <input type="checkbox" value={character} onChange={() => setcharacter((prev )=> !prev)}/>
            <label>character</label>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default App;
