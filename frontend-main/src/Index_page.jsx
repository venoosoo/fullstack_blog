import React, { useState, useEffect } from "react"; // Import useState and useEffect
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './Header';
import ImageSlider from './ImageSlider';
import { SliderData } from './SliderData';
import Post_grid from './Post_grid';

import Create_post from "./Create_post";

const Index = () => {
    // Define initial state for posts
    const [posts, setPosts] = useState([]);

    


    useEffect(() => {
        // Fetch data when the component mounts
        fetch('/api/posts', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            // You can include additional options here if needed
        })
            .then(response => response.json())
            .then(data => {
                setPosts(data);
                console.log('Received data:', data);
            })
            .catch(error => console.error('Error fetching posts:', error));
    }, []); // Empty dependency array ensures the effect runs once on mount

    
    return (
        <div>
            <Header />
            <h1 className='welcome-title'>Вітаю в блозі venoosoo</h1>
            <ImageSlider slides={SliderData} />
            <Post_grid posts_array={posts} />
            <Create_post setPosts={setPosts} />
        </div>
    );
}

export default Index;
