
import React, { useState,useEffect } from "react";
import moment from "moment";
// import { DelPermission } from "./helper/permissioncalls";
import { isAuthenticated,updateData,deleteData } from "../util/apicalls";
// import { EditPermission } from "./helper/permissioncalls";
import PermssionForm from "../components/permissionForm";
// import {AcceptRequest,Userinfo} from "./helper/permissioncalls"
export default function PermssionCard(props) {
  console.log("ROOLLLL"+isAuthenticated().user.role)
  let [isApp, setIsApp] = useState(props.isApproved);
  let[workAdmin,setWorkAdmin]= useState(false)
  let [Userinf,setUserinfo] = useState({})
  const [newRequest, setNewRequest] = useState(false);
  const [isView, setIsView] = useState(true);
  const [isEdited, setIsEdited] = useState(false);
  const [updatingStatus,setUpdateStaus] = useState({
    is_PermisssionGranted:null
  })
  
  console.log("props.isApproved"+props.isApproved)
  const DateDiff = () => {
    var date1 = moment(props.to);
    var date2 = moment(props.from);
    var days = date1.diff(date2, "days");
    return days;
  };

console.log("***())_(_)_"+props.isApproved )
console.log("gggg",(Userinf.userinfo !== undefined )?(Userinf.userinfo.photo.secure_url):"hello")
console.log(typeof Userinf);
// useEffect(() => {
//   AcceptRequest(props.id,isApp)
//   console.log(updatingStatus);
// },[isApp]);
console.log(props.userid)
console.log(updatingStatus)
console.log(props.isApproved)
const [values, setValues] = useState({
    subject: props.subject,
    fromDate: props.from,
    toDate: props.to,
    description: props.description,
  });
// useEffect(() => {
//   if(isAuthenticated().user.role == "lecturer"){
//     Userinfo(props.userid).then(res=> {setUserinfo(res)}).catch(err=> console.log(err))
//   }
  
//     },[])
  const { subject, fromDate, toDate, description, id, loading, email } = values;
  console.log(props.id);
console.log("999",Userinf)
  const inputHandler = (name) => (el) => {
    setValues({
      ...values,
      [name]: el.target.value,
      email: isAuthenticated().user.email,
    });
    console.log(values);
  };
  
  const onSubmitForm = (el) => {
    console.log(

      values,

    );

    updateData(
        `/updateleavestudent/${props.id}`,
        values,
       
      )

  };

  
  const IsPermissionApproved = (num) => {
    console.log("889900",num);
    if (num == 0) {
      return (
        <p className=" w-[100px] text-[#FFD43B] flex justify-center  items-center gap-1">
   <svg xmlns="http://www.w3.org/2000/svg" width="27" height="21" viewBox="0 0 27 21">
  <g id="Group_51" data-name="Group 51">
    <rect id="Rectangle_16" data-name="Rectangle 16" width="27" height="21" rx="8" fill="rgba(255,212,59,0.36)"/>
  </g>
  <path id="Icon_awesome-clock" data-name="Icon awesome-clock" d="M7.562.562c-3.866,0-7,2.21-7,4.938s3.133,4.937,7,4.937,7-2.21,7-4.937S11.428.562,7.562.562Zm1.611,6.97L6.684,6.257a.228.228,0,0,1-.138-.193V2.713c0-.131.152-.239.339-.239H8.239c.186,0,.339.108.339.239V5.454l1.792.92a.2.2,0,0,1,.073.334l-.8.772A.441.441,0,0,1,9.173,7.533Z" transform="translate(5.938 5)" fill="#ffd43b"/>
</svg>


          Pending
        </p>
      );
    } else if (num == 1) {
      return (
        <p
          className=" w-[100px] text-[rgb(0,128,0)] flex justify-center  items-center gap-1 " 
          onClick={() => { ;setIsApp(1);}}
          
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="27"
            height="21"
            viewBox="0 0 27 21"
          >
            <rect
              id="Rectangle_16"
              data-name="Rectangle 16"
              width="27"
              height="21"
              rx="8"
              fill="#85baad"
            />
            <path
              id="Icon_feather-check"
              data-name="Icon feather-check"
              d="M17.806,9,9.689,16.5,6,13.091"
              transform="translate(2.096 -2.25)"
              fill="none"
              stroke="#1a8e72"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="3"
            />
          </svg>
          Approved
        </p>
      );
    } else if (num == 2) {
      return (
        <p
          className=" w-[100px] text-[#EA8B9E] flex justify-center  items-center gap-1"
          onClick={() => {setIsApp(2);}}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="27"
            height="21"
            viewBox="0 0 27 21"
            onClick={() => console.log(isApp)}
          >
            <rect
              id="Rectangle_30"
              data-name="Rectangle 30"
              width="27"
              height="21"
              rx="8"
              fill="#e6bdc5"
            />
            <path
              id="Path_28"
              data-name="Path 28"
              d="M9.506,97.712a1.092,1.092,0,0,0,0-1.481.949.949,0,0,0-1.4,0L4.861,99.676l-3.25-3.442a.949.949,0,0,0-1.4,0,1.092,1.092,0,0,0,0,1.481l3.25,3.442L.217,104.6a1.092,1.092,0,0,0,0,1.481.949.949,0,0,0,1.4,0l3.247-3.445,3.25,3.442a.949.949,0,0,0,1.4,0,1.092,1.092,0,0,0,0-1.481l-3.25-3.442Z"
              transform="translate(8.639 -90.657)"
              fill="#ea8b9e"
            />
          </svg>
          Rejected
        </p>
      );
    }
  };

  function PermssionForm() {
  

    return (
      <div className=" h-[100%]  w-[100%] absolute flex justify-center items-center  flex-col top-0  ">
        <div
          className=" h-[100vh] w-[100%] bg-[#020202a7] cursor-pointer  absolute"
          onClick={() => setNewRequest(!newRequest)}
        >
          
        </div>
        <div className="flex gap-[130px] items-center  "></div>
        {/* <form
          action=""
          onSubmit= { onSubmitForm}
          // className=" w-[450px] my-14 h-[145vh] bg-[white] rounded-[20px] px-[60px] py-[40px]"
          className="md:w-[371px]  pt-6   w-[351px] h-[650px] bg-[white] shadow-md rounded-[35px] drop-shadow-sm px-[2rem]  flex flex-col gap-[15px] "
        >
          <div className="flex gap-6 items-center">
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
            <h2 className="font-bold text-[1.2rem]">Permission</h2>
          </div>
          <p className="text-[#A6ABAF] font-[Avenirregular]">
            Add your permission request — Get the permission faster than the
            leave letter{" "}
          </p>
          <hr className="text-[#D5D8D9]"></hr>
          <p className="py-[1px] text-sm font-bold ">Subject</p>
          <input
            type="text"
            className="border-solid border-[1.5px] text-[#AEB8D9] border-[#AEB8D9] h-[40px] w-[300px] rounded-md p-3 focus:ring-1   font-[Avenirregular]    focus:outline-none focus:border-[#4C5EE5] focus:ring-1 focus:ring-[#4C5EE5] disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none focus:ring-[#AEB8D9] focus-visible:ring-[#AEB8D9]  invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500 "
            placeholder="Ex: Hackathon"
            onChange={inputHandler("subject")}
            value={subject}
          />
          <p className="mt-1 text-sm peer-invalid:visible text-red-700">From</p>
          <input
            type="date"
            className="border-solid border-[1.5px]  h-[40px] border-[#AEB8D9]  text-[#AEB8D9]  w-[300px] rounded-md p-3 focus:ring-1   font-[Avenirregular]    focus:outline-none focus:border-[#4C5EE5] focus:ring-1 focus:ring-[#4C5EE5] disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none focus:ring-[#AEB8D9] focus-visible:ring-[#AEB8D9]  invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500 "
            placeholder="Leave from"
            onChange={inputHandler("fromDate")}
            value={fromDate}
          />
          <p className="mt-1 text-sm"> To</p>
          <input
            type="date"
            className="border-solid border-[1.5px]  h-[40px] border-[#AEB8D9]  text-[#AEB8D9]  w-[300px] rounded-md p-3 focus:ring-1   font-[Avenirregular]    focus:outline-none focus:border-[#4C5EE5] focus:ring-1 focus:ring-[#4C5EE5] disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none focus:ring-[#AEB8D9] focus-visible:ring-[#AEB8D9]  invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500 "
            placeholder=""
            onChange={inputHandler("toDate")}
            value={toDate}
          />
          <p className="mt-1 text-sm"> Description</p>
          <textarea
            row="5"
            cols="900"
            className=" border-[1.5px] border-[#AEB8D9] text-[#AEB8D9]   font-[Avenirregular] rounded-md p-3"
            onChange={inputHandler("description")}
            value={description}
          ></textarea>
          <button
            type="submit"
            className=" px-5 py-3  my-5 rounded-[15px] bg-primary text-[white] "
            onClick={
              setNewRequest(!newRequest)
             
            }
          >
            Submit
          </button>
        </form> */}
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
          value={subject}
        />
        <p className="mt-1 text-sm peer-invalid:visible text-red-700 text-lightwg m-0">From</p>
        <input
          type="date"
          className=" border-[1.5px] p-3  h-[40px] w-[300px]  border-lightblack  bg-secoundblack   rounded-md   text-white "
          placeholder="Leave from"
          onChange={inputHandler("fromDate")}
          value={fromDate}
        />
        <p className="mt-1 text-sm text-lightwg m-0"> To</p>
        <input
          type="date"
          className=" border-[1.5px] p-3  h-[40px] w-[300px]  border-lightblack  bg-secoundblack   rounded-md   text-white "
          placeholder=""
          onChange={inputHandler("toDate")}
          value={toDate}
        />
        <p className="mt-1 text-sm text-lightwg m-0"> Description</p>
        <textarea
          row="5"
          cols="900"
          className="  border-[1.5px] p-3 border-lightblack  bg-secoundblack   rounded-md   text-white"
          onChange={inputHandler("description")}
          value={description}
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
    );
  }
  function UserEditOption() {
    
    //   const IsPermissionApproved = (num)=> {
    //     if(num == 0){
    //       return
    //     }
    //     else if(num == 1){
    //       return  (
    //         <p className=" w-[100px] text-[green] flex justify-center  items-center gap-1">
    //         <svg xmlns="http://www.w3.org/2000/svg" width="27" height="21" viewBox="0 0 27 21">
    //   <rect id="Rectangle_16" data-name="Rectangle 16" width="27" height="21" rx="8" fill="#85baad"/>
    //   <path id="Icon_feather-check" data-name="Icon feather-check" d="M17.806,9,9.689,16.5,6,13.091" transform="translate(2.096 -2.25)" fill="none" stroke="#1a8e72" stroke-linecap="round" stroke-linejoin="round" stroke-width="3"/>
    // </svg>
    //           Approved
    //         </p>
    //       )
    //     }
    //     else{

    //     }
    //      }
    let role =   isAuthenticated().user.role 
    console.log("****"+role)
    function roleBasedUpdate(value){
if(role == "lecturer"){
    return {"isLectureApproved":value}
}
else if(role == "parent"){
    return {"isParentApproved":value}
}

    }
    // for admin to accept or Reject permission

    if (props.isApproved == 0) {
      if (role == "lecturer" || role =="parent") {

        return (
          <div className="flex gap-4 flex-wrap" > 
            <p className=" w-[100px] text-[green] flex justify-center  items-center gap-1 cursor-pointer" onClick={() => {setIsView(!isView);updateData(`/updateleave/${props.id}`,roleBasedUpdate(1),isAuthenticated().token)}}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="27"
                height="21"
                viewBox="0 0 27 21"
              >
                <rect
                  id="Rectangle_16"
                  data-name="Rectangle 16"
                  width="27"
                  height="21"
                  rx="8"
                  fill="#85baad"
                />
                <path
                  id="Icon_feather-check"
                  data-name="Icon feather-check"
                  d="M17.806,9,9.689,16.5,6,13.091"
                  transform="translate(2.096 -2.25)"
                  fill="none"
                  stroke="#1a8e72"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="3"
                />
              </svg>
              Approve
            </p>

            <p className=" w-[100px] text-[#EA8B9E] flex justify-center  items-center gap-1 cursor-pointer" onClick={() => {setIsView(!isView);updateData(`/updateleave/${props.id}`,roleBasedUpdate(2),isAuthenticated().token)}}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="27"
                height="21"
                viewBox="0 0 27 21"
              >
                <rect
                  id="Rectangle_30"
                  data-name="Rectangle 30"
                  width="27"
                  height="21"
                  rx="8"
                  fill="#e6bdc5"
                />
                <path
                  id="Path_28"
                  data-name="Path 28"
                  d="M9.506,97.712a1.092,1.092,0,0,0,0-1.481.949.949,0,0,0-1.4,0L4.861,99.676l-3.25-3.442a.949.949,0,0,0-1.4,0,1.092,1.092,0,0,0,0,1.481l3.25,3.442L.217,104.6a1.092,1.092,0,0,0,0,1.481.949.949,0,0,0,1.4,0l3.247-3.445,3.25,3.442a.949.949,0,0,0,1.4,0,1.092,1.092,0,0,0,0-1.481l-3.25-3.442Z"
                  transform="translate(8.639 -90.657)"
                  fill="#ea8b9e"
                />
              </svg>
              Reject
            </p>
          </div>
        );
      } 
       else {
        return (
          <div className="flex gap-9" >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="38"
              height="35"
              viewBox="0 0 38 35"
              onClick={() =>
{
                setIsView(!isView);
                deleteData(
                  `/deleteleave/${props.id}`,isAuthenticated().token
                )
              }
            }
              
            >
              {/* onClick={()=> DelPermission(props.id,isAuthenticated().user.email,isAuthenticated().token,isAuthenticated().user.role) */}
              <rect
                id="Rectangle_34"
                data-name="Rectangle 34"
                width="38"
                height="35"
                rx="11"
                fill="#cdd0d3"
              />
              <g
                id="Group_15"
                data-name="Group 15"
                transform="translate(6.829 5.261)"
              >
                <path
                  id="Path_34"
                  data-name="Path 34"
                  d="M0,0H24V24H0Z"
                  fill="none"
                />
                <line
                  id="Line_5"
                  data-name="Line 5"
                  x2="16"
                  transform="translate(4.172 6.739)"
                  fill="none"
                  stroke="#2c3e50"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                />
                <line
                  id="Line_6"
                  data-name="Line 6"
                  y2="6"
                  transform="translate(10.172 10.739)"
                  fill="none"
                  stroke="#2c3e50"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                />
                <line
                  id="Line_7"
                  data-name="Line 7"
                  y2="6"
                  transform="translate(14.172 10.739)"
                  fill="none"
                  stroke="#2c3e50"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                />
                <path
                  id="Path_35"
                  data-name="Path 35"
                  d="M5,7,6,19a2,2,0,0,0,2,2h8a2,2,0,0,0,2-2L19,7"
                  fill="none"
                  stroke="#2c3e50"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                />
                <path
                  id="Path_36"
                  data-name="Path 36"
                  d="M9,7V4a1,1,0,0,1,1-1h4a1,1,0,0,1,1,1V7"
                  transform="translate(0 -0.521)"
                  fill="none"
                  stroke="#2c3e50"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                />
              </g>
            </svg>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="38"
              height="35"
              viewBox="0 0 38 35"
              onClick={() => setNewRequest(true)}
            >
              <rect
                id="Rectangle_77"
                data-name="Rectangle 77"
                width="38"
                height="35"
                rx="11"
                fill="#cdd0d3"
              />
              <g id="Group_14" data-name="Group 14" transform="translate(7 4)">
                <path
                  id="Path_32"
                  data-name="Path 32"
                  d="M0,0H24V24H0Z"
                  fill="none"
                />
                <path
                  id="Path_33"
                  data-name="Path 33"
                  d="M4,20H8L18.5,9.5a2.828,2.828,0,0,0-4-4L4,16v4"
                  fill="none"
                  stroke="#2c3e50"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                />
                <line
                  id="Line_4"
                  data-name="Line 4"
                  x2="4"
                  y2="4"
                  transform="translate(13.5 6.5)"
                  fill="none"
                  stroke="#2c3e50"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                />
              </g>
            </svg>
          </div>
        );
      }
    }
  }
  const [buttonActive, setButtonActive] = useState(true);
  console.log(buttonActive);
  function ViewBox() {

    return (
      <>
        
        <div className="flex flex-wrap md:flex-row justify-center md:justify-between text-[#000000] text-center  md:px-[5rem]  items-center  my-2">
          {props.isAdmin ? (
            <div className="flex gap-5">
              {" "}
          {isAuthenticated().user.role == "lecturer" ? <div> <img
                src={(props.img !== undefined )?(props.img):"https://visualpharm.com/assets/387/Person-595b40b75ba036ed117da139.svg"}
                alt=""
                width={50}
                height={70}
                className="rounded-[1rem] border-lightwg border-[1px] drop-shadow-md "
                srcset=""
              /> </div>:""}
              <div className="flex flex-col gap-2">
                {" "}
                <p className="text-white text-lg m-0">{(props.name !== undefined )?(props.name):"....."}</p>{" "}
                <p className="text-[#606F7B] font-[Avenirregular] m-0"> {(props.htno !== undefined )?(props.htno):"....."}</p>{" "}
              </div>{" "}
            </div>
          ) : (
            " "
          )}
          <p className=" w-[100%] md:w-[200px] text-[#717377] text-center">{props.subject}</p>
          <p className="text-[#606F7B] w-[50%] md:w-[100px]">{props.tag}</p>
          <p className=" text-primarycolor w-[50%] md:w-[100px]">
            {DateDiff()} {DateDiff() == 1 ? "Day" : "Days"}
          </p>
          {/* {IsPermissionApproved(isApp)} */}
          {
props.isApproved == 0 ?  ( <p className=" w-[100px] text-[#FFD43B] flex justify-center  items-center gap-1">
<svg xmlns="http://www.w3.org/2000/svg" width="27" height="21" viewBox="0 0 27 21">
  <g id="Group_51" data-name="Group 51">
    <rect id="Rectangle_16" data-name="Rectangle 16" width="27" height="21" rx="8" fill="rgba(255,212,59,0.36)"/>
  </g>
  <path id="Icon_awesome-clock" data-name="Icon awesome-clock" d="M7.562.562c-3.866,0-7,2.21-7,4.938s3.133,4.937,7,4.937,7-2.21,7-4.937S11.428.562,7.562.562Zm1.611,6.97L6.684,6.257a.228.228,0,0,1-.138-.193V2.713c0-.131.152-.239.339-.239H8.239c.186,0,.339.108.339.239V5.454l1.792.92a.2.2,0,0,1,.073.334l-.8.772A.441.441,0,0,1,9.173,7.533Z" transform="translate(5.938 5)" fill="#ffd43b"/>
</svg>

Pending
</p>): props.isApproved == 1 ? (  <p
          className=" w-[100px] text-[rgb(0,128,0)] flex justify-center  items-center gap-1 " 
          onClick={() => { ;setIsApp(1);}}
          
        >
           <svg xmlns="http://www.w3.org/2000/svg" width="27" height="21" viewBox="0 0 27 21">
  <rect id="Rectangle_16" data-name="Rectangle 16" width="27" height="21" rx="8" fill="rgba(23,142,113,0.4)"/>
  <path id="Icon_feather-check" data-name="Icon feather-check" d="M17.806,9,9.689,16.5,6,13.091" transform="translate(2.096 -2.25)" fill="none" stroke="#1a8e72" stroke-linecap="round" stroke-linejoin="round" stroke-width="3"/>
</svg>
          Approved
        </p>): (
                  <p
                  className=" w-[100px] text-[#EA8B9E] flex justify-center  items-center gap-1"
                  onClick={() => {setIsApp(2);}}
                >
                 <svg xmlns="http://www.w3.org/2000/svg" width="27" height="21" viewBox="0 0 27 21">
  <rect id="Rectangle_16" data-name="Rectangle 16" width="27" height="21" rx="8" fill="rgba(230,189,197,0.4)"/>
  <path id="Path_28" data-name="Path 28" d="M11.09,97.725a.994.994,0,0,0,0-1.492,1.227,1.227,0,0,0-1.628,0L5.678,99.7,1.89,96.237a1.227,1.227,0,0,0-1.628,0,.994.994,0,0,0,0,1.492L4.05,101.2.265,104.667a.994.994,0,0,0,0,1.492,1.227,1.227,0,0,0,1.628,0l3.784-3.471,3.788,3.467a1.227,1.227,0,0,0,1.628,0,.994.994,0,0,0,0-1.492L7.305,101.2Z" transform="translate(7.822 -90.696)" fill="#ea8b9e"/>
</svg>
                  Rejected
                </p>
        )
          }
          <p className=" cursor-pointer ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="33"
              height="30"
              viewBox="0 0 33 30"
              onClick={() => setButtonActive(!buttonActive)}
            >
              <rect
                id="Rectangle_17"
                data-name="Rectangle 17"
                width="33"
                height="30"
                rx="8"
                fill="#cdd0d3"
              />
              {buttonActive ? (
                <path
                  id="Icon_ionic-ios-arrow-down"
                  data-name="Icon ionic-ios-arrow-down"
                  d="M12.2,16.067,16.74,11.5a.852.852,0,0,1,1.213,0,.873.873,0,0,1,0,1.222L12.805,17.9a.854.854,0,0,1-1.184.025l-5.183-5.2a.87.87,0,0,1,0-1.222.852.852,0,0,1,1.213,0Z"
                  transform="translate(3.304 0.303)"
                />
              ) : (
                <path
                  id="Icon_ionic-ios-arrow-up"
                  data-name="Icon ionic-ios-arrow-up"
                  d="M11.867,13.856l4.293,5.72a.676.676,0,0,0,1.146,0,1.353,1.353,0,0,0,0-1.53l-4.865-6.481a.674.674,0,0,0-1.119-.032l-4.9,6.508a1.355,1.355,0,0,0,0,1.53.676.676,0,0,0,1.146,0Z"
                  transform="translate(5.591 -0.572)"
                />
              )}
            </svg>
          </p>
        </div>
        <div>
          <div className={buttonActive ? "hidden" : "block"}>
            <div>
              <div className="flex gap-8 flex-wrap">
                <p className="pb-[20px] w-[70%] text-black ">
                  {/* Description: */}
                  <span className="font-[Avenirregular] text-[#8795a1] pb-[30px]">
                    {props.description}
                  </span>
                </p>
                {UserEditOption()}
              </div>
              <p className="pb-[20px]">
                {/* Date:{" "} */}
                <span className="font-[Avenirregular] text-[#8795a1]">
                  {moment(props.from).format("MMMM Do YYYY")} -{" "}
                  {moment(props.to).format("MMMM Do YYYY")}
                </span>
              </p>
            </div>
          </div>
        </div>
        <hr className="text-[rgba(246,247,249,.05)] h-[2px]" />
      </>
    );
  }
  return <> {isView ? ViewBox() : "" }{ newRequest && PermssionForm() } </>;
}
