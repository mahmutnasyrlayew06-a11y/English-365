// data.js - 365 kunlik so'z va jumlalar
// A1 (1-60 kun), A2 (61-180 kun), B1 (181-365 kun)

window.lessonData = {};

// ========== A1 DARAJASI (1-60 KUN) ==========
function generateA1(day) {
    const wordsA1 = [
        ['Hello', 'Salom'],
        ['Good', 'Yaxshi'],
        ['Bad', 'Yomon'],
        ['Happy', 'Baxtli'],
        ['Sad', 'Qayg\'uli'],
        ['Big', 'Katta'],
        ['Small', 'Kichik'],
        ['Beautiful', 'Chiroyli'],
        ['Ugly', 'Xunuk'],
        ['New', 'Yangi'],
        ['Old', 'Eski'],
        ['Young', 'Yosh'],
        ['Old', 'Qari'],
        ['Hot', 'Issiq'],
        ['Cold', 'Sovuq'],
        ['Warm', 'Iliq'],
        ['Cool', 'Salqin'],
        ['Sunny', 'Quyoshli'],
        ['Rainy', 'Yomg\'irli'],
        ['Cloudy', 'Bulutli'],
        ['Windy', 'Shamolli'],
        ['Snowy', 'Qorli'],
        ['Foggy', 'Tumanli'],
        ['Nice', 'Yaxshi'],
        ['Great', 'Ajoyib'],
        ['Wonderful', 'Ajoyib'],
        ['Terrible', 'Dahshatli'],
        ['Awful', 'Juda yomon'],
        ['Lovely', 'Yoqimli'],
        ['Cute', 'Jozibali'],
        ['Pretty', 'Chiroyli'],
        ['Handsome', 'Kelishgan'],
        ['Tall', 'Uzun bo\'yli'],
        ['Short', 'Past bo\'yli'],
        ['Fat', 'Semiz'],
        ['Thin', 'Ozg\'in'],
        ['Strong', 'Kuchli'],
        ['Weak', 'Kuchsiz'],
        ['Fast', 'Tez'],
        ['Slow', 'Sekin'],
        ['Clean', 'Toza'],
        ['Dirty', 'Nopok'],
        ['Easy', 'Oson'],
        ['Difficult', 'Qiyin'],
        ['Cheap', 'Arzon'],
        ['Expensive', 'Qimmat'],
        ['Rich', 'Boy'],
        ['Poor', 'Kambag\'al'],
        ['Happy', 'Baxtli'],
        ['Sad', 'Qayg\'uli']
    ];

    const sentencesA1 = [
        'Hello, how are you? - Salom, qalaysiz?',
        'I am fine, thank you. - Men yaxshiman, rahmat.',
        'What is your name? - Ismingiz nima?',
        'My name is ... - Mening ismim ...',
        'Where are you from? - Qayerdansiz?',
        'I am from Uzbekistan. - Men O\'zbekistondanman.',
        'How old are you? - Yoshingiz nechada?',
        'I am 20 years old. - Men 20 yoshdaman.',
        'What do you do? - Nima ish qilasiz?',
        'I am a student. - Men talabaman.',
        'I like reading. - Men o\'qishni yaxshi ko\'raman.',
        'Do you like music? - Siz musiqani yaxshi ko\'rasizmi?',
        'Yes, I do. - Ha, yaxshi ko\'raman.',
        'No, I do not. - Yo\'q, yaxshi ko\'rmayman.',
        'I love you. - Men sizni sevaman.',
        'I have a book. - Mening kitobim bor.',
        'She has a cat. - Uning mushugi bor.',
        'They have a car. - Ularning mashinasi bor.',
        'We are friends. - Biz do\'stmiz.',
        'He is my brother. - U mening akam.',
        'She is my sister. - U mening singlim.',
        'This is my house. - Bu mening uyim.',
        'That is your bag. - Bu sizning sumkangiz.',
        'These are apples. - Bular olmalar.',
        'Those are oranges. - Anorlar apelsinlar.',
        'I want water. - Men suv istayman.',
        'I need help. - Menga yordam kerak.',
        'Please sit down. - Iltimos, o\'tiring.',
        'Thank you very much. - Katta rahmat.',
        'You are welcome. - Arzimaydi.'
    ];

    // Har bir kun uchun 8 so'z va 5 jumla
    const startIdx = ((day - 1) * 8) % wordsA1.length;
    const endIdx = startIdx + 8;
    const dayWords = [];
    for (let i = startIdx; i < endIdx; i++) {
        const idx = i % wordsA1.length;
        dayWords.push(`${wordsA1[idx][0]} - ${wordsA1[idx][1]}`);
    }

    const startSentence = ((day - 1) * 5) % sentencesA1.length;
    const daySentences = [];
    for (let i = startSentence; i < startSentence + 5; i++) {
        const idx = i % sentencesA1.length;
        daySentences.push(sentencesA1[idx]);
    }

    return {
        words: dayWords,
        sentences: daySentences,
        grammar: `📘 A1 grammatika: "to be" fe'li (am/is/are). Masalan: I am, You are, He/She/It is. ${day}-kun uchun so'zlar va jumlalarni o'rganing.`
    };
}

