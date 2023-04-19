import { useEffect } from 'react';
import { getData } from '@/util/apicalls';
import { useRouter } from "next/router";

function Success() {
    const router = useRouter();
    useEffect(() => {
      async  function getstatus (){
     let data = await  getData(`/checkstatus/${router.query.paymentid}`)
     console.log(data)
     if(data.payment == false){
        router.push(`/payment/pay/${router.query.paymentid}/cancel`)
     }
        }
        router.query.paymentid &&   getstatus()
    }, [router.query.paymentid]);
  return (
   <>
  <div class="success-animation h-[40vh] flex items-center justify-center  flex-col rounded-xl m-8 ">
<svg class="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52"><circle class="checkmark__circle" cx="26" cy="26" r="25" fill="none" /><path class="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" /></svg>

<div className='text-center mt-8'>
<h2 className='text-white'>Payment is been success 😊</h2>
<p className='text-whitelight'>Thank You for the payment</p>
</div>
</div>
   </>
  )
}
export default Success