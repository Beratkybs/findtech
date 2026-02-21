package com.fintech.repostory;

import com.fintech.entities.Asset;
import com.fintech.entities.MarketData;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface MarketDataRepository extends JpaRepository<MarketData, Long> {

    // Belirli bir kategoriye ait tüm güncel piyasa verilerini getirir
    // Asset tablosuyla Join işlemi yaparak filtreleme yapar
    List<MarketData> findAllByAssetCategory(String category);

    // En son güncellenen verileri başa alacak şekilde listeleme
    List<MarketData> findAllByOrderByLastUpdatedDesc();

    Optional<MarketData> findByAssetId(Long id);
}
