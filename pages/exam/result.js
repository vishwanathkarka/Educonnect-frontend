import { getData, isAuthenticated } from '@/util/apicalls';
import { useEffect, useState } from 'react';

export default function result() {
  const [studentResult ,setStudentResult] = useState(null)
  const [theme ,setTheme] = useState(false)
  useEffect(() => {
    const studentResult = async() =>{
const result =  await getData("/viewResult",isAuthenticated().token)
setStudentResult(result.studetMarks  )
console.log(result)
    }
    studentResult()
  }, []);
  return (
    <>
    <table className='text-white w-[90vw]'>
    <thead>
      {studentResult && studentResult.map((res)=>{
        return (
      <tr className=' border-[#717377] border-[0.8px] ' >
       <td className='p-3'>{res.subject}</td>
       <td className='p-3'>{res.studentMarks}</td>
       <td className='p-3' >{res.outOfMarks}</td>
       <td className='p-3'>{ res.percentage}%</td>
      </tr>)
      })
}
    </thead>
    </table>
    </>
  )
}
