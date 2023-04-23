import React, { useEffect, useState } from "react";
// import { AddPermision } from "../user/helper/permissioncalls";
// import toast, { Toaster } from 'react-hot-toast';
// import { Navigate } from "react-router-dom";
import { isAuthenticated, postData } from "@/util/apicalls";

export default function PermssionForm(props) {
  const [values, setValues] = useState({
    subject: "",
    fromDate: null,
    toDate: null,
    description: null,
    error: "",
    loading: false,
    email: null,
  });
const [userData,setUserData] = useState(null)
  const { subject, fromDate, toDate, description, email } = values;
 useEffect(() => {
setUserData(isAuthenticated().user)
 }, []);

  const onSubmitForm = (el) => {
    el.preventDefault();
    // let userData =  JSON.parse(data)
    setValues({ ...values, error: "" , email:userData.email, loading: true });
console.log(values)
const pushingData = async()=>{
const data =  await  postData("/addleave",{ subject, fromDate, toDate, description, email },isAuthenticated().token)
if(data){
 props.closeForm(true)
}
}   
pushingData()
  };
  const inputHandler = (name) => (el) => {


//     let userData =  JSON.parse(data)
// if(userData["user"]["email"] == null){
//   return <Navigate to="/"  replace={true}/>
// }
// else{
    setValues({ ...values, [name]: el.target.value, email:userData.email, error: "" });
    console.log(values);
    // console.log(data["token"]);
  };
function FormPer () {
  return (
    <>
     <div className=" h-[100%]  w-[100%] absolute flex justify-center items-center  flex-col  " >
          <div className=" h-[100vh] w-[100%] backdrop-blur-[2px] cursor-pointer  absolute " onClick={()=>{props.closeForm(true)}} >  
          
          </div>
          <div className="flex gap-[130px] items-center  " >
          </div>
      <form
        
        onSubmit={ onSubmitForm}
        // className=" w-[450px] my-14 h-[145vh] bg-[white] rounded-[20px] px-[60px] py-[40px]"
        className="md:w-[371px]  pt-6   w-[351px] h-[650px] bg-[#1A1E23]  border-secoundblack drop-shadow-md border-[5px] shadow-md rounded-[35px] drop-shadow-sm shadow-md rounded-[35px] drop-shadow-sm px-[2rem]  flex flex-col gap-[15px] "
      >
        <div className="flex gap-6 items-center ">
          <div className="bg-[#E0FEE9] w-[35px] h-[35px] rounded-[30px]  flex justify-center items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="26"
              height="26"
              viewBox="0 0 26 26"
            >
              <circle
                id="Ellipse_7"
                data-name="Ellipse 7"
                cx="13"
                cy="13"
                r="13"
                fill="#e0fee9"
              />
              <g
                id="Group_17"
                data-name="Group 17"
                transform="translate(2 3.462)"
              >
                <path
                  id="Path_37"
                  data-name="Path 37"
                  d="M0,0H23.355V19.9H0Z"
                  fill="none"
                />
                <rect
                  id="Rectangle_35"
                  data-name="Rectangle 35"
                  width="17.008"
                  height="11.82"
                  rx="3"
                  transform="translate(3 4)"
                  fill="none"
                  stroke="#5ada7f"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                />
                <circle
                  id="Ellipse_6"
                  data-name="Ellipse 6"
                  cx="2"
                  cy="2"
                  r="2"
                  transform="translate(6.33 5.933)"
                  fill="none"
                  stroke="#5ada7f"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                />
                <line
                  id="Line_8"
                  data-name="Line 8"
                  x2="2"
                  transform="translate(14.693 6.937)"
                  fill="none"
                  stroke="#5ada7f"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                />
                <line
                  id="Line_9"
                  data-name="Line 9"
                  x2="2"
                  transform="translate(14.693 9.91)"
                  fill="none"
                  stroke="#5ada7f"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                />
                <line
                  id="Line_10"
                  data-name="Line 10"
                  x2="10"
                  transform="translate(6.49 12.884)"
                  fill="none"
                  stroke="#5ada7f"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                />
              </g>
            </svg>
          </div>
          <h2 className="font-bold text-[1.2rem] text-white m-0">Permission</h2>
        </div>
        <p className="text-[#A6ABAF] font-[Avenirregular]">
          Add your permission request — Get the permission faster than the leave
          letter{" "}
        </p>
        <hr className="text-[#D5D8D9] m-0"></hr>
        <p className="py-[1px] text-sm font-bold m-0 text-lightwg">Subject</p>
        <input
          type="text"
          className="py-1.5 pl-7 pr-20 border-[1.5px]  border-lightblack  bg-secoundblack   rounded-md   text-white"
          placeholder="Ex: Hackathon"
          onChange={inputHandler("subject")}
          // value={subject}
        />
        <p className="mt-1 text-sm peer-invalid:visible text-red-700 text-lightwg m-0">From</p>
        <input
          type="date"
          className=" border-[1.5px] p-3  h-[40px] w-[300px]  border-lightblack  bg-secoundblack   rounded-md   text-white "
          placeholder="Leave from"
          onChange={inputHandler("fromDate")}
          // value={fromDate}
        />
        <p className="mt-1 text-sm text-lightwg m-0"> To</p>
        <input
          type="date"
          className=" border-[1.5px] p-3  h-[40px] w-[300px]  border-lightblack  bg-secoundblack   rounded-md   text-white "
          placeholder=""
          onChange={inputHandler("toDate")}
          // value={toDate}
        />
        <p className="mt-1 text-sm text-lightwg m-0"> Description</p>
        <textarea
          row="5"
          cols="900"
          className="  border-[1.5px] p-3 border-lightblack  bg-secoundblack   rounded-md   text-white"
          onChange={inputHandler("description")}
          // value={description}
        ></textarea>
        <button
          type="submit"
          className=" px-5 py-1  my-5 rounded-[15px] bg-primarycolor text-[white] "
          // onClick={()=>{props.closeForm(true)}}
        >
          Submit
        </button>
      </form>
      </div>
    </>
  );
}
return(
 <>
{FormPer()}

 </>
)
}
