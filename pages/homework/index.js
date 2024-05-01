import { useEffect, useState } from "react";
import HomeworkUi from "@/util/Ui/homeworkUi";
import { useRouter } from "next/router";
import { isAuthenticated, getData } from "@/util/apicalls";
import Header from "@/util/header";
function Homework() {
  const router = useRouter();
  // const [sectionDepartment,setSectionDepartment] = useState(null)
  const [userData, setUserData] = useState(null);
  const [homework, setHomeWork] = useState();
  const [lecturerAddedHomework, setLecturerAddedHomework] = useState();
  useEffect(() => {
    if (!isAuthenticated()) {
      router.push("/login");
    }
    
    setUserData(isAuthenticated().user);
    //  setSectionDepartment({"department":isAuthenticated().user.departments[0].department._id,"section":isAuthenticated().user.departments[0].section[0]._id})
    const fetchdata = async (department, section) => {
      const homeworkList = await getData(
        `/gethomework/${department}/${section}`,
        isAuthenticated().token
      );
      setHomeWork(homeworkList.Homeworks);
    };


    const getLecturerAddedHomework = async() =>{
const data = await getData(`/homeworkaddedlecturer`,isAuthenticated().token)
if(data.success == true){
setLecturerAddedHomework(data)
}
console.log(data)
    }

    

    
    isAuthenticated().user.role == "student" &&
      fetchdata(
        isAuthenticated().user.departments[0].department._id,
        isAuthenticated().user.departments[0].section[0]._id
      );
    isAuthenticated().user.role == "parent" &&
      fetchdata(
        isAuthenticated().user.student_id.departments[0].department,
        isAuthenticated().user.student_id.departments[0].section[0]
      );
      
      if(isAuthenticated().user.role = "lecturer"){
        getLecturerAddedHomework()
      }


  }, []);

  return (
    <>
      <Header />
      <div className="min-h-[100vh] overflow-x-auto  ">
        {/* <div className="  min-h-[80vh] w-[90vw]  bg-secoundblack mx-4 py-3 px-3 rounded-lg my-5"> */}
 <table className="w-[100vw]  md:w-[90vw] m-auto text-center mt-5 overflow-x-auto">
 <tbody>
<tr className="text-white">
  <th>Upload</th>
  <th>Topic</th>
  <th>Uploaded Date</th>
  <th>Submission Date</th>
  <th>Assigned By</th>
  <th>Status</th>
</tr>
            {userData &&
              (userData.role == "student" || userData.role == "parent") &&
              homework  &&  
              homework.map((el) => {
               console.log(el)
                return (
                  <HomeworkUi
                    title={el.title}
                    link={el.lectureworkFile.secure_url} 
                    // homeworkFile.secure_url
                    id={el._id}
                    key={el._id}
                    img={el.lectureId.photo.secure_url}
                    uploaded={el.timeStamp}
                    lemail={el.lectureId.email}
                    lname={el.lectureId.firstName + " " + el.lectureId.lastName}
                    lastupload={el.submissionDate}
                    status={el.isSubmittedWork}
                    homeworkID={el._id}
                  />
                );
              })}

{userData && lecturerAddedHomework &&
              lecturerAddedHomework.homeWork.map((el) => {
               console.log(el)
                return (
                  <HomeworkUi
                    title={el.title}
                    link={el.lectureworkFile.secure_url} 
                    // homeworkFile.secure_url
                    id={el._id}
                    key={el._id}
                    // img={el.lectureId.photo.secure_url}
                    uploaded={el.timeStamp}
                    lemail={el.lectureId.email}
                    lname={el.lectureId.firstName + " " + el.lectureId.lastName}
                    lastupload={el.submissionDate}
                    status={el.isSubmittedWork}
                    homeworkID={el._id}
                  />
                );
              })}
         </tbody>
        </table>
        {/* </div> */}
      </div>
    </>
  );
}
export default Homework;
