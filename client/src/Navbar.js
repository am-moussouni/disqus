import React from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from './UserContext';
import { useContext } from 'react';

export default function Navbar() {

    const { isConnected, setIsConnected } = useContext(UserContext);

    return (
        <div>
            { isConnected ? (
                <nav>
                    <Link to="/main">Accueil</Link>
                    <Link to="/profile">Profil</Link>
                    <Link to="/login" onClick={() => setIsConnected(false)}>Se déconnecter</Link>
                </nav>
            ) : (
                <nav>
                    <Link to="/login">Se connecter</Link>
                    <Link to="/signup">Créer un compte</Link>
                </nav>
            )}
        </div>
    );
}
