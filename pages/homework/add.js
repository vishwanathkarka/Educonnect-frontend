import { useState, useEffect } from "react"
import { postDataForm ,isAuthenticated } from "@/util/apicalls"
import { useRouter } from "next/router";
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
        setUser(isAuthenticated().user);
    }, []);
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
"section": router.query.section})
bodyFormData.append(name, el.target.value);
        }
console.log(homeworkInfo)
    }
    const handleSubmit = async (el) =>{
        el.preventDefault();
        bodyFormData.append("data", JSON.stringify(homeworkInfo));
        bodyFormData.append("lectureworkFile", img); 
     const data =  await  postDataForm("/addhomeworklecture", bodyFormData)
     console.log(data)
    }
  return (
    <>
      <form
          className="w-[35rem]  h-[90vh] m-auto bg-white p-[1rem]"
          onSubmit={handleSubmit}
          encType="multipart/form-data"
        >

<h2>Homework Add</h2>
<div className=" flex items-center gap-7  ">
        <select
          name=""
          id=""
          className="block  rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6  mt-4"
          onChange={handleInput("department")}
        >
      {   router.query.department == undefined?  <option selected>department ...</option>:""}
          {}
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
          className="block rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 mt-4 "
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
               <input 
            type="text"
            class="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6  my-4"
            placeholder="Subject"
            onChange={handleInput("title")}
            // value={firstName}
    
          />

                <input 
            type="text"
            class="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6  my-4"
            placeholder="Description"
            onChange={handleInput("description")}
            // value={firstName}
          />
          <input
            type="date"
            class="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6  my-1"
            placeholder="date"
            onChange={handleInput("submissionDate")}
            // value={lastName}
          />
           <label for="" className="text-slate-500 mx-2 text-sm">
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
            className="block w-full bg-primary rounded-md border-0 py-1.5 pl-7 pr-20  my-4 bg-indigo-600 text-white "
            type="submit"
          >
            Submit
          </button>
          </form>
    </>
  )
}

export default Add