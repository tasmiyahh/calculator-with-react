import React from 'react'
import "./keypad.css"

function Keypad(props) {

 
        const keys = [
            {
                keyCode: 55,
                label: "7",
            },
            {
                keyCode: 56,
                label: "8",
            },
            {
                keyCode: 57,
                label: "9",
            },
            {
                keyCode: 52,
                label: "4",
            },
            {
                keyCode: 53,
                label: "5",
            },
            {
                keyCode: 54,
                label: "6",
            },
            {
                keyCode: 49,
                label: "1",
            },
            {
                keyCode: 50,
                label: "2",
            },
            {
                keyCode: 51,
                label: "3",
            },
            {
                keyCode: 48,
                label: "0",
            },
            {
                keyCode: 190,
                label: ".",
            },
            {
                keyCode: 187,
                label: "=",
            },
    
        ]
    const symbols = [
        {
            label: "⌫",
            keyCode: 8,
            value: "backspace",
        },
        {
            label: "÷",
            keyCode: 191,
            value: "/",
        },
        {
            label: "x",
            keyCode: 56,
            value: "*",
        },
        {
            label: "-",
            keyCode: 189,
            value: "-",
        },
        {
            label: "+",
            keyCode: 187,
            value: "+",
        },
    ]
    return (
        <div className='keypad'>
            <div className="keypad-keys">
            {
                    keys.map((item, index) => 
                    <p onClick={()=>{ 
                        props.handleKeypress(item.keyCode,item.label)
                    }}
                    key={index}><div className='item'>{item.label}</div></p>)
                }

                {/* ye onclick calulator k key kaam kre oskliye h */}

                 
            </div>
            <div className="keypad-symbols">
            {symbols.map((item, index) =>
                    <p
                        onClick={()=>{
                             props.handleKeypress(item.keyCode,item.value)
                        }}
                        key={index}>
                      <div className='symbol'>  {item.label}</div>
                    </p>
                )}
            </div>
        </div>
    )
}

export default Keypad
