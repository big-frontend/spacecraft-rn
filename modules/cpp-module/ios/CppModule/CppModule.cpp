#include "CppModule.h"
#include <cmath>

std::string CppModule::processData(const std::string& input) {
    // Example implementation
    return "Processed: " + input;
}

double CppModule::calculateValue(double x, double y, double z) {
    // 计算三维向量的模长
    double sum = x * x + y * y + z * z;
    return std::sqrt(sum);
} 