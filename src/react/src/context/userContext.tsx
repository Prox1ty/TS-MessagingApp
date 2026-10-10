import { createContext, useContext } from "react";

export interface User {
    name: string;
    email: string;
}

interface UserContextType {
    user: User | null,
    setUser: (user: User | null) => void;
}

const userContext = createContext<UserContextType | undefined>(undefined);

export default userContext;

export const useUser = () => {
    const context = useContext(userContext);
    if (!context) throw new Error("useUser must be used within a UserProvider");

    return context;
}