import { useState } from 'react';
import Header from './components/header/header';
import Keypad from './components/keypad/keypad';

import moonIcon from "./asset/moon.png"
import sunIcon from "./asset/sun.png"

import './App.css';
import { useEffect } from 'react';





function App() {
  const [isDarkMode, setIsDarkMode] = useState(JSON.parse(localStorage.getItem("calculator-app-mode")) || false)
  const [expression, setExpression] = useState("") //acess hona  chaey osk state bnaye
  const [result, setResult] = useState("")
  const [history, sethistory] = useState(JSON.parse(localStorage.getItem("calculator-app-history")) || [])

  // jo keys hm ne calculator mai di hai sirf un ka keyboard se access k lye hum ne unk keycode ka var bna diye bcoz sare keys ki need to nh h ..ye hum cal me use krty h osk keycode h
  const usedKeyCodes = [
    48, 49, 50, 51, 52, 53, 54, 55, 56, 57,
    96, 97, 98, 99, 100, 101, 102, 103, 104, 105,
    8, 13, 190, 189, 191, 56, 111, 106, 107, 109, 187,
  ];

  // calculator k keypad k no and expression
  const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
  const operators = ["-", "+", "*", "/"];

  //  ye keycode or key ka value le ga
  const handleKeypress = (keyCode, key) => {
    console.log(keyCode, key)
    if (!keyCode) return; //agr keycode aya nh h tw return krjao
    if (!usedKeyCodes.includes(keyCode)) return;   //kya jo key codeya key press hua h wo keycode me h hmary ya nh h check

    if (numbers.includes(key)) {
      // pehla num 0 press ya just = press pe validation
      if (key === "0") {
        if (expression.length === 0) return;
      }
      calculateresult(expression + key) //purana or nya key add
      console.log("Number")
      //agr h tw knsa h  
      setExpression(expression + key) //pehly se jo h num mojood os me naya add
    }

    else if (operators.includes(key)) { //jo key press kiya kya wo hmary operator me h
      console.log("Operator")
      if (!expression) return //agr koi no nh h bs operator h tw

      const lastchar = expression.slice(-1) //last ka character hatado eg 2+
      //agr operator kbad operator h tw return

      if (operators.includes(lastchar)) return
      // if 15.
      if (lastchar === ".") return;
      setExpression(expression + key)
      // expreesion khali h aur operator pe click kare to return

      // 1 operator k baad wapis operator press kare to
      // .slice last se 1 character ko trim kr k de dega



      //agr last mai . ho to bh return


    }

    else if (keyCode === 13) { //agr enter press kiyaa tw key codese match kro enter k
      console.log("enter")
      if (!expression) return
      calculateresult(expression)//osi k osi wqt cal means real time

      const temporaryhistory = [...history] //history kliyr
      if (history.length > 20) temporaryhistory = temporaryhistory.splice(0, 1)//sb se pehly  waly ko hata do
      temporaryhistory.push(expression)
      sethistory(temporaryhistory)

    }
    else if (keyCode === 8) {  //agr backspace press kiya tw
      console.log("backspace")
      if (!expression) return;
      calculateresult(expression.slice(0, -1)) //ek hata k real tym calculate kro
      setExpression(expression.slice(0, -1))// 0 means start se dekho aur -1 means end se 1 trim kr do
    }
    else if (key === ".") {
      if (!expression) return;
      const lastchar = expression.slice(-1)
      if (!numbers.includes(lastchar)) return //agr numbar nh h last character tw return
      setExpression(expression + key)
    }
  }

  const calculateresult = (exp) => { //ye apne under expression le ga
    if (!exp) return; //agr exp nh tw return
    const lastchar = exp.slice(-1)

    if (!numbers.includes(lastchar)) exp = exp.slice(0, -1) //agr operator  ho last char tw hata do
    const answer = eval(exp).toFixed(2) + "";//point kbad 2 no le k string me convert
    setResult(answer)
  }


  useEffect(()=>{
localStorage.setItem("calculator-app-history" , JSON.stringify(history))
  },[history]) //ta k refresh pe history gayab na ho

  useEffect(()=>{
    localStorage.setItem("calculator-app-mode" , JSON.stringify(isDarkMode))
      },[isDarkMode]) //refresh pe mode gayab na ho
  return (
    <div className='app'
      tabIndex="0"  //agr keydown work na kre tw ye use
      onKeyDown={(event) => handleKeypress(event.keyCode, event.key)} //ye lgane se laptop key press ho tw chle ye kaam hoga
      data-theme={isDarkMode ? "dark" : ""}>

      <div className="app-calculator">
        <div className="app-calculator-navbar">
          <div className="app-calculator-navbar-toggle"
            onClick={() => {
              setIsDarkMode(!isDarkMode)
            }}
          >
            <div className={`app-calculator-navbar-toggle-circle ${isDarkMode ? "app-calculator-navbar-toggle-circle-active" : ""}`}>

            </div>
          </div>
          <img src={isDarkMode ? moonIcon : sunIcon} alt="mode" />
        </div>
        <Header expression={expression} result={result} history={history} />
        {/* props pas kiye */}
        <Keypad handleKeypress={handleKeypress} />
      </div>
    </div>
  );
}

export default App;
