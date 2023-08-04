const initialState = {
    stocks: [],
    loading: false,
    error: null,
    currentPage: 1,
    totalPage: 1
  };
  
  const stocksReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'FETCH_STOCKS_REQUEST':
        return { ...state, loading: true };
      case 'FETCH_STOCKS_SUCCESS':
        return { ...state, loading: false, stocks: action.payload.stocks, currentPage: action.payload.currentPage, totalPage: action.payload.totalPage };
      case 'FETCH_STOCKS_FAILURE':
        return { ...state, loading: false, error: action.payload };
        case 'UPDATE_STOCKS':
        return {
            ...state,
            stocks: action.payload
        };
      default:
        return state;
    }
  };
  
  export default stocksReducer;
  