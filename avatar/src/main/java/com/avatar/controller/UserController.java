package com.avatar.controller;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.avatar.dto.EditUserDto;
import com.avatar.exception.InvalidTokenException;
import com.avatar.exception.UserNotFoundException;
import com.avatar.model.AvatarModel;
import com.avatar.model.User;
import com.avatar.repository.AvatarModelRepository;
import com.avatar.repository.FileDescriptorRepository;
import com.avatar.repository.UserRepository;


@Controller
@RequestMapping("/avatar")
@Validated
public class UserController {
	
	@Autowired
	private UserRepository userRepository;
	@Autowired
	private AvatarModelRepository modelRepository;
	@Autowired
	private FileDescriptorRepository fileRepository;
	private static final Logger logger = LoggerFactory.getLogger(UserController.class);
	
	
    @PreAuthorize("hasRole('ROLE_USER')")
    @GetMapping("/user/profile")
	public ResponseEntity<User> userProf() {
    	User user = userRepository.findByEmail(
    			SecurityContextHolder.getContext().getAuthentication().getName());
    	if(user == null) {
			
			throw new InvalidTokenException("Error","Invalid token", LocalDate.now());
		}
		return ResponseEntity.ok(user);
	}
    @PreAuthorize("hasRole('ROLE_USER')")
    @GetMapping("/user/profile/details")
    @ResponseBody
	public Map<String, String> userProfDetails() {
    	User user = userRepository.findByEmail(
    			SecurityContextHolder.getContext().getAuthentication().getName());
    	if(user == null) {
			
			throw new InvalidTokenException("Error","Invalid token", LocalDate.now());
		}
    	
    	Map<String, String> map = new HashMap<>();
    	map.put("firstName", user.getFirstName());
    	map.put("lastName", user.getLastName());
    	map.put("email", user.getEmail());
    	map.put("password", user.getPassword());
		return map;
	}
    @PostMapping("user/profile/edit")
	@ResponseBody
	@PreAuthorize("hasRole('ROLE_USER')")
	public String editUser(@RequestBody(required=false) EditUserDto userDto ) {
		
    	User user = userRepository.findByEmail(
    			SecurityContextHolder.getContext().getAuthentication().getName());
	    	if(user == null) {
				
				throw new InvalidTokenException("Error","Invalid token", LocalDate.now());
			}
			user.setFirstName(userDto.getFirstName());
			user.setLastName(userDto.getLastName());
			
			userRepository.save(user);
			
			logger.debug("user " + user.getEmail() + " modified to : " + user.getFirstName() + user.getLastName() + user.getPassword());
			return "User succesfully modified";
		
	}
    /*
    @PreAuthorize("hasRole('ROLE_USER')")
    @GetMapping("/user/profile/saved")
    @ResponseBody
	public List<Map<String,String>> showSavedModels() {
    	User user = userRepository.findByEmail(
    			SecurityContextHolder.getContext().getAuthentication().getName());
    	if(user == null) {
			
			throw new InvalidTokenException("Error","Invalid token", LocalDate.now());
		}
    	List<Map<String, String>> re = new ArrayList<Map<String,String>>();
    	List<AvatarModel> avatars = modelRepository.findByUserId(user.getId());
    	
    	
    	for(AvatarModel avatar: avatars) {
    		String head = fileRepository.findById(avatar.getHeadId()).get().getId().toString();
    		String body = fileRepository.findById(avatar.getBodyId()).get().getId().toString();
    		String leg = fileRepository.findById(avatar.getLegId()).get().getId().toString();
    		String id = avatar.getId().toString();
	    	Map<String, String> map = new HashMap<>();
	    	map.put("id", id);
    		map.put("head", head);
    		map.put("body", body);
    		map.put("leg", leg);
    		re.add(map);
    	}
    	
    	return re;
	}
	*/
    @PreAuthorize("hasRole('ROLE_USER')")
    @GetMapping("/user/profile/saved")
    @ResponseBody
	public List<Map<String,Long>> showSavedModels() {
    	User user = userRepository.findByEmail(
    			SecurityContextHolder.getContext().getAuthentication().getName());
    	if(user == null) {
			
			throw new InvalidTokenException("Error","Invalid token", LocalDate.now());
		}
    	List<Map<String, Long>> re = new ArrayList<Map<String,Long>>();
    	List<AvatarModel> avatars = modelRepository.findByUserId(user.getId());
    	
    	
    	for(AvatarModel avatar: avatars) {
    		Long head = avatar.getHeadId();
    		Long body = avatar.getBodyId();
    		Long leg = avatar.getLegId();
    		Long id = avatar.getId();
	    	Map<String, Long> map = new HashMap<>();
	    	map.put("id", id);
    		map.put("head", head);
    		map.put("body", body);
    		map.put("leg", leg);
    		re.add(map);
    	}
    	
    	return re;
	}
 
}
