import { createClient } from '@supabase/supabase-js';
import Appconf from './Appconf';
import { setProfiles } from '../Store/slices/ChatSlices';

export class Config {
    supabase;

    constructor() {
        this.supabase = createClient(Appconf.supabaseUrl, Appconf.supabaseAnonKey);
    }

    async createPost({ userid, text, username }) {
        try {
            const { data, error } = await this.supabase
                .from('massages') // Replace 'posts' with your actual table name
                .insert([
                    {
                        text: text,
                        userid: userid,
                        username: username,
                    },
                ]);

            if (error) throw error;
            return data;
        } catch (error) {
            console.error("Error at :: createPost", error);
        }
    }

    async updatePost({ documentId, newText }) {
        try {
            const { data, error } = await this.supabase
                .from('massages') // Replace 'posts' with your actual table name
                .update({ text: newText })
                .eq('id', documentId); // Assuming 'id' is the primary key

            if (error) throw error;
            return data;
        } catch (error) {
            console.error("Error updating post:", error.message || error);
        }
    }

    async getPosts() {
        try {
            const { data, error } = await this.supabase
                .from('massages') // Replace 'posts' with your actual table name
                .select('*');

            if (error) throw error;
            return data;
        } catch (error) {
            console.error("Error at :: getPosts", error);
        }
    }

    async deletePost(documentId) {
        try {
            const { data, error } = await this.supabase
                .from('massages') // Replace 'posts' with your actual table name
                .delete()
                .eq('id', documentId); // Assuming 'id' is the primary key

            if (error) throw error;
            return data;
        } catch (error) {
            console.error("Error at :: deletePost", error);
            return false;
        }
    }

    async uploadImg(file) {
        try {
            const { data, error } = await this.supabase.storage
                .from('images') // Replace 'images' with your actual bucket name
                .upload(`public/${file.name}`, file); // Adjust the path as needed

            if (error) throw error;
            return data;
        } catch (error) {
            console.error("Error at :: uploadImg", error);
        }
    }

    async fetchUser (user) {
        try {
            const { data, error } = await this.supabase
                .from('profiles')
                .select('*')
                .in('user_id', user);
    
            if (error) {
                console.error("Error fetching user:", error);
                return null; // or handle the error as needed
            }
            
            return data; // Return the data if no error
        } catch (error) {
            console.error(error, "::::at fetch user");
            return null; // or handle the error as needed
        }
    }



    // massages codes 






    async sendFriendRequest({ userId, friendId, name,reciever_name }) {
        try {
            const { data, error } = await this.supabase
                .from('friends')
                .upsert([
                    {
                        user_id: userId,
                        friend_id: friendId,
                        status: 'pending',
                        created_at: new Date().toISOString(),
                        display_name: name,
                        reciever_name:reciever_name
                    },
                ], { onConflict: ['user_id', 'friend_id'] }); // Specify the unique constraint
    
            if (error) throw error;
            return true;
        } catch (error) {
            console.error("Error at :: sendFriendRequest", error);
        }
    }

    async getPendingFriendRequests({userId}) {
        try {
            const { data, error } = await this.supabase
                .from('friends')
                .select('user_id, friend_id, status, created_at, display_name')
                .eq('friend_id', userId)
                .eq('status', 'pending');   

                console.log("Query Result:", { data, error }, userId)
    
            if (error) throw error;
            return data; // Returns an array of pending requests
        } catch (error) {
            console.error("Error at :: getPendingFriendRequests", error);
            return [];
        }
    }

    

    async acceptFriendRequest({ userId, friendId }) {
        try {
            // const { data, error } = await this.supabase
            //     .from('friends')
            //     .update({ status: 'accepted' })
            //     .eq('user_id', "30cc0f38-4f84-486f-a34b-8ed8e2183fea")
            //     .eq('friend_id', "f9b2f666-56b1-429a-aeb1-d93c9c50ee4a");
            const { data, error, status } = await this.supabase.
            from('friends')
            .update({ status: 'accepted'})
            .eq('user_id', friendId)
            .eq('friend_id', userId);
            console.log("Data:", data);
            console.log("Error:", error);
            console.log("Status:", status);
            if (error) throw error;
            return data;
        } catch (error) {
            console.error("Error at :: acceptFriendRequest", error);
        }
    }

