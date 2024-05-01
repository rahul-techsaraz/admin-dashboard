import React from 'react'

export default function AddItemForm({children,label}) {
  
  return (
   <div className="container-fluid">
          <div className="row clearfix">
    <div className="col-lg-12">
      <div className="card">
        <div className="body">
                          <div className="row clearfix">
                              <h2>{label}</h2>
            <div className="col-sm-12" style={{display:'flex'}}>
              
                                 {children}
            </div>
            
           
          </div>
          
        </div>
      </div>
    </div>
          </div>
        </div>
  )
}
