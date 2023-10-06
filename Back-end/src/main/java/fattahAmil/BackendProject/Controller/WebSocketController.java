package fattahAmil.BackendProject.Controller;

import fattahAmil.BackendProject.Dto.ChatDtoReq;
import fattahAmil.BackendProject.Dto.MessagePrivateDto;
import fattahAmil.BackendProject.Dto.MessagePrivateDtoRequest;
import fattahAmil.BackendProject.Dto.UserResponse;
import fattahAmil.BackendProject.Entity.ChatMessage;
import fattahAmil.BackendProject.Service.Implement.ChatMessageService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequiredArgsConstructor
public class WebSocketController {

    private final ChatMessageService chatMessageService;



    @Autowired
   private SimpMessagingTemplate simpMessagingTemplate;
    @MessageMapping("/notification")
    private void PrivateNotification(@Payload ChatDtoReq chatNotification){
        String destination = "/user/" + chatNotification.getUserEmailReceiver() + "/notif";
        simpMessagingTemplate.convertAndSend(destination, chatNotification);
    }

    @MessageMapping("/privateMessage")
    private void PrivateMessage(@Payload MessagePrivateDtoRequest messagePrivateDtoRequest){
        ChatMessage chatMessage=chatMessageService.createMessage(messagePrivateDtoRequest.getUserFromId(), messagePrivateDtoRequest.getRecipientId(), messagePrivateDtoRequest.getContent(), messagePrivateDtoRequest.getTypeMessage());
        String destination = "/user/" + chatMessage.getRecipient().getEmail() + "/privateMessage";
        UserResponse sender=new UserResponse(chatMessage.getSender().getId(),chatMessage.getSender().getFirstName(),chatMessage.getSender().getLastName(),chatMessage.getSender().getFirstName()+' '+chatMessage.getSender().getLastName(),chatMessage.getSender().getEmail(),chatMessage.getSender().getProfileImage());
        UserResponse recipient=new UserResponse(chatMessage.getRecipient().getId(),chatMessage.getRecipient().getFirstName(),chatMessage.getRecipient().getLastName(),chatMessage.getRecipient().getFirstName()+' '+chatMessage.getRecipient().getLastName(),chatMessage.getRecipient().getEmail(),chatMessage.getRecipient().getProfileImage());

        MessagePrivateDto chatMessage1=new MessagePrivateDto(chatMessage.getId(),chatMessage.getType(), chatMessage.getContent(),sender,recipient,chatMessage.getCreatedAt());
        simpMessagingTemplate.convertAndSend(destination, chatMessage1);
    }


}
