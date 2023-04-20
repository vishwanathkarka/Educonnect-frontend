
import { useEffect, useState} from 'react';
import Image from 'next/image';
import Header from '@/components/header';
import { getData,postData ,isAuthenticated } from '@/util/apicalls';
 function PaymentAddForm(props) {
    const [userData,setUserData] = useState(null)
    const [paymentAdd,setPaymentAdd] = useState(null)
    
    useEffect( () => {
        async function fetchdata (){
   let data = await getData(`/getuserinfowithid/${props.sid}`,isAuthenticated().token)
  setUserData(data)
  console.log(data)

  console.log(isAuthenticated().user.departments)
         }
      fetchdata()
     }, []);

     const handleInput  = (user) => (el)=>{
setPaymentAdd({...paymentAdd,[user]:el.target.value,"sid":props.sid});
console.log(paymentAdd)

     }
     const handleSubmit = async(el)=> {
el.preventDefault();
const isDone =  await postData("/addpayment",paymentAdd,isAuthenticated().token);
// console.log(paymentsatus)
if(isDone){
    props.closeForm(true)
}
     }
  return (
    <>
      <div className=" h-[100%]  w-[100%] absolute flex justify-center items-center  flex-col  " >
          <div className=" h-[100vh] w-[100%] backdrop-blur-[2px] cursor-pointer  absolute" onClick={()=>{props.closeForm(true)}} >  </div>
          <div className="flex gap-[130px] items-center  " >
          </div>
<form
            className="md:w-[371px]  pt-4   w-[351px] h-[700px] bg-[#1A1E23]  border-secoundblack drop-shadow-md border-[5px] shadow-md rounded-[35px] drop-shadow-sm px-[1rem]  flex flex-col gap-[15px] "
          onSubmit={handleSubmit}
          enctype="multipart/form-data"
        >

          { userData? <Image src ={userData.user.photo.secure_url} className='rounded-[50%] m-auto border-lightwg border-[px] border-2 shadow-sm' width={100} height={100}></Image> :''}
        <p className='text-lightwg m-0'>Enter the payment title </p>
             <input 
            type="text"
            class="py-1.5 pl-7 pr-20 border-[1.5px]  border-lightblack  bg-secoundblack   rounded-md   text-white"
            placeholder="Ex: Yearly payment fee"
            onChange={handleInput("firstName")}
            // value={title}
    
          />
          <p className='text-lightwg m-0'>Enter the Amount  </p>
          <input
   
            type="Number"
            class="py-1.5 pl-7 pr-20 border-[1.5px]  border-lightblack  bg-secoundblack   rounded-md   text-white"
            placeholder="Amount"
            onChange={handleInput("amount")}
            // value={lastName}
          />
          <p className='text-lightwg m-0'>Enter the last day of payment</p>
          <input
            type="Date"
            class="  py-1.5 pl-7 pr-20 border-[1.5px]  border-lightblack  bg-secoundblack   rounded-md   text-white "
            placeholder="Amount"
            onChange={handleInput("lastDay")}
            // value={lastName}
          />
<p className='text-lightwg m-0'>Enter description</p>
<textarea row="5" cols="900"   placeholder="description"
            onChange={handleInput("description")} class=" border-[1.5px]  border-lightblack  bg-secoundblack   rounded-md p-3  text-white"></textarea>
  <button
            className="block w-full bg-primarycolor rounded-md border-0 py-1.5 pl-7 pr-20  my-4 bg-indigo-600 text-white "
            type="submit"
          >
       Add
          </button>
          </form>
      </div>
    </>
  )
}
export default PaymentAddForm
