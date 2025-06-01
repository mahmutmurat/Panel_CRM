import React, { useState, useEffect } from 'react';
import { stockService } from '../../services/stockService';

function ProductList() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        loadProducts();
    }, []);

    const loadProducts = async () => {
        try {
            const data = await stockService.getProducts();
            setProducts(data);
            setError(null);
        } catch (err) {
            setError('Ürünler yüklenirken bir hata oluştu');
            console.error('Error loading products:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Bu ürünü silmek istediğinizden emin misiniz?')) {
            try {
                await stockService.deleteProduct(id);
                setProducts(products.filter(product => product._id !== id));
            } catch (err) {
                setError('Ürün silinirken bir hata oluştu');
                console.error('Error deleting product:', err);
            }
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
                            Ürün Adı
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            Stok
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            Fiyat
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            İşlemler
                        </th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
                    {products.map((product) => (
                        <tr key={product._id}>
                            <td className="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-gray-100">
                                {product.name}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-gray-100">
                                {product.stock}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-gray-100">
                                {product.price} ₺
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                <button
                                    onClick={() => handleDelete(product._id)}
                                    className="text-red-600 hover:text-red-900 mr-4"
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

export default ProductList;
