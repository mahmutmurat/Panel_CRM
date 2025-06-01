import React from 'react';
import { useAuth } from '../../contexts/AuthContext';

function AppHeader({ onToggleTheme, isDarkMode, navigateTo }) {
    const { authState, logoutAction } = useAuth();

    const handleLogout = () => {
        logoutAction();
        if(navigateTo) navigateTo('login'); 
    };
    
    return (
        <header className="bg-blue-600 dark:bg-blue-800 text-white p-4 shadow-md fixed top-0 left-0 right-0 z-50">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-2xl font-bold cursor-pointer" onClick={() => navigateTo(authState.isAuthenticated ? 'dashboard' : 'login')}>
                    KolayPanel
                </h1>
                <div className="flex items-center gap-4">
                    {authState.isAuthenticated && authState.user && (
                        <span className="text-sm hidden sm:block">Hoşgeldin, {authState.user.name}!</span>
                    )}
                    <button onClick={onToggleTheme} className="p-2 rounded-md hover:bg-blue-700 dark:hover:bg-blue-900 focus:outline-none" aria-label="Toggle Dark Mode">
                        <i className={`fas ${isDarkMode ? 'fa-sun' : 'fa-moon'}`}></i>
                    </button>
                    {authState.isAuthenticated && (
                        <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-md text-sm">Çıkış Yap</button>
                    )}
                </div>
            </div>
        </header>
    );
}
export default AppHeader;
