/* eslint-disable react/jsx-key */
/* eslint-disable react-hooks/rules-of-hooks */

import { useEffect } from "react";
import Attendaceui from '@/util/attendaceui'
import {postData,getData}  from "../../util/apicalls"
import loadingimg from "../../util/Spinner-1s-200px.gif"
import Image from 'next/image'
import{isAuthenticated} from "../../util/apicalls"
import { useState } from "react";
export default function add() {

const[userDataForAttendace,setUserDataForAttendace] =  useState();
const [attendace,setAttendace] = useState({data:[]});
const [loading,setLoading] = useState(false)
const [departmentListFetch, setDepartmentListFetch] = useState();
  const [sectionListFetch, setSectionListFetch] = useState(null);
console.log("600000"+ JSON.stringify(isAuthenticated().user))

  useEffect(() => {
    async function fetchdata(){
 let data = await postData("/getalluserforattendance",{"department":"641f4777c5cb1ab7e65ec29d","sections":"641f48f11edf6915d2ba0f41"})
 console.log(data.success  );
 if(data.success == true){
  
 setUserDataForAttendace(data.user)
 setLoading(true)
 console.log(userDataForAttendace);

 }
 let departmentlist = await getData("/listdepartment");
 if (departmentlist.success == true) {
  setDepartmentListFetch(departmentlist.listOfDepartment);
}
let sectionlist = await getData("/listsection");
if (sectionlist.success == true) {
  setSectionListFetch(sectionlist.listOfSection);
}
console.log(departmentListFetch)

    }
    fetchdata()
  },[]);
  

async function attendanceSubmit(){
let da =  await postData("/bulkattendanceadd",attendace)
}

  function attendance(data){
if(attendace.data.length == 0){ 
attendace.data.push(data)
console.log("kkk")
}
else{
  let iscontain = false;
  let updatedData = attendace.data.map(item=>{
          console.log("%%%%%"+item)
         
         if(item.id ==  data.id){
          item.attendace= data.attendace
          // setAttendace([...attendace,attendace:item.attendace]) 
      console.log("hhh")
      iscontain = true;
         }

        
        }
  )
  if(iscontain == false){
    attendace.data.push(data)
  }
}
  
    console.log(attendace)
    
   }
  return (
<>
<div className=" flex items-center gap-3 px-3 ">
  <select name="" id="" className="block  rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6  my-4">
  <option selected className=" ">select department</option>
  {departmentListFetch &&
              departmentListFetch.map((data) => (
                <option value={data._id} key={data._id}>
                  {data.department}
                </option>
              ))}
  </select>
  <select
            className="block rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 my-4" 
          >
            <option selected>Choose Section ...</option>

            {sectionListFetch &&
              sectionListFetch.map((data) => (
                <option value={data._id} key={data._id}>
                  {data.section}
                </option>
              ))}
          </select>
<button className="bg-primary text-white py-2 px-3 h-[2.5rem] rounded" onClick={attendanceSubmit}>submit</button>
</div>
{
!loading? <div className="h-[80vh] flex justify-center items-center"><Image src={loadingimg} alt=""/></div> :userDataForAttendace.map(data=> { return <Attendaceui name = {data.firstName} img = {data.photo.secure_url}  section ="CSE" date="December 6th 2022" htno={data.htno} id={data._id}  checked ={true}  attendnceData={attendance} /> })
}
</>

  )
}
