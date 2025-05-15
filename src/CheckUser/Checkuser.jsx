import React, { useEffect, useState } from 'react';
import authService from '../supabase/supabase';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setusers } from '../Store/slices/ChatSlices';

function CheckUser ({ details = "notpage", children }) {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        const check = async () => {
            if (navigator.onLine) {
                try {
                    const user = await authService.getCurrentUser ();
                    if (user.data.user) {
                        setIsLoggedIn(true);
                        const userData = await authService.fetchUserProfile();
                        dispatch(setusers({ user: user.data.user, display: userData }));
                    } else {
                        setIsLoggedIn(false);
                    }
                } catch (error) {
                    console.log(error);
                    setIsLoggedIn(false);
                    navigate('/login');
                } finally {
                    setLoading(false);
                }
            } else {
                setLoading(false);
                setIsLoggedIn(false);
                console.log("User  is offline");
            }
        };

        check();
    }, [navigate, dispatch]); // Removed isLoggedIn from dependencies

    if (loading) {
        return <div>Loading...</div>; // You can replace this with a loading spinner or similar
    }

    // Handle navigation after loading is complete
    if (details === "userPage") {
        if (!isLoggedIn) {
            navigate('/login');
            return null; // Prevent rendering children if navigating
        }
    } else {
        if (isLoggedIn) {
            navigate('/');
            return null; // Prevent rendering children if navigating
        }
    }

    return children; // Render children if no navigation is needed
}

export default CheckUser ;