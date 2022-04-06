//EVENT HANDLERS IN MVC

//Hocemo da rukujemo dogadjajem u kontoleru, jer bi u suprotnom imali application logic u view
//Hocemo da slusamo dogadjaje u views, jer bi inace trebali da imamo DOM elemente u kontroleru, kao i presentation logic

//Event Listeners treba da budu zakaceni na DOM element u viewu, ali sa dogadjajima treba da se rukuje pomocu kontroler f-je koja se nalazi u kontroler modulu
//Design Patterns su standardna resenja za neke probleme u programiranju

//View
//U Publischer-Subscriber Patternu imamo neki publischer koji je neki kod koji zna kad da reaguje, u ovom slucaju to je addHandlerRender(), jer sadrzi addEventListener metodu i odatle zna kad da reaguje na dogadjaj

//Module controller.js
//U drugu ruku, imamo Subscriber koji je kod koji zeli da reaguje. Ovo je kod koji treba biti izvrsen kad se dogadjaj desi
//Publischer ne zna da Subscriber postoji, jer je subscriber u kontroleru kom view nema pristup

//Resenje je da prosledimo subscriber f-ju kao argument. To znaci u praksi, da kad se program ucita, init f-ja je pozvana, sto odmah poziva addHandlerRender f-ju iz viewa. To je moguce, jer controller importuje model i view, oboje
//Kad pozovemo addHandlerRender prosledimo joj kao argument controlRecipes f-ju. Mi subscribe controlRecipes f-ju to addHandlerRender. Sad su ove dve f-je povezane
//Sad addHandlerRender slusa na sve dogadjaje, pomocu addEventListener i cim se dogadjd desi, controlRecipes f-ja bice pozvana kao callback f-ju od addEventListener
//U drugom smislu, cim je publisher publishes dogadjaj bice pozvan subscriber
