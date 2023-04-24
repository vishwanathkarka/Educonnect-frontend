import Header from '@/components/header'
import Link from 'next/link';
import { getData, isAuthenticated } from '@/util/apicalls';
import { useEffect,useState } from 'react';
import moment from 'moment';

const  Dashboard = () => {
    const [homeworkcount,setHomeWorkCount] = useState(null)
    const [paymentPending,setPaymentPending]= useState(null)
    const [failedCount,setFailedCount] = useState(null)
    const [permissionPendingCount,setPermissionPendingCount] = useState(null)
    const [getTimetable,setGetTimetable] = useState(null)
    useEffect(() => { 
        const getDatauser = async() =>{
          
            console.log(isAuthenticated().role == "student"? isAuthenticated().user._id:isAuthenticated().role== "parent"?isAuthenticated().student_id:isAuthenticated().role == "lecturer"?"/lecturer/"+isAuthenticated().user._id:"")
      const count = await getData(`${isAuthenticated().user.role== "student"?"/homeworkcompledcount/"+ isAuthenticated().user._id:isAuthenticated().user.role== "parent"?"/homeworkcompledcount/"+isAuthenticated().user.student_id:isAuthenticated().user.role == "lecturer"?"/homeworkadded/lecturer/"+isAuthenticated().user._id:isAuthenticated().user._id}`)
      setHomeWorkCount(count.count)
      const paymentPenddingCount = await getData(`${isAuthenticated().user.role== "student"?"/findpaymentpendingcount/"+ isAuthenticated().user._id:isAuthenticated().user.role== "parent"?"/findpaymentpendingcount/"+isAuthenticated().user.student_id:isAuthenticated().user.role == "lecturer"?"/findpaymentadded/lecturer/"+isAuthenticated().user._id:isAuthenticated().user._id}`,isAuthenticated().token)
setPaymentPending(paymentPenddingCount.paymentPendingCount)
const permissionPendingCount = await getData(`/permissionpendingcount/${isAuthenticated().user._id}`)
setPermissionPendingCount(permissionPendingCount.permissionCount)
const failedSubjectsCount = await getData(`/getfailedCount/${isAuthenticated().user._id}`)
setFailedCount(failedSubjectsCount.failedCount)
const getTimeTableList = await getData(`/gettimetable/${isAuthenticated().user.departments[0].department._id}/${isAuthenticated().user.departments[0].section[0]._id}`)
console.log(getTimeTableList)
setGetTimetable(getTimeTableList.getTimeTable)
console.log(moment().day())


console.log( getTimeTableList.getTimeTable.filter((el)=>{
    return moment().format('dddd').toLowerCase() == el.day && el.day == true
                  }))
        }
        getDatauser()
    }, []);
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
  return (
   <>
   <Header/>
<div className='h-[95vh] p-6'>
{/* <div className='bg-gradient-to-b from-gradent1_1 to-gradent1_2 h-[10rem] w-[10rem]'>
<p></p>
</div> */}

<div className='flex gap-5  flex-wrap '>
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

<Link href="/permission?status=pending" className='no-underline'>
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

<table className='text-white w-[100vw] m-3'>
<thead>
<tr> <td>Day</td> <td>Name</td> 
                    <td>Class</td> </tr>

        {/* {
     getTimetable && getTimetable.filter((el)=>{
       console.log( el.moment().format('dddd').toLowerCase() == true )
                      })         
        }
    
    {
       console.log(getTimetable)
                          
    } */}
    </thead>
</table>


</div>
   </>
  )
}
export default Dashboard
