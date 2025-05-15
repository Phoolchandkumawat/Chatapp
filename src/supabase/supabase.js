import { createClient } from '@supabase/supabase-js';
import Appconf from './Appconf';

export class AuthService {
    supabase;

    constructor() {
        this.supabase = createClient(Appconf.supabaseUrl, Appconf.supabaseAnonKey);
    }

    async createAccount({ email, password, name }) {
        try {
            const { data, error } = await this.supabase.auth.signUp({
                email,
                password,
            });
        
            if (data) {
                // Use the user ID from the data object
                const userId = data.user.id; // This is the correct user ID
                const { error: profileError, status } = await this.supabase.from('profiles').insert({ user_id: userId, display_name: name });
                console.log(profileError, "error at :: createAccount :: profiles", status);
                return data;
            } else {
                return error;
            }
        } catch (error) {
            console.log(error);
        }
        // try {
        //     const { user, error } = await this.supabase.auth.signUp({
        //         email,
        //         password,
        //     }); 

        //     console.log("Sign-up response:", { user, error });
    
        //     // Check for sign-up error
        //     if (error) {
        //         console.error("Sign-up error:", error);
        //         throw error; // Rethrow the error for further handling
        //     }
    
        //     // Check if user is defined
        //     if (!user) {
        //         throw new Error("User  object is undefined after sign-up.");
        //     }
    
        //     // Optionally, you can store additional user information in a separate table
        //     const { data, error: profileError } = await this.supabase
        //         .from('profiles')
        //         .insert([{ id: user.id, name }]);
    
        //     // Check for profile insertion error
        //     if (profileError) {
        //         console.error("Profile insertion error:", profileError);
        //         throw profileError; // Rethrow the error for further handling
        //     }
    
        //     return user;
        // } catch (error) {
        //     console.error("Error at :: createAccount", error);
        //     throw error; // Rethrow the error for further handling
        // }
    }

    async fetchUserProfile() {
        try {
            const user = await this.supabase.auth.getUser(); // Get the currently authenticated user
            if (user) {
                const { data, error } = await this.supabase
                    .from('profiles')
                    .select('display_name')
                    .eq('user_id', user["data"].user.id) // Match the user_id with the authenticated user's ID
                    .single(); // Get a single record
    
                if (error) {
                    console.log(error, "error at :: fetchUserProfile");
                    return null; // Handle error appropriately
                } else {
                    return data; // Return the display name
                }
            } else {
                console.log("No authenticated user found.");
                return null; // Handle case where no user is authenticated
            }
        } catch (error) {
            console.log(error);
        }
    }


    async searchUser({userName}) {
        try {
            console.log(userName)
            const { data, error } = await this.supabase
                .from('profiles')
                .select('user_id, display_name')
                .ilike('display_name', `%${userName}%`) // Use ilike for case-insensitive matching
                .limit(5); // Limit the number of results
            console.log(data,error)
            if (error) {
                console.log(error, "error at :: searchSimilarUsers");
                return null; // Handle error appropriately
            } else {
                return data; // Return the matching display names
            }
        } catch (error) {
            console.log(error);
        }
    }

    async login({ email, password }) {
        try {
            const { user, error } = await this.supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) {
                throw error;
            }

            return user;
        } catch (error) {
            console.error("Error :: login", error);
            throw error; // Rethrow the error for further handling
        }
    }

    async getCurrentUser () {
        try {
            const user = this.supabase.auth.getUser();
            return user;
        } catch (error) {
            console.error("Error :: at getCurrentUser ", error);
            return null;
        }
    }

    async logout() {
        try {
            const { error } = await this.supabase.auth.signOut();
            if (error) {
                throw error;
            }
        } catch (error) {
            console.error("Error :: logout", error);
        }
    }
}

const authService = new AuthService();

export default authService;