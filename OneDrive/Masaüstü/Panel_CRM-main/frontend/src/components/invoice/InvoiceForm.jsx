import React, { useState, useEffect } from 'react';
import { invoiceService } from '../../services/invoiceService';
import customerService from '../../services/customerService';
import { stockService } from '../../services/stockService';

function InvoiceForm({ onInvoiceCreated }) {
    const [customers, setCustomers] = useState([]);
    const [products, setProducts] = useState([]);
    const [formData, setFormData] = useState({
        customer: '',
        items: [{ product: '', quantity: 1, price: 0 }],
        notes: ''
    });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadCustomers();
        loadProducts();
    }, []);

    const loadCustomers = async () => {
        try {
            const data = await customerService.getCustomers();
            setCustomers(data);
        } catch (err) {
            console.error('Error loading customers:', err);
        }
    };

    const loadProducts = async () => {
        try {
            const data = await stockService.getProducts();
            setProducts(data);
        } catch (err) {
            console.error('Error loading products:', err);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleItemChange = (index, field, value) => {
        const newItems = [...formData.items];
        newItems[index][field] = value;

        // Ürün seçildiğinde fiyatı otomatik doldur
        if (field === 'product') {
            const selectedProduct = products.find(p => p._id === value);
            if (selectedProduct) {
                newItems[index].price = selectedProduct.price;
            }
        }

        setFormData(prev => ({
            ...prev,
            items: newItems
        }));
    };

    const addItem = () => {
        setFormData(prev => ({
            ...prev,
            items: [...prev.items, { product: '', quantity: 1, price: 0 }]
        }));
    };

    const removeItem = (index) => {
        setFormData(prev => ({
            ...prev,
            items: prev.items.filter((_, i) => i !== index)
        }));
    };

    const calculateTotal = () => {
        return formData.items.reduce((total, item) => {
            return total + (item.quantity * item.price);
        }, 0);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const invoiceData = {
                ...formData,
                total: calculateTotal()
            };

            await invoiceService.createInvoice(invoiceData);
            
            // Formu sıfırla
            setFormData({
                customer: '',
                items: [{ product: '', quantity: 1, price: 0 }],
                notes: ''
            });

            if (onInvoiceCreated) {
                onInvoiceCreated();
            }
        } catch (err) {
            setError('Fatura oluşturulurken bir hata oluştu');
            console.error('Error creating invoice:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
                <div className="text-red-500 text-sm">{error}</div>
            )}
            
            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Müşteri
                </label>
                <select
                    name="customer"
                    value={formData.customer}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                >
                    <option value="">Müşteri Seçin</option>
                    {customers.map(customer => (
                        <option key={customer._id} value={customer._id}>
                            {customer.name}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Ürünler
                </label>
                {formData.items.map((item, index) => (
                    <div key={index} className="flex space-x-2 mb-2">
                        <select
                            value={item.product}
                            onChange={(e) => handleItemChange(index, 'product', e.target.value)}
                            required
                            className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                        >
                            <option value="">Ürün Seçin</option>
                            {products.map(product => (
                                <option key={product._id} value={product._id}>
                                    {product.name}
                                </option>
                            ))}
                        </select>
                        <input
                            type="number"
                            value={item.quantity}
                            onChange={(e) => handleItemChange(index, 'quantity', parseInt(e.target.value))}
                            min="1"
                            placeholder="Adet"
                            className="w-20 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                        />
                        <input
                            type="number"
                            value={item.price}
                            onChange={(e) => handleItemChange(index, 'price', parseFloat(e.target.value))}
                            min="0"
                            step="0.01"
                            placeholder="Fiyat"
                            className="w-24 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                        />
                        {formData.items.length > 1 && (
                            <button
                                type="button"
                                onClick={() => removeItem(index)}
                                className="px-2 py-1 text-red-600 hover:text-red-800"
                            >
                                Sil
                            </button>
                        )}
                    </div>
                ))}
                <button
                    type="button"
                    onClick={addItem}
                    className="text-blue-600 hover:text-blue-800 text-sm"
                >
                    + Ürün Ekle
                </button>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Notlar
                </label>
                <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    rows="3"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                ></textarea>
            </div>

            <div className="text-right">
                <strong>Toplam: {calculateTotal().toFixed(2)} ₺</strong>
            </div>

            <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-400"
            >
                {loading ? 'Oluşturuluyor...' : 'Fatura Oluştur'}
            </button>
        </form>
    );
}

export default InvoiceForm;
