import React from 'react';

function Sidebar({ navigateTo, currentPage }) {
    const menuItems = [
        { id: "dashboard", name: "Dashboard", icon: "fa-tachometer-alt" },
        { id: "crm", name: "Müşteriler", icon: "fa-users" },
        { id: "stock", name: "Stok Takibi", icon: "fa-boxes-stacked" },
        { id: "invoices", name: "Faturalar", icon: "fa-file-invoice-dollar" },
    ];

    return (
        <aside className="w-64 bg-gray-100 dark:bg-gray-800 p-4 space-y-2 fixed top-16 left-0 h-[calc(100vh-4rem)] transition-transform duration-300 ease-in-out md:translate-x-0 -translate-x-full overflow-y-auto shadow-lg">
            <nav>
                <ul>
                    {menuItems.map(item => (
                        <li key={item.id}>
                            <button 
                                onClick={() => navigateTo(item.id)} 
                                className={`w-full flex items-center p-2.5 rounded-md transition-colors text-sm font-medium
                                    ${currentPage === item.id 
                                        ? 'bg-blue-500 text-white dark:bg-blue-700' 
                                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'}`}
                            >
                                <i className={`fas ${item.icon} mr-3 w-5 text-center text-base`}></i>
                                {item.name}
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>
        </aside>
    );
}
export default Sidebar;