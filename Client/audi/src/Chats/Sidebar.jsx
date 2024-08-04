import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Sidebar = () => {
    const auth = localStorage.getItem('auth') || localStorage.getItem('Auth');
    const parsedAuth = JSON.parse(auth);
    const token = parsedAuth ? parsedAuth.token : null;
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchallusers = async () => {
            try {
                const users = await axios.get('http://localhost:8080/api/users', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                console.log(users);
                setUsers(users.data.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchallusers();
    }, [token]);

    return (
        <div className="p-4 w-64">
            <ul>
             
                {users.map((user, id) => (
                    <div>
                    <li
                        key={id}
                        className="mb-4 p-4 bg-white shadow-md rounded-lg hover:shadow-lg transition-shadow duration-300 text-black"
                    >
                        {user.username}

                    </li>
                  
                    </div>

                ))}
            </ul>
        </div>
    );
};

export default Sidebar;
