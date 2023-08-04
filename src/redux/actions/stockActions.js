import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

const fetchStocksRequest = () => {
    return { type: 'FETCH_STOCKS_REQUEST' };
};

export const fetchStocksSuccess = (stocks, currentPage, totalPage, reordered) => {
    return {
        type: 'FETCH_STOCKS_SUCCESS',
        payload: {
            stocks,
            currentPage,
            totalPage,
            reordered
        }
    };
};

const fetchStocksFailure = (error) => {
    return { type: 'FETCH_STOCKS_FAILURE', payload: error };
};

export const updateStocks = (stocks) => {
    return {
        type: 'UPDATE_STOCKS',
        payload: stocks
    };
};


export const fetchAllStocks = (page = 1, limit = 10) => {
    const TOTAL_STOCKS = 100;

    return (dispatch) => {
        dispatch(fetchStocksRequest());
        axios
            .get('https://cloud.iexapis.com/stable/stock/aapl/quote?token=YOUR_TOKEN')
            .then((response) => {
                const stock = response.data;

                const stocks = Array(TOTAL_STOCKS).fill().map((_, i) => ({ ...stock, symbol: `${stock.symbol}_${i}`, id: uuidv4() })); // simulate 100 stocks with unique keys
                const paginatedData = stocks.slice((page - 1) * limit, page * limit);
                dispatch(fetchStocksSuccess(paginatedData, page, Math.ceil(stocks.length / limit)));
            })
            .catch((error) => {
                dispatch(fetchStocksFailure(error.message));
            });
    };
};

