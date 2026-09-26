import { createContext, useContext, useState } from 'react'

const ThemeContext = createContext()

function ThemeProvider({ children }) {
  const [darkMode, setDarkMode] = useState(false)

  const toggleTheme = () => {
    setDarkMode(!darkMode)
  }

  return (
    <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

function ThemeContent() {
  const { darkMode, toggleTheme } = useContext(ThemeContext)

  return (
    <div
      style={{
        backgroundColor: darkMode ? '#222' : '#fff',
        color: darkMode ? '#fff' : '#000',
        minHeight: '200px',
        padding: '20px'
      }}
    >
      <h1>{darkMode ? 'Dark Theme' : 'Light Theme'}</h1>

      <button onClick={toggleTheme}>
        Switch Theme
      </button>
    </div>
  )
}

function App() {
  return (
    <ThemeProvider>
      <ThemeContent />
    </ThemeProvider>
  )
}

export default App