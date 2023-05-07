import Header from '@/components/header'
import Link from 'next/link';
import { getData, isAuthenticated } from '@/util/apicalls';
import { useEffect,useState } from 'react';
import moment from 'moment';
import { useRouter } from "next/router";

const  Dashboard = () => {
    const router = useRouter();
    const [homeworkcount,setHomeWorkCount] = useState(null)
    const [paymentPending,setPaymentPending]= useState(null)
    const [failedCount,setFailedCount] = useState(null)
    const [permissionPendingCount,setPermissionPendingCount] = useState(null)
    const [getTimetable,setGetTimetable] = useState(null)
    const [settingarragement,setSittingArragement] = useState(null)
    useEffect(() => { 
        const getDatauser = async() =>{
            console.log(isAuthenticated().role == "student"? isAuthenticated().user._id:isAuthenticated().role== "parent"?isAuthenticated().user.student_id._id:isAuthenticated().role == "lecturer"?"/lecturer/"+isAuthenticated().user._id:"")
      const count = await getData(`${isAuthenticated().user.role== "student"?"/homeworkcompledcount/"+ isAuthenticated().user._id:isAuthenticated().user.role== "parent"?"/homeworkcompledcount/"+isAuthenticated().user.student_id._id:isAuthenticated().user.role == "lecturer"?"/homeworkadded/lecturer/"+isAuthenticated().user._id:isAuthenticated().user._id}`,isAuthenticated().token)
      setHomeWorkCount(count.count)
      const paymentPenddingCount = await getData(`${isAuthenticated().user.role== "student"?"/findpaymentpendingcount/"+ isAuthenticated().user._id:isAuthenticated().user.role== "parent"?"/findpaymentpendingcount/"+isAuthenticated().user.student_id._id:isAuthenticated().user.role == "lecturer"?"/findpaymentadded/lecturer/"+isAuthenticated().user._id:isAuthenticated().user._id}`,isAuthenticated().token)
setPaymentPending(paymentPenddingCount.paymentPendingCount)
const permissionPendingCount = await getData(`/permissionpendingcount/${isAuthenticated().user._id}`,isAuthenticated().token)
setPermissionPendingCount(permissionPendingCount.permissionCount)
const failedSubjectsCount = await getData(`/getfailedCount/${isAuthenticated().user._id}`,isAuthenticated().token)
setFailedCount(failedSubjectsCount.failedCount)
if(isAuthenticated().user.role == "student" ){
const getTimeTableList = await getData(`/gettimetable/${isAuthenticated().user.departments[0].department._id}/${isAuthenticated().user.departments[0].section[0]._id}`,isAuthenticated().token)
console.log(getTimeTableList)
setGetTimetable(getTimeTableList.getTimeTable)
}
else if(isAuthenticated().user.role == "parent"){
    const getTimeTableList = await getData(`/gettimetable/${isAuthenticated().user.student_id.departments[0].department}/${isAuthenticated().user.student_id.departments[0].section[0]}`,isAuthenticated().token)
console.log(getTimeTableList)
setGetTimetable(getTimeTableList.getTimeTable)
}
else if (isAuthenticated().user.role == "lecturer"){
// /viewstittingarragmentadded
const getTimeTableList = await getData(`/getlecturetable`,isAuthenticated().token)
console.log(getTimeTableList)
setGetTimetable(getTimeTableList.lectureTimeTable)
}
console.log(moment().day())
//  console.log(getTimeTableList)
if(isAuthenticated().user.role == "student" || isAuthenticated().user.role == "parent"){
 const sittingArrangement = await getData(`/findsittingarragement/${isAuthenticated().user._id}`,isAuthenticated().token)
 console.log(sittingArrangement.arrangement
    )
 setSittingArragement(sittingArrangement.arrangement)
}
else if (isAuthenticated().user.role == "lecturer"){
    const sittingArrangement = await getData("/viewstittingarragmentadded",isAuthenticated().token)
    setSittingArragement(sittingArrangement.arrangement)
}


        }
        if(!isAuthenticated()){
            router.push("/login")
           }
           isAuthenticated() &&  getDatauser()
    }, [router]);
    console.log(moment().format('dddd').toLowerCase())
const getDay = (day)=>{
if(day == 0){
    return "sunday"
}
else if(day == 1){
    return "monday"
}
else if(day == 2){
    return "tuesday"
}
else if(day == 2){
    return "wednesday"
}
else if(day == 3){
    return "thursday"
}
else if(day == 4){
    return "friday"
}
else if(day == 5){
    return "saturday"
}

}
// settingarragement && console.log("RESSS"+  settingarragement[0].noOfCol)
  return (
   <>
   <Header/>
<div className='h-[95vh] p-6'>
{/* <div className='bg-gradient-to-b from-gradent1_1 to-gradent1_2 h-[10rem] w-[10rem]'>
<p></p>
</div> */}

<div className='flex gap-5  flex-wrap items-center justify-center '>
<Link href="/payment" className='no-underline'>
    <div className='bg-[#FFD43B] h-[30vh] w-[20vw] shadow-md rounded-xl flex flex-col justify-center items-center' >
     
            <div>
            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-credit-card" width="48" height="48" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <rect x="3" y="5" width="18" height="14" rx="3" />
  <line x1="3" y1="10" x2="21" y2="10" />
  <line x1="7" y1="15" x2="7.01" y2="15" />
  <line x1="11" y1="15" x2="13" y2="15" />
</svg>
            </div>
<h1 className='text-white'>{paymentPending}</h1>
<p className='text-white'>Pending Payment</p>

    </div>
    </Link>
    <Link href="/homework" className='no-underline'>
    <div className='bg-[#1A8E72] h-[30vh] w-[20vw] shadow-md rounded-xl flex flex-col items-center justify-center' >
        <div className="">
    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-book" width="48" height="48" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <path d="M3 19a9 9 0 0 1 9 0a9 9 0 0 1 9 0" />
  <path d="M3 6a9 9 0 0 1 9 0a9 9 0 0 1 9 0" />
  <line x1="3" y1="6" x2="3" y2="19" />
  <line x1="12" y1="6" x2="12" y2="19" />
  <line x1="21" y1="6" x2="21" y2="19" />
</svg>
</div>
<h1 className='text-white'>{homeworkcount}+</h1>
<p className='text-lightwg'>Homework Submitted</p>
    </div>
    </Link>

<Link href="/permission?status=pending&page=1" className='no-underline'>
    <div className='bg-secoundblack h-[30vh] w-[20vw] shadow-md rounded-xl flex flex-col justify-center items-center' >
<div>
<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-user-check" width="48" height="48" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <circle cx="9" cy="7" r="4" />
  <path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
  <path d="M16 11l2 2l4 -4" />
</svg>
</div>
<h1 className='text-white'>{permissionPendingCount}</h1>
<p className='text-lightwg'>Permission Pending</p>
    </div>
    </Link>
    <Link className='no-underline' href="/exam/result">
    <div className='bg-[#EA8B9E] h-[30vh] w-[20vw] shadow-md rounded-xl flex flex-col justify-center items-center' >
<div>
<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-x" width="48" height="48" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <line x1="18" y1="6" x2="6" y2="18" />
  <line x1="6" y1="6" x2="18" y2="18" />
</svg>
</div>
<h1 className='text-white'>{failedCount}</h1>
<p className='text-white'>Failed Subject count</p>
    </div>
    </Link>
</div>
<h5 className='text-white text-center mt-4'>Todays Classes {moment().format('dddd').toLowerCase()}</h5>

<table className='text-white w-[100vw] my-8 '>
<thead>
<tr>  <td className='py-2 px-10'>Name</td> 
                    <td>Class</td> </tr>
                    <td>Monday</td>
<td>Tuesday</td>
<td>Wednesday</td>
<td>Thursday</td>
<td>Friday</td>
<td>Saturday</td>
        {
     getTimetable && getTimetable.map((el)=>{

        return(
           <> <tr className='py-4'>   
            <td>{el.period}</td>
            <td>{el.monday}</td>
            <td>{el.tuesday}</td>
             </tr>  </>
        )
      
      console.log("***$$"+el)
                      })         
        }
    
    {
       console.log(getTimetable)
                          
    }
    </thead>
</table>

{settingarragement &&  <table className=' text-white w-[100vw]'>
    <thead>

    <tr>
    <td>Exam Name </td>
            <td>Room No </td>
            <td>Exam Date</td>
        </tr>
       {settingarragement && settingarragement.map((el) =>{
return(
<>
        <tr>
             <td>{el.examName}</td>
            <td>{el.roomno}</td>
            <td>{moment(el.examDate).format("MMM Do YY") }</td>
        </tr>
        </>
)
        })
}
    </thead>
</table> }
</div>
   </>
  )
}
export default Dashboard
