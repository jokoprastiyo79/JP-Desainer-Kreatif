<script>
  document.addEventListener('DOMContentLoaded', () => {
    const installBtn = document.getElementById('installBtn');
    let deferredPrompt;

    installBtn.style.display = 'none';

    const isStandalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone;

    if (isStandalone) {
      installBtn.style.display = 'none';
      return;
    }

    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      deferredPrompt = e;
      installBtn.style.display = 'flex';

      installBtn.addEventListener('click', () => {
        installBtn.style.display = 'none';
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then((choice) => {
          if (choice.outcome === 'accepted') {
            console.log('✅ Aplikasi diinstal');
          }
          deferredPrompt = null;
        });
      });
    });

    window.addEventListener('appinstalled', () => {
      installBtn.style.display = 'none';
      console.log('📱 Aplikasi sudah terinstal');
    });
  });
</script>