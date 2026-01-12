import { Link, useNavigate } from 'react-router-dom'
import { LogOut, User, Home } from 'lucide-react'
import useAuthStore from '../../stores/authStore'

function Navbar() {
    const { isAuthenticated, user, logout } = useAuthStore()
    const navigate = useNavigate()

    const handleLogout = () => {
        logout()
        navigate('/login')
    }

    return (
        <nav className="bg-white shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <Link to="/dashboard" className="flex items-center">
              <span className="text-2xl font-bold text-primary-600">
                Spring Boot Interview Prep
              </span>
                        </Link>
                    </div>

                    {isAuthenticated && (
                        <div className="flex items-center space-x-4">
                            <Link to="/dashboard" className="flex items-center space-x-2 text-gray-700 hover:text-primary-600">
                                <Home size={20} />
                                <span>Dashboard</span>
                            </Link>

                            <div className="flex items-center space-x-2 text-gray-700">
                                <User size={20} />
                                <span>{user?.username}</span>
                                <span className="bg-primary-100 text-primary-800 text-xs px-2 py-1 rounded">
                  Level {user?.currentLevel} • {user?.totalXp} XP
                </span>
                            </div>

                            <button
                                onClick={handleLogout}
                                className="flex items-center space-x-2 text-red-600 hover:text-red-800"
                            >
                                <LogOut size={20} />
                                <span>Logout</span>
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    )
}

export default Navbar