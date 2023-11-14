/* eslint-disable no-empty */
import {useEffect,useState,useRef} from 'react'
import { Postcard,Container } from '../components'
import service from '../appwrite/config'
import {Databases ,Client} from 'appwrite';

const AllPosts = () => {

    const client = new Client();
client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("652cdde78fa4958d6aa2");

const databases = new Databases(client);
const [posts,setPosts]=useState([])

console.log(posts)
console.log(posts.$id)
let error = useRef(null)

// function for get all Posts
const getAllPost = async () => {
    try {
        return await databases.listDocuments(
            "652ce76ac7256a2dd4a9",
            "652ce791c3e46d9a6fd0"
             )
    } catch (error) {
        
    }
}
useEffect(() => {

getAllPost()
.then((post) => {
    console.log(post)
  
    if(post){
        setPosts(post.documents)
    }
})
.catch((err) =>{
    if(err){
        error.current = err
        console.log(err)
    }
})
},[])

if(posts){
    error = null
}

return ( <div className='py-8 w-full'> 
   
<Container>
<div className="flex flex-wrap"> 
{
     posts.map((post,index) =>{
             console.log(index)
             console.log(post.$id)
      
       return(
         <div className="p-2 w-1/4" key={post.$id}>
             <Postcard $id={post.$id} featuredimage={post.featuredimage} title={post.title}/>
         </div>
       )
     }
     )

 }
 </div>
</Container>
</div>)
}

export default AllPosts