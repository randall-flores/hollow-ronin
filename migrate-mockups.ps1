# ============================================================================
# HOLLOW RONIN -- Mockup Migration Script (v3)
# ----------------------------------------------------------------------------
# Step 0: Fix .png.png double extensions
# Step 1: Create slug/color folders for all 13 characters
# Step 2: Move flat files from /public/mockups/ into the right subfolder
# Step 3: Drain legacy slug-color folders
# Step 4: Drain "Hollow Ronin" folder
# Step 5: Rename protagonist sigil to mon-hollow-ronin-transparent.png
#
# USAGE (run from project root, where /public/ lives):
#   Dry run:  .\migrate-mockups.ps1
#   Execute:  .\migrate-mockups.ps1 -Execute
#
# Idempotent. Safe to run multiple times.
# ============================================================================

param(
    [switch]$Execute
)

$ErrorActionPreference = 'Stop'
$mockupsDir = 'public/mockups'
$sigilsDir  = 'public/sigils'

$characters = @(
    @{ slug = 'hollow-ronin';                       colors = @('black','white') }
    @{ slug = 'ryujin-dragon-vow';                  colors = @('black') }
    @{ slug = 'hone-no-chikai-bone-vow';            colors = @('black') }
    @{ slug = 'karada-nashi-hollow-warrior';        colors = @('black') }
    @{ slug = 'arashi-maru-stormchild';             colors = @('black','white') }
    @{ slug = 'akuma-no-ikari-mask-of-wrath';       colors = @('black') }
    @{ slug = 'namida-no-oni-mask-of-mourning';     colors = @('black') }
    @{ slug = 'saigo-no-sabaki-mask-of-reckoning';  colors = @('black') }
    @{ slug = 'mu-no-kamen-mask-of-stillness';      colors = @('black') }
    @{ slug = 'kurokitsune-vow-keeper';             colors = @('black') }
    @{ slug = 'yurei-ghost';                        colors = @('black') }
    @{ slug = 'karasu-tengu-sentinel';              colors = @('black','white') }
    @{ slug = 'shinigami-reaper';                   colors = @('black') }
)

if ($Execute) { $mode = 'EXECUTE' } else { $mode = 'DRY RUN' }

Write-Host ''
Write-Host '==================================================' -ForegroundColor Cyan
Write-Host ('  HOLLOW RONIN MOCKUP MIGRATION -- ' + $mode) -ForegroundColor Cyan
Write-Host '==================================================' -ForegroundColor Cyan
Write-Host ''

if (-not (Test-Path $mockupsDir)) {
    Write-Host 'ERROR: public/mockups not found. Run from project root.' -ForegroundColor Red
    exit 1
}

function Do-Action {
    param([string]$Description, [scriptblock]$Action)
    Write-Host ('  ' + $Description)
    if ($Execute) { & $Action }
}

# --- Step 0: Fix .png.png double extensions ---------------------------------
Write-Host '[0/5] Fixing .png.png double extensions...' -ForegroundColor Yellow
$doubleExtFixed = 0
foreach ($dir in @($mockupsDir, $sigilsDir)) {
    if (-not (Test-Path $dir)) { continue }
    $doubles = Get-ChildItem -Path $dir -Filter '*.png.png' -File -Recurse -ErrorAction SilentlyContinue
    foreach ($file in $doubles) {
        $newName = $file.Name -replace '\.png\.png$', '.png'
        $dest = Join-Path $file.Directory.FullName $newName
        if (-not (Test-Path $dest)) {
            Do-Action ('fix     ' + $file.Name + ' -> ' + $newName) {
                Rename-Item -Path $file.FullName -NewName $newName
            }
            $doubleExtFixed++
        } else {
            Write-Host ('  SKIP: ' + $newName + ' already exists') -ForegroundColor Yellow
        }
    }
}
Write-Host ('  Total: ' + $doubleExtFixed) -ForegroundColor DarkGray
Write-Host ''

# --- Step 1: Create target folders ------------------------------------------
Write-Host '[1/5] Creating target folders...' -ForegroundColor Yellow
foreach ($char in $characters) {
    foreach ($color in $char.colors) {
        $target = Join-Path $mockupsDir ($char.slug + '/' + $color)
        if (-not (Test-Path $target)) {
            Do-Action ('create  ' + $target) {
                New-Item -ItemType Directory -Force -Path $target | Out-Null
            }
        }
    }
}
Write-Host ''

# --- Step 2: Move flat files from root mockups/ -----------------------------
Write-Host '[2/5] Moving flat files from public/mockups/...' -ForegroundColor Yellow
$movedRoot = 0
foreach ($char in $characters) {
    foreach ($color in $char.colors) {
        $target  = Join-Path $mockupsDir ($char.slug + '/' + $color)
        $pattern = 'tee-' + $char.slug + '-*-' + $color + '*.png'
        $rootFiles = Get-ChildItem -Path $mockupsDir -Filter $pattern -File -ErrorAction SilentlyContinue
        foreach ($file in $rootFiles) {
            $dest = Join-Path $target $file.Name
            if (-not (Test-Path $dest)) {
                Do-Action ('move    ' + $file.Name + ' -> ' + $char.slug + '/' + $color + '/') {
                    Move-Item -Path $file.FullName -Destination $dest
                }
                $movedRoot++
            }
        }
    }
}
Write-Host ('  Total: ' + $movedRoot) -ForegroundColor DarkGray
Write-Host ''

