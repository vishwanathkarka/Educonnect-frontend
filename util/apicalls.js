import axios from "axios";



export const postData = async (url, post) => {
    const res = await fetch(`http://localhost:4000/api/v1${url}`, {
        method: 'POST',
        headers: {
        
            // 'Authorization': token,
            'mode': 'no-cors',
            // 'Content-Type': 'application/json'
            // "Content-Type": "multipart/form-data",
            // "Accept": "application/json"
            'Content-Type': 'application/json'
            // "type": "formData"
          
        },
        body: JSON.stringify(post)
    })

    const data = await res.json()
    console.log(data)
    return data
}

export const postDataForm = async (url, post) => {
    const res = await fetch(`http://localhost:4000/api/v1${url}`, {
        method: 'POST',
        headers: {
        
            // 'Authorization': token,
            'mode': 'no-cors',
            // 'Content-Type': 'application/json'
            // "Content-Type": "multipart/form-data",
            "Accept": "application/json"
            // 'Content-Type': 'application/json'
            // "type": "formData"
          
        },
        body: post
    })

    const data = await res.json()
    console.log(data)
    return data
}

export const postDataJson = async (url, post, token) => {
    const res = await fetch(`http://localhost:4000/api/v1${url}`, {
        method: 'POST',
        headers: {
        
            'Authorization': token,
            'mode': 'no-cors',
            'Content-Type': 'application/json'
            // "Content-Type": "multipart/form-data",
            // "Accept": "application/json"
            // "type": "formData"
          
        },
        body: post
    })

    const data = await res.json()
    console.log(data)
    return data
}

export const getData = async (url, token) => {

        return fetch(`http://localhost:4000/api/v1${url}`, {
            method: "GET"
          })
            .then(response => {
              return response.json();
            })
            .catch(err => console.log(err));
        }