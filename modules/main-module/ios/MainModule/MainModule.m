#import "MainModule.h"

@implementation MainModule

EX_EXPORT_MODULE(MainModule);

- (NSDictionary *)constantsToExport
{
    return @{
        @"PI": @(M_PI)
    };
}

EX_EXPORT_METHOD_AS(hello,
                    hello:(EXPromiseResolveBlock)resolve
                    rejecter:(EXPromiseRejectBlock)reject)
{
    resolve(@"Hello from MainModule!");
}

EX_EXPORT_METHOD_AS(setValueAsync,
                    setValueAsync:(NSString *)value
                    resolver:(EXPromiseResolveBlock)resolve
                    rejecter:(EXPromiseRejectBlock)reject)
{
    // 这里可以添加保存值的逻辑
    resolve(nil);
}

@end 