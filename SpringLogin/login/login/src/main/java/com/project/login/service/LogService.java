package com.project.login.service;

import java.time.LocalDateTime;

import org.springframework.stereotype.Service;

import com.project.login.model.Log;
import com.project.login.repository.LogRepository;

@Service
public class LogService {
	private final LogRepository logRepository;

	public LogService(LogRepository logRepository) {
		super();
		this.logRepository = logRepository;
	}
	
	public void saveLog(String action, String entityName, Long entityId, String performedBy) {
        Log log = new Log(action, entityName, entityId, performedBy, LocalDateTime.now());
        logRepository.save(log);
    }
}
