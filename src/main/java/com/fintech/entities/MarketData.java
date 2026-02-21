package com.fintech.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "market_data")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class MarketData {

    @Id
    private Long assetId;

    @OneToOne
    @MapsId // MarketData'nın ID'sini Asset'in ID'si ile eşler
    @JoinColumn(name = "asset_id")
    private Asset asset;

    @Column(name="current_price", precision = 19, scale = 4)
    private BigDecimal currentPrice; // Finansal hassasiyet için BigDecimal kullanımı şarttır

    @Column(name="daily_change", precision = 10, scale = 2)
    private BigDecimal dailyChange; // Günlük yüzde değişim

    @Column(name="last_updated")
    private LocalDateTime lastUpdated; // Verinin API'den çekildiği son an

}
