import React, { useContext } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ContextProvider from "./context/ContextProvider";
import { Context } from "./context/ContextProvider";
import "./styles/styles.css";
import LandingPage from "./layouts/LandingPage";
import Redirect from "./components/Redirect";

const App = () => {
  const { docs } = useContext(Context);
  console.log("App runs");
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      {docs
        ? docs.map((doc) => (
            <Route
              key={doc._id}
              path={`/api/redirect/${doc.shortUrl}`}
              element={<Redirect doc={doc} to={doc.originalUrl} />}
            />
          ))
        : null}
    </Routes>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <ContextProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ContextProvider>
);
