import React from "react";
import Post_preview from "./Post_preview";
import { useState, useEffect } from 'react';

const Post_grid = ({ posts_array }) => {
    posts_array = posts_array.reverse()
    console.log(posts_array)
    return (
        <>
            <h1 className="post-title">Найновіші пости</h1>
            <div className="posts">
                {posts_array.map((post, index) => (
                    <Post_preview key={index} data={post} />
                ))}
            </div>
        </>
    );
}

export default Post_grid;
