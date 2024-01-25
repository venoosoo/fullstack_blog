import sqlite3
from settings import *
from flask import Flask, request, jsonify
from datetime import datetime
import secrets


app = Flask(__name__)

db_name = 'logika.db'


def execute_query(query, *params):
    with sqlite3.connect(PATH + db_name, check_same_thread=False) as conn:
        conn.row_factory = sqlite3.Row
        cursor = conn.cursor()
        cursor.execute(query, params)
        return cursor.fetchall()


def execute_query_single(query, *params):
    with sqlite3.connect(PATH + db_name, check_same_thread=False) as conn:
        conn.row_factory = sqlite3.Row
        cursor = conn.cursor()
        cursor.execute(query, params)
        return cursor.fetchone()


def execute_query_commit(query, *params):
    connection = sqlite3.connect('logika.db')
    cursor = connection.cursor()
    cursor.execute(query, params)
    connection.commit()
    last_row_id = cursor.lastrowid
    connection.close()
    return last_row_id




def getUser(id_user):
    query = 'SELECT * FROM user WHERE user_id = ?'
    return execute_query_single(query, id_user)


def getPost(post_id):
    query = 'SELECT * FROM post WHERE post_id = ?'
    return execute_query_single(query, post_id)


def getPostAmount():
    query = 'SELECT post_id FROM post ORDER BY datetime DESC LIMIT 1'
    return execute_query_single(query)


def getPostWithCategory(category_id):
    query = 'SELECT * FROM post WHERE category_id = ?'
    return execute_query(query, category_id['category_id'])


def getPostWIthId(post_id):
    query = 'SELECT * FROM post WHERE post_id = ?'
    return execute_query_single(query, post_id)


def getAllPosts():
    query = 'SELECT * FROM post'
    return execute_query(query)


def CategoryToID(category_name):
    query = 'SELECT category_id FROM category WHERE category_name = ?'
    return execute_query_single(query, category_name['category'])


def getImageById(image_id):
    query = 'SELECT image FROM post WHERE category_id = ?'
    return execute_query_single(query, image_id)


def postComment(comment_data):
    with sqlite3.connect(PATH + db_name, check_same_thread=False) as conn:
        conn.row_factory = sqlite3.Row
        cursor = conn.cursor()

        cursor.execute(
            'INSERT INTO comments (post_id, comment_text, country) VALUES (?,?,?)',
            (comment_data['post_id'], comment_data['comment_text'], comment_data['country'])
        )

        conn.commit()
        comment_id = cursor.lastrowid

    return comment_id


def getComment(post_id):
    query = 'SELECT * FROM comments WHERE post_id = ?'
    result = execute_query(query, post_id)
    result = result[::-1]
    return result if result else None


def create_post(info):
    category_query = 'SELECT category_id FROM category WHERE category_name = ?'
    category_id = execute_query_single(category_query, info['category'])
    
    if not category_id:
        category_insert_query = 'INSERT INTO category (category_name) VALUES (?)'
        category_id = execute_query_commit(category_insert_query, info['category'])

    current_datetime = datetime.now()
    formatted_datetime = current_datetime.strftime("%Y-%m-%d %H:%M:%S")

    post_query = 'INSERT INTO post (category_id, text, datetime, image, text_short, name) VALUES (?,?,?,?,?,?)'
    print()
    id = execute_query_commit(post_query, category_id['category_id'], info['text'], formatted_datetime, info['image'], info['title'], info['name'])
    return id
    


def register_user(user_data):
    query1 = "SELECT * FROM user WHERE login = ?"
    if execute_query_single(query1, user_data['username']) != None:
        return None
    else:
        token = secrets.token_hex(16)
        query2 = 'INSERT INTO user (name, image, login, password, token) VALUES (?,?,?,?,?)'
        some_id = execute_query_commit(query2, user_data['username'].split('@')[0], 'no_image.png',user_data['username'],user_data['password'],token)
        return [token, some_id]


def getUserByToken(token):
    query = 'SELECT * FROM user WHERE token = ?'
    data = execute_query_single(query, token)
    if data != None:
        user_data = {
            'user_id': data['user_id'],
            'name': data['name'],
            'image': data['image'],
            'login': data['login'],
            'password': data['password'],
            'token': token,
        }
        return user_data
    return {"error": "error 500"}


def login_user(login_data):
    query2 = "SELECT * FROM user WHERE login = ? and password = ?"
    return execute_query_single(query2, login_data['username'], login_data['password'])


if __name__ == "__main__":
    pass  # You may not need to open and close the connection here as it's handled within the functions
