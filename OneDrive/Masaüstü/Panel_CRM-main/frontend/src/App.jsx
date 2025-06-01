import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import AppHeader from './components/common/AppHeader';
import Sidebar from './components/common/Sidebar';
import MobileSidebarToggle from './components/common/MobileSidebarToggle';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import DashboardPage from './pages/DashboardPage';
import CrmPage from './pages/CrmPage'; 
import StockPage from './pages/StockPage'; 
import InvoicesPage from './pages/InvoicesPage';

const AppRouter = () => {
    const { authState } = useAuth();
    const [currentPage, setCurrentPage] = useState('login');

    useEffect(() => {
        if (authState.isLoading) return; 

        const targetPage = authState.isAuthenticated ? 'dashboard' : 'login';
        if (currentPage !== targetPage && (currentPage === 'login' || currentPage === 'signup' || authState.isAuthenticated)) {
             setCurrentPage(targetPage);
        } else if (!authState.isAuthenticated && currentPage !== 'signup') {
             setCurrentPage('login');
        }

    }, [authState.isAuthenticated, authState.isLoading]);

    const navigateTo = (pageId) => {
        setCurrentPage(pageId);
        const sidebarElement = document.querySelector('aside');
        if (sidebarElement && !sidebarElement.classList.contains('-translate-x-full') && window.innerWidth < 768) {
            sidebarElement.classList.add('-translate-x-full');
        }
    };
    
    const [isDarkMode, setIsDarkMode] = useState(() => {
        const savedTheme = localStorage.getItem('theme');
        return savedTheme === 'dark';
    });

    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [isDarkMode]);

    const toggleTheme = () => setIsDarkMode(prevMode => !prevMode);

    let pageComponent;
    if (authState.isLoading) { 
        pageComponent = <div className="flex justify-center items-center h-screen text-xl dark:text-white"><div className="spinner w-8 h-8 mr-3"></div>Uygulama Yükleniyor...</div>;
    } else if (!authState.isAuthenticated) {
        switch (currentPage) {
            case 'signup': pageComponent = <SignupPage navigateTo={navigateTo} />; break;
            case 'login': default: pageComponent = <LoginPage navigateTo={navigateTo} />; break;
        }
    } else {
        switch (currentPage) {
            case 'crm': pageComponent = <CrmPage navigateTo={navigateTo} />; break;
            case 'stock': pageComponent = <StockPage navigateTo={navigateTo} />; break;
            case 'invoices': pageComponent = <InvoicesPage navigateTo={navigateTo} />; break;
            case 'dashboard': default: pageComponent = <DashboardPage navigateTo={navigateTo} />; break;
        }
    }

    return (
        <div className="min-h-screen flex flex-col">
            <AppHeader 
                onToggleTheme={toggleTheme} 
                isDarkMode={isDarkMode} 
                navigateTo={navigateTo} 
            />
            {authState.isAuthenticated && <MobileSidebarToggle />} 
            <div className="flex flex-1 pt-16">
                {authState.isAuthenticated && <Sidebar navigateTo={navigateTo} currentPage={currentPage} />}
                <main className={`flex-1 p-4 sm:p-6 ${authState.isAuthenticated ? 'md:ml-64' : 'w-full md:w-screen'}`}>
                    {pageComponent}
                </main>
            </div>
        </div>
    );
};

function App() {
  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  );
}

export default App;
