import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import Dashboard from './pages/Dashboard'
import ExercisePage from './pages/ExercisePage'
import ProtectedRoute from './components/auth/ProtectedRoute'
import useAuthStore from './stores/authStore'

function App() {
    const isAuthenticated = useAuthStore(state => state.isAuthenticated)

    return (
        <Router>
            <div className="min-h-screen bg-gray-50">
                <Navbar />
                <Routes>
                    <Route path="/login" element={
                        isAuthenticated ? <Navigate to="/dashboard" /> : <LoginPage />
                    } />
                    <Route path="/register" element={
                        isAuthenticated ? <Navigate to="/dashboard" /> : <RegisterPage />
                    } />
                    <Route path="/dashboard" element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    } />
                    <Route path="/exercises/:id" element={
                        <ProtectedRoute>
                            <ExercisePage />
                        </ProtectedRoute>
                    } />
                    <Route path="/" element={<Navigate to="/dashboard" />} />
                </Routes>
            </div>
        </Router>
    )
}

export default App
