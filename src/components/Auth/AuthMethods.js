import React, { useState, useEffect } from 'react';
import { getUserAuthMethods } from '../../services/authService';

const AuthMethods = () => {
    const [authMethods, setAuthMethods] = useState([]);

    useEffect(() => {
        const fetchAuthMethods = async () => {
            const methods = await getUserAuthMethods();
            setAuthMethods(methods);
        };
        fetchAuthMethods();
    }, []);

    return (
        <div>
            <h2>Your Login Methods</h2>
            <ul>
                {authMethods.map(method => (
                    <li key={method}>{method}</li>
                ))}
            </ul>
        </div>
    );
};

export default AuthMethods;
