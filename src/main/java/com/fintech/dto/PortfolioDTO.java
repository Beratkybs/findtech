package com.fintech.dto;

import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
public class PortfolioDTO {
    private Long userId;              // ← EKLENDİ
    private String assetSymbol;       // "GA", "USD", "BTC"
    private BigDecimal quantity;      // 5.5 (gram, adet vs)
    private BigDecimal buyPrice;      // 6800.00
    private LocalDateTime buyDate;
    private String notes;
}