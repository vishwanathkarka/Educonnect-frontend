import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import moment from "moment";
import { getData, isAuthenticated,postDataForm} from "./apicalls";
export default function HomeworkUi(props) {

  const [userData,setUserData] = useState(null)
  const [userHomeWorkData,setUserHomeWorkData] = useState(null)
  useEffect(() => {
  setUserData(isAuthenticated().user)
const userDataHomeWork= async()=>{
 const userHomeWork = await getData(`/gethomeworkstudent/${isAuthenticated().user._id}/${props.id}`,isAuthenticated().token)
  setUserHomeWorkData(userHomeWork)

// console.log(userhomework)
 }

// console.log(userHomeWork)
userDataHomeWork()
  }, []);
  console.log(userHomeWorkData)
 const  handleInput = (user)=>  async(el)=>{
  console.log(el.target.value)
  let bodyFormData = new FormData();
  bodyFormData.append("homeworkFile",el.target.files[0])
  bodyFormData.append("data",JSON.stringify({"userId":userData._id,"submittedDate":new Date()}))
  let data = await postDataForm(`/addhomeworkbylectureid/${props.id}`,bodyFormData,userData.token)
  if(data.success == true){
    setUserHomeWorkData({...userHomeWorkData,homeworkres:true})
  }
console.log(data)
  }
  return (
    <>
{/* desktop view */}
      <tr className="text-[#606F7B] hidden lg:table-row  border-b-[rgba(246,247,249,.05)]  border-b-[1px] h-[3.5rem]">
        {/* <Link href={props.link } className='no-underline ' onClick={()=>props.userId(props.id)} > */}
      
        {userHomeWorkData && userHomeWorkData.homeworkres == null && userHomeWorkData.success==true  &&
        
        <td>
        <input type="file" name="file" id="file" className="w-[0.1px] h-[0.1px] opacity-0 overflow-hidden absolute z-[-1] cursor-pointer " onChange={ handleInput("files")} /> 
<label for="file" ><svg
            xmlns="http://www.w3.org/2000/svg"
            width="35"
            height="30"
            viewBox="0 0 35 30"
          >
            <rect
              id="Rectangle_16"
              data-name="Rectangle 16"
              width="35"
              height="30"
              rx="15"
              fill="rgba(48,132,208,0.36)"
            />
            <path
              id="Icon_awesome-file-upload"
              data-name="Icon awesome-file-upload"
              d="M8.383,4.957V0H.9A.885.885,0,0,0,0,.875V17.785a.885.885,0,0,0,.9.875H13.473a.885.885,0,0,0,.9-.875V5.831H9.281A.889.889,0,0,1,8.383,4.957Zm2.439,7.873H8.383v2.916a.591.591,0,0,1-.6.583h-1.2a.591.591,0,0,1-.6-.583V12.829H3.549a.581.581,0,0,1-.422-1L6.735,8.344a.65.65,0,0,1,.9,0l3.608,3.488A.581.581,0,0,1,10.822,12.829Zm3.287-9L10.445.255A.91.91,0,0,0,9.809,0H9.581V4.665h4.79V4.443A.86.86,0,0,0,14.109,3.827Z"
              transform="translate(11.314 5.67)"
              fill="#117ff4"
            />
          </svg></label>


        </td> }
        {
       userHomeWorkData &&   userHomeWorkData.success== true  && userHomeWorkData.homeworkres != null && <td></td>
        }
        <td>{props.title}</td>

        <td>{ moment(props.uploaded).format("MMMM Do YYYY")}</td>
        <td>{ moment(props.lastupload).format("MMMM Do YYYY")}</td>

        <td>
          <tr className="">
            {" "}
            <td className="px-2">
              {" "}
              <Image
                src={props.img}
                height={40}
                width={40}
                alt="user"
                className="rounded-[6rem]"
              />
            </td>
            
            <tr>
              {" "}
              <td className="text-white font-normal p-0 m-0 text-[0.9rem]">{props.lname}</td>
            </tr>
            <tr>
              {" "}
              <td className="text-[0.9rem]">{props.lemail}</td>
            </tr>
          </tr>
        </td>
        <td>
         { userHomeWorkData &&  userHomeWorkData.homeworkres != null? <svg xmlns="http://www.w3.org/2000/svg" width="27" height="21" viewBox="0 0 27 21">
  <rect id="Rectangle_16" data-name="Rectangle 16" width="27" height="21" rx="8" fill="rgba(23,142,113,0.4)"/>
  <path id="Icon_feather-check" data-name="Icon feather-check" d="M17.806,9,9.689,16.5,6,13.091" transform="translate(2.096 -2.25)" fill="none" stroke="#1a8e72" stroke-linecap="round" stroke-linejoin="round" stroke-width="3"/>
</svg>:<svg xmlns="http://www.w3.org/2000/svg" width="27" height="21" viewBox="0 0 27 21">
  <g id="Group_51" data-name="Group 51">
    <rect id="Rectangle_16" data-name="Rectangle 16" width="27" height="21" rx="8" fill="rgba(255,212,59,0.36)"/>
  </g>
  <path id="Icon_awesome-clock" data-name="Icon awesome-clock" d="M7.562.562c-3.866,0-7,2.21-7,4.938s3.133,4.937,7,4.937,7-2.21,7-4.937S11.428.562,7.562.562Zm1.611,6.97L6.684,6.257a.228.228,0,0,1-.138-.193V2.713c0-.131.152-.239.339-.239H8.239c.186,0,.339.108.339.239V5.454l1.792.92a.2.2,0,0,1,.073.334l-.8.772A.441.441,0,0,1,9.173,7.533Z" transform="translate(5.938 5)" fill="#ffd43b"/>
</svg>}
        </td>
      </tr>
{/* ------  desktop view  ------ */}


<div className="text-[#606F7B] lg:hidden  border-b-[rgba(246,247,249,.05)]  border-b-[1px] flex flex-col flex-wrap  m-0 p-0 justify-center items-center gap-1 ">
{userHomeWorkData && userHomeWorkData.homeworkres == null && userHomeWorkData.success==true  &&
        <div className="">
        <input type="file" name="file" id="file" className="w-[0.1px] h-[0.1px] opacity-0 overflow-hidden absolute z-[-1] cursor-pointer " onChange={ handleInput("files")} /> 
<label for="file" ><svg
            xmlns="http://www.w3.org/2000/svg"
            width="35"
            height="30"
            viewBox="0 0 35 30"
          >
            <rect
              id="Rectangle_16"
              data-name="Rectangle 16"
              width="35"
              height="30"
              rx="15"
              fill="rgba(48,132,208,0.36)"
            />
            <path
              id="Icon_awesome-file-upload"
              data-name="Icon awesome-file-upload"
              d="M8.383,4.957V0H.9A.885.885,0,0,0,0,.875V17.785a.885.885,0,0,0,.9.875H13.473a.885.885,0,0,0,.9-.875V5.831H9.281A.889.889,0,0,1,8.383,4.957Zm2.439,7.873H8.383v2.916a.591.591,0,0,1-.6.583h-1.2a.591.591,0,0,1-.6-.583V12.829H3.549a.581.581,0,0,1-.422-1L6.735,8.344a.65.65,0,0,1,.9,0l3.608,3.488A.581.581,0,0,1,10.822,12.829Zm3.287-9L10.445.255A.91.91,0,0,0,9.809,0H9.581V4.665h4.79V4.443A.86.86,0,0,0,14.109,3.827Z"
              transform="translate(11.314 5.67)"
              fill="#117ff4"
            />
          </svg></label>
          </div> }
          <div>
          <p className="text-lightwg m-0 text-center">subject</p>
          <p className="m-0">{props.title}</p>
          </div>
          <div>
<p className="text-lightwg m-0">Uploaded on</p>
<p>{ moment(props.uploaded).format("MMMM Do YYYY")}</p>
</div>
<div>
<p className="text-lightwg m-0">Uploaded on</p>
<p>{ moment(props.lastupload).format("MMMM Do YYYY")}</p>
</div>
<div>
<p className="text-lightwg m-0">Uploaded By</p>
<div className="">
 
            
         
            
            <div>
              {" "}
              <p className=" font-normal p-0 m-0 text-[0.9rem]">{props.lname}</p>
            </div>
            <div>
           
            </div>
          </div>
          </div>
          
<div>
<p className="text-lightwg m-0">Status</p>
         { userHomeWorkData &&  userHomeWorkData.homeworkres != null?<div className="flex gap-2">  <svg xmlns="http://www.w3.org/2000/svg" width="27" height="21" viewBox="0 0 27 21">
  <rect id="Rectangle_16" data-name="Rectangle 16" width="27" height="21" rx="8" fill="rgba(23,142,113,0.4)"/>
  <path id="Icon_feather-check" data-name="Icon feather-check" d="M17.806,9,9.689,16.5,6,13.091" transform="translate(2.096 -2.25)" fill="none" stroke="#1a8e72" stroke-linecap="round" stroke-linejoin="round" stroke-width="3"/>
</svg> <p>Uploaded</p> </div>: <div className="flex gap-2"> <svg xmlns="http://www.w3.org/2000/svg" width="27" height="21" viewBox="0 0 27 21">
  <g id="Group_51" data-name="Group 51">
    <rect id="Rectangle_16" data-name="Rectangle 16" width="27" height="21" rx="8" fill="rgba(255,212,59,0.36)"/>
  </g>
  <path id="Icon_awesome-clock" data-name="Icon awesome-clock" d="M7.562.562c-3.866,0-7,2.21-7,4.938s3.133,4.937,7,4.937,7-2.21,7-4.937S11.428.562,7.562.562Zm1.611,6.97L6.684,6.257a.228.228,0,0,1-.138-.193V2.713c0-.131.152-.239.339-.239H8.239c.186,0,.339.108.339.239V5.454l1.792.92a.2.2,0,0,1,.073.334l-.8.772A.441.441,0,0,1,9.173,7.533Z" transform="translate(5.938 5)" fill="#ffd43b"/>
</svg> <p>Pending</p> </div>}
</div>
       

</div>

    </>
  );
}
