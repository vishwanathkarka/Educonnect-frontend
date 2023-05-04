import { useEffect,useState } from "react";
import { getData, isAuthenticated, updateData } from "@/util/apicalls";
import { useRouter } from 'next/router'
import Image from "next/image";
import Header from "@/components/header";
function FormPer (props) {
  if(!isAuthenticated()){
    router.push("/")
  }
  if(isAuthenticated().user.role != "Admin"){
    router.push("/")
   }
   const  [viewDep,setViewDep] = useState(false);
   const  [viewSec,setViewSec] = useState(false);
   const [departmentSelected, setDepartmentSelected] = useState(null)
   const [userData,setUserData] = useState({"role":props.role,"firstname":props.name, "email":props.email,"htno":props.htno,"parentEmail":props.parentEmail,"phoneNo":props.phoneNo,"role":props.role,"departments":props.departments})
   const {firstname,email,htno,parentEmail,phoneNo,role,departments} = userData
   const inputHandler = (name) => (el)=>{
setUserData({...userData,[name]:el.target.value})
console.log(userData)
   }
   console.log("9900"+departmentSelected);
   const onSubmitForm = async(el)=>{
el.preventDefault(); 
 const data = await updateData(`/updateuserdata/${props.id}`,userData)
 console.log(data)
   }
   function activeSelect (option ,status){
    if(status == option){
        return true
    }
    else{
        return false
    }
      }
   return (
      <>
       <div className=" min-h-[100%]  w-[120%] absolute flex justify-center items-center  flex-col top-[5rem] " >
            <div className=" h-[100vh] w-[100%] backdrop-blur-[2px] cursor-pointer  absolute " onClick={()=>{props.closeForm(true)}} >
            </div>
            <div className="flex gap-[130px] items-center " >
            </div>
        <form
          
          onSubmit={onSubmitForm}
          // className=" w-[450px] my-14 h-[145vh] bg-[white] rounded-[20px] px-[60px] py-[40px]"
          className="md:w-[371px]  pt-6   w-[351px] min-h-[850px] bg-[#1A1E23]  border-secoundblack drop-shadow-md border-[5px] shadow-md rounded-[35px] drop-shadow-sm shadow-md rounded-[35px] drop-shadow-sm px-[2rem]  flex flex-col gap-[15px] "
        >
          <div className="flex gap-6 items-center m-0 ">
          
            <h2 className="font-bold text-[1.2rem] text-white m-0">Permission</h2>
          </div>
          <p className="text-[#A6ABAF] font-[Avenirregular]">
            Editing the role to the person
           
          </p>
          <hr className="text-[#D5D8D9] m-0"></hr>
          <p className="py-[1px] text-sm font-bold m-0 text-lightwg">First Name </p>
          <input
            type="text"
            className="py-1.5 pl-7 pr-20 border-[1.5px]  border-lightblack  bg-secoundblack   rounded-md   text-white"
            placeholder="Name"
            onChange={inputHandler("firstname")}
            value={firstname}
          />
          <p className="mt-1 text-sm peer-invalid:visible text-red-700 text-lightwg m-0">Email</p>
          <input
            type="text"
            className=" border-[1.5px] p-3  h-[40px] w-[300px]  border-lightblack  bg-secoundblack   rounded-md   text-white "
            placeholder="Email"
            disabled="true"
            // onChange={inputHandler("fromDate")}
            value={email}
          />
          <p className="mt-1 text-sm text-lightwg m-0"> Htno</p>
          <input
            type="text"
            className=" border-[1.5px] p-3  h-[40px] w-[300px]  border-lightblack  bg-secoundblack   rounded-md   text-white "
            placeholder="Htno"
            onChange={inputHandler("htno")}
            value={htno}
          />
          <p className="mt-1 text-sm text-lightwg m-0">Parent Email</p>
          <input
            type="text"
            className=" border-[1.5px] p-3  h-[40px] w-[300px]  border-lightblack  bg-secoundblack   rounded-md   text-white "
            placeholder="ParentEmail"
            onChange={inputHandler("parentEmail")}
            value={parentEmail}
          />
          
          <p className="mt-1 text-sm text-lightwg m-0">Phone No</p>
          <input
            type="text"
            className=" border-[1.5px] p-3  h-[40px] w-[300px]  border-lightblack  bg-secoundblack   rounded-md   text-white "
            placeholder="Phone No"
            onChange={inputHandler("phoneNo")}
            value={phoneNo}
          />
          <select
            className="block w-full rounded-md border-0 py-2 pl-7 pr-20 text-gray-900 text-lightwg ring-1 bg-secoundblack ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 my-4"
            id="role"
            onChange={inputHandler("role")}
            value={role}
          >
            <option selected>Choose Role ...</option>
            <option value="student">student</option>
            <option value="parent">parent</option>
            <option value="lecturer">Lecturer</option>
          </select>

<div className=" m-0">
{departments && departments.map((dep,index)=>(<> 
<ul className="flex flex-wrap">
  <li  className="text-white m-0 flex gap-3 items-center"> <p>{dep.department.department}</p>
<svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-pencil cursor-pointer" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round" onClick={()=>{setViewDep(!viewDep),setDepartmentSelected(dep._id)}}>
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <path d="M4 20h4l10.5 -10.5a1.5 1.5 0 0 0 -4 -4l-10.5 10.5v4" />
  <line x1="13.5" y1="6.5" x2="17.5" y2="10.5" />
</svg>
<svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-trash cursor-pointer" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ff4500" fill="none" stroke-linecap="round" stroke-linejoin="round" onClick={()=>departments.splice(index, 1)}>
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <line x1="4" y1="7" x2="20" y2="7" />
  <line x1="10" y1="11" x2="10" y2="17" />
  <line x1="14" y1="11" x2="14" y2="17" />
  <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
  <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
</svg>
<ul>
   { dep.section.map((sec,indx)=>(<> <li className="flex gap-3"><p>{sec.section}</p>
   <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-pencil cursor-pointer" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round" onClick={()=>{setViewSec(true)}}>
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <path d="M4 20h4l10.5 -10.5a1.5 1.5 0 0 0 -4 -4l-10.5 10.5v4" />
  <line x1="13.5" y1="6.5" x2="17.5" y2="10.5" />
</svg>

<svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-trash cursor-pointer" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ff4500" fill="none" stroke-linecap="round" stroke-linejoin="round" onClick={()=>departments[index].section.splice(indx, 1)}>
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <line x1="4" y1="7" x2="20" y2="7" />
  <line x1="10" y1="11" x2="10" y2="17" />
  <line x1="14" y1="11" x2="14" y2="17" />
  <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
  <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
</svg>


</li>
{viewSec &&  <select
  className="block w-full rounded-md border-0 bg-secoundblack text-white py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 my-4"
  id="section" 
  // onChange={departments[index].section.splice(indx,1,{section:})}
>

{ props.sectionListFetch.map((data) => (
      <option value={data._id}
    //  selected = {activeSelect(data._id,departmentSelected)}
    selected = {data._id == sec._id ?true:false}

      key={data._id}>
          {console.log(data._id)}
        {data.section}
      </option>
    ))}
    </select>
}
</>

))}
</ul>
</li></ul>
{viewDep &&  <select
            className="block w-full rounded-md border-0 bg-secoundblack text-white py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 my-4"
            id="section" 
            // onChange={handleInput("section")}
          >
          
          { props.departmentListFetch.map((data) => (
                <option value={data._id}
              //  selected = {activeSelect(data._id,departmentSelected)}
              selected = {data._id == dep.department._id ?true:false}

                key={data._id}>
                    {console.log(data._id)}
                  {data.department}
                </option>
              ))}
              </select>
}


</>))
}
</div>



          <button
            type="submit"
            className=" px-2 py-1   my-2 rounded-[15px] bg-primarycolor text-[white] "
            // onClick={()=>{props.closeForm(true)}}
          >
            Submit
          </button>
        </form>
        </div>
      </>
    );
  }

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
    const formViewStatus = () =>{
setViewForm(!viewForm);
    }
    useEffect(() => {
        async function fetchDepartment() {
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
            const data = await getData(`/getusersforadmin/${router.query.department}/${router.query.section}/${router.query.role}`)
            setUserInfo(data)
            
            }
            userData()
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
<div className="flex">
  { userInfo && userInfo.user.map(user => (<> <AdminCard key={user._id} photo ={user.photo.secure_url} name ={user.firstName}  closeForm = {formViewStatus}  />  {viewForm && (<FormPer  closeForm = {formViewStatus} name={user.firstName} email = {user.email} role = {user.role} parentEmail={user.parentEmail} htno = {user.htno} phoneNo={user.phoneNo} id = {user._id} departments = {user.departments}  departmentListFetch= { departmentListFetch}  sectionListFetch ={sectionListFetch} />)} </>))}
  </div>
  </div> </>
  )
}
