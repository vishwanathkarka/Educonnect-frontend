import {useState} from "react";
import Image from "next/image";
import UserDataEdit from "./userDataEdit";


function AdminCard(props) {
    const [viewForm, setViewForm] = useState(false);
    const formViewStatus = () => {
        setViewForm(!viewForm);
      };

      const closeForm = (status) => {
        if (status == true) {
            setViewForm(!viewForm);
        }
      };

    return (
      <div className="bg-secoundblack  mx-4 my-3  relative rounded-[35px] h-[200px] w-[170px] flex  text-center flex-col justify-center gap-4 items-center " key={props.key}>
        {false ? (
          <svg
            className=" absolute top-5 right-4 cursor-pointer"
            xmlns="http://www.w3.org/2000/svg"
            width="16.43"
            height="17"
            viewBox="0 0 16.43 17"
          >
            <ellipse
              id="Ellipse_19"
              data-name="Ellipse 19"
              cx="8.215"
              cy="8.5"
              rx="8.215"
              ry="8.5"
              fill="#b9b6f8"
            />
            <g
              id="Group_43"
              data-name="Group 43"
              transform="translate(5.06 5.051)"
            >
              <path
                id="Path_48"
                data-name="Path 48"
                d="M0,0H5.563V7.238H0Z"
                fill="none"
              />
              <line
                id="Line_14"
                data-name="Line 14"
                x1="6.809"
                y2="7.578"
                transform="translate(-0.249 -0.34)"
                fill="none"
                stroke="#808fbe"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
              />
              <line
                id="Line_15"
                data-name="Line 15"
                x2="6.809"
                y2="7.578"
                transform="translate(-0.249 -0.34)"
                fill="none"
                stroke="#808fbe"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
              />
                
            </g>
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="icon icon-tabler icon-tabler-plus  absolute top-5 right-4 cursor-pointer "
            width="24"
            height="24"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="#ffffff"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
            onClick={() => {
              closeForm(true);
            }}
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        )}
        <Image
          className="  w-[70px] h-[70px] rounded-[50%] border-lightwg border-[1px]"
          src={props.photo}
          alt="flower"
          width={700}
          height={800}
        />
        <div>
          <h6 className="ml-4 -mt-2 font-semibold  text-[white]">{props.name}</h6>
          {/* <h3 className='text-[#ffffff9e]'>{section}</h3> */}
        </div>
{viewForm &&  (
        <UserDataEdit
                      closeForm={formViewStatus}
                      name={props.name}
                      email={props.email}
                      role={props.role}
                      parentEmail={props.parentEmail}
                      htno={props.htno}
                      phoneNo={props.phoneNo}
                      id={props.id}
                      departments={props.departments}
                      viewForm={props.viewFormSet}
                      departmentListFetch={props.departmentListFetch}
                      sectionListFetch={props.sectionListFetch}

                      key={props.id}

                     
                    />
)
}
      </div>
    );
  }

  export default AdminCard