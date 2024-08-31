import Home from "./pages/Home";
import "react-toastify/dist/ReactToastify.css";
import Workspace from "./pages/Workspace";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./routes/Root";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      children:[
        {
          path: "",
          element: <Home />,
        },
        {
          path: "rooms/:roomId",
          element: <Workspace />,
        },
      ]
    },
    
  ]);
  return <RouterProvider router={router} />;
}

export default App;
