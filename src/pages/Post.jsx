/* eslint-disable no-useless-catch */
import { Children, useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
// import service from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import { Client,Databases,Storage } from "appwrite";

const Post = () => {

  const client = new Client();
  client
    .setEndpoint("https://cloud.appwrite.io/v1")
    .setProject("652cdde78fa4958d6aa2");
  const storage = new Storage(client);
  const databases = new Databases(client);
  const [post, setPost] = useState([]);
  console.log(post)
  const { slug } = useParams();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.userData);
  

  const isAuthor = userData && post  ? post.userId == userData.userData.$id : false;
  const getPost = async (databaseId,collectionId,slug) => { 
    try {
      const doc = await databases.getDocument(databaseId,collectionId,slug);
      return doc
    } catch (error) {
      console.log(error)
    }
  
  }
  useEffect(() => {
    if (slug) {
      
      getPost("652ce76ac7256a2dd4a9","652ce791c3e46d9a6fd0",slug).then((post) => {
        console.log(post)
        post ? setPost(post) : navigate("/");
      });
    } else navigate("/");
  }, [slug, navigate]);

//function for ge // function for get the file preview 
    const getFilePreview =  (bucketId,fileId) => {
      try{
      if(post.length != 0) {
        
        const result =  storage.getFilePreview(bucketId,fileId);
      
        return result
      }
      } catch (error) {
        throw error
      }
    }

  //function for deleting a post
const deletepost = async (postId) => {
    try {
        return await databases.deleteDocument("652ce76ac7256a2dd4a9","652ce791c3e46d9a6fd0",postId)
    } catch (error) {
        console.log(error)
    }

}
// function for deleting a file
  const deletefile = async (bucketId,fileId) => {
    try {
        
        return await storage.deleteFile(bucketId,fileId)
        
    }
     catch (error) {
        console.log(error)
    }
  } 
  const deletePost = () => {
    deletepost(post.$id).then((status) => {
      if (status) {
        deletefile("6549d9131c234e8fc650",post.featuredimage);
        navigate("/");
      }
    });
  };
  return post ? (
    <div className="py-8">
      <Container>
        <div className="w-full flex justify-between mb-4 relative border rounded-xl p-2">
          <img
            src={getFilePreview("6549d9131c234e8fc650",post.featuredimage)}
            alt={post.title}
            className="rounded-xl"
            // src=""
          />

          {isAuthor && (
            <div className="absolute right-6 top-6">
              <Link to={`/edit-post/${post.$id}`}>
                <Button bgColor="bg-green-500" className="mr-3">
                  Edit
                </Button>
              </Link>

              <Button onClick={deletePost} bgColor="bg-red-500">
                Delete
              </Button>
            </div>
          )}
        </div>
        <div className="w-full mb-6">
          <h1 className="text-2xl font-bold">{post.title}</h1>
        </div>
        <div className="browser-css">
          { post.length != 0  && parse(post.content)}
          </div>
      </Container>
    </div>
  ) : null;
};

export default Post;
