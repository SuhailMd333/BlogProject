import { Client, Account, ID } from "appwrite";
import {confg} from "../confg/confg";
 export class Authservice {
  client = new Client();
  account;
  constructor() {
    this.client
      .setEndpoint(confg.appWriteUrl)
      .setProject(confg.appWriteprojectId);
    this.account = new Account(this.client);
  }

  async createAccount({ email, password, name }) {
    /*eslint no-useless-catch: "error"*/
    console.log(confg.appWriteUrl)
    
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      if (userAccount) {
        return null;
      } else {
        return userAccount;
      }
    } catch (error) {
      console.log(error, " this error ocurred in createAccount");
      // throw error;
    }
  }

  async login({email,password}){
  try{
   
    return await this.account.createEmailSession(email,password)

  } catch(e){
    console.log(e,": this err was in login")
  }
  }

  async getCurrentUser(){
    try {
      return  await this.account.get()
    } catch (error) {
        console.log(error,": this error ocurred in getCurrentUser")
    }
    return null;
  }
  
  async logout(){
    try {
        await this.account.deleteSessions()
    } catch (error) {
        console.log(error,": this error ocurred in logout")
    }
  }
}

const authService = new Authservice();
export default authService;
