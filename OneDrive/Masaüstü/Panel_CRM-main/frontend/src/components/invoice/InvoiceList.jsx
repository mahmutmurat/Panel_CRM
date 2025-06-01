import React, { useState, useEffect } from 'react';
import { invoiceService } from '../../services/invoiceService';

function InvoiceList() {
    const [invoices, setInvoices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        loadInvoices();
    }, []);

    const loadInvoices = async () => {
        try {
            const data = await invoiceService.getInvoices();
            setInvoices(data);
            setError(null);
        } catch (err) {
            setError('Faturalar yüklenirken bir hata oluştu');
            console.error('Error loading invoices:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Bu faturayı silmek istediğinizden emin misiniz?')) {
            try {
                await invoiceService.deleteInvoice(id);
                setInvoices(invoices.filter(invoice => invoice._id !== id));
            } catch (err) {
                setError('Fatura silinirken bir hata oluştu');
                console.error('Error deleting invoice:', err);
            }
        }
    };

    const handleExportPDF = async (id) => {
        try {
            const blob = await invoiceService.exportInvoicePDF(id);
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `fatura-${id}.pdf`;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
        } catch (err) {
            setError('PDF oluşturulurken bir hata oluştu');
            console.error('Error exporting PDF:', err);
        }
    };

    if (loading) return <div>Yükleniyor...</div>;
    if (error) return <div className="text-red-500">{error}</div>;

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white dark:bg-gray-800">
                <thead>
                    <tr className="bg-gray-100 dark:bg-gray-700">
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            Fatura No
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            Müşteri
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            Tarih
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            Tutar
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            İşlemler
                        </th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
                    {invoices.map((invoice) => (
                        <tr key={invoice._id}>
                            <td className="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-gray-100">
                                {invoice.invoiceNumber}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-gray-100">
                                {invoice.customer?.name || 'Belirtilmemiş'}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-gray-100">
                                {new Date(invoice.date).toLocaleDateString('tr-TR')}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-gray-100">
                                {invoice.total.toFixed(2)} ₺
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                <button
                                    onClick={() => handleExportPDF(invoice._id)}
                                    className="text-blue-600 hover:text-blue-900 mr-4"
                                >
                                    PDF
                                </button>
                                <button
                                    onClick={() => handleDelete(invoice._id)}
                                    className="text-red-600 hover:text-red-900"
                                >
                                    Sil
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default InvoiceList;
