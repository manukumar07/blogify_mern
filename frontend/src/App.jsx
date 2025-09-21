import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Suspense, lazy } from "react";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import LoadingSpinner from "./components/LoadingSpinner";
import { AuthProvider, useAuth } from "./context/AuthContext";
import CustomToaster from "./components/CustomToaster";
import AuthorDashboard from "./components/dashboard/AuthorDashboard";
import AuthorProfile from "./components/dashboard/AuthorProfile";
import CategoriesPage from "./pages/posts/CategoriesPage";
import BlogDetailPage from "./pages/posts/BlogDetailPage";

//  Lazy-loaded pages
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Pricing = lazy(() => import("./pages/Pricing"));
const Contact = lazy(() => import("./pages/Contact"));
const Login = lazy(() => import("./components/auth/Login"));
const Signup = lazy(() => import("./components/auth/Signup"));
const BlogEditor = lazy(() => import("./components/blog/BlogEditor"));
const NotFound = lazy(() => import("./pages/NotFound"));

//  Protected Route wrapper
const PrivateRoute = ({ children }) => {
  const { user, token, loading } = useAuth();

  if (loading) return <LoadingSpinner />;
  if (!user || !token) return <Navigate to="/login" replace />;
  return children;
};

const App = () => (
  <AuthProvider>
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-1">
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/categories" element={<CategoriesPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/blog/:id" element={<BlogDetailPage />} />

              {/* Protected Routes */}
              <Route
                path="/write"
                element={
                  <PrivateRoute>
                    <BlogEditor />
                  </PrivateRoute>
                }
              />
              <Route
                path="/dashboard"
                element={
                  <PrivateRoute>
                    <AuthorDashboard />
                  </PrivateRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <PrivateRoute>
                    <AuthorProfile />
                  </PrivateRoute>
                }
              />

              {/* 404 */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </div>
        <Footer />
      </div>

      {/* Global toaster notifications */}
      <CustomToaster />
    </BrowserRouter>
  </AuthProvider>
);

export default App;
