import React, { useEffect, useRef, useState } from 'react'
import SearchResult from './SearchResult'
import supaConfig from '../supabase/supabaseconfi'
import authService from '../supabase/supabase'

function SearchFriendsList({usersearchname}) {
  const [alluserSearch, setAllUserSearch] = useState([])
  const timeoutRef = useRef(null); // Create a ref to store the timeout ID

  useEffect(() => {
      // Clear any existing timeout when usersearchname changes
      clearTimeout(timeoutRef.current);

      if (usersearchname !== "") {
          // Set a new timeout
          timeoutRef.current = setTimeout(async () => {
              try {
                  const data = await authService.searchUser ({ userName: usersearchname });
                  console.log(data);
                  setAllUserSearch(data);
              } catch (error) {
                  console.error("Error fetching user:", error);
              }
          }, 1000); // Delay of 1 second
      }
      // Cleanup function to clear the timeout on component unmount
      return () => clearTimeout(timeoutRef.current);
  }, [usersearchname]);
  return (
    <>
    {alluserSearch?.map((user)=>(<SearchResult userdata={user}/>))}
        {/* <SearchResult/> */}
    </>
  )
}

export default SearchFriendsList