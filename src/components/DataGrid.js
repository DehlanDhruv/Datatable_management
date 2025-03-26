import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Header from "./Header";
import {
  Rows4,
  Columns4,
  ArrowUpDown,
  Trash2,
  Plus,
  ArrowDown10,
  ArrowUp10,
  Filter,
  XCircle,
} from "lucide-react";
import {
  addColumn,
  addRow,
  deleteColumn,
  deleteRow,
  updateCell,
  updateColumnName,
} from "../store/gridSlice";
import Sidebar from "./Sidebar";
import "./DataGrid.css";

const DataGrid = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortDirection, setSortDirection] = useState("asc");
  const [filters, setFilters] = useState({});
  const [isDropdownActive, setIsDropdownActive] = useState(false);

  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);

  const { columns, rows } = useSelector((state) => state.grid);
  const dispatch = useDispatch();

  // Format timestamp for display
  const formatTimestamp = (isoTimestamp) => {
    const date = new Date(isoTimestamp);
    return date.toISOString().slice(0, 19).replace("T", " ");
  };

  // Apply search and filter logic
  const filteredRows = rows
    .filter((row) =>
      Object.values(row).some((value) =>
        String(value).toLowerCase().includes(searchTerm.toLowerCase())
      )
    )
    .filter((row) =>
      columns.every(
        (column) =>
          !filters[column.id] ||
          String(row[column.id] || "").includes(filters[column.id])
      )
    );

  // Apply sorting logic
  const sortedRows = [...filteredRows]
    .sort((a, b) => {
      if (sortDirection === "asc") {
        return new Date(a.timestamp) - new Date(b.timestamp);
      }
      return new Date(b.timestamp) - new Date(a.timestamp);
    })
    .map((row, index) => ({
      ...row,
      formattedTimestamp: formatTimestamp(row.timestamp),
      rowNumber: index + 1,
    }));

  // Check if filters are applied
  const isFilterApplied = Object.values(filters).some((value) => value !== "");

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target) &&
        !buttonRef.current.contains(e.target)
      ) {
        setIsDropdownActive(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  // Handlers
  const handleSort = () =>
    setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));

  const handleSearch = (e) => setSearchTerm(e.target.value);

  const handleFilterChange = (columnId, value) =>
    setFilters((prev) => ({ ...prev, [columnId]: value }));

  const toggleDropdown = () => setIsDropdownActive(!isDropdownActive);

  const clearFilters = () => setFilters({});

  return (
    <div style={{ position: "relative" }}>
      <Header />

      {/* Subheader */}
      <div className="subheader">
        <input
          type="text"
          placeholder="Search..."
          className="search-input"
          value={searchTerm}
          onChange={handleSearch}
        />
        <div className="toolbar">
          <div className="grid-info">
            <Rows4 className='header-icons' style={{ color: "#9ca3af" }} /> {rows.length}{" "}
            <span>Rows</span>
            <Columns4 className='header-icons' style={{ color: "#9ca3af" }} />{" "}
            {columns.length} <span>Columns</span>
          </div>

          {/* Filter Dropdown */}
          <div className="menu-container">
            <button
              ref={buttonRef}
              onClick={toggleDropdown}
              className={`menu-trigger ${
                isFilterApplied ? "active-filter" : ""
              }`}
            >
              <Filter className='header-icons' />
              {isFilterApplied && (
                <button onClick={clearFilters} className="clear-filters-btn">
                  <XCircle className='header-icons' />
                </button>
              )}
            </button>

            <nav
              ref={dropdownRef}
              className={`menu ${isDropdownActive ? "active" : "inactive"}`}
            >
              <ul>
                {columns.map((column) => (
                  <li key={column.id}>
                    <div className="dropdown-item">
                      <label>{`Filter for ${column.name}`}</label>
                      <input
                        type="text"
                        value={filters[column.id] || ""}
                        onChange={(e) =>
                          handleFilterChange(column.id, e.target.value)
                        }
                        className="filter-input"
                        placeholder={`Filter ${column.name}`}
                      />
                    </div>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <button
            onClick={handleSort}
            className="sort-button"
            title={`Sort by timestamp (${sortDirection})`}
          >
            <ArrowUpDown className="icon" size={"1.3vw"} />
          </button>
          <button
            onClick={() => dispatch(addColumn())}
            className="toolbar-button add-column"
          >
            <Plus className="icon"  />
            Column
          </button>
          <button
            onClick={() => dispatch(addRow())}
            className="toolbar-button add-row"
          >
            <Plus className="icon" />
            Row
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="secondary-container">
        <Sidebar />
        <div className="grid-container">
          <table className="data-grid-table">
            <thead>
              <tr className="table-header-row">
                <th className="table-header-cell">
                  {sortDirection === "asc" ? (
                    <ArrowUp10 className='header-icons' size={"1.3vw"} />
                  ) : (
                    <ArrowDown10 className='header-icons' size={"1.3vw"} />
                  )}
                </th>
                {columns.map((column) => (
                  <th key={column.id} className="table-header-cell">
                    <div className="header-cell-content">
                      <input
                        type="text"
                        className="cell-input"
                        value={column.name}
                        onChange={(e) =>
                          dispatch(
                            updateColumnName({
                              columnId: column.id,
                              newName: e.target.value,
                            })
                          )
                        }
                      />
                      {/* Disable delete button for timestamp column */}
                      {column.id !== "timestamp" && (
                        <button
                          onClick={() => dispatch(deleteColumn(column.id))}
                          className="delete-button"
                        >
                          <Trash2 className="icon" size={"1.1vw"} />
                        </button>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sortedRows.map((row) => (
                <tr key={row.id} className="table-row">
                  <td className="table-cell">{row.rowNumber}</td>
                  {columns.map((column) => (
                    <td
                      key={`${row.id}-${column.id}`}
                      className="table-cell"
                    >
                      {column.id === "timestamp" ? (
                        <span>{row.formattedTimestamp}</span>
                      ) : (
                        <input
                          type="text"
                          value={row[column.id] || ""}
                          onChange={(e) =>
                            dispatch(
                              updateCell({
                                rowId: row.id,
                                columnId: column.id,
                                value: e.target.value,
                              })
                            )
                          }
                          className="cell-input"
                        />
                      )}
                    </td>
                  ))}
                  <td className="table-cell action-cell">
                    <button
                      onClick={() => dispatch(deleteRow(row.id))}
                      className="delete-row-button"
                    >
                      <Trash2 className="icon" size={"1.1vw"} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DataGrid;
