import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactDataTable from "react-data-table-component"; // Import React DataTable

const ReportTable = () => {
  const [reports, setReports] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://103.127.132.71:8080/get-report", {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImNhbWF0YmFydUBnbWFpbC5jb20iLCJpZCI6Mn0.slNGR8XvHFH5U_zA-UCnFs-ySAETODeuqwQBWB9_W3M",
          },
        });
        setReports(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const columns = [
    {
      name: "Nama",
      selector: (row) => row.nama,
      sortable: true,
    },
    {
      name: "Topik",
      selector: (row) => row.topik,
      sortable: true,
    },
    {
      name: "Aduan",
      selector: (row) => row.aduan,
      sortable: true,
    },
    {
      name: "Lokasi",
      selector: (row) => row.lokasi,
      sortable: true,
    },
    {
      name: "Catatan Lokasi",
      selector: (row) => row.catatan_lokasi,
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => row.status.status,
      sortable: true,
    },
    {
      name: "Tanggal Aduan",
      selector: (row) => row.created_at,
      sortable: true,
    },
  ];

  const handleSearch = (event) => {
    setSearchText(event.target.value);
  };

  const filteredReports = reports.filter((report) => {
    const searchString = searchText.toLowerCase();
    return (
      report.nama.toLowerCase().includes(searchString) ||
      report.topik.toLowerCase().includes(searchString) ||
      report.aduan.toLowerCase().includes(searchString) ||
      report.lokasi.toLowerCase().includes(searchString) ||
      report.catatan_lokasi.toLowerCase().includes(searchString) ||
      report.status.status.toLowerCase().includes(searchString) ||
      report.created_at.toLowerCase().includes(searchString)
    );
  });

  return (
    <div className="px-20 py-20">
      <h1 className="text-4xl ">Riwayat Aduan</h1>
      <div className="flex justify-between">
        <div></div>
        <input
          type="text"
          placeholder="Search..."
          value={searchText}
          onChange={handleSearch}
          className="px-4 py-2 my-4 border border-gray-300 rounded-md "
        />
      </div>

      <ReactDataTable
        columns={columns}
        data={filteredReports}
        pagination
        highlight
        defaultSortField="id"
        defaultSortAsc // Enable default ascending sort on 'ID'
        // Optional props (refer to React DataTable documentation):
        // - onRowClicked
        // - onSortChange
        // - etc.
      />
    </div>
  );
};

export default ReportTable;
