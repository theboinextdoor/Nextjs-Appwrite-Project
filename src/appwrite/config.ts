import conf from "@/conf/conf";
import { Client, Account, ID } from "appwrite";

type CreateUserAccount = {
  email: string;
  password: string;
  name: string;
};

type LoginUserAccount = {
  email: string;
  password: string;
};

const appwriteClient = new Client();
appwriteClient.setEndpoint(conf.appwriteUrl).setProject(conf.appwriteProjectId);

export const account = new Account(appwriteClient);

export class AppwriteService {
  //! create a new record of user inside the appwrite
  async createUserAccount({ email, password, name }: CreateUserAccount) {
    try {
      const userAccount = await account.create(
        ID.unique(),
        email,
        password,
        name
      );
      if (userAccount) {
        return this.login({ email, password });
      } else {
        return userAccount;
      }
    } catch (error: any) {
      throw error;
    }
  }

  async login({ email, password }: LoginUserAccount) {
    try {
      return await account.createSession(email, password);
    } catch (error: any) {
      throw error;
    }
  }

  async isLoggedIn(): Promise<boolean> {
    try {
      const data = await this.getCurrentUser();
      return Boolean(data);
    } catch (error: any) {
      throw error;
    }
    return false;
  }

  async getCurrentUser() {
    try {
        return account.get()
    } catch (error) {
      console.log(error);
      console.log(error);
    }
    return null;
  }

  async logout() {
    try{
        return await account.deleteSession("current")
    }catch(error){
        console.log("log out error: ")
        console.log(error)
        throw error;
    }
  }
}

const appwriteService = new AppwriteService();
export default appwriteService;




