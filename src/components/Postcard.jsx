/* eslint-disable react/prop-types */
/* eslint-disable no-useless-catch */
// import {useId} from 'react'
// import { useState } from 'react'
// import service from '../appwrite/config'
import { Link } from 'react-router-dom'
import { Client,Storage } from 'appwrite'
// import { set } from 'react-hook-form'
// import { createActionCreatorInvariantMiddleware } from '@reduxjs/toolkit'
const Postcard = ({$id , title , featuredimage }) => {
  console.log($id)
  console.log(title)
console.log(featuredimage)
  const client = new Client();
  client
    .setEndpoint("https://cloud.appwrite.io/v1")
    .setProject("652cdde78fa4958d6aa2");
  const storage = new Storage(client);
  console.log(featuredimage)
    // function for get the file preview 
    const getFilePreview =  (bucketId,fileId) => {
      try{

      console.log(fileId)
        const result =  storage.getFilePreview(bucketId,fileId);
        console.log(result)
      
        return result
      } catch (error) {
        throw error
      }
    }
   
console.log(getFilePreview("6549d9131c234e8fc650",featuredimage))
  return (
  
  <Link to={`/post/${$id}`}>
  <div className="w-full bg-gray-100 rounded-xl p-4">
    <div className="w-full justify-center mb-4 ">
      <img src={getFilePreview("6549d9131c234e8fc650",featuredimage)}alt={title} className='rounded-xl font-bold' />

      <h2 className="text-xl font-bold"  > {title}</h2>
       </div>
  </div>
  </Link>
    )
}

export default Postcard