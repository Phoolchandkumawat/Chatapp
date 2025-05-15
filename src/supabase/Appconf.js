const Appconf = {
    supabaseUrl: String(import.meta.env.VITE_SUPABASE_URL),
    supabaseAnonKey: String(import.meta.env.VITE_SUPABASE_PROJECT_ID),
    appwriteDatabaseId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    appwriteCollectionId: String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
    appwriteBucketId: String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
    appwriteCollection: String(import.meta.env.VITE_APPWRITE_COLLECTION),
}

export default Appconf;