import React, { useState, useEffect } from 'react';
import Comment from './comment';
import { useNavigate } from "react-router-dom";
import { useUser } from './AuthProvider';

const Comments = () => {
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const navigate = useNavigate();
  const { getUserData, logout } = useUser();
  const user = getUserData();
  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };
  const postIdFromUrl = parseInt(window.location.pathname.split('/').pop(), 10);

  const { userLoggedIn } = useUser();
  const isLoggedIn = user.length !== 0
  useEffect(() => {
    // Fetch data when the component mounts
        // Fetch data when the component mounts
        fetch('/api/get_comments', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(postIdFromUrl),
        })
            .then(response => response.json())
            .then(data => {
                setComments(data)
                console.log('Received data:', data);
            })
            .catch(error => console.error('Error fetching posts:', error));
    }, []);


    


  const handleCommentSubmit = async (event) => {
    event.preventDefault();
    if (!isLoggedIn){
      navigate("/register");
      return;
    }
    console.log(isLoggedIn)
    if (comment.trim() !== '' && isLoggedIn) {
      try {
        const comment_data = {
          text: comment,
          post_id: postIdFromUrl,
        };

        const commentResponse = await fetch('/api/create_comment', {
          method: 'POST',
          body: JSON.stringify(comment_data),
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!commentResponse.ok) {
          throw new Error('Failed to submit comment');
        }

        const commentData = await commentResponse.json();
        console.log(commentData);

        setComments([commentData, ...comments]);
        setComment(''); 
      } catch (error) {
        console.error('Error submitting comment:', error);
      }
    }
  };

  return (
    <div className="comment-container">
      <h2 className="comment-heading">Коментарії</h2>
      <form className="comment-form2" onSubmit={handleCommentSubmit}>
        <input
          type="text"
          value={comment}
          onChange={handleCommentChange}
          placeholder="Введіть коментарій"
          className="comment-input"
        />
        <button type="submit" className="comment-button">
          Створити коментарій
        </button>
      </form>

      <div className="comment-list">
        {comments.map((comment, index) => (
            <Comment key={index} comment_data={comment} />  
        ))}
      </div>
    </div>
  );
};

export default Comments;
