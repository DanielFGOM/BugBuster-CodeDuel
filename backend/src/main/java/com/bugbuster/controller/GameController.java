package com.bugbuster.controller;

import com.bugbuster.dto.SubmitRequest;
import com.bugbuster.dto.SubmitResponse;
import com.bugbuster.model.*;
import com.bugbuster.service.*;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.RequestMethod;

import java.util.List;

@CrossOrigin(origins = "*", allowedHeaders = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE, RequestMethod.OPTIONS})
@RestController
@RequestMapping("/api/game")
public class GameController {

    private final LevelService levelService;
    private final ProgressService progressService;
    private final CompilerService compilerService;
    private final UserService userService;

    public GameController(LevelService levelService, ProgressService progressService, CompilerService compilerService, UserService userService) {
        this.levelService = levelService;
        this.progressService = progressService;
        this.compilerService = compilerService;
        this.userService = userService;
    }

    @GetMapping("/levels")
    public List<Level> getLevels() {
        return levelService.getAllLevels();
    }

    @GetMapping("/level/{id}")
    public Level getLevel(@PathVariable Long id) {
        return levelService.getLevel(id);
    }

    @PostMapping("/submit")
    public ResponseEntity<SubmitResponse> submit(@RequestBody SubmitRequest request, @AuthenticationPrincipal UserDetails userDetails) {
        User user = userService.findByUsername(userDetails.getUsername());
        Level level = levelService.getLevel(request.getLevelId());
        if (level == null) {
            return ResponseEntity.badRequest().body(new SubmitResponse(false, "Nivel no encontrado", null));
        }

        String fullCode = level.getTemplate().replace("//USER_CODE", request.getCode());
        CompilerService.CompilationResult result = compilerService.compileAndRun(fullCode, level.getExpectedOutput());

        if (result.isSuccess() && result.getOutput() != null && result.getOutput().trim().equals(level.getExpectedOutput().trim())) {
            progressService.markCompleted(user, level, 100);
            return ResponseEntity.ok(new SubmitResponse(true, "¡Nivel superado!", result.getOutput()));
        } else {
            progressService.incrementAttempts(user, level);
            return ResponseEntity.ok(new SubmitResponse(false, result.getMessage(), result.getOutput()));
        }
    }
}