package com.bugbuster.repository;

import com.bugbuster.model.Level;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface LevelRepository extends JpaRepository<Level, Long> {
    List<Level> findAllByOrderByOrderNumberAsc();
}