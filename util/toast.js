import React from 'react'

 function toast({bgColor,msg,handleShow}) {
  return (
    <div className={`toast show position-fixed text-light ${bgColor}`}
    style={{ top: '5px', right: '5px', zIndex: 9, minWidth: '280px' }} >
{console.log("f494949"+msg)}
        <div className={`toast-header ${bgColor} text-light d-flex justify-content-between`}>
            <strong className="mr-auto text-light">{msg.title}</strong>

            <button type="button" className="ml-2 mb-1 close text-light bg-danger rounded border border-0 " 
            data-dismiss="toast" style={{ outline: 'none'}} 
            onClick={handleShow}>x</button>
        </div>

        <div className="toast-body">{msg.msg}</div>

    </div>
  )
}

export default toast;