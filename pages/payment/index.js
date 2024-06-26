import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import Header from "@/util/header";
import { getData, postData, isAuthenticated } from "@/util/apicalls";
import NoContent from "../../util/no-content.png"
import Attendaceui from "@/util/Ui/attendaceui";
import PaymentAddForm from "@/util/Form/paymentAddForm";
import PaymentUI from "@/util/Ui/paymentUI";
import Loading from "@/util/loadingPage";

function Payment() {
  const router = useRouter();
  let i = null;
  // console.log("600000" +  isAuthenticated().user.firstName);
  const [userDataForAttendace, setUserDataForAttendace] = useState();
  const [paymentFormView, setPaymentFormView] = useState(false);
  const [attendace, setAttendace] = useState({ data: [] });
  const [userCradational, setUserCradational] = useState(null);
  const [viewPaymentAddingPage, setViewPaymentAddingPage] = useState(true);
  const [lecturerAddedPayment, setLecturerAddedPayment]  = useState(null)
  // const {role,email,_id} = userCradational
  const [departmentSection, setDepartmentSection] = useState({
    department: router.query.department,
    section: router.query.section,
  });



  const [dep, setdep] = useState(0);
  // const {depIndex} = dep;
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [departmentListFetch, setDepartmentListFetch] = useState();
  const [userId, setUserId] = useState(null);
  const [sectionListFetch, setSectionListFetch] = useState(null);

  const { department, section } = router.query;
  // console.log("deppp" + dep);

  useEffect(() => {
    if (!isAuthenticated().user) {
      router.push("/login");
    } else {
      if (
        router.query.department == undefined &&
        router.query.section == undefined
      ) {
        if(isAuthenticated().user.role !="parent" ){
        router.query.department =
         isAuthenticated().user.departments[0].department._id
        }
         else{
          router.query.department = isAuthenticated().user.student_id.departments[0].department._id
         }
         if(isAuthenticated().user.role !="parent" ){
        router.query.section =
        isAuthenticated().user.departments[0].section[0]._id
         }
         else{
        
          router.query.section = isAuthenticated().user.student_id.departments[0].section[0]._id;
         }
        router.push(router);

      }
      setUserCradational(isAuthenticated().user.role);

      async function fetchdata() {
        let data = await postData(
          "/getalluserforattendance",
          {
            department: router.query.department,
            section: router.query.section,
          },
          isAuthenticated().token
        );

        if (data.success == true) {
          setUserDataForAttendace(data.user);
          setLoading(true);
        }
      
      }

      const fetchAllLecturerAddedData = async()=>{
        // setLoading(true)
        const paymentData = await getData(`/viewpaymentstatuslecturer`,isAuthenticated().token)
        console.log(paymentData)
        if(paymentData.success == true){
          // setLoading(false)
          setLecturerAddedPayment(paymentData.paymentList)
        }
      }
      if(viewPaymentAddingPage == false && isAuthenticated().user.role == "lecturer"){
        fetchAllLecturerAddedData()
      }
      const userPaymentInfo = async (userid) => {
        const userdata = await getData(
          `/getpaymentlist/${userid}`,
          isAuthenticated().token
        );
        if (userdata.success == true) {
          setUserDataForAttendace(userdata.paymentList);
          setLoading(true);
        }
      };
      isAuthenticated().user.role == "student" &&
        userPaymentInfo(isAuthenticated().user._id);
      isAuthenticated().user.role == "parent" &&
        userPaymentInfo(isAuthenticated().user.student_id._id);
      isAuthenticated().user.role == "lecturer" &&  viewPaymentAddingPage == true && fetchdata();
      setUser(isAuthenticated().user);
    }
  }, [section, department,viewPaymentAddingPage]);
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

      router.query.section = splittedSectionData[0];

      router.push(router);
    }
  };

  //getting student id fromt the payment ui
  function clickUserId(data) {
    setUserId(data);

    setPaymentFormView(!paymentFormView);
  }
  function attendance(data) {
    if (attendace.data.length == 0) {
      attendace.data.push(data);
    } else {
      let iscontain = false;
      let updatedData = attendace.data.map((item) => {
        if (item.userId == data.userId) {
          item.isPresent = data.isPresent;
          // setAttendace([...attendace,"attendace":item.attendace])

          iscontain = true;
        }
      });
      if (iscontain == false) {
        attendace.data.push(data);
        //  setAttendace([...attendace,{data}])
      }
    }
  }
  const closeForm = (status) => {
    if (status == true) {
      setPaymentFormView(!paymentFormView);
    }
  };
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
      
      {paymentFormView && <PaymentAddForm sid={userId} closeForm={closeForm} />}

      <div className="bg-secoundblack rounded-md h-[100vh]  mx-8 my-9   ">
        {userCradational && userCradational == "lecturer" &&  (
          <div className=" flex items-center gap-3 px-3   ">
            <select
              name=""
              id=""
              className="block  rounded-md border-0 bg-lightblack text-lightwg py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6  my-4"
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
                      },${data.section[0].section},${
                        data.department.department
                      }`}
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
              className="block rounded-md border-0 py-1.5 bg-lightblack text-lightwg pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 my-4"
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
            <button className=" border-primarycolor border-[1.5px]  p-1 rounded-md text-white" onClick={()=>{setViewPaymentAddingPage(!viewPaymentAddingPage)}}> {viewPaymentAddingPage == true ?"View Status":"Add Payment"}</button>
        
          </div>
        )}
         {  userDataForAttendace ==undefined  && (
          <div className="h-[90vh] flex justify-center align-center flex-col items-center">
          <Image src={NoContent} width={500} height={100} alt="No Result Found" /> 
          <p className="text-white text-[3rem]">No Content Found</p>
          </div>
          
        )
        }
         {!loading && (
          <div className="h-[80vh] flex justify-center  items-center">
            <Loading />

          </div>
         
        ) }

<table className="w-[90vw] m-auto px-[20rem] my-8 ">
        {
       lecturerAddedPayment !=null &&   viewPaymentAddingPage == false &&  (
       
      
     
lecturerAddedPayment.map(data=> (

            <PaymentUI
                title={data.title}
                amount={data.amount + "/-"}
                description={data.description}
                status={
                  data.ispaid == true ? true : data.paymentId ? false : ""
                }
                img= {data.sid.photo.secure_url}
                htno={data.sid.htno}
                name ={data.sid.firstName}
                isPaid ={data.ispaid}
                key={data._id}
                payButton= {true}
                // paiddate={data.paidDate || "-"}
                paymentId={data._id}
                lastday={data.lastDay}
                link={'#'}
                payid={data.paymentId}
              />
            

))


           

          )
        }
        </table>
        
{ userDataForAttendace !=undefined && viewPaymentAddingPage == true &&  (
        <table className="w-[90vw] m-auto px-[20rem] my-8 ">
        <tbody>
        {userCradational == "lecturer" ? (
          <tr className=" rounded-md text-white text-center">
            <td className="">Photo</td>
            <td className="">Details</td>
            <td className="">Email</td>
            <td className="">Email</td>
            <td className="">Email</td>
          </tr>
        ) : (
          <tr className=" text-whitelight gap-10   text-center border-b-[rgba(246,247,249,.05)] border-b-[1px] ">
            <td className=" ">Title</td>
            <td className="">Description</td>
            <td className="">Paid Amount</td>
            <td className="">Paid Fee</td>
            <td className="">Last for payment</td>
            <td className="">Status</td>
          
          </tr>
        )}
       
       
       
        {loading &&  (
          userDataForAttendace.map((data) => {
            return userCradational == "lecturer" ? (
              <PaymentUI
                name={data.firstName + " " + data.lastName}
                htno={data.htno}
                img={data.photo.secure_url}
                phoneno={data.phoneNo}
                email={data.email}
                userId={clickUserId}
                add=" "
                id={data._id}
                key={data._id}
                link={
                  userCradational == "lecturer"
                    ? `#`
                    : `/payment/pay/${data._id}`
                }
                //   checked={true}
                //   attendnceData={attendance}
              />
            ) : (
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
                amount={data.amount + "/-"}
                description={data.description}
                status={
                  data.ispaid == true ? true : data.paymentId ? false : ""
                }
                isPaid ={data.ispaid}
                key={data._id}
                paiddate={data.paidDate || "-"}
                paymentId={data._id}
                lastday={data.lastDay}
                link={`/payment/pay/${data._id}`}
                payid={data.paymentId}
              />
            );
          })
        )}
         </tbody>
         </table>
)
}
      </div>
    </>
  );
}

export default Payment;
