import { createSlice } from '@reduxjs/toolkit';

const formatTimestamp = (isoTimestamp) => {
    const date = new Date(isoTimestamp);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
  
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };

const initialState = {
  columns: [
    { id: 'timestamp', name: 'Timestamp' },
    { id: 1, name: 'Column 1' },
    { id: 2, name: 'Column 2' },
  ],
  rows: [
    { 
      id: 1, 
      timestamp: '2024-01-16 14:08:00',
      action: 'Evaluation',
      company: 'Bitscale'
    },
    { 
      id: 2,
      timestamp: '2024-01-16 14:08:00',
      action: 'Evaluation',
      company: 'Google'
    },
  ],
};
const gridSlice = createSlice({
  name: 'grid',
  initialState,
  reducers: {
    addColumn: (state) => {
      const newColumn = {
        id: `col-${Date.now()}`,
        name: `Column ${state.columns.length + 1}`,
      };
      state.columns.push(newColumn);
    },

    updateColumnName: (state, action) => {
      const { columnId, newName } = action.payload;
      const column = state.columns.find((col) => col.id === columnId);
      if (column) {
        column.name = newName;
    
        // Convert the name to a numeric ID (or hash, if preferred)
        column.id = newName
          .split('')
          .reduce((acc, char) => acc + char.charCodeAt(0), 0); // Generate numeric ID
      }
    },
    
    setEditingMode: (state, action) => {
      const { columnId, isEditing } = action.payload;
      const column = state.columns.find((col) => col.id === columnId);
      if (column) {
        column.isEditing = isEditing;
      }
    },

    deleteColumn: (state, action) => {
      state.columns = state.columns.filter(col => col.id !== action.payload);
    },
    addRow: (state) => {
      const newRow = {
        id: `row-${Date.now()}`,
        // timestamp: new Date().toISOString(),
        timestamp: formatTimestamp(new Date()), // Store formatted timestamp

      };
      state.rows.push(newRow);
    },
    deleteRow: (state, action) => {
      state.rows = state.rows.filter(row => row.id !== action.payload);
    },
    updateCell: (state, action) => {
      const { rowId, columnId, value } = action.payload;
      const row = state.rows.find(r => r.id === rowId);
      if (row) {
        row[columnId] = value;
      }
    },
  },
});
export const { addColumn, deleteColumn, addRow, deleteRow, updateCell,setEditingMode , updateColumnName} = gridSlice.actions;
export default gridSlice.reducer;