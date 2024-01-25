import React from "react";


const Description = ({ data }) => {
    return (
        <div className="description">
            <img className="description-image" src={data.image} alt="description image"></img>
            <h1 style={{marginTop: '70px'}}>{data.text}</h1>
        </div>
    );
}

export default Description;