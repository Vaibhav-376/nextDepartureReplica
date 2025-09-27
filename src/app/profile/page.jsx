import React from 'react';
import SubscriptionRequired from './SubscriptionRequired'; 

const ProfileContent = () => {
  return (
    <div className="p-8">
      <h1>Your Premium Profile Details</h1>
      <p>Welcome, subscribed user! You can now view your private account information and manage your plan here.</p>

      <ul>
        <li>Name:</li>
        <li>Current Plan: Premium</li>
        <li>Access to exclusive deals and content.</li>
      </ul>
    </div>
  );
};


const ProfilePage = () => {
  return (
    <SubscriptionRequired>
      <ProfileContent />
    </SubscriptionRequired>
  );
};

export default ProfilePage;