import React, { useEffect, useState } from "react";
import supaConfig from "../supabase/supabaseconfi";
import { useDispatch, useSelector } from "react-redux";
import { ConversationItem } from "./ConversationItem";
import AllFriendsCart from "./AllfriendsCart";
import { setchatuser } from "../Store/slices/ChatSlices";

function AllFriends({ mobile }) {
  const [allfriends, setAllfriends] = useState([]);
  const [activeUser, setActiveUser] = useState(false)
  const [error, setError] = useState(null);
  const userid = useSelector((state) => state.users.user.id);
  const dispatch = useDispatch();
  useEffect(() => {
    function sentuserid (){
      dispatch(setchatuser(activeUser))
    }
    sentuserid()
    ;(async function () {
      setError(null);
      try {
        const allFriendsList = await supaConfig.getFriends({ userId: userid });
        if (allFriendsList) {
          setAllfriends(allFriendsList);
        }
      } catch (error) {
        setError(error);
      }
    })();
  }, [activeUser]);

  return (
    <div
      className={`space-y-1 h-[360px] overflow-y-scroll ${
        mobile ? "scrollthumbmob" : "scrollthumb"
      }`}
    >
      <div className={`${allfriends.length > 0 ? "hidden" : "flex"}`}>
        no Friends addd
      </div>
      {allfriends?.map((friend) => (
        <AllFriendsCart
          key={friend.id}
          onClick={() => {
              setActiveUser([friend.user_id !== userid ? friend.user_id : friend.friend_id, friend.user_id !== userid ? friend.display_name : friend.reciever_name])
          }}
          id={friend.id}
          name={
            friend.user_id !== userid
              ? friend.display_name
              : friend.reciever_name
          }
          {...friend}
        />
      ))}
    </div>
  );
}

export default AllFriends;
