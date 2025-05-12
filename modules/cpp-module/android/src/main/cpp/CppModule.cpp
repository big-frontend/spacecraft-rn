#include <jni.h>
#include <string>
#include <cmath>
#include "CppModule.h"

extern "C" {

JNIEXPORT jstring JNICALL
Java_com_cppmodule_CppModule_processData(JNIEnv *env, jobject thiz, jstring input) {
    const char *inputStr = env->GetStringUTFChars(input, nullptr);
    std::string result = CppModule::processData(inputStr);
    env->ReleaseStringUTFChars(input, inputStr);
    return env->NewStringUTF(result.c_str());
}

JNIEXPORT jdouble JNICALL
Java_com_cppmodule_CppModule_calculateValue(JNIEnv *env, jobject thiz, jdouble x, jdouble y, jdouble z) {
    // 调用 C++ 实现计算三维向量的模长
    double sum = x * x + y * y + z * z;
    return std::sqrt(sum);
}

} // extern "C" 