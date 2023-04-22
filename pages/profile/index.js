import Header from '@/components/header';
import { isAuthenticated } from '@/util/apicalls';
import React, { useEffect, useState } from 'react'

export default function Profile() {
    const [user,setUser] = useState(null);
    useEffect(() => {
        setUser(isAuthenticated().user)
    }, []);
  return (
    <>
    <Header/>
   { user && <div className=' text-whitelight m-0 flex flex-col h-[100vh] justify-center items-center'>
    <div className='bg-secoundblack px-9 py-9 rounded'>
<p>Name: {user.firstName +" "+ user.lastName}</p>
<p>Email: {user.email}</p>
<p>Gender {user.gender}</p>
<p>Parent Email: {user.parentEmail}</p>
<p>PhoneNo: {user.phoneNo}</p>
<p>Department: {user.departments[0].department.department}</p>
<p>Section: {user.departments[0].section[0].section}</p>
<p></p>
</div>
    </div>
}
    </>
  )
}
