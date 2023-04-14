import React from 'react'
import Image from 'next/image';
 function Add() {
  return (
   <>
    <form
          className="w-[35rem]  h-[90vh] m-auto bg-white p-[1rem]"
        //   onSubmit={handleSubmit}
          enctype="multipart/form-data"
        >
          {/* <h2 className="text-center ">Add Fee </h2> */}
          <Image src ="https://res.cloudinary.com/dfceagnv7/image/upload/v1680453197/users/ry3lij3swjmhy1seulnh.jpg" className='rounded-[50%] m-auto' width={100} height={100}></Image>
          <input
            type="text"
            class="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6  my-4"
            placeholder="Title"
            // onChange={handleInput("firstName")}
            // value={firstName}
    
          />
          <input
            type="text"
            class="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6  my-4"
            placeholder="description"
            // onChange={handleInput("lastName")}
            // value={lastName}
          />
 <input
            type="Number"
            class="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6  my-4"
            placeholder="Amount"
            // onChange={handleInput("lastName")}
            // value={lastName}
          />
          <input
            type="Date"
            class="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6  my-4"
            placeholder="Amount"
            // onChange={handleInput("lastName")}
            // value={lastName}
          />
  <button
            className="block w-full bg-primary rounded-md border-0 py-1.5 pl-7 pr-20  my-4 bg-indigo-600 text-white "
            type="submit"
          >
            {" "}
            Submit
          </button>
          </form>
   </>
  )
}

export default Add;