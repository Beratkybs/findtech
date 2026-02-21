package com.fintech.controller;

import com.fintech.dto.GoldResultDTO;
import com.fintech.entities.MarketData;
import com.fintech.repostory.MarketDataRepository;
import com.fintech.services.FinanceService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/rest/api") // API versiyonlaması önemlidir
public class FinanceController {

    @Autowired
    private FinanceService financeService;

    @GetMapping("/market-summary")
    public void getAllMarketData() {
        financeService.syncGoldData();
    }

}
