import React from 'react'
import CustomTableData from '../utils/CommonComponents/CustomTableData'

export default function ItemList({
  dataType,
  onToggleTrending,
  userColumns,
  categoryData,
  addNewColumns,
  label,
  path,
  id,
  admin,
  isVewdetails
}) {
  return (
    <div className='container-fluid'>
      <div className='row clearfix'>
        <div className='col-lg-12'>
          <div className='card'>
            <div className='body'>
              <div className='table-responsive'>
                <CustomTableData
                  userColumns={userColumns}
                  userRows={categoryData}
                  actionItem={addNewColumns}
                  label={label}
                  path={path}
                  id={id}
                  admin={admin}
                  isVewdetails={isVewdetails}
                  dataType={dataType}
                  onToggleTrending={onToggleTrending}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
