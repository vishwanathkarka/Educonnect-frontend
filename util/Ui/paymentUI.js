import React from "react";
import moment from "moment";
import Link from "next/link";
import Image from "next/image";
function PaymentUI(props) {
  return (
    <>
      <tr className=" m-auto text-center my-auto  ">
        {/* <div className="flex text-whitelight py-2 mx-4 gap-10  text-center border-b-[rgba(246,247,249,.05)] border-b-[1px] "> */}
        {props.img && (
          <td className=" ">
            <Image
              src={props.img}
              width={40}
              height={66}
              className="rounded-[50%]  shadow-md "
              alt={props.name}
            ></Image>
          </td>
        )}
        {props.name && props.htno && (
          <td className="  bg-transparent m-auto ">
            <tr className="text-lightwg  bg-transparent">{props.name}</tr>
            <tr className="text-[#717377]  bg-transparent">{props.htno}</tr>
          </td>
        )}
        {props.title && (
          <td className="text-[#717377] capitalize ">{props.title}</td>
        )}
        {props.description && (
          <td className="text-[#717377] capitalize ">{props.description}</td>
        )}
        {/* {props.paymentId && (
          <td className="text-[#717377] font-bold">{props.paymentId}</td>
        )} */}
        {props.amount && (
          <td className="text-primarycolor font-bold">{props.amount}/-</td>
        )}
        {props.phoneno && (
          <td className="text-primarycolor ">{"+91 " + props.phoneno}</td>
        )}
        {props.email && (
          <td className=" text-[#717377] font-bold">{props.email}</td>
        )}
        {props.paiddate && (
          <td className=" text-[#717377] font-bold ">{props.paiddate}</td>
        )}
        {props.lastday && (
          <td className="text-[#717377] font-bold">{moment(props.lastday).format("MMMM Do YYYY")}</td>
        )}
        { (
          <td className="flex items-center gap-2 justify-center ">
            {props.isPaid == true && (
              <>
              <p
                className="  text-[rgb(0,128,0)]"
                onClick={() => {
                  setIsApp(1);
                }}
              > Paid</p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="27"
                  height="21"
                  viewBox="0 0 27 21"
                >
                  <rect
                    id="Rectangle_16"
                    data-name="Rectangle 16"
                    width="27"
                    height="21"
                    rx="8"
                    fill="rgba(23,142,113,0.4)"
                  />
                  <path
                    id="Icon_feather-check"
                    data-name="Icon feather-check"
                    d="M17.806,9,9.689,16.5,6,13.091"
                    transform="translate(2.096 -2.25)"
                    fill="none"
                    stroke="#1a8e72"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="3"
                  />
                </svg>
                </>
            )
          }
            
            {props.isPaid == false && (<button className=" bg-primarycolor text-white px-5 rounded-xl"><Link href={props.link} >Pay Now </Link> </button>)}
            {props.add && (
              <div className="my-2">
               <Link href={props.link} onClick={() => props.userId(props.id)}  >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="icon icon-tabler icon-tabler-circle-plus"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="#ffffff"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <circle cx="12" cy="12" r="9" />
                  <line x1="9" y1="12" x2="15" y2="12" />
                  <line x1="12" y1="9" x2="12" y2="15" />
                </svg>
                </Link>
              </div>
            )}
          </td>
        )}
        {/* </div> */}
      </tr>
    </>
  );
}

export default PaymentUI;
