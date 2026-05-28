import { createContext, useContext, useReducer } from 'react';

const BouquetContext = createContext(null);
const BouquetDispatchContext = createContext(null);

const initialState = {
  selectedFlowers: [],
  bouquetType: '',
  note: { message: '', from: '', to: '' },
  shuffleOrder: [],
};

function bouquetReducer(state, action) {
  switch (action.type) {
    case 'ADD_FLOWER': {
      if (state.selectedFlowers.length >= 10) return state;
      const newSelected = [...state.selectedFlowers, action.payload];
      return { ...state, selectedFlowers: newSelected, shuffleOrder: Array.from({ length: newSelected.length }, (_, i) => i) };
    }
    case 'REMOVE_FLOWER': {
      const id = action.payload;
      const index = state.selectedFlowers.lastIndexOf(id);
      if (index === -1) return state;
      
      const newSelected = [...state.selectedFlowers];
      newSelected.splice(index, 1);
      return { ...state, selectedFlowers: newSelected, shuffleOrder: Array.from({ length: newSelected.length }, (_, i) => i) };
    }
    case 'SET_SHUFFLE_ORDER':
      return { ...state, shuffleOrder: action.payload };
    case 'SET_BOUQUET_TYPE':
      return { ...state, bouquetType: action.payload };
    case 'SET_NOTE':
      return { ...state, note: { ...state.note, ...action.payload } };
    case 'RESET':
      return initialState;
    case 'LOAD':
      return { ...initialState, ...action.payload };
    default:
      return state;
  }
}

export function BouquetProvider({ children }) {
  const [state, dispatch] = useReducer(bouquetReducer, initialState);
  return (
    <BouquetContext.Provider value={state}>
      <BouquetDispatchContext.Provider value={dispatch}>
        {children}
      </BouquetDispatchContext.Provider>
    </BouquetContext.Provider>
  );
}

export function useBouquet() {
  return useContext(BouquetContext);
}

export function useBouquetDispatch() {
  return useContext(BouquetDispatchContext);
}
