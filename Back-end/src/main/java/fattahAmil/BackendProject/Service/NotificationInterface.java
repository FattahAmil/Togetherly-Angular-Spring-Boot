package fattahAmil.BackendProject.Service;

import fattahAmil.BackendProject.Entity.User;
import fattahAmil.BackendProject.Entity.Notification;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface NotificationInterface {
    Notification createNotification(User Sender,User recipient, String message);
     ResponseEntity<?> getNotificationsForUser(String idUser);
    ResponseEntity<?> markNotificationAsRead(String recipientId,String userFromId,String typeNotification,long idPost);
    public Notification markNotificationAsUnread(Long notificationId);

    }