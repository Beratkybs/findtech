package com.fintech.service.impl;


import com.fintech.dto.MarketDataDTO;
import com.fintech.entities.Asset;
import com.fintech.entities.MarketData;
import com.fintech.repository.AssetRepository;
import com.fintech.repository.MarketDataRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class FinanceService {

    private final AssetRepository assetRepository;
    private final MarketDataRepository marketDataRepository;

    // Fiyatı manuel güncelle
    @Transactional
    public MarketData updatePrice(String symbol, BigDecimal price, BigDecimal dailyChange) {

        // Asset yoksa otomatik oluştur
        Asset asset = assetRepository.findBySymbol(symbol)
                .orElseGet(() -> {
                    Asset newAsset = new Asset();
                    newAsset.setSymbol(symbol);
                    newAsset.setFullName(getFullName(symbol));
                    newAsset.setCategory(getCategory(symbol));
                    return assetRepository.save(newAsset);
                });

        MarketData marketData = marketDataRepository.findByAssetId(asset.getId())
                .orElse(new MarketData());

        marketData.setAsset(asset);
        marketData.setCurrentPrice(price);
        marketData.setDailyChange(dailyChange);
        marketData.setLastUpdated(LocalDateTime.now());

        return marketDataRepository.save(marketData);
    }

    public List<MarketDataDTO> getAllPrices() {
        return marketDataRepository.findAllByOrderByLastUpdatedDesc()
                .stream()
                .map(md -> {
                    MarketDataDTO dto = new MarketDataDTO();
                    dto.setSembol(md.getAsset().getSymbol());
                    dto.setVarlikAdi(md.getAsset().getFullName());
                    dto.setKategori(md.getAsset().getCategory());
                    dto.setGuncelFiyat(md.getCurrentPrice());
                    dto.setGunlukDegisim(md.getDailyChange());
                    dto.setSonGuncelleme(md.getLastUpdated());
                    return dto;
                }).toList();
    }

    public List<MarketDataDTO> getPricesByCategory(String category) {
        return marketDataRepository.findAllByAssetCategory(category)
                .stream()
                .map(md -> {
                    MarketDataDTO dto = new MarketDataDTO();
                    dto.setSembol(md.getAsset().getSymbol());
                    dto.setVarlikAdi(md.getAsset().getFullName());
                    dto.setKategori(md.getAsset().getCategory());
                    dto.setGuncelFiyat(md.getCurrentPrice());
                    dto.setGunlukDegisim(md.getDailyChange());
                    dto.setSonGuncelleme(md.getLastUpdated());
                    return dto;
                }).toList();
    }

    // Sembolden isim üret
    private String getFullName(String symbol) {
        return switch (symbol.toUpperCase()) {
            case "GA"     -> "Gram Altın";
            case "C"      -> "Çeyrek Altın";
            case "Y"      -> "Yarım Altın";
            case "T"      -> "Tam Altın";
            case "CMR"    -> "Cumhuriyet Altını";
            case "USD"    -> "Amerikan Doları";
            case "EUR"    -> "Euro";
            case "BTC"    -> "Bitcoin";
            case "ETH"    -> "Ethereum";
            default       -> symbol;
        };
    }

    // Sembolden kategori belirle
    private String getCategory(String symbol) {
        return switch (symbol.toUpperCase()) {
            case "GA", "C", "Y", "T", "CMR" -> "GOLD";
            case "USD", "EUR", "GBP"         -> "CURRENCY";
            case "BTC", "ETH", "BNB"         -> "CRYPTO";
            default                           -> "OTHER";
        };
    }


    }

