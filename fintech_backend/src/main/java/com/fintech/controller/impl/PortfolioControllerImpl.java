package com.fintech.controller.impl;

import com.fintech.controller.IPortfolioController;
import com.fintech.dto.PortfolioDTO;
import com.fintech.entities.Portfolio;
import com.fintech.service.impl.PortfolioServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/rest/api/portfolio")
public class PortfolioControllerImpl implements IPortfolioController {

    @Autowired
    private PortfolioServiceImpl portfolioService;


    @PostMapping("/add")
    @Override
    public ResponseEntity<Portfolio> addPurchase(@RequestBody PortfolioDTO dto) {
        return ResponseEntity.ok(portfolioService.addResource(dto));
    }

}
