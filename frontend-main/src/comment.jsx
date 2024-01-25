import React from "react";
import { useUser } from "./AuthProvider";
import { useNavigate } from "react-router-dom";
const Comment = ({ comment_data }) => {
    const { getUserData } = useUser();
    const user = getUserData();
    const navigate = useNavigate();
    return (
        <div className="comment">
            <div className="comment-data">
                <h2>{comment_data.comment_text}</h2>
            </div>
            <div className="comment-info">
                <h5>Створено в  {comment_data.created_at} UTC+0</h5>
                <div>
                    <h6>Від: {user.name}</h6>
                    <h6>Країна: {comment_data.country}</h6>
                </div>
            </div>
        </div>
    );
}


export default Comment;