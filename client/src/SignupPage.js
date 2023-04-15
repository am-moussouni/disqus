import { UserContext } from './UserContext';
import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';

axios.defaults.baseURL = 'http://localhost:4000';

export default function SignupPage() {
  const { isConnected, changeIsConnected, login, setLogin, lastname, setLastname, firstname, setFirstname } = useContext(UserContext);

  const [password, setPassword] = useState("");

  // redir si connecté
  if (isConnected) {
    return(<Navigate replace to="/main" />);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      login: login,
      password: password,
      lastname: lastname,
      firstname: firstname
    };

    try {
      const res = await axios.put('/api/user', userData);
      console.log(res.data);
      await changeIsConnected(true);
      console.log(isConnected);
      res.redirect("/main");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Nom d'utilisateur" value={login} onChange={(e) => setLogin(e.target.value)} />
      <input type="password" placeholder="Mot de passe" value={password} onChange={(e) => setPassword(e.target.value)} />
      <input type="text" placeholder="Nom" value={lastname} onChange={(e) => setLastname(e.target.value)} />
      <input type="text" placeholder="Prénom" value={firstname} onChange={(e) => setFirstname(e.target.value)} />


      <button type="submit">Inscription</button>
      <button type="reset">Annuler</button>
    </form>
  )
}