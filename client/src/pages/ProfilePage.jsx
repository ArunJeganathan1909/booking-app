import React, { useContext } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { UserContext } from '../UserContext';
import axios from 'axios';
import PlacesPage from './PlacesPage';
import ProfileNav from '../ProfileNav';

const ProfilePage = () => {
    const { ready, user, setUser } = useContext(UserContext);
    let { subPage } = useParams();
    if (subPage === undefined){
        subPage = 'Profile';
    }
    const navigate = useNavigate()


    const logout = async() => {
        await axios.post('http://localhost:4000/logout')
        setUser(null)
        alert('Logout successful');
        navigate('/')
    }

    if (!ready) {
        return 'Loading....';
    }

    if (ready && !user) {
        return <Navigate to={'/Login'} />;
    }    

    return (
        <div>
            <ProfileNav />
            {subPage === 'Profile' && (
                <div className='text-center max-w-lg mx-auto'>
                     <br />
                    <button className='primary max-w-sm mt-2' onClick={logout} >Logout</button>
                </div>
            )}
            {subPage === 'Accommodations' && (
                <PlacesPage />
            )}
        </div>
    );
};

export default ProfilePage;
