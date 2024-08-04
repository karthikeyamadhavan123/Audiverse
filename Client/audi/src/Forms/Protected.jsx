import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Protected = (props) => {
    const navigate = useNavigate();
    const { Component } = props;

    useEffect(() => {
        let auth = localStorage.getItem('auth') || localStorage.getItem('Auth');
        let Auth = auth ? JSON.parse(auth) : null;

        if (!Auth || !Auth.username || !Auth.token) {
            navigate('/api/login');
        }
    }, [navigate]);

    return (
        <div>
            <Component />
        </div>
    );
};

export default Protected;
