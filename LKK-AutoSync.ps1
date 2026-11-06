$ErrorActionPreference = "Continue"

$repo = "C:\Users\Sujiwo\Downloads\lkk-github-cdn\lkk"
$git = "C:\Program Files\Git\cmd\git.exe"

$env:Path += ";C:\Program Files\Git\cmd"

Set-Location $repo

Write-Host "==================================" -ForegroundColor Cyan
Write-Host " LIPUTAN KABAR KOTA - AUTO SYNC" -ForegroundColor Cyan
Write-Host "==================================" -ForegroundColor Cyan
Write-Host "Memantau folder: $repo"
Write-Host "Tekan CTRL + C untuk menghentikan."
Write-Host ""

$needsPush = $false

while ($true) {
    Start-Sleep -Seconds 3

    $changes = @(& $git status --porcelain)

    if ($LASTEXITCODE -ne 0) {
        Write-Host "Gagal membaca status Git." -ForegroundColor Red
        Start-Sleep -Seconds 10
        continue
    }

    if ($changes.Count -gt 0) {
        Start-Sleep -Seconds 3
        $check = @(& $git status --porcelain)

        if (($changes -join "`n") -ne ($check -join "`n")) {
            continue
        }

        Write-Host "Perubahan terdeteksi. Memproses..." -ForegroundColor Yellow

        & $git add -A

        if ($LASTEXITCODE -ne 0) {
            Write-Host "Gagal menambahkan file." -ForegroundColor Red
            continue
        }

        & $git diff --cached --quiet
        $diffExit = $LASTEXITCODE

        if ($diffExit -eq 1) {
            $message = "Auto sync LKK - $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')"
            & $git commit -m $message

            if ($LASTEXITCODE -ne 0) {
                Write-Host "Commit gagal. Periksa konfigurasi Git." -ForegroundColor Red
                continue
            }

            $needsPush = $true
        }
        elseif ($diffExit -ne 0) {
            Write-Host "Gagal memeriksa perubahan." -ForegroundColor Red
            continue
        }
    }

    if ($needsPush) {
        Write-Host "Mengambil pembaruan GitHub..." -ForegroundColor Cyan
        & $git pull --rebase origin main

        if ($LASTEXITCODE -ne 0) {
            Write-Host "Pull gagal. Periksa kemungkinan konflik." -ForegroundColor Red
            Start-Sleep -Seconds 15
            continue
        }

        Write-Host "Mengunggah ke GitHub..." -ForegroundColor Cyan
        & $git push origin main

        if ($LASTEXITCODE -eq 0) {
            Write-Host "BERHASIL: GitHub sudah diperbarui!" -ForegroundColor Green
            $needsPush = $false
        }
        else {
            Write-Host "Push gagal. Akan dicoba kembali." -ForegroundColor Red
            Start-Sleep -Seconds 15
        }
    }
}
