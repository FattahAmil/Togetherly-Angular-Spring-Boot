package fattahAmil.BackendProject.Service.Implement;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

@Service
public class WebSocketService {

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    public void sendLikeNotification(String recipientUsername, String message) {
        String destination = "/user/" + recipientUsername + "/likes";
        messagingTemplate.convertAndSend(destination, message);
    }

    public void sendCommentNotification(String recipientUsername, String message) {
        String destination = "/user/" + recipientUsername + "/comments";
        messagingTemplate.convertAndSend(destination, message);
    }
}
