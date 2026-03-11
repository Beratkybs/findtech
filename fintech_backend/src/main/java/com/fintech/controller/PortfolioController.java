package com.fintech.controller;

import com.fintech.dto.PortfolioDTO;
import com.fintech.entities.Portfolio;
import com.fintech.service.impl.PortfolioServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/rest/api/portfolio")
public class PortfolioController {

    @Autowired
    private PortfolioServiceImpl portfolioService;

    // Alım ekle
    @PostMapping("/add")
    public ResponseEntity<Portfolio> addPurchase(@RequestBody PortfolioDTO dto) {
        return ResponseEntity.ok(portfolioService.addPurchase(dto));
    }

    // Kar/zarar hesapla - userId path'ten alınıyor
    @GetMapping("/profit-loss/{userId}/{id}")
    public ResponseEntity<Map<String, Object>> getProfitLoss(
            @PathVariable Long userId,
            @PathVariable Long id) {
        return ResponseEntity.ok(portfolioService.calculateProfitLoss(id, userId));
    }

    // Kullanıcının kendi portföyü
    @GetMapping("/my/{userId}")
    public ResponseEntity<List<Portfolio>> getUserPortfolio(@PathVariable Long userId) {
        return ResponseEntity.ok(portfolioService.getUserPortfolio(userId));
    }

    // Tüm portföy (admin)
    @GetMapping("/all")
    public ResponseEntity<List<Portfolio>> getAll() {
        return ResponseEntity.ok(portfolioService.getAllPortfolio());
    }
}
