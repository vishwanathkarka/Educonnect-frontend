import { useEffect ,useState } from 'react';
import HomeworkUi from '@/util/homeworkUi'
import { isAuthenticated ,getData} from '@/util/apicalls';

export default function Homework() {
  // const [sectionDepartment,setSectionDepartment] = useState(null)
  const [userData,setUserData] = useState(null)
  const [homework,setHomeWork] = useState(null);
  useEffect(() => {
   setUserData(isAuthenticated().user)
  //  setSectionDepartment({"department":isAuthenticated().user.departments[0].department._id,"section":isAuthenticated().user.departments[0].section[0]._id})
  const fetchdata = async () =>{

const homeworkList = await getData(`/gethomework/${isAuthenticated().user.departments[0].department._id}/${isAuthenticated().user.departments[0].section[0]._id}`)
setHomeWork(homeworkList)

    console.log(homework)
  }
  fetchdata()
 

 
  }, []);
  
  return (
    <>
    <div className='h-[80vh] bg-secoundblack mx-4 py-3 px-3 rounded-lg'>
<HomeworkUi title ="ddf" link ="#"/>
</div>
 </>
  )
}
