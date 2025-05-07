import ExamDescriptions from './ExamDescriptions'
import { useDispatch, useSelector } from 'react-redux'
import ExamHighlights from './ExamHighlights'
import ExamOtherSetting from './ExamOtherSetting'
import AddNewExam from './AddNewExam'
import { constants } from '../../utils/constants'
import { updateExamTab, updateTabValue } from '../../features/examSlice'

export default function AddExamDetails() {
  const dispatch = useDispatch()
  const { activeExamTab, tabValue } = useSelector((state) => state.exam)
  const { examTab } = constants.examDetailsTab

  const handleClick = (tabName) => {
    dispatch(updateExamTab({ tabName: tabName.key }))
    dispatch(updateTabValue({ tabValue: tabName.tabValue }))
  }

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <ul className='nav nav-tabs'>
          {examTab.map((tabName) => (
            <li className='nav-item'>
              <span
                className={`nav-link ${tabName.key === activeExamTab && 'active'}`}
                aria-current='page'
                onClick={() => handleClick(tabName)}
              >
                {tabName.label}
              </span>
            </li>
          ))}
        </ul>
        {
          {
            1: <AddNewExam />,
            2: <ExamDescriptions />,
            3: <ExamHighlights />,
            4: <ExamOtherSetting />
          }[tabValue]
        }
      </div>
    </>
  )
}
