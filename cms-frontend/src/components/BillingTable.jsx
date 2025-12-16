import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function BillingTable() {
  const [rowData, setRowData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://test-billing-zpdr.onrender.com/api/billing")
      .then((res) => res.json())
      .then((data) => setRowData(data));
  }, []);

  const deleteClient = async (id) => {
    if (!window.confirm("Delete this billing record?")) return;

    await fetch(`https://test-billing-zpdr.onrender.com/api/billing/${id}`, {
      method: "DELETE",
    });

    setRowData((prev) => prev.filter((item) => item._id !== id));
  };

  const columnDefs = [
    {
      field: "customer",
      headerName: "Customer",
      flex: 1,
      minWidth: 90,
    },
    {
      field: "service",
      headerName: "Service",
      flex: 1,
      minWidth: 90,
    },
    {
      field: "location",
      headerName: "Location",
      flex: 1,
      minWidth: 90,
    },
    {
      field: "amount",
      headerName: "Amount (€)",
      filter: "agNumberColumnFilter",
      flex: 1,
      minWidth: 90,
    },
    {
      field: "date",
      headerName: "Date",
      flex: 1,
      minWidth: 90,
      hide: window.innerWidth < 768, // 👈 tablette
    },
    {
      headerName: "Actions",
      minWidth: 160,
      cellRenderer: (params) => (
        <div className="flex flex-row gap-2 items-center justify-center h-full">
          <button
            onClick={() => navigate(`/update/${params.data._id}`)}
            className="px-3 py-1 text-xs md:text-sm rounded-lg bg-emerald-500 text-white hover:bg-emerald-600 transition w-full md:w-auto"
          >
            Update
          </button>
          <button
            onClick={() => deleteClient(params.data._id)}
            className="px-3 py-1 text-xs md:text-sm rounded-lg bg-rose-500 text-white hover:bg-rose-600 transition w-full md:w-auto"
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="w-full mt-34 sm:mt-40 ">
  {/* Header */}
        <h1 className="text-3xl sm:text-5xl mb-5  mx-5">Billings Table <span className="text-zinc-300 text-sm md:text-xl">at this moment</span></h1>


  {/* Grid container */}
  <div
    className="ag-theme-quartz rounded-xl shadow-sm bg-green-50"
    style={{ height: "70vh", width: "100%" }}
  >
    <AgGridReact
      rowData={rowData}
      columnDefs={columnDefs}
      animateRows
      headerHeight={52}
      rowGroupPanelShow="always"
      groupDisplayType="multipleColumns"
      defaultColDef={{
        sortable: true,
        filter: true,
        resizable: true,
      }}
    />
  </div>
</div>

  );
}
