import React from 'react'
import '../Style/Body.css'
import { useState,useEffect } from 'react'
import Data from '../Components/Data.jsx'
import Clear from '../Assets/Clear.svg'
import Left from '../Assets/Left.svg'
import Right from '../Assets/Right.svg'

export default function Body() {
    // const [Answers, setAnswers] = useState(new Array(Data.length).fill(null))
    const [SubmitBtn, setSubmitBtn] = useState(false)
    const [Complete, setComplete] = useState(JSON.parse(localStorage.getItem("Quiz-Complete")) || false)
    const [Marks, setMarks] = useState(0)
    const [Answers, setAnswers] = useState(JSON.parse(localStorage.getItem("Quiz-Ans"))
    || new Array(Data.length).fill(null))
    const [iter, setiter] = useState(0)
    const [answered, setanswered] = useState(null)
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
            console.log(`${answered}` + `${Data[iter].Answer}`)
            console.log('Correct Answer')
            setMarks(prev => prev + 1);
        }
        else{
            console.log('Incorrect')
            setMarks(prev => prev - 1);
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
        setiter(prev => prev - 1); 
    }
    const handleSave = () =>{
        const updatedAnswers = [...Answers];
        updatedAnswers[iter] = answered;
        setAnswers(updatedAnswers);
        setanswered(null);
        setSubmitBtn(true);
        if(answered == Data[iter].Answer){
            setMarks(prev => prev + 1);
        }
        else if (answered == null){
            console.log('null')
        }
        else if(answered != Data[iter].Answer){ 
            setMarks(prev => prev - 1);
        }
        alert(`Your Test Has Been Saved`);
    }
    const handleSubmit =  () =>{
        alert(`You Scored ${Marks} Marks`)
        setTimeout(() => {
            setComplete(true);
        }, 1000);
        
        window.location.reload();
    }
    // useEffect(() => {
    // console.log(Answers)
    // console.log(`The current Score is : `+`${Marks}`)
    // console.log(SubmitBtn)
    // }, [Answers]);

    useEffect(() => {
        localStorage.setItem("Quiz-Ans", JSON.stringify(Answers));
      }, [Answers]);
      useEffect(() => {
        localStorage.setItem("Quiz-Complete", JSON.stringify(Complete));
      }, [Complete]);
    
  return (
    <>
    {/* <button className='btn' onClick={()=>{clearStorage()}}>Give Again</button> */}
    <div className="body-container">
        <div className="questions-card">
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
               <img src={Right} height={30} alt="" /></button> : ''}
               </div>
               }
        </div>
    </div>
    
    </>
  )
}



 {/* {Data.map((ele,i) =>{
                return(
                    <>
                    <div className="question" key={ele.Id}>
                        {ele.Question}
                    </div>
                    <div>
                        <span>{ele.Options.map((ele)=>{
                            return(
                                <>
                                <div className='answers'>{ele}</div>
                                </>
                            )
                        })}</span>
                    </div>
                    </>
                )
            })} */
}
// const selected = e.currentTarget.dataset.value;
// console.log(e.currentTarget.dataset.value);

{/*             <span data-value={1} className={`color click`} onClick={(e,value)=>{handleAnswer(e,value)}}>               Answer number 1</span>
                <span data-value={2} className='click' onClick={(e,value)=>{handleAnswer(e,value)}}>Answer number 2</span>
                <span data-value={3} className='click' onClick={(e,value)=>{handleAnswer(e,value)}}>Answer number 3</span>
                <span data-value={4} className='click' onClick={(e,value)=>{handleAnswer(e,value)}}>Answer number 4</span> */
}
