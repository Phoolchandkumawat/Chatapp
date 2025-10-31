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
                    const user = await authService.getCurrentUser();
                    if (user.data.user) {
                        setIsLoggedIn(true);
                        const userData = await authService.fetchUserProfile();
                        dispatch(setusers({ user: user.data.user, display: userData }));
                    } else {
                        if(details == "notpage"){
                            setLoading(false);
                            setIsLoggedIn(false);
                            return
                        } else{
                            setIsLoggedIn(false);
                            navigate('/home')
                        }
                    }
                } catch (error) {
                    console.log(error);
                    setIsLoggedIn(false);
                    navigate('/login');
                } finally {
                    setLoading(false);
                }
            } else {
                if(details == "notpage"){
                    setLoading(false);
                    setIsLoggedIn(false);
                    return
                } else{
                    setLoading(false);
                    setIsLoggedIn(false);
                    navigate('/login')

                }
                // navigate('/offline')
            }
        };

        check();
    }, [navigate, dispatch]);

    useEffect(() => {
        if (!loading) {
            if (details === "userPage" && !isLoggedIn) {
                navigate('/login');
            } else if (details !== "userPage" && isLoggedIn) {
                navigate('/');
            }
        }
    }, [loading, isLoggedIn, details, navigate]);

    if (loading) {
        return <div>Loading...</div>;
    } 

    return children; // Render children if no navigation is needed
}

export default CheckUser ;
