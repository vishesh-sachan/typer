// swift-tools-version: 5.9
import PackageDescription

let package = Package(
    name: "typer",
    platforms: [
        .macOS(.v12)
    ],
    targets: [
        .executableTarget(
            name: "typer"
        )
    ]
)