// ========== A2 DARAJASI (61-180 KUN) ==========
function generateA2(day) {
    const wordsA2 = [
        ['Beautiful', 'Chiroyli'],
        ['Handsome', 'Kelishgan'],
        ['Intelligent', 'Aqlli'],
        ['Clever', 'Zukko'],
        ['Kind', 'Mehribon'],
        ['Friendly', 'Do\'stona'],
        ['Generous', 'Saxiy'],
        ['Stingy', 'Ziq'],
        ['Honest', 'Rostgo\'y'],
        ['Dishonest', 'Yolg\'onchi'],
        ['Brave', 'Jasur'],
        ['Coward', 'Qo\'rqoq'],
        ['Patient', 'Sabrli'],
        ['Impatient', 'Sabrsiz'],
        ['Responsible', 'Mas\'uliyatli'],
        ['Irresponsible', 'Mas\'uliyatsiz'],
        ['Reliable', 'Ishonchli'],
        ['Unreliable', 'Ishonchsiz'],
        ['Polite', 'Xushmuomala'],
        ['Rude', 'Qo\'pol'],
        ['Shy', 'Uyatchan'],
        ['Confident', 'Ishonchli'],
        ['Lazy', 'Dangasa'],
        ['Hardworking', 'Mehnatkash'],
        ['Careful', 'Ehtiyotkor'],
        ['Careless', 'Ehtiyotsiz'],
        ['Cheerful', 'Quvnoq'],
        ['Gloomy', 'G\'amgin'],
        ['Optimistic', 'Optimistik'],
        ['Pessimistic', 'Pessimistik']
    ];

    const sentencesA2 = [
        'I have been studying English for two years. - Men ikki yildan beri ingliz tilini o\'rganyapman.',
        'She has already finished her homework. - U allaqachon uy vazifasini tugatdi.',
        'They have never been to London. - Ular hech qachon Londonda bo\'lmagan.',
        'We have just eaten lunch. - Biz hozirgina tushlik qildik.',
        'He has lived here since 2010. - U 2010 yildan beri shu yerda yashaydi.',
        'I have known her for a long time. - Men uni uzoq vaqtdan beri bilaman.',
        'She has worked at this company for five years. - U bu kompaniyada besh yildan beri ishlaydi.',
        'They have bought a new car. - Ular yangi mashina sotib olishdi.',
        'We have seen this movie before. - Biz bu filmni oldin ko\'rganmiz.',
        'I have lost my keys. - Men kalitlarimni yo\'qotibman.',
        'Have you ever tried sushi? - Siz hech qachon sushi sinab ko\'rganmisiz?',
        'She has not called me yet. - U hali menga qo\'ng\'iroq qilmadi.',
        'They have just arrived. - Ular hozirgina kelishdi.',
        'We have already made plans. - Biz allaqachon rejalar tuzdik.',
        'He has been to Paris three times. - U Parijda uch marta bo\'lgan.',
        'I have always wanted to travel. - Men har doim sayohat qilishni xohlardim.',
        'She has recently started a new job. - U yaqinda yangi ish boshladi.',
        'They have not decided yet. - Ular hali qaror qilmadilar.',
        'We have lived in this city for ten years. - Biz bu shaharda o\'n yildan beri yashaymiz.',
        'He has written three books. - U uchta kitob yozgan.'
    ];

    const startIdx = ((day - 61) * 8) % wordsA2.length;
    const dayWords = [];
    for (let i = startIdx; i < startIdx + 8; i++) {
        const idx = i % wordsA2.length;
        dayWords.push(`${wordsA2[idx][0]} - ${wordsA2[idx][1]}`);
    }

    const startSentence = ((day - 61) * 5) % sentencesA2.length;
    const daySentences = [];
    for (let i = startSentence; i < startSentence + 5; i++) {
        const idx = i % sentencesA2.length;
        daySentences.push(sentencesA2[idx]);
    }

    return {
        words: dayWords,
        sentences: daySentences,
        grammar: `📗 A2 grammatika: Present Perfect (have/has + V3). ${day}-kun. Bugun "for" va "since" ishlatilishini o'rganing.`
    };
}

