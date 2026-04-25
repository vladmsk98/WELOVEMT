document.addEventListener("DOMContentLoaded", () => {
  // Получаем текущий URL и заголовок страницы
  const currentUrl = window.location.href;
  const pageTitle = document.title || "DLTMZK — СПЛЕТЕНИЯ";

  // === Функционал: остановка других треков при воспроизведении одного ===
  const allAudioPlayers = document.querySelectorAll('.audio-player');

  allAudioPlayers.forEach(player => {
    player.addEventListener('play', () => {
      // Останавливаем все остальные плееры
      allAudioPlayers.forEach(otherPlayer => {
        if (otherPlayer !== player && !otherPlayer.paused) {
          otherPlayer.pause();
        }
      });
    });
  });

  // === Функция для настройки поделки и копирования ссылки ===
  function setupSharingForTrack(suffix) {
    // Кнопка "Копировать ссылку"
    const copyBtn = document.getElementById(`copy-url-btn-${suffix}`);
    if (copyBtn) {
      copyBtn.addEventListener("click", () => {
        navigator.clipboard.writeText(currentUrl).then(() => {
          alert("Ссылка скопирована в буфер обмена!");
        }).catch(err => {
          console.error("Ошибка копирования:", err);
          alert("Не удалось скопировать ссылку.");
        });
      });
    }

    // Поделиться: ВКонтакте
    const vkBtn = document.getElementById(`vk-share-btn-${suffix}`);
    if (vkBtn) {
      const vkShareUrl = `https://vk.com/share.php?url=${encodeURIComponent(currentUrl)}&title=${encodeURIComponent(pageTitle)}`;
      vkBtn.href = vkShareUrl;
    }

    // Поделиться: Одноклассники
    const okBtn = document.getElementById(`ok-share-btn-${suffix}`);
    if (okBtn) {
      const okShareUrl = `https://connect.ok.ru/dk?st.cmd=WidgetSharePreview&st.shareUrl=${encodeURIComponent(currentUrl)}&st.title=${encodeURIComponent(pageTitle)}`;
      okBtn.href = okShareUrl;
    }

    // Поделиться: BlueSky
    const bskyBtn = document.getElementById(`bsky-share-btn-${suffix}`);
    if (bskyBtn) {
      const bskyShareUrl = `https://bsky.app/intent/compose?text=${encodeURIComponent(pageTitle + ' ' + currentUrl)}`;
      bskyBtn.href = bskyShareUrl;
    }
  }

  // Настройка для обоих треков
  setupSharingForTrack('track1');
  setupSharingForTrack('track2');

  // === Система оценки треков ===
  document.querySelectorAll('.rating-section').forEach(section => {
  const stars = section.querySelectorAll('.star');
  const trackId = section.getAttribute('data-track');
  const ratingDisplay = section.querySelector('.rating-display span');

  // Загружаем сохранённую оценку
  const savedRating = localStorage.getItem(`rating-track${trackId}`);
  if (savedRating) {
    updateStars(parseInt(savedRating));
    ratingDisplay.textContent = savedRating;
  }

  stars.forEach(star => {
    star.addEventListener('click', () => {
      const value = parseInt(star.getAttribute('data-value'));

      // Сохраняем оценку
      localStorage.setItem(`rating-track${trackId}`, value);

      // Обновляем отображение
      updateStars(value);
      ratingDisplay.textContent = value;
    });
  });

  function updateStars(rating) {
    stars.forEach((star, index) => {
      if (index < rating) {
        star.classList.add('active');
      } else {
        star.classList.remove('active');
      }
    });
  }
});
});
