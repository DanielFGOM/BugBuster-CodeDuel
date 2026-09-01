package com.bugbuster.controller;

import com.bugbuster.model.Level;
import com.bugbuster.service.AgentService;
import com.bugbuster.service.LevelService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AgentController {

    private final AgentService agentService;
    private final LevelService levelService;

    public AgentController(AgentService agentService, LevelService levelService) {
        this.agentService = agentService;
        this.levelService = levelService;
    }

    @GetMapping("/hint")
    public String getHint(@RequestParam Long levelId) {
        Level level = levelService.getLevel(levelId);
        return agentService.getHint(level);
    }
}