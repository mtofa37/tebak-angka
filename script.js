let angkaBenar;
let salahCount;
let gameSelesai;

// siapin audio
let winSound = new Audio("win.mp3");

// daftar kalimat kalau salah
const pesanSalah = [
    "HHAHA Huuu Salah!🤣🤣",
    "WKWKW Salah trus ahh😝",
    "Kesel g yang? Salah trus☺️",
    "Aduhh.. salah agii🤭",
    "Cemangatt, pasti nanti bisa SALAH lagi!☺️🤣🤣"
];

function mulaiGame() {
    angkaBenar = Math.floor(Math.random() * 5) + 1;
    salahCount = 0;
    gameSelesai = false;

    document.getElementById("pesan").innerText = "";
    document.getElementById("akhir").innerText = "";
    document.getElementById("inputTebak").value = "";

    // munculin input & tombol tebak lagi
    document.getElementById("inputTebak").style.display = "inline-block";
    document.querySelector("button[onclick='tebakAngka()']").style.display = "inline-block";

    // sembunyiin tombol reset
    document.getElementById("resetBtn").style.display = "none";
}

function tebakAngka() {
    if (gameSelesai) return;

    let tebak = parseInt(document.getElementById("inputTebak").value);

    if (tebak === angkaBenar) {
        document.getElementById("pesan").innerText = "";
        let akhirEl = document.getElementById("akhir");
        akhirEl.classList.add("win");

        // mainin suara menang
        winSound.currentTime = 0; // mulai dari awal
        winSound.play();

        setTimeout(() => {
            akhirEl.classList.remove("win");
        }, 1200);

        if (salahCount === 0) {
            akhirEl.innerText = `🏆 Hehhhh... iya Angka = ${angkaBenar} _-, aghh g seruu kok langsung bener sihh _-`;
        } else {
            akhirEl.innerText = `🎉 Nahhh beneeerrr🫶🏻✨! Angka = ${angkaBenar}. yang, Is is issss ayang salah ${salahCount} kali, Eh.... Jangan lupa pap nya sebnyak jumlah salah yah wkwkw.`;
        }

        for (let i = 0; i < 50; i++) {
            setTimeout(() => buatLove(), i * 150);
        }

        // SEMBUNYIIN input & tombol tebak
        document.getElementById("inputTebak").style.display = "none";
        document.querySelector("button[onclick='tebakAngka()']").style.display = "none";

        // TAMPILIN tombol reset
        document.getElementById("resetBtn").style.display = "inline-block";

        gameSelesai = true;
    } else {
        salahCount++;
        let randomPesan = pesanSalah[Math.floor(Math.random() * pesanSalah.length)];
        let pesanEl = document.getElementById("pesan");
        pesanEl.innerText = `${randomPesan} (Salah ke-${salahCount})`;

        pesanEl.classList.add("shake");
        setTimeout(() => {
            pesanEl.classList.remove("shake");
        }, 400);
    }
}

function buatLove() {
    let love = document.createElement("div");
    love.classList.add("love");
    love.innerHTML = "🤍";

    love.style.left = Math.random() * 100 + "vw";
    love.style.bottom = "0px";
    love.style.fontSize = Math.random() * 2 + 1 + "rem";
    love.style.animationDuration = 2 + Math.random() * 2 + "s";
    love.style.transform = `translateX(${Math.random() * 100 - 50}px)`;

    document.body.appendChild(love);

    setTimeout(() => {
        love.remove();
    }, 3000);
}
function simpanNama() {
    let nama = document.getElementById("nameInput").value.trim();
    if (nama) {
        localStorage.setItem("namaUser", nama); // simpan ke localStorage
        tampilkanNama();
    }
}

function tampilkanNama() {
    let nama = localStorage.getItem("namaUser");
    if (nama) {
        document.getElementById("greeting").innerText = `Hallo, ${nama}!`;
        document.getElementById("nameInput").style.display = "none";
        document.querySelector(".user-box button").style.display = "none";
    }
}

// jalankan pas awal web dibuka
window.onload = tampilkanNama;

function resetGame() {
    mulaiGame();
}

mulaiGame();