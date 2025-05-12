cmake_minimum_required(VERSION 3.4.1)

# 设置 C++ 标准
set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

# 添加源文件
add_library(cppmodule SHARED
            CppModule.cpp
            ../../ios/CppModule/CppModule.cpp)

# 包含头文件目录
target_include_directories(cppmodule PRIVATE
                         ${CMAKE_CURRENT_SOURCE_DIR}
                         ${CMAKE_CURRENT_SOURCE_DIR}/../../ios/CppModule)

# 链接必要的库
find_library(log-lib log)
target_link_libraries(cppmodule ${log-lib}) 