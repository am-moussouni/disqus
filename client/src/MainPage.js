//import { useState } from 'react'; //useState : permet de créer des variables d'état
//import NavigationPanel from './NavigationPanel';
import { Navigate } from 'react-router-dom';
import { UserContext } from './UserContext';
import { useContext } from 'react';

function MainPage(props) {
    /*const [page, setPage] = useState("signin_page");
    const [isConnected, setConnect] = useState(false);

    const getConnected = () => {
        setPage("message_page");
        setConnect(true);
    }

    const setLogout = () => {
        setPage("signin_page");
        setConnect(false);
    }

    return (
        <div>
            <NavigationPanel login={getConnected} logout={setLogout} isConnected={isConnected} />
        </div>
    );*/

    const { isConnected } = useContext(UserContext);

    console.log("isConnected : " + isConnected);

    if (!isConnected) {
        return(<Navigate replace to="/signup" />);
    }

    return(<div>Main Page</div>);
}

export default MainPage; //default : permet de renommer la fonction lors du import