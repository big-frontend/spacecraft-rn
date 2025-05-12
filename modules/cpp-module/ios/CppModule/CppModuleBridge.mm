#import <React/RCTBridgeModule.h>
#import "CppModule.h"

@interface RCT_EXTERN_MODULE(CppModule, NSObject)

RCT_EXTERN_METHOD(processData:(NSString *)input
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(calculateValue:(double)x
                  y:(double)y
                  z:(double)z
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)

@end 