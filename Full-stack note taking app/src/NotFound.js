import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function NotFound () {

    const navigate = useNavigate();

    useEffect(() => {
        setTimeout(() => {
            navigate("/")
        }, 2000)
    }, []);

    return (
        <>
            <div id = "error">Error: page not found. Returning to home...</div>
        </>
    );
}

export default NotFound;