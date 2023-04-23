import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { isAuthenticated } from './apicalls'
import moment from 'moment'

 function Attendaceui(props) {
   const [studentAttendace,setStudentAttendace] = useState()
  return (
    <>
 {/* <Link href={props.link} className='no-underline text-inherit decoration-inherit rounded' style={{ color: 'inherit', textDecoration: 'inherit'}} >  */}
       <div className='px-[5rem] py-2 flex justify-around items-center rounded-lg flex-w  bg-primarylight my-3.5  shadow-xl mx-2 text-[#717377]'>
   {/* <input type="checkbox" name="topping" value="Regular" id="regular" className='w-[1.2rem] h-[1.2rem]' /> */}
   {props.img? <div className=''>
<Image src={props.img?props.img:"https://res.cloudinary.com/dfceagnv7/image/upload/v1669976521/users/nlqbwvkoj7chzzdwm3p9.jpg"} alt="" width={40}
      height={40}   className='rounded-md shadow-md border-lightwg border-[1px]'/>
   </div>:" "}
   <div class="flex flex-col text-center">
   
     <p className='text-[1.2rem] text-white m-0'>{props.name}</p>
      <p class="text-[#606F7B] font-[Avenirregular] "> {props.department}</p> </div>
   <p className='text-primarycolor font-bold'> {props.htno}</p>
   {  props.date && <p className=''>{moment(props.date).format("MMMM Do YYYY")}</p> }
  
 { props.email && <p> {props.email}</p>}
  {props.isAddAttendance?  <div className='flex justify-around gap-3 items-center  text-center'>
   <input type="radio" name={props.name} value="present" onClick={()=>props.attendnceData({"userId":props.id,"isPresent":true,"AttendanceDate":props.date,"lectureId":isAuthenticated().user._id})}  />
      <label htmlFor="present"  className=''>Present</label>
      <input type="radio" name={props.name} value="absent" onClick={()=>props.attendnceData({"userId":props.id,"isPresent":false,"AttendanceDate":props.date,"lectureId":isAuthenticated().user._id})}   />
      <label htmlFor="absent">Absent</label>
      </div>:""}
     {props.isAttendaceview ? props.isPresent? <p class=" w-[100px] text-[rgb(0,128,0)] flex justify-center  items-center gap-1 "><svg xmlns="http://www.w3.org/2000/svg" width="27" height="21" viewBox="0 0 27 21"><rect id="Rectangle_16" data-name="Rectangle 16" width="27" height="21" rx="8" fill="#85baad"></rect><path id="Icon_feather-check" data-name="Icon feather-check" d="M17.806,9,9.689,16.5,6,13.091" transform="translate(2.096 -2.25)" fill="none" stroke="#1a8e72" stroke-linecap="round" stroke-linejoin="round" stroke-width="3"></path></svg>Present</p> :<p class=" w-[100px] text-[#EA8B9E] flex justify-center  items-center gap-1"><svg xmlns="http://www.w3.org/2000/svg" width="27" height="21" viewBox="0 0 27 21"><rect id="Rectangle_30" data-name="Rectangle 30" width="27" height="21" rx="8" fill="#e6bdc5"></rect><path id="Path_28" data-name="Path 28" d="M9.506,97.712a1.092,1.092,0,0,0,0-1.481.949.949,0,0,0-1.4,0L4.861,99.676l-3.25-3.442a.949.949,0,0,0-1.4,0,1.092,1.092,0,0,0,0,1.481l3.25,3.442L.217,104.6a1.092,1.092,0,0,0,0,1.481.949.949,0,0,0,1.4,0l3.247-3.445,3.25,3.442a.949.949,0,0,0,1.4,0,1.092,1.092,0,0,0,0-1.481l-3.25-3.442Z" transform="translate(8.639 -90.657)" fill="#ea8b9e"></path></svg>Absent</p>:null}
   </div>
 {/* </Link> */}
   
    </>
  )
}

export default React.memo(Attendaceui)