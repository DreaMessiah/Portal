import React, { useState } from 'react';
import './Table.scss';
import formatDate from "../functions/formatDate";

const UsersTable = ({ header=[],data }) => {
    const itemsPerPage = 25; // Количество элементов на одной странице
    const [currentPage, setCurrentPage] = useState(1);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="table-container">
            <div className="table">
                <div className="table-header">
                    <div className="table-cell maxipony">ФИО</div>
                    <div style={{textAlign:'center'}} className="table-cell maxipony">Дожность</div>
                    <div style={{textAlign:'center'}} className="table-cell litlepony">Табельный номер</div>
                    <div style={{textAlign:'center'}} className="table-cell litlepony">Логин</div>
                    <div style={{textAlign:'center'}} className="table-cell mediumpony">Дата регистрации</div>
                </div>
                {currentItems.map((row, index) => (
                    <div className="table-row" key={index}>
                        <div className="table-cell maxipony">{row.full_name}</div>
                        <div style={{textAlign:'center'}} className="table-cell maxipony">{row.developer}</div>
                        <div style={{textAlign:'center'}} className="table-cell litlepony">{row.tn}</div>
                        <div style={{textAlign:'center'}} className="table-cell litlepony">{row.login}</div>
                        <div style={{textAlign:'center'}} className="table-cell mediumpony">{formatDate(row.createdAt)}</div>
                    </div>
                ))}
            </div>
            <Pagination
                itemsPerPage={itemsPerPage}
                totalItems={data.length}
                paginate={paginate}
                currentPage={currentPage}
            />
        </div>
    );
};

const Pagination = ({ itemsPerPage, totalItems, paginate, currentPage }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <div className="pagination">
            {pageNumbers.map((number) => (
                <div
                    key={number}
                    className={number === currentPage ? 'page-number active' : 'page-number'}
                    onClick={() => paginate(number)}
                >
                    {number}
                </div>
            ))}
        </div>
    );
};

export default UsersTable;