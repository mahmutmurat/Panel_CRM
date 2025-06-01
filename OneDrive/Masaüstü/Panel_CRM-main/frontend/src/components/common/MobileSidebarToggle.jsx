import React from 'react';

function MobileSidebarToggle() {
    const toggleSidebar = () => {
        const sidebar = document.querySelector('aside'); // Basit DOM manipülasyonu, daha iyi state yönetimi düşünülebilir
        if (sidebar) sidebar.classList.toggle('-translate-x-full');
    };
    return (
        <button onClick={toggleSidebar} className="md:hidden fixed top-4 left-4 z-[60] p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700" aria-label="Toggle Sidebar">
            <i className="fas fa-bars"></i>
        </button>
    );
}
export default MobileSidebarToggle;