package com.avatar.controller;

import java.net.http.HttpRequest;
import java.util.HashMap;
import java.util.Map;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.avatar.dto.LoginDto;
import com.avatar.model.JwtUtility;
import com.avatar.repository.UserRepository;
import com.avatar.service.AllUserDetailsService;

@RestController
public class LoginController {
	
	@Autowired
	AuthenticationManager authenticationManager;
	@Autowired
	UserRepository userRepository;
	@Autowired
	AllUserDetailsService userDetailsService;
	@Autowired
	JwtUtility jwtUtility;
	
	@RequestMapping(value = "/login", method = RequestMethod.POST)
	public Map<String,String> login(@RequestBody LoginDto userRequest) {
	    Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(userRequest.getUsername(), userRequest.getPassword()));
	    boolean isAuthenticated = isAuthenticated(authentication);
	    if (isAuthenticated) {
	        SecurityContextHolder.getContext().setAuthentication(authentication);
	    }
	    final UserDetails userDetails = userDetailsService.loadUserByUsername(userRequest.getUsername());
	    final String token = jwtUtility.generateToken(userDetails);
	    Map<String,String> jwt = new HashMap<String, String>();
	    jwt.put("jwt", token);
	    jwt.put("role", userDetails.getAuthorities().toString());
	    return jwt;	    
	    
	}

	private boolean isAuthenticated(Authentication authentication) {
	    return authentication != null && !(authentication instanceof AnonymousAuthenticationToken) && authentication.isAuthenticated();
	}
	
	@GetMapping("/logout")
	public void logout(HttpRequest request){
		
	}
}
