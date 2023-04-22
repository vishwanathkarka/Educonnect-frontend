import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import Header from "@/components/header";
import { getData, postData,isAuthenticated } from "@/util/apicalls";
import Attendaceui from "@/util/attendaceui";
import PaymentAddForm from "@/components/paymentAddForm";
import PaymentUI from "@/util/paymentUI"
import loadingimg from "../../util/Spinner-1s-200px.gif";
function Payment() {
  const router = useRouter();
  let i = null;
  // console.log("600000" +  isAuthenticated().user.firstName);
  const [userDataForAttendace, setUserDataForAttendace] = useState();
  const [paymentFormView,setPaymentFormView] = useState(false)
  const [attendace, setAttendace] = useState({ data: [] });
  const [userCradational,setUserCradational] = useState(null)
  // const {role,email,_id} = userCradational
  const [departmentSection, setDepartmentSection] = useState({
    "department":router.query.department,
    "section":router.query.section
  });

  const [dep, setdep] = useState(0);
  // const {depIndex} = dep;
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [departmentListFetch, setDepartmentListFetch] = useState();
  const [userId, setUserId] = useState(null)
  const [sectionListFetch, setSectionListFetch] = useState(null);
 
 const {department,section}= router.query
  console.log("deppp" + dep);

  useEffect(() => {
    if(!isAuthenticated().user){
      router.push("/login")
    }
    else{
 setUserCradational(isAuthenticated().user.role);
   console.log("ROOLLLL"+isAuthenticated().user.role)
    async function fetchdata() {
      let data = await postData("/getalluserforattendance", 
         {  "department":router.query.department,
         "section":router.query.section},
         isAuthenticated().token
      );
      console.log("departmentSectiion" + JSON.stringify(departmentSection));
      console.log("stautsssss"+JSON.stringify(data));
    
      if (data.success == true) {
        setUserDataForAttendace(data.user);
        setLoading(true);
        console.log(userDataForAttendace);
      }
      // if (isAuthenticated()) {
      //   let departmentlist = await postData(
      //     "/listdepartmentspecific",
      //     isAuthenticated().user.departments[0]
      //   );
      //   if (departmentlist.success == true) {
      //     setDepartmentListFetch(departmentlist.listOfDepartment);
      //   }
      // }
      // let sectionlist = await getData("/listsection");
      // if (sectionlist.success == true) {
      //   setSectionListFetch(sectionlist.listOfSection);
      // }
      console.log(departmentListFetch);
    }
    const userPaymentInfo = async() =>{
  const userdata =    await getData(`/getpaymentlist/${isAuthenticated().user._id}`, isAuthenticated().token)
  if (userdata.success == true) {
    setUserDataForAttendace(userdata.paymentList);
    setLoading(true);
    console.log(userDataForAttendace);
  }
    }
isAuthenticated().user.role == "student" &&  userPaymentInfo()
    isAuthenticated().user.role == "lecturer" &&  fetchdata();
    setUser(isAuthenticated().user);
  }
  }, [section,department]);
  const inputHandle = (name) => (el) => {
    const { section, department } = router.query;
    if (name == "department") {
      let splittedVal = el.target.value.split(",");
      setdep(splittedVal[1]);

      setDepartmentSection({ ...departmentSection, [name]: splittedVal[0], "section":splittedVal[2] });
      router.query.department = splittedVal[0];
      router.query.section = splittedVal[2];
      router.push(router);
      // console.log(el.target.value[1])
    } else {
      
      let splittedSectionData = el.target.value.split(",")
      setDepartmentSection({ ...departmentSection, [name]: splittedSectionData[0]});
      console.log("depepartmentvaluee"+ el.target.value)
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
    let da = await postData("/bulkattendanceadd", attendace, isAuthenticated().token);
  }
function clickUserId(data){
  setUserId(data)
  setPaymentFormView(!paymentFormView)
}
  function attendance(data) {
    console.log("DDDTTAAAAA"+JSON.stringify(data));
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
const closeForm = (status) => {
if(status == true){
setPaymentFormView(!paymentFormView)
}
}
  function activeSelect (option ,status){
    if(status == option){
        return true
    }
    else{
        return false
    }
      }

      console.log("role"+userCradational)
  return (
    <>
    <Header/>
    {/* <div className="h-[100vh] flex items-center justify-center relative l-[50vw]">
  
    </div> */}
     
    {/* { <Add/>} */}
 { paymentFormView&& <PaymentAddForm sid={userId} closeForm={closeForm} /> }

  <div className="bg-secoundblack rounded-md h-[100vh]  mx-8 my-9   ">
  
    { userCradational && userCradational == "lecturer" &&  <div className=" flex items-center gap-3 px-3   ">
       <select
          name=""
          id=""
          className="block  rounded-md border-0 bg-lightblack text-lightwg py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6  my-4"
          onChange={inputHandle("department")}
        >
      {   router.query.department == undefined?  <option selected>department ...</option>:""}
         
          {user &&
            user.departments.map((data) => {
              return (
                <option
                  value={`${data.department._id},${i++},${data.section[0]._id},${data.section[0].section},${data.department.department}`}
                  key={data.department._id} 
                  selected={activeSelect(data.department._id,router.query.department)}
                >
                  {data.department.department}
                </option>
              );
            })}
        </select>
        <select
          className="block rounded-md border-0 py-1.5 bg-lightblack text-lightwg pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 my-4"
          onChange={inputHandle("section")}
        >
         
          {user &&
            user.departments[dep].section.map((data) => {
          return(    <option value={`${data._id},${data.section}`}
          selected={activeSelect(data._id,router.query.section)}
               key={data.section._id} >
                {data.section}
              </option> )
})}
        </select>
        <button
          className="bg-primarycolor text-white py-2 px-3 h-[2.5rem] rounded"
          onClick={attendanceSubmit}
        >
          Get
        </button>
      </div>}
      {userCradational == "lecturer" ?
       <div className="flex text-whitelight px-5 py-6 mx-4 my-0 gap-10     text-center border-b-[rgba(246,247,249,.05)] border-b-[1px] ">
      
       <p className="flex-[0.5]">Details</p>
       <p className="flex-[2]">Student Phone No</p>
       <p className="flex-[2]">Email</p>
     
     </div>:
      <div className="flex text-whitelight px-5 py-6 mx-4 my-3 gap-10   text-center border-b-[rgba(246,247,249,.05)] border-b-[1px] ">
        <p className="flex-[2]">Title</p>
        <p className="flex-[3]">Description</p>
        <p className="flex-[1]">Payment Id</p>
        <p className="flex-[1]">Amount</p>
        <p className="flex-[1]">Paid Date</p>
        <p className="flex-[1]">Last for payment</p>
        <p className="flex-[1]">Status</p>
      </div>
}
      {!loading ? (
        <div className="h-[80vh] flex justify-center items-center">
          <Image src={loadingimg} alt="" />
        </div>
      ) : (
        userDataForAttendace.map((data) => {
          return (
            userCradational == "lecturer"?
            <PaymentUI
              name={data.firstName+" "+ data.lastName}
              htno = {data.htno} 
              img={data.photo.secure_url}
              phoneno ={data.phoneNo} 
              email = {data.email}   
              userId = {clickUserId}
add = " "
              key ={data._id}
             
              link={userCradational == "lecturer"?`#`:`/payment/pay/${data._id}`}
            //   checked={true}
            //   attendnceData={attendance}
            />:
          
            // <Attendaceui
            //   name={data.description}
            //   // img={data.photo.secure_url}
            //   section="CSE"
            //   date={data.lastDay
            //   }
            //   // department = {data.departments[0].department.department}
            //   htno={data.amount+"/-"}
            // //   id={data._id}
            //   key ={data._id}
            //   link={userCradational == "lecturer"?`/payment/add/${data._id}`:`/payment/pay/${data._id}`}
            // //   checked={true}
            // //   attendnceData={attendance}
            // />

            <PaymentUI
            title={data.title}
            amount ={data.amount+"/-"}
            description={data.description}
            status={data.ispaid == true? true:data.paymentId ?false:""}
            key= {data._id}
            paiddate ={data.paidDate||"-"}
            paymentId = {data._id}
            lastday = {data.lastDay}
            link = {`/payment/pay/${data._id}`}
        payid = {data.paymentId}
            />

          );
        })
      )}
      </div>
    </>
  );
}

export default Payment;
