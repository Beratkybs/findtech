package com.fintech.service.impl;

import com.fintech.dto.PortfolioDTO;
import com.fintech.entities.Asset;
import com.fintech.entities.Client;
import com.fintech.entities.MarketData;
import com.fintech.entities.Portfolio;
import com.fintech.repository.AssetRepository;
import com.fintech.repository.ClientRepository;
import com.fintech.repository.MarketDataRepository;
import com.fintech.repository.PortfolioRepository;
import com.fintech.service.IPortfolioService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDateTime;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class PortfolioServiceImpl implements IPortfolioService {

    @Autowired
    private PortfolioRepository portfolioRepository;

    @Autowired
    private MarketDataRepository marketDataRepository;

    @Autowired
    private AssetRepository assetRepository;

    @Autowired
    private ClientRepository clientRepository;


    @Override
    @Transactional
    public Portfolio addPurchase(PortfolioDTO dto) {
        Client client = clientRepository.findById(dto.getClientId())
                .orElseThrow(() -> new RuntimeException("Client not found"));

        Portfolio p = new Portfolio();

        p.setAssetSymbol(dto.getAssetSymbol().toUpperCase());
        p.setClient(client);
        p.setQuantity(dto.getQuantity());
        p.setPurchasePrice(dto.getPurchasePrice());
        p.setPurchaseDate(dto.getPurchaseDate() != null ? dto.getPurchaseDate() : LocalDateTime.now());
        p.setNotes(dto.getNotes());
        p.setAssetName(dto.getAssetName());
        p.setCategory(dto.getCategory());

        return portfolioRepository.save(p);
    }


    public Map<String, Object> calculateProfitLoss(Long portfolioId, Long clientId) {
        Portfolio p = portfolioRepository.findByIdAndClientId(portfolioId, clientId)  // ← userId kontrolü
                .orElseThrow(() -> new RuntimeException("Kayıt bulunamadı"));

        Asset asset = assetRepository.findBySymbol(p.getAssetSymbol())
                .orElseThrow(() -> new RuntimeException("Asset bulunamadı: " + p.getAssetSymbol()));

        MarketData marketData = marketDataRepository.findByAssetId(asset.getId())
                .orElseThrow(() -> new RuntimeException("Piyasa verisi bulunamadı"));

        BigDecimal currentPrice = marketData.getCurrentPrice();
        BigDecimal buyPrice = p.getPurchasePrice();
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
        result.put("alışTarihi", p.getPurchaseDate());
        result.put("güncelFiyat", currentPrice);
        result.put("toplamMaliyet", totalCost);
        result.put("güncelDeğer", currentValue);
        result.put("karZarar", profitLoss);
        result.put("karZararYüzdesi", profitLossPercent);
        result.put("durum", profitLoss.compareTo(BigDecimal.ZERO) >= 0 ? "KAR ✅" : "ZARAR ❌");

        return result;
    }

    // Kullanıcının tüm portföyü
    public List<Portfolio> getUserPortfolio(Long clientId) {
        return portfolioRepository.findByClientId(clientId);
    }

    // Tüm portföy (admin için)
    public List<Portfolio> getAllPortfolio() {
        return portfolioRepository.findAll();
    }
}