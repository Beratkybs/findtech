package com.fintech.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "assets")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Asset {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String symbol; // Örn: GRAM_ALTIN, BTC, THYAO

    @Column(name="full_name", nullable = false)
    private String fullName; // Örn: Gram Altın, Bitcoin, Türk Hava Yolları

    @Column(nullable = false)
    private String category; // Örn: GOLD, CRYPTO, BIST100

    @Column(name = "asset_rank")
    private Integer rank; // Alt/Üst coin ayrımı veya popülerlik sırası için
}
