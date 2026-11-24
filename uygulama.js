
const KAYIT_ADI = "urunlerim";


const form = document.getElementById("urun-formu");
const urunAdiKutusu = document.getElementById("urun-adi");
const stokKutusu = document.getElementById("stok");
const urunListesi = document.getElementById("urun-listesi");
const bosMesaj = document.getElementById("bos-mesaj");


let urunler = JSON.parse(localStorage.getItem(KAYIT_ADI) || "[]");


function listeyiGoster() {
  urunListesi.innerHTML = "";
  bosMesaj.hidden = urunler.length > 0;

  urunler.forEach(function (urun, sira) {
    const satir = document.createElement("tr");
    const adHucre = document.createElement("td");
    const stokHucre = document.createElement("td");
    const islemHucre = document.createElement("td");

    
    adHucre.textContent = urun.adi;
    stokHucre.textContent = urun.stok;

    const artirDugmesi = document.createElement("button");
    artirDugmesi.textContent = "+";
    artirDugmesi.className = "islem-dugmesi";
    artirDugmesi.onclick = function () { stokDegistir(sira, 1); };

    const azaltDugmesi = document.createElement("button");
    azaltDugmesi.textContent = "−";
    azaltDugmesi.className = "islem-dugmesi";
    azaltDugmesi.disabled = urun.stok === 0;
    azaltDugmesi.onclick = function () { stokDegistir(sira, -1); };

    const silDugmesi = document.createElement("button");
    silDugmesi.textContent = "Sil";
    silDugmesi.className = "islem-dugmesi sil-dugmesi";
    silDugmesi.onclick = function () { urunSil(sira); };

    islemHucre.append(artirDugmesi, azaltDugmesi, silDugmesi);
    satir.append(adHucre, stokHucre, islemHucre);
    urunListesi.appendChild(satir);
  });
}


function kaydet() {
  localStorage.setItem(KAYIT_ADI, JSON.stringify(urunler));
}


form.addEventListener("submit", function (olay) {
  olay.preventDefault();

  const adi = urunAdiKutusu.value.trim();
  const stok = Number(stokKutusu.value);

  if (adi === "") {
    alert("Lütfen ürün adı yazın.");
    return;
  }

  if (!Number.isSafeInteger(stok) || stok < 0) {
    alert("Stok sıfır veya daha büyük bir sayı olmalı.");
    return;
  }

  urunler.push({ adi: adi, stok: stok });
  kaydet();
  listeyiGoster();
  form.reset();
});


function stokDegistir(sira, miktar) {
  const yeniStok = urunler[sira].stok + miktar;
  if (yeniStok < 0) return;

  urunler[sira].stok = yeniStok;
  kaydet();
  listeyiGoster();
}


function urunSil(sira) {
  urunler.splice(sira, 1);
  kaydet();
  listeyiGoster();
}


listeyiGoster();
