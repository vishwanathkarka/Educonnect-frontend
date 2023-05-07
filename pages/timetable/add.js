import { useEffect,useState } from "react";
import { getData,isAuthenticated,postData } from "@/util/apicalls"; 
import Header from "@/components/header";
 function Add() {
    const [departmentListFetch, setDepartmentListFetch] = useState();
    const [sectionListFetch, setSectionListFetch] = useState(null);
    const [userEnteredData,setUserEnteredData] = useState({department:"",section:"",period:"",day:""});
    const {department,section,period,day} = userEnteredData;
    useEffect(() => {
        async function fetchDepartment() {
          // fetching the department from api
    
          let departmentlistobj = await getData("/listdepartment",isAuthenticated().token);
          let departmentlist = departmentlistobj;
          console.log(")))))))))" + departmentlist);
          if (departmentlist.success == true) {
            setDepartmentListFetch(departmentlist.listOfDepartment);
            console.log("^^^^^^^^" + departmentlist);
          }
        
        }
        fetchDepartment();
        async function fetchSection() {
       
          // fetching the department from api
          let sectionlist = await getData("/listsection",isAuthenticated().token);
          if (sectionlist.success == true) {
            setSectionListFetch(sectionlist.listOfSection);
            
          }
        
        }
    
        fetchSection();
      }, []);

      const handleInput = (name) =>(el) => {
setUserEnteredData({...userEnteredData,[name]:el.target.value});
console.log(userEnteredData)
console.log(el.target.value)
      }

      const handleSubmit = (el) =>{
        el.preventDefault();
        const data = {"department":department,"section":section,"period":period};
        data[day] = true;
const uploadingTimeTable =  postData("/addtimetable",data,isAuthenticated().token)
console.log(uploadingTimeTable)
      }

  return (
 <>
<Header/>
<div className=" flex  justify-center mt-6 h-[90vh] align-middle  bg-slate-50">
        <form
          className="w-[35rem] rounded   m-auto bg-secoundblack p-[1rem]"
          onSubmit={handleSubmit}
          enctype="multipart/form-data"
        >

          <h2 className="text-center text-white text-[1.5rem]">Add Time Table</h2>
          <input
            type="text"
            class="block w-full rounded-md border-lightblack border-[2px]  py-1.5 pl-7 pr-20  text-white text-lightblack-900 ring-1 ring-inset ring-lightblack-300 placeholder:text-gray-400 focus:ring-2 bg-secoundblack focus:ring-inset focus:ring-lightblack-600 border-lightblack sm:text-sm sm:leading-6  mb-6"
            placeholder="Subject"
            onChange={handleInput("subjectName")}
            // value={firstName}

          />


          <input
            type="Number"
            class="block w-full rounded-md border-lightblack border-[2px]  py-1.5 pl-7 pr-20  text-white text-lightblack-900 ring-1 ring-inset ring-lightblack-300 placeholder:text-gray-400 focus:ring-2 bg-secoundblack focus:ring-inset focus:ring-lightblack-600 border-lightblack sm:text-sm sm:leading-6  mb-6"
            placeholder="Period No"
            onChange={handleInput("period")}
            // value={firstName}

          />

<select
            className="block w-full rounded-md border-lightblack border-[2px]  py-1.5 pl-7 pr-20  text-white text-lightblack-900 ring-1 ring-inset ring-lightblack-300 placeholder:text-gray-400 focus:ring-2 bg-secoundblack focus:ring-inset focus:ring-lightblack-600 border-lightblack sm:text-sm sm:leading-6  mb-6"
            id="day"
            onChange={handleInput("day")}
            // value={role}
          >
            <option selected>Day</option>
            <option value="monday">Monday</option>
            <option value="tuesday">Tuesday</option>
            <option value="wednesday">Wednesday</option>
            <option value="thursday">Thursday</option>
            <option value="friday">Friday</option>
            <option value="saturday">Saturday</option>

          </select>
         
          <select
            className="block w-full rounded-md border-lightblack border-[2px]  py-1.5 pl-7 pr-20  text-white text-lightblack-900 ring-1 ring-inset ring-lightblack-300 placeholder:text-gray-400 focus:ring-2 bg-secoundblack focus:ring-inset focus:ring-lightblack-600 border-lightblack sm:text-sm sm:leading-6  mb-6"
            id="Department"
            onChange={handleInput("department")}
            // value={departments} 
            // disabled= {role == "parent"?true:false}
          >
            <option selected>Choose Department ...</option>
           
            {departmentListFetch &&
              departmentListFetch.map((data) => (
                <option value={data._id} key={data._id}>
                  {data.department}
                </option>
              ))}
          </select>
          <select
            className="block w-full rounded-md border-lightblack border-[2px]  py-1.5 pl-7 pr-20  text-white text-lightblack-900 ring-1 ring-inset ring-lightblack-300 placeholder:text-gray-400 focus:ring-2 bg-secoundblack focus:ring-inset focus:ring-lightblack-600 border-lightblack sm:text-sm sm:leading-6  mb-6"
            id="section" 
            onChange={handleInput("section")}
            // value={sections}
          >
            <option selected>Choose Section ...</option>

            {sectionListFetch &&
              sectionListFetch.map((data) => (
                <option value={data._id} key={data._id}>
                  {data.section}
                </option>
              ))}
          </select>

          <button
            className="block w-full bg-primarycolor rounded-md border-0 py-1.5 pl-7 pr-20  my-4 bg-indigo-600 text-white "
            type="submit"
          >
          
            Submit
          </button>
        </form>
      </div>

 </>
  )
}

export default Add