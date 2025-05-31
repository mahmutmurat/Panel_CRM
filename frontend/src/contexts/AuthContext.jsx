// frontend/src/contexts/AuthContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';

const API_URL = 'http://localhost:5001/api'; 

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [authState, setAuthState] = useState({
        token: localStorage.getItem('kolayPanelToken') || null,
        user: JSON.parse(localStorage.getItem('kolayPanelUser')) || null,
        isAuthenticated: !!localStorage.getItem('kolayPanelToken'),
        isLoading: true, 
        error: null,
    });

    useEffect(() => {
        const token = localStorage.getItem('kolayPanelToken');
        const user = JSON.parse(localStorage.getItem('kolayPanelUser'));
        if (token && user) {
            setAuthState({ token, user, isAuthenticated: true, isLoading: false, error: null });
        } else {
            setAuthState({ token: null, user: null, isAuthenticated: false, isLoading: false, error: null });
        }
    }, []); 

    const loginAction = async (email, password) => { /* ... (içerik önceki mesajdaki gibi) ... */ setAuthState(prev => ({ ...prev, isLoading: true, error: null })); try { const response = await fetch(`${API_URL}/auth/login`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, password }), }); const data = await response.json(); if (!response.ok) { throw new Error(data.message || 'Giriş başarısız.'); } localStorage.setItem('kolayPanelToken', data.token); localStorage.setItem('kolayPanelUser', JSON.stringify({ name: data.name, email: data.email, role: data.role, id: data._id })); setAuthState({ token: data.token, user: { name: data.name, email: data.email, role: data.role, id: data._id }, isAuthenticated: true, isLoading: false, error: null }); return true; } catch (err) { setAuthState(prev => ({ ...prev, isLoading: false, error: err.message, isAuthenticated: false, token: null, user: null })); return false; } };        
    const signupAction = async (name, email, password, role = 'Sales') => { /* ... (içerik önceki mesajdaki gibi) ... */  setAuthState(prev => ({ ...prev, isLoading: true, error: null })); try { const response = await fetch(`${API_URL}/auth/signup`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name, email, password, role }), }); const data = await response.json(); if (!response.ok) { throw new Error(data.message || 'Kayıt başarısız.'); } localStorage.setItem('kolayPanelToken', data.token); localStorage.setItem('kolayPanelUser', JSON.stringify({ name: data.name, email: data.email, role: data.role, id: data._id })); setAuthState({ token: data.token, user: { name: data.name, email: data.email, role: data.role, id: data._id }, isAuthenticated: true, isLoading: false, error: null }); return true; } catch (err) { setAuthState(prev => ({ ...prev, isLoading: false, error: err.message, isAuthenticated: false, token: null, user: null })); return false; }};
    const logoutAction = () => { /* ... (içerik önceki mesajdaki gibi) ... */ localStorage.removeItem('kolayPanelToken'); localStorage.removeItem('kolayPanelUser'); setAuthState({ token: null, user: null, isAuthenticated: false, isLoading: false, error: null });};

    return (
        <AuthContext.Provider value={{ authState, loginAction, signupAction, logoutAction }}>
            {authState.isLoading ? <div className="flex justify-center items-center h-screen text-xl dark:text-white"><div className="spinner w-8 h-8 mr-3"></div>Yükleniyor...</div> : children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);