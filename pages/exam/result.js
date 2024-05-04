import Header from "@/util/header";
import { getData, isAuthenticated } from "@/util/apicalls";
import { useEffect, useState } from "react";
import Image from "next/image";
import NoResultFound from "../../util/no-content.png";

export default function Result() {
  const [studentResult, setStudentResult] = useState(null);
  const[lecturerAddedResult, setLecturerAddedResult] = useState(null)
  const [theme, setTheme] = useState(false);
  useEffect(() => {
    const studentResult = async (userid) => {
      const result = await getData(
        `/viewResult/${userid}`,
        isAuthenticated().token
      );
      setStudentResult(result.studetMarks);
      console.log(result);
    };
    const getLecturerAddedResult = async() => {
      const result = await getData(`/getLecturerAddedResult`,isAuthenticated().token)
console.log(result)
if(result.success == true){
  setLecturerAddedResult(result.result)
}
    }
    isAuthenticated().user.role == "student" &&
      studentResult(isAuthenticated().user._id);
    isAuthenticated().user.role == "parent" &&
      studentResult(isAuthenticated().user.student_id._id);
    isAuthenticated().user.role == "lecturer" && getLecturerAddedResult()

  }, []);
  return (
    <>
      <Header />
      <div className="h-[100vh]">
        <table className="text-white w-[96vw] my-5 mx-3 rounded-2xl ">
          <thead>
           

            {studentResult &&
(
  <>
  <tr className=" border-[#343a46b6] border-[0.8px] rounded-2xl ">
  <td className="p-3">Subject name</td>
  <td className="p-3">Student marks</td>
  <td className="p-3">Out of marks </td>
  <td className="p-3">Percentage</td>
</tr>
{
              studentResult.map((res) => {
                return (
                  // eslint-disable-next-line react/jsx-key
                  <tr className=" border-[#343a46b6] border-[0.8px] ">
                    <td className="p-3">{res.subject}</td>
                    <td className="p-3">{res.studentMarks}</td>
                    <td className="p-3">{res.outOfMarks}</td>
                    <td className="p-3">{res.percentage}%</td>
                  </tr>
                );
              })
            }
            </>
            )}
{lecturerAddedResult && (
  <>
   <tr className=" border-[#343a46b6] border-[0.8px] rounded-2xl ">
   <td className="p-3">Student Details</td>
   <td className="p-3">Subject name</td>
   <td className="p-3">Student marks</td>
   <td className="p-3">Out of marks </td>
   <td className="p-3">Percentage</td>
 </tr>
 {
  lecturerAddedResult.map((res) => {
    return (
      // eslint-disable-next-line react/jsx-key
      <tr className=" border-[#343a46b6] border-[0.8px] ">
        <td className="p-3"><tr>
          <td><Image src = {res.userId.photo.secure_url} alt="person"  width={50} height={50} className=" rounded-[6rem] mx-2"></Image></td>
        
         <tr>{res.userId.firstName}</tr> 
         <tr>{res.userId.htno}</tr>
        
          </tr></td>
        <td className="p-3">{res.subject}</td>
        <td className="p-3">{res.studentMarks}</td>
        <td className="p-3">{res.outOfMarks}</td>
        <td className="p-3">{res.percentage}%</td>
      </tr>
    );
  })
 }
 </>
)}

          </thead>
        </table>
      </div>
    </>
  );
}
