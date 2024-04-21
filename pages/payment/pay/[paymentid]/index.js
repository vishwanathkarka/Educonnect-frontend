
import { useEffect } from 'react';
import { useRouter } from "next/router";
import {getData, isAuthenticated}from "@/util/apicalls"
import Image from 'next/image';
import Loading from '@/util/loading';
import { redirect } from 'next/navigation';
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
    }, [router,router.query.paymentid]);
  return (
   <>
   <div>
    
   <div className="h-[100vh] flex justify-center items-center">
    <Loading/>
        </div>
   </div>
   </>
  )
}
