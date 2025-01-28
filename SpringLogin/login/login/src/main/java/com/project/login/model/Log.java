package com.project.login.model;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Log {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
	
	private String action;// POST, DELETE, PUT, GET
	private String entityName; // İşlem yapılan entity (örneğin: Book)
	private Long entityId;// İşlem yapılan entity'nin ID'si
	private String performedBy;// İşlemi yapan adminin adı
	private LocalDateTime timestamp;// İşlem tarihi ve saati
	 public Log() {}
	 public Log(String action, String entityName, Long entityId, String performedBy, LocalDateTime timestamp) {
	        this.action = action;
	        this.entityName = entityName;
	        this.entityId = entityId;
	        this.performedBy = performedBy;
	        this.timestamp = timestamp;
	    }
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getAction() {
		return action;
	}
	public void setAction(String action) {
		this.action = action;
	}
	public String getEntityName() {
		return entityName;
	}
	public void setEntityName(String entityName) {
		this.entityName = entityName;
	}
	public Long getEntityId() {
		return entityId;
	}
	public void setEntityId(Long entityId) {
		this.entityId = entityId;
	}
	public String getPerformedBy() {
		return performedBy;
	}
	public void setPerformedBy(String performedBy) {
		this.performedBy = performedBy;
	}
	public LocalDateTime getTimestamp() {
		return timestamp;
	}
	public void setTimestamp(LocalDateTime timestamp) {
		this.timestamp = timestamp;
	}
	 
	 
}
