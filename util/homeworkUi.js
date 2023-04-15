import React from 'react'

export default function homeworkUi(props) {
  return (
    <>
    <div className='px-[5rem] py-2 flex justify-around items-center flex-wrap'>
{/* <input type="checkbox" name="topping" value="Regular" id="regular" className='w-[1.2rem] h-[1.2rem]' />
<div className=''> */}
{/* 
</div> */}
<div class="flex flex-col text-center"> <h3 className='text-[1.2rem]'>{props.title}</h3> <p class="text-[#606F7B] font-[Avenirregular] "> {props.department}</p> </div>
<p className='text-primary font-bold'> {props.duedate}</p>
<p className=''>des</p>
</div>
<hr class="text-[#dae1e7]"></hr>
 </>
  )
}
