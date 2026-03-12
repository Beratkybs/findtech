package com.fintech.service;

import com.fintech.dto.PortfolioDTO;
import com.fintech.entities.Portfolio;

public interface IPortfolioService {
     Portfolio addResource(PortfolioDTO dto);
}
