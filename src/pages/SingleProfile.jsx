import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axxios from '../axios/axiosInstance';
import Profile from '../blocks/Profile';
import React from 'react';
import { MyBlogs } from './Profile';
import { useAuth } from '../context/auth-context';

const ProfileIndividual = () => {
    const { id } = useParams();
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();

    useEffect(() => {
        axxios.get(`/profile/${id}`)
            .then(res => {
                console.log(res);
                const data = res.data;
                try {
                    if (data) {
                        setProfile(data);
                    }
                } catch (error) {
                    console.log(error);
                }
            })
            .catch(err => { console.log(err) })
            .finally(() => { setLoading(false) });
        return () => { }
    }, [id])

    if (loading) {
        return "Loading..."
    }

    return (
        profile &&
        <>
            <Profile data={profile} />
            {
                user && user.id === profile.id &&
                <MyBlogs userId={profile.id} blogs={profile.blogs} />
            }
        </>
    );
};

export default ProfileIndividual;
