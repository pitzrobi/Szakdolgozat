package com.avatar.listener;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.ApplicationListener;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Component;

import com.avatar.model.User;
import com.avatar.service.UserService;

@Component
public class RegistrationListener implements 
  ApplicationListener<OnRegistrationCompleteEvent> {
 
	@Value("${url}")
	private String url;
	
    @Autowired
    private UserService userService;
 
    @Autowired
    private JavaMailSender mailSender;

    @Override
    public void onApplicationEvent(OnRegistrationCompleteEvent event) {
        this.confirmRegistration(event);
    }

    private void confirmRegistration(OnRegistrationCompleteEvent event) {
        User user = event.getUser();
        String token = UUID.randomUUID().toString();
        userService.createVerificationToken(user, token);
        
        String recipientAddress = user.getEmail();
        String subject = "Registration Confirmation";
        String confirmationUrl 
          = event.getAppUrl() + "/avatar/registrationConfirm?token=" + token;
        
        SimpleMailMessage email = new SimpleMailMessage();
        email.setFrom("avatarsender22@gmail.com");
        email.setTo(recipientAddress);
        email.setSubject(subject);
        //email.setText("\r\n" + url + confirmationUrl); Ha másik gépről megy a front
        email.setText("\r\n" + "localhost:8080" + confirmationUrl);
        mailSender.send(email);
    }
}
