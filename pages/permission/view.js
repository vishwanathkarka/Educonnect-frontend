import React, { useEffect, useState } from "react";
import Image from "next/image";
import NoResultFound from "../../util/no-content.png"
import { useRouter } from "next/router";
import ResultNotFound from "@/util/resultNotFound";
// import Header from "../core/Header";
import PermssionCard from "@/util/permssionCard";
// import { GetAllPermissions } from "./helper/permissioncalls";
import { getData, postData, isAuthenticated } from "@/util/apicalls";
export default function AdminAllPermission() {
  const router = useRouter();
  const { page, status } = router.query;
  //   console.log("pageeee"+page +"8899000"+age)

  const [newRequest, setNewRequest] = useState(false);
  const [isView, setIsView] = useState(true);
  const [count, setCount] = useState(1);
  const [allRequests, setAllRequests] = useState();
  
  const [searchSort, setSearchSort] = useState({
    is_PermisssionGranted: 0,
    search: null,
    section: null,
  });

 // next page moving function 
function pageShifting(operation){
    if(operation == "Add"){
router.query.page = parseInt(page)+1;
    router.push(router)
    }
    else if(operation == "Sub"){
        if(page>0){
            router.query.page = parseInt(page)-1;
            router.push(router) 
        }
    }
}


  const inputHandler = (user) => (event) => {
    // setSearchSort({ ...searchSort, [user]: event.target.value });
    let value = event.target.value;
    router.query.status = value;
    router.push(router) 
  }
  const OnSubmit = (el) => {
    //     el.preventDefault();
    //      GetAllPermissions(isAuthenticated().user.email,isAuthenticated().token,isAuthenticated().user.role,`/?is_PermisssionGranted=${is_PermisssionGranted} ${search?`&search=${search}`:""}`).then(data=>(setAllRequests(data.products) ))
  };

  const { is_PermisssionGranted, search, section } = searchSort;

  useEffect(() => {
    async function data() {
      let roleDataFecth;
      if (isAuthenticated().user.role == "lecture") {
        if (status == "success") {
          roleDataFecth = "isLectureApproved=1";
        } else if (status == "reject") {
          roleDataFecth = "isLectureApproved=2";
        } else if (status == "pending") {
          roleDataFecth = "isLectureApproved=0";
        } else {
          roleDataFecth = "isLectureApproved=0";
        }
      } else if (isAuthenticated().user.role == "parent") {
        if (status == "success") {
          roleDataFecth = "isParentApproved=1";
        } else if (status == "reject") {
          roleDataFecth = "isParentApproved=2";
        } else if (status == "pending") {
          roleDataFecth = "isParentApproved=0";
        } else {
          roleDataFecth = "isParentApproved=0";
        }
      }
      else if(isAuthenticated().user.role == "student"){
        if (status == "pending") {
            roleDataFecth = "isLectureApproved=0&isParentApproved[lte]=2";
          }
          else if(status == "success"){
            roleDataFecth = "isLectureApproved=1&isParentApproved=1 ";
          }
          else if(status == "reject"){
            roleDataFecth = "isLectureApproved=2&isParentApproved=2&isParentApproved=1";
          }
      }
      console.log("@@@@@" + status);
      let leavesData = await getData(
        //   isAuthenticated().user.email,
        //   isAuthenticated().token,
        //   isAuthenticated().user.role,
        //   `/viewleaveuser/?${isAuthenticated().user.role == "lecture"?`isLectureApproved=${status=="success"?"1":status=="reject"?"2":"0"}`:`isParentApproved=${status=="success"?"1":status=="reject"?"2":"0"}}`}isLectureApproved=1&page=${page}`
        `/viewleaveuser/?${roleDataFecth}&page=${page}`
      );
      console.log("****990" + JSON.stringify(leavesData));
      setAllRequests(leavesData.leaves);
      console.log("999000" + allRequests);
      // .then((data) => setAllRequests(data.leaves)
    }
   page  && data();
    // );
  }, [page,status,count]);
  console.log(allRequests);
  console.log(searchSort);
  function activeSelect (option){
if(status == option){
    return true
}
else{
    return false
}
  }
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
          <option value="pending" selected={activeSelect("pending")} >Pending</option>
          <option value="success" selected={activeSelect("success")} >Approve</option>
          <option value="reject" selected={activeSelect("reject")}>Reject</option>
        </select>

        <button
          onClick={OnSubmit}
          className="px-[15px] py-[10px] rounded-md bg-primary text-[white]"
          type="submit"
        >
          Submit
        </button>
      </div>
      <div className="h-[80vh]">
        {
        allRequests &&  allRequests.length==0?
            (<ResultNotFound/> ):""
        }
      {allRequests &&
        allRequests.map((element) => (
          <PermssionCard
            isAdmin={true}
            subject={element.subject}
            tag={element.tag}
            img={element.userId.photo.secure_url}
            name={element.userId.firstName + " " + element.userId.lastName}
            htno={
              element.userId.htno +
              " - " +
              element.userId.departments[0].department.department
            }
            description={element.description}
            //   isApprovedParent={element.isParentApproved}
            //   isApprovedLecture = {element.isLectureApproved}
            isApproved={
              isAuthenticated().user.role == "lecture"
                ? element.isLectureApproved
                : isAuthenticated().user.role == "parent"
                ? element.isParentApproved
                : isAuthenticated().user.role == "student"?( element.isLectureApproved ==0 || element.isParentApproved ==0 )?0:(element.isLectureApproved == 1 && element.isParentApproved ==1)?1 :2:""
            }
            userid={element.userId}
            key={element.userId}
            from={element.fromDate}
            id={element._id}
            to={element.toDate}
          />
        ))}
        </div>
      <div className="flex gap-[50px] m-[10px]  ">
        <div
          className="border-[2px] border-[black] rounded-[50%] cursor-pointer"
          onClick={() => {pageShifting("Sub")}}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="icon icon-tabler icon-tabler-arrow-left"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="#000000"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <line x1="5" y1="12" x2="19" y2="12" />
            <line x1="5" y1="12" x2="11" y2="18" />
            <line x1="5" y1="12" x2="11" y2="6" />
          </svg>
        </div>
        <div
          className="border-[2px] border-[black] rounded-[50%] cursor-pointer"
        //   onClick={() => setCount(count + 1)}
        onClick={() => {pageShifting("Add")}}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="icon icon-tabler icon-tabler-arrow-right"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="#000000"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <line x1="5" y1="12" x2="19" y2="12" />
            <line x1="13" y1="18" x2="19" y2="12" />
            <line x1="13" y1="6" x2="19" y2="12" />
          </svg>
        </div>
      </div>
    </>
  );
}
