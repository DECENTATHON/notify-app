'use client';
import { createContext, useCallback, useContext, useState } from 'react';

interface AlertState {
    visible: boolean;
    message: string;
    description?: string;
}

interface AlertContextType {
    showAlert: (message: string, description?: string) => void;
    hideAlert: () => void;
    alert: AlertState;
}

const AlertContext = createContext<AlertContextType | null>(null);

export const AlertProvider = ({ children }: { children: React.ReactNode }) => {
    const [alert, setAlert] = useState<AlertState>({
        visible: false,
        message: '',
        description: '',
    });

    const showAlert = useCallback((message: string, description?: string) => {
        setAlert({ visible: true, message, description });

        setTimeout(() => {
            setAlert((prev) => ({ ...prev, visible: false }));
        }, 3000);
    }, []);

    const hideAlert = useCallback(() => {
        setAlert((prev) => ({ ...prev, visible: false }));
    }, []);

    return (
        <AlertContext.Provider value={{ showAlert, hideAlert, alert }}>
            {children}
        </AlertContext.Provider>
);
};

export const useAlert = () => {
    const context = useContext(AlertContext);
    if (!context) throw new Error('useAlert must be used within an AlertProvider');
    return context;
};
