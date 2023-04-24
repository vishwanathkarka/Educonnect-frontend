import { useRouter } from 'next/router'
import Image from 'next/image';
import {getData,isAuthenticated,postData} from "../../../util/apicalls"
import { useEffect, useState } from 'react';
import Header from '@/components/header';
 function AddSitting() {
    const router = useRouter()
    const [userData,setUserData] = useState(null)
    const [departments,setDepartments] = useState()
    const [marksDetail,setMarkDetail] = useState(null);
    console.log(router.query.user)
    useEffect( () => {
       async function fetchdata (){
  let data = await getData(`/getuserinfowithid/${router.query.user}`)
 setUserData(data)
 console.log(data)
 setDepartments(isAuthenticated().user.departments)
 console.log(isAuthenticated().user.departments)
        }
        router.query.user &&   fetchdata()
    }, [router.query.user]);

    function activeSelect (option ,status){
        if(status == option){
            return true
        }
        else{
            return false
        }
          } 

          const handleInput = (name) =>(el)=>{
setMarkDetail({...marksDetail, [name]:el.target.value});
console.log(marksDetail);
          }

    //       "outOfMarks":50,
    // "subject":"web devlopment",
    // "studentMarks":50,
    // "userId":"63e12e165aae5db72f8f4afb"
    const handleSubmit = async (el) => {
            el.preventDefault();
postData("/addResult",{"subject":marksDetail.subject,"outOfMarks":marksDetail.outOfMarks,"studentMarks":marksDetail.studentMarks,"userId":router.query.user,"lectureId":isAuthenticated().user._id},isAuthenticated().token)
          }
  return (
    <>
    <Header/>
    <div className='h-[90vh] flex justify-center items-center'> 
     <form
          className="w-[35rem]  h-[50vh] m-auto bg-secoundblack rounded-xl p-[1rem]"
          onSubmit={handleSubmit}
          enctype="multipart/form-data"
        >

       {/* <select
       className="block rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 my-4"
    //    onChange={inputHandle("section")}
     >
        {
departments&& departments.map((data) => {
              return (
                <option
                  value={``}
                  key={data.department._id} 
                //   selected={activeSelect(data.department._id,router.query.department)}
                >
                  {data.department.department}
                </option>
              );
            })}
            </select> */}
          {/* <h2 className="text-center ">Add Fee </h2> */}
        { userData?<div className=''> <Image src ={userData.user.photo.secure_url} className='rounded-[50%] m-auto  border-lightwg border-[2px]' width={100} height={100}></Image> </div> :''}
       { userData&& <p className='text-center text-white mt-2'>{userData.user.firstName +" " + userData.user.lastName }</p> }
       { userData&& <p className='text-center text-white mt-2'>{userData.user.departments[0].department.department}</p> }
          <input 
            type="text"
            class="block w-full py-1.5 pl-7 pr-20 border-[1.5px] my-3  border-lightblack my-2  bg-secoundblack   rounded-md   text-white"
            placeholder="Subject"
            onChange={handleInput("subject")}
            // value={firstName}
    
          />
          <input
            type="Number"
            class="block w-full py-1.5 pl-7 pr-20 border-[1.5px] my-3  border-lightblack my-2  bg-secoundblack   rounded-md   text-white"
            placeholder="Student Marks"
            onChange={handleInput("studentMarks")}
            // value={lastName}
          />
 <input
            type="Number"
            class=""
            placeholder="Out of Marks"
            className='block w-full py-1.5 pl-7 pr-20 border-[1.5px] my-3  border-lightblack my-2  bg-secoundblack   rounded-md   text-white'
            onChange={handleInput("outOfMarks")}
            // value={lastName}
          />

  
  <button
            className="block w-full bg-primarycolor rounded-md border-0 py-1.5 pl-7 pr-20  my-4 bg-indigo-600 text-white "
            type="submit"
          >
           
            {" "}
            Submit
          </button>
          </form>
          </div>
    </>

  )
}

export default AddSitting;