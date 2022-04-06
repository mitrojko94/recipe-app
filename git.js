//GIT FUNDAMENTALS.

//U svakoj aplikaciji mora imati .gitignore i tu stavljamo sve foldere i fajlove koje zelimo da git ignorise tj. koje ne zelimo u svom repozitorijumu
//git status mi izbaci sve fajlove koji nisu praceni, moramo da ih dodamo
//git add -A dodavanje svih fajlova i fajlovi imaju A, da su dodati
//Ako napravimo neke promene u nekom fajlu, topa u controller.js, fajl ima M(modifikovan) i znamo da se nesto promenilo. Kad ponovo kucam git status vidimo da ima taj fajl da nije dodat
//Zbog toga ponovo moram da kucam git add -A i onda su svi dodati
//commit znaci da sacuvamo sve fajlove u repozitorijumu. Za to koristim komandu git commit -m(sto znaci poruka) "first commit"
//Ponovo kucam git status i vidim da li ima sta da dodam ili ne

//Da vratim fajlove kako su bili kucam git reset --hard HEAD, sve promene ce nestati. A sacuvane su one promene koje su bile kad izvrsen git commit
//Kad dodam nesto novo u kod, moram ponovo da radim git add -A, pa odmah zatim git commit -m "druga poruka"

//Da bih izbrisao poslednji commit koji sam napravio, moram da prvo pogledam u prethodni commit pomocu komande git log koja mi izbaci sve commit koje sam imao. Da bih izasao iz git log kucam q ili :q
//Kopiram id od commita na koji zelim da vratim i kucam komandu git reset --hard kopirani id i treba da se vrati na prethodni commit

//git branch izbacuje listu svih branch koje trenutno imamo. Ako ima *, znaci da smo u tom branchu. Da bih izasao opet kucam q
//Kreiram novi branch pomocu komande git branch ime_brancha, tipa(new-feature)
//Da prebacim u novi branch, kucam git checkout ime_brancha(new-feature)
//Dodajem nove promene pomocu git add -A, odmah zatim git commit -m "neka_poruka". Ovo je kreirano u novom branchu, jer sam ga prethodno napravio i usao u taj branch
//Kad sam to zavrsio, vratim se u master branch(git checkout master) i kod koji sam promenio nestaje, jer on postoji samo u drugom branch-u

//Kad sam u brancu u koji hocu da dodam novi kod, mogu da koristim git merge ime_brancha koji sadrzi novi kod koji hocemo da podelimo sa trenutnim branchom, tipa git merge new-feature i doda mi se novi kod u master branch
//Kucam ponovo git status da vidim da li ima sta da uradim commit
//Sad je kod koji ima u master branchu isti kao u novom branchu(new-feature), jer sam koristio git merge

//Ovo je dobro za pravljenje koda, ali da nema uticaj na originalan kod koji moze da pukne od izmena koje smo napravili. Nikad ne radimo u master branchu, dodamo nove osobine u novi branch i kad zavrsimo spojimo ih u jedan, pomocu git merge
