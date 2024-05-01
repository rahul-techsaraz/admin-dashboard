import React from 'react'
import { DataGrid } from "@mui/x-data-grid";
import { Typography } from "@mui/material";
import '../../assets/css/customtable.css';
import { Link } from 'react-router-dom';

const AddCustomColumns = ({actionItem,params}) => {
  return (
    <>
    {actionItem.map(item => (
      <div className="cellAction">
     <div
        className={item?.classname}
        onClick={() => item.handleDeleteItem(params.row)}
      >
        {item.label}
      </div>
     
    </div>
    ))}
    </>

  )
}
export default function CustomTableData({ userColumns, userRows, actionItem, label, path, id }) {
  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          
          <AddCustomColumns actionItem={actionItem} params={params} />
        );
      },
      },
      {
      field: "status",
      headerName: "Action",
      width: 200,
        renderCell: (params) => {
        return (
         <Link to={path + params.row[`${id}`]}>Edit</Link>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      <div className="datatableTitle">
        {label}
        
      </div>
      {userRows.length < 1 ? (<Typography>There is no data</Typography>) : (
        <DataGrid
        className="datagrid"
        rows={userRows}
        columns={actionItem.length > 0 ? userColumns.concat(actionColumn) : userColumns}
        pageSize={9}
        rowsPerPageOptions={[9]}
        //checkboxSelection
      />
      )}
      
        </div>
  )
}
