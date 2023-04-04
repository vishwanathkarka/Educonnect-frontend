import React from 'react'
import Image from 'next/image'
import { useState } from 'react'

export default function Attendaceui(props) {
   const [studentAttendace,setStudentAttendace] = useState()
  return (
    <>
       <div className='px-[5rem] py-2 flex justify-around items-center flex-wrap'>
   <input type="checkbox" name="topping" value="Regular" id="regular" className='w-[1.2rem] h-[1.2rem]' />
<div className=''>
<Image src={props.img?props.img:"https://res.cloudinary.com/dfceagnv7/image/upload/v1669976521/users/nlqbwvkoj7chzzdwm3p9.jpg"} alt="" width={500}
      height={500}   className='w-[5rem] h-[5rem] rounded-md shadow-md'/>
   </div>
   <div class="flex flex-col text-center"> <h3 className='text-[1.2rem]'>{props.name}</h3> <p class="text-[#606F7B] font-[Avenirregular] "> CSE</p> </div>
   <p className='text-primary font-bold'> {props.htno}</p>
  <p className=''>{props.date}</p>
  
  <div className='flex justify-around gap-3 items-center  text-center'>
   <input type="radio" name={props.name} value="Regular" onClick={()=>props.attendnceData({"userId":props.id,"isPresent":true,"date":props.date,"lectureId":"6429ae4dd4f9f2e4c8f95ddb"})}  />
      <label htmlFor="present" >Present</label>
      <input type="radio" name={props.name} value="Medium" onClick={()=>props.attendnceData({"userId":props.id,"isPresent":false,"date":props.date,"lectureId":"6429ae4dd4f9f2e4c8f95ddb"})}   />
      <label htmlFor="absent">Absent</label>
      </div>
   </div>
   <hr class="text-[#dae1e7]"></hr>
    </>
  )
}
