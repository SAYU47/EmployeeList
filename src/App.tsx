import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EmployeesList from './components/EmployeeList/EmployeeList';
import EmployeeForm from './components/EmployeeForm/EmployeeForm'

const App = () => (
  <Router>
  <Routes>
    <Route path="/" element={<EmployeesList />} />
    <Route path="/add-employee" element={<EmployeeForm />} />
    <Route path="/edit/:id" element={<EmployeeForm />} /> 
  </Routes>
</Router>
);

export default App;
