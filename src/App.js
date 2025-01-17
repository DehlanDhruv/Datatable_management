import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store/store.js';
import DataGrid from './components/DataGrid.js';
function App() {
  return (
    <Provider store={store}>
      <div className="w-full min-h-screen bg-gray-50 p-4">
        <DataGrid />
      </div>
    </Provider>
  );
}

export default App