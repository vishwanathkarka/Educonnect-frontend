import Header from "@/util/header";
import { getData, isAuthenticated } from "@/util/apicalls";
import { useEffect, useState } from "react";
import NoResultFound from "../../util/no-content.png";

export default function Result() {
  const [studentResult, setStudentResult] = useState(null);
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
    isAuthenticated().user.role == "student" &&
      studentResult(isAuthenticated().user._id);
    isAuthenticated().user.role == "parent" &&
      studentResult(isAuthenticated().user.student_id._id);
  }, []);
  return (
    <>
      <Header />
      <div className="h-[100vh]">
        <table className="text-white w-[96vw] my-5 mx-3 rounded-2xl ">
          <thead>
            <tr className=" border-[#343a46b6] border-[0.8px] rounded-2xl ">
              <td className="p-3">Subject name</td>
              <td className="p-3">Student marks</td>
              <td className="p-3">Out of marks </td>
              <td className="p-3">Percentage</td>
            </tr>

            {studentResult &&
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
              })}
          </thead>
        </table>
      </div>
    </>
  );
}
