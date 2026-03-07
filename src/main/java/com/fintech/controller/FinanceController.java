package com.fintech.controller;


import com.fintech.dto.MarketDataDTO;
import com.fintech.entities.MarketData;
import com.fintech.services.FinanceService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/rest/api/finance")
@RequiredArgsConstructor
public class FinanceController {

    private final FinanceService financeService;

    // Manuel fiyat güncelle
    @PostMapping("/update-price")
    public ResponseEntity<MarketData> updatePrice(@RequestBody Map<String, String> body) {
        String symbol = body.get("symbol");
        BigDecimal price = new BigDecimal(body.get("price"));
        BigDecimal dailyChange = new BigDecimal(body.get("dailyChange"));
        return ResponseEntity.ok(financeService.updatePrice(symbol, price, dailyChange));
    }

    // Tüm fiyatlar
    @GetMapping("/prices")
    public ResponseEntity<List<MarketDataDTO>> getAllPrices() {
        return ResponseEntity.ok(financeService.getAllPrices());
    }

    @GetMapping("/prices/{category}")
    public ResponseEntity<List<MarketDataDTO>> getPricesByCategory(@PathVariable String category) {
        return ResponseEntity.ok(financeService.getPricesByCategory(category));
    }
}
