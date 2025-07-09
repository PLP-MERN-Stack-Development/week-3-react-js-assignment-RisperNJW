import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './Context/ThemeContext';
import TaskManager from './components/TaskManager';
import Home from './Pages/Home';
import Layout from './Pages/Layout';
import UserList from './components/UserList';
import ThemeSwitch from './components/ThemeSwitch';

const App = () => {
  return (
    <ThemeProvider>
      <Router>
        <Layout>
          <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
            <div className="fixed top-4 right-4 z-50">
              <ThemeSwitch />
            </div>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/tasks" element={<TaskManager />} />
              <Route path="/users" element={<UserList />} />
            </Routes>
          </div>
        </Layout>
      </Router>
    </ThemeProvider>
  );
};

export default App;