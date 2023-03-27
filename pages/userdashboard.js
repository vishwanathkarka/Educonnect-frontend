// import React, { useState } from 'react'

// const Select = () => {
//     const [inputValue,setInputValue] = useState('')
//     const [emplist, setEmpList] = useState([
//         {
//             empName: '---Select---'
//         }
//     ]);


//   const  addNewEmp=()=>{
//       setEmpList((data)=>({
//           inputValue: '',
//           emplist: [
//               ...data.emplist,
//               {
//                   empName: data.inputValue
//               }
//           ]
//       }))
//   }

//       let empRecords = emplist.map((data) => {
//         return "<option>{data.empName}</option>";
//       });

//     return (
//       <>
       
//         <input
//           type="text"
//           placeholder="add options"
//           onChange={(e)=> setInputValue(e.target.value)}
//         />
//          <button onClick={addNewEmp}>Add +</button>
//         <br />
//          <select>{empRecords}</select>
//          {inputValue}
       
//       </>
//     );
// }

// export default Select
