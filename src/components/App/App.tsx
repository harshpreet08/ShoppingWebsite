import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from 'components/Home';
import Login from 'components/Login';
import SignIn from 'components/SignIn';
import ProtectedRoute from 'components/App/ProtectedRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/home" element={<ProtectedRoute element={<Home />} />} />
      </Routes>
    </Router>
  );
}

export default App;
