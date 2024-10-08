import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { signout, isAuthenticated } from "./apicalls";

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
        </Link>
        <Link
          className=" bg-primary px-[6px] py-[3px]  rounded-[9px] cursor-pointer text-[white] font-semibold"
          href="/signup"
        >
          signup
        </Link>
      </ul>
    );
  }


  //if user is logged in photo view
  function HeaderLogin() {
    return (
      <>
        <div className="relative onHover p-5 bg-black  border-b-[rgba(246,247,249,.05)] border-[1px]">
          <div className="flex  justify-center items-center gap-[12px] cursor-pointer">
           
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="flex  h-[9vh] justify-between items-center lg:p-[40px]  border-b-[rgba(246,247,249,.05)]  border-[1px] bg-secoundblack ">
      <div className="w-[16rem]">
       <Link href="/" className="no-underline"> 
  <svg xmlns="http://www.w3.org/2000/svg" width="175.5" height="36" viewBox="0 0 175.5 36">
  <text id="duconnect" transform="translate(23.5 28)" fill="#fff" font-size="30" font-family="Rubik"><tspan x="0" y="0">duconnect</tspan></text>
  <line id="Line_1" data-name="Line 1" x2="20.937" transform="translate(0 4.5)" fill="none" stroke="#28abe2" stroke-width="4"/>
  <line id="Line_5" data-name="Line 5" x2="20.937" transform="translate(0 28.077)" fill="none" stroke="#2e3192" stroke-width="4"/>
  <line id="Line_3" data-name="Line 3" x2="20.937" transform="translate(0 16.276)" fill="none" stroke="#0171bb" stroke-width="4"/>
  <line id="Line_2" data-name="Line 2" y2="10.5" transform="translate(2 3)" fill="none" stroke="#28abe2" stroke-width="4"/>
  <line id="Line_4" data-name="Line 4" y2="10.5" transform="translate(2 14.577)" fill="none" stroke="#0171bb" stroke-width="4"/>
</svg> 

       </Link>
      </div>
      {userData && (
        <div className="relative onHover p-5 ">
          <div className="flex  justify-center items-center gap-[12px] cursor-pointer " onClick={()=>setShowMobileBar(!showMobileBar)}>
            <Image className=" w-10 h-10 rounded-full bg-[green]  border-black boder-2 " alt="person"  src={userData.photo.secure_url?userData.photo.secure_url:"https://undraw.co/favicon.ico"} width={200} height={200} /> 
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


{/* --------------             desktop naviagtion menu              --------------------*/}
<div className=" lg:block hidden" >
          <div className=" show-hover onHover block  md:hidden sm:hidden rounded-md h-[30px]   right-[2px]  absolute m-2 w-full md:w-64 md:bg-white md:rounded-xl md:shadow-sm  z-10 ">
            <div className="  bg-secoundblack text-white  shadow-xl rounded-xl">
              <div className="h-[88px] flex  items-center p-4 rounded-tl-md rounded-tr-md">
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
                    <Link className="text-inherit no-underline text-primarycolor hover:text-primarycolor" href={"/profile"}>
                    View Profile
                    </Link>
                  </p>
                </div>
              </div>

              <ul className="p-0 ">
              
                <li className="font-[Avenirregular]  hover:bg-[#6b63ff29] ">
                <Link href="/dashboard" className="text-inherit  h-[3rem]  no-underline text-white   px-4 py-2 flex   cursor-pointer items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-home" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="#606F7B" fill="none" stroke-linecap="round" stroke-linejoin="round">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <polyline points="5 12 3 12 12 3 21 12 19 12" />
  <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" />
  <path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6" />
</svg>
                  <p className="m-0">My Dashboard </p>
                  </Link>
                </li>

                {
                 userData.role && (userData.role != "Admin")?(
                  <>
                <li className="font-[Avenirregular]  hover:bg-[#6b63ff29] ">
                <Link href="/permission" className="text-inherit  h-[3rem]  no-underline text-white   px-4 py-2 flex   cursor-pointer items-center gap-2">
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
                  { userData.role == "user" ? (
                    <p className="m-0">Request Permission </p>
                  ) : (
                    <p className="m-0">All Permissions </p>
                  )}
                  </Link>
                </li>

                <li className="font-[Avenirregular]   hover:bg-[#6b63ff29] ">
                <Link href={(userData.role == "lecturer")?"/attendance/add":"/attendance"} className="text-inherit  h-[3rem]  no-underline text-white   px-4 py-2 flex   cursor-pointer items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="inline-block icon icon-tabler icon-tabler-user-check" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="#606F7B" fill="none" stroke-linecap="round" stroke-linejoin="round">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <circle cx="9" cy="7" r="4" />
  <path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
  <path d="M16 11l2 2l4 -4" />
</svg>
<p className="m-0">{(userData.role == "lecturer")?"Add Attendance":"Attendance"}</p>
</Link>
                </li>
                <li className="font-[Avenirregular]   hover:bg-[#6b63ff29] ">
                <Link href={userData.role == "lecturer"?"/payment":"/payment"} className="text-inherit  h-[3rem]  no-underline text-white   px-4 py-2 flex   cursor-pointer items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-wallet" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="#606F7B" fill="none" stroke-linecap="round" stroke-linejoin="round">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <path d="M17 8v-3a1 1 0 0 0 -1 -1h-10a2 2 0 0 0 0 4h12a1 1 0 0 1 1 1v3m0 4v3a1 1 0 0 1 -1 1h-12a2 2 0 0 1 -2 -2v-12" />
  <path d="M20 12v4h-4a2 2 0 0 1 0 -4h4" />
</svg>
<p className="m-0"> {userData.role == "lecturer"? "Add Payment": "Payment"}</p>
</Link>
                </li>
                <li className="font-[Avenirregular]   hover:bg-[#6b63ff29] ">
                <Link href={userData.role == "lecturer"?"/exam/liststudents":"/exam/result"} className="text-inherit  h-[3rem]  no-underline text-white   px-4 py-2 flex   cursor-pointer items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-report" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="#606F7B" fill="none" stroke-linecap="round" stroke-linejoin="round">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <path d="M8 5h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h5.697" />
  <path d="M18 14v4h4" />
  <path d="M18 11v-4a2 2 0 0 0 -2 -2h-2" />
  <rect x="8" y="3" width="6" height="4" rx="2" />
  <circle cx="18" cy="18" r="4" />
  <path d="M8 11h4" />
  <path d="M8 15h3" />
</svg>
<p className="m-0">{userData.role == "lecturer"? "Add Result": "Result"}</p>
</Link>
                </li>
                <li className="font-[Avenirregular]   hover:bg-[#6b63ff29] ">
                <Link href={userData.role == "lecturer"?"/homework/add":"/homework"} className="text-inherit  h-[3rem]  no-underline text-white   px-4 py-2 flex   cursor-pointer items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-writing" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="#606F7B" fill="none" stroke-linecap="round" stroke-linejoin="round">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <path d="M20 17v-12c0 -1.121 -.879 -2 -2 -2s-2 .879 -2 2v12l2 2l2 -2z" />
  <path d="M16 7h4" />
  <path d="M18 19h-13a2 2 0 1 1 0 -4h4a2 2 0 1 0 0 -4h-3" />
</svg>
<p className="m-0">{userData.role == "lecturer"? "Add HomeWork":"HomeWork"}</p>
</Link>
                </li>
                </>):<>
                  <li>
                  <Link href="/edituser" className="text-inherit  h-[3rem]  no-underline text-white   px-4 py-2 flex   cursor-pointer items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-user-plus" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="#606f7b" fill="none" stroke-linecap="round" stroke-linejoin="round">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" />
  <path d="M16 19h6" />
  <path d="M19 16v6" />
  <path d="M6 21v-2a4 4 0 0 1 4 -4h4" />
</svg>

<p className="m-0">Edit user role</p>
</Link>

                  </li>
                  </>
}
            
                {userData&& userData.role == "lecturer"&& <> <li className="font-[Avenirregular]  hover:bg-[#6b63ff29] ">
                <Link href="/timetable/add" className="text-inherit  h-[3rem]  no-underline text-white   px-4 py-2 flex   cursor-pointer items-center gap-2">
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
                  
                    <p className="m-0">{userData.role == "lecturer"? "Add Timetable": "Timetable"}</p>
                  
                  </Link>
                </li>

                <li className="font-[Avenirregular]  hover:bg-[#6b63ff29] ">
                <Link href="/exam/sittingplain" className="text-inherit  h-[3rem]  no-underline text-white   px-4 py-2 flex   cursor-pointer items-center gap-2">
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
                  
                    <p className="m-0">Add Sitting plain </p>
                  
                  </Link>
                </li>
                </>}
                <hr className="text-lightwg" />
  
                <li
                  className="font-[Avenirregular] h-[3rem]  rounded-b-xl  px-4 py-2 flex  items-center gap-2 hover:bg-[#6b63ff29] cursor-pointer "
                  onClick={() => {
                    signout();
                  }}
                >
                   <Link href="/login" className="text-inherit  h-[3rem]  no-underline text-white   px-4 py-2 flex   cursor-pointer items-center gap-2">
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
                  <p className="m-0">Logout</p>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          </div>


{/*    ---------------         mobile navigtion menu         ------------------        */}
       { showMobileBar  && userData.role &&  <div className="h-[100vh] lg:hidden z-20   sm:block bg-secoundblack w-[80vw] absolute top-10 right-0" onClick={()=> setShowMobileBar(!showMobileBar)}>
            <div className=" ml-2 mt-2 border-lightblack border-2 inline-block rounded-md" onClick={()=>setShowMobileBar(!showMobileBar)}>
            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-x" width="32" height="32" viewBox="0 0 24 24" stroke-width="1.5" stroke="#374151" fill="none" stroke-linecap="round" stroke-linejoin="round">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <line x1="18" y1="6" x2="6" y2="18" />
  <line x1="6" y1="6" x2="18" y2="18" />
</svg>

</div>
<ul className="p-0 ">
              
                <li className="font-[Avenirregular]  hover:bg-[#6b63ff29] ">
                <Link href="/dashboard" className="text-inherit  h-[3rem]  no-underline text-white   px-4 py-2 flex   cursor-pointer items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-home" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="#606F7B" fill="none" stroke-linecap="round" stroke-linejoin="round">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <polyline points="5 12 3 12 12 3 21 12 19 12" />
  <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" />
  <path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6" />
</svg>
                  <p className="m-0">My Dashboard </p>
                  </Link>
                </li>
{(userData.role  != "Admin")?(<>
                <li className="font-[Avenirregular]  hover:bg-[#6b63ff29] ">
                <Link href="/permission" className="text-inherit  h-[3rem]  no-underline text-white   px-4 py-2 flex   cursor-pointer items-center gap-2">
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
                    <p className="m-0">Request Permission </p>
                  ) : (
                    <p className="m-0">All Permissions </p>
                  )}
                  </Link>
                </li>
                <li className="font-[Avenirregular]   hover:bg-[#6b63ff29] ">
                <Link href={(userData.role == "lecturer")?"/attendance/add":"/attendance"} className="text-inherit  h-[3rem]  no-underline text-white   px-4 py-2 flex   cursor-pointer items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="inline-block icon icon-tabler icon-tabler-user-check" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="#606F7B" fill="none" stroke-linecap="round" stroke-linejoin="round">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <circle cx="9" cy="7" r="4" />
  <path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
  <path d="M16 11l2 2l4 -4" />
</svg>
<p className="m-0"> {userData.role == "lecturer"?" Add Attendance":"Attendance"}</p>
</Link>
                </li>
                <li className="font-[Avenirregular]   hover:bg-[#6b63ff29] ">
                <Link href="/payment" className="text-inherit  h-[3rem]  no-underline text-white   px-4 py-2 flex   cursor-pointer items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-wallet" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="#606F7B" fill="none" stroke-linecap="round" stroke-linejoin="round">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <path d="M17 8v-3a1 1 0 0 0 -1 -1h-10a2 2 0 0 0 0 4h12a1 1 0 0 1 1 1v3m0 4v3a1 1 0 0 1 -1 1h-12a2 2 0 0 1 -2 -2v-12" />
  <path d="M20 12v4h-4a2 2 0 0 1 0 -4h4" />
</svg>
<p className="m-0">{userData.role == "lecturer"?" Add Payment":"Payment"}</p>
</Link>
                </li>
                <li className="font-[Avenirregular]   hover:bg-[#6b63ff29] ">
                <Link href={userData.role == "lecturer"?"/exam/liststudents":"/exam/result"} className="text-inherit  h-[3rem]  no-underline text-white   px-4 py-2 flex   cursor-pointer items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-report" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="#606F7B" fill="none" stroke-linecap="round" stroke-linejoin="round">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <path d="M8 5h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h5.697" />
  <path d="M18 14v4h4" />
  <path d="M18 11v-4a2 2 0 0 0 -2 -2h-2" />
  <rect x="8" y="3" width="6" height="4" rx="2" />
  <circle cx="18" cy="18" r="4" />
  <path d="M8 11h4" />
  <path d="M8 15h3" />
</svg>
<p className="m-0">{userData.role == "lecturer"?"Add Result":"Result"}</p>
</Link>
                </li>
                <li className="font-[Avenirregular]   hover:bg-[#6b63ff29] ">
                <Link href={userData.role == "lecturer"?"/homework/add":"/homework"} className="text-inherit  h-[3rem]  no-underline text-white   px-4 py-2 flex   cursor-pointer items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-writing" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="#606F7B" fill="none" stroke-linecap="round" stroke-linejoin="round">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <path d="M20 17v-12c0 -1.121 -.879 -2 -2 -2s-2 .879 -2 2v12l2 2l2 -2z" />
  <path d="M16 7h4" />
  <path d="M18 19h-13a2 2 0 1 1 0 -4h4a2 2 0 1 0 0 -4h-3" />
</svg>
<p className="m-0">{userData.role == "lecturer"?" Add Homework":"HomeWork"}</p>
</Link>
                </li>
                </>
                  ):<>
                  <li>
                  <Link href="/edituser" className="text-inherit  h-[3rem]  no-underline text-white   px-4 py-2 flex   cursor-pointer items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-user-plus" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="#606f7b" fill="none" stroke-linecap="round" stroke-linejoin="round">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" />
  <path d="M16 19h6" />
  <path d="M19 16v6" />
  <path d="M6 21v-2a4 4 0 0 1 4 -4h4" />
</svg>

<p className="m-0">Edit user role</p>
</Link>

                  </li>
                  </>}


              {userData&& userData.role == "lecturer"&& <> <li className="font-[Avenirregular]  hover:bg-[#6b63ff29] ">
                <Link href="/timetable/add" className="text-inherit  h-[3rem]  no-underline text-white   px-4 py-2 flex   cursor-pointer items-center gap-2">
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
                  
                    <p className="m-0">{userData.role == "lecturer"?" Add Timetable":"Timetable"} </p>
                  
                  </Link>
                </li>

                <li className="font-[Avenirregular]  hover:bg-[#6b63ff29] ">
                <Link href="/exam/sittingplain" className="text-inherit  h-[3rem]  no-underline text-white   px-4 py-2 flex   cursor-pointer items-center gap-2">
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
                  
                    <p className="m-0">Add Sitting plain </p>
                  
                  </Link>
                </li>
                </>
                

}
            

                <hr className="text-[#DAE1E7]" />
  
                <li
                  className="font-[Avenirregular] h-[3rem]  rounded-b-xl  px-4 py-2 flex  items-center gap-2 hover:bg-[#6b63ff29] cursor-pointer "
                  onClick={() => {
                    signout();
                  }}
                >
                   <Link href="/login" className="text-inherit  h-[3rem]  no-underline text-white   px-4 py-2 flex   cursor-pointer items-center gap-2">
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
                  <p className="m-0">Logout</p>
                  </Link>
                </li>
              </ul>
          </div>
}
        </div>
      )}

      
    {/* ---------------      not login     ---------------- */}
      {!userData && (
        <ul className="flex  ml-auto items-center gap-9">
          <Link
            className="text-white no-underline font-semibold cursor-pointer"
            href="/login"
          >
            login
          </Link>
          <Link
            className=" bg-primarycolor  px-[6px] py-[3px] no-underline rounded-[9px] cursor-pointer hover:text-[white] text-[white] font-semibold"
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
