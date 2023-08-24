/* eslint-disable react/jsx-key */
/* eslint-disable react-hooks/rules-of-hooks */

import { useEffect } from "react";
import ListStudent from "@/util/listStudent";
import moment from "moment";

import { postData, getData, isAuthenticated } from "@/util/apicalls";
import { useRouter } from "next/router";
import Loading from "@/util/loadingPage";
import Image from "next/image";

import { useState } from "react";
import Header from "@/util/header";
function Sittingplain() {
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
  const [sectionListFetch, setSectionListFetch] = useState(null);
  const { department, section } = router.query;
  console.log("deppp" + dep);
  

  useEffect(() => {
    // redirecting to the login page if not login
    if (!isAuthenticated()) {
      router.push("/login");
    }
    
    async function fetchdata() {
      // redirecting to the login page if not lecturer 
      if (isAuthenticated().user.role !== "lecturer") {
        router.push("/login");
      }

      if (
        router.query.department == undefined &&
        router.query.section == undefined
      ) {
        // default department selected
        router.query.department =
          isAuthenticated().user.departments[0].department._id;
           // default section selected
        router.query.section =
          isAuthenticated().user.departments[0].section[0]._id;
          // pushed to the url
        router.push(router);
      }


      // getting the user list from the query url
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

      // getting the section list
      let sectionlist = await getData("/listsection", isAuthenticated().token);
      if (sectionlist.success == true) {
        setSectionListFetch(sectionlist.listOfSection);
      }
      console.log(departmentListFetch);
    }
    isAuthenticated() && fetchdata();
    setUser(isAuthenticated().user);
  }, [section, department]);

// handling the input & change in the attendance 
  const attendanceInputHandling = (name) => (el) => {
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
    } else {
      let splittedSectionData = el.target.value.split(",");
      setDepartmentSection({
        ...departmentSection,
        [name]: splittedSectionData[0],
      });
   
      router.query.section = splittedSectionData[0];

      router.push(router);
    }
    console.log("999" + dep);
    console.log("Valuueee" + el.target.index);
    console.log(departmentSection);
    console.log(dep);
    console.log(el.target.ind);
  };

  // async function attendanceSubmit() {
  //   let da = await postData(
  //     "/bulkattendanceadd",
  //     attendace,
  //     isAuthenticated().token
  //   );
  // }

  // function attendance(data) {
  //   console.log("DDDTTAAAAA" + JSON.stringify(data));
  //   if (attendace.data.length == 0) {
  //     attendace.data.push(data);
  //     console.log("kkk");
  //   } else {
  //     let iscontain = false;
  //     let updatedData = attendace.data.map((item) => {
  //       console.log("%%%%%" + item);
  //       if (item.userId == data.userId) {
  //         item.isPresent = data.isPresent;
  //         // setAttendace([...attendace,"attendace":item.attendace])
  //         console.log("hhh");
  //         iscontain = true;
  //       }
  //     });
  //     if (iscontain == false) {
  //       attendace.data.push(data);
  //       //  setAttendace([...attendace,{data}])
  //     }
  //   }


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
      <div className=" flex items-center gap-3 px-3 bg-black rounded-2xl mx-2 justify-center my-2 ">
        <select
          name=""
          id=""
          className="py-1.5 pl-7 pr-20 border-[1.5px]   border-lightblack  bg-secoundblack   rounded-md   text-white"
          onChange={attendanceInputHandling("department")}
        >
          {router.query.department == undefined ? (
            <option selected>department ...</option>
          ) : (
            ""
          )}
          {}
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
          className="py-1.5 pl-7 pr-20 border-[1.5px]  border-lightblack my-3  bg-secoundblack   rounded-md   text-white"
          onChange={attendanceInputHandling("section")}
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
       
      </div>
      {!loading ? (
        <div className="h-[80vh] flex justify-center items-center">
          <Loading />
        </div>
      ) : (
        userDataForAttendace.map((data) => {
          return (
            <ListStudent
              name={data.firstName}
              img={data.photo.secure_url}
              section="CSE"
              // date={new Date()}
              department={data.departments[0].department.department}
              htno={data.htno}
              email={data.email}
              //   id={data._id}
              key={data._id}
              link={"/exam/sittingplain/" + data._id}
              //   checked={true}
              //   attendnceData={attendance}
            />
          );
        })
      )}
    </>
  );
}

export default Sittingplain;
