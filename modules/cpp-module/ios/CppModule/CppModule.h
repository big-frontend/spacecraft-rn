#ifndef CppModule_h
#define CppModule_h

#include <string>

class CppModule {
public:
    static std::string processData(const std::string& input);
    static double calculateValue(double x, double y, double z);
};

#endif /* CppModule_h */ 