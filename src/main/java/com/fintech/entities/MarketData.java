package com.fintech.entities;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.NotFound;
import org.hibernate.annotations.NotFoundAction;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "market_data")
@Data
@NoArgsConstructor
public class MarketData {

    @Id
    private Long id;

    @OneToOne
    @MapsId
    @JoinColumn(name = "asset_id")
    @NotFound(action = NotFoundAction.IGNORE)  // ← EKLE
    private Asset asset;

    @Column(name = "current_price", precision = 19, scale = 4)
    private BigDecimal currentPrice;

    @Column(name = "daily_change", precision = 10, scale = 2)
    private BigDecimal dailyChange;

    @Column(name = "last_updated")
    private LocalDateTime lastUpdated;
}