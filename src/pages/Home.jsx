import { useSelector } from 'react-redux';
import { useEffect, useState, useRef } from "react";
import service from "../appwrite/config";
import {  Postcard } from "../components";

const Home = () => {
  const errorRef = useRef(null);
  const authStatus = useSelector((state) => state.userStatus)
  const [post, setPost] = useState([]);
  // console.log(post.length)
  useEffect(() => {
    service
      .getAllPost()
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
  if (post.length === 0) {
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
      {/* <Container> */}
        <div className="flex flex-wrap">
          {post.map((post) => (
            <div className="p-2 w-1/4 " key={post.$id}>
              <Postcard post={post} />
            </div>
          ))}
        </div>
      {/* </Container> */}
    </div>
  );
};

export default Home;
