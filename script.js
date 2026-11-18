
// Mengambil elemen musik
const music = document.getElementById("backgroundMusic");
const musicToggle = document.getElementById("musicToggle");
const musicLabel = document.getElementById("musicLabel");

// Mengambil elemen lightbox
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxCaption = document.getElementById("lightboxCaption");
const lightboxClose = document.getElementById("lightboxClose");


// ===================================
// 1. BACKGROUND MUSIC
// ===================================

if (music && musicToggle && musicLabel) {

  musicToggle.addEventListener("click", async () => {

    if (music.paused) {

      try {
        await music.play();

        musicLabel.textContent = "Jeda musik";
        musicToggle.classList.add("playing");

      } catch (error) {

        musicLabel.textContent = "Musik tidak tersedia";
        alert("Pastikan file music.mp3 ada di folder assets.");

      }

    } else {

      music.pause();

      musicLabel.textContent = "Putar musik";
      musicToggle.classList.remove("playing");

    }

  });

}


// ===================================
// 2. MEMUAT FOTO KENANGAN
// ===================================

const photoFiles = {
  hero: "assets/foto2.jpeg",
  memory1: "assets/foto7.jpeg",
  memory2: "assets/foto6.jpeg",
  memory3: "assets/foto5.jpeg",
  memory4: "assets/foto4.jpeg",
  memory5: "assets/foto1.jpeg",
  memory6: "assets/foto8.jpeg",

  bareng1: "assets/bareng1.jpeg",
  bareng2: "assets/bareng2.jpeg",
  bareng3: "assets/bareng3.jpeg",
  bareng4: "assets/bareng4.jpeg",
  bareng5: "assets/bareng5.jpeg",
  bareng6: "assets/bareng6.jpeg",
  bareng7: "assets/bareng7.jpeg"
};


// Memuat semua foto
Object.entries(photoFiles).forEach(([name, path]) => {

  const photo = document.querySelector(
    `[data-photo="${name}"]`
  );

  if (!photo) return;

  const image = photo.querySelector("img");

  if (!image) return;

  image.onload = () => {
    photo.classList.add("has-image");
    console.log("Foto berhasil dimuat:", path);
  };

  image.onerror = () => {
    console.error("Foto tidak ditemukan:", path);
  };

  image.src = path;

});


// ===================================
// 3. MEMBUKA FOTO
// ===================================

function openLightbox(photo) {

  if (!lightbox || !lightboxImage) return;

  const img = photo.querySelector("img");

  if (!img || !img.complete || img.naturalWidth === 0) {
    console.error("Foto gagal dimuat:", img ? img.src : "Tidak ditemukan");
    return;
  }

  // Mengambil foto asli
  lightboxImage.src = img.currentSrc || img.src;

  // Menghilangkan efek warna
  lightboxImage.style.setProperty("filter", "none", "important");
  lightboxImage.style.setProperty("-webkit-filter", "none", "important");
  lightboxImage.style.setProperty("mix-blend-mode", "normal", "important");
  lightboxImage.style.setProperty("opacity", "1", "important");
  lightboxImage.style.setProperty("transform", "none", "important");
  lightboxImage.style.setProperty("background", "transparent", "important");

  // Mengambil caption
  const caption =
    photo.closest(".polaroid")?.querySelector(".photo-caption")?.textContent
    ||
    photo.closest(".hero-polaroid")?.querySelector("p")?.textContent
    ||
    "Kenangan kita ♡";

  if (lightboxCaption) {
    lightboxCaption.textContent = caption;
  }

  // Membuka lightbox
  lightbox.classList.add("open");
  lightbox.setAttribute("aria-hidden", "false");

  document.body.style.overflow = "hidden";

}


// ===================================
// 4. KLIK FOTO
// ===================================

// Deteksi perangkat HP
const isMobile = window.matchMedia("(hover: none)").matches;

// HP: satu kali tap
if (isMobile) {

  document.addEventListener("click", (event) => {

    if (!(event.target instanceof Element)) return;

    const photo = event.target.closest(".photo-placeholder");

    if (!photo) return;

    event.preventDefault();
    openLightbox(photo);

  });

}

// PC / Laptop: dua kali klik
else {

  document.addEventListener("dblclick", (event) => {

    if (!(event.target instanceof Element)) return;

    const photo = event.target.closest(".photo-placeholder");

    if (!photo) return;

    event.preventDefault();
    openLightbox(photo);

  });

}


// ===================================
// 5. MENUTUP FOTO
// ===================================

function closeLightbox() {

  if (!lightbox) return;

  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden", "true");

  document.body.style.overflow = "";

  if (lightboxImage) {
    lightboxImage.removeAttribute("src");
  }

}


// Tombol X
if (lightboxClose) {

  lightboxClose.addEventListener("click", (event) => {
    event.stopPropagation();
    closeLightbox();
  });

}


// Klik latar belakang
if (lightbox) {

  lightbox.addEventListener("click", (event) => {

    if (event.target === lightbox) {
      closeLightbox();
    }

  });

}


// Klik gambar tidak menutup lightbox
if (lightboxImage) {

  lightboxImage.addEventListener("click", (event) => {
    event.stopPropagation();
  });

}


// Klik caption tidak menutup lightbox
if (lightboxCaption) {

  lightboxCaption.addEventListener("click", (event) => {
    event.stopPropagation();
  });

}


// Tombol ESC
document.addEventListener("keydown", (event) => {

  if (event.key === "Escape") {
    closeLightbox();
  }

});
