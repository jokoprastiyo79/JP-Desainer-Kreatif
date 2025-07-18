const installBtn = document.getElementById('installBtn');
let deferredPrompt;

// Sembunyikan dulu
installBtn.style.display = 'none';

// Cek support dan mode standalone
const supportsInstall = 'BeforeInstallPromptEvent' in window;
const isStandalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;

if (supportsInstall && !isStandalone) {
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    installBtn.style.display = 'flex'; // Tampilkan tombol

    installBtn.addEventListener('click', () => {
      installBtn.style.display = 'none';
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('✅ User accepted the install');
        }
        deferredPrompt = null;
      });
    });
  });
}

window.addEventListener('appinstalled', () => {
  installBtn.style.display = 'none';
  console.log('📱 App successfully installed');
});