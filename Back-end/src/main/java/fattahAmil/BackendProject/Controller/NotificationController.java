package fattahAmil.BackendProject.Controller;

import fattahAmil.BackendProject.Dto.ReadNotifDto;
import fattahAmil.BackendProject.Dto.UserByIdReq;

import fattahAmil.BackendProject.Service.Implement.NotificationService;
import fattahAmil.BackendProject.Service.Implement.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/notification")
@RequiredArgsConstructor
public class NotificationController {

    private final NotificationService notificationService;


    @PostMapping("/getNotification")
    public ResponseEntity<?> GetNotificationByUser(@RequestBody UserByIdReq userByIdReq){
        return ResponseEntity.ok(notificationService.getNotificationsForUser(userByIdReq.getIdUser()));
    }

    @PostMapping("/readNotification")
    public ResponseEntity<?> readNotification(@RequestBody ReadNotifDto readNotifDto){
        if (readNotifDto.getIdPost()==0){
            readNotifDto.setIdPost(-1);
        }


        return ResponseEntity.ok(notificationService.markNotificationAsRead(readNotifDto.getRecipientId(), readNotifDto.getUserFromId(), readNotifDto.getTypeNotif(),readNotifDto.getIdPost()));
    }

}
