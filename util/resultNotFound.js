import React from 'react'
import Image from 'next/image'
import noResultFound from "./no-content.png"
export default function resultNotFound() {
  return (
    <div className="h-[80vh] flex justify-center items-center flex-col "><Image src ={noResultFound} width={200} height={200}/>
    <h2 className="text-[#626161]">Result Not Found </h2>
     </div>
  )
}
