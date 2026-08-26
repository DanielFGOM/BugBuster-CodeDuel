package com.bugbuster.service;

import com.bugbuster.model.*;
import com.bugbuster.repository.ProgressRepository;
import org.springframework.stereotype.Service;

@Service
public class ProgressService {
    private final ProgressRepository progressRepository;

    public ProgressService(ProgressRepository progressRepository) {
        this.progressRepository = progressRepository;
    }

    public Progress getOrCreateProgress(User user, Level level) {
        return progressRepository.findByUserAndLevel(user, level)
                .orElseGet(() -> {
                    Progress p = new Progress();
                    p.setUser(user);
                    p.setLevel(level);
                    p.setCompleted(false);
                    p.setAttempts(0);
                    p.setScore(0);
                    return progressRepository.save(p);
                });
    }

    public void markCompleted(User user, Level level, int score) {
        Progress p = getOrCreateProgress(user, level);
        p.setCompleted(true);
        p.setScore(score);
        p.setAttempts(p.getAttempts() + 1);
        progressRepository.save(p);
    }

    public void incrementAttempts(User user, Level level) {
        Progress p = getOrCreateProgress(user, level);
        p.setAttempts(p.getAttempts() + 1);
        progressRepository.save(p);
    }
}