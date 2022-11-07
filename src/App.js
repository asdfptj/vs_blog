import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Main from "./pages/Main";
import ThemeContext from "./context/AppContext";
import { useEffect, useState } from "react";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Main />}>
      {/* <Route path="dashboard" element={<Dashboard />} /> */}
      {/* ... etc. */}
    </Route>
  )
);

function App() {
  const [selectedPost, setSelectedPost] = useState("");
  const [postData, setPostData] = useState([]);
  const [openPost, setOpenPost] = useState([]);

  useEffect(() => {
    setPostData([
      {
        type: "directory",
        title: "일상",
      },

      {
        type: "directory",
        title: "Tech",
        children: [
          {
            type: "post",
            title: "Tech1",
            path: "/Tech/Tech1",
          },
          {
            type: "post",
            title: "Tech2",
            path: "/Tech/Tech2",
          },
          {
            type: "post",
            title: "Tech3",
            path: "/Tech/Tech3",
          },
          {
            type: "post",
            title: "Tech4",
            path: "/Tech/Tech4",
          },
          {
            type: "post",
            title: "Tech5",
            path: "/Tech/Tech5",
          },
          {
            type: "directory",
            title: "Tech3",
            children: [
              {
                type: "post",
                title: "Tech31",
                path: "/Tech/Tech3/Tech31",
              },
              {
                type: "post",
                title: "Tech32",
                path: "/Tech/Tech3/Tech32",
              },
              {
                type: "post",
                title: "Tech33",
                path: "/Tech/Tech3/Tech33",
              },
              {
                type: "post",
                title: "Tech34",
                path: "/Tech/Tech3/Tech34",
              },
              {
                type: "post",
                title: "Tech35",
                path: "/Tech/Tech3/Tech35",
              },
            ],
          },
        ],
      },
    ]);
  }, []);

  return (
    <ThemeContext.Provider
      value={{
        selectedPost,
        setSelectedPost,

        openPost,
        setOpenPost,

        postData,
      }}
    >
      <RouterProvider router={router} />
    </ThemeContext.Provider>
  );
}

export default App;
