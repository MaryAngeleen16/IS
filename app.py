from flask import Flask, request, jsonify
from instagrapi import Client
from flask_cors import CORS  # Import CORS

app = Flask(__name__)
CORS(app)  # Allow all origins by default

# Initialize Instagrapi client
client = Client()
client.login('ri.chan.16', 'tomodachi30')  # Replace with your Instagram credentials

@app.route('/search', methods=['GET'])
def search():
    keyword = request.args.get('keyword')
    if not keyword:
        return jsonify({"results": []})

    # Fetch users associated with the keyword using instagrapi
    users = client.search_users(keyword)
    results = []
    
    for user in users:
        results.append({
            "username": user.username
            # Removed profile_picture field
        })

    return jsonify({"results": results})

if __name__ == '__main__':
    app.run(debug=True, port=5000)
