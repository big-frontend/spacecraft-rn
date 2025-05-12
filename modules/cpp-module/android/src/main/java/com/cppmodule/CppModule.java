package com.cppmodule;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Promise;

public class CppModule extends ReactContextBaseJavaModule {
    private final ReactApplicationContext reactContext;

    public CppModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
    }

    @Override
    public String getName() {
        return "CppModule";
    }

    @ReactMethod
    public void processData(String input, Promise promise) {
        try {
            String result = processDataNative(input);
            promise.resolve(result);
        } catch (Exception e) {
            promise.reject("ERROR", e.getMessage());
        }
    }

    @ReactMethod
    public void calculateValue(double x, double y, double z, Promise promise) {
        try {
            double result = calculateValueNative(x, y, z);
            promise.resolve(result);
        } catch (Exception e) {
            promise.reject("ERROR", e.getMessage());
        }
    }

    private native String processDataNative(String input);
    private native double calculateValueNative(double x, double y, double z);

    static {
        System.loadLibrary("cppmodule");
    }
} 