Add-Type -AssemblyName System.Drawing

$img = [System.Drawing.Bitmap]::FromFile("$PSScriptRoot\full_design.jpg")
$assetsDir = "$PSScriptRoot\assets"
if (-not (Test-Path $assetsDir)) { New-Item -ItemType Directory -Path $assetsDir | Out-Null }

# Remove old test files
Get-ChildItem -Path $assetsDir -Filter "test_*.png" | Remove-Item -Force

function Crop-Image {
    param(
        [int]$x, [int]$y, [int]$w, [int]$h,
        [string]$name
    )
    $destRect = New-Object System.Drawing.Rectangle(0, 0, $w, $h)
    $srcRect = New-Object System.Drawing.Rectangle($x, $y, $w, $h)
    $bmp = New-Object System.Drawing.Bitmap($w, $h)
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    $g.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
    $g.DrawImage($img, $destRect, $srcRect, [System.Drawing.GraphicsUnit]::Pixel)
    $g.Dispose()

    $outPath = Join-Path $assetsDir $name
    $bmp.Save($outPath, [System.Drawing.Imaging.ImageFormat]::Png)
    $bmp.Dispose()
    Write-Host "Exported: $name ($w x $h)"
}

# 1. Hero Portrait:
Crop-Image 1080 230 680 700 "hero-portrait.png"

# 2. Circular Rotating Badge:
Crop-Image 1450 1040 240 240 "circular-badge.png"

# 3. About Portrait:
Crop-Image 380 1450 540 540 "about-portrait.png"

# 4. Portfolio 1 (1V4 Clutch - Gaming):
Crop-Image 330 4240 645 440 "portfolio-gaming.png"

# 5. Portfolio 2 (UI Animation):
Crop-Image 1125 4240 645 440 "portfolio-ui.png"

# 6. Portfolio 3 (Talking Head):
Crop-Image 330 4930 645 440 "portfolio-talkinghead.png"

# 7. Portfolio 4 (SaaS Animation):
Crop-Image 1125 4930 645 440 "portfolio-saas.png"

# 8. Portfolio 5 (Viral Reels):
Crop-Image 330 5590 645 440 "portfolio-viral.png"

# 9. Portfolio 6 (Motion Graphics):
Crop-Image 1125 5590 645 440 "portfolio-motion.png"

$img.Dispose()
Write-Host "All assets successfully extracted!"

