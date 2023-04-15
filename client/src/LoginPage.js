import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from './UserContext';
import { useContext } from 'react';

export default function LoginPage (props) {
    const { isConnected } = useContext(UserContext);

    if (isConnected) {
        return(<Navigate replace to="/main" />);
    }

    /*const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");

    const getLogin = (evt) => {setLogin(evt.target.value)}
    const getPassword = (evt) => {setPassword(evt.target.value)}*/

    return (
        <form method="POST" action="">
            <label htmlFor="login">Nom d'utilisateur</label>
            <input id="login"  />

            <label htmlFor="pwd">Mot de passe</label>
            <input type="password" id="pwd"  />

            <button type="submit">Se connecter</button>
            <button type="reset">Annuler</button>
        </form>
    );
}