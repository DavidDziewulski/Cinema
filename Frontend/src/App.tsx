import { QueryClientProvider } from '@tanstack/react-query';
import { createContext, useEffect, useState } from 'react';
import { AuthProvider as OidcAuthProvider } from 'react-oidc-context';
import './App.css';
import { oidcConfig } from './auth/oidcConfig';
import { queryClient } from './lib/queryClient/queryClient';
import { RouterProvider } from './router/Router';
import { mockAdapter } from './api/mockData/mockAdapter';

type ContextType = {
    isActive: boolean;
    toggleActive: () => void;
}

export const AppContext = createContext<ContextType>({
        isActive:false,
        toggleActive: () => {},
    });

export const App = () => {
    useEffect(() => {
        mockAdapter();
    }, [])
    
    const [ active, setActive ] = useState(false);

    const toggleActive = () => {
        setActive(prev => !prev)
    };

    return (
    <>
            <OidcAuthProvider {...oidcConfig}>
                <QueryClientProvider client={queryClient}>
                    <AppContext.Provider value={{isActive: active, toggleActive}}>
                        <RouterProvider />
                    </AppContext.Provider>
                </QueryClientProvider>
            </OidcAuthProvider>
    </>
)}
