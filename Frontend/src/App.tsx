import { QueryClientProvider } from '@tanstack/react-query';
import { createContext, useState } from 'react';
import { AuthProvider as OidcAuthProvider } from 'react-oidc-context';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import { oidcConfig } from './auth/oidcConfig';
import { queryClient } from './lib/queryClient/queryClient';
import { RouterProvider } from './router/Router';

type ContextType = {
    isActive: boolean;
    toggleActive: () => void;
}

export const AppContext = createContext<ContextType>({
        isActive:false,
        toggleActive: () => {},
    });

export const App = () => {
    // useEffect(() => {
    //     mockAdapter();
    // }, [])
    
    const [ active, setActive ] = useState(false);

    const toggleActive = () => {
        setActive(prev => !prev)
    };

    return (
    <>
            <OidcAuthProvider {...oidcConfig}>
            <ToastContainer
                position="bottom-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={true}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
                />
                <QueryClientProvider client={queryClient}>
                    <AppContext.Provider value={{isActive: active, toggleActive}}>
                        <RouterProvider />
                    </AppContext.Provider>
                </QueryClientProvider>
            </OidcAuthProvider>
    </>
)}
