import React, { useState} from "react";
import data from './data'
import {ArrowLeft, Grid, Search,Filter,ArrowDownUp,Share2,Download,Trash2,Plus,} from "lucide-react";
import "./App.css";
import {useSelector , useDispatch} from 'react-redux';
import { addNewColumn } from "./slices/columnSlice";

export function App() {
  const dispatch = useDispatch()
  const [fileName, setFileName] = useState("Name of the file");
  const [autoSave, setAutoSave] = useState(true);
  const [entries, setEntries] = useState(data);
  // const [columns, setColumns] = useState([
  //   "Timestamp",
  //   "Action",
  //   "Enrich Company"
  // ]);
  const columns = useSelector((state) => state.column.columnArray)
  const [originalEntries, setOriginalEntries] = useState([...entries]); // Keep a backup of the original data
  const [activeSort, setActiveSort] = useState(""); // Track which sort is active (asc or desc)
  const [searchTerm, setSearchTerm] = useState(""); // Track the search term
  const [newColumnName, setNewColumnName] = useState(""); // Track the new column name input
  const [isColumnInputVisible, setIsColumnInputVisible] = useState(false); // Track if the input for the column name is visible

  // Filter entries based on the search term
  const filteredEntries = entries.filter((entry) => {
    const searchLower = searchTerm.toLowerCase();

    // Check if any column contains the search term
    return Object.keys(entry).some((key) => {
      return entry[key]?.toString().toLowerCase().includes(searchLower);
    });
  });

  const addRow = () => {
    const newRow = {
      timestamp: Date.now(),
      action: "New Action",
      enrich: "Pending",
    };
    setEntries([...entries, newRow]);
  };

  const addColumn = () => {
    if (newColumnName.trim()) {
      const newColumn = newColumnName.trim();
      // setColumns([...columns, newColumn]);
      dispatch(addNewColumn(newColumn))

      const updatedEntries = entries && entries.map((entry) => ({
        ...entry,
        [newColumn.toLowerCase().replace(/ /g, "")]: "N/A",
      }));
      setEntries(updatedEntries);

      // Reset the column input
      setNewColumnName("");
      setIsColumnInputVisible(false); // Hide the input field
    }
  };

  const handleSort = (order) => {
    if (activeSort === order) {
      // If the same button is clicked again, reset to original order
      setEntries([...originalEntries]);
      setActiveSort(""); // No active sort
    } else {
      // Perform sorting
      const sortedEntries = [...entries].sort((a, b) =>
        order === "asc" ? a.timestamp - b.timestamp : b.timestamp - a.timestamp
      );
      setEntries(sortedEntries);
      setActiveSort(order); // Set the active sort
    }
  };

  const deleteRow = (rowIndex) => {
    const updatedEntries = entries.filter((_, index) => index !== rowIndex);
    setEntries(updatedEntries);
  };

  console.log(columns)

  return (
    <div className="app-container">
      <div className="header">
        <div className="header-left">
          <button className="icon-button">
            <ArrowLeft size={20} />
          </button>
          <input
            type="text"
            value={fileName}
            onChange={(e) => setFileName(e.target.value)}
            className="file-name-input"
          />
        </div>
        <div className="header-right">
          <span className="auto-save-text">Auto Save</span>
          <button
            className={toggle-switch ${autoSave ? "on" : "off"}}
            onClick={() => setAutoSave(!autoSave)}
          >
            <div className={toggle-knob ${autoSave ? "on" : "off"}} />
          </button>
        </div>
      </div>
      <div className="toolbar">
        <div className="toolbar-left">
          <div className="search-bar">
            <Search className="search-icon" size={20} />
            <input
              type="text"
              placeholder="Search"
              className="search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)} // Update searchTerm state
            />
          </div>
          <button className="toolbar-button">
            <Grid size={18} /> {filteredEntries.length} Rows {Object.keys(entries[0]).length} Columns
          </button>
          <button className="toolbar-button">
            0 Filter <Filter size={18} />
          </button>
          <button
            className={toolbar-button ${activeSort === "asc" ? "active-sort" : ""}}
            onClick={() => handleSort("asc")}
          >
            Sort Asc <ArrowDownUp size={18} />
          </button>
          <button
            className={toolbar-button ${activeSort === "desc" ? "active-sort" : ""}}
            onClick={() => handleSort("desc")}
          >
            Sort Desc <ArrowDownUp size={18} />
          </button>
        </div>
        <div className="add-row-container">
          <button className="add-row-button" onClick={addRow}>
            <Plus size={18} /> Add Row
          </button>
          <button
            className="add-row-button"
            onClick={() => setIsColumnInputVisible(!isColumnInputVisible)}
          >
            <Plus size={18} /> Add Column
          </button>
        </div>
        {isColumnInputVisible && (
          <div className="add-column-input">
            <input
              type="text"
              value={newColumnName}
              onChange={(e) => setNewColumnName(e.target.value)}
              placeholder="Enter column name"
            />
            <button onClick={addColumn}>Add</button>
            <button onClick={() => setIsColumnInputVisible(false)}>Cancel</button>
          </div>
        )}
        <div className="toolbar-right">
          <button className="icon-button">
            <Share2 size={20} />
          </button>
          <button className="icon-button">
            <Download size={20} />
          </button>
          <button className="icon-button">
            <Trash2 size={20} />
          </button>
          <button className="enrich-button">Enrich</button>
        </div>
      </div>
      <div className="table-container">
        <table className="custom-table">
          <thead>
            <tr>
              {columns && columns.map((column, index) => (
                <th key={index}>{column}</th>
              ))}
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredEntries && filteredEntries.map((entry, rowIndex) => (
              <tr key={rowIndex}>
                {columns && columns.map((col, colIndex) => (
                  <td key={colIndex}>
                    {colIndex === 0
                      ? ${rowIndex + 1} - ${new Date(entry.timestamp).toLocaleString()}
                      : colIndex === 1
                      ? entry.action
                      : colIndex === 2
                      ? entry.enrich || entry.link || "N/A"
                      : entry[col.toLowerCase().replace(/ /g, "")] || "N/A"}
                  </td>
                ))}
                <td>
                  <button
                    className="delete-button"
                    onClick={() => deleteRow(rowIndex)}
                  >
                    <Trash2 size={16} /> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;