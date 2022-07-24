import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import SearchPage from "./pages/SearchPage/SearchPage";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Post from "./pages/post/Post";
import CreatePost from "./pages/createPost/CreatePost";
// import EditPost from "./pages/editPost/EditPost";
import { useContext, useState } from "react";
import { AuthContext } from "./context/authContext";
// import { Navigate } from "react-router-dom"
import Activity from "./pages/Activity/Activity";
import AllActivity from "./pages/allActivity/AllActivity";
import UserPage from "./pages/userPage/UserPage";

function App() {
  const { user } = useContext(AuthContext);

  const ProtectedRoute = ({ children }) => {
    if (!user) {
      return <Login title="Login to Create Post" link="/new" />;
    } else {
      return children;
    }
  };

  const [loading, setLoading] = useState(true);
  const spinner = document.getElementById("spinner");
  if (spinner) {
    setTimeout(() => {
      spinner.style.display = "none";
      setLoading(false);
    }, 2000);
  }

  return (
    !loading && (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/login"
            element={<Login title="Welcome Back!" link="/" />}
          />
          <Route path="/register" element={<Register />} />
          <Route path="/:id" element={<Post />} />
          {/* <Route path="/:id/edit" element={<EditPost />} /> */}
          <Route path="/activity/:id" element={<Activity />} />
          <Route
            path="/new"
            element={
              <ProtectedRoute>
                <CreatePost />
              </ProtectedRoute>
            }
          />
          <Route path="/explore" element={<SearchPage />} />
          <Route path="/all" element={<AllActivity />} />
          {/* <Route path="/user/:id" element={<UserPage />} /> */}
        </Routes>
      </BrowserRouter>
    )
  );
}

export default App;
