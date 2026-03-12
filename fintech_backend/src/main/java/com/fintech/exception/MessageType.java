package com.fintech.exception;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public enum MessageType {
    KULLANCI_BULUNAMADI(1001, "Kullanıcı Bulunumadı!"),
    KULLANCI_MEVCUT(1002, "Kullanıcı Mevcut!"),
    SIFRE_KARAKTER_YETERSIZ(1003, "Şifre En az 6 karakter içermeli!"),
    SIFRE_HATALI(1004, "Şifreniz Hatalı!");


    private Integer code;

    private String message;

    MessageType(Integer code, String message) {
        this.code = code;
        this.message = message;
    }

}
