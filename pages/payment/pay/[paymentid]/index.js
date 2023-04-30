
import { useEffect } from 'react';
import { useRouter } from "next/router";
import {getData, isAuthenticated}from "@/util/apicalls"
import Image from 'next/image';
import { redirect } from 'next/navigation';
import loadingimg from "../../../../util/Spinner-1s-200px.gif";
export default function Paymentid() {
    const router = useRouter();
    useEffect(() => {
        const payment = async() =>{
const pay =  await getData(`/payment/${router.query.paymentid}`, isAuthenticated().token)
router.push(pay.session.url)
// router.push(`${pay.session.url}`);
console.log(pay)
        }
        router.query.paymentid &&   payment()
    }, [router.query.paymentid]);
  return (
   <>
   <div>
    
   <div className="h-[80vh] flex justify-center items-center">
          <Image src={loadingimg} alt="" />
        </div>
   </div>
   </>
  )
}
