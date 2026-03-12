package com.fintech.controller.base;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class RootEntity<T> {
    private Boolean result;

    private String errorMessage;

    private T data;

    public static <T> RootEntity<T> ok(T data) {
        RootEntity<T> entity = new RootEntity<T>();
        entity.setData(data);
        entity.setResult(true);
        entity.setErrorMessage(null);
        return entity;
    }

    public static <T> RootEntity<T> error(String errorMessage) {
        RootEntity<T> entity = new RootEntity<T>();
        entity.setData(null);
        entity.setResult(false);
        entity.setErrorMessage(errorMessage);
        return entity;
    }
}
