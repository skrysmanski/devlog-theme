#!/usr/bin/env pwsh

$rootDir = [IO.Path]::GetFullPath("$PSScriptRoot/../../..")
Write-Host "Using Hugo files from: $rootDir"

$pageFindDir = "$rootDir/static/pagefind"
Remove-Item $pageFindDir -Recurse

$tempOutputDir = [IO.Path]::GetFullPath("$PSScriptRoot/../.publish-temp")

& hugo --gc --cleanDestinationDir --source $rootDir --destination $tempOutputDir -D

# See: https://pagefind.app/docs/running-pagefind/
& npx pagefind --site $tempOutputDir --output-path $pageFindDir
