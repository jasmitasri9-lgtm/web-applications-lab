
import { createContext, useContext, useState } from 'react'
import './App.css'

const CourseContext = createContext()

function CourseList() {
  const { courses, selectedCourses, toggleCourse } = useContext(CourseContext)

  return (
    <div className="course-list">
      <h2>Available Courses</h2>

      {courses.map(course => (
        <label className="course-option" key={course.id}>
          <input
            type="checkbox"
            checked={selectedCourses.includes(course.name)}
            onChange={() => toggleCourse(course.name)}
          />
          <span>{course.name}</span>
        </label>
      ))}
    </div>
  )
}

function SelectedCourses() {
  const { selectedCourses } = useContext(CourseContext)

  return (
    <div className="selected-courses">
      <h2>Selected Courses</h2>

      {selectedCourses.length === 0 ? (
        <p>No courses selected yet.</p>
      ) : (
        <ul>
          {selectedCourses.map(course => (
            <li key={course}>{course}</li>
          ))}
        </ul>
      )}
    </div>
  )
}

function CourseRegistration() {
  const [selectedCourses, setSelectedCourses] = useState([])

  const courses = [
    { id: 1, name: 'Web Development' },
    { id: 2, name: 'Data Structures' },
    { id: 3, name: 'Database Management' },
    { id: 4, name: 'Software Engineering' },
    { id: 5, name: 'Computer Networks' }
  ]

  function toggleCourse(courseName) {
    setSelectedCourses(previous =>
      previous.includes(courseName)
        ? previous.filter(course => course !== courseName)
        : [...previous, courseName]
    )
  }

  return (
    <CourseContext.Provider
      value={{ courses, selectedCourses, toggleCourse }}
    >
      <div className="app">
        <h1>Course Registration</h1>
        <p>Select your courses below.</p>

        <div className="course-container">
          <CourseList />
          <SelectedCourses />
        </div>
      </div>
    </CourseContext.Provider>
  )
}

function App() {
  return <CourseRegistration />
}

export default App
