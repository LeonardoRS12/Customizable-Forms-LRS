import React, { useState } from 'react';
import { auth } from '../firebaseConfig';
import { updateProfile, updatePassword } from 'firebase/auth';

const Profile = () => {
  const [displayName, setDisplayName] = useState(auth.currentUser?.displayName || '');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleUpdateProfile = async () => {
    try {
      await updateProfile(auth.currentUser, { displayName });
      setMessage('Profile updated successfully!');
    } catch (error) {
      setMessage(`Error updating profile: ${error.message}`);
    }
  };

  const handleUpdatePassword = async () => {
    try {
      await updatePassword(auth.currentUser, password);
      setMessage('Password updated successfully!');
    } catch (error) {
      setMessage(`Error updating password: ${error.message}`);
    }
  };

  return (
    <div>
      <h2>User Profile</h2>
      <div>
        <label>Display Name:</label>
        <input
          type="text"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
        />
        <button onClick={handleUpdateProfile}>Update Profile</button>
      </div>
      <div>
        <label>New Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleUpdatePassword}>Update Password</button>
      </div>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Profile;