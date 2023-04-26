import Header from '@/components/header';
import { isAuthenticated } from '@/util/apicalls';
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import Image from 'next/image';

export default function Profile() {
  const router = useRouter()
    const [user,setUser] = useState(null);
   
    useEffect(() => {
      if(!isAuthenticated()){
        router.push("/login")
       }
        setUser(isAuthenticated().user)
    }, []);
  return (
    <>
    <Header/>
   { user && <div className=' text-whitelight m-0 flex flex-col h-[100vh]  justify-center items-center'>
    <div className='bg-secoundblack px-9 py-9 rounded w-[80vw]'>
        <div className='flex gap-4 bg-lightblack p-3 justify-center items-center rounded-xl relative'>
            <div className='absolute right-2 top-2'>
            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-pencil" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <path d="M4 20h4l10.5 -10.5a1.5 1.5 0 0 0 -4 -4l-10.5 10.5v4" />
  <line x1="13.5" y1="6.5" x2="17.5" y2="10.5" />
</svg>
            </div>
        <Image src= {user.photo.secure_url} width={70} height={70} className='rounded-[50%] border-lightwg border-[2px]'/>
        <div className='flex flex-col items-center items-center'>
        <h6>{user.firstName +" "+ user.lastName}</h6>
        <p className='text-[#717377] capitalize'>{user.role}</p>
        </div>
        </div>
      <div className='m-5'>
<p className='text-[#717377] m-0 text-[0.9rem]'> Email</p>
<p className='border-b-[#717377] border-b-[1px] pb-[2px] '> {user.email}</p>
<p className='text-[#717377] m-0 text-[0.9rem]'> Gender</p>
<p className='border-b-[#717377] border-b-[1px] pb-[2px] '> {user.gender}</p>
<p className='text-[#717377] m-0 text-[0.9rem]'>Parent Email</p>
<p className='border-b-[#717377] border-b-[1px] pb-[2px] '> {user.parentEmail}</p>

<p className='text-[#717377] m-0 text-[0.9rem]'>PhoneNo</p>
<p className='border-b-[#717377] border-b-[1px] pb-[2px] '> {user.phoneNo}</p>

<p className='text-[#717377] m-0 text-[0.9rem]'>Department</p>
<p className='border-b-[#717377] border-b-[1px] pb-[2px] '> {user.departments[0].department.department}</p>

<p className='text-[#717377] m-0 text-[0.9rem]'>Section</p>
<p className='border-b-[#717377] border-b-[1px] pb-[2px] '> {user.departments[0].section[0].section}</p>


</div>
</div>
    </div>
}
    </>
  )
}
