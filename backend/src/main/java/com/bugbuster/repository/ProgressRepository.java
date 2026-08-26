package com.bugbuster.repository;

import com.bugbuster.model.Progress;
import com.bugbuster.model.User;
import com.bugbuster.model.Level;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface ProgressRepository extends JpaRepository<Progress, Long> {
    Optional<Progress> findByUserAndLevel(User user, Level level);
    List<Progress> findByUser(User user);
}