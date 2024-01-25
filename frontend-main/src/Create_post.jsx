import React, { useState } from "react";
import { useUser } from "./AuthProvider";
import { useNavigate } from "react-router-dom";



const Create_post = ({ setPosts }) => {
  const [name, setName] = useState('');
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [category, setCategory] = useState('');
  const navigate = useNavigate();
  const { getUserData, logout } = useUser();
  const user = getUserData();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (user.length === 0){
      console.log('go register');
    } else {

      const formData = {
        name,
        title,
        text,
        category,
      };

      try {
        var postData;

        const some = new FormData();
        if (image) {
          some.append('image', image);
          // Upload image
          const imageResponse = await fetch('/api/upload_image', {
            method: 'POST',
            body: some,
          });
          const imageData = await imageResponse.json();
          formData.image = imageData.filename;
        } else {
          formData.image = "no_image.png";
        }

        // Create post
        const postResponse = await fetch('/api/create_post', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        postData = await postResponse.json();
        console.log('Received data:', postData);

        setPosts((prevPosts) => [postData, ...prevPosts]);
      } catch (error) {
        console.error('Error:', error);
      }
    }};

  return (
    <>
    <div className="comments-container">
      <div className="comment-form-container">
        <h2 className="comment-form-title"><i>Створити пост</i></h2>
        <form className="comment-form" onSubmit={handleSubmit}>
          <label className="form-label">
            Заголовок:
            <input maxLength={25} type="text" value={name} onChange={(e) => setName(e.target.value)} />
          </label>

          <label className="form-label">
            Картинка:
            <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} />
          </label>

          <label className="form-label">
            Назва:
            <input maxLength={100} type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
          </label>

          <label className="form-label">
            Текст:
            <textarea maxLength={1000} value={text} onChange={(e) => setText(e.target.value)} />
          </label>

          <label className="form-label" style={{ display: 'flex', alignItems: 'center' }}>
            Категорія:
            <input maxLength={50} type="text" value={category} onChange={(e) => setCategory(e.target.value)} style={{ flex: 1, marginLeft: '8px' }} />
          </label>

          <button   className="form-button" type="submit" >
            Створити пост
          </button>
        </form>
      </div>
    </div>
    </>
  );
};

export default Create_post;
