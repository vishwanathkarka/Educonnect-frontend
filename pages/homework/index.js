import { useEffect ,useState } from 'react';
import HomeworkUi from '@/util/homeworkUi'
import { isAuthenticated ,getData} from '@/util/apicalls';
import Header from '@/components/header';
export default function Homework() {
  // const [sectionDepartment,setSectionDepartment] = useState(null)
  const [userData,setUserData] = useState(null)
  const [homework,setHomeWork] = useState();
  useEffect(() => {
   setUserData(isAuthenticated().user)
  //  setSectionDepartment({"department":isAuthenticated().user.departments[0].department._id,"section":isAuthenticated().user.departments[0].section[0]._id})
  const fetchdata = async () =>{

const homeworkList = await getData(`/gethomework/${isAuthenticated().user.departments[0].department._id}/${isAuthenticated().user.departments[0].section[0]._id}`,isAuthenticated().token)
setHomeWork(homeworkList.Homeworks)

  }
  fetchdata()
 

 
  }, []);
  console.log(homework)
  
  return (
    <>
    <Header/>
    <div>
    <div
     className='h-[80vh]  bg-secoundblack mx-4 py-3 px-3 rounded-lg my-5'>
      <table className='w-[95vw] hidden lg:table '>
      <thead>
     {userData && userData.role == "student" && <tr className='text-lightwg  font-medium border-b-[rgba(246,247,249,.05)]  border-b-[1px] h-[4.5rem]'>
<td className=''>File</td>
<td className=''>Title</td>
<td className=''>Date uploaded</td>
<td className=''>Last upload</td>
<td className=''>Uploaded by</td>
<td className=''>Status</td>
      </tr>
 
  }
     { userData&&   userData.role == "student" &&

     homework && homework.map((el) => {
      return(
 <HomeworkUi title ={el.title} link ="#" id = {el._id} key={el._id} img={el.lectureId.photo.secure_url} uploaded = {el.timeStamp} lemail = {el.lectureId.email} lname = {el.lectureId.firstName+" "+ el.lectureId.lastName } lastupload = {el.submissionDate } status={el.isSubmittedWork}  /> )

})
}
</thead>

</table>

<div className=' lg:hidden'>
{ userData&&   userData.role == "student" &&

homework && homework.map((el) => {
 return(
<HomeworkUi title ={el.title} link ="#" id = {el._id} key={el._id} img={el.lectureId.photo.secure_url} uploaded = {el.timeStamp} lemail = {el.lectureId.email} lname = {el.lectureId.firstName+" "+ el.lectureId.lastName } lastupload = {el.submissionDate } status={el.isSubmittedWork}  /> )

})
}
</div>
</div>
</div>
 </>
  )
}
