package com.fintech.repository;

import com.fintech.entities.MarketData;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MarketDataRepository extends JpaRepository<MarketData, Long> {

    Optional<MarketData> findByAssetId(Long id);
    List<MarketData> findAllByAssetCategory(String category);
    List<MarketData> findAllByOrderByLastUpdatedDesc();
}

