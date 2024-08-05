import React, { useState, useEffect } from 'react';
import { auth, db } from './firebase';
import { collection, query, getDocs, updateDoc, doc } from 'firebase/firestore';

function AdminPortal() {
  const [users, setUsers] = useState([]);
  
  useEffect(() => {
    const fetchUsers = async () => {
      const q = query(collection(db, 'Users'));
      const querySnapshot = await getDocs(q);
      const userList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setUsers(userList);
    };

    fetchUsers();
  }, []);
  
  const handleBlacklistToggle = async (userId, isBlacklisted) => {
    const userRef = doc(db, 'Users', userId);
    await updateDoc(userRef, { blacklisted: !isBlacklisted });
    setUsers(users.map(user => user.id === userId ? { ...user, blacklisted: !isBlacklisted } : user));
  };

  return (
    <div>
      <h3>Admin Portal</h3>
      <table>
        <thead>
          <tr>
            <th>Email</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Blacklisted</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.email}</td>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.blacklisted ? 'Yes' : 'No'}</td>
              <td>
                <button onClick={() => handleBlacklistToggle(user.id, user.blacklisted)}>
                  {user.blacklisted ? 'Unblacklist' : 'Blacklist'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminPortal;
