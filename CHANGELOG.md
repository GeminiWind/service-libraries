# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).


## [Unreleased]

## [0.1.1] - 16-03-2020

### Fixed

- Change mode to `644` for log files

## [0.1.0] - 12-03-2020

### Added

- Add `logger`
- Add `useInstrumentation` middleware

## [0.0.9] - 05-03-2020

### Fixed

- Donot parse origin response headers in `httpHandler` function

## [0.0.8] - 05-03-2020

### Added

- Added `Accept` & `Content-Type` into request headers in `StorageClient`

## [0.0.7] - 05-03-2020

### Added

- Patch `Accept` & `Content-Type` into response headers in `httpHandler` function

## [0.0.6] - 03-02-2020

### Changed

- Use `encodeURIComponent` to encode `query` option in `StorageClient - list` operation

## [0.0.5] - 03-12-2019

### Changed

- Changed endpoint of `registry-service` to host name. not `localhost`

## [0.0.4] - 03-12-2019

### Added

- Export `StorageClient`

## [0.0.3] - 29-11-2019

### Added

- Implement `schemaValidator`
- Implement `httpHandler`

## [0.0.2] - 28-11-2019

### Changed

- Update documentation in `README.md`
- Update method by changing in `storage-service`


## [0.0.1] - 28-11-2019

### Added

- Initial release

[0.0.4]: https://github.com/GeminiWind/service-libraries/compare/0.0.3...0.0.4
[0.0.3]: https://github.com/GeminiWind/service-libraries/compare/0.0.2...0.0.3
[0.0.2]: https://github.com/GeminiWind/service-libraries/compare/0.0.1...0.0.2
[0.0.1]: https://github.com/GeminiWind/service-libraries/releases/tag/0.0.1
