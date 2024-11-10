import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { indexPattern } from "./Routes";
import User from "./components/user/User";
import { taskPattern } from "./Routes";
import Task from "./pages/task";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path={indexPattern} element={<User />} />
          <Route element={<ProtectedRoute />}>
            <Route exact path={taskPattern} element={<Task />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
