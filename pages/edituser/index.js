import { useEffect, useState } from "react";
import { getData, isAuthenticated, updateData } from "@/util/apicalls";
import { useRouter } from "next/router";
import Image from "next/image";
import UserDataEdit from "@/util/userDataEdit";
import Header from "@/util/header";
import Loading from "@/util/loadingPage";
import AdminCard from "@/util/AdminCard";
import NoResult from "../../util/no-content.png"


export default function Index() {
  const router = useRouter();
  const [departmentListFetch, setDepartmentListFetch] = useState();
  const [sectionListFetch, setSectionListFetch] = useState(null);
  const [userSeleceted, setUserSelected] = useState(null);
  const [role, setRole] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [isloading, setIsLoading] = useState(false);

  useEffect(() => {
    if (
      router.query.department == undefined &&
      router.query.section == undefined &&
      router.query.role == undefined
    ) {
      router.query.department =
        isAuthenticated().user.departments[0].department._id;
      router.query.section =
        isAuthenticated().user.departments[0].section[0]._id;
      router.query.role = "student";
      router.push(router);
    }
    async function fetchDepartment() {
      if (isAuthenticated().user.role != "Admin") {
        router.push("/");
      }

      // fetching the department from api
      if (isAuthenticated().user.role == "Admin") {
        let departmentlistobj = await getData(
          "/listdepartment",
          isAuthenticated().token
        );
        let departmentlist = departmentlistobj;
        if (departmentlist.success == true) {
          setDepartmentListFetch(departmentlist.listOfDepartment);
        }
      }
    }
    fetchDepartment();
    async function fetchSection() {
      if (isAuthenticated().user.role == "Admin") {
        // fetching the department from api
        let sectionlist = await getData(
          "/listsection",
          isAuthenticated().token
        );
        if (sectionlist.success == true) {
          setSectionListFetch(sectionlist.listOfSection);
        }
      }
    }

    fetchSection();
  }, []);

  useEffect(() => {
    const userData = async () => {
      setIsLoading(true);
      const data = await getData(
        `/getusersforadmin/${router.query.department}/${router.query.section}/${router.query.role}`,
        isAuthenticated().token
      );
      setUserInfo(data);
      if (data.success == true) {
        setIsLoading(false);
      }
    };
    router.query.department && router.query.section && userData();
  }, [router.query.department, router.query.section, router.query.role]);
  const handleInput = (name) => (el) => {
    setUserSelected({ ...userSeleceted, [name]: el.target.value });
    // router.push(name,el.target.value)

    if (name == "department") {
      router.query.department = el.target.value;
      router.push(router);
    } else if (name == "section") {
      router.query.section = el.target.value;
      router.push(router);
    } else {
      router.query.role = el.target.value;
      router.push(router);
    }

    router.push(router);

    console.log(userInfo);
    // const { page, status } = router.query;
    console.log(userSeleceted);
  };

  const onSubmitForm = (el) => {
    el.preventDefualt;
  };
  function activeSelect(option, status) {
    if (status == option) {
      return true;
    } else {
      return false;
    }
  }
  const viewFormSet = () => {
    setViewForm(false);
  };
  return (
    <>
      <Header />
      <div className="min-h-[100vh]">
        <div className="flex gap-3 px-3 bg-black ">
          <select
            className="block w-full rounded-md border-0 bg-secoundblack py-1.5 text-white pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 my-4"
            id="Department"
            onChange={handleInput("department")}
            // value={departments}
          >
            <option selected>Choose Department ...</option>
            {console.log("::::::::" + JSON.stringify(departmentListFetch))}
            {departmentListFetch &&
              departmentListFetch.map((data) => (
                <option
                  value={data._id}
                  selected={activeSelect(data._id, router.query.department)}
                  key={data._id}
                >
                  {data.department}
                </option>
              ))}
          </select>
          <select
            className="block w-full rounded-md border-0 bg-secoundblack text-white py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 my-4"
            id="section"
            onChange={handleInput("section")}
          >
            <option selected>Choose Section ...</option>

            {sectionListFetch &&
              sectionListFetch.map((data) => (
                <option
                  value={data._id}
                  selected={activeSelect(data._id, router.query.section)}
                  key={data._id}
                >
                  {data.section}
                </option>
              ))}
          </select>
          <select
            className="block w-full rounded-md border-0 bg-secoundblack text-white py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 my-4"
            id="role"
            onChange={handleInput("role")}
          >
            <option selected>Choose Role ...</option>
            <option
              value="student"
              key="student"
              selected={activeSelect("student", router.query.role)}
            >
              student
            </option>
            <option
              value="lecturer"
              key="lecturer"
              selected={activeSelect("lecturer", router.query.role)}
            >
              lecturer
            </option>
            <option
              value="parent"
              key="parent"
              selected={activeSelect("parent", router.query.role)}
            >
              Parent
            </option>
          </select>
        </div>
        {!isloading && (
          <div className="flex">
            {userInfo &&
              userInfo.user.map((user) => (
                <>
                  {" "}
                  <AdminCard
                    key={user._id}
                    photo={user.photo.secure_url}
                    name={user.firstName}
                    // closeForm={formViewStatus}
                    email={user.email}
                    role={user.role}
                    parentEmail={user.parentEmail}
                    htno={user.htno}
                    phoneNo={user.phoneNo}
                    id={user._id}
                    departments={user.departments}
                    viewForm={viewFormSet}
                    departmentListFetch={departmentListFetch}
                    sectionListFetch={sectionListFetch}
                  />
                {console.log("----"+user._id)}
                </>
              ))}
              {
                 userInfo &&   userInfo.user.length ==0  && (
                <div className="h-[100vh] mt-[2rem] m-auto">

                  <Image src = {NoResult} width={200} height={300} alt="result not found" ></Image>
                  <p className="text-white text-center">No Result Found</p>
                </div>

                  
                   )
                }
          </div>
        )}

        {isloading && <Loading />}
      </div>{" "}
    </>
  );
}
