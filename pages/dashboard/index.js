import Header from "@/util/header";
import Link from "next/link";
import { getData, isAuthenticated } from "@/util/apicalls";
import { useEffect, useState } from "react";
import moment from "moment";
import { useRouter } from "next/router";
import Loading from "@/util/loading";

const Dashboard = () => {
  const router = useRouter();
  const [homeworkcount, setHomeWorkCount] = useState(null);
  const [paymentPending, setPaymentPending] = useState(null);
  const [failedCount, setFailedCount] = useState(null);
  const [permissionPendingCount, setPermissionPendingCount] = useState(null);
  const [getTimetable, setGetTimetable] = useState(null);
  const [settingarragement, setSittingArragement] = useState(null);
  
  useEffect(() => {
    const getDatauser = async () => {
      console.log(
        isAuthenticated().role == "student"
          ? isAuthenticated().user._id
          : isAuthenticated().role == "parent"
          ? isAuthenticated().user.student_id._id
          : isAuthenticated().role == "lecturer"
          ? "/lecturer/" + isAuthenticated().user._id
          : ""
      );
      const count = await getData(
        `${
          isAuthenticated().user.role == "student"
            ? "/homeworkcompledcount/" + isAuthenticated().user._id
            : isAuthenticated().user.role == "parent"
            ? "/homeworkcompledcount/" + isAuthenticated().user.student_id._id
            : isAuthenticated().user.role == "lecturer"
            ? "/homeworkadded/lecturer/" + isAuthenticated().user._id
            : isAuthenticated().user._id
        }`,
        isAuthenticated().token
      );
      setHomeWorkCount(count.count);
      const paymentPenddingCount = await getData(
        `${
          isAuthenticated().user.role == "student"
            ? "/findpaymentpendingcount/" + isAuthenticated().user._id
            : isAuthenticated().user.role == "parent"
            ? "/findpaymentpendingcount/" +
              isAuthenticated().user.student_id._id
            : isAuthenticated().user.role == "lecturer"
            ? "/findpaymentadded/lecturer/" + isAuthenticated().user._id
            : isAuthenticated().user._id
        }`,
        isAuthenticated().token
      );
      setPaymentPending(paymentPenddingCount.paymentPendingCount);
      const permissionPendingCount = await getData(
        `/permissionpendingcount/${isAuthenticated().user._id}`,
        isAuthenticated().token
      );
      setPermissionPendingCount(permissionPendingCount.permissionCount);
      const failedSubjectsCount = await getData(
        `/getfailedCount/${isAuthenticated().user._id}`,
        isAuthenticated().token
      );
      setFailedCount(failedSubjectsCount.failedCount);
      if (isAuthenticated().user.role == "student") {
        const getTimeTableList = await getData(
          `/gettimetable/${
            isAuthenticated().user.departments[0].department._id
          }/${isAuthenticated().user.departments[0].section[0]._id}`,
          isAuthenticated().token
        );
        console.log(getTimeTableList);
        setGetTimetable(getTimeTableList.getTimeTable);
      } else if (isAuthenticated().user.role == "parent") {
        const getTimeTableList = await getData(
          `/gettimetable/${
            isAuthenticated().user.student_id.departments[0].department
          }/${isAuthenticated().user.student_id.departments[0].section[0]}`,
          isAuthenticated().token
        );
        console.log(getTimeTableList);
        setGetTimetable(getTimeTableList.getTimeTable);
      } else if (isAuthenticated().user.role == "lecturer") {
        // /viewstittingarragmentadded
        const getTimeTableList = await getData(
          `/getlecturetable`,
          isAuthenticated().token
        );
        console.log(getTimeTableList);
        setGetTimetable(getTimeTableList.lectureTimeTable);
      }
      console.log(moment().day());
      //  console.log(getTimeTableList)
      if (
        isAuthenticated().user.role == "student" ||
        isAuthenticated().user.role == "parent"
      ) {
        const sittingArrangement = await getData(
          `/findsittingarragement/${isAuthenticated().user._id}`,
          isAuthenticated().token
        );
        console.log(sittingArrangement.arrangement);
        setSittingArragement(sittingArrangement.arrangement);
      } else if (isAuthenticated().user.role == "lecturer") {
        const sittingArrangement = await getData(
          "/viewstittingarragmentadded",
          isAuthenticated().token
        );
        setSittingArragement(sittingArrangement.arrangement);
      }
    };
    if (!isAuthenticated()) {
      router.push("/login");
    }
    isAuthenticated() && getDatauser();
  }, [router]);
  console.log(moment().format("dddd").toLowerCase());
  const getDay = (day) => {
    if (day == 0) {
      return "sunday";
    } else if (day == 1) {
      return "monday";
    } else if (day == 2) {
      return "tuesday";
    } else if (day == 2) {
      return "wednesday";
    } else if (day == 3) {
      return "thursday";
    } else if (day == 4) {
      return "friday";
    } else if (day == 5) {
      return "saturday";
    }
  };
  // settingarragement && console.log("RESSS"+  settingarragement[0].noOfCol)
  return (
    <>
      <Header />
      <div className="h-[95vh] p-6">
        {/* <div className='bg-gradient-to-b from-gradent1_1 to-gradent1_2 h-[10rem] w-[10rem]'>
<p></p>
</div> */}

        <div className="flex gap-5  flex-wrap items-center justify-center ">
          <Link href="/payment" className="no-underline min-w-[3rem]">
            <div className=" bg-secoundblack  h-[30vh] w-[20vw] shadow-[#06060669] shadow-md rounded-xl flex flex-col justify-center items-center">
              <div>
              <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-wallet" width="40" height="40" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffec00" fill="none" stroke-linecap="round" stroke-linejoin="round">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <path d="M17 8v-3a1 1 0 0 0 -1 -1h-10a2 2 0 0 0 0 4h12a1 1 0 0 1 1 1v3m0 4v3a1 1 0 0 1 -1 1h-12a2 2 0 0 1 -2 -2v-12" />
  <path d="M20 12v4h-4a2 2 0 0 1 0 -4h4" />
</svg>
              </div>
              <h1 className="text-white">{paymentPending}</h1>
              <p className="text-white">Pending Payment</p>
            </div>
          </Link>
          <Link href="/homework" className="no-underline">
            <div className=" bg-secoundblack shadow-[#06060669] h-[30vh] w-[20vw] shadow-md rounded-xl flex flex-col items-center justify-center">
              <div className="">
              <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-notebook" width="40" height="40" viewBox="0 0 24 24" stroke-width="1.5" stroke="#009988" fill="none" stroke-linecap="round" stroke-linejoin="round">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <path d="M6 4h11a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-11a1 1 0 0 1 -1 -1v-14a1 1 0 0 1 1 -1m3 0v18" />
  <path d="M13 8l2 0" />
  <path d="M13 12l2 0" />
</svg>
              </div>
              <h1 className="text-white">{homeworkcount}+</h1>
              <p className="text-lightwg">Homework Submitted</p>
            </div>
          </Link>

          <Link
            href="/permission?status=pending&page=1"
            className="no-underline"
          >
            <div className="shadow-[#06060669] bg-secoundblack h-[30vh] w-[20vw] shadow-md rounded-xl flex flex-col justify-center items-center">
              <div>
              <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-walk" width="40" height="40" viewBox="0 0 24 24" stroke-width="1.5" stroke="#00abfb" fill="none" stroke-linecap="round" stroke-linejoin="round">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <path d="M13 4m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
  <path d="M7 21l3 -4" />
  <path d="M16 21l-2 -4l-3 -3l1 -6" />
  <path d="M6 12l2 -3l4 -1l3 3l3 1" />
</svg>
              </div>
              <h1 className="text-white">{permissionPendingCount}</h1>
              <p className="text-lightwg">Permission Pending</p>
            </div>
          </Link>
          <Link className="no-underline" href="/exam/result">
            <div className= " bg-secoundblack  shadow-[#06060669] h-[30vh] w-[20vw] shadow-md rounded-xl flex flex-col justify-center items-center">
              <div>
              <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-alert-hexagon" width="40" height="40" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ff4500" fill="none" stroke-linecap="round" stroke-linejoin="round">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <path d="M19.875 6.27c.7 .398 1.13 1.143 1.125 1.948v7.284c0 .809 -.443 1.555 -1.158 1.948l-6.75 4.27a2.269 2.269 0 0 1 -2.184 0l-6.75 -4.27a2.225 2.225 0 0 1 -1.158 -1.948v-7.285c0 -.809 .443 -1.554 1.158 -1.947l6.75 -3.98a2.33 2.33 0 0 1 2.25 0l6.75 3.98h-.033z" />
  <path d="M12 8v4" />
  <path d="M12 16h.01" />
</svg>
              </div>
              <h1 className="text-white">{failedCount}</h1>
              <p className="text-white">Failed Subject count</p>
            </div>
          </Link>
        </div>
        <h5 className="text-white text-center mt-4">
          Todays Classes {moment().format("dddd").toLowerCase()}
        </h5>
        {!getTimetable &&  <Loading/>
}
        {getTimetable && <table className="text-white w-[90vw] m-auto shadow-[#06060669] shadow-md    rounded-sm  ">
          <thead>
            <tr className="py-2 px-6 ">
              {" "}
              <td className="">Name</td>
              <td>SubjectName</td>
              <td>Class</td>
              <td>Monday</td>
              <td>Tuesday</td>
              <td>Wednesday</td>
              <td>Thursday</td>
              <td>Friday</td>
              <td>Saturday</td>
            </tr>
            {
              getTimetable.map((el) => {
                return (
                  <>
                    {" "}
                    <tr className="py-4">
                      <td>
                        {el.lectureId.firstName + " " + el.lectureId.lastName}
                      </td>
                      <td></td>
                      <td>{el.period}</td>
                      <td>
                        {el.monday ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="icon icon-tabler icon-tabler-circle-check"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="#00b341"
                            fill="none"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          >
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <circle cx="12" cy="12" r="9" />
                            <path d="M9 12l2 2l4 -4" />
                          </svg>
                        ) : (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="icon icon-tabler icon-tabler-circle-x"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="#ff4500"
                            fill="none"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          >
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <circle cx="12" cy="12" r="9" />
                            <path d="M10 10l4 4m0 -4l-4 4" />
                          </svg>
                        )}
                      </td>
                      <td>
                        {el.tuesday ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="icon icon-tabler icon-tabler-circle-check"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="#00b341"
                            fill="none"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          >
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <circle cx="12" cy="12" r="9" />
                            <path d="M9 12l2 2l4 -4" />
                          </svg>
                        ) : (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="icon icon-tabler icon-tabler-circle-x"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="#ff4500"
                            fill="none"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          >
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <circle cx="12" cy="12" r="9" />
                            <path d="M10 10l4 4m0 -4l-4 4" />
                          </svg>
                        )}
                      </td>

                      <td>
                        {el.wednesday ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="icon icon-tabler icon-tabler-circle-check"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="#00b341"
                            fill="none"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          >
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <circle cx="12" cy="12" r="9" />
                            <path d="M9 12l2 2l4 -4" />
                          </svg>
                        ) : (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="icon icon-tabler icon-tabler-circle-x"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="#ff4500"
                            fill="none"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          >
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <circle cx="12" cy="12" r="9" />
                            <path d="M10 10l4 4m0 -4l-4 4" />
                          </svg>
                        )}
                      </td>
                      <td>
                        {el.thursday ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="icon icon-tabler icon-tabler-circle-check"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="#00b341"
                            fill="none"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          >
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <circle cx="12" cy="12" r="9" />
                            <path d="M9 12l2 2l4 -4" />
                          </svg>
                        ) : (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="icon icon-tabler icon-tabler-circle-x"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="#ff4500"
                            fill="none"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          >
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <circle cx="12" cy="12" r="9" />
                            <path d="M10 10l4 4m0 -4l-4 4" />
                          </svg>
                        )}
                      </td>
                      <td>
                        {el.friday ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="icon icon-tabler icon-tabler-circle-check"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="#00b341"
                            fill="none"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          >
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <circle cx="12" cy="12" r="9" />
                            <path d="M9 12l2 2l4 -4" />
                          </svg>
                        ) : (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="icon icon-tabler icon-tabler-circle-x"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="#ff4500"
                            fill="none"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          >
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <circle cx="12" cy="12" r="9" />
                            <path d="M10 10l4 4m0 -4l-4 4" />
                          </svg>
                        )}
                      </td>
                      <td>
                        {el.saturday ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="icon icon-tabler icon-tabler-circle-check"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="#00b341"
                            fill="none"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          >
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <circle cx="12" cy="12" r="9" />
                            <path d="M9 12l2 2l4 -4" />
                          </svg>
                        ) : (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="icon icon-tabler icon-tabler-circle-x"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="#ff4500"
                            fill="none"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          >
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <circle cx="12" cy="12" r="9" />
                            <path d="M10 10l4 4m0 -4l-4 4" />
                          </svg>
                        )}
                      </td>
                    </tr>{" "}
                  </>
                );

              
              })}

            {console.log(getTimetable)}
          </thead>
        </table>
      }
{!settingarragement &&  <Loading/>
}
        {settingarragement && (
          <table className=" text-white w-[95vw] mt-5">
            <thead>
              <tr>
                <td>Exam Name </td>
                <td>Room No </td>
                <td>Exam Date</td>
              </tr>
              {settingarragement &&
                settingarragement.map((el) => {
                  return (
                    <>
                      <tr>
                        <td>{el.examName}</td>
                        <td>{el.roomno}</td>
                        <td>{moment(el.examDate).format("MMM Do YY")}</td>
                      </tr>
                    </>
                  );
                })}
            </thead>
          </table>
        )}
      </div>
    </>
  );
};
export default Dashboard;
