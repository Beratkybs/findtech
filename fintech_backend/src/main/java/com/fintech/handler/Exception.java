package com.fintech.handler;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Exception<T> {
    private T message;

    private String path;

    private String hostName;

    private Date createTime;
}
