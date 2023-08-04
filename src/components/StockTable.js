import React from 'react';
import { useSelector } from 'react-redux';
import { Droppable, Draggable } from 'react-beautiful-dnd';

function StockTable() {
    const { stocks, loading, error, currentPage, totalPage } = useSelector((state) => state.stocks);

    const limit = 10; // количество записей на странице

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        stocks.length > 0 && (
            <table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Company Name</th>
                        <th>Primary Exchange</th>
                        <th>Latest Price</th>
                        <th>ID</th>
                    </tr>
                </thead>
                <Droppable droppableId="stocks">
                    {(provided) => (
                        <tbody ref={provided.innerRef} {...provided.droppableProps}>
                            {stocks.map((stock, index) => (
                                <Draggable key={stock.id} draggableId={stock.id} index={index}>
                                    {(provided) => (
                                        <tr ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                            <td>{(currentPage - 1) * limit + index + 1}</td>
                                            <td>{stock.companyName}</td>
                                            <td>{stock.primaryExchange}</td>
                                            <td>{stock.latestPrice}</td>
                                            <td>{stock.id}</td>
                                        </tr>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </tbody>
                    )}
                </Droppable>
            </table>
        )
    );
}

export default StockTable;