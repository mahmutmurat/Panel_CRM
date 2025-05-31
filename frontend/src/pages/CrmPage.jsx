// frontend/src/pages/CrmPage.jsx
    import React from 'react';
    import { useAuth } from '../contexts/AuthContext';

    function CrmPage() {
        const { authState } = useAuth();
        return (
            <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 text-gray-900 dark:text-gray-100">
                <h2 className="text-2xl font-semibold mb-4">Müşteri Yönetimi (CRM)</h2>
                {authState.user && <p className="mb-4">Kullanıcı: {authState.user.name}</p>}
                <p>Detaylı CRM içeriği (tablo, formlar, modallar) buraya entegre edilecek.</p>
            </div>
        );
    }
    export default CrmPage;