import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

function SignupPage({ navigateTo }) {
    const { signupAction, authState } = useAuth();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        await signupAction(name, email, password);
        // Yönlendirme AppRouter'daki useEffect tarafından yapılacak
    };

    return (
        <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 sm:px-6 lg:px-8 -mt-16">
            <div className="max-w-md w-full space-y-8 bg-white dark:bg-gray-800 p-8 sm:p-10 rounded-xl shadow-2xl">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Yeni Hesap Oluşturun
                    </h2>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="rounded-md shadow-sm">
                        <div className="mb-4">
                            <label htmlFor="name-signup" className="sr-only">Ad Soyad</label>
                            <input id="name-signup" name="name" type="text" autoComplete="name" required 
                                   className="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" 
                                   placeholder="Ad Soyad" value={name} onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="email-signup" className="sr-only">E-posta Adresi</label>
                            <input id="email-signup" name="email" type="email" autoComplete="email" required 
                                   className="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" 
                                   placeholder="E-posta Adresi" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div>
                            <label htmlFor="password-signup" className="sr-only">Şifre</label>
                            <input id="password-signup" name="password" type="password" autoComplete="new-password" required 
                                   className="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" 
                                   placeholder="Şifre (en az 6 karakter)" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                    </div>
                    {authState.error && <p className="text-sm text-red-500 text-center py-2">{authState.error}</p>}
                    <div>
                        <button type="submit" disabled={authState.isLoading}
                                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50">
                            {authState.isLoading ? <span className="spinner mr-2"></span> : 'Kayıt Ol'}
                        </button>
                    </div>
                </form>
                <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
                    Zaten bir hesabınız var mı?{' '}
                    <button onClick={() => navigateTo('login')} className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300">
                        Giriş Yapın
                    </button>
                </p>
            </div>
        </div>
    );
}
export default SignupPage;