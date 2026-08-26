package com.bugbuster.service;

import com.bugbuster.model.Level;
import org.springframework.stereotype.Service;

@Service
public class AgentService {
    public String getHint(Level level) {
        if (level == null) return "Nivel no encontrado.";
        return level.getHint() != null ? level.getHint() : "Pista: revisa la sintaxis y la lógica del método.";
    }
}