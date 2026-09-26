import { createContext, useContext, useReducer } from 'react'

const AttendanceContext = createContext()

const initialState = [
  { name: 'Jasmita', status: 'Absent' },
  { name: 'Rahul', status: 'Absent' },
  { name: 'Ananya', status: 'Absent' },
  { name: 'Arjun', status: 'Absent' }
]

function attendanceReducer(state, action) {
  switch (action.type) {
    case 'MARK_PRESENT':
      return state.map((student, index) =>
        index === action.index
          ? { ...student, status: 'Present' }
          : student
      )

    case 'MARK_ABSENT':
      return state.map((student, index) =>
        index === action.index
          ? { ...student, status: 'Absent' }
          : student
      )

    default:
      return state
  }
}

function AttendanceProvider({ children }) {
  const [students, dispatch] = useReducer(
    attendanceReducer,
    initialState
  )

  return (
    <AttendanceContext.Provider value={{ students, dispatch }}>
      {children}
    </AttendanceContext.Provider>
  )
}

function AttendanceList() {
  const { students, dispatch } = useContext(AttendanceContext)

  return (
    <div>
      <h2>Student Attendance</h2>

      {students.map((student, index) => (
        <div key={index}>
          <p>
            {student.name} - {student.status}
          </p>

          <button
            onClick={() =>
              dispatch({
                type: 'MARK_PRESENT',
                index
              })
            }
          >
            Present
          </button>

          <button
            onClick={() =>
              dispatch({
                type: 'MARK_ABSENT',
                index
              })
            }
          >
            Absent
          </button>

          <hr />
        </div>
      ))}
    </div>
  )
}

function App() {
  return (
    <AttendanceProvider>
      <AttendanceList />
    </AttendanceProvider>
  )
}

export default App