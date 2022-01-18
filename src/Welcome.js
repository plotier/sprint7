import React from "react";
import { Link } from 'react-router-dom';




export const Welcome = () => {
    return (
        <div className="m-5">
            <h1>Welcome page</h1>
            <Link to="/home">
            <button type="button" class="btn btn-primary"> Home</button>
            </Link>
        </div>
    )
}