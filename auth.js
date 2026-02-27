/**
 * Password gate - visitors must enter the password to access the player.
 * Change PASSWORD below. Session is remembered for the browser tab.
 */
(function () {
  'use strict';

  const PASSWORD = 'showmethemoney';  // Change this to your desired password
  const STORAGE_KEY = 'ah-vocal-unlocked';

  const gate = document.getElementById('password-gate');
  const form = document.getElementById('password-form');
  const input = document.getElementById('password-input');
  const errorEl = document.getElementById('gate-error');
  const playerRoot = document.getElementById('player-root');

  function unlock() {
    try { sessionStorage.setItem(STORAGE_KEY, '1'); } catch (e) {}
    document.body.classList.add('unlocked');
    playerRoot.removeAttribute('hidden');
  }

  function showError() {
    errorEl.hidden = false;
    input.value = '';
    input.focus();
  }

  if (sessionStorage.getItem(STORAGE_KEY) === '1') {
    unlock();
    return;
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (input.value === PASSWORD) {
      errorEl.hidden = true;
      unlock();
    } else {
      showError();
    }
  });
})();
