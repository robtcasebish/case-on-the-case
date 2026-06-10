# One-command deploy of Case on the Case to Kinsta.
# Builds the static site locally and publishes it into the Kinsta web root
# over SSH using key auth (no password). Run from the project root:
#
#   .\deploy-kinsta.ps1
#
# Requires: the deploy key at ~/.ssh/kinsta_caseonthecase (already set up),
# and OpenSSH (ssh/scp) on PATH. No secrets are stored in this file.

$ErrorActionPreference = 'Stop'

# Ensure node/git on PATH and Node trusts the corporate cert store (this machine).
$machine = [Environment]::GetEnvironmentVariable("Path","Machine")
$userPath = [Environment]::GetEnvironmentVariable("Path","User")
$env:Path = "$machine;$userPath"
$env:NODE_OPTIONS = "--use-system-ca"

$Key     = "$env:USERPROFILE\.ssh\kinsta_caseonthecase"
$Port    = "12866"
$Target  = "caseonthecase@40.233.76.229"
$WebRoot = "/www/caseonthecase_753"

Write-Host "==> Building site..." -ForegroundColor Cyan
npm run build
if ($LASTEXITCODE -ne 0) { throw "build failed" }

Write-Host "==> Packaging dist/..." -ForegroundColor Cyan
tar -czf dist.tgz -C dist .

try {
  Write-Host "==> Uploading..." -ForegroundColor Cyan
  scp -i $Key -P $Port -o StrictHostKeyChecking=accept-new dist.tgz "${Target}:${WebRoot}/dist.tgz"
  if ($LASTEXITCODE -ne 0) { throw "upload failed" }

  Write-Host "==> Publishing into public/ ..." -ForegroundColor Cyan
  # chmod first: tar's '.' entry resets public/ perms on extract, so ensure the
  # dir is writable before clearing, and restore 755 after. Glob skips dotfiles
  # like .well-known.
  ssh -i $Key -p $Port -o StrictHostKeyChecking=accept-new $Target `
    "cd $WebRoot && chmod u+rwx public && rm -rf public/* && tar --warning=no-unknown-keyword -xzf dist.tgz -C public && chmod 755 public && rm -f dist.tgz && echo DEPLOYED"
  if ($LASTEXITCODE -ne 0) { throw "remote publish failed" }
}
finally {
  Remove-Item dist.tgz -Force -ErrorAction SilentlyContinue
}

Write-Host "==> Done. Live: https://caseonthecase.kinsta.cloud/" -ForegroundColor Green
