import axios from 'axios';
import { json } from 'express/lib/response';

// this file holds your frontend network request adapters
// think about each function as a service that provides data
// to your React UI through AJAX calls

// for example, if we need to display a list of users
// we'd probably want to define a getUsers service like this:

/* 
  export async function getUsers() {
    try {
      const { data: users } = await axios.get('/api/users')
      return users;
    } catch(err) {
      console.error(err)
    }
  }
*/

export async function getAPIHealth() {
  try {
    const { data } = await axios.get('/api/health');// can use fwtch
    return data;
  } catch (err) {
    console.error(err);
    return { healthy: false };
  }
}
export const registerUser = async (username, password)=>{
  try {
    const response= await fetch(
      '/api/users/register',
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body:JSON.stringify({user:{username,password}})
      }
    )
    const data =await response.json();
    localStorage.setItem("token",data.data.token)
    return data.data.token;
  } catch (error) {
    console.error(error)
  }
}
export const loginUser= async (username, password)=>{
try {
  const response=await fetch(
    '/api/users/login',
    {
      method: "POST",
      headers:{"Content-Type": "application/json"},
      body: JSON.stringify({user:{username:username, password:password}})
    }
  )
  const data=await response.json();
  localStorage.setItem("token",data.data.token);
  return data.data.token;
} catch (error) {
  console.error(error)
}
}

//    api/users/login
