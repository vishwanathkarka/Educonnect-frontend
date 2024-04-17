import axios from "axios";
import { BASEURL } from "@next/env";
// https://college-mangment.onrender.com
export const postData = async (url, post, token) => {
  const res = await fetch(
    `http://localhost:4000/api/v1${url}`,
    {
      method: "POST",
      headers: {
        Authorization: token,

        mode: "no-cors",
        "Content-Type": "application/json",
        // "Content-Type": "multipart/form-data",
        // "Accept": "application/json"
        Accept: "application/json",
        // "type": "formData"
      },

      body: JSON.stringify(post),
    }
  );

  console.log(token);
  const data = await res.json();
  console.log(data);
  return data;
};

export const authenticate = (data) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("user", JSON.stringify(data));
  }
};

export const isAuthenticated = () => {
  if (typeof window == "undefined") {
    return false;
  }
  if (localStorage.getItem("user")) {
    return JSON.parse(localStorage.getItem("user"));
  } else {
    return false;
  }
};

export const signout = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("user");

    return axios
      .get(`${process.base_url}/signout`)
      .then(function () {
        // handle success
        console.log("signout");
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }
};

export const postDataForm = async (url, post, token) => {
  const res = await fetch(
    `http://localhost:4000/api/v1${url}`,
    {
      method: "POST",
      headers: {
        Authorization: token,
        mode: "no-cors",
        // 'Content-Type': 'application/json'
        // "Content-Type": "multipart/form-data",
        Accept: "application/json",
        // 'Content-Type': 'application/json'
        // "type": "formData"
      },
      body: post,
    }
  );

  const data = await res.json();
  console.log(data);
  return data;
};

export const postDataJson = async (url, post, token) => {
  const res = await fetch(
    `http://localhost:4000/api/v1${url}`,
    {
      method: "POST",
      headers: {
        Authorization: token,
        mode: "no-cors",
        "Content-Type": "application/json",
        // "Content-Type": "multipart/form-data",
        // "Accept": "application/json"
        // "type": "formData"
      },
      body: post,
    }
  );

  const data = await res.json();
  console.log(data);
  return data;
};

export const getData = async (url, token) => {
  return await fetch(`http://localhost:4000/api/v1${url}`, {
    method: "GET",
    headers: {
      Authorization: token,
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const updateData = async (url, post, token) => {
  const res = await fetch(
    `http://localhost:4000/api/v1${url}`,
    {
      method: "PUT",
      headers: {
        Authorization: token,
        mode: "no-cors",
        // 'Content-Type': 'application/json'
        // "Content-Type": "multipart/form-data",
        // "Accept": "application/json"
        "Content-Type": "application/json",
        // "type": "formData"
      },
      body: JSON.stringify(post),
    }
  );
  const data = await res.json();
  console.log(data);
  return data;
};

export const deleteData = async (url, token) => {
  const res = await fetch(
    `http://localhost:4000/api/v1${url}`,
    {
      method: "DELETE",
      headers: {
        Authorization: token,
        mode: "no-cors",
        // 'Content-Type': 'application/json'
        // "Content-Type": "multipart/form-data",
        // "Accept": "application/json"
        "Content-Type": "application/json",
        // "type": "formData"
      },
    }
  );
  const data = await res.json();
  console.log(data);
  return data;
};