# --- Step 3: Drain legacy slug-color folders --------------------------------
Write-Host '[3/5] Draining legacy slug-color folders...' -ForegroundColor Yellow
$drainedLegacy = 0
foreach ($char in $characters) {
    foreach ($color in $char.colors) {
        $target    = Join-Path $mockupsDir ($char.slug + '/' + $color)
        $oldFolder = Join-Path $mockupsDir ($char.slug + '-' + $color)
        if (Test-Path $oldFolder) {
            $files = Get-ChildItem -Path $oldFolder -Filter '*.png' -File
            foreach ($file in $files) {
                $dest = Join-Path $target $file.Name
                if (-not (Test-Path $dest)) {
                    Do-Action ('move    ' + $file.Name + ' -> ' + $char.slug + '/' + $color + '/') {
                        Move-Item -Path $file.FullName -Destination $dest
                    }
                    $drainedLegacy++
                }
            }
            if ($Execute -and (Get-ChildItem $oldFolder -ErrorAction SilentlyContinue).Count -eq 0) {
                Remove-Item $oldFolder
                Write-Host ('  remove  empty folder: ' + $oldFolder) -ForegroundColor DarkGray
            }
        }
    }
}
Write-Host ('  Total: ' + $drainedLegacy) -ForegroundColor DarkGray
Write-Host ''

# --- Step 4: Drain Hollow Ronin folder --------------------------------------
Write-Host '[4/5] Draining Hollow Ronin folder...' -ForegroundColor Yellow
$hollowRoninFolders = Get-ChildItem -Path $mockupsDir -Directory -ErrorAction SilentlyContinue |
    Where-Object { $_.Name -match '^hollow[- ]?ronin$' -and $_.Name -ne 'hollow-ronin' }
$drainedProtagonist = 0
foreach ($folder in $hollowRoninFolders) {
    $files = Get-ChildItem -Path $folder.FullName -Filter '*.png' -File -Recurse
    foreach ($file in $files) {
        if ($file.Name -match '-white') { $color = 'white' } else { $color = 'black' }
        $target = Join-Path $mockupsDir ('hollow-ronin/' + $color)
        $dest = Join-Path $target $file.Name
        if (-not (Test-Path $dest)) {
            Do-Action ('move    ' + $file.Name + ' -> hollow-ronin/' + $color + '/') {
                Move-Item -Path $file.FullName -Destination $dest
            }
            $drainedProtagonist++
        }
    }
    if ($Execute -and (Get-ChildItem $folder.FullName -Recurse -ErrorAction SilentlyContinue).Count -eq 0) {
        Remove-Item $folder.FullName -Recurse
        Write-Host ('  remove  ' + $folder.FullName) -ForegroundColor DarkGray
    }
}
Write-Host ('  Total: ' + $drainedProtagonist) -ForegroundColor DarkGray
Write-Host ''

# --- Step 5: Rename protagonist sigil ---------------------------------------
Write-Host '[5/5] Renaming protagonist sigil...' -ForegroundColor Yellow
$oldSigil = Join-Path $sigilsDir 'mon-hollow-ronin.png'
$newSigil = Join-Path $sigilsDir 'mon-hollow-ronin-transparent.png'
if ((Test-Path $oldSigil) -and (-not (Test-Path $newSigil))) {
    Do-Action 'rename  mon-hollow-ronin.png -> mon-hollow-ronin-transparent.png' {
        Rename-Item -Path $oldSigil -NewName 'mon-hollow-ronin-transparent.png'
    }
} elseif (Test-Path $newSigil) {
    Write-Host '  already correct' -ForegroundColor DarkGray
} else {
    Write-Host '  WARN: mon-hollow-ronin.png not found' -ForegroundColor Yellow
}
Write-Host ''

# --- Verification -----------------------------------------------------------
Write-Host '==================================================' -ForegroundColor Cyan
Write-Host '  VERIFICATION' -ForegroundColor Cyan
Write-Host '==================================================' -ForegroundColor Cyan

foreach ($char in $characters) {
    foreach ($color in $char.colors) {
        $target = Join-Path $mockupsDir ($char.slug + '/' + $color)
        $count = (Get-ChildItem $target -Filter '*.png' -File -ErrorAction SilentlyContinue).Count
        $label = '  ' + $char.slug + '/' + $color + ' : ' + $count + '/8 files'
        if ($count -eq 8) {
            Write-Host ('  [OK]' + $label) -ForegroundColor Green
        } else {
            Write-Host ('  [!!]' + $label) -ForegroundColor Yellow
        }
    }
}

$orphans = Get-ChildItem -Path $mockupsDir -Filter '*.png' -File -ErrorAction SilentlyContinue
if ($orphans.Count -gt 0) {
    Write-Host ''
    Write-Host ('  WARNING: ' + $orphans.Count + ' orphan PNG file(s) still in public/mockups/:') -ForegroundColor Yellow
    foreach ($o in $orphans) { Write-Host ('    ' + $o.Name) -ForegroundColor Yellow }
}

$crufFolders = Get-ChildItem -Path $mockupsDir -Directory -ErrorAction SilentlyContinue |
    Where-Object {
        $name = $_.Name
        $isCharFolder = $characters | Where-Object { $_.slug -eq $name }
        -not $isCharFolder
    }
if ($crufFolders.Count -gt 0) {
    Write-Host ''
    Write-Host '  WARNING: Unrecognized folders (review manually):' -ForegroundColor Yellow
    foreach ($f in $crufFolders) {
        $count = (Get-ChildItem $f.FullName -Recurse -File -ErrorAction SilentlyContinue).Count
        Write-Host ('    ' + $f.Name + '  (' + $count + ' files)') -ForegroundColor Yellow
    }
}

Write-Host ''
if ($Execute) {
    Write-Host 'Migration complete.' -ForegroundColor Green
} else {
    Write-Host 'Dry run complete. Re-run with -Execute to apply changes.' -ForegroundColor Cyan
}
Write-Host ''
