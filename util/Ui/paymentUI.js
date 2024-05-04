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
                // onClick={() => {
                //   setIsApp(1);
                // }}
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
            
            {props.isPaid == false && props.payButton == undefined && (<button className=" bg-primarycolor text-white px-5 rounded-xl"><Link href={props.link} >Pay Now </Link> </button>)}
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

{props.isPaid == false && props.payButton == true &&  (
  <>
    <td className="flex items-center gap-2 justify-center "></td>
  <p
    className="  text-[#FFD43B]"
   
  > Pending</p>
    <svg
   xmlns="http://www.w3.org/2000/svg"
   width="27"
   height="21"
   viewBox="0 0 27 21"
 >
   <g id="Group_51" data-name="Group 51">
     <rect
       id="Rectangle_16"
       data-name="Rectangle 16"
       width="27"
       height="21"
       rx="8"
       fill="rgba(255,212,59,0.36)"
     />
   </g>
   <path
     id="Icon_awesome-clock"
     data-name="Icon awesome-clock"
     d="M7.562.562c-3.866,0-7,2.21-7,4.938s3.133,4.937,7,4.937,7-2.21,7-4.937S11.428.562,7.562.562Zm1.611,6.97L6.684,6.257a.228.228,0,0,1-.138-.193V2.713c0-.131.152-.239.339-.239H8.239c.186,0,.339.108.339.239V5.454l1.792.92a.2.2,0,0,1,.073.334l-.8.772A.441.441,0,0,1,9.173,7.533Z"
     transform="translate(5.938 5)"
     fill="#ffd43b"
   />
 </svg>

    </>
  
)
}
          </td>
        )}
        {/* </div> */}
      </tr>
    </>
  );
}

export default PaymentUI;
