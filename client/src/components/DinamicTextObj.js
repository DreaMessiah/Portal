import React, { useState, useEffect } from 'react';

const DynamicTextObj = () => {
    const [currentPage, setCurrentPage] = useState('');

    useEffect(() => {
        const pathname = window.location.pathname;
        setCurrentPage(pathname);
    }, []);

    let text = '';

    // Определите текст в зависимости от текущей страницы
    switch (currentPage) {
        case '/main':
            text = 'Dashboard';
            break;
        case '/document':
            text = 'Документ';
            break;
        case '/tasks':
            text = 'Задачи';
            break;
        case '/welding':
            text = 'Сварочный учет';
            break;
        case '/obj':
            text = 'Обьект';
            break;
        case '/lk':
            text = 'Dashboard';
            break;
        case '/settings':
            text = 'Настройки';
            break;
        default:
            text = 'Корпоративный портал';
    }
    return <span>{text}</span>;
};

export default DynamicTextObj;