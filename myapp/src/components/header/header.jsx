import React from 'react'
import { useEffect ,useRef } from 'react'
import "./header.css"

function Header(props) {
  //reference klye use hota h
  const resultref =useRef()
  const expressionref =useRef()
  useEffect(()=>{
        // .current se us element ka reference mil jae ga
         // scrollintoview func se ye view mai mtlb samne aa jae ga automatically, agr view se bahir hoga to
      resultref.current.scrollIntoView() //scroll down auto
  }, [])

  useEffect(()=>{
     expressionref.current.scrollLeft =expressionref.current.scrollWidth //left side se scroll width mtlb jtni width poora krdo
  },[props.expression])
  return (
    <div className='header custom-scroll'>
   <div className="header-history">
   {
    props.history &&   //agr history ho tw aye
    props.history?.map((item,index)=><p key={item+Math.random()*44}>{item}</p>) //yahan pe unique dena hog key qk hmy update krna h

   }
   </div>
   <div className="header-expression custom-scroll" ref={expressionref}>
    <p>{props.expression}</p>
   </div>
   <div className="header-result">
    <p ref={resultref} className="header-result">{props.result}</p>
   </div>
    </div>
  )
}

export default Header

