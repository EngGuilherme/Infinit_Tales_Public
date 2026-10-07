// Infinite Tales RPG — public site: language switch + Google Play button.

// When the game is live on Google Play, set this to true: the "coming soon" label
// becomes a link to the store page.
const PLAY_LIVE = false;
const PLAY_URL = "https://play.google.com/store/apps/details?id=com.engguilherme.infinitetales";

(function () {
  const root = document.documentElement;

  function setLang(lang) {
    root.dataset.lang = lang;
    root.lang = lang;
    document.querySelectorAll("[data-set-lang]").forEach((b) => {
      b.setAttribute("aria-pressed", String(b.dataset.setLang === lang));
    });
    const share = document.querySelector('meta[property="og:image"]');
    if (share) share.content = lang === "pt-BR" ? "assets/img/share-pt.jpg" : "assets/img/share-en.jpg";
  }

  // English by default; a visitor who picks Português keeps it on their next visit.
  let saved = null;
  try { saved = localStorage.getItem("it-lang"); } catch (e) { /* storage blocked */ }
  setLang(saved === "pt-BR" ? "pt-BR" : "en");

  document.querySelectorAll("[data-set-lang]").forEach((b) => {
    b.addEventListener("click", () => {
      setLang(b.dataset.setLang);
      try { localStorage.setItem("it-lang", b.dataset.setLang); } catch (e) { /* storage blocked */ }
    });
  });

  const store = document.getElementById("store");
  if (PLAY_LIVE && store) {
    const a = document.createElement("a");
    a.className = "store";
    a.href = PLAY_URL;
    a.innerHTML = '<span lang="en">Get it on Google Play</span><span lang="pt-BR">Baixe no Google Play</span>';
    store.replaceWith(a);
  }
})();
