import { useEffect,useState } from "react";
import { getData, isAuthenticated, updateData } from "@/util/apicalls";
import { useRouter } from 'next/router'
import Image from "next/image";
import UserDataEdit from "@/components/userDataEdit";
import Header from "@/components/header";
import Loading from "@/components/loading";

function AdminCard (props){
    return(
      <div className='bg-secoundblack  mx-4 my-3  relative rounded-[35px] h-[200px] w-[170px] flex  text-center flex-col justify-center gap-4 items-center '>
    { 
    false ? <svg className=' absolute top-5 right-4 cursor-pointer' xmlns="http://www.w3.org/2000/svg" width="16.43" height="17" viewBox="0 0 16.43 17">
<ellipse id="Ellipse_19" data-name="Ellipse 19" cx="8.215" cy="8.5" rx="8.215" ry="8.5" fill="#b9b6f8"/>
<g id="Group_43" data-name="Group 43" transform="translate(5.06 5.051)">
<path id="Path_48" data-name="Path 48" d="M0,0H5.563V7.238H0Z" fill="none"/>
<line id="Line_14" data-name="Line 14" x1="6.809" y2="7.578" transform="translate(-0.249 -0.34)" fill="none" stroke="#808fbe" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/>
<line id="Line_15" data-name="Line 15" x2="6.809" y2="7.578" transform="translate(-0.249 -0.34)" fill="none" stroke="#808fbe" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/>
  </g>
</svg>:<svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-plus  absolute top-5 right-4 cursor-pointer " width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round" onClick={()=>{props.closeForm(true)}}>
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <line x1="12" y1="5" x2="12" y2="19" />
  <line x1="5" y1="12" x2="19" y2="12" />
</svg>

    }         
            <Image className='  w-[70px] h-[70px] rounded-[50%] border-lightwg border-[1px]' src={props.photo} alt="flower" width={700} height={800} />
            <div>
           
            <h6 className='ml-4 -mt-2 font-semibold  text-[white]'>{props.name}</h6>
            {/* <h3 className='text-[#ffffff9e]'>{section}</h3> */}
          
            </div>

            
      </div>

    )
  }

export default function Index() {
    const router = useRouter()

    const [departmentListFetch, setDepartmentListFetch] = useState();
    const [sectionListFetch, setSectionListFetch] = useState(null);
    const [userSeleceted,setUserSelected] = useState(null);
    const [role , setRole] = useState(null);
    const [userInfo,setUserInfo] = useState(null)
    const [viewForm,setViewForm] = useState(false)
    const [isloading,setIsLoading] = useState(false);
    const formViewStatus = () =>{
setViewForm(!viewForm);
    }
    useEffect(() => {

      if(router.query.department == undefined && router.query.section == undefined && router.query.role == undefined){
        router.query.department = isAuthenticated().user.departments[0].department._id
        router.query.section = isAuthenticated().user.departments[0].section[0]._id
        router.query.role = "student"
        router.push(router)
       }
        async function fetchDepartment() {
          if(isAuthenticated().user.role != "Admin"){
            router.push("/")
          }
          
          // fetching the department from api
          if(isAuthenticated().user.role == "Admin"){
          let departmentlistobj = await getData("/listdepartment",isAuthenticated().token);
          let departmentlist = departmentlistobj;
          if (departmentlist.success == true) {
            setDepartmentListFetch(departmentlist.listOfDepartment);
          }
        }
        }
        fetchDepartment();
        async function fetchSection() {
          if(isAuthenticated().user.role == "Admin"){
          // fetching the department from api
          let sectionlist = await getData("/listsection",isAuthenticated().token);
          if (sectionlist.success == true) {
            setSectionListFetch(sectionlist.listOfSection);
          }
        }
        }
      
        fetchSection();

      }, []);

      useEffect(() => {
        const userData = async ()=>{
          setIsLoading(true)
            const data = await getData(`/getusersforadmin/${router.query.department}/${router.query.section}/${router.query.role}`,isAuthenticated().token)
            setUserInfo(data)
            if(data.success == true){
              setIsLoading(false)
            }
            
            }
            router.query.department && router.query.section &&   userData()
      }, [router.query.department,router.query.section,router.query.role]);
      const handleInput = (name)=> (el) =>{
setUserSelected({...userSeleceted,[name]:el.target.value});
// router.push(name,el.target.value)


if(name == "department"){
    router.query.department = el.target.value
    router.push(router) 
}
else if(name == "section"){
    router.query.section = el.target.value 
    router.push(router) 
}
else{
    router.query.role = el.target.value
    router.push(router) 
}

router.push(router) 


console.log(userInfo)
// const { page, status } = router.query;
console.log(userSeleceted)
      }

      const onSubmitForm = (el) =>{
el.preventDefualt
      }
      function activeSelect (option ,status){
        if(status == option){
            return true
        }
        else{
            return false
        }
          }
          const viewFormSet = ()=>{
setViewForm(false)
          }
  return (
   <>
    <Header/>
   <div className="min-h-[100vh]">
   
   <div className="flex gap-3 px-3 bg-black ">
 
       <select
            className="block w-full rounded-md border-0 bg-secoundblack py-1.5 text-white pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 my-4"
            id="Department"
            onChange={handleInput("department")}
            // value={departments} 
          
          >
            <option selected>Choose Department ...</option>
            {console.log("::::::::" + JSON.stringify(departmentListFetch))}
            {departmentListFetch &&
              departmentListFetch.map((data) => (
                <option value={data._id}
                selected={activeSelect(data._id,router.query.department)}
                key={data._id}>
                  {data.department}
                </option>
              ))}
          </select>
          <select
            className="block w-full rounded-md border-0 bg-secoundblack text-white py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 my-4"
            id="section" 
            onChange={handleInput("section")}
          >
            <option selected>Choose Section ...</option>

            {sectionListFetch &&
              sectionListFetch.map((data) => (
                <option value={data._id}   selected={activeSelect(data._id,router.query.section)}  key={data._id}>
                  {data.section}
                </option>
              ))}
          </select>
          <select className="block w-full rounded-md border-0 bg-secoundblack text-white py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 my-4" id = "role"
            onChange={handleInput("role")} >
          <option selected >Choose Role ...</option>
            <option value="student" key="student" selected={activeSelect("student",router.query.role)}  >student</option>
            <option value="lecturer" key="lecturer" selected={activeSelect("lecturer",router.query.role)} >lecturer</option>
            <option value="parent" key="parent" selected={activeSelect("parent",router.query.role)} >Parent</option>
          </select>
          </div>
{!isloading && <div className="flex">
  { userInfo && userInfo.user.map(user => (<> <AdminCard key={user._id} photo ={user.photo.secure_url} name ={user.firstName}  closeForm = {formViewStatus}  />  { viewForm && (<UserDataEdit  closeForm = {formViewStatus} name={user.firstName} email = {user.email} role = {user.role} parentEmail={user.parentEmail} htno = {user.htno} phoneNo={user.phoneNo} id = {user._id} departments = {user.departments} viewForm  = {viewFormSet }  departmentListFetch= { departmentListFetch}  sectionListFetch ={sectionListFetch} />)} </>))}
 </div>
}

{
  isloading && <Loading/>
}
  </div> </>
  )
}
