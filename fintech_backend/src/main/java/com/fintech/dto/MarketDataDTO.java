package com.fintech.dto;

import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
public class MarketDataDTO {
    private String sembol;
    private String varlikAdi;
    private String kategori;
    private BigDecimal guncelFiyat;
    private BigDecimal gunlukDegisim;
    private LocalDateTime sonGuncelleme;
}