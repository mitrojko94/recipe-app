//THE MVC ARCHITECTURE

//Dobra arhitektura je ona arhitektura ako ima ova tri koraka
//Treba nam struktura da bi organizovali i pobedili kod na razlicite klase, module, f-je - STRUCTURE
//Kad napravimo projekat, uvek mislimo na buducnost i da on nikad nije zavrsen - MAINTAINABILITY
//Dodajemo nove osobine projektu - to je EXPANDABILITY - lako dodavanje novih osobina u buducnosti

//Naravno, mi mozemo da napravimo nasu arhitekturu od pocetka, ali to radi samo sa malim projektima
//Ako je u pitanju veliki projekat, koristi se nesto sto developeri koriste godinama, a to je MVC(model view controller)
//Mozemo da koristimo razne frejmvorke, kao sto je tipa React, gde se ne mora misliti na arhitekturu

//Komponente koje svaka arhitektura mora da ima?
//1. Business logic - sav kod koji resava trenutni biznis problem. Kod povezan direktno sa onim sto biznis radi i sta mu trebai, na primer slanje poruka, cuvanje transakcija
//2. State - cuva sve podatke o aplikaciji koja radi u pretrazivacu, tipa podaci od API, ili sta korisnik unese. Svi podaci moraju biti sync, da bi mogli da se menjaju tj. ako promenis jedan, menja se i drugi. Zbog ovoga postoji mnogo biblioteka
//3. HTTP Library - koristi se za slanje i primanje AJAX poziva, pomocu fetch f-je
//4. Application logic(Router) - kod koji se brine za samu implementaciju aplikacije, na primer rukovanje navigaciju po stranici
//5. Presentation logic(UI Layer) - kod koji je zabrinut za vidljive delove aplikacije. Ovaj deo je zaduzen za prikaz stanja aplikacije korisniku, da bi drzao sve u sync

//Upotreba MVC
//View je prezentaciona logika i sadrzi korisnika
//Model je sve u vezi podataka aplikacije i sadrzi uvek state i business logic. Sadrzi i HTTP biblioteku, jer mogu dobiti neke podatke sa interneta, na primer od API
//Controller sadrzi logiku aplikacije i sedi izmedju viewa i modela. Pravi most izmedju njih, ali ne znam nista o njima

//Glavna prednost MVC je sto odvaja business logic od application logic i cini pravljenje aplikacija mnogo laksim. Ali nam treba nesto da ih povezemo i to je upravo contoller

//Primer:
//Ako se desi klik, on se desi na kontroloru, jer on rukuje sa dogadjajima, jer to znaci raditi nesto u aplikaciji(deo application logic). Onda on azurira korisnicki interfej i trazi od modela neke podatke
//Mozemo da kazemo da kontroler otprema zadatke modelu i viewu
//Ako trazim podatke od modela, on mora doci do upotrebe AJAX poziva ka internetu. TO model radi
//Kad podaci stignu, kontrolor uzima podatke i salje i view i onda se podaci prikazuju korisniku, jer to radi view
//Model i View su samostalni i izolovani, ne importuju jedni druge, kao ni kontroler, ne znaju ni da kontroloer cak postoji. Samo cekaju neke instrukcije od kontrolora

//Puna strelica predstavlja zvanje f-ja i importovanje modula. Samo kontoler to ima, pune strelice
//Isprekidana strelica predstavlja rutu kuda idu podaci
