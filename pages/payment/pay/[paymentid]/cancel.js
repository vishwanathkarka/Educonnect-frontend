import { useEffect } from 'react';
import { getData, isAuthenticated } from '@/util/apicalls';
import { useRouter } from "next/router";
import Header from '@/util/header';

function Cancel() {
    const router = useRouter();
    useEffect(() => {
      async  function getstatus (){
     let data = await  getData(`/checkstatus/${router.query.paymentid}`,isAuthenticated().token)
     console.log(data)
     if(data.payment == false){
        router.push(`/payment/pay/${router.query.paymentid}/cancel`)
     }
        }
        router.query.paymentid &&   getstatus()
    }, [router.query.paymentid]);
  return (
   <>
   <Header/>
   <div className='h-[90vh] flex justify-center items-center flex-col'>
  <div class="">
  <svg  xmlns="http://www.w3.org/2000/svg" class="  icon icon-tabler icon-tabler-circle-x" width="100" height="100" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ff4500" fill="none" stroke-linecap="round" stroke-linejoin="round">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <circle cx="12" cy="12" r="9" />
  <path d="M10 10l4 4m0 -4l-4 4" />
</svg>
</div>
<div className='text-center text-white mt-8'>
<h2>Payment Failed ☹️</h2>
<p>Try it Again</p>

</div>
</div>
   </>
  )
}
export default Cancel;