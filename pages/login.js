import React,{useState} from 'react'
import Head from 'next/head';
import Link from 'next/link';
import Header from 'components/header';
import {postData} from  '../util/apicalls';
import Toast from "../util/toast"
import {authenticate} from "../util/apicalls"
import Cookie  from "js-cookie"
import { useRouter } from 'next/router'


function Login (){
const userInput = {email:"",password:""}
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
  console.log(loginData);
  console.log(email)
  const result = await postData('/login',{"email":email,"password":password})
  console.log(result)
  if(result.status == true){
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
    <Header/>
   {()=>{ isShownToast?Toast(toastColor,msg,handlingTost):""}}
   {isShownToast?<Toast bgColor={toastColor} msg={msg} handleShow={handlingTost}/>:""}
    <form className="mx-auto my-4 d-flex justify-content-center align-items-center flex-column " style={{maxWidth: '500px',height:'90vh'}} >
          <div className="form-group my-2  w-100">
            <label htmlFor="exampleInputEmail1" value ={email}>Email address</label>
            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
            name="email" onChange={ handleInput("email")}  />
            <div id="emailHelp" className="form-text text-muted">We ll never share your email with anyone else.</div>
          </div>
          <div className="form-group my-2  w-100">
            <label htmlFor="exampleInputPassword1" value ={password}>Password</label>
            <input type="password" className="form-control " id="exampleInputPassword1"
            name="password"  onChange={ handleInput("password")} />
          </div>
          
          <button type="submit" className="my-4 btn btn-dark w-100" onClick={onSubmitLogin}>Login</button>

          <p className="my-2">
            You don t have an account? <Link href="/register">Register Now</Link>
          </p>
        </form>

 






{/* 
<Form>
  <FormGroup>
    <Label
      for="exampleEmail"
      hidden
    >
      Email
    </Label>
    <Input
      id="exampleEmail"
      name="email"
      placeholder="Email"
      type="email"
    />
  </FormGroup>
  {' '}
  <FormGroup>
    <Label
      for="examplePassword"
      hidden
    >
      Password
    </Label>
    <Input
      id="examplePassword"
      name="password"
      placeholder="Password"
      type="password"
    />
  </FormGroup>
  {' '}
  <Button>
    Submit
  </Button>
</Form> */}
    </>
)
}

export default Login