import Header from '@/components/header';
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
    <Header/>
    <div className='h-[100vh]'>
    <table className='text-white w-[96vw] my-5 mx-3 rounded-2xl '>
    <thead>
    <tr className=' border-[#343a46b6] border-[0.8px] rounded-2xl ' >
       <td className='p-3'>Subject name</td>
       <td className='p-3'>Student marks</td>
       <td className='p-3' >Out of marks </td>
       <td className='p-3'>Percentage</td>
      </tr>
      {studentResult && studentResult.map((res)=>{
        return (
      <tr className=' border-[#343a46b6] border-[0.8px] ' >
       <td className='p-3'>{res.subject}</td>
       <td className='p-3'>{res.studentMarks}</td>
       <td className='p-3' >{res.outOfMarks}</td>
       <td className='p-3'>{ res.percentage}%</td>
      </tr>)
      })
}
    </thead>
    </table>
    </div>
    </>
  )
}
