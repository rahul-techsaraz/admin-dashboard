import React, { useEffect, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid'
import { Button, Typography } from '@mui/material'
import '../../assets/css/customtable.css'
import { Link } from 'react-router-dom'
import ConfirmDeleteDialog from '../../Components/ConfirmDialog'

// const AddCustomColumns = ({ actionItem = [], params, path, id, admin, isVewdetails }) => {
//   const [isDraft, setIsDraft] = useState(false)
//   useEffect(() => {
//     if (params.row.is_publish === 'DRAFT') {
//       setIsDraft(true)
//     }
//   }, [params])

//   return (
//     <>
//       <div className='cellAction'>
//         {actionItem.map((item, index) => (
//           <Button key={index} variant='contained' color='error' onClick={() => item.handleDeleteItem(params.row)}>
//             {item.label}
//           </Button>
//         ))}
//         {isVewdetails && (
//           <Button variant='contained' color='success'>
//             <Link to={admin ? path + params.row[`${id}`] + '/' + admin : path + params.row[`${id}`]} style={{ color: 'white' }}>
//               {isDraft ? 'continue' : 'View Details'}
//             </Link>
//           </Button>
//         )}
//       </div>
//     </>
//   )
// }
const AddCustomColumns = ({ actionItem = [], params, path, id, admin, isVewdetails }) => {
  const [isDraft, setIsDraft] = useState(false)
  const [openDialog, setOpenDialog] = useState(false)
  const [selectedAction, setSelectedAction] = useState(null)

  useEffect(() => {
    if (params.row.is_publish === 'DRAFT') {
      setIsDraft(true)
    }
  }, [params])

  const handleOpenDialog = (item) => {
    setSelectedAction(item)
    setOpenDialog(true)
  }

  const handleConfirmDelete = () => {
    if (selectedAction && selectedAction.handleDeleteItem) {
      selectedAction.handleDeleteItem(params?.row)
    }
    setOpenDialog(false)
  }

  return (
    <>
      <div className='cellAction'>
        {actionItem.map((item, index) => (
          <Button key={index} variant='contained' color='error' onClick={() => handleOpenDialog(item)}>
            {item.label}
          </Button>
        ))}
        {isVewdetails && (
          <Button variant='contained' color='success'>
            <Link to={admin ? path + params.row[`${id}`] + '/' + admin : path + params.row[`${id}`]} style={{ color: 'white' }}>
              {isDraft ? 'Continue' : 'View Details'}
            </Link>
          </Button>
        )}
      </div>

      <ConfirmDeleteDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        onConfirm={handleConfirmDelete}
        title='Are you sure you want to delete'
      />
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
          columns={actionItem.length > 0 ? userColumns.concat(actionColumn) : userColumns}
          pageSize={9}
          rowsPerPageOptions={[9]}
          autoHeight={true}
        />
      )}
    </div>
  )
}
