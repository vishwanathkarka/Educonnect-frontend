import Header from '@/components/header'
import { getData, isAuthenticated } from '@/util/apicalls';
import { useEffect,useState } from 'react';

const  Dashboard = () => {
    const [homeworkcount,setHomeWorkCount] = useState(null)
    const [paymentPending,setPaymentPending]= useState(null)
    useEffect(() => { 
        const getDatauser = async() =>{
      const count = await getData(`/homeworkcompledcount/${isAuthenticated().user._id}`)
      setHomeWorkCount(count.count)
      const paymentPenddingCount = await getData(`/findpaymentpendingcount/${isAuthenticated().user._id}`,isAuthenticated().token)
setPaymentPending(paymentPenddingCount.paymentPendingCount)
        }
        getDatauser()
    }, []);
  return (
   <>
   <Header/>
<div className='h-[95vh] p-6'>
{/* <div className='bg-gradient-to-b from-gradent1_1 to-gradent1_2 h-[10rem] w-[10rem]'>
<p></p>
</div> */}

<div className='flex gap-5  '>

    <div className='bg-secoundblack h-[30vh] w-[25vw] shadow-md rounded-xl flex flex-col justify-center items-center' >
     
            <div>
            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-credit-card" width="48" height="48" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <rect x="3" y="5" width="18" height="14" rx="3" />
  <line x1="3" y1="10" x2="21" y2="10" />
  <line x1="7" y1="15" x2="7.01" y2="15" />
  <line x1="11" y1="15" x2="13" y2="15" />
</svg>
            </div>
<h1 className='text-white'>{paymentPending}</h1>
<p className='text-lightwg'>Pending Payment</p>
    
    </div>
    <div className='bg-secoundblack h-[30vh] w-[25vw] shadow-md rounded-xl flex flex-col items-center justify-center' >
        <div className="">
    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-book" width="48" height="48" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <path d="M3 19a9 9 0 0 1 9 0a9 9 0 0 1 9 0" />
  <path d="M3 6a9 9 0 0 1 9 0a9 9 0 0 1 9 0" />
  <line x1="3" y1="6" x2="3" y2="19" />
  <line x1="12" y1="6" x2="12" y2="19" />
  <line x1="21" y1="6" x2="21" y2="19" />
</svg>
</div>
<h1 className='text-white'>{homeworkcount}+</h1>
<p className='text-lightwg'>Homework Submitted</p>
    </div>
    <div className='bg-secoundblack h-[30vh] w-[25vw] shadow-md rounded-xl' >
<div>
<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-user-check" width="48" height="48" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <circle cx="9" cy="7" r="4" />
  <path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
  <path d="M16 11l2 2l4 -4" />
</svg>
</div>


    </div>
</div>
</div>
   </>
  )
}
export default Dashboard
