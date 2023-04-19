import { useEffect ,useState } from 'react';
import HomeworkUi from '@/util/homeworkUi'
import { isAuthenticated ,getData} from '@/util/apicalls';

export default function Homework() {
  const [sectionDepartment,setSectionDepartment] = useState(null)
  const [homework,setHomeWork] = useState(null);
  useEffect(() => {
   
   setSectionDepartment({"department":isAuthenticated().user.departments[0].department._id,"section":isAuthenticated().user.departments[0].section[0]._id})

   const fetchdata = async () =>{
    if(sectionDepartment){
const homeworkList = await getData(`/gethomework/${sectionDepartment.department}/${sectionDepartment.section}`)
setHomeWork(homeworkList)
    }
    console.log(homework)
  }

  fetchdata()
 
  }, []);


  // console.log(homework)
  
  
  return (
    <>
<HomeworkUi title ="ddf"/>
 </>
  )
}
