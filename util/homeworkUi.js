import React from 'react'
import Link from 'next/link'
export default function homeworkUi(props) {
  return (
    <>

<Link href={props.link } className='no-underline ' onClick={()=>props.userId(props.id)} >
   <div className='flex text-whitelight py-2 mx-4 gap-10  text-center border-b-[rgba(246,247,249,.05)] border-b-[1px] '>
    <h2>HJJ</h2>
</div>
</Link>
  


 </>
  )
}
