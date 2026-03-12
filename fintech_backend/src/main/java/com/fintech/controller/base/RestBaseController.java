package com.fintech.controller.base;

public class RestBaseController {

    public <T>RootEntity<T> ok(T data) {
        return ok(data);
    }

    public <T>RootEntity<T> error(String message) {
        return error(message);
    }
}
