// import React,{useState,useEffect} from 'react'
import { useEffect } from "react";
import { useState } from "react";
import { postDataForm, getData } from "../util/apicalls";
import { useRouter } from "next/router";
var FormData = require("form-data");

const Signup = () => {
  const router = useRouter();
  // for sending imag
  const [img, setImg] = useState(null);
  // destructuring data
  const userInput = {
    firstName: "",
    password: "",
    lastName: "",
    email: "",
    role: "",
    parentEmail: "",
    parentPhoneNo: "",
    studentEmail:""
  };
  const [userData, setUserData] = useState(userInput);
  // for the fetching department form api
  const [departmentListFetch, setDepartmentListFetch] = useState();
  const [sectionListFetch, setSectionListFetch] = useState(null);

  useEffect(() => {
    async function fetchDepartment() {
      // fetching the department from api
      if(role == "student"){
      let departmentlistobj = await getData("/listdepartment");
      let departmentlist = departmentlistobj;
      console.log(")))))))))" + departmentlist);
      if (departmentlist.success == true) {
        setDepartmentListFetch(departmentlist.listOfDepartment);

        console.log("^^^^^^^^" + departmentlist);
      }
    }
    }
    fetchDepartment();
    async function fetchSection() {
      if(role == "student"){
      // fetching the department from api
      let sectionlist = await getData("/listsection");
      if (sectionlist.success == true) {
        setSectionListFetch(sectionlist.listOfSection);
      }
    }
    }

    fetchSection();
  }, [userData]);

 

  // mapping all the department data from the api get request

  // optionOfSection(sectionListFetch)
  // optionOfSelction(sectionListFetch)
  // creating formdata
  let bodyFormData = new FormData();

  const {
    firstName,
    password,
    lastName,
    role,
    parentEmail,
    parentPhoneNo,
    email,
    phoneNo,
    section,
    departments,
    studentEmail
  } = userData;
  const handleInput = (name) => (el) => {
    if (name != "photo") {
      setUserData({ ...userData, [name]: el.target.value });
      console.log(el.target.value);
      bodyFormData.append(name, el.target.value);
    } else {
      setImg(el.target.files[0]);
    }
  };
  // console.log(userData);

  const handleSubmit = async (el) => {
    el.preventDefault();
    console.log(JSON.stringify(userData));
    console.log(userData);
    bodyFormData.append("data", JSON.stringify(userData));
    bodyFormData.append("photo", img);
    // const data = await postData("/signup",userData)
    const data = await postDataForm("/signup", bodyFormData);
    console.log(data);
  };
  return (
    <>
      <div className=" flex  justify-center align-middle  bg-slate-50">
        <form
          className="w-[35rem]  h-[90vh] m-auto bg-white p-[1rem]"
          onSubmit={handleSubmit}
          enctype="multipart/form-data"
        >
          <h2 className="text-center">Signup</h2>
          <input
            type="text"
            class="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6  my-4"
            placeholder="First Name"
            onChange={handleInput("firstName")}
            value={firstName}
          />
          <input
            type="text"
            class="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6  my-4"
            placeholder="Last Name"
            onChange={handleInput("lastName")}
            value={lastName}
          />
           <select
            className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 my-4"
            id="role"
            onClick={console.log("Clicked uppp")}
            onChange={handleInput("role")}
            value={role}
          >
            <option selected>Choose Role ...</option>
            <option value="student">student</option>
            <option value="parent">parent</option>
          </select>

          <input
            type="email"
            class="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 my-4"
            placeholder="youremail@gmail.com"
            onChange={handleInput("email")}
            value={email}
          />

          <input
            type="file"
            class="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 my-4"
            placeholder="youremail@gmail.com"
            multiple
            onChange={handleInput("photo")}
          />

         

          <input
            type="email"
            class="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 my-2"
            placeholder={role=="student" ? "parentemail@gmail.com":"studentemail@gmail.com"}
            onChange={handleInput(role=="student"?"parentEmail":"studentEmail")}
            value={role=="student"?parentEmail:studentEmail}
          />
           <label for="" className="text-slate-500 mx-2 text-sm">
            Note: {role=="student" ? "Enter Parent email id":"Enter Student email"}
          </label>
          <input
            type="password"
            class="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 my-4"
            placeholder="*************"
            onChange={handleInput("password")}
            value={password}
          />
          <input
            type="text"
            maxLength="10"
            class="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 my-1"
            placeholder="999999999999"
            onChange={handleInput("phoneNo")}
            value={phoneNo}
          />
          <label for="" className="text-slate-500 mx-2 text-sm">
            Note: Enter your phone
          </label>
          <input
            type="text"
            maxLength="10"
            class="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 my-1"
            placeholder="999999999999"
            onChange={handleInput("parentPhoneNo")}
            value={parentPhoneNo}
             disabled= {role == "parent"?true:false}
          />
          <label for="" className="text-slate-500 mx-2 text-sm">
            Note: Enter parent phone
          </label>
          <select
            className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 my-4"
            id="Department"
            onChange={handleInput("department")}
            value={departments} 
            disabled= {role == "parent"?true:false}
          >
            <option selected>Choose Department ...</option>
            {console.log("::::::::" + JSON.stringify(departmentListFetch))}
            {departmentListFetch &&
              departmentListFetch.map((data) => (
                <option value={data._id} key={data._id}>
                  {data.department}
                </option>
              ))}
          </select>
          <select
            className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 my-4"
            id="section" disabled= {role == "parent"?true:false}
            onChange={handleInput("section")}
            value={section}
          >
            <option selected>Choose Section ...</option>

            {sectionListFetch &&
              sectionListFetch.map((data) => (
                <option value={data._id} key={data._id}>
                  {data.section}
                </option>
              ))}
          </select>
          <button
            className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20  my-4 bg-indigo-600 text-white "
            type="submit"
          >
            {" "}
            Submit
          </button>
        </form>
      </div>
    </>
  );
};
export default Signup;
