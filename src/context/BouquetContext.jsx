import { createContext, useContext, useReducer } from 'react';

const BouquetContext = createContext(null);
const BouquetDispatchContext = createContext(null);

const initialState = {
  selectedFlowers: [],
  bouquetType: '',
  note: { message: '', from: '', to: '' },
};

function bouquetReducer(state, action) {
  switch (action.type) {
    case 'TOGGLE_FLOWER': {
      const id = action.payload;
      const exists = state.selectedFlowers.includes(id);
      if (exists) {
        return { ...state, selectedFlowers: state.selectedFlowers.filter(f => f !== id) };
      }
      if (state.selectedFlowers.length >= 7) return state;
      return { ...state, selectedFlowers: [...state.selectedFlowers, id] };
    }
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
