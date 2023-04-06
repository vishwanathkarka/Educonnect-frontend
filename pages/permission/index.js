import React, { useEffect, useState } from "react";

import {isAuthenticated} from "../../util/apicalls"
// import Header from "../core/Header";
import PermssionCard from "@/util/permssionCard";
// import { GetAllPermissions } from "./helper/permissioncalls";
import {getData,postData} from "@/util/apicalls"
export default function AdminAllPermission() {
  const [newRequest, setNewRequest] = useState(false);
  const [isView,setIsView] = useState(true);
  const [count, setCount] = useState(1);
  const [allRequests, setAllRequests] = useState([]);

  const [searchSort, setSearchSort] = useState({
    is_PermisssionGranted: 0,
    search: null,
    section: null,
  });

  const inputHandler = (user) => (event) => {
    setSearchSort({ ...searchSort, [user]: event.target.value });
    console.log(search);
  };

  const OnSubmit = (el) => {
//     el.preventDefault();
//      GetAllPermissions(isAuthenticated().user.email,isAuthenticated().token,isAuthenticated().user.role,`/?is_PermisssionGranted=${is_PermisssionGranted} ${search?`&search=${search}`:""}`).then(data=>(setAllRequests(data.products) ))
  };

  const { is_PermisssionGranted, search, section } = searchSort;
  useEffect(() => {
   async function data(){
   let leavesData = await getData(
    //   isAuthenticated().user.email,
    //   isAuthenticated().token,
    //   isAuthenticated().user.role,
      `/viewleaveuser/?isLectureApproved=false&page=2`
    )
    console.log("****990"+JSON.stringify(leavesData))
    setAllRequests(leavesData.leaves)
    console.log("999000"+allRequests)
    // .then((data) => setAllRequests(data.leaves)
   }
   data()
    // );
  }, [count]);
    console.log(allRequests);
    console.log(searchSort);
    return (
      <>
{/* {Header()} */}
        <div className="flex  gap-[80px] h-[90px] items-center justify-center ">
          <h2>List of Permssions </h2>
      
          <select
            name="status"
            className="shadow px-[20px] rounded-[40px]  font-[Avenirregular]  h-[35px]  "
            onChange={inputHandler("is_PermisssionGranted")}
          >
            <option value="0">Pending</option>
            <option value="1">Approve</option>
            <option value="2">Reject</option>
          </select>
      
          <button
            onClick={OnSubmit}
            className="px-[15px] py-[10px] rounded-md bg-primary text-[white]"
            type="submit"
          >
          
            Submit
          </button>
        </div>
        {allRequests &&
          allRequests.map((element) => (
            <PermssionCard
              isAdmin={true}
              subject={element.subject}
              tag={element.tag
              }
              img ={element.userId.photo.secure_url
              }
              name = {element.userId.firstName +" "+ element.userId.lastName }
              htno = {element.userId.htno+"-"}
              description={element.description}
              isApproved={element.is_PermisssionGranted}         
              userid={element.name}
              key ={element.name}
              from={element.fromDate}
              id={element._id}
              to={element.toDate}
            />
          ))}
<div className="flex gap-[50px] m-[10px]">

<div className="border-[2px] border-[black] rounded-[50%] cursor-pointer" onClick={()=>setCount(count-1)}  >
<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-arrow-left" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="#000000" fill="none" stroke-linecap="round" stroke-linejoin="round">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <line x1="5" y1="12" x2="19" y2="12" />
  <line x1="5" y1="12" x2="11" y2="18" />
  <line x1="5" y1="12" x2="11" y2="6" />
</svg>
</div>
<div className="border-[2px] border-[black] rounded-[50%] cursor-pointer"  onClick={()=>setCount(count+1)} >
<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-arrow-right" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="#000000" fill="none" stroke-linecap="round" stroke-linejoin="round">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <line x1="5" y1="12" x2="19" y2="12" />
  <line x1="13" y1="18" x2="19" y2="12" />
  <line x1="13" y1="6" x2="19" y2="12" />
</svg>
</div>
</div>
      </>
    );
 
}
