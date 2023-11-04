import  { useEffect, useState } from "react";
import { Container, Postform } from "../components";
import service from "../appwrite/config";
import { useParams, useNavigate } from "react-router-dom";



const EditPost = () => {

    const [posts,setPost] = useState([]);
    const {slug} = useParams();
    const navigate = useNavigate();

    useEffect(() => {
 if(slug){
    service.getPost(slug)
    .then((post) => {
        if(post ){
            setPost(post)
        }
    })

 }
    },[slug,navigate])

    return <div className="py-8" > 
    <Container>
        <Postform post={posts} />
    </Container>
    </div>;
};

export default EditPost;
