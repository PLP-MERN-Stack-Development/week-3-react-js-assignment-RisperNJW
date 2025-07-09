import Card from '../components/Card';
import { useTheme } from '../Context/ThemeContext';

const Home = () => {
  const { darkMode } = useTheme();

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className={`max-w-md mx-auto transition-all duration-300 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="p-6 text-center">
          {/* Animated Welcome Text */}
          <h1 className={`text-3xl font-bold mb-6 bg-gradient-to-r ${darkMode ? 'from-teal-300 to-blue-400' : 'from-teal-600 to-blue-600'} bg-clip-text text-transparent`}>
            Welcome to TaskFlow
          </h1>
          
          {/* Feature Cards Grid */}
          <div className="grid gap-4 mb-8">
            <FeatureCard 
              title="Task Manager" 
              description="Organize your daily tasks efficiently"
              path="/tasks"
              darkMode={darkMode}
              icon="📝"
            />
            <FeatureCard 
              title="User Dashboard" 
              description="View and manage user profiles"
              path="/users"
              darkMode={darkMode}
              icon="👥"
            />
          </div>

          <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Get started by selecting a feature above or using the navigation menu
          </p>
        </div>
      </Card>
    </div>
  );
};

// Reusable Feature Card Component
const FeatureCard = ({ title, description, path, darkMode, icon }) => {
  return (
    <a 
      href={path}
      className={`p-4 rounded-lg transition-all duration-300 flex items-start space-x-3 ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'} border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}
    >
      <span className="text-2xl">{icon}</span>
      <div>
        <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>{title}</h3>
        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{description}</p>
      </div>
    </a>
  );
};

export default Home;