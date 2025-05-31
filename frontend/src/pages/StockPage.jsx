// frontend/src/pages/StockPage.jsx
    import React from 'react';
    import { useAuth } from '../contexts/AuthContext';

    function StockPage() {
        const { authState } = useAuth();
        return (
            <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 text-gray-900 dark:text-gray-100">
                <h2 className="text-2xl font-semibold mb-4">Stok Takibi</h2>
                {authState.user && <p className="mb-4">Kullanıcı: {authState.user.name}</p>}
                <p>Detaylı Stok içeriği (tablo, formlar, Gemini ile açıklama üretme vb.) buraya entegre edilecek.</p>
            </div>
        );
    }
    export default StockPage;