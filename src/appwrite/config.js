import { Client,ID,Storage,Databases } from "appwrite";
import confg from "../confg/confg"
export class Service{
    client = new Client()
    databases;
    bucket;
    constructer(){
        this.client
      .setEndpoint(confg.appWriteUrl)
      .setProject(confg.appWriteprojectId);
      this.databases = new Databases(this.client)
      this.bucket = new Storage(this.client)
    }
 // these all methods are responsible for crud operation in database
    async createPost({title,slug,content,featuredImage,status,userId}){
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
            return await this.databases.listDocuments(confg.appWriteDatabaseId,confg.appWriteCollectionId)
        } catch (error) {
            console.log(error)
        }
        //crud of databases

       
    }

    //storage crud functions

     async uploadFile(file){
        try {
            return await this.bucket.createFile(
                confg.appWriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log(error)
        }
    }

    async deletefile(fileId){
        try {
            
            return await this.bucket.deleteFile(confg.appWriteBucketId,fileId)
            
        }
         catch (error) {
            console.log(error)
        }
    }
    getFilePreview(fileId){
        return this.bucket.getFilePreview(
            confg.appwriteBucketId,
            fileId
        )
    }
}

const service = new Service();

export default service;