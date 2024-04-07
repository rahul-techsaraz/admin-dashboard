import ExamDescriptions from './ExamDescriptions'
import { useDispatch, useSelector } from 'react-redux'
import ExamHighlights from './ExamHighlights'
import ExamOtherSetting from './ExamOtherSetting'
import AddNewExam from './AddNewExam'
import { constants } from '../../utils/constants'
import { updateExamTab } from '../../features/examSlice'


export default function AddExamDetails() {
  const dispatch = useDispatch();
  const { activeExamTab } = useSelector(state => state.exam);
  const { examTab } = constants.examDetailsTab;

  return (
    <>
      
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <ul class="nav nav-tabs">
            {examTab.map(tabName => (
              <li class="nav-item">
                <span
                  className={`nav-link ${tabName.key === activeExamTab && 'active'}`}
                  aria-current="page"
                  onClick={() => dispatch(updateExamTab({tabName:tabName.key}))}
                >
                  {tabName.label}
                </span>
            </li>
            ))}
</ul>
          {
        {
                  'examinfo': <AddNewExam />,
                  'description': <ExamDescriptions />,
                  'highlights': <ExamHighlights />,
                  'config' : <ExamOtherSetting />
        }[activeExamTab]
          }
      </div>
        
      </>
  )
}