    async getFriends({userId}) {
        try {
            const { data, error } = await this.supabase
                .from('friends')
                .select('*')
                .or(`user_id.eq.${userId},friend_id.eq.${userId}`)
                .eq('status', 'accepted');

            if (error) throw error;
            return data;
        } catch (error) {
            console.error("Error at :: getFriends", error);
        }
    }

    // Message Methods

    async getRecentChatUser({userId}){
        try {
            const { data: chatFromUser, error: errorfromChatuser } = await this.supabase
                .from('messages')
                .select('*')
                .eq('sender_id', userId)
                .order('timestamp', { ascending: true });
    
            const { data: chatFromFriend, error: errorfromfruser } = await this.supabase
                .from('messages')
                .select('*')
                .eq('receiver_id', userId)
                .order('timestamp', { ascending: true });
                if (errorfromChatuser) throw errorfromChatuser;
                if (errorfromfruser) throw errorfromfruser;
    
            // Combine the results
            const chats = [...chatFromUser, ...chatFromFriend];
            const userchat = [...new Set(chats.map((usermap)=> usermap.sender_id == userId ? usermap.receiver_id : usermap.sender_id))]
            // console.log(chats)
            const fetch = this.fetchUser(userchat).then((res)=> {return res})
            // console.log(userchat)
            return fetch;
        } catch (error) {
            console.log(error,"::::error to get the user chat")
        }
    }


