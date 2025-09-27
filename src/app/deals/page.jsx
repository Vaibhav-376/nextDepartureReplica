import React from 'react'
import SubscriptionRequired from '../profile/SubscriptionRequired'

const Deals = () => {
  return (
    <div>
      <h1>Deals</h1>
    </div>
  )
}

const ProfilePage = () => {
  return (
    <SubscriptionRequired>
      <Deals />
    </SubscriptionRequired>
  );
};

export default ProfilePage;