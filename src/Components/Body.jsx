import React from 'react'
import '../Style/Body.css'
import { useState,useEffect } from 'react'
import Data from '../Components/Data.jsx'
import Clear from '../Assets/Clear.svg'
import Left from '../Assets/Left.svg'
import Right from '../Assets/Right.svg'

export default function Body() {
    const [SubmitBtn, setSubmitBtn] = useState(false)
    const [Complete, setComplete] = useState(JSON.parse(localStorage.getItem("Quiz-Complete")) || false)
    const [Final_Marks, setFinal_Marks] = useState(JSON.parse(localStorage.getItem("Quiz-Marks") || 0))
    const [Answers, setAnswers] = useState(JSON.parse(localStorage.getItem("Quiz-Ans"))
    || new Array(Data.length).fill(null))
    const [iter, setiter] = useState(0)
    const [answered, setanswered] = useState(null)

    // if(Complete){
    //     alert(`You Scored ${Final_Marks} Marks`)
    // }
    const handleAnswer = (e,i,ele) =>{
        setanswered(ele);
    }
    const handleClear = () =>{
        setanswered(null);
        const updatedAnswers = [...Answers];
        updatedAnswers[iter] = null;
        setAnswers(updatedAnswers);
    }
    const handleNext = () =>{
        if(answered != null){
        const updatedAnswers = [...Answers];
        updatedAnswers[iter] = answered;
        setAnswers(updatedAnswers);
        setanswered(null);
        if(answered == Data[iter].Answer){
            // console.log('Correct Answer')
        }
        else{
            // console.log('Incorrect')
        }
        setiter(prev => prev + 1);
    }
    else 
        setiter(prev => prev + 1);
    }
    const handlePrev = () =>{
        if(answered != null){
        const updatedAnswers = [...Answers];
        updatedAnswers[iter] = answered;
        setAnswers(updatedAnswers);
        setanswered(null);
        setiter(prev => prev - 1);
        }
        else
        setiter(prev => prev - 1); 
    }
    const handleSave = () =>{
        const updatedAnswers = [...Answers];
        updatedAnswers[iter] = answered;
        setAnswers(updatedAnswers);
        setanswered(null);
        setSubmitBtn(true);
        alert(`Your Test Has Been Saved`);
    }
    const handleSubmit =  () =>{
        handleMarks();
        setTimeout(() => {
            setComplete(true);
            setiter(0);
        }, 1000);
    }
    const handleMarks = () =>{
        for(let i=0;i<Data.length;i++){
            if(Answers[i] == Data[i].Answer){
                setFinal_Marks(prev => prev + 1)
            }
            else if (Answers[i] != Data[i].Answer){
                if(Answers[i] == null){
                    continue
                }
                else{
                setFinal_Marks(prev => prev - 1)
                }
            }
            else{
                continue;
            }
        }
    }
    // useEffect(() => {
    // // console.log(Answers)
    // // console.log(`The current Score is : `+`${Final_Marks}`)
    // console.log(iter)
    // }, [Answers]);

    useEffect(() => {
        localStorage.setItem("Quiz-Ans", JSON.stringify(Answers));
      }, [Answers]);
      useEffect(() => {
        localStorage.setItem("Quiz-Complete", JSON.stringify(Complete));
        localStorage.setItem("Quiz-Marks", JSON.stringify(Final_Marks));
      }, [Complete]);
    
  return (
    <>
    <div className="body-container">
        <div className="questions-card">
            {Complete && <div className="marks">{Final_Marks}</div>}
            <div className="question">
                <span className='Q-mark'>Q{iter+1}</span> <br></br>
                <p>{Data[iter].Question}</p>
            </div>
            <div className="options">
                {Data[iter].Options.map((ele,i) =>{
                    return(
                        <span key={i} className={ !Complete && answered == ele || Answers[iter] == ele ? `color`:``}
                        id={Complete && ele == Data[iter].Answer ? 'green' : ''}
                        onClick={(e)=>{handleAnswer(e,i,ele)}}>{ele} </span>
                    )
                })}
            </div>

            {!Complete ? <div className='buttons'>
            
               {Complete && Answers[iter] != null || answered != null && !SubmitBtn ? <button className='btn'onClick={()=>{handleClear()}}>
                <img src={Clear} height={30} alt="" />
                </button> : <></>
               }

               {iter > 0 ? <button className='btn' onClick={()=>handlePrev()}> 
               <img src={Left} height={30} alt="" />
               </button> :<></>
               }

               {iter < Data.length-1 ? <button className='btn' onClick={()=>{handleNext()}}>
               <img src={Right} height={30} alt="" /></button> 
               : 
               <>
               {!SubmitBtn ? <button className='btn' onClick={()=>{handleSave()}}> Save </button> :
               <button className='btn' onClick={()=>{handleSubmit()}}> Submit </button>}
               </>
               }
               </div>
               :

               <div>
               {iter > 0 ? <button className='btn' onClick={()=>handlePrev()}> 
               <img src={Left} height={30} alt="" />
               </button> :<></>
               }
               {iter < Data.length-1 ? <button className='btn' onClick={()=>{handleNext()}}>
               <img alt=">" src={Right} height={30} /></button> : ''}
               </div>
               }
        </div>
    </div>
    
    </>
  )
}
