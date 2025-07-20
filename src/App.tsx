import { HashRouter, Route, Routes } from "react-router";

import AddTaskPage from "./pages/add-task-page";
import DonedTasksPage from "./pages/doned-tasks-page";
import Layout from "./pages/layout";
import TasksPage from "./pages/tasks-page";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<TasksPage />} />
          <Route path="doned" element={<DonedTasksPage />} />
          <Route path="add-task" element={<AddTaskPage />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
