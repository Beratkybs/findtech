package com.fintech.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "portfolio")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Portfolio {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "client_id")
    private Client client;

    @Column(name = "asset_symbol")
    private String assetSymbol;      // GA, USD, EUR, BTC...

    @Column(name = "asset_name")
    private String assetName;        // Gram Altın, Dolar...

    private String category;         // GOLD, CURRENCY, STOCK, CRYPTO

    private BigDecimal quantity;     // Kaç adet/gram aldın

    @Column(name = "purchase_price")
    private BigDecimal purchasePrice;     // Alış fiyatı

    @Column(name = "purchase_date")
    private LocalDateTime purchaseDate;   // Alış tarihi

    private String notes;            // Opsiyonel not
}