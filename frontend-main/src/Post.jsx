import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from './Header';
import Comments from './Comments';


const Post = () => {
    

    const { postNumber } = useParams();

    const postNumberValue = parseInt(postNumber, 10);

    const [postData, setPostData] = useState({});

    useEffect(() => {
        // Fetch data when the component mounts
        fetch('/api/get_post', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ post_id: postNumberValue }),
        })
        .then((res) => res.json())
        .then((data) => {
            setPostData(data);
            // Set buttonClicked to true after fetching data
            console.log('Received data:', data);  // Use 'data' instead of 'postData'
        })
    }, []);

    return (
        <div>
            <Header />
            <div className='post'>
                <h1 className='post-name'>{postData.name}</h1>
                <img src={postData.image} alt='post_image'></img>
                <h2 className='post-short-text'>{postData.short_text}</h2>
                <p className='post-text'>{postData.text}</p>
                <h3 className='post-datetime'>створено в ({postData.datetime})</h3>
            </div>
            <Comments />
        </div>
    );
}

export default Post;

