package com.fintech.controller;

import com.fintech.dto.PortfolioDTO;
import com.fintech.entities.Portfolio;
import org.springframework.http.ResponseEntity;


public interface IPortfolioController {
     ResponseEntity<Portfolio> addPurchase(PortfolioDTO dto);
}
