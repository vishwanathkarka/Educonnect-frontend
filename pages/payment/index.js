import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getData, postData } from "@/util/apicalls";
function Payment() {
  const router = useRouter();
  const { section, department } = router.query;
  const [sectionListFetch, setSectionListFetch] = useState(null);
  const [departmentListFetch, setDepartmentListFetch] = useState(null);

  function findDepartment() {
    console.log(department);
    if (departmentListFetch) {
      if (department == undefined) {
        return departmentListFetch[0]._id;
      }
    }
    for (let item in departmentListFetch) {
      if (department.toUpperCase() == departmentListFetch[item].department) {
        console.log("*****" + departmentListFetch[item].department);
        return departmentListFetch[item]._id;
      }
    }
  }

  function findSection() {
    {
      if (sectionListFetch) {
        if (section == undefined) {
          return sectionListFetch[0]._id;
        }
      }
      for (let item in sectionListFetch) {
        if (section.toUpperCase() == sectionListFetch[item].section) {
          console.log("*****" + sectionListFetch[item].section);
          return sectionListFetch[item]._id;
        }
      }
    }
  }
  console.log("^^^^^888" + findDepartment());
  useEffect(() => {
    async function fetch() {
      let sectionlist = await getData("/listsection");
      if (sectionlist.success == true) {
        setSectionListFetch(sectionlist.listOfSection);
      }
      let departmentlist = await getData("/listdepartment");
      if (departmentlist.success == true) {
        setDepartmentListFetch(departmentlist.listOfDepartment);
      }
    }
    fetch();
  }, []);
  useEffect(() => {
  
  let data =  postData("/getalluserforattendance",{"department":findDepartment()})
  console.log("USERRRR"+JSON.stringify(data))
  }, []);
  console.log(sectionListFetch);

  return (
    <>
      <div className="flex gap-3">
        <div>
          <p>Department</p>
          <select
            name=""
            id=""
            className="block  rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          >
            <option selected className=" ">
              select department
            </option>
            {departmentListFetch &&
              departmentListFetch.map((data) => (
                <option
                  value={data._id}
                  key={data._id}
                  selected={findDepartment() == data._id ? true : false}
                >
                  {data.department}
                </option>
              ))}
          </select>
        </div>
        <div>
          <p>Department</p>
          <select
            name=""
            id=""
            className="block  rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 "
          >
            {sectionListFetch &&
              sectionListFetch.map((data) => (
                <option
                  value={data._id}
                  key={data._id}
                  selected={findSection() == data._id ? true : false}
                >
                  {data.section}
                </option>
              ))}
          </select>

          
        </div>
      </div>
    </>
  );
}

export default Payment;
