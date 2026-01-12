import { useNavigate } from 'react-router-dom'
import { Trophy, CheckCircle, Circle } from 'lucide-react'

function ExerciseCard({ exercise }) {
    const navigate = useNavigate()

    const difficultyColors = {
        EASY: 'bg-green-100 text-green-800',
        MEDIUM: 'bg-yellow-100 text-yellow-800',
        HARD: 'bg-orange-100 text-orange-800',
        VERY_HARD: 'bg-red-100 text-red-800'
    }

    const isCompleted = exercise.userProgress === 'COMPLETED'

    return (
        <div
            onClick={() => navigate(`/exercises/${exercise.id}`)}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer border-2 border-gray-100"
        >
            <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                        {exercise.title}
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-2">
                        {exercise.description}
                    </p>
                </div>
                {isCompleted && (
                    <CheckCircle className="text-green-500 flex-shrink-0 ml-2" size={24} />
                )}
            </div>

            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
          <span className={`text-xs px-2 py-1 rounded ${difficultyColors[exercise.difficulty]}`}>
            {exercise.difficulty}
          </span>
                    <span className="text-sm text-gray-500 flex items-center">
            <Trophy size={14} className="mr-1" />
                        {exercise.xpPoints} XP
          </span>
                </div>

                {exercise.attemptsCount > 0 && (
                    <span className="text-xs text-gray-500">
            {exercise.attemptsCount} attempts
          </span>
                )}
            </div>
        </div>
    )
}

export default ExerciseCard