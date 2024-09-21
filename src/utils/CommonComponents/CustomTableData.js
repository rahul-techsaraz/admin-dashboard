import React from 'react'
import { DataGrid } from '@mui/x-data-grid'
import { Button, Typography } from '@mui/material'
import '../../assets/css/customtable.css'
import { Link } from 'react-router-dom'

const AddCustomColumns = ({ actionItem = [], params, path, id, admin, isVewdetails }) => {
  return (
    <>
      <div className='cellAction'>
        {actionItem.map((item) => (

          <Button variant='contained' color='error' onClick={() => item.handleDeleteItem(params.row)}>
            {item.label}
          </Button>
        ))}
        {isVewdetails && (
          <Button variant='contained' color='success'>
            <Link to={admin ? path + params.row[`${id}`] + '/' + admin : path + params.row[`${id}`]} style={{ color: 'white' }}>
              View Details
            </Link>
          </Button>
        )}
      </div>

    </>
  )
}
export default function CustomTableData({ userColumns, userRows, actionItem, label, path, id, admin, isVewdetails }) {
  const actionColumn = [
    {
      field: 'action',
      headerName: 'Action',
      width: 350,
      renderCell: (params) => {
        return <AddCustomColumns actionItem={actionItem} params={params} path={path} id={id} isVewdetails={isVewdetails} admin={admin} />
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
          columns={userColumns.concat(actionColumn)}
          pageSize={9}
          rowsPerPageOptions={[9]}
        />
      )}
    </div>
  )
}
