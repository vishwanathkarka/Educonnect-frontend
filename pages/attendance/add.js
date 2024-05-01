/* eslint-disable react/jsx-key */
/* eslint-disable react-hooks/rules-of-hooks */

import { useEffect } from "react";
import Attendaceui from "@/util/Ui/attendaceui";
import { postData, getData, isAuthenticated } from "@/util/apicalls";
import { useRouter } from "next/router";
import Image from "next/image";
import { useState } from "react";
import Header from "@/util/header";
import Loading from "@/util/loadingPage";

import toast, { Toaster } from "react-hot-toast";


// adding the attendance
function Add() {
  const router = useRouter();
  let i = null;
  const [userDataForAttendace, setUserDataForAttendace] = useState();
  const [attendace, setAttendace] = useState({ data: [] });
  const [departmentSection, setDepartmentSection] = useState({
    department: router.query.department,
    section: router.query.section,
  });
  const [dep, setdep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [departmentListFetch, setDepartmentListFetch] = useState();
  // const [sectionListFetch, setSectionListFetch] = useState(null);
  const { department, section } = router.query;
  console.log("deppp" + dep);

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push("/login");
    }

    if (isAuthenticated().user.role !== "lecturer") {
      router.push("/login");
    }

    if (
      router.query.department == undefined &&
      router.query.section == undefined
    ) {
      router.query.department =
        isAuthenticated().user.departments[0].department._id;
      router.query.section =
        isAuthenticated().user.departments[0].section[0]._id;
      router.push(router);
    }
    async function fetchdata() {
      let data = await postData(
        "/getalluserforattendance",
        { department: router.query.department, section: router.query.section },
        isAuthenticated().token
      );

      console.log("departmentSectiion" + JSON.stringify(departmentSection));
      console.log("stautsssss" + JSON.stringify(data));
      if (data.success == true) {
        setUserDataForAttendace(data.user);
        setLoading(true);
        console.log(userDataForAttendace);
      }
      if (isAuthenticated()) {
        let departmentlist = await postData(
          "/listdepartmentspecific",
          isAuthenticated().user.departments[0],
          isAuthenticated().token
        );
        if (departmentlist.success == true) {
          setDepartmentListFetch(departmentlist.listOfDepartment);
        }
      }
      let sectionlist = await getData("/listsection", isAuthenticated().token);
      // if (sectionlist.success == true) {
      //   setSectionListFetch(sectionlist.listOfSection);
      // }
      console.log(departmentListFetch);
    }
    fetchdata();
    setUser(isAuthenticated().user);
  }, [section, department]);

  const inputHandle = (name) => (el) => {
    const { section, department } = router.query;
    if (name == "department") {
      let splittedVal = el.target.value.split(",");
      setdep(splittedVal[1]);

      setDepartmentSection({
        ...departmentSection,
        [name]: splittedVal[0],
        section: splittedVal[2],
      });
      router.query.department = splittedVal[0];
      router.query.section = splittedVal[2];
      router.push(router);
      // console.log(el.target.value[1])
    } else {
      let splittedSectionData = el.target.value.split(",");
      setDepartmentSection({
        ...departmentSection,
        [name]: splittedSectionData[0],
      });
      console.log("depepartmentvaluee" + el.target.value);
      router.query.section = splittedSectionData[0];

      router.push(router);
    }
    console.log("999" + dep);
    console.log("Valuueee" + el.target.index);
    console.log(departmentSection);
    console.log(dep);
    console.log(el.target.ind);
  };

  async function attendanceSubmit() {
     
   let waiting =  toast.loading('Waiting...',{
    
    style: {
      borderRadius: '10px',
      background: '#333',
      color: '#fff',
    },
  })

    let da = await postData(
      "/bulkattendanceadd",
      attendace,
      isAuthenticated().token
    );
    if(da.success == true){
      toast.dismiss(waiting);
           toast.success("Added Attendance Successful",{
        
            style: {
              borderRadius: '10px',
              background: '#333',
              color: '#fff',
            }});
      }
      else{
        toast.error("Error In Adding Attendance",{
        
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
          }})
      }
  }

  

  function attendance(data) {
    console.log("DDDTTAAAAA" + JSON.stringify(data));
    if (attendace.data.length == 0) {
      attendace.data.push(data);
      console.log("kkk");
    } else {
      let iscontain = false;
      let updatedData = attendace.data.map((item) => {
        console.log("%%%%%" + item);
        if (item.userId == data.userId) {
          item.isPresent = data.isPresent;
          // setAttendace([...attendace,"attendace":item.attendace])
          console.log("hhh");
          iscontain = true;
        }
      });
      if (iscontain == false) {
        attendace.data.push(data);
        //  setAttendace([...attendace,{data}])
      }
    }

    console.log(attendace);
  }
  // const departmentList =()=>{

  //      user.departments.map((data) => {

  //                   return(  <option value={{"id":data.department._id,"index":i++}} key={data.department._id}>
  //                       {data.department.department}
  //                     </option> )
  //     })
  // }

  function activeSelect(option, status) {
    if (status == option) {
      return true;
    } else {
      return false;
    }
  }
  return (
    <>
      <Header />
      <Toaster position="top-center" />
      <div className=" flex items-center gap-3 px-3 ">
        <select
          name=""
          id=""
          className=" py-1.5 pl-7 pr-20 border-[1.5px]  border-lightblack  bg-secoundblack   rounded-md   text-white my-3"
          onChange={inputHandle("department")}
        >
          {router.query.department == undefined ? (
            <option selected>department ...</option>
          ) : (
            ""
          )}

          {user &&
            user.departments.map((data) => {
              return (
                <option
                  value={`${data.department._id},${i++},${
                    data.section[0]._id
                  },${data.section[0].section},${data.department.department}`}
                  key={data.department._id}
                  selected={activeSelect(
                    data.department._id,
                    router.query.department
                  )}
                >
                  {data.department.department}
                </option>
              );
            })}
        </select>
        <select
          className="py-1.5 pl-7 pr-20 border-[1.5px]  border-lightblack  bg-secoundblack   rounded-md   text-white my-3"
          onChange={inputHandle("section")}
        >
          {user &&
            user.departments[dep].section.map((data) => {
              return (
                <option
                  value={`${data._id},${data.section}`}
                  selected={activeSelect(data._id, router.query.section)}
                  key={data.section._id}
                >
                  {data.section}
                </option>
              );
            })}
        </select>
        <button
          className="bg-primarycolor text-white py-2 px-3 h-[2.5rem] rounded"
          onClick={attendanceSubmit}
        >
          submit
        </button>

        <button className=" border-[1.5px]  border-primarycolor p-2  bg-secoundblack   rounded-md   text-white my-3 " onClick={()=>router.push('/attendance')}>View Attendance </button>
      </div>
      {!loading ? (
        <Loading />
      ) : (
        userDataForAttendace.map((data) => {
          return (
            <Attendaceui
              name={data.firstName}
              img={data.photo.secure_url}
              section="CSE"
              date={new Date()}
              htno={data.htno}
              id={data._id}
              key={data._id}
              link="#"
              checked={true}
              attendnceData={attendance}
              isAddAttendance={true}
            />
          );
        })
      )}
    </>
  );
}

export default Add;
