import { useState, useEffect } from "react"
import { postDataForm ,isAuthenticated } from "@/util/apicalls"
import { useRouter } from "next/router";
import Header from "@/components/header";
import Loading from "@/components/loading";
var FormData = require("form-data");

 function Add() {
    let i = null;
    const router = useRouter()
    const [homeworkInfo,setHomeWorkInfo] = useState({
            "department": router.query.department,
            "section": router.query.section
        });
    const [dep, setdep] = useState(0);
//     const [departmentSection,setDepartmentSection] = useState({
//     "department": router.query.department,
//     "section": router.query.section
// })
   
   const {department,section}  =  router.query
    const [img,setImg] = useState(null)
    const [user, setUser] = useState(null);
    const [isloading,setloading]= useState(false)
    function activeSelect (option ,status){
        if(status == option){
            return true
        }
        else{
            return false
        }
          }

    useEffect(() => {
    //    async function datafetch(){
    // //     let data = await postData("/getalluserforattendance", 
    // //     {  "department":router.query.department,
    // //     "section":router.query.section},
    // //  );

    //     }
    //     datafetch()

   
     if(!isAuthenticated()){
      router.push("/login")
     }

     if(isAuthenticated()){
      if(isAuthenticated().user.role != "lecturer"){
      router.push("/")
     }
    }

    if(router.query.department == undefined && router.query.section == undefined){
      router.query.department = isAuthenticated().user.departments[0].department._id
      router.query.section = isAuthenticated().user.departments[0].section[0]._id
      router.push(router)
     }
        setUser(isAuthenticated().user);
    }, [router]);
    let bodyFormData = new FormData();
    const handleInput = (name) => (el)=>{
        if(name == "department"){
            const splitData = el.target.value.split(',');
            router.query.department = splitData[0];
            router.query.section = splitData[2]
            router.push(router);
            setHomeWorkInfo({...homeworkInfo,[name]: splitData[0], "section":splitData[2]})
            console.log("depp"+el.target.value)
        }
        else if(name == "section"){
            router.query.section = el.target.value;
            setHomeWorkInfo({...homeworkInfo,[name]:el.target.value})
            router.push(router);
        }
        if(name =="lectureworkFile"){
            setImg(el.target.files[0])
        }
        else{
setHomeWorkInfo({...homeworkInfo,[name]:el.target.value, "department": router.query.department,
"section": router.query.section, "lectureId":user._id})
bodyFormData.append(name, el.target.value);
        }
console.log(homeworkInfo)
    }
    const handleSubmit = async (el) =>{
        el.preventDefault();
        setloading(true);
        bodyFormData.append("data", JSON.stringify(homeworkInfo));
        bodyFormData.append("lectureworkFile", img); 
     const data =  await  postDataForm("/addhomeworklecture", bodyFormData,isAuthenticated().token)
     if(data){
      setloading(false)
     }
     console.log(data)
    }
  return (
    <>
<Header/>
    <div className="h-[90vh] flex flex-col justify-center items-center ">
      
    { !isloading  &&<form
          className="w-[35rem] m-auto  h-[70vh] m-auto bg-secoundblack  p-[1rem] border-[rgba(246,247,249,.05)]  border-[2px]  rounded-lg"
          onSubmit={handleSubmit}
          encType="multipart/form-data"
        >

<h2 className="text-lightwg mb-3"> Homework Add</h2>
<p className="text-lightwg m-1">Department</p>
<div className=" flex items-center gap-7  ">

        <select
          name=""
          id=""
          className="block w-full rounded-md border-lightblack border-[2px]  py-1.5 pl-7 pr-20  text-white text-lightblack-900 ring-1 ring-inset ring-lightblack-300 placeholder:text-gray-400 focus:ring-2 bg-secoundblack focus:ring-inset focus:ring-lightblack-600 border-lightblack sm:text-sm sm:leading-6  mb-6"
          onChange={handleInput("department")}
        >
         
      {   router.query.department == undefined?  <option selected>department ...</option>:""}
         
          {user &&
            user.departments.map((data) => {
              return (
                <option
                  value={`${data.department._id},${i++},${data.section[0]._id},${data.section[0].section},${data.department.department}`}
                  key={data.department._id} 
                  selected={activeSelect(data.department._id,router.query.department)}
                >
                  {data.department.department}
                </option>
              );
            })}
        </select>
        <select
          className="block w-full rounded-md border-lightblack border-[2px]  py-1.5 pl-7 pr-20  text-white text-lightblack-900 ring-1 ring-inset ring-lightblack-300 placeholder:text-gray-400 focus:ring-2 bg-secoundblack focus:ring-inset focus:ring-lightblack-600 border-lightblack sm:text-sm sm:leading-6  mb-6 "
          onChange={handleInput("section")}
        >
         
          {user &&
            user.departments[dep].section.map((data) => {
          return(    <option value={`${data._id}`}
          selected={activeSelect(data._id,router.query.section)}
               key={data.section._id} >
                {data.section}
              </option> )
})}
        </select>
        </div>
        <p className="text-lightwg m-1">Title name</p>
               <input 
            type="text"
            class="block w-full rounded-md border-lightblack border-[2px]  py-1.5 pl-7 pr-20  text-white text-lightblack-900 ring-1 ring-inset ring-lightblack-300 placeholder:text-gray-400 focus:ring-2 bg-secoundblack focus:ring-inset focus:ring-lightblack-600 border-lightblack sm:text-sm sm:leading-6  mb-6"
            placeholder="Subject"
            onChange={handleInput("title")}
            // value={firstName}
    
          />
<p className="text-lightwg m-1">Description</p>
                <input 
            type="text"
            class="block w-full rounded-md border-lightblack border-[2px]  py-1.5 pl-7 pr-20  text-white text-lightblack-900 ring-1 ring-inset ring-lightblack-300 placeholder:text-gray-400 focus:ring-2 bg-secoundblack focus:ring-inset focus:ring-lightblack-600 border-lightblack sm:text-sm sm:leading-6  mb-6"
            placeholder="Description"
            onChange={handleInput("description")}
            // value={firstName}
          />
          <input
            type="date"
            class="block w-full rounded-md border-lightblack border-[2px]  py-1.5 pl-7 pr-20  text-white text-lightblack-900 ring-1 ring-inset ring-lightblack-300 placeholder:text-gray-400 focus:ring-2 bg-secoundblack focus:ring-inset focus:ring-lightblack-600 border-lightblack sm:text-sm sm:leading-6  mb-6"
            placeholder="date"
            onChange={handleInput("submissionDate")}
            // value={lastName}
          />
           <label for="" className="text-lightwg mx-2 text-sm m-0">
            Note: Enter Last Date for submitting
          </label>
 {/* <input
            type="Number"
            class="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6  my-4"
            placeholder="Out of Marks"
            
            // onChange={handleInput("outOfMarks")}
            // value={lastName}
          /> */}
<input    class="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6  my-3"
   type="file" onChange={handleInput("lectureworkFile")}/>
  
  <button
            className="block w-full bg-primarycolor rounded-md border-0 py-1.5 pl-7 pr-20  my-4 bg-indigo-600 text-white "
            type="submit"
          >
            Submit
          </button>
          </form>
 }
 {
  isloading && <Loading/>
 }
          </div>
    </>
  )
}

export default Add