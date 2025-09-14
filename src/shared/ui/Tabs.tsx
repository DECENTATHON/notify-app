'use client';
import { useState, createContext, useContext, ReactNode } from 'react';

interface TabsContextProps {
    activeKey: string;
    setActiveKey: (key: string) => void;
}

const TabsContext = createContext<TabsContextProps | undefined>(undefined);

export function Tabs({ defaultActiveKey, children }: { defaultActiveKey: string; children: ReactNode }) {
    const [activeKey, setActiveKey] = useState(defaultActiveKey);

    return (
        <TabsContext.Provider value={{ activeKey, setActiveKey }}>
            <div>{children}</div>
        </TabsContext.Provider>
    );
}

export function TabList({ children }: { children: ReactNode }) {
    return <div className="flex border-b border-gray-200">{children}</div>;
}

export function Tab({ tabKey, children }: { tabKey: string; children: ReactNode }) {
    const context = useContext(TabsContext);
    if (!context) throw new Error('Tab must be used within a Tabs component');

    const { activeKey, setActiveKey } = context;

    return (
        <button
            onClick={() => setActiveKey(tabKey)}
            className={`px-4 py-2 text-sm font-medium transition-colors focus:outline-none ${
                activeKey === tabKey
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-400 hover:text-blue-500'
            }`}
        >
            {children}
        </button>
    );
}

export function TabPanel({ tabKey, children }: { tabKey: string; children: ReactNode }) {
    const context = useContext(TabsContext);
    if (!context) throw new Error('TabPanel must be used within a Tabs component');

    return context.activeKey === tabKey ? <div className="mt-4">{children}</div> : null;
}
