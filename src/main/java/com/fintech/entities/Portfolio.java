package com.fintech.entities;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "portfolio")
@Data
@NoArgsConstructor
public class Portfolio {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long userId;             // ← EKLENDİ, hangi kullanıcının alımı

    private String assetSymbol;      // GA, USD, EUR, BTC...
    private String assetName;        // Gram Altın, Dolar...
    private String category;         // GOLD, CURRENCY, STOCK, CRYPTO

    private BigDecimal quantity;     // Kaç adet/gram aldın
    private BigDecimal buyPrice;     // Alış fiyatı
    private LocalDateTime buyDate;   // Alış tarihi

    private String notes;            // Opsiyonel not
}