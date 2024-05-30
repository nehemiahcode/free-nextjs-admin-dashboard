'use client'

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';


function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (!token) {
            // Redirect the user to the login page or display an error message
            router.push('/auth/login');
        }
    }, []);

    return 
    
}

export default ProtectedRoute;
