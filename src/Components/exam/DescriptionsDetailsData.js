import React, { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateEditMode } from '../../features/examSlice';


export default function DescriptionsDetailsData() {
const {isEdit} = useSelector(state => state.exam)    
 const dispatch = useDispatch();
   

  return (
    <div>
                  <div >
                      <div>
                  <button onClick={() => dispatch(updateEditMode({flag:!isEdit}))}>Edit</button>
                          
                      </div>
                      
                  <span >Exam Description</span>
              </div>
              <div >
                  <span >Exam Description</span>
              </div>
              <div >
                  <span >Exam Description</span>
              </div>
              <div >
                  <span >Exam Description</span>
              </div>
              <div >
                  <span >Exam Description</span>
              </div>
              </div>
  )
}
