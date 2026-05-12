# ═══════════════════════════════════════════════════════════
# HOLLOW RONIN — Mockup Batch Rename (CORRECTED)
# ═══════════════════════════════════════════════════════════
# 
# Source filenames now match the ACTUAL Windows filenames
# (spaces + parentheses, not underscores).
#
# HOW TO RUN:
#   1. Save this file in your mockups folder
#   2. Right-click → "Run with PowerShell"
#   3. Window stays open at end so you can read results
#
# SAFE: Won't overwrite existing files. Won't delete anything.
# ═══════════════════════════════════════════════════════════

# Force the script to run from its own folder
Set-Location -Path $PSScriptRoot

$renameMap = @{

    # ─── NEW FLAT MOCKUP — Kitsune (white variant) ───
    "Back.png" = "tee-kitsune-nine-tails-back-white.png"

    # ─── PERSON 1 — Asian male, short hair ───
    "Person 1 Back (1).png"  = "tee-skeleton-ronin-redsun-back-black-model1.png"
    "Person 1 Back (2).png"  = "tee-cyber-oni-full-back-black-model1.png"
    "Person 1 Back (3).png"  = "tee-oni-samurai-dark-back-black-model1.png"
    "Person 1 Back (4).png"  = "tee-crow-warrior-ghost-back-white-model1.png"
    "Person 1 Back (5).png"  = "tee-crow-samurai-aerial-back-black-model1.png"
    "Person 1 Back (6).png"  = "tee-cyberpunk-ninja-neon-back-black-model1.png"
    "Person 1 Back (7).png"  = "tee-cyber-oni-clash-back-black-model1.png"
    "Person 1 Back (8).png"  = "tee-skeleton-samurai-kanji-back-black-model1.png"
    "Person 1 Back (9).png"  = "tee-dragon-red-sun-back-black-model1.png"
    "Person 1 Back (10).png" = "tee-kitsune-nine-tails-back-black-model1.png"
    "Person 1 Back (11).png" = "tee-kitsune-nine-tails-back-white-model1.png"
    "Person 1 Back (12).png" = "tee-crow-ronin-bloodmoon-back-white-model1.png"
    "Person 1 Back.png"      = "tee-crow-warrior-bloodmoon-dark-back-black-model1.png"
    "Person 1 Front.png"     = "tee-hollow-ronin-logo-front-black-model1.png"

    # ─── PERSON 3 — Black female, braids ───
    "Person 3 Back_.png"      = "tee-skeleton-ronin-redsun-back-black-model3.png"
    "Person 3 Back_ (1).png"  = "tee-cyber-oni-full-back-black-model3.png"
    "Person 3 Back_ (2).png"  = "tee-oni-samurai-dark-back-black-model3.png"
    "Person 3 Back_ (3).png"  = "tee-cyber-oni-portrait-circle-back-black-model3.png"
    "Person 3 Back_ (4).png"  = "tee-crow-warrior-ghost-back-white-model3.png"
    "Person 3 Back_ (5).png"  = "tee-crow-samurai-aerial-back-black-model3.png"
    "Person 3 Back_ (6).png"  = "tee-cyber-oni-clash-back-black-model3.png"
    "Person 3 Back_ (7).png"  = "tee-skeleton-samurai-kanji-back-black-model3.png"
    "Person 3 Back_ (8).png"  = "tee-dragon-red-sun-back-black-model3.png"
    "Person 3 Back_ (9).png"  = "tee-kitsune-nine-tails-back-black-model3.png"
    "Person 3 Back_ (10).png" = "tee-kitsune-nine-tails-back-white-model3.png"
    "Person 3 Back_ (11).png" = "tee-crow-ronin-bloodmoon-back-white-model3.png"
    "Person 3 Back_ (12).png" = "tee-crow-warrior-bloodmoon-dark-back-black-model3.png"
    "Person 3 Front.png"      = "tee-hollow-ronin-logo-front-black-model3.png"
    "Person 3 Front (1).png"  = "tee-hollow-ronin-logo-front-white-model3.png"

    # ─── PERSON 4 — Black male, curly hair ───
    # NOTE: (1)-(6) + base are best-guesses. Verify after by checking files.
    "Person 4 Back (1).png"  = "tee-skeleton-ronin-redsun-back-black-model4.png"
    "Person 4 Back (2).png"  = "tee-cyber-oni-full-back-black-model4.png"
    "Person 4 Back (3).png"  = "tee-oni-samurai-dark-back-black-model4.png"
    "Person 4 Back (4).png"  = "tee-cyber-oni-portrait-circle-back-black-model4.png"
    "Person 4 Back (5).png"  = "tee-crow-samurai-aerial-back-black-model4.png"
    "Person 4 Back (6).png"  = "tee-skeleton-samurai-kanji-back-black-model4.png"
    "Person 4 Back (7).png"  = "tee-crow-warrior-bloodmoon-dark-back-white-model4.png"
    "Person 4 Back (8).png"  = "tee-crow-warrior-ghost-back-black-model4.png"
    "Person 4 Back (9).png"  = "tee-cyberpunk-ninja-neon-back-black-model4.png"
    "Person 4 Back (10).png" = "tee-kitsune-nine-tails-back-black-model4.png"
    "Person 4 Back (11).png" = "tee-kitsune-nine-tails-back-white-model4.png"
    "Person 4 Back (12).png" = "tee-crow-ronin-bloodmoon-back-white-model4.png"
    "Person 4 Back.png"      = "tee-cyber-oni-clash-back-black-model4.png"
    "Person 4 Front.png"     = "tee-hollow-ronin-logo-front-black-model4.png"
    "Person 4 Front (1).png" = "tee-hollow-ronin-logo-front-white-model4.png"

    # ─── PERSON 5 — Indoor lifestyle shot (front logo) ───
    "Person 5 Context.png" = "tee-hollow-ronin-logo-front-black-lifestyle.png"
}

# ───── Run the renames ─────
$success = 0
$skipped = 0
$missing = 0

Write-Host ""
Write-Host "===============================================" -ForegroundColor Cyan
Write-Host "  HOLLOW RONIN -- Mockup Rename" -ForegroundColor Cyan
Write-Host "===============================================" -ForegroundColor Cyan
Write-Host "  Folder: $(Get-Location)"
Write-Host ""

foreach ($oldName in $renameMap.Keys) {
    $newName = $renameMap[$oldName]

    if (Test-Path -LiteralPath $oldName) {
        if (Test-Path -LiteralPath $newName) {
            Write-Host "  SKIP  Target already exists: $newName" -ForegroundColor Yellow
            $skipped++
        } else {
            Rename-Item -LiteralPath $oldName -NewName $newName
            Write-Host "  OK    $oldName -> $newName" -ForegroundColor Green
            $success++
        }
    } else {
        Write-Host "  MISS  $oldName not found" -ForegroundColor DarkGray
        $missing++
    }
}

Write-Host ""
Write-Host "===============================================" -ForegroundColor Cyan
Write-Host "  Renamed: $success    Skipped: $skipped    Missing: $missing" -ForegroundColor Cyan
Write-Host "===============================================" -ForegroundColor Cyan
Write-Host ""

if ($success -gt 0) {
    Write-Host "DONE! Files renamed in:" -ForegroundColor Green
    Write-Host "  $(Get-Location)" -ForegroundColor Green
    Write-Host ""
    Write-Host "Next: Sort the folder by name. All variants of each design"
    Write-Host "will group together. Spot-check Person 4 files (1)-(6) to"
    Write-Host "confirm they match their flat tees."
}

Write-Host ""
Write-Host "-----------------------------------------------"
Read-Host "Press ENTER to close this window"
