import "./App.css";
import Staff_maging from "./pages/admin/staff_maging";
import Staff_attendance from "./pages/admin/staff_attendance";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import AddAttendance from "./pages/user/attendance_form";
const App = () => {
  return (
    <div className="p-5 pt-2">
      <Router>
        <Routes>
          <Route path="/" element={<Staff_maging />} />
          <Route path="/sa" element={<Staff_attendance />} />
          <Route path="/af" element={<AddAttendance />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
