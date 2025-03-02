import React, { createContext, useState, useContext, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { toast } from 'react-toastify';

// Create Notification Context
const NotificationContext = createContext();

// Custom hook to use the notification context
export const useNotifications = () => {
  return useContext(NotificationContext);
};

export const NotificationProvider = ({ children }) => {
  const { currentUser } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);

  // Fetch notifications when user changes
  useEffect(() => {
    const fetchNotifications = async () => {
      if (currentUser) {
        try {
          setLoading(true);
          
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 800));
          
          // Mock notifications data
          const mockNotifications = [
            {
              id: '1',
              title: 'New connection request',
              message: 'Sarah Thompson would like to connect with you',
              type: 'connection',
              isRead: false,
              actionUrl: '/dashboard',
              createdAt: new Date(Date.now() - 3600000).toISOString()
            },
            {
              id: '2',
              title: 'Upcoming call reminder',
              message: 'You have a call scheduled in 30 minutes',
              type: 'reminder',
              isRead: true,
              actionUrl: '/dashboard',
              createdAt: new Date(Date.now() - 86400000).toISOString()
            },
            {
              id: '3',
              title: 'Profile completion',
              message: 'Complete your profile to get better matches',
              type: 'info',
              isRead: false,
              actionUrl: '/edit-profile',
              createdAt: new Date(Date.now() - 172800000).toISOString()
            }
          ];
          
          setNotifications(mockNotifications);
          updateUnreadCount(mockNotifications);
        } catch (error) {
          console.error('Failed to fetch notifications:', error);
          toast.error('Failed to load notifications');
        } finally {
          setLoading(false);
        }
      } else {
        setNotifications([]);
        setUnreadCount(0);
        setLoading(false);
      }
    };

    fetchNotifications();
  }, [currentUser]);

  // Update unread count
  const updateUnreadCount = (notifs) => {
    const count = notifs.filter(notif => !notif.isRead).length;
    setUnreadCount(count);
  };

  // Mark notification as read
  const markAsRead = async (notificationId) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const updatedNotifications = notifications.map(notif => {
        if (notif.id === notificationId) {
          return { ...notif, isRead: true };
        }
        return notif;
      });
      
      setNotifications(updatedNotifications);
      updateUnreadCount(updatedNotifications);
    } catch (error) {
      console.error('Failed to mark notification as read:', error);
      toast.error('Failed to update notification');
    }
  };

  // Mark all notifications as read
  const markAllAsRead = async () => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const updatedNotifications = notifications.map(notif => ({
        ...notif,
        isRead: true
      }));
      
      setNotifications(updatedNotifications);
      setUnreadCount(0);
      
      toast.success('All notifications marked as read');
    } catch (error) {
      console.error('Failed to mark all notifications as read:', error);
      toast.error('Failed to update notifications');
    }
  };

  // Add a new notification (used for testing or when receiving real-time updates)
  const addNotification = (notification) => {
    const newNotification = {
      id: Math.random().toString(36).substring(2, 9),
      isRead: false,
      createdAt: new Date().toISOString(),
      ...notification
    };
    
    setNotifications(prev => [newNotification, ...prev]);
    setUnreadCount(prev => prev + 1);
    
    // Show toast for new notification
    toast.info(notification.title);
  };

  // Value to be provided to consumers
  const value = {
    notifications,
    unreadCount,
    loading,
    markAsRead,
    markAllAsRead,
    addNotification
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};
