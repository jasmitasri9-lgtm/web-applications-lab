function StudentInfo(props) {
  return (
    <div>
      <h2>Student Information</h2>
      <p>Name: {props.name}</p>
      <p>Roll Number: {props.rollNo}</p>
      <p>Course: {props.course}</p>
    </div>
  )
}

function App() {
  return (
    <div>
      <StudentInfo
        name="Jasmita"
        rollNo="2024036550"
        course="CSE Core"
      />
    </div>
  )
}

export default App