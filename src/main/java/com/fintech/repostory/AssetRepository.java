package com.fintech.repostory;

import com.fintech.entities.Asset;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;
import java.util.List;

@Repository
public interface AssetRepository extends JpaRepository<Asset, Long> {

    // Belirli bir sembole (örn: "XAU_TRY") göre varlığı getirir
    Optional<Asset> findBySymbol(String symbol);

    // Kategoriye göre (örn: "GOLD", "CRYPTO") varlıkları listeler
    List<Asset> findByCategory(String category);

    // Belirli bir sembolün var olup olmadığını kontrol eder
    boolean existsBySymbol(String symbol);

}
