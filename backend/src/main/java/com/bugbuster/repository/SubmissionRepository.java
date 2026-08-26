package com.bugbuster.repository;

import com.bugbuster.model.Submission;
import com.bugbuster.model.User;
import com.bugbuster.model.Level;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface SubmissionRepository extends JpaRepository<Submission, Long> {
    List<Submission> findByUserOrderBySubmittedAtDesc(User user);
    List<Submission> findByUserAndLevel(User user, Level level);
}