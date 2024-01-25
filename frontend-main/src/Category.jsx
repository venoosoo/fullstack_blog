import React, { useState } from 'react';
import Header from './Header';
import PostPreview from './Post_preview';


const Category = () => {
  const [inputCategory, setInputCategory] = useState('');
  const [postData, setPostData] = useState('');

  const handleInputChange = (e) => {
    setInputCategory(e.target.value);
  };

  const fetchData = () => {
    const category = inputCategory.trim();

    // Ensure a category is entered before making the request
    if (!category) {
      console.error('Please enter a category before fetching data.');
      return;
    }

    // Make a POST request to the server
    fetch('/api/category', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ category }),
    })
      .then((res) => res.json())
      .then((data) => {
        setPostData(data);
        console.log('Received data:', postData);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  return (
    <div>
      <Header />
      <div style={{ display: 'flex', justifyContent: 'center' }} className="category-container">
        <label className="category-label">
          Введіть категорію:
          <input
            type="text"
            value={inputCategory}
            onChange={handleInputChange}
          />
        </label>
      </div>
      <div className="button-container">
        <button className="category-button" onClick={fetchData}>
          Найти
        </button>
      </div>

      {postData &&
        (Object.keys(postData).length !== 0 ? (
          Object.keys(postData).map((key, i) => (
            postData.length > 0 ? (
              <PostPreview key={i} data={postData[key]} />
            ) : (
              <div key={i}>
                <h1>Немає постів</h1>
              </div>
            )
          ))
        ) : (
          <div>
            <h1>Немає постів</h1>
          </div>
        ))}
    </div>
  );
};

export default Category;
