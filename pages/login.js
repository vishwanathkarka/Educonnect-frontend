import React, { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import Header from "@/util/header";
import { postData } from "../util/apicalls";
import { authenticate } from "../util/apicalls";
import Cookie from "js-cookie";
import { useRouter } from "next/router";
import Loading from "@/util/loading";
import toast, { Toaster } from "react-hot-toast";

function Login() {
  const notify = () => toast("Here is my toast!");
  const errorNotify = () => toast.error("Error");
  const handleButtonClick = (el) => {
    el.preventDefault();
    console.log("workinnggg");
    toast("Hello World", {
      duration: 4000,
      position: "top-center",

      // Styling
      style: {},
      className: "",

      // Custom Icon
      icon: "👏",

      // Change colors of success/error/loading icon
      iconTheme: {
        primary: "#000",
        secondary: "#fff",
      },

      // Aria
      ariaProps: {
        role: "status",
        "aria-live": "polite",
      },
    });
  };

  const [isloading, setloading] = useState(false);
  let router = useRouter();
  const userInput = { email: "", password: "" };
  const [loginData, setLoginData] = useState(userInput);
  const [toShowToast, setToShowToast] = useState({
    isShownToast: false,
    msg: { title: "", msg: "" },
    toastColor: "",
  });
console.log(process.env.URL)
  const { isShownToast, msg, toastColor } = toShowToast;

  const { email, password } = loginData;
  // handling the input
  const handleInput = (name) => (el) => {
    setLoginData({ ...loginData, [name]: el.target.value });
  };
  const guestParentLogin = async (el) => {
    el.preventDefault();
    await setLoginData({
      email: "vishwanathparent@gmail.com",
      password: "vishwanathparent@gmail.com",
    });
    //  await onSubmitLogin(el)
  };

  const guestStudentLogin = async (el) => {
    el.preventDefault();

    await setLoginData({
      ...loginData,
      email: "vishwanath@gmail.com",
      password: "vishwanath@gmail.com",
    });
    //  onSubmitLogin(el)
  };
  const guestLecturerLogin = async (el) => {
    el.preventDefault();
    await setLoginData({
      ...loginData,
      email: "Devon@gmail.com",
      password: "Devon@gmail.com",
    });
    //  onSubmitLogin(el)
  };

  const guestAdminLogin = async (el) => {
   
    el.preventDefault();
    await setLoginData({
      ...loginData,
      email: "admin@gmail.com",
      password: "admin@gmail.com",
    });
    //  onSubmitLogin(el)
  };
  // handling the toast view
  const handlingTost = () => {
    setToShowToast({ ...toShowToast, isShownToast: false });
  };

  // submit form
  const onSubmitLogin = async (el) => {
    el.preventDefault();
   
   
   let waiting =  toast.loading('Waiting...',{
    
      style: {
        borderRadius: '10px',
        background: '#333',
        color: '#fff',
      },
    })
   
   

  


    console.log(loginData);
    console.log(email);
    const result = await postData("/login", {
      email: email,
      password: password,
    });
    // logged in then we redirect to the dashboard
    if (result.status == true) {
      toast.dismiss(waiting);
       toast.success("Login is Successful",{
    
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        }});
      setTimeout(() => {
        router.push("/dashboard");
      }, "600");
      setToShowToast({
        ...toShowToast,
        toastColor: "bg-success",
        msg: { title: "Logged successfully" },
        isShownToast: true,
      }
   
    );
      
      authenticate(result);

     return
    }

    toast.dismiss(waiting);
     toast.error("Error in Login",{
    
      style: {
        borderRadius: '10px',
        background: '#333',
        color: '#fff',
      }})
    setTimeout(handlingTost, 5000);
  };
  return (
    <>
      <Head>
        <title>Login Page</title>
      </Head>

      <div className="h-[100vh] ">
        <Header />

        {/* {isloading && <Loading />} */}
        {!isloading && (
          <div className=" flex  h-[80vh] justify-center items-center ">
            <Toaster position="top-center" />
            <form
              className="w-[33rem]  p-[2.5rem] rounded-lg bg-secoundblack  border-[#717377] border-[1px]"
              enctype="multipart/form-data"
              onSubmit={onSubmitLogin}
            >
              {/* <button onClick={sucessNotify}>jfjff</button> */}
              <p className="text-[#717377] text-lg font-bold text-center ">
                WELCOME BACK
              </p>
              <h3 className="text-white text-center mb-[2rem]">
                Log in to your account
              </h3>
              <p className="text-[#dcdcdc]">E-Mail or Htno</p>

              <input
                type="text"
                class="block w-full rounded-md border-lightblack border-[2px]  py-1.5 pl-7 pr-20  text-white text-lightblack-900 ring-1 ring-inset ring-lightblack-300 placeholder:text-gray-400 focus:ring-2 bg-secoundblack focus:ring-inset focus:ring-lightblack-600 border-lightblack sm:text-sm sm:leading-6  mb-6"
                placeholder="Enter your email id"
                onChange={handleInput("email")}
                value={email}
              />
              <p className="text-[#dcdcdc]">Password</p>
              <input
                type="password"
                class="block w-full rounded-md border-lightblack border-[1px]  py-1.5 pl-7 pr-20  text-white text-lightblack-900 ring-1 ring-inset ring-lightblack-300 placeholder:text-gray-400 focus:ring-2 bg-secoundblack focus:ring-inset focus:ring-lightblack-600 border-lightblack sm:text-sm sm:leading-6  mb-6"
                placeholder="Enter your password"
                onChange={handleInput("password")}
                value={password}
              />
              <button
                className="block w-full bg-primarycolor rounded-md border-0 py-1.5 pl-7 pr-20  my-4 bg-indigo-600 text-white "
                type="submit"
              >
                Login now
              </button>

              <p className="text-[#717377]">
                Not Registered yet?{" "}
                <Link
                  href={"/signup"}
                  className="text-white no-underline hover:text-white"
                >
                  Register &rarr;
                </Link>
              </p>
              <div className="flex flex-wrap gap-[1rem] justify-center">
                <button
                  onClick={guestParentLogin}
                  className="bg-[#71737790] mt-3 px-4 py-2.5  rounded-md border-0 text-[white] flex"
                >
                  Guest Parent Login
                </button>
                <button
                  onClick={guestStudentLogin}
                  className="bg-[#71737790] mt-3 px-4 py-2.5  rounded-md border-0 text-[white]"
                >
                  Guest Student Login
                </button>

                <button
                  onClick={guestLecturerLogin}
                  className="bg-[#71737790] mt-3 px-4 py-2.5  rounded-md border-0 text-[white]"
                >
                  Guest lecturer Login
                </button>

                <button
                  onClick={guestAdminLogin}
                  className="bg-[#71737790] mt-3 px-4 py-2.5  rounded-md border-0 text-[white]"
                >
                  Guest Admin Login
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </>
  );
}

export default Login;
