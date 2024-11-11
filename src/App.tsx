import React, { useState } from 'react';
import AuthForm from './components/AuthForm';
import Dashboard from './components/Dashboard';
import { User } from './types';
import { addNewUser } from './data/userData';

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [currentSemester, setCurrentSemester] = useState(1);

  const handleAuth = ({ email, password, isLogin, name, branch, rollNumber }: { 
    email: string; 
    password: string; 
    isLogin: boolean;
    name?: string;
    branch?: string;
    rollNumber?: string;
  }) => {
    if (!isLogin && name && branch && rollNumber) {
      const newUser: User = {
        id: `USR${Math.random().toString(36).substr(2, 9)}`,
        name,
        email,
        branch,
        rollNumber
      };
      addNewUser(newUser);
      setUser(newUser);
    } else {
      // For demo, we'll just log in as a test user
      setUser({
        id: 'USR001',
        name: 'Tushar Manikantta',
        email,
        branch: 'CSE',
        rollNumber: 'CSE001',
      });
    }
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentSemester(1);
  };

  if (!user) {
    return <AuthForm onSubmit={handleAuth} />;
  }

  return (
    <Dashboard
      user={user}
      currentSemester={currentSemester}
      onSemesterChange={setCurrentSemester}
      onLogout={handleLogout}
    />
  );
}

export default App;