// ========== B1 DARAJASI (181-365 KUN) ==========
function generateB1(day) {
    const wordsB1 = [
        ['Accommodate', 'Joylashtirmoq'],
        ['Achieve', 'Erishmoq'],
        ['Acquire', 'Egalik qilmoq'],
        ['Adapt', 'Moslashmoq'],
        ['Adjust', 'Sozlamoq'],
        ['Admire', 'Hayratlanmoq'],
        ['Adopt', 'Qabul qilmoq'],
        ['Advance', 'Ilgarilamoq'],
        ['Advocate', 'Targ\'ib qilmoq'],
        ['Affect', 'Ta\'sir qilmoq'],
        ['Aggregate', 'Yig\'moq'],
        ['Allocate', 'Ajratmoq'],
        ['Alter', 'O\'zgartirmoq'],
        ['Analyze', 'Tahlil qilmoq'],
        ['Appreciate', 'Qadrlamoq'],
        ['Approach', 'Yondashmoq'],
        ['Appropriate', 'Tegishli'],
        ['Arrange', 'Tartiblamoq'],
        ['Assess', 'Baholamoq'],
        ['Assign', 'Belgilamoq'],
        ['Assist', 'Yordam qilmoq'],
        ['Assume', 'Taxmin qilmoq'],
        ['Attain', 'Erishmoq'],
        ['Attempt', 'Urinmoq'],
        ['Attend', 'Qatnashmoq'],
        ['Attract', 'Jalb qilmoq'],
        ['Avoid', 'Qochmoq'],
        ['Balance', 'Muvozanatlamoq'],
        ['Bargain', 'Savdolashmoq'],
        ['Benefit', 'Foyda keltirmoq']
    ];

    const sentencesB1 = [
        'If I had more time, I would travel more. - Agar ko\'proq vaqtim bo\'lsa, ko\'proq sayohat qilgan bo\'lardim.',
        'She wishes she had studied harder. - U qattiqroq o\'qishni xohlaydi.',
        'I would rather stay at home tonight. - Men bugun kechqurun uyda qolishni afzal ko\'raman.',
        'He acts as if he owned the place. - U go\'yo bu joyni o\'zi egalik qilgandek harakat qiladi.',
        'It\'s high time we left. - Biz ketadigan vaqt keldi.',
        'I would prefer to eat now. - Men hozir ovqatlanishni afzal ko\'raman.',
        'She had better see a doctor. - U shifokorga ko\'rinsa yaxshi bo\'lardi.',
        'He demanded that she come early. - U erta kelishini talab qildi.',
        'I suggest that we leave now. - Men hozir ketishni taklif qilaman.',
        'It is important that he be here. - U bu yerda bo\'lishi muhim.',
        'They insisted that we stay. - Ular qolishimizni talab qilishdi.',
        'I wish I could help you. - Men sizga yordam bera olsam edi.',
        'She would rather you called later. - U siz keyinroq qo\'ng\'iroq qilishingizni afzal ko\'radi.',
        'If only I had known. - Qaniydi bilganimda edi.',
        'It\'s necessary that everyone participate. - Hamma qatnashishi kerak.',
        'He recommended that I apply for the job. - U ishga ariza berishimni tavsiya qildi.',
        'She proposed that we start early. - U erta boshlashni taklif qildi.',
        'They requested that we wait. - Ular kutishimizni iltimos qilishdi.',
        'I advise that you be careful. - Men ehtiyot bo\'lishingizni maslahat beraman.',
        'It is essential that he arrive on time. - U o\'z vaqtida kelishi juda muhim.'
    ];

    const startIdx = ((day - 181) * 8) % wordsB1.length;
    const dayWords = [];
    for (let i = startIdx; i < startIdx + 8; i++) {
        const idx = i % wordsB1.length;
        dayWords.push(`${wordsB1[idx][0]} - ${wordsB1[idx][1]}`);
    }

    const startSentence = ((day - 181) * 5) % sentencesB1.length;
    const daySentences = [];
    for (let i = startSentence; i < startSentence + 5; i++) {
        const idx = i % sentencesB1.length;
        daySentences.push(sentencesB1[idx]);
    }

    return {
        words: dayWords,
        sentences: daySentences,
        grammar: `📙 B1 grammatika: Subjunctive (if, wish, would rather, it's time). ${day}-kun. Bugun subjunctive shakllarni o'rganing.`
    };
}

// ========== BARCHA 365 KUNNI YARATISH ==========
for (let i = 1; i <= 365; i++) {
    if (i <= 60) {
        window.lessonData[i] = generateA1(i);
    } else if (i <= 180) {
        window.lessonData[i] = generateA2(i);
    } else {
        window.lessonData[i] = generateB1(i);
    }
}

// Jami statistikani ko'rsatish
console.log('📚 365 English Learning ma\'lumotlari yuklandi!');
console.log(`📊 Jami: ${Object.keys(window.lessonData).length} kun`);
