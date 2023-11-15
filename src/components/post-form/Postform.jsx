/* eslint-disable no-undef */
/* eslint-disable no-useless-catch */

/* eslint-disable react/prop-types */
import { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
// import service from "../../appwrite/config";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "../index";
import { Client, Storage, ID, Databases } from "appwrite";
export const Postform = ({ post }) => {
  console.log(post)
  const client = new Client();
  client
    .setEndpoint("https://cloud.appwrite.io/v1")
    .setProject("652cdde78fa4958d6aa2");
  const storage = new Storage(client);
  const databases = new Databases(client);
  const navigate = useNavigate();
  const { userData } = useSelector((state) => state.userData);
  console.log(userData);

  const { register, handleSubmit, control, watch, setValue, getValues } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.slug || "",
        content: post?.content || "",
        status: post?.status || "",
      },
    });


//function for deleting a file
 const deletefile = async (fileId) => {
  try {
      
      return await storage.deleteFile("6549d9131c234e8fc650",fileId)
      
  }
   catch (error) {
      console.log(error)
  }
} 

 

// function for upadating a post 
const  updatePost = async (slug,{title,content,featuredImage,status}) => {
  try {
      return  await databases.updateDocument("652ce76ac7256a2dd4a9",
          "652ce791c3e46d9a6fd0"
          ,slug
          ,{
              title,
              content,
              featuredImage,
              status

      })
  } catch (error) {
  console.log(error,": this error was occured in updatePost Method")
  }
 
}

    // function for get the file preview 
    if(post.length !== 0){
    const getFilePreview =  (bucketId,fileId) => {

      console.log(fileId)
      try{

      
        return  storage.getFilePreview(bucketId,fileId);
      } catch (error) {
        throw error
      }
    }
  }
  // Function for creating a  post
  const createPost = async ({
    title,
    slug,
    content,
    featuredimage,
    status,
    userId,
  }) => {
   
    try {
      return await databases.createDocument(
        "652ce76ac7256a2dd4a9",
        "652ce791c3e46d9a6fd0",
        ID.unique(),
        { title, content, featuredimage, status, userId }
      );
    } catch (error) {
      console.log(error, ": This error was occured in create Post  Method");
    }
  };

  // Function for uploading file
  const uploadFile = async (file) => {
    return await storage.createFile("6549d9131c234e8fc650", ID.unique(), file);
  };

  const submit = async (data) => {
    console.log(data)
    if (post) {
      console.log(post)
      const file = data.featuredimage[0] ? await uploadFile(data.featuredimage[0]) : null;
      if (file) {
        // eslint-disable-next-line react/prop-types
       await deletefile(post.featuredimage);
      }
      const dbPost = await updatePost(post.$id, {
        ...data,
        featuredimage: file ? file.$id : undefined,
      });
      if (dbPost) {
        navigate(`/post/${dbPost.$id}`);
      }
    } else {
    
      const file = await uploadFile(data.featuredimage[0]);
      
      console.log(file)
    
      if (file) {
        const fileId = file.$id;

        data.featuredimage = fileId;
        console.log(fileId)
        const dbPost = await createPost({ ...data, userId: userData.$id });
        console.log(dbPost)
        if (dbPost) {
          navigate(`/post/${dbPost.$id}`);
        }
      }
    }
    console.log(data)

    
  }; ///
  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string")
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");

    return "";
  }, []);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "name") {
        setValue(
          "slug",
          slugTransform(value.title, {
            shouldValidate: true,
          })
        );
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [watch, slugTransform, setValue]);

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
      <div className="w-2/3 px-2">
        <Input
          label="Title :"
          placeholder="Title"
          className="mb-4"
          {...register("title", { required: true })}
        />
        <Input
          label="Slug :"
          placeholder="Slug"
          className="mb-4"
          {...register("slug", { required: true })}
          onInput={(e) => {
            setValue("slug", slugTransform(e.currentTarget.value), {
              shouldValidate: true,
            });
          }}
        />
        <RTE
          label="Content :"
          name="content"
          control={control}
          defaultValue={getValues("content")}
        />
      </div>
      <div className="w-1/3 px-2">
        <Input
          label="Featured Image :"
          type="file"
          className="mb-4"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("featuredimage", { required: true })}
        />
        {post && (
          <div className="w-full mb-4">
            <img
              src={ post.lenght ? getFilePreview("6549d9131c234e8fc650",post?.featuredimage) : null}
              alt={post.title}
              className="rounded-lg"
            />
          </div>
        )}
        <Select
          options={["active", "inactive"]}
          label="Status"
          className="mb-4"
          {...register("status", { required: true })}
        />
        <Button
          type="submit"
          bgColor={post ? "bg-green-500" : undefined}
          className="w-full"
        >
          {post  ? "Update" : "Submit"}
        </Button>
      </div>
    </form>
  );
};
export default Postform;
