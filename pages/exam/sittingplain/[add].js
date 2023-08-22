import { useRouter } from "next/router";
import Image from "next/image";
import { getData, isAuthenticated, postData } from "../../../util/apicalls";
import { useEffect, useState } from "react";
import Header from "@/util/header";
function AddSitting() {
  const router = useRouter();
  const [userData, setUserData] = useState(null);
  const [departments, setDepartments] = useState();
  const [marksDetail, setMarkDetail] = useState(null);
  const [sittingDetail, setSittingDetail] = useState(null);
  const [isloading, setIsLoading] = useState(false);
  console.log(router.query.user);
  useEffect(() => {
    if (isAuthenticated().user.role !== "lecturer") {
      router.push("/login");
    }
    if (!isAuthenticated()) {
      router.push("/login");
    }

    async function fetchdata() {
      let data = await getData(
        `/getuserinfowithid/${router.query.user}`,
        isAuthenticated().token
      );

      setUserData(data);
      console.log(data);
      setDepartments(isAuthenticated().user.departments);
      console.log(isAuthenticated().user.departments);
    }
    router.query.user && fetchdata();
  }, [router, router.query.user]);

  function activeSelect(option, status) {
    if (status == option) {
      return true;
    } else {
      return false;
    }
  }

  const handleInput = (name) => (el) => {
    setSittingDetail({ ...sittingDetail, [name]: el.target.value });
  };

  //       "outOfMarks":50,
  // "subject":"web devlopment",
  // "studentMarks":50,
  // "userId":"63e12e165aae5db72f8f4afb"
  const handleSubmit = async (el) => {
    el.preventDefault();
    const data = postData(
      "/addSittingArrangement",
      {
        userId: router.query.add,
        roomno: sittingDetail.roomno,
        noOfRow: sittingDetail.noOfRow,
        noOfCol: sittingDetail.noOfCol,
        examDate: sittingDetail.examDate,
        row: sittingDetail.row,
        col: sittingDetail.col,
        examName: sittingDetail.examName,
      },
      isAuthenticated().token
    );
    if (data) {
      router.push("/exam/sittingplain");
    }
  };
  return (
    <>
      <Header />
      <div className="h-[90vh] flex justify-center items-center">
        <form
          className="w-[35rem]  h-[50vh] m-auto bg-secoundblack rounded-xl p-[1rem]"
          onSubmit={handleSubmit}
          enctype="multipart/form-data"
        >
          {/* <select
       className="block rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 my-4"
    //    onChange={inputHandle("section")}
     >
        {
departments&& departments.map((data) => {
              return (
                <option
                  value={``}
                  key={data.department._id} 
                //   selected={activeSelect(data.department._id,router.query.department)}
                >
                  {data.department.department}
                </option>
              );
            })}
            </select> */}
          {/* <h2 className="text-center ">Add Fee </h2> */}
          {userData ? (
            <div className="">
              {" "}
              <Image
                src={userData.user.photo.secure_url}
                className="rounded-[50%] m-auto  border-lightwg border-[2px]"
                alt="person"
                width={100}
                height={100}
              ></Image>{" "}
            </div>
          ) : (
            ""
          )}
          {userData && (
            <p className="text-center text-white mt-2">
              {userData.user.firstName + " " + userData.user.lastName}
            </p>
          )}
          {userData && (
            <p className="text-center text-white mt-2">
              {userData.user.departments[0].department.department}
            </p>
          )}
          <input
            type="text"
            class=""
            placeholder="Exam Name"
            className="block w-full py-1.5 pl-7 pr-20 border-[1.5px] my-3  border-lightblack  bg-secoundblack   rounded-md   text-white"
            onChange={handleInput("examName")}
            // value={lastName}
          />

          <input
            type="text"
            class="block w-full py-1.5 pl-7 pr-20 border-[1.5px] my-3  border-lightblack   bg-secoundblack   rounded-md   text-white"
            placeholder="Room Number"
            onChange={handleInput("roomno")}
            // value={firstName}
          />
          <input
            type="Number"
            class="block w-full py-1.5 pl-7 pr-20 border-[1.5px] my-3  border-lightblack my-2  bg-secoundblack   rounded-md   text-white"
            placeholder="No Of Row"
            onChange={handleInput("noOfRow")}
            // value={lastName}
          />
          <input
            type="Number"
            class=""
            placeholder="No Of Col"
            className="block w-full py-1.5 pl-7 pr-20 border-[1.5px] my-3  border-lightblack my-2  bg-secoundblack   rounded-md   text-white"
            onChange={handleInput("noOfCol")}
            // value={lastName}
          />
          <input
            type="date"
            class=""
            placeholder="No Of Col"
            className="block w-full py-1.5 pl-7 pr-20 border-[1.5px] my-3  border-lightblack my-2  bg-secoundblack   rounded-md   text-white"
            onChange={handleInput("examDate")}
            // value={lastName}
          />

          <input
            type="Number"
            class=""
            placeholder="student sitting place in row"
            className="block w-full py-1.5 pl-7 pr-20 border-[1.5px] my-3  border-lightblack my-2  bg-secoundblack   rounded-md   text-white"
            onChange={handleInput("row")}
            // value={lastName}
          />

          <input
            type="Number"
            class=""
            placeholder="student sitting place in col"
            className="block w-full py-1.5 pl-7 pr-20 border-[1.5px] my-3  border-lightblack my-2  bg-secoundblack   rounded-md   text-white"
            onChange={handleInput("col")}
            // value={lastName}
          />

          <button
            className="block w-full bg-primarycolor rounded-md border-0 py-1.5 pl-7 pr-20  my-4 bg-indigo-600 text-white "
            type="submit"
          >
            {" "}
            Submit
          </button>
        </form>
      </div>
    </>
  );
}

export default AddSitting;
