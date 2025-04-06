// Raspored zvona
const scheduleMorning = [
    { start: "08:00", end: "08:45" },
    { start: "08:50", end: "09:35" },
    { start: "09:50", end: "10:35" },
    { start: "10:40", end: "11:25" },
    { start: "11:30", end: "12:15" },
    { start: "12:20", end: "13:05" },
    { start: "13:10", end: "13:40" }
];

const scheduleAfternoon = [
    { start: "14:00", end: "14:45" },
    { start: "14:50", end: "15:35" },
    { start: "15:50", end: "16:35" },
    { start: "16:40", end: "17:25" },
    { start: "17:30", end: "18:15" },
    { start: "18:20", end: "19:05" },
    { start: "19:10", end: "19:40" }
];function checkFloor() {
    const input = document.getElementById('classroomInput').value;
    const result = document.getElementById('result');
    const room = parseInt(input);
  
    if (isNaN(room) || room < 1 || room > 38) {
      result.textContent = "⚠️ Unesi validan broj učionice (1–38)";
      return;
    }
  
    let floor = "";
    if (room >= 1 && room <= 15) {
      floor = "🟢 Prvi sprat";
    } else if (room >= 16 && room <= 25) {
      floor = "🔵 Drugi sprat";
    } else if (room >= 26 && room <= 38) {
      floor = "🟣 Treći sprat";
    }
  
    result.textContent = `Učionica ${room} se nalazi na: ${floor}`;
  }
  
  function clearInput() {
    document.getElementById('classroomInput').value = '';
    document.getElementById('result').textContent = '';
  }
  
  const jokes = [
    "Zašto učenik nosi merdevine u školu? Jer ide u viši razred!",
    "Kako se zove učitelj bez glasa? Šaptač znanja.",
    "Zašto je knjiga pala sa stola? Jer je imala previše poglavlja.",
    "Učitelj pita: 'Ko zna šta je hemija?' Perica: 'Ljubav na prvi pogled!'",
    "Zašto je učenik nosio kacigu na času? Zato što je učio glavu lekciju!",
    "Učitelj: 'Perice, zašto si zakasnio?' – 'San mi je pobegao!'",
    "Kako se zove robot koji zna sve lekcije? ZnanjeBot.",
    "Programer pita konobara: 'Imate li meni?' – 'Imamo, ali ne HTML meni.'",
    "Zašto AI ne ide u školu? Zato što već zna sve odgovore!",
    "Zašto đaci vole petak? Jer im je to najpametniji dan – zna kad treba da stane!",
    "Kako učiteljica smiruje razred? CTRL + ALT + DEL!",
    "Učenik: 'Znam sve osim onoga što treba za kontrolni.'",
    "Zašto učionica uvek zvuči pametno? Jer ima table i sve znake znanja!",
    "Kako profesor kaže da ga mrzi? Kaže: 'Ispit sledeće nedelje!'",
    "Zašto papir uvek pobedi kamen? Jer ima hemijsku!",
    "Kako se zove miš koji zna sve? Kompjumiš.",
    "Perica: 'Nisam naučio lekciju jer sam imao sastanak sa snom.'",
    "Zašto lenji učenici vole testove? Jer ih brzo uspavaju.",
    "Učitelj: 'Zašto si prepisivao?' – Učenik: 'Vežbao sam timski rad!'",
    "Zašto je profesor matematike loš u pričama? Sve mu se svede na brojke!",
    "Kako se zove učenik koji ne zna ništa? Neznalica Perić.",
    "Zašto su tastature loši đaci? Stalno se igraju s tasterima.",
    "Perica: 'Mogu li da idem u WC?' – Učitelj: 'Napiši sastav dok si tamo.'",
    "Zašto računari ne vole vodu? Boje se da ne dobiju virus.",
    "Kako učenik piše domaći zadatak? Pita Google.",
    "Perica pita učiteljicu: 'Koliko je dva plus dva?' – 'Zavisi... na kontrolnom ili inače?'",
    "Zašto đačka klupa nije srećna? Svi je samo sede i ignorišu.",
    "Kako robot rešava test? Skine ga sa interneta.",
    "Zašto učenici vole da pišu puškice? Da se ne zamore od razmišljanja.",
    "Kako se zove najpametniji đak? Onaj koji zna da se izvuče!",
    "Zašto đak nosi GPS u školu? Da ne zaluta do direktora.",
    "Šta kaže učenik kad dobije 1? 'To je samo početak mog napretka!'",
    "Kako programer rešava kontrolni? Debug-uje pitanja.",
    "Zašto učenici ne veruju tabli? Uvek ih obriše.",
    "Učitelj: 'Ko zna šta je glagol?' – Perica: 'Nešto što glagolji!'",
    "Kako se zove dnevnik koji se ne plaši? Odvažna Knjiga.",
    "Perica: 'Nisam ja pogrešio, već je pitanje bilo pogrešno postavljeno!'",
    "Zašto učitelji ne igraju igrice? Oni već imaju 'questove'.",
    "Koji je najtiši učenik? Onaj koji spava.",
    "Zašto je kreč loš učenik? Zauvek na zidu.",
    "Šta kaže učenik kad vidi raspored? 'Opet ponedeljak?!'",
    "Kako nastavnik šalje poruku? Kroz 'učiteljsku' mrežu.",
    "Zašto je veštačka inteligencija izbačena iz razreda? Znala je previše.",
    "Kako se zove pesimistični đak? Ocenaš bez nade.",
    "Zašto je školski čas kao vežbanje? Sve boli posle.",
    "Učitelj: 'Šta je atomska čestica?' – Perica: 'Nešto sitno i nebitno kao moj uspeh.'",
    "Zašto učenici pišu olovkom? Da mogu da isprave greške – kao u životu!",
    "Koji je najbrži predmet? Domaći koji nestane čim se pita.",
    "Kako đak beži sa časa? Na nevidljivom znanju!",
    "Zašto učenici ponekad ćute? Baterije im se pune.",
    "Kako znaš da je neko odličan đak? Pita pre nego što profesor pita.",
    "Zašto đački ranac ima dugme za reset? Kad se sve zaboravi!",
    "Učitelj: 'Ko zna glavne gradove?' – Perica: 'Ja samo Beograd, i to kad idem kući!'",
    "Zašto pametni đaci ne trče? Njihovo znanje ih stigne pre njih.",
    "Kako se zove školski AI? UčiKoBot!",
    "Zašto učenici vole Wi-Fi? Jer samo tako mogu do znanja.",
    "Perica pita: 'Šta znači GPS?' – 'Gde Perica Skrivao domaći!'",
    "Zašto učenik piše domaći na ruci? Backup plan.",
    "Učitelj: 'Perice, gde ti je sveska?' – 'U cloud-u!'",
    "Zašto učenik nosi naočare? Da bolje vidi kako drugi rade test.",
    "Kako se učenik priprema za test? Uz pomoć Google magije.",
    "Zašto đačka klupa nikad ne protestuje? Sedi mirno ceo dan.",
    "Šta kaže učenik kad dobije peticu? 'Ili sanjam ili je greška u sistemu!'",
    "Kako se zove učenik koji uvek kasni? Vremenski putnik.",
    "Zašto dnevnik voli dramu? Uvek je u centru pažnje.",
    "Kako znate da AI piše pismeni? Nema grešaka, ali i nema duše.",
    "Učitelj: 'Koliko je 3x4?' – Perica: 'Zavisi od nastavnika!'",
    "Zašto učenici mrze kontrolne? Zato što nisu u kontrolu.",
    "Kako učenik prepoznaje dobar dan? Kad mu se profesor ne pojavi.",
    "Zašto đački toalet ima red? Svi beže sa časa.",
    "Kako učenik brani lošu ocenu? Kaže da je test diskriminatorski.",
    "Zašto školski čas traje 45 minuta? Da učenici imaju vremena da odustanu.",
    "Kako se zove đak koji zna sve? Urban mit.",
    "Zašto učenik priča sa AI-em? Jer AI ima više razumevanja.",
    "Kako se piše domaći iz informatike? Copy - Paste.",
    "Zašto se profesor ne šali? On ima ozbiljan predmet.",
    "Kako učenik objašnjava 1? 'Minimalizam je umetnost!'",
    "Perica: 'Nisam pogrešio, već sam kreativno razmišljao!'",
    "Zašto je kontrolni papir tanak? Da brže upije suze.",
    "Kako učenik zna da je kraj časa? Kad baterija u mozgu crkne.",
    "Zašto učenici jedva čekaju odmor? Da zaborave šta su učili.",
    "Učitelj: 'Zašto kasniš?' – 'Testirao sam gravitaciju u krevetu.'",
    "Kako đak ulazi u Google učionicu? Sa molitvom i internetom.",
    "Zašto učenik priča sa tablom? Zato što niko drugi ne sluša.",
    "Kako se zove učitelj koji voli fore? Humorista nastavnik.",
    "Zašto đačka torba ima točkiće? Da učenik ne propadne od težine.",
    "Kako učenik daje test? U nervnom slomu.",
    "Zašto đaci jedu gumice? Jer misle da izbrišu ocene.",
    "Perica: 'Nisam ja kriv, zadatak je bio bezosećajan.'",
    "Učitelj: 'Šta je ovo na testu?' – Perica: 'Apstraktna umetnost znanja!'",
    "Zašto učenik voli veštačku inteligenciju? Ne viče i ne upisuje u dnevnik!",
    "Kako se zove najlenji učenik? Onaj što ni puškicu ne napiše.",
    "Zašto učenici vole AI pomoćnika? Zato što on ne traži roditeljski potpis!",
    "Kako znaš da AI pomaže? Kad ti odgovori brže nego ti razmisliš!"
  ];
