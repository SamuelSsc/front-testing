import HomePage from "@app/modules/home/home.page";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function RootRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </Router>
  );
}

export default RootRouter;
