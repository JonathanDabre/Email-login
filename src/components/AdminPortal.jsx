import React, { useState, useEffect } from 'react';
import { db } from './firebase';
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
    <div className="container mx-auto p-4 bg-[#ECF1F4]">
      <h3 className="text-2xl font-bold mb-4">Admin Portal</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm bg-white rounded-xl shadow-sm border-gray-200">
          <thead>
            <tr className="text-left">
              <th className="pt-4 pb-3 px-4 ">Email</th>
              <th className="pt-4 pb-3 px-4 ">First Name</th>
              <th className="pt-4 pb-3 px-4 ">Last Name</th>
              <th className="pt-4 pb-3 px-4  text-center">Blacklisted</th>
              <th className="pt-4 pb-3 px-4  text-center">Action</th>
            </tr>
          </thead>
          <tbody className='pt-2'>
            {users.map(user => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="py-[12px] px-4 border-t">{user.email}</td>
                <td className="py-[12px] px-4 border-t">{user.firstName}</td>
                <td className="py-[12px] px-4 border-t">{user.lastName}</td>
                <td className="py-[12px] px-4 border-t text-center">{user.blacklisted ? 'Yes' : 'No'}</td>
                <td className="py-[12px] px-4 border-t">
                  <button
                    onClick={() => handleBlacklistToggle(user.id, user.blacklisted)}
                    className={`px-3 py-2 rounded-full text-sm font-semibold flex w-[100%] justify-center ${
                      user.blacklisted ? 'bg-[#332D30] text-white' : 'bg-[#FD6B3C] text-white'
                    }`}
                  >
                    {user.blacklisted ? 'Unblacklist' : 'Blacklist'}
                  </button>
                </td>
              </tr>
            ))}
            <tr className='h-2'></tr>

          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminPortal;
