package com.bugbuster.service;

import com.bugbuster.model.Level;
import com.bugbuster.repository.LevelRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class LevelService {
    private final LevelRepository levelRepository;

    public LevelService(LevelRepository levelRepository) {
        this.levelRepository = levelRepository;
    }

    public List<Level> getAllLevels() {
        return levelRepository.findAllByOrderByOrderNumberAsc();
    }

    public Level getLevel(Long id) {
        return levelRepository.findById(id).orElse(null);
    }

    public Level getLevelByOrder(int order) {
        return levelRepository.findAllByOrderByOrderNumberAsc().stream()
                .filter(l -> l.getOrderNumber() == order)
                .findFirst().orElse(null);
    }
}