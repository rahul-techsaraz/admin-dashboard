import React from 'react'
import { DataGrid } from '@mui/x-data-grid'
import { Button, Typography } from '@mui/material'
import '../../assets/css/customtable.css'
import { Link } from 'react-router-dom'

const AddCustomColumns = ({ actionItem, params, path, id, isVewdetails }) => {
  return (
    <>
      {actionItem.map((item) => (
        <div className='cellAction' key={item.label}>
          <Button variant='contained' color='error' onClick={() => item.handleDeleteItem(params.row)}>
            {item.label}
          </Button>
          {isVewdetails && (
            <Button variant='contained' color='success'>
              <Link to={path + params.row[`${id}`]} style={{ color: 'white' }}>
                View Details
              </Link>
            </Button>
          )}
        </div>
      ))}
    </>
  )
}
export default function CustomTableData({ userColumns, userRows, actionItem, label, path, id, isVewdetails }) {
  const actionColumn = [
    {
      field: 'action',
      headerName: 'Action',
      width: 350,
      renderCell: (params) => {
        return <AddCustomColumns actionItem={actionItem} params={params} path={path} id={id} isVewdetails={isVewdetails} />
      }
    }
  ]
  return (
    <div className='datatable'>
      <div className='datatableTitle'>{label}</div>
      {userRows.length < 1 ? (
        <Typography>There is no data</Typography>
      ) : (
        <DataGrid
          className='datagrid'
          rows={userRows}
          columns={actionItem.length > 0 ? userColumns.concat(actionColumn) : userColumns}
          pageSize={9}
          rowsPerPageOptions={[9]}
        />
      )}
    </div>
  )
}
