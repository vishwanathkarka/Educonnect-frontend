import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { signout, isAuthenticated } from "../util/apicalls";

function Header() {
  const [islogin, SetIsLogin] = useState(
    isAuthenticated() == false ? false : true
  );
  const [userData, setUserData] = useState(false);
const [showMobileBar,setShowMobileBar] = useState(false)
  useEffect(() => {
    setUserData(isAuthenticated().user);

  }, []);
  //This function check whether user is logged or not
  function isCheck() {
    return islogin ? HeaderLogin() : HeaderNotLogin();
  }
  //if user is not login
  function HeaderNotLogin() {
    return (
      <ul className="flex  ml-auto items-center gap-9  bg-black">
        <Link className="text-primary cursor-pointer" href="/login">
          {/* <Image src ="https://5.imimg.com/data5/RX/NO/MY-24297425/eacademics-school-28complete-school-management-software-with-mobile-app-29-500x500.png" width={200} height={200}/> */}
        </Link>
        <Link
          className=" bg-primary px-[6px] py-[3px]  rounded-[9px] cursor-pointer text-[white] font-semibold"
          href="/signup"
        >
          {" "}
          signup
        </Link>
      </ul>
    );
  }

  //if user is logged in
  function HeaderLogin() {
    console.log(islogin);
    return (
      <>
        <div className="relative onHover p-5 bg-black  border-b-[rgba(246,247,249,.05)] border-[1px]">
          <div className="flex  justify-center items-center gap-[12px] cursor-pointer">
            {display}
            <svg
              width="11"
              height="6"
              viewBox="0 0 11 6"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              class="mt-1"
            >
              <path
                d="M2.03243 0.261745L5.50447 3.73379L8.97651 0.261745C9.3255 -0.0872484 9.88926 -0.0872484 10.2383 0.261745C10.5872 0.610739 10.5872 1.1745 10.2383 1.52349L6.13087 5.63088C5.78187 5.97987 5.21811 5.97987 4.86912 5.63088L0.761732 1.52349C0.594168 1.3563 0.5 1.12932 0.5 0.892619C0.5 0.655913 0.594168 0.428933 0.761732 0.261745C1.11073 -0.0782999 1.68343 -0.0872484 2.03243 0.261745Z"
                fill="#B8C2CC"
              ></path>
            </svg>
          </div>

          {/* <div className=" show-hover onHover  rounded-md h-[30px]   right-[2px]  absolute m-2 w-full md:w-64 md:bg-white md:rounded-xl md:shadow-sm ">
            <div className="  bg-[white]  shadow-xl rounded-xl">
              <div className="h-[88px] flex bg-[white]  p-4 rounded-tl-md rounded-tr-md">
                <Image
                  src={userData.photo.secure_url?userData.user.photo.secure_url:"https://undraw.co/favicon.ico"}
                  className="mr-3 w-12 h-12 rounded-full flex-no-shrink"
                  width={200}
                  height={200}
                  alt=""
                />
                <div>
                  <h3 className="text-[#3d4852]">{userData.name}</h3>
                  <p className="font-[Avenirregular] text-primary cursor-pointer">
                    View Profile
                  </p>
                </div>
              </div>

              <ul className="p-0">
                <li className="font-[Avenirregular]  px-4 py-2 flex   cursor-pointer items-center gap-2 hover:bg-[#6b63ff29] ">
                  <Image
                    src="https://static5.lottiefiles.com/images/v3/dashboard-icons/dashboard.svg"
                    alt="My Dashboard"
                    className="inline "
                  />
                  <p>My Dashboard </p>{" "}
                </li>
                <li className="font-[Avenirregular]  px-4 py-2 flex  cursor-pointer items-center gap-2 hover:bg-[#6b63ff29] ">
                  <svg
                    id="Group_5"
                    data-name="Group 5"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path
                      id="Path_13"
                      data-name="Path 13"
                      d="M0,0H24V24H0Z"
                      fill="none"
                    />
                    <path
                      id="Path_14"
                      data-name="Path 14"
                      d="M21,14l-3-3H11a1,1,0,0,1-1-1V4a1,1,0,0,1,1-1h9a1,1,0,0,1,1,1V14"
                      fill="none"
                      stroke="#606f7b"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.5"
                    />
                    <path
                      id="Path_15"
                      data-name="Path 15"
                      d="M14,15v2a1,1,0,0,1-1,1H6L3,21V11a1,1,0,0,1,1-1H6"
                      fill="none"
                      stroke="#606f7b"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.5"
                    />
                  </svg>
                  <p>Request Permission </p>{" "}
                </li>
                <li className="font-[Avenirregular]  px-4 py-2 flex  cursor-pointer  items-center gap-2 hover:bg-[#6b63ff29] ">
                  <svg
                    id="Group_6"
                    data-name="Group 6"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path
                      id="Path_16"
                      data-name="Path 16"
                      d="M0,0H24V24H0Z"
                      fill="none"
                    />
                    <line
                      id="Line_1"
                      data-name="Line 1"
                      y1="11"
                      x2="11"
                      transform="translate(10 3)"
                      fill="none"
                      stroke="#606f7b"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.5"
                    />
                    <path
                      id="Path_17"
                      data-name="Path 17"
                      d="M21,3,14.5,21a.55.55,0,0,1-1,0L10,14,3,10.5a.55.55,0,0,1,0-1L21,3"
                      fill="none"
                      stroke="#606f7b"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.5"
                    />
                  </svg>
                  <p>Add Complain </p>{" "}
                </li>
                <hr className="text-[#DAE1E7]" />
                <li className="font-[Avenirregular]  px-4 py-2 flex   cursor-pointer items-center gap-2 hover:bg-[#6b63ff29] ">
                  <svg
                    id="Group_2"
                    data-name="Group 2"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path
                      id="Path_5"
                      data-name="Path 5"
                      d="M0,0H24V24H0Z"
                      fill="none"
                    />
                    <path
                      id="Path_6"
                      data-name="Path 6"
                      d="M10.325,4.317a1.724,1.724,0,0,1,3.35,0,1.724,1.724,0,0,0,2.573,1.066,1.725,1.725,0,0,1,2.37,2.37,1.724,1.724,0,0,0,1.065,2.572,1.724,1.724,0,0,1,0,3.35,1.724,1.724,0,0,0-1.066,2.573,1.725,1.725,0,0,1-2.37,2.37,1.724,1.724,0,0,0-2.572,1.065,1.724,1.724,0,0,1-3.35,0,1.724,1.724,0,0,0-2.573-1.066,1.725,1.725,0,0,1-2.37-2.37,1.724,1.724,0,0,0-1.065-2.572,1.724,1.724,0,0,1,0-3.35A1.724,1.724,0,0,0,5.383,7.752a1.725,1.725,0,0,1,2.37-2.37,1.723,1.723,0,0,0,2.572-1.065Z"
                      fill="none"
                      stroke="#606f7b"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.5"
                    />
                    <circle
                      id="Ellipse_3"
                      data-name="Ellipse 3"
                      cx="3"
                      cy="3"
                      r="3"
                      transform="translate(9 9)"
                      fill="none"
                      stroke="#606f7b"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.5"
                    />
                  </svg>
                  <p>Settings </p>{" "}
                </li>
                <li
                  className="font-[Avenirregular] rounded-b-xl  px-4 py-2 flex  items-center gap-2 hover:bg-[#6b63ff29] cursor-pointer "
                  
                  onClick={() => {
                    SetIsLogin(!islogin);
                    isCheck();
                  }}
                >
                  <svg
                    id="Group_4"
                    data-name="Group 4"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path
                      id="Path_10"
                      data-name="Path 10"
                      d="M0,0H24V24H0Z"
                      fill="none"
                    />
                    <path
                      id="Path_11"
                      data-name="Path 11"
                      d="M14,8V6a2,2,0,0,0-2-2H5A2,2,0,0,0,3,6V18a2,2,0,0,0,2,2h7a2,2,0,0,0,2-2V16"
                      fill="none"
                      stroke="#606f7b"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.5"
                    />
                    <path
                      id="Path_12"
                      data-name="Path 12"
                      d="M7,12H21L18,9m0,6,3-3"
                      fill="none"
                      stroke="#606f7b"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.5"
                    />
                  </svg>
                  <p onClick={() => console.log(islogin)}>Logout</p>
                </li>
              </ul>
            </div>
          </div> */}
        </div>
      </>
    );
  }

  return (
    <div className="flex  h-[9vh] justify-between items-center lg:p-[40px]  border-b-[rgba(246,247,249,.05)]  border-[1px] bg-secoundblack ">
      <div className="w-[16rem]">

        <p className="text-white"> XYZ School</p>
      </div>

      
      {userData && (
        <div className="relative onHover p-5 ">
          <div className="flex  justify-center items-center gap-[12px] cursor-pointer " onClick={()=>setShowMobileBar(!showMobileBar)}>
            <img className=" w-10 h-10 rounded-full bg-[green]  border-black boder-2 "  src={userData.photo.secure_url?userData.photo.secure_url:"https://undraw.co/favicon.ico"} /> 
            <svg
              width="11"
              height="6"
              viewBox="0 0 11 6"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              class="mt-1"
            >
              <path
                d="M2.03243 0.261745L5.50447 3.73379L8.97651 0.261745C9.3255 -0.0872484 9.88926 -0.0872484 10.2383 0.261745C10.5872 0.610739 10.5872 1.1745 10.2383 1.52349L6.13087 5.63088C5.78187 5.97987 5.21811 5.97987 4.86912 5.63088L0.761732 1.52349C0.594168 1.3563 0.5 1.12932 0.5 0.892619C0.5 0.655913 0.594168 0.428933 0.761732 0.261745C1.11073 -0.0782999 1.68343 -0.0872484 2.03243 0.261745Z"
                fill="#B8C2CC"
              ></path>
            </svg>
          </div>

{/* desktop naviagtion menu */}
<div className=" lg:block hidden" >
          <div className=" show-hover onHover block  md:hidden sm:hidden rounded-md h-[30px]   right-[2px]  absolute m-2 w-full md:w-64 md:bg-white md:rounded-xl md:shadow-sm  z-10 ">
            <div className="  bg-secoundblack text-white  shadow-xl rounded-xl">
              <div className="h-[88px] flex  p-4 rounded-tl-md rounded-tr-md">
                <Image
              src={userData.photo.secure_url?userData.photo.secure_url:"https://undraw.co/favicon.ico"}
              className="mr-3 w-12 h-12 rounded-full flex-no-shrink"
              width={200}
                  height={200}
              alt=""
            />
                <div>
                  <h3 className="text-[#3d4852]">{userData.name}</h3>
                  <p className="font-[Avenirregular] text-primarycolor cursor-pointer">
                    <Link className="text-inherit no-underline" href={"/profile"}>
                    View Profile
                    </Link>
                  </p>
                </div>
              </div>

              <ul className="p-0 ">
                {/* <li className="font-[Avenirregular]  px-4 py-2 flex   cursor-pointer items-center gap-2 hover:bg-[#6b63ff29] ">
                  <Image
                src="https://static5.lottiefiles.com/images/v3/dashboard-icons/dashboard.svg"
                alt="My Dashboard"
                className="inline "
               
                // onClick={()=> isAuthenticated().user.role == "Admin"?navigate("/admin/dashboard"):navigate("/user/dashboard")
              />
                  <p>My Dashboard </p>
                </li> */}
                <li className="font-[Avenirregular]  px-4 py-2 flex   cursor-pointer items-center gap-2 hover:bg-[#6b63ff29] ">
                  <svg
                    id="Group_5"
                    data-name="Group 5"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path
                      id="Path_13"
                      data-name="Path 13"
                      d="M0,0H24V24H0Z"
                      fill="none"
                    />
                    <path
                      id="Path_14"
                      data-name="Path 14"
                      d="M21,14l-3-3H11a1,1,0,0,1-1-1V4a1,1,0,0,1,1-1h9a1,1,0,0,1,1,1V14"
                      fill="none"
                      stroke="#606f7b"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.5"
                    />
                    <path
                      id="Path_15"
                      data-name="Path 15"
                      d="M14,15v2a1,1,0,0,1-1,1H6L3,21V11a1,1,0,0,1,1-1H6"
                      fill="none"
                      stroke="#606f7b"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.5"
                    />
                  </svg>
                  {userData.role == "user" ? (
                    <p>Request Permission </p>
                  ) : (
                    <p>All Permissions </p>
                  )}
                </li>
                <li className="font-[Avenirregular]  px-4 py-2 flex  cursor-pointer  items-center gap-2 hover:bg-[#6b63ff29] ">
                  <svg
                    id="Group_6"
                    data-name="Group 6"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path
                      id="Path_16"
                      data-name="Path 16"
                      d="M0,0H24V24H0Z"
                      fill="none"
                    />
                    <line
                      id="Line_1"
                      data-name="Line 1"
                      y1="11"
                      x2="11"
                      transform="translate(10 3)"
                      fill="none"
                      stroke="#606f7b"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.5"
                    />
                    <path
                      id="Path_17"
                      data-name="Path 17"
                      d="M21,3,14.5,21a.55.55,0,0,1-1,0L10,14,3,10.5a.55.55,0,0,1,0-1L21,3"
                      fill="none"
                      stroke="#606f7b"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.5"
                    />
                  </svg>
                  <p>Add Complain </p>{" "}
                </li>
                <hr className="text-[#DAE1E7]" />
                <li className="font-[Avenirregular]  px-4 py-2 flex   cursor-pointer items-center gap-2 hover:bg-[#6b63ff29] ">
                  <svg
                    id="Group_2"
                    data-name="Group 2"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path
                      id="Path_5"
                      data-name="Path 5"
                      d="M0,0H24V24H0Z"
                      fill="none"
                    />
                    <path
                      id="Path_6"
                      data-name="Path 6"
                      d="M10.325,4.317a1.724,1.724,0,0,1,3.35,0,1.724,1.724,0,0,0,2.573,1.066,1.725,1.725,0,0,1,2.37,2.37,1.724,1.724,0,0,0,1.065,2.572,1.724,1.724,0,0,1,0,3.35,1.724,1.724,0,0,0-1.066,2.573,1.725,1.725,0,0,1-2.37,2.37,1.724,1.724,0,0,0-2.572,1.065,1.724,1.724,0,0,1-3.35,0,1.724,1.724,0,0,0-2.573-1.066,1.725,1.725,0,0,1-2.37-2.37,1.724,1.724,0,0,0-1.065-2.572,1.724,1.724,0,0,1,0-3.35A1.724,1.724,0,0,0,5.383,7.752a1.725,1.725,0,0,1,2.37-2.37,1.723,1.723,0,0,0,2.572-1.065Z"
                      fill="none"
                      stroke="#606f7b"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.5"
                    />
                    <circle
                      id="Ellipse_3"
                      data-name="Ellipse 3"
                      cx="3"
                      cy="3"
                      r="3"
                      transform="translate(9 9)"
                      fill="none"
                      stroke="#606f7b"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.5"
                    />
                  </svg>
                  <p>Settings </p>{" "}
                </li>
                <li
                  className="font-[Avenirregular] rounded-b-xl  px-4 py-2 flex  items-center gap-2 hover:bg-[#6b63ff29] cursor-pointer "
                  onClick={() => {
                    signout();
                  }}
                >
                  <svg
                    id="Group_4"
                    data-name="Group 4"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path
                      id="Path_10"
                      data-name="Path 10"
                      d="M0,0H24V24H0Z"
                      fill="none"
                    />
                    <path
                      id="Path_11"
                      data-name="Path 11"
                      d="M14,8V6a2,2,0,0,0-2-2H5A2,2,0,0,0,3,6V18a2,2,0,0,0,2,2h7a2,2,0,0,0,2-2V16"
                      fill="none"
                      stroke="#606f7b"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.5"
                    />
                    <path
                      id="Path_12"
                      data-name="Path 12"
                      d="M7,12H21L18,9m0,6,3-3"
                      fill="none"
                      stroke="#606f7b"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.5"
                    />
                  </svg>
                  <p>Logout</p>
                </li>
              </ul>
            </div>
          </div>
          </div>
{/* mobile navigtion menu */}
       { showMobileBar &&  <div className="h-[100vh] lg:hidden md:hidden  sm:block bg-secoundblack w-[80vw] absolute top-10 right-0" onClick={()=> setShowMobileBar(!showMobileBar)}>
            <div className=" ml-2 mt-2 border-lightblack border-2 inline-block rounded-md" onClick={()=>setShowMobileBar(!showMobileBar)}>
            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-x" width="32" height="32" viewBox="0 0 24 24" stroke-width="1.5" stroke="#374151" fill="none" stroke-linecap="round" stroke-linejoin="round">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <line x1="18" y1="6" x2="6" y2="18" />
  <line x1="6" y1="6" x2="18" y2="18" />
</svg>

</div>
<ul className="p-0 text-white">
                {/* <li className="font-[Avenirregular]  px-4 py-2 flex   cursor-pointer items-center gap-2 hover:bg-[#6b63ff29] ">
                  <Image
                src="https://static5.lottiefiles.com/images/v3/dashboard-icons/dashboard.svg"
                alt="My Dashboard"
                className="inline "
               
                // onClick={()=> isAuthenticated().user.role == "Admin"?navigate("/admin/dashboard"):navigate("/user/dashboard")
              />
                  <p>My Dashboard </p>
                </li> */}
                <li className="font-[Avenirregular]  px-4 py-2 flex   cursor-pointer items-center gap-2 hover:bg-[#6b63ff29] ">
                  <svg
                    id="Group_5"
                    data-name="Group 5"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path
                      id="Path_13"
                      data-name="Path 13"
                      d="M0,0H24V24H0Z"
                      fill="none"
                    />
                    <path
                      id="Path_14"
                      data-name="Path 14"
                      d="M21,14l-3-3H11a1,1,0,0,1-1-1V4a1,1,0,0,1,1-1h9a1,1,0,0,1,1,1V14"
                      fill="none"
                      stroke="#606f7b"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.5"
                    />
                    <path
                      id="Path_15"
                      data-name="Path 15"
                      d="M14,15v2a1,1,0,0,1-1,1H6L3,21V11a1,1,0,0,1,1-1H6"
                      fill="none"
                      stroke="#606f7b"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.5"
                    />
                  </svg>
                  {userData.role == "user" ? (
                    <p>Request Permission </p>
                  ) : (
                    <p>All Permissions </p>
                  )}
                </li>
                <li className="font-[Avenirregular]  px-4 py-2 flex  cursor-pointer  items-center gap-2 hover:bg-[#6b63ff29] ">
                  <svg
                    id="Group_6"
                    data-name="Group 6"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path
                      id="Path_16"
                      data-name="Path 16"
                      d="M0,0H24V24H0Z"
                      fill="none"
                    />
                    <line
                      id="Line_1"
                      data-name="Line 1"
                      y1="11"
                      x2="11"
                      transform="translate(10 3)"
                      fill="none"
                      stroke="#606f7b"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.5"
                    />
                    <path
                      id="Path_17"
                      data-name="Path 17"
                      d="M21,3,14.5,21a.55.55,0,0,1-1,0L10,14,3,10.5a.55.55,0,0,1,0-1L21,3"
                      fill="none"
                      stroke="#606f7b"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.5"
                    />
                  </svg>
                  <p>Add Complain </p>{" "}
                </li>
                <hr className="text-[#DAE1E7]" />
                <li className="font-[Avenirregular]  px-4 py-2 flex   cursor-pointer items-center gap-2 hover:bg-[#6b63ff29] ">
                  <svg
                    id="Group_2"
                    data-name="Group 2"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path
                      id="Path_5"
                      data-name="Path 5"
                      d="M0,0H24V24H0Z"
                      fill="none"
                    />
                    <path
                      id="Path_6"
                      data-name="Path 6"
                      d="M10.325,4.317a1.724,1.724,0,0,1,3.35,0,1.724,1.724,0,0,0,2.573,1.066,1.725,1.725,0,0,1,2.37,2.37,1.724,1.724,0,0,0,1.065,2.572,1.724,1.724,0,0,1,0,3.35,1.724,1.724,0,0,0-1.066,2.573,1.725,1.725,0,0,1-2.37,2.37,1.724,1.724,0,0,0-2.572,1.065,1.724,1.724,0,0,1-3.35,0,1.724,1.724,0,0,0-2.573-1.066,1.725,1.725,0,0,1-2.37-2.37,1.724,1.724,0,0,0-1.065-2.572,1.724,1.724,0,0,1,0-3.35A1.724,1.724,0,0,0,5.383,7.752a1.725,1.725,0,0,1,2.37-2.37,1.723,1.723,0,0,0,2.572-1.065Z"
                      fill="none"
                      stroke="#606f7b"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.5"
                    />
                    <circle
                      id="Ellipse_3"
                      data-name="Ellipse 3"
                      cx="3"
                      cy="3"
                      r="3"
                      transform="translate(9 9)"
                      fill="none"
                      stroke="#606f7b"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.5"
                    />
                  </svg>
                  <p>Settings </p>{" "}
                </li>
                <li
                  className="font-[Avenirregular] rounded-b-xl  px-4 py-2 flex  items-center gap-2 hover:bg-[#6b63ff29] cursor-pointer "
                  onClick={() => {
                    signout();
                  }}
                >
                  <svg
                    id="Group_4"
                    data-name="Group 4"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path
                      id="Path_10"
                      data-name="Path 10"
                      d="M0,0H24V24H0Z"
                      fill="none"
                    />
                    <path
                      id="Path_11"
                      data-name="Path 11"
                      d="M14,8V6a2,2,0,0,0-2-2H5A2,2,0,0,0,3,6V18a2,2,0,0,0,2,2h7a2,2,0,0,0,2-2V16"
                      fill="none"
                      stroke="#606f7b"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.5"
                    />
                    <path
                      id="Path_12"
                      data-name="Path 12"
                      d="M7,12H21L18,9m0,6,3-3"
                      fill="none"
                      stroke="#606f7b"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.5"
                    />
                  </svg>
                  <p>Logout</p>
                </li>
              </ul>
          </div>
}
        </div>
      )}
      {!userData && (
        <ul className="flex  ml-auto items-center gap-9">
          <Link
            className="text-white no-underline font-semibold cursor-pointer"
            href="/login"
          >
            login
          </Link>
          <Link
            className=" bg-primarycolor hover:text-lightblack px-[6px] py-[3px] no-underline rounded-[9px] cursor-pointer text-[white] font-semibold"
            href="/signup"
          >
            signup
          </Link>
        </ul>
      )}
    </div>
  );
}
export default Header;
