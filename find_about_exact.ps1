Add-Type -AssemblyName System.Drawing

$img = [System.Drawing.Bitmap]::FromFile("$PSScriptRoot\full_design.jpg")

Write-Host "Scanning About section in full_design.jpg..."

# Let's search for skin tone in x=250..1050, y=1300..2200
$minX = 9999; $maxX = 0; $minY = 9999; $maxY = 0

for ($y = 1300; $y -le 2200; $y += 5) {
    for ($x = 250; $x -le 1050; $x += 5) {
        $c = $img.GetPixel($x, $y)
        if ($c.R -gt 130 -and $c.G -gt 80 -and $c.B -gt 60 -and $c.R -gt $c.G -and $c.G -gt $c.B) {
            if ($x -lt $minX) { $minX = $x }
            if ($x -gt $maxX) { $maxX = $x }
            if ($y -lt $minY) { $minY = $y }
            if ($y -gt $maxY) { $maxY = $y }
        }
    }
}

Write-Host "Skin detected in full_design.jpg: X=$minX..$maxX (W=$($maxX-$minX)), Y=$minY..$maxY (H=$($maxY-$minY))"

# Let's also find the circular border around Arpit
# In the design, there is a circular frame around Arpit in the About section.
# Let's inspect brightness across horizontal slice at center of y
$midY = [int](($minY + $maxY) / 2)
Write-Host "midY = $midY"

$img.Dispose()

