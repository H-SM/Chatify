"use client";

import { SessionProvider } from "next-auth/react";

interface authContextProps {
    children : React.ReactNode; 
}

export default function AuthContext  ({
    children
}: authContextProps){
    return <SessionProvider>{children}</SessionProvider>
}