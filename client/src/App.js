import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import SearchPage from "./pages/SearchPage/SearchPage"
import Login from "./pages/Login/Login"
import Register from "./pages/Register/Register"
import Post from "./pages/post/Post";
import CreatePost from "./pages/createPost/CreatePost";
// import EditPost from "./pages/editPost/EditPost";
import { useContext } from "react"
import { AuthContext } from "./context/authContext"
// import { Navigate } from "react-router-dom"
import Activity from "./pages/Activity/Activity";
import AllActivity from "./pages/allActivity/AllActivity";

function App() {
  const { user } = useContext(AuthContext)

  const ProtectedRoute = ({ children }) => {
    if (!user) {
      return <Login title="Login to Create Post" link="/new" />
    }
    else {
      return children;
    }
  }

  return (
    <BrowserRouter>
      <Routes>


        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login title="Welcome Back!" link="/" />} />
        <Route path="/register" element={<Register />} />
        <Route path="/:id" element={<Post />} />
        {/* <Route path="/:id/edit" element={<EditPost />} /> */}
        <Route path="/activity/:id" element={<Activity />} />
        <Route path="/new" element={
          <ProtectedRoute>
            <CreatePost />
          </ProtectedRoute>
        }
        />
        <Route path="/explore" element={<SearchPage />} />
        <Route path="/all" element={<AllActivity />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
