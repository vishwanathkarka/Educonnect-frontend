import { useEffect, useState} from 'react';
import Image from 'next/image';
import Header from '@/components/header';
import { getData,postData ,isAuthenticated } from '@/util/apicalls';

 function Add() {
    // const router = useRouter()
    const [userData,setUserData] = useState(null)
    const [paymentAdd,setPaymentAdd] = useState(null)
    useEffect( () => {
        async function fetchdata (){
   let data = await getData(`/getuserinfowithid/6432baf3fb948862b8b528f6`)
  setUserData(data)
  console.log(data)

  console.log(isAuthenticated().user.departments)
         }
      fetchdata()
     }, []);

     const handleInput  = (user) => (el)=>{
setPaymentAdd({...paymentAdd,[user]:el.target.value,"sid":router.query.user});
console.log(paymentAdd)

     }
     const handleSubmit = async(el)=> {
el.preventDefault();
// const paymentsatus =  await postData("/addpayment",paymentAdd);
console.log(paymentsatus)
     }
  return (
   <>

    <form
          className="w-[35rem]  h-[90vh] m-auto  my-4 bg-secoundblack p-[1rem]"
          onSubmit={handleSubmit}
          enctype="multipart/form-data"
        >

          { userData? <Image src ={userData.user.photo.secure_url} className='rounded-[50%] m-auto ' width={100} height={100}></Image> :''}
        
             <input 
            type="text"
            class="block w-full rounded-md border-lightblack border-[2px]  py-1.5 pl-7 pr-20  text-white text-lightblack-900 ring-1 ring-inset ring-lightblack-300 placeholder:text-gray-400 focus:ring-2 bg-secoundblack focus:ring-inset focus:ring-lightblack-600 border-lightblack sm:text-sm sm:leading-6  mb-6"
            placeholder="Title"
            onChange={handleInput("firstName")}
            // value={title}
    
          />
          <input
            type="text"
            class="block w-full rounded-md border-lightblack border-[2px]  py-1.5 pl-7 pr-20  text-white text-lightblack-900 ring-1 ring-inset ring-lightblack-300 placeholder:text-gray-400 focus:ring-2 bg-secoundblack focus:ring-inset focus:ring-lightblack-600 border-lightblack sm:text-sm sm:leading-6  mb-6"
            placeholder="description"
            onChange={handleInput("description")}
            // value={lastName}
          />
 <input
            type="Number"
            class="block w-full rounded-md border-lightblack border-[2px]  py-1.5 pl-7 pr-20  text-white text-lightblack-900 ring-1 ring-inset ring-lightblack-300 placeholder:text-gray-400 focus:ring-2 bg-secoundblack focus:ring-inset focus:ring-lightblack-600 border-lightblack sm:text-sm sm:leading-6  mb-6"
            placeholder="Amount"
            onChange={handleInput("amount")}
            // value={lastName}
          />
          <input
            type="Date"
            class="block w-full rounded-md border-lightblack border-[2px]  py-1.5 pl-7 pr-20  text-white text-lightblack-900 ring-1 ring-inset ring-lightblack-300 placeholder:text-gray-400 focus:ring-2 bg-secoundblack focus:ring-inset focus:ring-lightblack-600 border-lightblack sm:text-sm sm:leading-6  mb-6"
            placeholder="Amount"
            onChange={handleInput("lastDay")}
            // value={lastName}
          />
  <button
            className="block w-full bg-primarycolor rounded-md border-0 py-1.5 pl-7 pr-20  my-4 bg-indigo-600 text-white "
            type="submit"
          >
       Add
          </button>
          </form>
   </>
  )
}

export default Add;