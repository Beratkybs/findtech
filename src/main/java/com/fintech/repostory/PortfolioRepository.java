package com.fintech.repostory;

import com.fintech.entities.Portfolio;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PortfolioRepository extends JpaRepository<Portfolio, Long> {

    List<Portfolio> findByCategory(String category);
    List<Portfolio> findByAssetSymbol(String symbol);

    // ← BUNLARI EKLE
    List<Portfolio> findByUserId(Long userId);
    List<Portfolio> findByUserIdAndCategory(Long userId, String category);
    Optional<Portfolio> findByIdAndUserId(Long id, Long userId);
}