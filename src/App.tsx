import { HashRouter, Route, Routes } from "react-router";

import Layout from "./pages/layout";
import TodayTasksPage from "./pages/today-tasks-page";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<TodayTasksPage />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
