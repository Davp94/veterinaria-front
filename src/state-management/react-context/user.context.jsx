'use client'
import { Children, createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState({username: 'username', 'email': 'test@test.com'});
    const [rol, setRol] = useState({roles: ['admin', 'veterinario', 'responsable']});
    //TODO GET USER AUTHENTICATED

    const clearUser = () => {
        setUser({})
    }
    return (
        <UserContext.Provider value={{user, rol, clearUser}}>
            {children}
        </UserContext.Provider>
    )
}