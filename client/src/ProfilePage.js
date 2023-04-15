import React from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from './UserContext';
import { useContext } from 'react';

export default function ProfilePage() {
  const { isConnected, login, lastname, firstname } = useContext(UserContext);

  if (!isConnected) {
    return(<Navigate replace to="/signup" />);
  }

  return (
    <div>
      <h2>{firstname} {lastname}</h2>
      <p>@{login}</p>
    </div>
  )
}