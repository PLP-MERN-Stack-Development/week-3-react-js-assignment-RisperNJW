import Card from '../components/Card';

const Home = () => {
  return (
    <Card className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Welcome to the React App</h1>
      <p className="mb-4">
        Task Manager and User List features are available to explore.
      </p>
      <p>
        Navigate using the menu above to see different features.
      </p>
    </Card>
  );
};

export default Home;