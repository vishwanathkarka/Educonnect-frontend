import React from 'react'

export default function section() {
  return (
   <>
     <select
                                  className="block w-full rounded-md border-0 bg-secoundblack text-white py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 my-4"
                                  id="section"
                                  // onChange={departments[index].section.splice(indx,1,{section:})}
                                >
                                  {props.sectionListFetch.map((data) => (
                                    <option
                                      value={data._id}
                                      //  selected = {activeSelect(data._id,departmentSelected)}
                                      selected={
                                        data._id == sec._id ? true : false
                                      }
                                      key={data._id}
                                    >
                                      {console.log(data._id)}
                                      {data.section}
                                    </option>
                                  ))}
                                </select>
   </>
  )
}
