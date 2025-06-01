import React, { useState } from 'react';
import InvoiceList from '../components/invoice/InvoiceList';
import InvoiceForm from '../components/invoice/InvoiceForm';
import Modal from '../components/common/Modal';

function InvoicesPage() {
    const [showAddModal, setShowAddModal] = useState(false);
    const [refreshTrigger, setRefreshTrigger] = useState(0);

    const handleInvoiceCreated = () => {
        setShowAddModal(false);
        setRefreshTrigger(prev => prev + 1); // Listeyi yenile
    };

    return (
        <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
                        Fatura Yönetimi
                    </h2>
                    <button
                        onClick={() => setShowAddModal(true)}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                        Yeni Fatura Oluştur
                    </button>
                </div>

                {/* Fatura Listesi */}
                <InvoiceList key={refreshTrigger} />
            </div>

            {/* Yeni Fatura Oluşturma Modal */}
            <Modal
                isOpen={showAddModal}
                onClose={() => setShowAddModal(false)}
                title="Yeni Fatura Oluştur"
            >
                <InvoiceForm onInvoiceCreated={handleInvoiceCreated} />
            </Modal>
        </div>
    );
}

export default InvoicesPage;
