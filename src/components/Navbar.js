import { Link, useNavigate } from "react-router-dom";

function Navbar() {

    const navigate = useNavigate();

    const username =
        localStorage.getItem("username") || "Admin";

    const logout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("username");

        navigate("/");
    };

    return (

        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">

            <div className="container-fluid">

                <span className="navbar-brand">
                    Barcode Coupon System
                </span>

                <div className="navbar-nav">

                    <Link
                        className="nav-link"
                        to="/dashboard"
                    >
                        Dashboard
                    </Link>

                    <Link
                        className="nav-link"
                        to="/summary"
                    >
                        Barcode Summary
                    </Link>

                    <Link
                        className="nav-link"
                        to="/change-password"
                    >
                        Change Password
                    </Link>

                </div>

                <div className="d-flex text-white">

                    <span className="me-3">
                        Welcome, {username}
                    </span>

                    <button
                        className="btn btn-danger btn-sm"
                        onClick={logout}
                    >
                        Logout
                    </button>

                </div>

            </div>

        </nav>

    );
}

export default Navbar;