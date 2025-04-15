from flask import Flask, request, jsonify
import requests
import google.generativeai as genai
from dotenv import load_dotenv
import os
from flask_cors import CORS
import json
import re

load_dotenv()
app = Flask(__name__)
CORS(app)

# Configure Gemini
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY") or "AIzaSyAul6uqEPAHYvHxK0i5a-Oot9w99nDFF60"
genai.configure(api_key=GEMINI_API_KEY)
model = genai.GenerativeModel('gemini-1.5-flash')

def fetch_wiki_images(city):
    """Fetch Wikipedia image URLs for a city."""
    params = {
        "action": "query",
        "titles": city,
        "prop": "images",
        "format": "json"
    }
    response = requests.get("https://en.wikipedia.org/w/api.php", params=params).json()
    page = list(response["query"]["pages"].values())[0]
    images = page.get("images", [])
    
    image_urls = []
    for img in images[:5]:
        params = {
            "action": "query",
            "titles": img["title"],
            "prop": "imageinfo",
            "iiprop": "url",
            "format": "json"
        }
        img_data = requests.get("https://en.wikipedia.org/w/api.php", params=params).json()
        img_page = list(img_data["query"]["pages"].values())[0]
        if "imageinfo" in img_page:
            image_urls.append(img_page["imageinfo"][0]["url"])
    
    return image_urls

def clean_gemini_response(text):
    """Remove markdown code blocks and leading/trailing characters from response."""
    # Remove ```json and ``` markers
    text = re.sub(r'```json|```', '', text)
    # Remove leading/trailing whitespace and quotes
    return text.strip().strip('"').strip("'")

def generate_strict_itinerary(city, attempt=0):
    """Generate itinerary with strict JSON validation and retries."""
    prompts = [
        # Initial strict prompt
        f"""Generate a 3-day travel itinerary for {city} as VALID JSON ONLY. Format:
        {{
          "day1": {{"morning": "...", "afternoon": "...", "evening": "..."}},
          "day2": {{"morning": "...", "afternoon": "...", "evening": "..."}},
          "day3": {{"morning": "...", "afternoon": "...", "evening": "..."}}
        }}
        Include ONLY the JSON object with no additional text or markdown.""",
        
        # More explicit prompt if first fails
        f"""Provide ONLY a JSON object for a 3-day {city} itinerary. Example:
        {{
          "day1": {{"morning": "Activity", "afternoon": "Activity", "evening": "Activity"}},
          "day2": {{"morning": "Activity", "afternoon": "Activity", "evening": "Activity"}},
          "day3": {{"morning": "Activity", "afternoon": "Activity", "evening": "Activity"}}
        }}
        DO NOT include any text outside the JSON object.""",
        
        # Final strict prompt
        f"""{{"day1": {{"morning": "...", "afternoon": "...", "evening": "..."}}}}
        Complete this exact JSON structure for {city} with activities. 
        Return NOTHING else - no comments, no markdown, ONLY valid JSON."""
    ]
    
    prompt = prompts[min(attempt, len(prompts)-1)]
    
    try:
        response = model.generate_content(prompt)
        cleaned_text = clean_gemini_response(response.text)
        
        # Validate JSON
        itinerary = json.loads(cleaned_text)
        if not all(f"day{i}" in itinerary for i in range(1,4)):
            raise ValueError("Missing days in itinerary")
            
        return itinerary
    
    except (json.JSONDecodeError, ValueError) as e:
        if attempt < 4:  # Max 5 attempts (0-4)
            return generate_strict_itinerary(city, attempt+1)
        raise ValueError(f"Failed to get valid JSON after 5 attempts. Last error: {str(e)}")

@app.route('/api/travel', methods=['GET'])
def travel_data():
    city = request.args.get('city', 'Mumbai')
    try:
        images = fetch_wiki_images(city)
        itinerary = generate_strict_itinerary(city)
        
        return jsonify({
            "city": city,
            "images": images,
            "itinerary": itinerary
        })
        
    except Exception as e:
        return jsonify({
            "error": str(e),
            "message": "Failed to generate itinerary"
        }), 500

if __name__ == '__main__':
    app.run(debug=True)