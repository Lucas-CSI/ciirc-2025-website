import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import MedicalHomePage from './Home';
import MedicalFileUpload from './Upload';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MedicalHomePage />} />
        <Route path="/upload" element={<MedicalFileUpload />} />
      </Routes>
    </Router>
  );
}

export default App;