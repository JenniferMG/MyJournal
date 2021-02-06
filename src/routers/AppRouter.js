import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import {firebase} from '../firebase/firebaseConfig';

import { JournalScreen } from '../components/journal/JournalScreen';
import { login } from '../actions/auth';

import { AuthRouter } from './AuthRouter';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';
import { LoadingScreen } from '../components/loading/LoadingScreen';
import { startLoadingNotes } from '../actions/notes';

export const AppRouter = () => {

    const dispatch = useDispatch();

    const [ checking, setChecking ] = useState(true);

    const [ isLoggedIn, setIsLoggedIn ] = useState(false);

    useEffect(() => {
        firebase.auth().onAuthStateChanged( async(user) => {
            if( user?.uid ) { // si el objeto user tiene algo, entonces evalúa si el uid existe
                dispatch( login( user.uid, user.displayName ) );
                setIsLoggedIn(true);

                dispatch( startLoadingNotes( user.uid ) );

            }else {
                setIsLoggedIn(false);
            }

            setChecking(false);
        });
    }, [ dispatch, setChecking, setIsLoggedIn ]);

    if( checking ) {
        return (
            <LoadingScreen />
        );
    }

    return (
        <Router>
            <>
                <Switch>
                    <PublicRoute 
                        isAuthenticated={ isLoggedIn }
                        path="/auth" 
                        component={ AuthRouter } 
                    />

                    <PrivateRoute 
                        exact 
                        isAuthenticated={ isLoggedIn }
                        path="/" 
                        component={ JournalScreen }
                    />

                    <Redirect to="/auth/login" />
                </Switch>
            </>
        </Router>
    );
}
