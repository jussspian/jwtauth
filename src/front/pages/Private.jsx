import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Private = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const token = sessionStorage.getItem("token");
        if (!token) {
            navigate("/login");
            return;
        }

        const fetchData = async () => {
            try {
                const resp = await fetch(import.meta.env.VITE_BACKEND_URL + "/api/private", {

                    headers: { Authorization: "Bearer " + token },
                });

                if (resp.status === 200) {
                    const data = await resp.json();
                    setUser(data.user);
                } else {
                    sessionStorage.removeItem("token");
                    navigate("/login");
                }
            } catch (err) {
                setError("Error de conexión con el servidor");
            }
        };

        fetchData();
    }, [navigate]);

    if (error) {
        return <div className="container mt-5 alert alert-danger">{error}</div>;
    }

    return (
        <div className="container mt-5">
            <h2>Área privada</h2>
            {user ? (
                <div className="alert alert-success mt-3">
                    Bienvenido <strong>{user.email}</strong>, acceso concedido.
                </div>
            ) : (
                <p>Cargando...</p>
            )}
        </div>
    );
};