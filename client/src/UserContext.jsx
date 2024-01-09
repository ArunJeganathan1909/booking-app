import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
    const [user, setUser] = useState(null);
    const [ready, setReady] = useState(false);

    useEffect(() => {
        if (!user) {
            axios.get('http://localhost:4000/profile')
                .then(({ data }) => {
                    setUser(data);
                    setReady(true);
                })
                .catch((error) => {
                    console.error('Error fetching user data:', error);
                    // Handle the error (e.g., set an error state)
                });
        }
    }, []); // Include 'user' in the dependency array

    return (
        <UserContext.Provider value={{ user, setUser, ready }}>
            {children}
        </UserContext.Provider>
    );
}
