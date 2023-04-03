/* eslint-disable react/jsx-key */
/* eslint-disable react-hooks/rules-of-hooks */

import { useEffect } from "react";
import Attendaceui from '@/util/attendaceui'
import {postData}  from "../../util/apicalls"
import { useState } from "react";
export default function add() {

const[userDataForAttendace,setUserDataForAttendace] =  useState();
const [attendace,setAttendace] = useState([]);
  useEffect(() => {
    async function fetchdata(){
 let data = await postData("/getalluserforattendance",{"department":"641f4777c5cb1ab7e65ec29d","sections":"641f48f11edf6915d2ba0f41"})
 console.log(data.success  );
 if(data.success == true){
 setUserDataForAttendace(data.user)
 console.log(userDataForAttendace);
 }
    }
    fetchdata()
  },[]);

  // function attendance(data){
  //   if((attendace.find((da)=>{ return da.id==data.id}) ==undefined)){
  //   setAttendace([...attendace,data])
  //   }
  //   else{
  //     setAttendace(attendace.map(el=> {
  //       (el.id == data.id)?{data}:el
  //     }))
  //   }
  //   console.log(attendace)
  //   // console.log(data)
  // }


  function attendance(data){
    if(attendace.length == 0){
      setAttendace([data]);
    }
    else{
    let updatedData = attendace.map(item=>{
      console.log("%%%%%"+item)
     if(item.id ==  data.id){
      item.attendace = data.attendace
      setAttendace([...attendace,item]) 
      console.log("updates")
     }
 else{
  setAttendace([...attendace,data]);
  console.log("donee")
 }
     
    }
    )
  }
    // setAttendace(updatedData);
    console.log(attendace)
    
   }
  return (
<>
{
userDataForAttendace && userDataForAttendace.map(data=> { return <Attendaceui name = {data.firstName}  section ="CSE" date="December 6th 2022" htno={data.htno} id={data._id}  checked ={true}  attendnceData={attendance} /> })
}
</>

  )
}
