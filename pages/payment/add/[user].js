import { useEffect, useState} from 'react';
import Image from 'next/image';
import { getData,postData ,isAuthenticated } from '@/util/apicalls';
import { useRouter } from 'next/router';
 function Add() {
    const router = useRouter()
    const [userData,setUserData] = useState(null)
    const [paymentAdd,setPaymentAdd] = useState(null)
    useEffect( () => {
        async function fetchdata (){
   let data = await getData(`/getuserinfowithid/${router.query.user}`)
  setUserData(data)
  console.log(data)

  console.log(isAuthenticated().user.departments)
         }
         router.query.user &&   fetchdata()
     }, [router.query.user]);

     const handleInput  = (user) => (el)=>{
setPaymentAdd({...paymentAdd,[user]:el.target.value,"sid":router.query.user});
console.log(paymentAdd)

     }
     const handleSubmit = async(el)=> {
el.preventDefault();
const paymentsatus =  await postData("/addpayment",paymentAdd);
console.log(paymentsatus)
     }
  return (
   <>
    <form
          className="w-[35rem]  h-[90vh] m-auto bg-white p-[1rem]"
          onSubmit={handleSubmit}
          enctype="multipart/form-data"
        >
          {/* <h2 className="text-center ">Add Fee </h2> */}
          { userData? <Image src ={userData.user.photo.secure_url} className='rounded-[50%] m-auto' width={100} height={100}></Image> :''}
        
             <input 
            type="text"
            class="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6  my-4"
            placeholder="Title"
            onChange={handleInput("firstName")}
            // value={title}
    
          />
          <input
            type="text"
            class="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6  my-4"
            placeholder="description"
            onChange={handleInput("description")}
            // value={lastName}
          />
 <input
            type="Number"
            class="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6  my-4"
            placeholder="Amount"
            onChange={handleInput("amount")}
            // value={lastName}
          />
          <input
            type="Date"
            class="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6  my-4"
            placeholder="Amount"
            onChange={handleInput("lastDay")}
            // value={lastName}
          />
  <button
            className="block w-full bg-primary rounded-md border-0 py-1.5 pl-7 pr-20  my-4 bg-indigo-600 text-white "
            type="submit"
          >
         
            Submit
          </button>
          </form>
   </>
  )
}

export default Add;