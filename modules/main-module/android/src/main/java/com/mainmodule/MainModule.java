package com.mainmodule;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Promise;

public class MainModule extends ReactContextBaseJavaModule {
    public MainModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "MainModule";
    }

    @ReactMethod
    public void hello(Promise promise) {
        promise.resolve("Hello from MainModule!");
    }

    @ReactMethod
    public void setValueAsync(String value, Promise promise) {
        // 这里可以添加保存值的逻辑
        promise.resolve(null);
    }
} 