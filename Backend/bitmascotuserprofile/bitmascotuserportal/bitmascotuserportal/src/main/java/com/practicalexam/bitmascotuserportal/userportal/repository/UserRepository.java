package com.practicalexam.bitmascotuserportal.userportal.repository;

import com.practicalexam.bitmascotuserportal.userportal.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    @Query("SELECT u FROM User u WHERE u.email = :userEmail")
    User findByEmail(@Param("userEmail") String userEmail);

    @Query("SELECT u.email FROM User u")
    List<String> findAllEMail();
}
