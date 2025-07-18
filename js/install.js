const installBtn = document.getElementById('installBtn');
let deferredPrompt;

// 1. Sembunyikan tombol dari awal
installBtn.style.display = 'none';

// 2. Cek apakah aplikasi sudah diinstal (standalone)
const isStandalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;

if (isStandalone) {
  installBtn.style.display = 'none'; // Sudah terinstal
}

// 3. Hanya tampilkan tombol jika browser mendukung
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;

  if (!isStandalone) {
    installBtn.style.display = 'flex'; // Tampilkan tombol
  }

  installBtn.addEventListener('click', () => {
    installBtn.style.display = 'none';
    deferredPrompt.prompt();

    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('✅ Aplikasi diinstall');
      }
      deferredPrompt = null;
    });
  });
});

// 4. Setelah diinstal, sembunyikan tombol
window.addEventListener('appinstalled', () => {
  console.log('📱 PWA sudah diinstal');
  installBtn.style.display = 'none';
});