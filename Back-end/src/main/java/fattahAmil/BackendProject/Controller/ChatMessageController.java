package fattahAmil.BackendProject.Controller;

import fattahAmil.BackendProject.Dto.RecipientSenderDto;
import fattahAmil.BackendProject.Service.Implement.ChatMessageService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/chatMessage")
@RequiredArgsConstructor
public class ChatMessageController {

    private final ChatMessageService chatMessageService;

    @PostMapping("/getChat")
    public ResponseEntity<?> getMessageBySenderAndRecipient(@RequestBody RecipientSenderDto recipientSenderDto){
        return ResponseEntity.ok(chatMessageService.getMessageBySenderAndRecipient(recipientSenderDto.getSenderId(), recipientSenderDto.getRecipientId()));
    }
}
