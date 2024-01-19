import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import "./App.css";
import CreateTaskForm from "./components/CreateTaskForm";
import Task from "./components/Task";

function App() {
  return (
    <>
      <Header />
      <div className="container shadow p-3">
        <Routes>
          <Route path="/" element={<Task />} />
          <Route path="/create-task" element={<CreateTaskForm />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
