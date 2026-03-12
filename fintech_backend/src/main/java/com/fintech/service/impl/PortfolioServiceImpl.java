package com.fintech.service.impl;

import com.fintech.dto.PortfolioDTO;
import com.fintech.entities.Portfolio;
import com.fintech.entities.user.User;
import com.fintech.exception.BaseException;
import com.fintech.exception.ErrorMessage;
import com.fintech.exception.MessageType;
import com.fintech.repository.*;
import com.fintech.service.IPortfolioService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class PortfolioServiceImpl implements IPortfolioService {

    @Autowired
    private PortfolioRepository portfolioRepository;

    @Autowired
    private UserRepository userRepository;


    @Override
    @Transactional
    public Portfolio addResource(PortfolioDTO dto) {
        User user = userRepository.findById(dto.getClientId())
                .orElseThrow(() -> new BaseException(new ErrorMessage(MessageType.KULLANCI_BULUNAMADI)));

        Portfolio p = new Portfolio();

        p.setAssetSymbol(dto.getAssetSymbol().toUpperCase());
        p.setUser(user);
        p.setQuantity(dto.getQuantity());
        p.setPurchasePrice(dto.getPurchasePrice());
        p.setPurchaseDate(dto.getPurchaseDate() != null ? dto.getPurchaseDate() : LocalDateTime.now());
        p.setNotes(dto.getNotes());
        p.setAssetName(dto.getAssetName());
        p.setCategory(dto.getCategory());

        return portfolioRepository.save(p);
    }

}