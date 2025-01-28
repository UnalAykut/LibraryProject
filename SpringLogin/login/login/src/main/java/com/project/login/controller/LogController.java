package com.project.login.controller;

import java.util.List;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.login.model.Log;
import com.project.login.repository.LogRepository;

import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("/admin/logs")
@PreAuthorize("hasRole('ADMIN')")
@Tag(name = "Admin Log Controller", description = "Admin Log Kayıtları")
public class LogController {
	 private final LogRepository logRepository;

	    public LogController(LogRepository logRepository) {
	        this.logRepository = logRepository;
	    }

	    @GetMapping
	    public List<Log> getAllLogs() {
	        return logRepository.findAll();
	    }
}
