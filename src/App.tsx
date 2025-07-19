import { HashRouter, Route, Routes } from "react-router";

import Layout from "./pages/layout";
import TasksPage from "./pages/tasks-page";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<TasksPage />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
