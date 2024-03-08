import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axxios from '../axios/axiosInstance';
import Profile from '../blocks/Profile';
import { User, userSchema } from '../schema/user';

const ProfileIndividual: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [profile, setProfile] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axxios.get(`/profile/${id}`)
            .then(res => {
                console.log(res);
                const data = res.data;
                try {
                    if (data) {
                        setProfile(userSchema.parse(data));
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
        profile && <Profile data={profile} />
    );
};

export default ProfileIndividual;
