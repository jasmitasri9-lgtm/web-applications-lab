
import { useState } from 'react'
import './App.css'

function EmployeeCard({ employee, onEdit }) {
  return (
    <div className="employee-card">
      <h2>{employee.name}</h2>
      <p><strong>ID:</strong> {employee.id}</p>
      <p><strong>Role:</strong> {employee.role}</p>
      <p><strong>Department:</strong> {employee.department}</p>
      <button onClick={() => onEdit(employee)}>Update</button>
    </div>
  )
}

function App() {
  const [employees, setEmployees] = useState([
    {
      id: 1,
      name: 'Jasmita',
      role: 'Software Developer',
      department: 'IT'
    },
    {
      id: 2,
      name: 'Rahul',
      role: 'UI Designer',
      department: 'Design'
    }
  ])

  const [name, setName] = useState('')
  const [role, setRole] = useState('')
  const [department, setDepartment] = useState('')
  const [editId, setEditId] = useState(null)
  const [message, setMessage] = useState('')

  function saveEmployee(e) {
    e.preventDefault()

    if (!name.trim() || !role.trim() || !department.trim()) {
      setMessage('Please fill in all fields.')
      return
    }

    if (editId !== null) {
      setEmployees(employees.map(employee =>
        employee.id === editId
          ? { ...employee, name, role, department }
          : employee
      ))
      setMessage('Employee updated successfully!')
    } else {
      const newEmployee = {
        id: Date.now(),
        name,
        role,
        department
      }
      setEmployees([...employees, newEmployee])
      setMessage('Employee added successfully!')
    }

    setName('')
    setRole('')
    setDepartment('')
    setEditId(null)
  }

  function editEmployee(employee) {
    setEditId(employee.id)
    setName(employee.name)
    setRole(employee.role)
    setDepartment(employee.department)
    setMessage('Edit the details and click Save Employee.')
  }

  return (
    <div className="app">
      <h1>Employee Management</h1>
      <p className="message">{message}</p>

      <form onSubmit={saveEmployee} className="employee-form">
        <input
          placeholder="Employee Name"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <input
          placeholder="Role"
          value={role}
          onChange={e => setRole(e.target.value)}
        />
        <input
          placeholder="Department"
          value={department}
          onChange={e => setDepartment(e.target.value)}
        />
        <button type="submit">
          {editId !== null ? 'Save Employee' : 'Add Employee'}
        </button>
      </form>

      <div className="employees">
        {employees.map(employee => (
          <EmployeeCard
            key={employee.id}
            employee={employee}
            onEdit={editEmployee}
          />
        ))}
      </div>
    </div>
  )
}

export default App
