Data Table Management System
Overview
This project is a Data Table Management System built using React and Redux. It provides a responsive, interactive interface to manage tabular data. Key features include sorting, filtering, searching, adding rows/columns, and editing data directly within the table. The data is stored in the Redux state for centralized and consistent management.

Features
1. Responsive Web Design
The application is designed to be fully responsive, ensuring a smooth user experience on various screen sizes, from mobile devices to large desktop screens.
The layout adjusts dynamically based on the available screen space, ensuring that elements like the data table, toolbar, and filter menu are always usable and visually appealing.
2. Sorting by Timestamps
Users can sort the data based on timestamps.
The sorting function is available for all relevant columns, allowing users to view data in chronological order (ascending or descending) with just a click.
3. Filter Based on Cell Entries
The application allows users to filter table rows based on entries in any column.
The filter is dynamic, and users can easily specify filter criteria, narrowing down the displayed data to meet their needs.
The filter options are implemented with a dropdown menu, which appears when the user clicks on the filter icon in the table header.
4. Search Feature
A powerful search feature enables users to quickly locate specific records in the table.
Users can type keywords into the search input field, and the table will automatically update to show the relevant rows containing matching records.
5. Add Row and Column Features
Users can add new rows and columns to the table dynamically.
New rows can be inserted with custom data, and new columns can be added with a specific name and data type.
The table layout updates automatically to accommodate the added rows/columns.
6. Edit Row Data
The data in the table can be edited directly by clicking on individual cells.
Upon clicking a cell, an editable input field appears, allowing the user to modify the data.
The changes are saved directly within the table, and the Redux state is updated to reflect these changes.
7. Redux State Management
All table data and UI state (sorting, filtering, search results, etc.) are stored and managed within React Redux.
Redux provides centralized state management, ensuring that changes in the data or UI are consistent across all components.
The state is updated in real-time as users interact with the table, and data persists in the Redux store.


How It Works
Data Table: The table displays data dynamically based on the state in Redux. Each cell is clickable, enabling inline editing.
Sorting: By clicking on column headers, users can sort the table based on that column’s data. Sorting is done in ascending or descending order based on the timestamp or other column types.
Filtering: The filter dropdown allows users to filter rows based on cell values in any column. Users can select specific filter criteria from the dropdown.
Searching: A search bar allows users to find specific rows by typing keywords. The table will automatically filter the rows based on the search term.
Adding Rows/Columns: New rows and columns can be added, expanding the table dynamically. The new data will be reflected immediately in the table view.
Editing Data: Users can directly edit the table's cell values. Upon editing, the Redux state is updated, and the changes are reflected in real-time.