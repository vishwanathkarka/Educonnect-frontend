import { useEffect, useState } from "react";
import { getData, isAuthenticated } from "@/util/apicalls";
import moment from "moment";
import Image from "next/image";
import { useRouter } from "next/router";
import ResultNotFound from "@/util/resultNotFound";
import Attendaceui from "@/util/Ui/attendaceui";
import resultNotFound from "../../util/no-content.png";
import Header from "@/util/header";
import toast, { Toaster } from "react-hot-toast";


function View() {
  const [attendances, setAttendances] = useState();
  const [lecAddedAtt,setLecAddedAtt] = useState();
  const [todayDate,setTodayDate] = useState(null);
  const router = useRouter();

  const dateAdd = () =>{
  let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); 
    let yyyy = today.getFullYear();
    
    today =  yyyy +'-'+ mm +'-'+ dd ;
    setTodayDate(today)
  }

  async function fetchAttLec(id,date){

    console.log(router.query.date)
    date = router.query.date != undefined ? router.query.date:date
    let data = await getData(`/getLectureradedatt/${id}?date=${date}`,  isAuthenticated().token)
    if(data.success == true){
    setLecAddedAtt(data.att)
    }
    console.log(data)
        }

  useEffect(() => {
    dateAdd()
    console.log(todayDate)
    if (!isAuthenticated()) {
      router.push("/login");
    }

    async function fetchData(userid) {
      let data = await getData(
        `/getindividualattendance/${userid}`,
        isAuthenticated().token
      );

      console.log(isAuthenticated().user._id);
      console.log(data);
      if (data && data.success == true) {
        setAttendances(data.att);
      }
    }
    
   
   
    

    isAuthenticated().user.role == "student" &&
      fetchData(isAuthenticated().user._id);
    isAuthenticated().user.role == "parent" &&
      fetchData(isAuthenticated().user.student_id._id);

      todayDate!=null && isAuthenticated().user.role == "lecturer"  && 
    fetchAttLec(isAuthenticated().user._id,todayDate)
    
  }, [router,todayDate]);

  // handling the date by user input
const handleDate = (date) =>{
  fetchAttLec(isAuthenticated().user._id,date)
  router.query.date = date;
  router.push(router)
}
  
  const date = new Date();
  const futureDate = date.getDate() + 3;
  date.setDate(futureDate);
  const defaultValue = date.toLocaleDateString('en-IN');
  return (
    <>
      <Header />

      <div className="min-h-[90vh]">
        <div className="flex gap-5">
        <input type="date" defaultValue={router.query.date} className="block  mt-3 ml-5 rounded-md border-lightblack border-[2px]  py-1.5 pl-7 pr-20  text-white text-lightblack-900 ring-1 ring-inset ring-lightblack-300 placeholder:text-gray-400 focus:ring-2 bg-secoundblack focus:ring-inset focus:ring-lightblack-600  sm:text-sm sm:leading-6  mb-2" onChange={(el)=>{handleDate(el.target.value)}} />
        <button onClick={()=> router.push('attendance/add')} className="  border-[1.5px]  border-primarycolor p-2  bg-secoundblack   rounded-md   text-white my-3 ">Add Attendance</button>
        </div>
        {attendances && attendances.length == 0 ? <ResultNotFound /> : ""}
<table className="w-[12rem]">
        {attendances &&
          attendances.map((attendance) => {
            return (
              <Attendaceui
                htno={moment(attendance.timeStamp).format("MMM Do YY")}
                key={attendance._id}
                link="#"
                isPresent={attendance.isPresent}
                isAttendaceview={true}
                name={attendance.lectureId.firstName}
              />
            );
          })}
          
          </table>
          {lecAddedAtt && lecAddedAtt.length == 0  && (
            <div className="h-[70vh] w-[90vw] m-auto text-center flex justify-center  flex-col items-center ">
<Image  src={resultNotFound} alt ="Result Not Found" height={150} width={190} ></Image>
<p className="text-white">No Result Found</p>
            </div>
          )}
<table className="w-[100vw]  md:w-[90vw] m-auto text-center mt-5 overflow-x-auto">

{lecAddedAtt &&
          lecAddedAtt.map((attendance) => {
            return (
              <Attendaceui
              department={attendance.userId.htno}
                key={attendance._id}
                link="#"
                isPresent={attendance.isPresent}
                isAttendaceview={true}

                 img = {attendance.userId.photo.secure_url}
                rollno = {attendance.userId.htno}
                name={attendance.userId.firstName}
                flexclass = {"flex-col"}
              />
            );
          })}
          </table>
      </div>
    </>
  );
}

export default View;