    async subscribeToMessages({ userId, friendId, setMessages, dispatch }) {
        try {
            const subscription = this.supabase
                .channel('messages')
                .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages' }, payload => {
                    console.log('New message inserted!', payload);
                    if (
                        (payload.new.sender_id === userId && payload.new.receiver_id === friendId) ||
                        (payload.new.sender_id === friendId && payload.new.receiver_id === userId)
                    ) {
                        console.log('New message received!', payload);
                        dispatch(setProfiles({id:payload.new.receiver_id, newData:payload.new}))
                        setMessages(prevMessages => {
                            const messageExists = prevMessages.some(msg => msg.id === payload.new.id);
                            if (!messageExists) {
                                return [...prevMessages, payload.new];
                            }
                            return prevMessages; // Always return the previous state if no new message is added
                        });
                    }
                })
                .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'messages' }, payload => {
                    console.log('Message updated!', payload);
                    if (
                        (payload.new.sender_id === userId && payload.new.receiver_id === friendId) ||
                        (payload.new.sender_id === friendId && payload.new.receiver_id === userId)
                    ) {
                        console.log('Message updated!', payload.new);
                        dispatch(setProfiles({id:payload.new.receiver_id, newData:payload.new}))
                        
                        setMessages(prevMessages => {
                            return prevMessages.map(msg => 
                                msg.id === payload.new.id ? { ...msg, ...payload.new } : msg
                            );
                        });
                    }
                })
                .subscribe();
    
            return subscription;
        } catch (error) {
            console.error("Error subscribing to messages:", error);
        }
    }
    

    async subscribeSidebar({setMessages}){
        try {
            const subscription = this.supabase
                .channel('messages')
                .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages' }, payload => {
                    console.log('New message inserted!', payload);
                    setMessages(prevMessages => {
                        const messageExists = prevMessages.some(msg => msg.id === payload.new.id);
                        if (!messageExists) {
                            return [...prevMessages, payload.new];
                        }
                        return prevMessages; // Always return the previous state if no new message is added
                    });
                    
                })
                .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'messages' }, payload => {
                    console.log('Message updated!', payload);
                    setMessages(prev=>{
                        console.log(prev,"ustsprev")
                        return prev
                    })
                    // setMessages(prevMessages => {
                    //     return prevMessages.map(msg => 
                    //         msg.id === payload.new.id ? { ...msg, ...payload.new } : msg
                    //     );
                    // });
                })  
                .subscribe();
    
            return subscription;
        } catch (error) {
            console.error("Error subscribing to messages:", error);
        }
    }
    


    async fetchConversationFriends({ userId }) {
        try {
          // Fetch distinct friend IDs (users that the current user has messaged or received messages from)
          const { data: sentMessages, error: sentError } = await this.supabase
            .from('messages')
            .select('receiver_id')
            .eq('sender_id', userId);
          if (sentError) throw sentError;
      
          const { data: receivedMessages, error: receivedError } = await this.supabase
            .from('messages')
            .select('sender_id')
            .eq('receiver_id', userId);
          if (receivedError) throw receivedError;
      
          // Combine IDs uniquely
          const friendIds = new Set();
          sentMessages.forEach(msg => friendIds.add(msg.receiver_id));
          receivedMessages.forEach(msg => friendIds.add(msg.sender_id));
          if (friendIds.size === 0) {
              return [];
            }
            
            // Fetch friend user details
            const { data: users, error: usersError } = await this.supabase
            .from('profiles')
            .select('user_id, display_name')
            .in('user_id', Array.from(friendIds));
            if (usersError) throw usersError;
            
            // Prepare an array to hold the final result
            const friendsWithLastMessage = [];
            
            // Fetch the last message for each friend
            for (const friendId of friendIds) {
                const { data: lastMessageData, error: lastMessageError } = await this.supabase
                .from('messages')
                .select('*')
                .or(`sender_id.eq.${userId},receiver_id.eq.${userId}`)
                .or(`sender_id.eq.${friendId},receiver_id.eq.${friendId}`)
              .order('timestamp', { ascending: false })
              .limit(1);
              if (lastMessageError) throw lastMessageError;
              
            //   console.log(lastMessageData)
            const lastMessage = lastMessageData.length > 0 ? lastMessageData[0] : null;
                    const chatunread = await this.getMessages({userId:userId, friendId:friendId}).then((res)=>{const data = res.filter((ids)=> ids.sender_id !== userId) ; return data.filter((mes)=> mes["is_read"] == false)})
            // Find the user details for the current friend
            const userDetails = users.find(user => user.user_id === friendId);
      
            // Combine user details and last message
            friendsWithLastMessage.push({
              user: userDetails,
              userreadMessage:chatunread.length,
              lastMessage: lastMessage ? {
                content: lastMessage.content,
                created_at: lastMessage.created_at,
                sender_id: lastMessage.sender_id,
                receiver_id: lastMessage.receiver_id,
              } : null,
            });
          }
      
          return friendsWithLastMessage;
        } catch (err) {
          console.error(err.message);
          return [];
        }
      }
      
  



    async sendMessage({ senderId, receiverId, content, senderName }) {
        try {
            const { data, error } = await this.supabase
                .from('messages')
                .insert([
                    {
                        sender_id: senderId,
                        receiver_id: receiverId,
                        content: content,
                        timestamp: new Date().toISOString(),
                        is_read: false,
                        sender_name:senderName
                    },
                ]);

            if (error) throw error;
            return data;
        } catch (error) {
            console.error("Error at :: sendMessage", error);
        }
    }

    async getMessages({ userId, friendId }) {
        try {
            const { data: messagesFromUser, error: errorFromUser } = await this.supabase
                .from('messages')
                .select('*')
                .eq('sender_id', userId)
                .eq('receiver_id', friendId)
                .order('timestamp', { ascending: true });
    
            const { data: messagesFromFriend, error: errorFromFriend } = await this.supabase
                .from('messages')
                .select('*')
                .eq('sender_id', friendId)
                .eq('receiver_id', userId)
                .order('timestamp', { ascending: true });
    
            if (errorFromUser) throw errorFromUser;
            if (errorFromFriend) throw errorFromFriend;
    
            // Combine the results
            // Combine the results
            const combinedMessages = [...messagesFromUser , ...messagesFromFriend];

            // Sort the combined messages by timestamp in ascending order
            combinedMessages.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

            return combinedMessages;
        } catch (error) {
            console.error("Error at :: getMessages", error);
        }
    }

    async markMessageAsRead(messageId) {
        try {
            const { data, error } = await this.supabase
                .from('messages')
                .update({ is_read: true })
                .eq('id', messageId);

            if (error) throw error;
            return data;
        } catch (error) {
            console.error("Error at :: markMessageAsRead", error);
        }
    }

    // supabase (){
    //     return this.supabase
    // }



}





const supaConfig = new Config();

export default supaConfig;