import {Client, Account, ID} from 'appwrite';
import Appconf from './Appconf';


export class AuthService {
    client = new Client();
    account;


    constructor(){
        this.client
            .setEndpoint(Appconf.appwriteUrl)
            .setProject(Appconf.appwriteProjectId);
        this.account = new Account(this.client);
    }


    async createAccount ({email, password, name}){
        try {
    
            const userAccount = await this.account.create(ID.unique(), email, password, name)
            if (userAccount) {
                return this.login({email,password});
            } else {
                return userAccount;
            }
        } catch (error) {
            // console.log("error at :: CreateAccount",error)
        }
    }

    async login ({email, password}){
        try {
            const options = {
                scope: 'account',
            };
            const sesstion = await this.account.createEmailPasswordSession(email, password, options);
            return sesstion;
        } catch (error) {
            // console.log(error, "error :: login")
        }
    }

    async getCurrentUser(){
        try {
            return await this.account.get();
        } catch (error) {
            // console.log(error, "error :: at GetCurrentUser")
        }
        return null;
    }


    async logout(){
        try {
            await this.account.deleteSession('current');
        } catch (error) {
            // console.log(error, "error :: logout")
        }
    }

}


const authService = new AuthService();

export default authService