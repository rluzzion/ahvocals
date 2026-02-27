/**
 * AH Vocal Songs - Custom Audio Player
 * Works when opening index.html directly (file://) and on GitHub Pages.
 */
(function () {
  'use strict';

  // Configure your tracks: add paths to your audio files (16 songs)
  const TRACKS = [
    { src: 'assets/audio/Undine.mp3' },
    { src: 'assets/audio/Orpheus.mp3' },
    { src: 'assets/audio/Dyne.mp3' },
    { src: 'assets/audio/Lyrielle.mp3' },
    { src: 'assets/audio/Joey.mp3' },
    { src: 'assets/audio/Bunny.mp3' },
    { src: 'assets/audio/Yuzu.mp3' },
    { src: 'assets/audio/Claire 1.mp3' },
    { src: 'assets/audio/Claire 2.mp3' },
    { src: 'assets/audio/Claire 3.mp3' },
    { src: 'assets/audio/Helios.mp3' },
    { src: 'assets/audio/Aeliana.mp3' },
    { src: 'assets/audio/Gedrick.mp3' },
    { src: 'assets/audio/Ruby.mp3' },
    { src: 'assets/audio/Credits.mp3' },
  ];

  const audio = document.getElementById('global-audio');
  let currentTrackIndex = -1;

  // Resolve path for file:// and GitHub Pages
  function resolveUrl(path) {
    return new URL(path, window.location.href).href;
  }

  function loadTrack(index) {
    if (index < 0 || index >= TRACKS.length) return;
    audio.src = resolveUrl(TRACKS[index].src);
    currentTrackIndex = index;
    document.querySelectorAll('.track-card').forEach((el, i) => {
      el.classList.toggle('playing', i === index);
    });
    updateAllPlayButtons();
  }

  function updateAllPlayButtons() {
    document.querySelectorAll('.track-card').forEach((card, i) => {
      const play = card.querySelector('.icon-play-sm');
      const pause = card.querySelector('.icon-pause-sm');
      const isThis = i === currentTrackIndex;
      const isPlaying = isThis && !audio.paused;
      play.classList.toggle('hidden', isPlaying);
      pause.classList.toggle('hidden', !isPlaying);
    });
  }

  function formatTime(sec) {
    if (!isFinite(sec) || isNaN(sec)) return '0:00';
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return m + ':' + (s < 10 ? '0' : '') + s;
  }

  function updateProgress(card) {
    if (!card) return;
    const fill = card.querySelector('.progress-fill');
    const timeEl = card.querySelector('.time');
    if (!fill || !timeEl) return;
    const duration = audio.duration;
    const current = audio.currentTime;
    if (isFinite(duration) && duration > 0) {
      fill.style.width = (current / duration) * 100 + '%';
      timeEl.textContent = formatTime(current) + ' / ' + formatTime(duration);
    } else {
      fill.style.width = '0%';
      timeEl.textContent = '0:00 / 0:00';
    }
  }

  function syncProgressToCurrentCard() {
    const card = document.querySelector(`.track-card[data-track="${currentTrackIndex}"]`);
    updateProgress(card);
  }

  audio.addEventListener('timeupdate', syncProgressToCurrentCard);
  audio.addEventListener('loadedmetadata', syncProgressToCurrentCard);
  audio.addEventListener('ended', () => {
    updateAllPlayButtons();
    document.querySelectorAll('.track-card').forEach(el => el.classList.remove('playing'));
    currentTrackIndex = -1;
  });
  audio.addEventListener('play', updateAllPlayButtons);
  audio.addEventListener('pause', updateAllPlayButtons);

  document.querySelector('#player-root').addEventListener('click', (e) => {
    const playBtn = e.target.closest('.play-btn');
    const ctrlPlay = e.target.closest('.ctrl-play');
    const card = e.target.closest('.track-card');
    const progressWrap = e.target.closest('.progress-wrap');

    if (playBtn && card) {
      e.preventDefault();
      const idx = +card.dataset.track;
      if (idx === currentTrackIndex && !audio.paused) {
        audio.pause();
      } else {
        loadTrack(idx);
        audio.play().catch(() => {});
      }
      return;
    }

    if (ctrlPlay && card) {
      e.preventDefault();
      const idx = +card.dataset.track;
      if (idx === currentTrackIndex) {
        if (audio.paused) audio.play();
        else audio.pause();
      } else {
        loadTrack(idx);
        audio.play().catch(() => {});
      }
      return;
    }

    if (progressWrap && card && +card.dataset.track === currentTrackIndex) {
      e.preventDefault();
      const rect = progressWrap.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const pct = Math.max(0, Math.min(1, x / rect.width));
      if (isFinite(audio.duration)) {
        audio.currentTime = pct * audio.duration;
        updateProgress(card);
      }
    }
  });

  document.querySelector('#player-root').addEventListener('keydown', (e) => {
    const bar = e.target.closest('.progress-bar');
    const card = e.target.closest('.track-card');
    if (!bar || !card || +card.dataset.track !== currentTrackIndex) return;
    const step = e.key === 'ArrowRight' ? 5 : e.key === 'ArrowLeft' ? -5 : 0;
    if (step && isFinite(audio.duration)) {
      e.preventDefault();
      audio.currentTime = Math.max(0, Math.min(audio.duration, audio.currentTime + step));
      updateProgress(card);
    }
  });

  document.addEventListener('contextmenu', (e) => {
    if (e.target.closest('.artwork-wrap') || e.target.closest('.audio-controls')) {
      e.preventDefault();
    }
  });

})();
