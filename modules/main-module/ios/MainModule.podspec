require 'json'

package = JSON.parse(File.read(File.join(__dir__, '..', 'package.json')))

Pod::Spec.new do |s|
  s.name         = 'MainModule'
  s.version      = package['version']
  s.summary      = package['description']
  s.homepage     = 'https://example.com'
  s.license      = package['license']
  s.author       = package['author']
  s.platforms    = { ios: '13.0' }
  s.source       = { git: 'https://example.com', tag: s.version.to_s }

  s.source_files = 'MainModule/**/*.{h,m,mm,cpp}'
  s.dependency 'ExpoModulesCore'
end

