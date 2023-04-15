import { useState } from "react"
import { postDataForm } from "@/util/apicalls"
var FormData = require("form-data");

 function Add() {
    const [homeworkInfo,setHomeWorkInfo] = useState(null);
    const [img,setImg] = useState(null)
    let bodyFormData = new FormData();
    const handleInput = (name) => (el)=>{
        if(name =="lectureworkFile"){
            setImg(el.target.files[0])
        }
        else{
setHomeWorkInfo({...homeworkInfo,[name]:el.target.value})
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
          enctype="multipart/form-data"
        >
<h2>Homework Add</h2>
               <input 
            type="text"
            class="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6  my-4"
            placeholder="Subject"
            onChange={handleInput("subject")}
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