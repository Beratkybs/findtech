package com.fintech.dto;

import lombok.Data;

@Data
public class GoldResultDTO {
    private String symbol;   // GA, C, Y, T, CMR
    private String fullName; // Gram Altın, Çeyrek Altın...
    private String satis;    // satış fiyatı
    private String alis;     // alış fiyatı
    private String degisim;  // değişim %
}

