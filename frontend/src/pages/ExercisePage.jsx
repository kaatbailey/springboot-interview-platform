import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { exerciseAPI } from '../services/api'
import CodeEditor from '../components/exercises/CodeEditor'
import Button from '../components/common/Button'
import LoadingSpinner from '../components/common/LoadingSpinner'
import { ArrowLeft, Play, CheckCircle, XCircle } from 'lucide-react'

function ExercisePage() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [exercise, setExercise] = useState(null)
    const [code, setCode] = useState('')
    const [loading, setLoading] = useState(true)
    const [submitting, setSubmitting] = useState(false)
    const [testResult, setTestResult] = useState(null)

    useEffect(() => {
        loadExercise()
    }, [id])

    const loadExercise = async () => {
        try {
            const response = await exerciseAPI.getById(id)
            setExercise(response.data)
            setCode(response.data.starterCode || '')
        } catch (error) {
            console.error('Failed to load exercise:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleSubmit = async () => {
        setSubmitting(true)
        setTestResult(null)

        try {
            const response = await exerciseAPI.submit({
                exerciseId: parseInt(id),
                code: code
            })
            setTestResult(response.data)
        } catch (error) {
            console.error('Failed to submit code:', error)
            setTestResult({
                success: false,
                message: 'Submission failed. Please try again.',
                testResults: ['❌ An error occurred']
            })
        } finally {
            setSubmitting(false)
        }
    }

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <LoadingSpinner size="lg" />
            </div>
        )
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <button
                onClick={() => navigate('/dashboard')}
                className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
            >
                <ArrowLeft size={20} className="mr-2" />
                Back to Dashboard
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left Side - Theory & Description */}
                <div>
                    <div className="bg-white rounded-lg shadow p-6 mb-6">
                        <h1 className="text-2xl font-bold text-gray-900 mb-4">
                            {exercise.title}
                        </h1>

                        <div className="flex items-center space-x-4 mb-6">
              <span className={`px-3 py-1 rounded text-sm font-medium ${
                  exercise.difficulty === 'EASY' ? 'bg-green-100 text-green-800' :
                      exercise.difficulty === 'MEDIUM' ? 'bg-yellow-100 text-yellow-800' :
                          exercise.difficulty === 'HARD' ? 'bg-orange-100 text-orange-800' :
                              'bg-red-100 text-red-800'
              }`}>
                {exercise.difficulty}
              </span>
                            <span className="text-gray-600">
                {exercise.xpPoints} XP
              </span>
                        </div>

                        <div className="mb-6">
                            <h2 className="text-lg font-semibold mb-2">Theory</h2>
                            <div className="text-gray-700 whitespace-pre-line bg-gray-50 p-4 rounded">
                                {exercise.theoryContent}
                            </div>
                        </div>

                        <div>
                            <h2 className="text-lg font-semibold mb-2">Task</h2>
                            <p className="text-gray-700">
                                {exercise.description}
                            </p>
                        </div>
                    </div>

                    {/* Test Results */}
                    {testResult && (
                        <div className={`rounded-lg shadow p-6 ${
                            testResult.success ? 'bg-green-50 border-2 border-green-200' : 'bg-red-50 border-2 border-red-200'
                        }`}>
                            <div className="flex items-center mb-4">
                                {testResult.success ? (
                                    <CheckCircle className="text-green-600 mr-2" size={24} />
                                ) : (
                                    <XCircle className="text-red-600 mr-2" size={24} />
                                )}
                                <h3 className="text-lg font-semibold">
                                    {testResult.message}
                                </h3>
                            </div>

                            <div className="space-y-2 mb-4">
                                {testResult.testResults?.map((result, index) => (
                                    <p key={index} className="text-sm">{result}</p>
                                ))}
                            </div>

                            {testResult.success && (
                                <div className="bg-white rounded p-3">
                                    <p className="font-semibold text-green-700">
                                        🎉 +{testResult.xpEarned} XP earned!
                                    </p>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Right Side - Code Editor */}
                <div>
                    <div className="bg-white rounded-lg shadow p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-semibold">Code Editor</h2>
                            <Button
                                onClick={handleSubmit}
                                disabled={submitting}
                                className="flex items-center space-x-2"
                            >
                                <Play size={16} />
                                <span>{submitting ? 'Submitting...' : 'Submit Code'}</span>
                            </Button>
                        </div>

                        <CodeEditor
                            value={code}
                            onChange={(value) => setCode(value || '')}
                            language="java"
                        />

                        <div className="mt-4 text-sm text-gray-600">
                            <p>Write your solution above and click "Submit Code" to test it.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ExercisePage