import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllStocks, updateStocks } from './redux/actions/stockActions';
import StockTable from './components/StockTable';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import './App.css';
import { fetchStocksSuccess } from './redux/actions/stockActions';

function App() {
  const dispatch = useDispatch();
  const { stocks, currentPage, totalPage, limit } = useSelector((state) => state.stocks);

  useEffect(() => {
    dispatch(fetchAllStocks(currentPage, limit));
  }, [dispatch, currentPage, limit]);

  const handleNext = () => {
    if (currentPage < totalPage) dispatch(fetchAllStocks(currentPage + 1));
  };

  const handlePrev = () => {
    if (currentPage > 1) dispatch(fetchAllStocks(currentPage - 1));
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const { source, destination } = result;

    if (source.index !== destination.index) {
      const newStocks = Array.from(stocks);
      const [removed] = newStocks.splice(source.index, 1);
      newStocks.splice(destination.index, 0, removed);
      dispatch(updateStocks(newStocks));
    }
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="App">
        <h1>Stock Report App</h1>
        <StockTable />
        <button onClick={handlePrev} disabled={currentPage === 1} className='btngen'>
          Prev
        </button>
        <button onClick={handleNext} disabled={currentPage === totalPage} className='btngen'>
          Next
        </button>
      </div>
    </DragDropContext>
  );
}

export default App;
