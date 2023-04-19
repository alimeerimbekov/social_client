import {Suspense} from "react";
import '../src/styles/style.scss'
import './utils/i18n'
import {useSelector} from "react-redux";
import PrivatRouting from "./routing/PrivatRouting";
import AuthRouting from "./routing/AuthRouting";
import {userSelector} from "./redux/reselect";

function App() {

    const {user} = useSelector(userSelector)


    return (
        <Suspense fallback={'...Loading'}>
            {
                !user.login.length ?
                    <AuthRouting/>
                    :
                    <PrivatRouting/>

            }
        </Suspense>
    );
}

export default App;
