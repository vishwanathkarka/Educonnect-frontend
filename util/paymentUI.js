import React from 'react'
import moment from 'moment';
import Link from 'next/link';
import Image from 'next/image';
function PaymentUI(props) {
  return (
   <>
     <Link href={props.link } className='no-underline ' onClick={()=>props.userId(props.id)} >
   <div className='flex text-whitelight py-2 mx-4 gap-10  text-center border-b-[rgba(246,247,249,.05)] border-b-[1px] '>
 {props.img &&
 <div className=''>
 <Image src={props.img} width={50} height={76} className='rounded-lg  flex-1 '></Image> </div> }
 {props.name && props.htno &&  <div className=' flex flex-col m-0 p-0 gap-0 '>
    <p className='text-lightwg mb-1 text-start flex-1'>{props.name}</p>
    <p className='text-[#717377]  m-0 text-start flex-1' >{props.htno}</p>
   </div>
}
{props.title && <p className='text-[#717377] capitalize flex-[2]' >{props.title}</p> }
{props.description &&  <p className='text-[#717377] capitalize flex-[3]' >{props.description}</p> }
{props.paymentId &&    <p className='text-[#717377] font-bold flex-[1]'>{props.paymentId}</p> }
{props.amount &&   <p className='text-primarycolor font-bold flex-[1]'>{props.amount}/-</p> }
{props.phoneno &&   <p className='text-primarycolor font-bold flex-[1] '>{"+91 "+ props.phoneno}</p> }
{props.email &&  <p className=' text-[#717377] font-bold flex-[1]'>{props.email}</p>}
{props.paiddate &&   <p className=' text-[#717377] font-bold flex-[1]'>{props.paiddate}</p> }
{props.lastday && <p className='flex-[1]'>{moment(props.lastday ).format("MMMM Do YYYY")}</p> }
{ props.status && props.status == true && props.payid? <p
          className=" w-[100px] text-[rgb(0,128,0)] flex justify-center  items-center gap-1  flex-[1]" 
          onClick={() => { ;setIsApp(1);}}
        >
        <svg xmlns="http://www.w3.org/2000/svg" width="27" height="21" viewBox="0 0 27 21">
  <rect id="Rectangle_16" data-name="Rectangle 16" width="27" height="21" rx="8" fill="rgba(23,142,113,0.4)"/>
  <path id="Icon_feather-check" data-name="Icon feather-check" d="M17.806,9,9.689,16.5,6,13.091" transform="translate(2.096 -2.25)" fill="none" stroke="#1a8e72" stroke-linecap="round" stroke-linejoin="round" stroke-width="3"/>
</svg>

          Paid
        </p> : props.status == false && props.payid? 
        <p className=' w-[100px] text-[#EA8B9E] flex justify-center  items-center gap-1  flex-[1]'>
            <svg xmlns="http://www.w3.org/2000/svg" width="27" height="21" viewBox="0 0 27 21">
  <rect id="Rectangle_16" data-name="Rectangle 16" width="27" height="21" rx="8" fill="rgba(230,189,197,0.4)"/>
  <path id="Path_28" data-name="Path 28" d="M11.09,97.725a.994.994,0,0,0,0-1.492,1.227,1.227,0,0,0-1.628,0L5.678,99.7,1.89,96.237a1.227,1.227,0,0,0-1.628,0,.994.994,0,0,0,0,1.492L4.05,101.2.265,104.667a.994.994,0,0,0,0,1.492,1.227,1.227,0,0,0,1.628,0l3.784-3.471,3.788,3.467a1.227,1.227,0,0,0,1.628,0,.994.994,0,0,0,0-1.492L7.305,101.2Z" transform="translate(7.822 -90.696)" fill="#ea8b9e"/>
</svg>
Fail
        </p>:
        <p className=' w-[100px] text-[#FFD43B] flex justify-center  items-center gap-1  flex-[1]'>
  <svg xmlns="http://www.w3.org/2000/svg" width="35" height="30" viewBox="0 0 35 30">
  <rect id="Rectangle_16" data-name="Rectangle 16" width="35" height="30" rx="13" fill="rgba(255,212,59,0.36)"/>
  <path id="Icon_material-timer" data-name="Icon material-timer" d="M13.5,1.5H9V3.02h4.5Zm-3,9.878H12V6.819H10.5Zm6.022-5.022,1.065-1.079A8.341,8.341,0,0,0,16.53,4.2L15.465,5.284a6.668,6.668,0,0,0-4.215-1.5A6.839,6.839,0,1,0,18,10.618,6.866,6.866,0,0,0,16.522,6.355ZM11.25,15.936a5.319,5.319,0,1,1,5.25-5.319A5.281,5.281,0,0,1,11.25,15.936Z" transform="translate(7.25 5)" fill="#ffd43b"/>
</svg>
Pending
        </p>
}
{props.add && 
<div className='flex-2 mr-6'>
    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-circle-plus" width="32" height="32" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <circle cx="12" cy="12" r="9" />
  <line x1="9" y1="12" x2="15" y2="12" />
  <line x1="12" y1="9" x2="12" y2="15" />
</svg>
</div>
}
       
   </div>
   </Link>
   </>
  )
}

export default PaymentUI