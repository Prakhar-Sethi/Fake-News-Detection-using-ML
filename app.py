from flask import Flask, jsonify
from flask_cors import CORS
import pandas as pd
import numpy as np
import re
from nltk.corpus import stopwords
from nltk.stem.porter import PorterStemmer
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
import nltk
import random
import logging

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = Flask(__name__)
CORS(app)

# Download required NLTK data
try:
    nltk.download('stopwords')
    logger.info("NLTK stopwords downloaded successfully")
except Exception as e:
    logger.error(f"Error downloading NLTK stopwords: {e}")

# Load and preprocess the dataset
def load_and_preprocess_data():
    try:
        # Read the dataset
        logger.info("Loading dataset...")
        dataset = pd.read_csv('train.csv', encoding='latin-1', on_bad_lines='skip')
        logger.info(f"Dataset loaded successfully. Shape: {dataset.shape}")
        
        dataset = dataset.fillna('')
        dataset['combined'] = dataset['author'] + ' ' + dataset['title']
        
        # Stemming function
        port_stem = PorterStemmer()
        def stem(content):
            stemmed_content = re.sub('[^a-zA-Z]',' ',content)
            stemmed_content = stemmed_content.lower()
            stemmed_content = stemmed_content.split()
            stemmed_content = [port_stem.stem(word) for word in stemmed_content if not word in stopwords.words('english')]
            stemmed_content = ' '.join(stemmed_content)
            return stemmed_content
        
        # Apply stemming
        logger.info("Applying stemming to the dataset...")
        dataset['combined'] = dataset['combined'].apply(stem)
        
        # Prepare features and labels
        X = dataset['combined'].values
        y = dataset['label'].values
        
        # Create and fit vectorizer
        logger.info("Training the model...")
        vectorizer = TfidfVectorizer()
        X = vectorizer.fit_transform(X)
        
        # Train the model
        model = LogisticRegression()
        model.fit(X, y)
        
        logger.info("Model training completed successfully")
        return model, vectorizer, dataset
    except Exception as e:
        logger.error(f"Error in load_and_preprocess_data: {e}")
        raise

try:
    # Load the model and data
    model, vectorizer, dataset = load_and_preprocess_data()
    logger.info("Model and data loaded successfully")
except Exception as e:
    logger.error(f"Failed to load model and data: {e}")
    raise

@app.route('/predict', methods=['GET'])
def predict():
    try:
        # Get a random news article
        random_idx = random.randint(0, len(dataset) - 1)
        news_article = dataset.iloc[random_idx]
        
        # Prepare the text for prediction
        text = news_article['combined']
        text_vectorized = vectorizer.transform([text])
        
        # Make prediction
        prediction = model.predict(text_vectorized)[0]
        
        # Get actual label
        actual_label = news_article['label']
        
        # Convert numpy types to Python native types
        prediction = int(prediction)
        actual_label = int(actual_label)
        
        # Calculate is_correct using Python native types
        is_correct = prediction == actual_label
        
        # Prepare response
        response = {
            'title': str(news_article['title']),
            'text': str(news_article['text']),
            'author': str(news_article['author']),
            'prediction': 'Fake' if prediction == 1 else 'Real',
            'actual': 'Fake' if actual_label == 1 else 'Real',
            'is_correct': is_correct
        }
        
        logger.info(f"Prediction made successfully: {response['prediction']}")
        return jsonify(response)
    except Exception as e:
        logger.error(f"Error in predict route: {e}")
        return jsonify({'error': str(e)}), 500

@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({'status': 'healthy'})

if __name__ == '__main__':
    logger.info("Starting Flask server...")
    app.run(host='0.0.0.0', port=5000, debug=True) 