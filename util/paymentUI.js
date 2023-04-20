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
{props.paiddate &&   <p className=' text-[#717377] font-bold flex-[1]'>-</p> }
{props.lastday && <p className='flex-[1]'>{moment(props.lastday ).format("MMMM Do YYYY")}</p> }
{ props.status && <p
          className=" w-[100px] text-[rgb(0,128,0)] flex justify-center  items-center gap-1  flex-[1]" 
          onClick={() => { ;setIsApp(1);}}
        >
        <svg xmlns="http://www.w3.org/2000/svg" width="27" height="21" viewBox="0 0 27 21">
  <rect id="Rectangle_16" data-name="Rectangle 16" width="27" height="21" rx="8" fill="rgba(23,142,113,0.4)"/>
  <path id="Icon_feather-check" data-name="Icon feather-check" d="M17.806,9,9.689,16.5,6,13.091" transform="translate(2.096 -2.25)" fill="none" stroke="#1a8e72" stroke-linecap="round" stroke-linejoin="round" stroke-width="3"/>
</svg>

          Paid
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