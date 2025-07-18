  const installBtn = document.getElementById('installBtn');
  let deferredPrompt;

  // Cek support PWA install
  if (!('BeforeInstallPromptEvent' in window)) {
    console.log("❌ Browser tidak mendukung install prompt");
    installBtn.style.display = 'none';
    return;
  }

  // Cek jika sudah diinstal
  const isStandalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;
  if (isStandalone) {
    installBtn.style.display = 'none';
  }

  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    if (!isStandalone) {
      installBtn.style.display = 'flex';
    }

    installBtn.addEventListener('click', () => {
      installBtn.style.display = 'none';
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log("✅ Diinstal!");
        }
        deferredPrompt = null;
      });
    });
  });

  window.addEventListener('appinstalled', () => {
    installBtn.style.display = 'none';
    console.log("📱 Aplikasi sudah diinstal");
  });