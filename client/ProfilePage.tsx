import React from 'react';
import Button from 'react-bootstrap/Button';
import { useEffect, useState } from 'react';

interface UserProfile {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
}

interface ProfileProps {
    showLogin: () => void;
  }

const ProfilePage: React.FC<ProfileProps> = ({ showLogin }) => {
    const [user, setUser] = useState<UserProfile | null>(null);
    const [errorAuth, setErrorAuth] = useState<Boolean | null>(null);

    useEffect(() => {
        // Fetch user data from the backend using the HttpOnly cookie for authentication
        fetch('/api/profile', {
            method: 'GET',
            credentials: 'include', // Include cookies in the request
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => {
                if (!response.ok) {
                    if (response.status === 401) {
                        setErrorAuth(true);
                    } else {
                        throw new Error('Network response was not ok');
                    }
                }
                return response.json();
            })
            .then((data) => {
                setUser(data);
            })
            .catch((error) => {
                console.error('Error fetching user data:', error);
            });
    }, []);

    const handleLogout = () => {

        fetch('/api/logout', {
            method: 'POST',
            credentials: 'include', // Include cookies in the request
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
    };

    const handleShowLogin = () => {    
        showLogin();
    };

    return (
        <div>
            <h2>Profile Page</h2>
            {errorAuth ? (
                <div>
                    You are not authorized.
                    <br/><br/>
                <Button onClick={handleShowLogin}>Login</Button>
                </div>
            ) : (
                <div>
                    <p>{user?.firstName} {user?.lastName}, Welcome to your profile page!</p>
                    <p>{user?.email} </p>
                    <Button onClick={handleLogout}>Logout</Button>
                </div>
            )}
       
        </div>
    );
};

export default ProfilePage;
