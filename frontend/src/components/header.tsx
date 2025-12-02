import { useNavigate } from "react-router-dom";
import "../styles/header.css"

const BACKEND_URL = "http://localhost:3000";

const Header = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            const response = await fetch(`${BACKEND_URL}/auth/logout`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                throw new Error("Logout failed");
            }   
        } catch (error) {
            console.error("Logout error:", error);              
        } finally {
            navigate("/login", { replace: true });
        }
    };

    return (
        <header data-testid="app-header" className="app-header">
            <div className="header-content">
                <h1>Clubfindr</h1>
                <p>Discover clubs effortlessly</p>
            </div>

            <button onClick={handleLogout} className="logout-button">
                Log out
            </button>
        </header>
    );
}

export default Header;