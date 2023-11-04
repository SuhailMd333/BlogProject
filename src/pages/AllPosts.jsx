import {useEffect,useState,useRef} from 'react'
import { Postcard,Container } from '../components'
import service from '../appwrite/config'
const AllPosts = () => {

const [posts,setPosts]=useState([])
let error = useRef(null)
useEffect(() => {

service.getAllPost()
.then((post) => {
    if(post){
        setPosts(post.documents)
    }
})
.catch((err) =>{
    if(err){
        error.current = err
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
     posts.map((post) => (
         <div className="p-2 w-1/4" key={post.$id}>
             <Postcard post={post} />
         </div>
     ))
 }
 </div>
</Container>
</div>)
}

export default AllPosts