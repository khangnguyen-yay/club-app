import { useNavigate } from "react-router-dom";
import "../styles/header.css"
import { ThemeToggle } from './ThemeToggle';

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
            <img
                src="/logo.png"
                alt="Clubfindr"
                className="header-logo"
            />

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <ThemeToggle />
                <button onClick={handleLogout} className="logout-button">
                    Log out
                </button>
            </div>
        </header>
    );
}

export default Header;