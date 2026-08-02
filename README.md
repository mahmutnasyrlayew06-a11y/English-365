# 365 Kun English — kundalik ingliz tili dasturi

Noldan boshlab 12 oyda (365 kun) A1 → A2 → B1 darajasiga olib boradigan shaxsiy ilova.
Har kuni 8 ta yangi so'z, 5-6 ta grammatik jihatdan to'g'ri jumla va kuniga 3-4 marta
bildirishnoma (siz belgilagan vaqtlarda).

- Oy 1-2: A1 (asosiy grammatika: to be, have, hozirgi zamon)
- Oy 3-6: A2 (davomli/o'tgan/kelasi zamon, present perfect, modal fe'llar)
- Oy 7-12: B1 (conditional gaplar, passive voice, reported speech, phrasal verbs)

Jami: 365 kun, 2920 ta so'z birligi (~1000 ta noyob so'z, takrorlanish orqali mustahkamlanadi),
2000+ jumla.

## Fayllar (6 ta asosiy fayl)
- `index.html` — ilova ekrani
- `style.css` — dizayn
- `app.js` — mantiq (progress, bildirishnoma, tarjima)
- `data.js` — 365 kunlik dastur (so'z + jumlalar)
- `sw.js` — Service Worker (offline ishlash + bildirishnoma)
- `manifest.json` — telefon ekraniga qo'shish sozlamalari
- `icons/` — ilova belgisi

## Nega to'g'ridan-to'g'ri "download" qilib bo'lmaydi?

Bu — brauzer orqali ishlaydigan veb-ilova (PWA). Bildirishnoma va offline rejim faqat
**https havolasi** orqali ishlaydi (oddiy fayl sifatida ochilganda ishlamaydi).
Shuning uchun avval uni internetga (bepul) joylashtirish kerak, keyin Redmi telefoningizda
Chrome orqali ochib, "Bosh ekranga qo'shish" qilasiz — shunda u xuddi oddiy ilovadek ishlaydi.

## O'rnatish — 3 qadam (5 daqiqa, bepul)

### 1-qadam: Ilovani internetga joylashtiring
Eng oson yo'l — **Netlify Drop**:
1. Kompyuteringizda https://app.netlify.com/drop sahifasini oching
2. Shu zip faylni oching (ichidagi papkani chiqaring)
3. Papkani (barcha 6 fayl + icons bo'lgan papkani) to'g'ridan-to'g'ri sahifaga sudrab tashlang (drag & drop)
4. Bir necha soniyada sizga `https://random-nom.netlify.app` kabi havola beriladi

*(Muqobil: GitHub Pages, Vercel, yoki Cloudflare Pages — barchasi bepul va shunga o'xshash.)*

### 2-qadam: Redmi telefoningizda oching
1. Redmi'da **Chrome** brauzerini oching (Chrome orqali kirish shart — Xiaomi'ning
   o'z brauzeri emas)
2. 1-qadamda olingan havolani kiriting
3. Yuqori o'ng burchakdagi ⋮ tugmasini bosing → **"Bosh ekranga qo'shish" / "Add to Home screen"**
4. Endi ilova belgisi telefon ekraningizda oddiy ilovadek turadi

### 3-qadam: Bildirishnomalarni yoqing
1. Ilovani ochib, pastdagi **"Sozlama"** bo'limiga o'ting
2. "Kunlik eslatmalar" tugmasini yoqing va ruxsat bering
3. O'zingizga qulay 3-4 ta vaqtni qo'shing (masalan 09:00, 13:30, 18:00, 21:00)
4. Redmi sozlamalarida shu ilova uchun **batareya optimizatsiyasini o'chirib qo'ying**
   (Sozlamalar → Ilovalar → Chrome/365 English → Batareya → "Cheklanmagan"), aks holda
   MIUI fonda ishlayotgan bildirishnomalarni to'xtatib qo'yishi mumkin — bu Xiaomi
   telefonlarining umumiy xususiyati, ilovaning o'ziga bog'liq emas.

## Qanday ishlaydi
- Har kuni ilovani ochganingizda o'sha kunning so'z va jumlalari avtomatik chiqadi
  (boshlagan sanangizdan hisoblanadi)
- So'z kartochkasiga bosib aylantirsangiz — inglizcha-o'zbekcha tarjima chiqadi
  (internetga ulanish kerak, bepul tarjima xizmati orqali)
- "Bugungi darsni tugatdim" tugmasini bosib kunlik streak (ketma-ket kunlar)ni saqlaysiz
- "Yo'l" bo'limida butun 365 kunlik xaritani ko'rasiz, o'tgan kunlarni qayta ko'rish mumkin
- "Boshidan boshlash" — progressni tozalab qayta boshlash imkonini beradi

Omad tilaymiz! 💪 Kundalik 15-20 daqiqa yetarli — muhimi izchillik.
