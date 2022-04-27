package com.avatar.controller;

import java.time.LocalDate;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.avatar.dto.EditUserDto;
import com.avatar.exception.UserNotFoundException;
import com.avatar.model.Role;
import com.avatar.model.User;
import com.avatar.repository.RoleRepository;
import com.avatar.repository.UserRepository;

@Controller
@RequestMapping("/avatar/admin")
public class AdminController {
	
	@Autowired
	UserRepository userRepository;
	@Autowired
	RoleRepository roleRepository;
	@Autowired
	PasswordEncoder passEncoder;
	private static final Logger logger = LoggerFactory.getLogger(PasswordController.class);
	
	@GetMapping("/users")
    @ResponseBody
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public List<User> getAllActiveUsers(){
		Boolean disabled = Boolean.FALSE;
		Role roles = roleRepository.findByName("ROLE_USER");
		List<User> users = userRepository.findByRoles(roles);
		users.removeAll(userRepository.findAllByEnabled(disabled));
		
    	return users;
    }
	
	@GetMapping("/users/deactivate")
    @ResponseBody
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public String deactivateUser(Long id){
    	User user = userRepository.findById(id)
    	.orElseThrow(() -> new UserNotFoundException("User_Error","User not found with this id : "+ id,LocalDate.now()));
    	
    	user.setEnabled(Boolean.FALSE);
    	userRepository.save(user);
    	logger.debug("user " + user.getEmail() + "deactivated.");
    	return "User sucessfully deactivated";
    }
	
	@PutMapping("users/edit")
	@ResponseBody
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	public String editUser(@RequestBody(required=false) EditUserDto userDto ) {
		
		User user = userRepository.findById(userDto.getId())
		.orElseThrow(() -> new UserNotFoundException("User_Error","User not found with this id : "+ userDto.getId(),LocalDate.now()));
		
			user.setFirstName(userDto.getFirstName());
			user.setLastName(userDto.getLastName());
			user.setPassword(passEncoder.encode(userDto.getPassword()));
			userRepository.save(user);
			
			logger.debug("user " + user.getEmail() + " modified to : " + user.getFirstName() + user.getLastName() + user.getPassword());
			return "User succesfully modified";
		
	}

}
