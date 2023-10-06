package fattahAmil.BackendProject.Repository;

import fattahAmil.BackendProject.Entity.ChatMessage;
import fattahAmil.BackendProject.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChatMessageRepository extends JpaRepository<ChatMessage, Long> {


    List<ChatMessage> findAllBySenderAndRecipientOrSenderAndRecipientOrderByCreatedAt(User sender1, User recipient1, User sender2, User recipient2);
}
