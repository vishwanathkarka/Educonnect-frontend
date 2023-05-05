import React,{useState} from 'react'
import Head from 'next/head';
import Link from 'next/link';
import Header from 'components/header';
import {postData} from  '../util/apicalls';
import Toast from "../util/toast"
import {authenticate} from "../util/apicalls"
import Cookie  from "js-cookie"
import { useRouter } from 'next/router'
import Loading from '@/components/loading';


function Login (){
const userInput = {email:"",password:""}
const [isloading,setloading]= useState(false)
let router= useRouter();
const [loginData,setLoginData] = useState(userInput);
const [toShowToast,setToShowToast] = useState({isShownToast:false,msg:{title:"",msg:""},toastColor:""})
const {isShownToast,msg,toastColor} = toShowToast;
console.log(msg)
const {email,password} = loginData;
const handleInput = name => (el) => {
  setLoginData({...loginData,[name]:el.target.value});
console.log(loginData);
}

// handling the toast view
const handlingTost =()=>{
 setToShowToast({...toShowToast,isShownToast:false})
}
// submit form
const onSubmitLogin = async el => {
  el.preventDefault();

setloading(true);
  
  console.log(loginData);
  console.log(email)
  const result = await postData('/login',{"email":email,"password":password})
  console.log(result)
  if(result.status == true){
    router.push("/dashboard")
  setToShowToast({...toShowToast,toastColor:"bg-success",msg:{title:"Logged successfully"},isShownToast:true})
// Cookie.set('user',JSON.stringify(result),{ expires: 7 })
authenticate(result);
// Cookie.set('user',JSON.stringify(result.user),{ expires: 7 })
// console.log("(((((((("+JSON.stringify(result.user))
// router.push('/about')
  }
console.log(toShowToast)

setTimeout(handlingTost, 5000);


}
return(
    <>
    <Head>
        <title>Login Page</title>
    </Head>

<div className='h-[100vh] '>
<Header/>

{isloading && <Loading/>}
{!isloading &&<div className=" flex  h-[80vh] justify-center items-center ">

        <form
          className="w-[33rem]  p-[2.5rem] rounded-lg bg-secoundblack  border-[#717377] border-[1px]"
          enctype="multipart/form-data" 
        >
          <p className='text-[#717377] text-lg font-bold text-center '>WELCOME BACK</p>
          <h3 className='text-white text-center mb-[2rem]'>Log in to your account</h3>
          <p className='text-[#dcdcdc]'>E-Mail or Htno</p>
 <input
            type="text"
            class="block w-full rounded-md border-lightblack border-[2px]  py-1.5 pl-7 pr-20  text-white text-lightblack-900 ring-1 ring-inset ring-lightblack-300 placeholder:text-gray-400 focus:ring-2 bg-secoundblack focus:ring-inset focus:ring-lightblack-600 border-lightblack sm:text-sm sm:leading-6  mb-6"
            placeholder="Enter your email id"
            onChange={ handleInput("email")}
            value ={email}

          />
           <p className='text-[#dcdcdc]'>Password</p>
 <input
            type="password"
            class="block w-full rounded-md border-lightblack border-[1px]  py-1.5 pl-7 pr-20  text-white text-lightblack-900 ring-1 ring-inset ring-lightblack-300 placeholder:text-gray-400 focus:ring-2 bg-secoundblack focus:ring-inset focus:ring-lightblack-600 border-lightblack sm:text-sm sm:leading-6  mb-6"
         
            placeholder="Enter your password"
            onChange={ handleInput("password")}
            value ={password}

          />
 <button
            className="block w-full bg-primarycolor rounded-md border-0 py-1.5 pl-7 pr-20  my-4 bg-indigo-600 text-white "
            type="submit"
            onClick={onSubmitLogin}
          >
            
            {" "}
            Login now
          </button>
          <p className='text-[#717377]'>Not Registered yet? <Link href={"/signup"} className='text-white no-underline hover:text-white'> Register &rarr;</Link></p>
          </form>
          </div>
}
          </div>
    </>
)
}

export default Login