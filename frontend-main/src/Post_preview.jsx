import React from "react";
import { Link } from 'react-router-dom';


const Post_preview = ({ data }) => {
    return (
        <div className="post-preview">
            <img src={data.image} alt="post_image" className="post-preview-image"></img>
            <Link className="pre-post-link" target="_self" to={`/post/${data.link}`}>{data.name}</Link>
        </div>
    );
}

export default Post_preview;