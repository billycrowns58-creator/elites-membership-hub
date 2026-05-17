import { useState, useEffect } from 'react';
import { User, Contribution, Notification } from '../types';

export const useStorage = () => {
  const [users, setUsers] = useState<User[]>(() => {
    const saved = localStorage.getItem('elites_users');
    return saved ? JSON.parse(saved) : [];
  });

  const [contributions, setContributions] = useState<Contribution[]>(() => {
    const saved = localStorage.getItem('elites_contributions');
    return saved ? JSON.parse(saved) : [];
  });

  const [notifications, setNotifications] = useState<Notification[]>(() => {
    const saved = localStorage.getItem('elites_notifications');
    return saved ? JSON.parse(saved) : [];
  });

  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('elites_current_user');
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    localStorage.setItem('elites_users', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem('elites_contributions', JSON.stringify(contributions));
  }, [contributions]);

  useEffect(() => {
    localStorage.setItem('elites_notifications', JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem('elites_current_user', JSON.stringify(currentUser));
  }, [currentUser]);

  const addUser = (user: User) => setUsers([...users, user]);
  const addContribution = (c: Contribution) => setContributions([...contributions, c]);
  const addNotification = (n: Notification) => setNotifications([...notifications, n]);

  const login = (phone: string, password?: string) => {
    const user = users.find(u => u.phone === phone);
    if (user && (!password || user.password === password)) {
      if (user.isBlocked) return { success: false, message: 'Compte bloqué' };
      setCurrentUser(user);
      return { success: true, user };
    }
    return { success: false, message: 'Identifiants incorrects' };
  };

  const logout = () => setCurrentUser(null);

  return {
    users, setUsers,
    contributions, setContributions,
    notifications, setNotifications,
    currentUser, setCurrentUser,
    addUser, addContribution, addNotification,
    login, logout
  };
};