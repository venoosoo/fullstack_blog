from flask import Flask, request, jsonify, send_from_directory
from db_scripts import *
import time
from werkzeug.utils import secure_filename
import re
import json
from urllib.request import urlopen
from datetime import datetime
import secrets

static_folder = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'static')

app = Flask(__name__)

@app.route('/api/category', methods=['GET', 'POST'])
def FindCategory():
    category = request.json
    category_id = CategoryToID(category)
    result = getPostWithCategory(category_id)

    if result is None:
        # Handle the case when getPostWithCategory returns None
        return jsonify({'error': 'No data found for the given category'})

    for row in result:
        for a in row:
            print(a)

    post_data = []
    for i in range(len(result)):
        data = {
            'image': '/api/image/' + str(result[i]['image']),
            'name': result[i]['name'],
            'link': result[i]['post_id'],
        }
        post_data.append(data)
    
    return jsonify(post_data)



@app.route('/api/get_post', methods=['GET', 'POST'])
def get_post():
    post_id = request.json 
    
    post_data = getPostWIthId(post_id['post_id'])

    post = {
        'name': post_data['name'],
        'image': '/api/image/' + str(post_data['image']),
        'text': post_data['text'],
        'datetime': post_data['datetime'],
        'short_text': post_data['text_short']
    }


    return jsonify(post)



@app.route('/api/posts', methods=['GET'])
def get_posts():
    posts = getAllPosts()

    if posts is None:
        return jsonify({'error': 'No posts found'})

    # Convert rows to dictionaries
    post_data = []
    for post in posts:
        data = {
            'image': '/api/image/' + str(post['image']),
            'name': post['name'],
            'link': post['post_id'],
        }
        
        post_data.append(data)
    post_data = post_data[::-1]
    return jsonify(post_data)


@app.route('/api/create_comment', methods=['GET', 'POST'])
def create_comment():
    comment_data = request.json
    url = 'http://ipinfo.io/json'
    response = urlopen(url)
    data = json.load(response)
    comment_data['country'] = data['country']
    comment_data['comment_text'] = comment_data['text']
    comment_data['text'] = ''
    current_datetime = datetime.now()
    comment_data['created_at'] = current_datetime.strftime("%Y-%m-%d %H:%M:%S")

    comment_data['comment_id'] = postComment(comment_data)

    return comment_data


@app.route('/api/get_comments', methods=['GET', 'POST'])
def get_comments():
    post_id2 = request.json
    comments = getComment(post_id2)
    if comments:
        comments_list = [dict(row) for row in comments]
        return jsonify(comments_list)
    else:
        return jsonify([])

@app.route('/api/image/<image_filename>', methods=['GET'])
def get_image(image_filename):
    try:
        return send_from_directory(static_folder, image_filename)
    except Exception as e:
        return {'error': f'Error getting file: {str(e)}'}, 500

@app.route('/api/create_post', methods=['POST', 'GET'])
def handle_create_post():
    post_data = request.json 
    post_id = create_post(post_data)
    post_data['image'] = '/api/image/' + str(post_data['image'])
    post_data['link'] = post_id
    return post_data

@app.route('/api/upload_image', methods=['POST', "GET"])
def hande_upload():
    try:
        # Check if the 'image' key is in the files of the request

        file = request.files['image']


        # Process the file (save it, etc.)
        # For example, save the file with a unique name in the 'uploads' folder
        filename = f"image_{int(time.time())}.{file.mimetype.split('/')[1]}"
        file.save(f"static/{filename}")

        # Save the file

        # Wait until the file is fully saved
        
        return {'message': 'File uploaded successfully', 'filename': filename}

    except Exception as e:
        return {'error': f'Error uploading file: {str(e)}'}, 500


@app.route('/api/login', methods=['POST', 'GET'])
def login():
    login_data = request.json
    user_info = login_user(login_data)
    user_data = {
        'user_id': user_info['user_id'],
        'name': user_info['name'],
        'image': user_info['image'],
        'login': user_info['login'],
        'password': user_info['password'],
        'token': user_info['token'],
    }
    print(user_data)
    return jsonify(user_data)
    

@app.route('/api/register', methods=['POST', 'GET'])
def register():
    register_data = request.json
    arr = register_user(register_data)
    if arr != None:
        register_data['user_id'] = arr[1]
        register_data['token'] = arr[0]
    if register_data['user_id'] == None:
        return {'error': 'user_exist'}
    return register_data

@app.route('/api/get_user_by_token', methods=['POST', 'GET'])
def get_user_by_token():
    token = request.json.get('token')
    data = getUserByToken(token)
    return jsonify(data)

app.config['SECRET_KEY'] = 'YOUWILLNOTFORGETTHISDEVILPOWER'

if __name__ == '__main__':
    app.run(debug=True)