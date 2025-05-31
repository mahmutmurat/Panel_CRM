import React from 'react';
import { useAuth } from '../contexts/AuthContext';

function DashboardPage() {
    const { authState } = useAuth();
    return (
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 text-gray-900 dark:text-gray-100">
            <h2 className="text-3xl font-semibold mb-6">Dashboard</h2>
            {authState.user && <p className="mb-4 text-lg">Hoşgeldin, {authState.user.name}!</p>}
            <p className="mb-8 text-lg">KolayPanel'e hoş geldiniz! Burası ana gösterge paneliniz.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-blue-50 dark:bg-blue-900/50 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                    <h3 className="text-xl font-semibold text-blue-700 dark:text-blue-300 mb-2">Toplam Müşteri</h3>
                    <p className="text-4xl font-bold text-blue-600 dark:text-blue-400">0</p> {/* Örnek veri, backend'den gelecek */}
                </div>
                <div className="bg-green-50 dark:bg-green-900/50 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                    <h3 className="text-xl font-semibold text-green-700 dark:text-green-300 mb-2">Düşük Stoklu Ürünler</h3>
                    <p className="text-4xl font-bold text-green-600 dark:text-green-400">0</p> {/* Örnek veri */}
                </div>
                <div className="bg-yellow-50 dark:bg-yellow-900/50 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                    <h3 className="text-xl font-semibold text-yellow-700 dark:text-yellow-300 mb-2">Ödenmemiş Faturalar</h3>
                    <p className="text-4xl font-bold text-yellow-600 dark:text-yellow-400">0</p> {/* Örnek veri */}
                </div>
            </div>
        </div>
    );
}
export default DashboardPage;