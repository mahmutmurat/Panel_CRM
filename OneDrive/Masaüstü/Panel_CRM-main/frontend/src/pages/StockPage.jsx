import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import ProductList from '../components/stock/ProductList';
import ProductForm from '../components/stock/ProductForm';
import Modal from '../components/common/Modal';

function StockPage() {
    const { authState } = useAuth();
    const [showAddModal, setShowAddModal] = useState(false);
    const [refreshTrigger, setRefreshTrigger] = useState(0);

    const handleProductAdded = () => {
        setShowAddModal(false);
        setRefreshTrigger(prev => prev + 1); // Listeyi yenile
    };

    return (
        <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
                        Stok Takibi
                    </h2>
                    <button
                        onClick={() => setShowAddModal(true)}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                        Yeni Ürün Ekle
                    </button>
                </div>

                {/* Ürün Listesi */}
                <ProductList key={refreshTrigger} />
            </div>

            {/* Yeni Ürün Ekleme Modal */}
            <Modal
                isOpen={showAddModal}
                onClose={() => setShowAddModal(false)}
                title="Yeni Ürün Ekle"
            >
                <ProductForm onProductAdded={handleProductAdded} />
            </Modal>
        </div>
    );
}

export default StockPage;
