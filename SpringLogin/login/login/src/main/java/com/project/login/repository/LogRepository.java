package com.project.login.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.login.model.Log;

public interface LogRepository extends JpaRepository<Log, Long> {

}
