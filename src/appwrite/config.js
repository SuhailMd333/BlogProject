import { Client,Databases } from "appwrite";
import { Storage } from "appwrite";
import confg from "../confg/confg"
 export class Service {
    client = new Client();
    databases
    storage
    constructer(){
        this.client.setEndpoint('https://cloud.appwrite.io/v1').setProject("652cdde78fa4958d6aa2")
      this.databases = new Databases(this.client)
      this.storage = new Storage(this.client)
    }
 // these all methods are responsible for crud operation in database
    async createPost({title,slug,content,featuredImage,status,userId}){
        if(!this.client){
            console.log("database is not initialized correctly")
        }
        try {
         return   await this.databases.createDocument(confg.appWriteDatabaseId,
                confg.appWriteCollectionId,
                slug,
                {title,
                    content,
                    featuredImage,
                    status,
                    userId

            })
        } catch (error) {
            console.log(error,": This error was occured in create Post  Method")
        }
    }


    async updatePost(slug,{title,content,featuredImage,status}){
        try {
            return  await this.databases.updateDocument(confg.appWriteDatabaseId,
                confg.appWriteCollectionId
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

    async deletePost(slug){
        try {
            await this.databases.deleteDocument(confg.appWriteDatabaseId,confg.appWriteCollectionId,slug)
            return true;
        } catch (error) {
            console.log(error,": this error was occured in deletePost Method:");
            return false;
        }
    }

    async getPost(slug){
        try {
            return await this.databases.getDocument(confg.appWriteDatabaseId,confg.appWriteCollectionId,slug)
        } catch (error) {
            console.log(error)
        }
    }

    async getAllPost(){
        try {
            console.log(confg.appWriteBucketId,"",confg.appWriteDatabaseId)
            return await this.databases.listDocuments(
                confg.appWriteDatabaseId,
                confg.appWriteCollectionId

            )
        } catch (error) {
            console.log("Appwrite serive :: getPosts :: error", error);
            return false
        }
    }

    //storage crud functions

//      async uploadFile(file){
// console.log( this.storage)
//         if(!this.storage){
//             console.log("The Bucket is not initialized correctly");
//             return null;
//         }
//         console.log(file)
       
//         try {
            
//          let uploadStatus = await this.storage.createFile(
//                 confg.appWriteBucketId,
//                 ID.unique(),
//                 file
//             )
//             return uploadStatus 
//             }
//          catch (error) {
//             console.log(error)
//             throw error
         
//         }
       
//     }

    async deletefile(fileId){
        try {
            
            return await this.bucket.deleteFile(confg.appWriteBucketId,fileId)
            
        }
         catch (error) {
            console.log(error)
        }
    }
    getFilePreview(fileId){
        return this.storage.getFilePreview(confg.appWriteBucketId,
            fileId
        )
    }
}

const service = new Service();
// console.log(service.getAllPost())
export default service;