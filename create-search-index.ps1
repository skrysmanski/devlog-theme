#!/usr/bin/env pwsh

$rootDir = [IO.Path]::GetFullPath("$PSScriptRoot/../..")
Write-Host "Using Hugo files from: $rootDir"

$pageFindDir = "$rootDir/static/pagefind"
if (Test-Path $pageFindDir) {
    Remove-Item $pageFindDir -Recurse -Force
}

$tempOutputDir = [IO.Path]::GetFullPath("$env:TEMP/hugo-temp/$([Guid]::NewGuid())")

& hugo --gc --cleanDestinationDir --source $rootDir --destination $tempOutputDir -D
if (-Not $?) {
    Write-Error 'hugo publish failed'
}

Push-Location './assets'
# See: https://pagefind.app/docs/running-pagefind/
& npx pagefind --site $tempOutputDir --output-path $pageFindDir
Pop-Location

Remove-Item $tempOutputDir -Recurse -Force
