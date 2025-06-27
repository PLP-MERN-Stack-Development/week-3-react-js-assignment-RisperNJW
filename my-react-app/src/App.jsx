import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react'; 
import TaskManager from './components/TaskManager';
import Home from './Pages/Home';
import Layout from './Pages/Layout';
import ThemeSwitch from './Context/ThemeSwitch';
import UserList  from './components/UserList';
// import { ThemeProvider } from './context/ThemeContext';

// function Home() {
//   return (
//     <div className="text-center py-10">
//       <h1 className="text-3xl font-bold mb-4">Welcome to Task Manager</h1>
//       <p>Manage your tasks and browse user data</p>
//     </div>
//   );
// }
const App = () => {
  const [darkMode, setDarkMode] = useState(false);


  return (
  
      <Router >
        <Layout >
          <div className="max-w-7xl mx-auto p-8 text-center">
            <div className="fixed top-4 right-4 z-50">
              <ThemeSwitch darkMode={darkMode} setDarkMode={setDarkMode} />
            </div>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/tasks" element={<TaskManager />} />
              <Route path="/users" element={<UserList />} />
            </Routes>
          </div>
        </Layout>
      </Router>
    // </ThemeProvider>
  );
}

export default App;
