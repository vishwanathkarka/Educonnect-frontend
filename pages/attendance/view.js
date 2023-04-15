import { useEffect,useState } from 'react'
import { getData,isAuthenticated } from '@/util/apicalls';
import moment from 'moment';
import ResultNotFound from '@/util/resultNotFound';
import Attendaceui from '@/util/attendaceui';
 function View() {
    const[attendances,setAttendances]= useState() 

    useEffect(() => {
       async function fetchData(){
      let data = await getData(`/getindividualattendance/${isAuthenticated().user._id}`)
      console.log(isAuthenticated().user._id)
      console.log(data)
      if(data.success == true){
      setAttendances(data.att)
    //   console.log(attendances.length)
      }
        }
        fetchData()
    }, []);
  return (
   <>

   {
        attendances &&  attendances.length==0?
            (<ResultNotFound/> ):""
        }
   {
    attendances && attendances.map(attendance=>{ 
       return <Attendaceui htno={moment(attendance.timeStamp).format("MMM Do YY")} key ={attendance._id} link="#" isPresent={attendance.isPresent} isAttendaceview ={true}  name = {attendance.lectureId.firstName}/>
    })
   }
   </>
  )
}


export default View