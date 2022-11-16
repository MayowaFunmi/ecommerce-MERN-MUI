import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './components/Homepage';
import Navbar from './components/Navbar';
import SignUp from './components/SignUp';

const App = () => {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" exact element={<Homepage />} />
          <Route path="/register" exact element={<SignUp />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
