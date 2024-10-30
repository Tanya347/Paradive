import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import SearchPage from "./pages/SearchPage/SearchPage";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Post from "./pages/post/Post";
import CreatePost from "./pages/createPost/CreatePost";
import { useAuth } from "./context/authContext";
import UserPage from "./pages/userPage/UserPage";
import EditPost from "./pages/editPost/EditPost"
import { ToastContainer } from "react-toastify";

function App() {
  const { user } = useAuth();

  const ProtectedRoute = ({ children }) => {
    if (!user) {
      return <Login title="Login to Create Post" link="/new" />;
    } else {
      return children;
    }
  };

  return (
    <>
      <ToastContainer />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/login"
              element={<Login title="Welcome Back!" link="/" />}
              />
            <Route path="/register" element={<Register />} />
            <Route path="/:id" element={<Post />} />
            <Route path="/edit/:id" element={
              <ProtectedRoute>
                <EditPost />
              </ProtectedRoute>
            }/>
            <Route
              path="/new"
              element={
                <ProtectedRoute>
                  <CreatePost />
                </ProtectedRoute>
              }
              />
            <Route path="/explore" element={<SearchPage />} />
            <Route path="/user/:id" element={<UserPage />} />
          </Routes>
        </BrowserRouter>
      </>
    )
}

export default App;
