package com.project.login.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.login.model.Reservation;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {
	List<Reservation> findByUserId(Long userId);
	List<Reservation> findByBookId(Long bookId);
	Optional<Reservation> findById(Long reservationId);
	Long countByStatus(String status);
	Optional<Reservation> findByUserIdAndBookIdAndStatusNot(Long userId, Long bookId, String status);
}
