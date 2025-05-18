import React, { useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import { DataGrid } from '@mui/x-data-grid'
import { Button, Typography, IconButton, Menu, MenuItem, Tooltip, Switch, TextField } from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import '../../assets/css/customtable.css'
import { useNavigate } from 'react-router-dom'
import ConfirmDeleteDialog from '../../Components/ConfirmDialog'

const AddCustomColumns = ({ actionItem = [], params, path, id, admin, isVewdetails }) => {
  const [openDialog, setOpenDialog] = useState(false)
  const [selectedAction, setSelectedAction] = useState(null)
  const [anchorEl, setAnchorEl] = useState(null)
  const navigate = useNavigate()

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const handleActionClick = (item) => {
    handleMenuClose()
    if (item.label.toLowerCase().includes('delete')) {
      setSelectedAction(item)
      setOpenDialog(true)
    } else if (item.label.toLowerCase().includes('view')) {
      const targetPath = admin ? `${path}${params.row[id]}/${admin}` : `${path}${params.row[id]}`
      navigate(targetPath)
    } else if (item.handleClick) {
      item.handleClick(params.row)
    }
  }

  const handleConfirmDelete = () => {
    if (selectedAction && selectedAction.handleDeleteItem) {
      selectedAction.handleDeleteItem(params?.row)
    }
    setOpenDialog(false)
  }

  const menuActions = [
    ...actionItem,
    ...(isVewdetails
      ? [
          {
            label: 'View Details',
            handleClick: () => {
              const targetPath = admin ? `${path}${params.row[id]}/${admin}` : `${path}${params.row[id]}`
              navigate(targetPath)
            },
            disabled: false
          }
        ]
      : [])
  ]

  return (
    <>
      <div className='cellAction'>
        <Tooltip title='Actions'>
          <IconButton size='small' onClick={handleMenuOpen}>
            <MoreVertIcon />
          </IconButton>
        </Tooltip>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left'
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left'
          }}
        >
          {menuActions.map((item, index) => (
            <MenuItem key={index} onClick={() => handleActionClick(item)} disabled={item.disabled}>
              {item.label}
            </MenuItem>
          ))}
        </Menu>
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

AddCustomColumns.propTypes = {
  actionItem: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      handleDeleteItem: PropTypes.func,
      handleClick: PropTypes.func,
      disabled: PropTypes.bool
    })
  ),
  params: PropTypes.shape({
    row: PropTypes.object.isRequired
  }).isRequired,
  path: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  admin: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  isVewdetails: PropTypes.bool
}

AddCustomColumns.defaultProps = {
  actionItem: [],
  admin: false,
  isVewdetails: false
}

export default function CustomTableData({
  userColumns,
  userRows,
  actionItem,
  label,
  path,
  id,
  admin,
  isVewdetails,
  dataType,
  onToggleTrending
}) {
  const [searchText, setSearchText] = useState('')
  const showTrendingToggle = ['course', 'exam', 'college'].includes(dataType)
  console.log({ dataType })
  const trendingToggleColumn = {
    field: 'isTrending',
    headerName: 'Trending',
    width: 120,
    sortable: false,
    filterable: false,
    disableColumnMenu: true,
    renderCell: (params) => (
      <Switch
        checked={params.row.is_trending}
        color='primary'
        onChange={() => onToggleTrending && onToggleTrending(params.row[id], !params.row.is_trending)}
        inputProps={{ 'aria-label': 'toggle trending' }}
      />
    )
  }

  const actionColumn = [
    {
      field: 'action',
      headerName: 'Action',
      width: 100,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      renderCell: (params) => (
        <AddCustomColumns actionItem={actionItem} params={params} path={path} id={id} isVewdetails={isVewdetails} admin={admin} />
      )
    }
  ]

  const columns = [...userColumns, ...(showTrendingToggle ? [trendingToggleColumn] : []), ...(actionItem.length > 0 ? actionColumn : [])]

  const filteredRows = useMemo(() => {
    if (!searchText) return userRows
    return userRows.filter((row) => Object.values(row).some((value) => String(value).toLowerCase().includes(searchText.toLowerCase())))
  }, [searchText, userRows])

  return (
    <div className='datatable'>
      <div
        className='datatableHeader'
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '16px'
        }}
      >
        <div className='datatableTitle'>{label}</div>
        <TextField
          size='small'
          variant='outlined'
          placeholder='Search...'
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          sx={{ minWidth: 500 }}
        />
      </div>

      {filteredRows.length < 1 ? (
        <Typography sx={{ p: 2 }}>No data found.</Typography>
      ) : (
        <DataGrid className='datagrid' rows={filteredRows} columns={columns} pageSize={9} rowsPerPageOptions={[9]} autoHeight />
      )}
    </div>
  )
}

CustomTableData.propTypes = {
  userColumns: PropTypes.arrayOf(PropTypes.object).isRequired,
  userRows: PropTypes.arrayOf(PropTypes.object).isRequired,
  actionItem: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      handleDeleteItem: PropTypes.func,
      handleClick: PropTypes.func,
      disabled: PropTypes.bool
    })
  ),
  label: PropTypes.string,
  path: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  admin: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  isVewdetails: PropTypes.bool,
  dataType: PropTypes.string,
  onToggleTrending: PropTypes.func
}

CustomTableData.defaultProps = {
  actionItem: [],
  label: '',
  admin: false,
  isVewdetails: false,
  dataType: '',
  onToggleTrending: null
}
