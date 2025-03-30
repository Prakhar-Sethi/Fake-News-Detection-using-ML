import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom'
import HowItWorks from './components/HowItWorks'
import './App.css'

function MainPage() {
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [isBackendReady, setIsBackendReady] = useState(false)
  const [showResult, setShowResult] = useState(false)
  const [showActual, setShowActual] = useState(false)
  const [showCorrect, setShowCorrect] = useState(false)
  const [showEntriesText, setShowEntriesText] = useState(false)
  const [hasClicked, setHasClicked] = useState(false)
  const navigate = useNavigate()

  // Check if backend is ready
  useEffect(() => {
    const checkBackend = async () => {
      try {
        const response = await fetch('http://localhost:5000/health')
        if (response.ok) {
          setIsBackendReady(true)
        } else {
          setError('Backend server is not responding properly')
        }
      } catch (err) {
        setError('Cannot connect to backend server. Make sure it is running.')
        console.error('Backend connection error:', err)
      }
    }
    checkBackend()
  }, [])

  const handlePredict = async () => {
    if (!isBackendReady) {
      setError('Backend server is not ready. Please try again later.')
      return
    }

    setLoading(true)
    setError(null)
    setShowResult(false)
    setShowActual(false)
    setShowCorrect(false)
    setHasClicked(true)
    
    try {
      const response = await fetch('http://localhost:5000/predict')
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = await response.json()
      if (data.error) {
        throw new Error(data.error)
      }
      setResult(data)
      setShowResult(true)
      setTimeout(() => {
        setTimeout(() => {
          setShowActual(true)
          setTimeout(() => {
            setShowCorrect(true)
            setShowEntriesText(true)
          }, 1500)
        }, 2500)
      }, 4000)
    } catch (err) {
      setError(`Failed to fetch prediction: ${err.message}`)
      console.error('Prediction error:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4 relative">
      <button 
        onClick={() => navigate('/how-it-works')}
        className="fixed top-4 right-4 px-6 py-2 bg-transparent border-2 border-premium-gray 
                   text-premium-gray font-semibold rounded-lg transform transition-all duration-500 
                   hover:border-amber-400 hover:text-amber-400 hover:scale-105 z-50 animate-fade-in-right"
      >
        How does this work?
      </button>

      <h1 className={`premium-title mb-6 ${showEntriesText ? 'move-up' : ''}`}>
        Fake News Predictor
      </h1>

      {showEntriesText && (
        <div className="text-premium-gray text-lg mb-8 entries-text">
          There are 20000 entries, keep clicking :D
        </div>
      )}

      <button 
        className={`premium-button ${!isBackendReady ? 'opacity-50 cursor-not-allowed' : ''}`}
        onClick={handlePredict}
        disabled={loading || !isBackendReady}
      >
        {loading ? 'Predicting...' : 'Predict a News'}
      </button>

      {!isBackendReady && (
        <div className="mt-4 text-premium-gray animate-fade-in-up animate-delay-2">
          Initializing backend...
        </div>
      )}

      {error && (
        <div className="mt-8 text-red-500 text-xl animate-fade-in-up animate-delay-2">
          {error}
        </div>
      )}

      {result && (
        <div className={`mt-8 max-w-2xl w-full premium-card 
                       ${showResult ? 'animate-fade-in-up animate-delay-1' : 'opacity-0'}`}>
          <h2 className="text-xl font-bold text-white mb-2">{result.title}</h2>
          <p className="text-sm text-premium-gray mb-2">By: {result.author}</p>
          <p className="text-sm text-gray-300 mb-6 line-clamp-4">{result.text}</p>
          
          <div className="flex flex-col gap-4">
            {showResult && (
              <div className={`text-2xl font-bold transform transition-all duration-500 opacity-0 ${
                result.prediction === 'Fake' ? 'text-red-500' : 'text-amber-400'
              } animate-reveal`}>
                The model predicts: {result.prediction}
              </div>
            )}
            
            {showResult && !showActual && (
              <div className={`flex items-center gap-3 text-premium-gray opacity-0 animate-reveal-delayed`}>
                <div className="w-6 h-6 border-t-2 border-premium-gray rounded-full animate-spin"></div>
                <span>Verifying from the dataset...</span>
              </div>
            )}

            {showActual && (
              <div className={`text-2xl font-bold transform transition-all duration-500 ${
                result.actual === 'Fake' ? 'text-red-500' : 'text-amber-400'
              } fade-in`}>
                Actual: {result.actual}
              </div>
            )}

            {showCorrect && (
              <div className={`text-3xl font-bold transform transition-all duration-500 ${
                result.is_correct ? 'text-green-500' : 'text-red-500'
              } fade-in`}>
                {result.is_correct ? 'Prediction Correct!' : 'Prediction Incorrect'}
              </div>
            )}
          </div>
        </div>
      )}

      <div className="fixed bottom-6 right-6 signature-container opacity-0">
        <div className="text-premium-gray text-lg font-light tracking-widest">
          A project by{' '}
          <span className="font-semibold bg-gradient-to-r from-premium-gray to-amber-400 bg-clip-text text-transparent">
            Prakhar Sethi
          </span>
        </div>
      </div>
    </div>
  )
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
      </Routes>
    </Router>
  )
}

export default App
