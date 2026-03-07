package com.fintech.services;

import com.fintech.dto.PortfolioDTO;
import com.fintech.entities.Asset;
import com.fintech.entities.MarketData;
import com.fintech.entities.Portfolio;
import com.fintech.repostory.AssetRepository;
import com.fintech.repostory.MarketDataRepository;
import com.fintech.repostory.PortfolioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDateTime;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class PortfolioService {

    private final PortfolioRepository portfolioRepository;
    private final MarketDataRepository marketDataRepository;
    private final AssetRepository assetRepository;

    // Alım kaydet
    public Portfolio addPurchase(PortfolioDTO dto) {
        Portfolio p = new Portfolio();
        p.setUserId(dto.getUserId());                // ← EKLENDİ
        p.setAssetSymbol(dto.getAssetSymbol().toUpperCase());
        p.setQuantity(dto.getQuantity());
        p.setBuyPrice(dto.getBuyPrice());
        p.setBuyDate(dto.getBuyDate() != null ? dto.getBuyDate() : LocalDateTime.now());
        p.setNotes(dto.getNotes());

        assetRepository.findBySymbol(dto.getAssetSymbol().toUpperCase()).ifPresent(asset -> {
            p.setAssetName(asset.getFullName());
            p.setCategory(asset.getCategory());
        });

        return portfolioRepository.save(p);
    }

    // Kar/Zarar hesapla
    public Map<String, Object> calculateProfitLoss(Long portfolioId, Long userId) {
        Portfolio p = portfolioRepository.findByIdAndUserId(portfolioId, userId)  // ← userId kontrolü
                .orElseThrow(() -> new RuntimeException("Kayıt bulunamadı"));

        Asset asset = assetRepository.findBySymbol(p.getAssetSymbol())
                .orElseThrow(() -> new RuntimeException("Asset bulunamadı: " + p.getAssetSymbol()));

        MarketData marketData = marketDataRepository.findByAssetId(asset.getId())
                .orElseThrow(() -> new RuntimeException("Piyasa verisi bulunamadı"));

        BigDecimal currentPrice = marketData.getCurrentPrice();
        BigDecimal buyPrice = p.getBuyPrice();
        BigDecimal quantity = p.getQuantity();

        BigDecimal totalCost = buyPrice.multiply(quantity);
        BigDecimal currentValue = currentPrice.multiply(quantity);
        BigDecimal profitLoss = currentValue.subtract(totalCost);
        BigDecimal profitLossPercent = profitLoss
                .divide(totalCost, 4, RoundingMode.HALF_UP)
                .multiply(BigDecimal.valueOf(100));

        Map<String, Object> result = new LinkedHashMap<>();
        result.put("varlıkSembolü", p.getAssetSymbol());
        result.put("varlıkAdı", p.getAssetName());
        result.put("miktar", quantity);
        result.put("alışFiyatı", buyPrice);
        result.put("alışTarihi", p.getBuyDate());
        result.put("güncelFiyat", currentPrice);
        result.put("toplamMaliyet", totalCost);
        result.put("güncelDeğer", currentValue);
        result.put("karZarar", profitLoss);
        result.put("karZararYüzdesi", profitLossPercent);
        result.put("durum", profitLoss.compareTo(BigDecimal.ZERO) >= 0 ? "KAR ✅" : "ZARAR ❌");

        return result;
    }

    // Kullanıcının tüm portföyü
    public List<Portfolio> getUserPortfolio(Long userId) {
        return portfolioRepository.findByUserId(userId);  // ← userId'ye göre filtrele
    }

    // Tüm portföy (admin için)
    public List<Portfolio> getAllPortfolio() {
        return portfolioRepository.findAll();
    }
}