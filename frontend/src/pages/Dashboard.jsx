import { useEffect, useState } from 'react'
import { exerciseAPI } from '../services/api'
import ExerciseCard from '../components/exercises/ExerciseCard'
import LoadingSpinner from '../components/common/LoadingSpinner'
import useAuthStore from '../stores/authStore'
import { Trophy, Target, CheckCircle } from 'lucide-react'

function Dashboard() {
    const [exercises, setExercises] = useState([])
    const [loading, setLoading] = useState(true)
    const user = useAuthStore(state => state.user)

    useEffect(() => {
        loadExercises()
    }, [])

    const loadExercises = async () => {
        try {
            const response = await exerciseAPI.getAll()
            setExercises(response.data)
        } catch (error) {
            console.error('Failed to load exercises:', error)
        } finally {
            setLoading(false)
        }
    }

    const completedCount = exercises.filter(ex => ex.userProgress === 'COMPLETED').length

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">
                    Welcome back, {user?.username}!
                </h1>
                <p className="text-gray-600 mt-2">
                    Continue your Spring Boot interview preparation journey
                </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center">
                        <div className="p-3 rounded-full bg-primary-100">
                            <Trophy className="text-primary-600" size={24} />
                        </div>
                        <div className="ml-4">
                            <p className="text-sm text-gray-600">Total XP</p>
                            <p className="text-2xl font-bold">{user?.totalXp || 0}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center">
                        <div className="p-3 rounded-full bg-green-100">
                            <CheckCircle className="text-green-600" size={24} />
                        </div>
                        <div className="ml-4">
                            <p className="text-sm text-gray-600">Completed</p>
                            <p className="text-2xl font-bold">{completedCount} / {exercises.length}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center">
                        <div className="p-3 rounded-full bg-yellow-100">
                            <Target className="text-yellow-600" size={24} />
                        </div>
                        <div className="ml-4">
                            <p className="text-sm text-gray-600">Current Level</p>
                            <p className="text-2xl font-bold">{user?.currentLevel || 1}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Exercises List */}
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    Available Exercises
                </h2>
            </div>

            {loading ? (
                <LoadingSpinner size="lg" />
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {exercises.map(exercise => (
                        <ExerciseCard key={exercise.id} exercise={exercise} />
                    ))}
                </div>
            )}
        </div>
    )
}

export default Dashboard