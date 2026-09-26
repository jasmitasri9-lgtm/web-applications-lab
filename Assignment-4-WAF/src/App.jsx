import { createContext, useContext, useEffect, useState } from 'react'

const TaskContext = createContext()

function TaskProvider({ children }) {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks')
    return savedTasks ? JSON.parse(savedTasks) : []
  })

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks])

  const addTask = (task) => {
    setTasks([...tasks, task])
  }

  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index))
  }

  return (
    <TaskContext.Provider value={{ tasks, addTask, deleteTask }}>
      {children}
    </TaskContext.Provider>
  )
}

function AddTask() {
  const [task, setTask] = useState('')
  const { addTask } = useContext(TaskContext)

  const handleSubmit = (e) => {
    e.preventDefault()

    if (task.trim() === '') return

    addTask(task)
    setTask('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter a task"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />

      <button type="submit">Add Task</button>
    </form>
  )
}

function TaskList() {
  const { tasks, deleteTask } = useContext(TaskContext)

  return (
    <div>
      <h2>Task List</h2>

      {tasks.length === 0 ? (
        <p>No tasks added yet.</p>
      ) : (
        tasks.map((task, index) => (
          <div key={index}>
            <p>{task}</p>

            <button onClick={() => deleteTask(index)}>
              Delete
            </button>

            <hr />
          </div>
        ))
      )}
    </div>
  )
}

function App() {
  return (
    <TaskProvider>
      <div>
        <h1>Task Management</h1>

        <AddTask />

        <TaskList />
      </div>
    </TaskProvider>
  )
}

export default App