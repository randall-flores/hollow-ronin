# Split hollow-ronin mockups into two products: hollow (black) + ronin (white).
# Idempotent: skips files already present at the destination.

$ErrorActionPreference = "Stop"

$srcBlack = "public/mockups/hollow-ronin/black"
$srcWhite = "public/mockups/hollow-ronin/white"
$dstHollow = "public/mockups/hollow/black"
$dstRonin  = "public/mockups/ronin/white"

New-Item -ItemType Directory -Force -Path $dstHollow | Out-Null
New-Item -ItemType Directory -Force -Path $dstRonin  | Out-Null

# hollow-ronin/black/* -> hollow/black/* with slug rename
Get-ChildItem -Path $srcBlack -File | ForEach-Object {
  $newName = $_.Name -replace '^tee-hollow-ronin-', 'tee-hollow-'
  $target  = Join-Path $dstHollow $newName
  Copy-Item $_.FullName $target -Force
  Write-Host "  $($_.Name)  ->  $target"
}

# hollow-ronin/white/* -> ronin/white/* with slug rename
Get-ChildItem -Path $srcWhite -File | ForEach-Object {
  $newName = $_.Name -replace '^tee-hollow-ronin-', 'tee-ronin-'
  $target  = Join-Path $dstRonin $newName
  Copy-Item $_.FullName $target -Force
  Write-Host "  $($_.Name)  ->  $target"
}

# Drop the original folder once mirrored.
Remove-Item -Recurse -Force "public/mockups/hollow-ronin"

Write-Host ""
Write-Host "Done. New folders:"
Get-ChildItem -Path $dstHollow | Select-Object -ExpandProperty Name
Write-Host "---"
Get-ChildItem -Path $dstRonin  | Select-Object -ExpandProperty Name
