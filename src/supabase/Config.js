import Appconf from './Appconf';
import { Client, ID, Databases, Storage, Query} from 'appwrite';


export class Config {
    client = new Client();
    databases;
    storage;

    constructor(){
        this.client
            .setEndpoint(Appconf.appwriteUrl)
            .setProject(Appconf.appwriteProjectId);
            this.databases = new Databases(this.client);
            this.storage = new Storage(this.client);
    }

    async createPost ({userid, text, username}){
        try {
            const documentId = ID.unique() 
            return await this.databases.createDocument(
                Appconf.appwriteDatabaseId,
                Appconf.appwriteCollectionId,
                documentId,
                {
                    text: text,
                    userid: userid,
                    username: username,
                },[]
            )
            
        } catch (error) {
            // console.log(error, "error at :: create post")
        
        }
    }
    async createUpdatePost ({documentId, text}){
        try { 
            return await this.databases.createDocument(
                Appconf.appwriteDatabaseId,
                Appconf.appwriteCollection,
                documentId,
                {
                    online: text,
                }
            )
            
        } catch (error) {
            // console.log(error, "error at :: create post")
        
        }
    }

    async getOnlinefiles(){
        try {
            return await this.databases.listDocuments(
                Appconf.appwriteDatabaseId,
                Appconf.appwriteCollection,
                
            )
        } catch (error) {
            // console.log("error at :: getFiles" , error)
        }
    }



    async updatePost({ documentid, newtext }) {
        try {
            const response = await this.databases.updateDocument(
                Appconf.appwriteDatabaseId,
                Appconf.appwriteCollection,
                documentid,
                {
                    online: newtext,
                }
            );
            // console.log("Update response:", response);
            return response;
        } catch (error) {
            // console.error("Error updating post:", error.message || error);
        }
    }

    async getfiles(){
        try {
            return await this.databases.listDocuments(
                Appconf.appwriteDatabaseId,
                Appconf.appwriteCollectionId,
                
            )
        } catch (error) {
            // console.log("error at :: getFiles" , error)
        }
    }


    async deletePost (userid){
        try {
            return await this.databases.deleteDocument(
                Appconf.appwriteDatabaseId,
                Appconf.appwriteCollectionId,
                userid    
            )

        } catch (error) {
            // console.log(error, "error at :: delete post")
            return false
        }
    }

    async uploadImg(file){
        try {
            return await this.storage.createFile(
                Appconf.appwriteBucketId,
                ID.unique(),
                file
            )
            
        } catch (error) {
            // console.log(error, "error at ::uploadeImg");
        }
    }

}


const config = new Config()

export default config;