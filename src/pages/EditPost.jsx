import  { useEffect, useState } from "react";
import { Container, Postform } from "../components";
// import service from "../appwrite/config";
import { useParams, useNavigate } from "react-router-dom";

import { Client, Databases } from "appwrite";

const EditPost = () => {
    const client = new Client();
    client
      .setEndpoint("https://cloud.appwrite.io/v1")
      .setProject("652cdde78fa4958d6aa2");
    
    const databases = new Databases(client);
    const [post,setPost] = useState([]);
    console.log(post)
    const {slug} = useParams();
    console.log(slug)
    const navigate = useNavigate();
// function for get a single post 
 const getPost = async (slug) =>{
    try {
        console.log(slug)
        return await databases.getDocument("652ce76ac7256a2dd4a9","652ce791c3e46d9a6fd0",slug)
    } catch (error) {
        console.log(error)
    }
}
    useEffect(() => {
 if(slug){
    getPost(slug)
    .then((post) => {
        console.log(post)
        if(post ){
            setPost(post)
        }
    })

 }
    },[slug,navigate])

    return <div className="py-8" > 
    <Container>
        <Postform post={post} />
    </Container>
    </div>;
};

export default EditPost;
