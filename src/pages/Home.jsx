/* eslint-disable no-empty */
import { useSelector } from 'react-redux';
import { useEffect, useState, useRef } from "react";
// import service from "../appwrite/config";
import {  Postcard } from "../components";
import { Client, Databases } from "appwrite";
import {Container} from '../components';

const Home = () => {
  const errorRef = useRef(null);
  const authStatus = useSelector((state) => state.userStatus)
  
  const [post, setPost] = useState([]);


  const client = new Client();
  client
    .setEndpoint("https://cloud.appwrite.io/v1")
    .setProject("652cdde78fa4958d6aa2");
  
  const databases = new Databases(client);

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
        if (post) {
        
          setPost(post.documents);
          
        }
      })
      .catch((err) => {
        if (err) {
          errorRef.current = err;
          console.log(err, "This Error ocurred in pages/Home");
        }
      });
  }, []);
  if (post.length === 0 && !authStatus) {
    return (
      <div className="w-full py-8 mt-4 text-center">
        <div className="p-2 w-full">
          <h1 className="text-2xl font-bold hover:text-gray-500">
            Login to Read Posts
          </h1>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap">
          {post.map((post) => (
            <div className="p-2 w-1/4 " key={post.$id}>
              <Postcard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default Home;
