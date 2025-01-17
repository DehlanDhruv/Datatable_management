const data = [
    {
      timestamp: new Date("Oct 12, 2024 14:08").getTime(),
      action: "Bitscale Evaluation - Account relevancy check",
      enrich : "Bitscale Evaluation - Account relevancy check",
    },
    {
      timestamp: new Date("Oct 11, 2024 10:30").getTime(),
      action: "cell data size exceeds limit",
      enrich : "BMW Evaluation - Relevancy check"
    },
    {
      timestamp: new Date("Oct 13, 2024 09:45").getTime(),
      action: "https://www.linkedin.com/bitScale",
      enrich : "Google Evaluation - Relevancy check",
    },
    {
      timestamp: new Date("Oct 10, 2024 18:20").getTime(),
      action: "Apple Evaluation - Relevancy check",
      enrich : "Loading",
    },
    {
      timestamp: new Date("Oct 12, 2024 12:00").getTime(),
      action: "Figma Evaluation - Relevancy check",
      enrich : "Loading",
    },
  ];

  export default data


//   <div className="add-row-container">
//           <button
//             className="add-row-button"
//             onClick={() =>
//               setEntries([...entries, { timestamp: Date.now(), action: "New Action", enrich : "Pending" }])
//             }
//           >
//             <Plus size={18} /> Add Row
//           </button>
//           <button className="add-row-button" onClick={addColumn}>
//             <Plus size={18} /> Add Column
//           </button>
//         </div>


 // const addColumn = () => {
  //   const newColumnName = `New Column ${columns.length + 1}`;
  //   setColumns([...columns, newColumnName]);

  //   const updatedEntries = entries.map((entry) => ({
  //     ...entry,
  //     [newColumnName.toLowerCase().replace(/ /g, "")]: "N/A",
  //   }));
  //   setEntries(updatedEntries);
  // };