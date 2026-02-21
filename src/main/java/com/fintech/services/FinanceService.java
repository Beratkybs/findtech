package com.fintech.services;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import com.fintech.dto.GoldResultDTO;
import com.fintech.entities.Asset;
import com.fintech.entities.MarketData;
import com.fintech.repostory.AssetRepository;
import com.fintech.repostory.MarketDataRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import tools.jackson.databind.JsonNode;
import tools.jackson.databind.ObjectMapper;


import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.*;

@Service
public class FinanceService {

    @Autowired
    private AssetRepository assetRepository;

    @Autowired
    private MarketDataRepository marketDataRepository;

    @Autowired
    private WebClient webClient;

    // Sembol → Tam isim eşleştirmesi
    private static final Map<String, String> GOLD_NAMES = Map.of(
            "GA",  "Gram Altın",
            "C",   "Çeyrek Altın",
            "Y",   "Yarım Altın",
            "T",   "Tam Altın",
            "CMR", "Cumhuriyet Altını"
    );

    @Transactional
    public void syncGoldData() {
        List<GoldResultDTO> externalData = fetchGoldFromApi();

        for (GoldResultDTO dto : externalData) {
            Asset asset = assetRepository.findBySymbol(dto.getSymbol())
                    .orElseGet(() -> {
                        Asset newAsset = new Asset();
                        newAsset.setSymbol(dto.getSymbol());
                        newAsset.setFullName(dto.getFullName());
                        newAsset.setCategory("GOLD");
                        return assetRepository.save(newAsset);
                    });

            MarketData marketData = marketDataRepository
                    .findByAssetId(asset.getId())
                    .orElseGet(() -> {
                        MarketData market = new MarketData();
                        market.setAsset(asset);
                        market.setCurrentPrice(BigDecimal.ZERO);
                        market.setLastUpdated(LocalDateTime.now());
                        market.setDailyChange(BigDecimal.ZERO);
                        return marketDataRepository.save(market);
                    });

            // Virgüllü sayıyı BigDecimal'e çevir: "3.050,40" → "3050.40"
            String priceClean = dto.getSatis()
                    .replace(".", "")
                    .replace(",", ".");

            String changeClean = dto.getDegisim()
                    .replace("%", "")
                    .replace(",", ".")
                    .trim();

            marketData.setAsset(asset);
            marketData.setCurrentPrice(new BigDecimal(priceClean));
            marketData.setDailyChange(new BigDecimal(changeClean));
            marketData.setLastUpdated(LocalDateTime.now());

            marketDataRepository.save(marketData);
        }
    }

    public List<GoldResultDTO> fetchGoldFromApi() {
        List<GoldResultDTO> list = new ArrayList<>();
        try {
            String json = webClient.get()
                    .uri("https://api.genelpara.com/json/?list=altin&sembol=all")
                    .header("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64)")
                    .header("Accept", "application/json")
                    .header("Referer", "https://www.genelpara.com/")
                    .retrieve()
                    .bodyToMono(String.class)
                    .block();

            System.out.println("Ham JSON: " + json); // kontrol için

            ObjectMapper mapper = new ObjectMapper();
            JsonNode root = mapper.readTree(json);
            JsonNode data = root.get("data"); // ← BUNU EKLEDİK

            GOLD_NAMES.forEach((symbol, fullName) -> {
                JsonNode node = data.get(symbol); // root değil data içinden al
                if (node != null) {
                    GoldResultDTO dto = new GoldResultDTO();
                    dto.setSymbol(symbol);
                    dto.setFullName(fullName);
                    dto.setSatis(node.get("satis").asText());
                    dto.setAlis(node.get("alis").asText());
                    dto.setDegisim(node.get("degisim").asText());
                    list.add(dto);
                    System.out.println("DTO oluştu: " + symbol + " - " + node.get("satis").asText());
                }
            });

        } catch (Exception e) {
            System.err.println("Altın verisi çekilirken hata: " + e.getMessage());
            e.printStackTrace();
        }
        return list;
    }

    @Scheduled(fixedRate = 1000) // 5 dakikada bir
    public void schedulePriceUpdate() {
        syncGoldData();
        System.out.println("Altın verileri güncellendi: " + LocalDateTime.now());
    }
}