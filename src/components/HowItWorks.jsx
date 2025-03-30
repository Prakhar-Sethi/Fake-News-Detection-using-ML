import { useNavigate } from 'react-router-dom'

function HowItWorks() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-4xl font-bold text-premium-gray">
            How Does This Work?
          </h1>
          <button 
            onClick={() => navigate('/')}
            className="premium-button"
          >
            Back to Predictor
          </button>
        </div>

        <div className="space-y-12">
          {/* Overview Section */}
          <div className="premium-card p-8 transform hover:scale-[1.02] transition-all duration-500">
            <h2 className="text-3xl font-bold text-amber-400 mb-6">Overview</h2>
            <p className="text-gray-300 text-lg leading-relaxed">
              This project uses Machine Learning to detect fake news articles. It analyzes the content
              of news articles and predicts whether they are real or fake using a Logistic Regression model.
            </p>
          </div>

          {/* Process Section */}
          <div className="premium-card p-6 transform hover:scale-[1.02] transition-all duration-500">
            <h2 className="text-2xl font-bold text-amber-400 mb-4">The Process</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-premium-green flex items-center justify-center text-black font-bold text-sm flex-shrink-0">
                  1
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">Data Collection</h3>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    Dataset of 20,800 news articles, labeled as real or fake.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-premium-green flex items-center justify-center text-black font-bold text-sm flex-shrink-0">
                  2
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">Text Preprocessing</h3>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    Remove special characters, convert to lowercase, remove stopwords, apply stemming
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-premium-green flex items-center justify-center text-black font-bold text-sm flex-shrink-0">
                  3
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">Feature Extraction</h3>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    Convert text to numerical features using TF-IDF
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-premium-green flex items-center justify-center text-black font-bold text-sm flex-shrink-0">
                  4
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">Model Training</h3>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    Train model to identify patterns distinguishing real from fake news
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Dataset Info Section */}
          <div className="premium-card p-8 transform hover:scale-[1.02] transition-all duration-500">
            <h2 className="text-3xl font-bold text-amber-400 mb-6">About the Dataset</h2>
            <div className="bg-black/50 p-8 rounded-xl backdrop-blur-sm border border-premium-gray/20">
              <p className="text-premium-gray mb-4">
                The model is trained on a comprehensive dataset of 20,800 news articles, carefully curated to include both real and fake news. The dataset includes:
              </p>
              <ul className="list-disc list-inside text-premium-gray space-y-2">
                <li>News articles from various sources and domains</li>
                <li>Articles from different time periods</li>
                <li>Both political and non-political content</li>
                <li>Articles with varying lengths and complexity</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HowItWorks 