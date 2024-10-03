import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css"; // Tailwind CSS
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./routes/App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./routes/HomePage.jsx";
import Qr from "./routes/Qr.jsx";
import HeroSection from "./routes/HeroSection.jsx";
import LinkHome from "./routes/LinkHome.jsx";
import LinkMainContent from "./routes/LinksMainContent.jsx";
import Pricing from "./routes/Pricing.jsx";
import Analytics from "./routes/Analytics.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <HeroSection />,
  },
  {
    path: "/pricing",
    element: <Pricing />,
  },
  {
    path: "/logout",
    element: <div>logout page</div>,
  },
  {
    path: "/home",
    element: <App />,
    children: [
      { path: "", element: <HomePage /> },

      {
        path: "qr",
        element: <Qr />,
      },
      {
        path: "link-home",
        element: <LinkMainContent />,
      },
      {
        path: "link-home/shlink",
        element: <LinkHome />,
      },

      {
        path: "analytics",
        element: <Analytics />,
      },
      {
        path: "settings",
        element: <div>settings page</div>,
      },
      {
        path: "help",
        element: <div>help page</div>,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
