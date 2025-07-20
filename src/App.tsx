import { HashRouter, Route, Routes } from "react-router";

import DonedTasksPage from "./pages/doned-tasks-page";
import Layout from "./pages/layout";
import TaskInfoPage from "./pages/task-info-page";
import TasksPage from "./pages/tasks-page";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<TasksPage />} />
          <Route path="doned" element={<DonedTasksPage />} />
          <Route path="task-info/:id" element={<TaskInfoPage />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
