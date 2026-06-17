/* ===================================================================
   EDUKIAK — Zerbitzuak (euskeraz). Datu hutsa: gehitu tema/asignatura
   bat hau editatuz, HTML berririk sortu gabe.
   Iturria: Joseba Mirena Bilbao Requena-ren apunteak (CC BY-NC-SA 2.5).
   =================================================================== */
const CURSO = {
  asignaturak: [
    {
      id: "zerbitzuak", izena: "Zerbitzuak", ikonoa: "🌐",
      temak: [

/* ============================ TEMA 0 ============================ */
{
  id:"zer-t0", zenbakia:0, izenburua:{eu:"Makina birtualak eta IPak",es:"Máquinas virtuales e IPs"}, puntuak:120,
  laburpena:{eu:"Prestatu laborategia: Ubuntu zerbitzaria + Ubuntu/Windows bezeroak VirtualBox-en, IP finkoarekin. Eta ulertu Ubuntu arruntak nola egiten duen zerbitzari-lana.",es:"Prepara el laboratorio: Ubuntu servidor + clientes Ubuntu/Windows en VirtualBox, con IP fija. Y entiende cómo un Ubuntu normal hace de servidor."},
  atalak:[
    {mota:"helburua", testua:{eu:"Prestatu laborategi osoa `VirtualBox`-en: **Ubuntu bat zerbitzari-rolean**, eta **bezeroak Ubuntu zein Windows**. Jarri IP finkoa makina bakoitzari `192.168.4.0/24` sarean eta lotu denak, gainerako zerbitzu guztiak probatu ahal izateko. Hau da kurtso osoaren oinarria.",es:"Prepara todo el laboratorio en `VirtualBox`: **un Ubuntu en rol de servidor** y **clientes Ubuntu y Windows**. Pon IP fija a cada máquina en la red `192.168.4.0/24` y conéctalas todas para poder probar el resto de servicios. Es la base de todo el curso."}},
    {mota:"analogia", testua:{eu:"Pisuen eraikin bat. **Eraikina** zure ordenagailu erreala da (CPU, RAM, diskoa). **Pisu** bakoitza makina birtual bat da: bere hormak, atea eta maizterra (sistema eragile bat) ditu, etxe oso bat balu bezala. Pisuei argia eta ura banatzen dien **atezaina** hipervisorea da: VirtualBox.",es:"Un edificio de pisos. **El edificio** es tu ordenador real (CPU, RAM, disco). **Cada piso** es una máquina virtual: tiene sus paredes, su puerta y su inquilino (un sistema operativo), como una casa entera. **El portero** que reparte luz y agua a los pisos es el hipervisor: VirtualBox."}},
    {mota:"izenburua", testua:{eu:"1. Birtualizazioa eta rolak",es:"1. Virtualización y roles"}},
    {mota:"teoria", testua:{eu:"Makina birtual (VM) bat software bidez emulatutako ordenagailu oso bat da, zure ordenagailu errealaren barruan. Bi rol bereizten ditugu makinetan: **anfitrioia** (host, makina fisikoa) eta **gonbidatua** (guest, birtualizatutako sistema eragile bakoitza). VM-ak kudeatzen dituen programa **hipervisorea** da (VirtualBox).",es:"Una máquina virtual (VM) es un ordenador completo emulado por software dentro de tu ordenador real. Hay dos roles de máquina: **anfitrión** (host, la máquina física) e **invitado** (guest, cada SO virtualizado). El programa que gestiona las VM es el **hipervisor** (VirtualBox)."}},
    {mota:"teoria", testua:{eu:"Sarean ere bi rol: **zerbitzaria** (zerbitzua eskaintzen duena: DNS, DHCP, web…) eta **bezeroa** (zerbitzua erabiltzen duena). Laborategi honetan ia beti **Ubuntu bat da zerbitzaria**, eta bezeroak **Ubuntu eta Windows** dira, zerbitzuak bi sistemetatik probatzeko.",es:"En la red también hay dos roles: **servidor** (el que ofrece un servicio: DNS, DHCP, web…) y **cliente** (el que lo usa). En este laboratorio casi siempre **un Ubuntu es el servidor**, y los clientes son **Ubuntu y Windows**, para probar los servicios desde ambos sistemas."}},
    {mota:"taula", izenburua:{eu:"Aulako makinak eta rola",es:"Máquinas del aula y su rol"}, headers:["Izena","Sistema","RAM/Diskoa","Rola"], rows:[
      ["u18zerbitzaria","Ubuntu 18.04","4096 MB / 30 GB","**Zerbitzaria**"],
      ["u20zerbitzaria","Ubuntu 20.04","4096 MB / 30 GB","Zerbitzaria (ordezkoa)"],
      ["u20zerbitzuak","Ubuntu 20.04","4096 MB / 30 GB","Bezeroa (Linux)"],
      ["w10zerbitzuak","Windows 10","4096 MB / 35 GB","Bezeroa (Windows)"],
      ["u22 / u24","Ubuntu 22/24","4096 MB / 30 GB","Bezero osagarriak"],
      ["w11","Windows 11","4096 MB / 35 GB","Bezero osagarria"]]},
    {mota:"izenburua", testua:{eu:"2. Ubuntu arrunt batek zerbitzari gisa balio al du?",es:"2. ¿Un Ubuntu normal sirve como servidor?"}},
    {mota:"teoria", testua:{eu:"**Bai.** Hau da gako kontzeptuala. **Ubuntu Desktop eta Ubuntu Server sistema bera dira** oinarrian (nukleo bera, `apt` biltegi berak). \"Server\" ez da banaketa magiko bat: **instalazio-profil** bat baino ez da, mahaigaineko ingurune grafikorik gabe eta zerbitzarietarako lehenetsitako pakete batzuekin datorrena.",es:"**Sí.** Este es el concepto clave. **Ubuntu Desktop y Ubuntu Server son el mismo sistema** de base (mismo núcleo, mismos repositorios `apt`). \"Server\" no es una distribución mágica: es solo un **perfil de instalación**, sin entorno gráfico de escritorio y con algunos paquetes por defecto para servidores."}},
    {mota:"teoria", testua:{eu:"Makina bat zerbitzari bihurtzen duena **ez da banaketa, zerbitzua (daemon-a) baizik**. Ubuntu arrunt batean `apt`-rekin zerbitzua instalatu eta `systemctl`-rekin abiarazten duzunean, zerbitzari bihurtzen da. Adibidez: `bind9` (DNS), `isc-dhcp-server`, `apache2`, `samba`, `vsftpd`, `postfix`… denak instala daitezke Ubuntu Desktop arrunt batean.",es:"Lo que convierte una máquina en servidor **no es la distribución, sino el servicio (el daemon)**. Cuando en un Ubuntu normal instalas el servicio con `apt` y lo arrancas con `systemctl`, se convierte en servidor. Por ejemplo: `bind9` (DNS), `isc-dhcp-server`, `apache2`, `samba`, `vsftpd`, `postfix`… todos se pueden instalar en un Ubuntu Desktop normal."}},
    {mota:"oharra", izenburua:{eu:"\"Zerbitzari bihurtu\" = 3 urrats",es:"\"Convertir en servidor\" = 3 pasos"}, testua:{eu:"1) **Instalatu** zerbitzua (`sudo apt install <zerbitzua>`). 2) **Konfiguratu** bere fitxategiak. 3) **Abiarazi eta gaitu** (`sudo systemctl enable --now <zerbitzua>`). Ez dago beste ezer: ez duzu Ubuntu Server behar.",es:"1) **Instala** el servicio (`sudo apt install <servicio>`). 2) **Configura** sus ficheros. 3) **Arranca y habilita** (`sudo systemctl enable --now <servicio>`). No hay nada más: no necesitas Ubuntu Server."}},
    {mota:"taula", izenburua:{eu:"Ubuntu Desktop vs Server (laborategirako)",es:"Ubuntu Desktop vs Server (para el laboratorio)"}, headers:["Alderdia","Desktop","Server"], rows:[
      ["Ingurune grafikoa","Bai (GNOME)","Ez (terminala)"],["Webmin / nabigatzailea","Erosoa","Terminala soilik"],["Baliabide-kontsumoa","Handiagoa","Txikiagoa"],["Zerbitzuak eman","**Bai, denak**","Bai, denak"]]},
    {mota:"oharra", testua:{eu:"Aulan **Ubuntu Desktop** erabiltzen da zerbitzari gisa: GUIa edukitzeak errazten du nabigatzailea, Webmin eta konfigurazioa. Funtsean Ubuntu Server bezain ondo dabil zerbitzu guztietan.",es:"En el aula se usa **Ubuntu Desktop** como servidor: tener GUI facilita el navegador, Webmin y la configuración. En esencia funciona igual de bien que Ubuntu Server en todos los servicios."}},
    {mota:"izenburua", testua:{eu:"3. VMak sortu pausoz pauso",es:"3. Crear las VM paso a paso"}},
    {mota:"pausoak", izenburua:{eu:"3.1 · Ubuntu zerbitzaria (u18zerbitzaria)",es:"3.1 · Servidor Ubuntu (u18zerbitzaria)"}, items:[
      {izen:{eu:"Sortu VM-a",es:"Crear la VM"}, testua:{eu:"VirtualBox: `Berria → Izena: u18zerbitzaria · Mota: Linux · Bertsioa: Ubuntu (64-bit)`. Memoria 4096 MB, disko berria 30 GB.",es:"VirtualBox: `Nueva → Nombre: u18zerbitzaria · Tipo: Linux · Versión: Ubuntu (64-bit)`. Memoria 4096 MB, disco nuevo 30 GB."}},
      {izen:{eu:"Lotu ISOa eta instalatu",es:"Conectar la ISO e instalar"}, testua:{eu:"`Ezarpenak → Biltegiratzea → CD ikonoa → Ubuntu ISOa`. Abiarazi eta instalatu sistema (erabiltzailea: `mss2`).",es:"`Configuración → Almacenamiento → icono del CD → ISO de Ubuntu`. Arranca e instala el sistema (usuario: `mss2`)."}},
      {izen:{eu:"Guest Additions",es:"Guest Additions"}, testua:{eu:"Instalatu ondoren: `Gailuak → Sartu Guest Additions CD` → pantaila osoa eta arbel partekatua lortzeko.",es:"Tras instalar: `Dispositivos → Insertar imagen de CD de las Guest Additions` → para pantalla completa y portapapeles compartido."}}]},
    {mota:"pausoak", izenburua:{eu:"3.2 · Ubuntu bezeroa (u20zerbitzuak)",es:"3.2 · Cliente Ubuntu (u20zerbitzuak)"}, items:[
      {izen:{eu:"Sortu VM-a",es:"Crear la VM"}, testua:{eu:"Errepikatu 3.1 baina izena `u20zerbitzuak` eta Ubuntu 20.04 ISOarekin. Hau zerbitzuak probatzeko Linux bezeroa izango da.",es:"Repite 3.1 pero con el nombre `u20zerbitzuak` y la ISO de Ubuntu 20.04. Este será el cliente Linux para probar los servicios."}},
      {izen:{eu:"Klonatzea (aukera azkarra)",es:"Clonación (opción rápida)"}, testua:{eu:"VM bat dagoeneko baduzu, `Eskuin-klik → Klonatu → Klonatze osoa`. **Garrantzitsua:** klonatu ondoren aldatu host-izena eta IP-a, talkarik ez egiteko.",es:"Si ya tienes una VM, `Clic derecho → Clonar → Clonación completa`. **Importante:** tras clonar cambia el nombre de host y la IP, para que no choquen."}}]},
    {mota:"pausoak", izenburua:{eu:"3.3 · Windows bezeroa (w10zerbitzuak)",es:"3.3 · Cliente Windows (w10zerbitzuak)"}, items:[
      {izen:{eu:"Sortu VM-a",es:"Crear la VM"}, testua:{eu:"`Berria → Izena: w10zerbitzuak · Mota: Microsoft Windows · Bertsioa: Windows 10 (64-bit)`. Memoria 4096 MB, disko 35 GB.",es:"`Nueva → Nombre: w10zerbitzuak · Tipo: Microsoft Windows · Versión: Windows 10 (64-bit)`. Memoria 4096 MB, disco 35 GB."}},
      {izen:{eu:"Instalatu Windows",es:"Instalar Windows"}, testua:{eu:"Lotu Windows 10 ISOa eta instalatu. Bezero hau Samba, FTP, web eta posta Windows-etik probatzeko erabiliko da.",es:"Conecta la ISO de Windows 10 e instala. Este cliente se usará para probar Samba, FTP, web y correo desde Windows."}},
      {izen:{eu:"Guest Additions",es:"Guest Additions"}, testua:{eu:"`Gailuak → Sartu Guest Additions CD` eta exekutatu instalatzailea Windows barruan.",es:"`Dispositivos → Insertar imagen de CD de las Guest Additions` y ejecuta el instalador dentro de Windows."}}]},
    {mota:"izenburua", testua:{eu:"4. Sarea: zubi-adaptadorea eta IP finkoa",es:"4. Red: adaptador puente e IP fija"}},
    {mota:"teoria", testua:{eu:"VM bakoitzean: `Ezarpenak → Sarea → 1. adaptadorea → Konektatuta: Zubi-adaptadorea`. Zubiak VM-a sare fisiko berera lotzen du, LANeko IP batekin; horrela makina guztiek elkar ikusten dute eta irakaslea (`192.168.4.10`) iristen da.",es:"En cada VM: `Configuración → Red → Adaptador 1 → Conectado a: Adaptador puente`. El puente conecta la VM a la misma red física, con una IP de la LAN; así todas las máquinas se ven entre sí y se llega al profesor (`192.168.4.10`)."}},
    {mota:"teoria", izenburua:{eu:"4.1 · IP finkoa Ubuntu-n (netplan)",es:"4.1 · IP fija en Ubuntu (netplan)"}, testua:{eu:"Ubuntu-k **netplan** erabiltzen du. Aldatu `enp0s3` zure interfazearen izen errealagatik (`ip a`) eta azken zenbakia irakasleak esandakoagatik (zerbitzaria, adib., `.101`).",es:"Ubuntu usa **netplan**. Cambia `enp0s3` por el nombre real de tu interfaz (`ip a`) y el último número por el que indique el profesor (servidor, p. ej., `.101`)."}},
    {mota:"terminala", host:"u18zerbitzaria", lerroak:[{cmd:"ip a", cmt:"interfazearen izena ikusi"},{cmd:"sudo nano /etc/netplan/01-netcfg.yaml"}]},
    {mota:"fitxategia", izena:"/etc/netplan/01-netcfg.yaml", edukia:"network:\n  version: 2\n  ethernets:\n    enp0s3:\n      dhcp4: no\n      addresses: [192.168.4.101/24]\n      gateway4: 192.168.4.1\n      nameservers:\n        addresses: [8.8.8.8, 8.8.4.4]"},
    {mota:"terminala", host:"u18zerbitzaria", lerroak:[{cmd:{eu:"sudo netplan apply",es:"sudo netplan apply"}},{cmd:"ip a", cmt:"IP zuzena egiaztatu"},{cmd:"ping -c2 8.8.8.8", cmt:"Internetera irtetea egiaztatu"}]},
    {mota:"taula", izenburua:{eu:"4.2 · IP finkoa Windows bezeroan",es:"4.2 · IP fija en el cliente Windows"}, headers:["Eremua","Balioa"], rows:[
      ["Non","Ezarpenak → Sarea → Adaptadorea → IPv4 propietateak"],["IP helbidea","192.168.4.X (bezeroa)"],["Maskara","255.255.255.0"],["Atebidea","192.168.4.1"],["DNS hobetsia","**192.168.4.101** (zure Ubuntu zerbitzaria)"]]},
    {mota:"oharra", izenburua:{eu:"Windows-en DNS Ubuntu zerbitzarira",es:"El DNS de Windows hacia el servidor Ubuntu"}, testua:{eu:"Windows bezeroari DNS gisa zure Ubuntu zerbitzariaren IP-a jartzen badiozu, zure zerbitzariko izenak ebatziko ditu (ikus Tema 2). Hala lotzen dira bezeroak zure zerbitzura izen bidez, ez IP soilez.",es:"Si pones como DNS del cliente Windows la IP de tu servidor Ubuntu, resolverá los nombres de tu servidor (ver Tema 2). Así los clientes se conectan a tu servidor por nombre, no solo por IP."}},
    {mota:"izenburua", testua:{eu:"5. Bezeroak lotu eta probatu",es:"5. Conectar y probar los clientes"}},
    {mota:"teoria", testua:{eu:"Konexioa egiaztatzeko, ping egin makinen artean. Gero, zerbitzu bakoitza dagokion bezerotik probatzen da: Samba (Tema 5), FTP (Tema 6), web (Tema 8)… **Kontu zentralizatuak** (domeinu antzeko bat) **OpenLDAP**-ekin lortzen dira (Tema 8): bezeroak zerbitzariko kontuekin saioa hasten dute.",es:"Para comprobar la conexión, haz ping entre las máquinas. Luego cada servicio se prueba desde su cliente: Samba (Tema 5), FTP (Tema 6), web (Tema 8)… Las **cuentas centralizadas** (algo parecido a un dominio) se logran con **OpenLDAP** (Tema 8): los clientes inician sesión con cuentas del servidor."}},
    {mota:"terminala", izenburua:{eu:"5.1 · Konektagarritasun-proba",es:"5.1 · Prueba de conectividad"}, host:"u20zerbitzuak — bezeroa", lerroak:[
      {cmd:"ping -c2 192.168.4.101", cmt:"bezerotik zerbitzarira"},{cmd:"ping -c2 192.168.4.10", cmt:"irakaslea"}]},
    {mota:"oharra", izenburua:{eu:"Windows-ek ping-i ez badio erantzuten",es:"Si Windows no responde al ping"}, testua:{eu:"Windows-ek defektuz **ICMP (ping) blokeatzen** du bere suebakian. Bezeroari ping egitea nahi baduzu, gaitu \"File and Printer Sharing (Echo Request - ICMPv4-In)\" erregela Windows Defender suebakian.",es:"Windows por defecto **bloquea el ICMP (ping)** en su cortafuegos. Si quieres poder hacer ping al cliente, habilita la regla \"Compartir archivos e impresoras (petición de eco - ICMPv4 de entrada)\" en el Firewall de Windows Defender."}},
    {mota:"taula", izenburua:{eu:"5.2 · Zein VM ariketa bakoitzean",es:"5.2 · Qué VM en cada ejercicio"}, headers:["Zerbitzua (tema)","Zerbitzaria","Bezeroak"], rows:[
      ["DNS (T2) / DHCP (T3)","u18zerbitzaria","u20zerbitzuak · w10zerbitzuak"],["Urruneko saioak (T4)","u18zerbitzaria","u20zerbitzuak · w10zerbitzuak"],["Samba/Proxy (T5)","u18zerbitzaria / u20zerbitzuak","w10zerbitzuak · u20zerbitzuak"],["FTP (T6) / Posta (T7)","u18zerbitzaria","u20zerbitzuak · w10zerbitzuak"],["Web/LDAP (T8)","u18zerbitzaria / u20zerbitzuak","bezero guztiak"]]},
    {mota:"errorea", testua:{eu:"**1. NAT zubiaren ordez.** NAT moduan VM-ek ez dute elkar ikusten; erabili **zubi-adaptadorea**. **2. IP errepikatua** (klonatu eta aldatu gabe) → talka. **3. Guest Additions ahaztea** → pantaila murriztua. **4. Windows-en suebakiak ping/zerbitzuak blokeatzen ditu** defektuz. **5. \"Ubuntu Server behar dut\" pentsatzea**: ez, Desktop-ean instalatu zerbitzua eta kito.",es:"**1. Usar NAT en vez de puente.** En NAT las VM no se ven; usa **adaptador puente**. **2. IP repetida** (clonar sin cambiarla) → choque. **3. Olvidar las Guest Additions** → pantalla reducida. **4. El cortafuegos de Windows bloquea ping/servicios** por defecto. **5. Pensar que \"necesito Ubuntu Server\"**: no, instala el servicio en Desktop y listo."}}
  ],
  ariketak:[
    {maila:1, izenburua:{eu:"Ubuntu zerbitzaria sortu",es:"Crear el servidor Ubuntu"}, testua:{eu:"Sortu `u18zerbitzaria` (Ubuntu, 4096 MB, 30 GB), instalatu sistema eta Guest Additions. Hau izango da zure zerbitzaria.",es:"Crea `u18zerbitzaria` (Ubuntu, 4096 MB, 30 GB), instala el sistema y las Guest Additions. Este será tu servidor."}, arrakasta:{eu:"VM-a abiarazten da, `ip a`-k interfaze aktibo bat erakusten du eta pantaila osoa lortzen duzu.",es:"La VM arranca, `ip a` muestra una interfaz activa y consigues pantalla completa."}},
    {maila:2, izenburua:{eu:"Ubuntu eta Windows bezeroak sortu",es:"Crear los clientes Ubuntu y Windows"}, testua:{eu:"Sortu `u20zerbitzuak` (Ubuntu bezeroa) eta `w10zerbitzuak` (Windows 10 bezeroa). Klonatzea erabil dezakezu Ubunturentzat, baina aldatu host-izena eta IP-a.",es:"Crea `u20zerbitzuak` (cliente Ubuntu) y `w10zerbitzuak` (cliente Windows 10). Puedes clonar para el Ubuntu, pero cambia el nombre de host y la IP."}, arrakasta:{eu:"Hiru VMak abiarazten dira eta bakoitzak bere host-izen propioa du.",es:"Las tres VM arrancan y cada una tiene su propio nombre de host."}},
    {maila:3, izenburua:{eu:"Sarea: zubia + IP finkoa + ping",es:"Red: puente + IP fija + ping"}, testua:{eu:"Jarri hirurak zubi-adaptadorean. IP finkoa: zerbitzaria `192.168.4.101`, bezeroak beste zenbaki batzuk (errepikatu gabe). Windows bezeroan jarri DNS gisa `192.168.4.101`.",es:"Pon las tres en puente. IP fija: servidor `192.168.4.101`, clientes con otros números (sin repetir). En el cliente Windows pon como DNS `192.168.4.101`."}, arrakasta:{eu:"Bezero bakoitzetik `ping 192.168.4.101`-ek erantzuten du eta zerbitzaritik Internetera (`ping 8.8.8.8`) irteten zara.",es:"Desde cada cliente `ping 192.168.4.101` responde y desde el servidor sales a Internet (`ping 8.8.8.8`)."}},
    {maila:4, izenburua:{eu:"Ubuntu arrunta zerbitzari gisa frogatu",es:"Demostrar un Ubuntu normal como servidor"}, testua:{eu:"Zure Ubuntu zerbitzarian (Desktop, ez Server) instalatu `openssh-server` (`sudo apt install -y openssh-server`). Windows bezerotik konektatu PowerShell-eko `ssh mss2@192.168.4.101` edo PuTTY erabiliz.",es:"En tu servidor Ubuntu (Desktop, no Server) instala `openssh-server` (`sudo apt install -y openssh-server`). Conéctate desde el cliente Windows con `ssh mss2@192.168.4.101` en PowerShell o con PuTTY."}, arrakasta:{eu:"Windows-etik zure Ubuntu Desktop-eko terminalean sartzen zara: Desktop-ak zerbitzari gisa funtzionatzen duela frogatuta.",es:"Desde Windows entras en la terminal de tu Ubuntu Desktop: queda demostrado que el Desktop funciona como servidor."}},
    {maila:4, izenburua:{eu:"Karpeta partekatua anfitrioiarekin",es:"Carpeta compartida con el anfitrión"}, testua:{eu:"Konfiguratu VirtualBox-en partekatutako karpeta bat anfitrioiaren eta VM-aren artean, ISO eta fitxategiak sarea gabe mugitzeko. Soluziorik gabe.",es:"Configura en VirtualBox una carpeta compartida entre el anfitrión y la VM, para mover ISOs y ficheros sin red. Sin solución."}}
  ],
  galdetegia:[
    {galdera:{eu:"Zer da VirtualBox laborategian?",es:"¿Qué es VirtualBox en el laboratorio?"}, aukerak:[{eu:"Sistema eragile gonbidatua",es:"Un sistema operativo invitado"},{eu:"VM-ei baliabideak banatzen dizkien hipervisorea",es:"El hipervisor que reparte recursos a las VM"},{eu:"PC-aren sare-txartela",es:"La tarjeta de red del PC"}], zuzena:1, azalpena:{eu:"Hipervisorea anfitrioiaren CPU, RAM eta diskoa gonbidatuen artean banatzen duen softwarea da.",es:"El hipervisor es el software que reparte la CPU, RAM y disco del anfitrión entre los invitados."}},
    {galdera:{eu:"VM-ek elkar ikusi eta irakasleak iristeko, zer sare-modu aukeratzen duzu?",es:"Para que las VM se vean entre sí y llegue el profesor, ¿qué modo de red eliges?"}, aukerak:[{eu:"NAT",es:"NAT"},{eu:"Konektatu gabe",es:"Sin conectar"},{eu:"Zubi-adaptadorea",es:"Adaptador puente"}], zuzena:2, azalpena:{eu:"Zubiak VM-a sare fisikora konektatzen du zuzenean, LANeko IP batekin.",es:"El puente conecta la VM directamente a la red física, con una IP de la LAN."}},
    {galdera:{eu:"Aulako sarean, zein dira maskara eta atebidea?",es:"En la red del aula, ¿cuáles son la máscara y la puerta de enlace?"}, aukerak:[{eu:"255.255.255.0 eta 192.168.4.1",es:"255.255.255.0 y 192.168.4.1"},{eu:"255.255.0.0 eta 8.8.8.8",es:"255.255.0.0 y 8.8.8.8"},{eu:"255.255.255.0 eta 192.168.4.10",es:"255.255.255.0 y 192.168.4.10"}], zuzena:0, azalpena:{eu:"/24 = 255.255.255.0. Atebidea .4.1 da; .4.10 irakaslearen ekipoa da.",es:"/24 = 255.255.255.0. La puerta de enlace es .4.1; .4.10 es el equipo del profesor."}},
    {galdera:{eu:"netplan editatu ondoren, zein komandok aplikatzen ditu aldaketak?",es:"Tras editar netplan, ¿qué comando aplica los cambios?"}, aukerak:[{eu:"sudo systemctl restart network",es:"sudo systemctl restart network"},{eu:"sudo netplan apply",es:"sudo netplan apply"},{eu:"sudo ip reload",es:"sudo ip reload"}], zuzena:1, azalpena:{eu:"netplan-ek YAML-a irakurri eta sarea berregokitzen du `netplan apply`-rekin.",es:"netplan lee el YAML y reconfigura la red con `netplan apply`."}},
    {galdera:{eu:"Ubuntu Desktop arrunt batek zerbitzari-lana egin dezake?",es:"¿Un Ubuntu Desktop normal puede hacer de servidor?"}, aukerak:[{eu:"Ez, Ubuntu Server banaketa behar da",es:"No, hace falta la distribución Ubuntu Server"},{eu:"Bai: zerbitzua `apt`-z instalatu eta `systemctl`-z abiarazi besterik ez",es:"Sí: basta con instalar el servicio con `apt` y arrancarlo con `systemctl`"},{eu:"Bakarrik makina birtuala bada",es:"Solo si es máquina virtual"}], zuzena:1, azalpena:{eu:"Desktop eta Server sistema bera dira; zerbitzaria egiten duena instalatutako zerbitzua (daemon-a) da, ez banaketa.",es:"Desktop y Server son el mismo sistema; lo que hace de servidor es el servicio (daemon) instalado, no la distribución."}}
  ]
},

/* ============================ TEMA 1 ============================ */
{
  id:"zer-t1", zenbakia:1, izenburua:{eu:"TCP/IP eta enrutamendua",es:"TCP/IP y enrutamiento"}, puntuak:130,
  laburpena:{eu:"IP helbideak, maskara, klaseak eta bideratze-taulak (Helmuga/Bidea). Asignatura osoaren oinarria.",es:"Direcciones IP, máscara, clases y tablas de enrutamiento (Destino/Vía). La base de toda la asignatura."},
  atalak:[
    {mota:"helburua", testua:{eu:"Ulertu nola identifikatzen diren makinak IP helbide batekin eta nola aurkitzen duen pakete batek beste sare bateraino bidea.",es:"Entender cómo se identifican las máquinas con una dirección IP y cómo encuentra un paquete el camino hasta otra red."}},
    {mota:"analogia", testua:{eu:"Posta-helbide bat: `Hiria · Kalea · Zenbakia`. **Maskara** \"zer den hiria\" (sarea) eta \"zer den atari-zenbakia\" (ekipoa) bereizten dituen lerroa da. Postariak hiria baino ez du behar bidaltzeko.",es:"Una dirección postal: `Ciudad · Calle · Número`. La **máscara** es la línea que separa \"qué es la ciudad\" (la red) de \"qué es el número de portal\" (el equipo). El cartero solo necesita la ciudad para enviarlo."}},
    {mota:"izenburua", testua:{eu:"1. IP helbidea",es:"1. La dirección IP"}},
    {mota:"teoria", testua:{eu:"IPv4 bat **32 bit** da, 0-255 arteko 4 zortzikote: `192.168.4.101`. **Maskarak** zenbat bit hasierako sarea diren esaten du. `/24`-rekin (255.255.255.0) lehen hiru zortzikoteak sarea dira eta azkenak ekipoa identifikatzen du.",es:"Una IPv4 son **32 bits**, 4 octetos de 0 a 255: `192.168.4.101`. La **máscara** dice cuántos bits iniciales son la red. Con `/24` (255.255.255.0) los tres primeros octetos son la red y el último identifica el equipo."}},
    {mota:"taula", izenburua:{eu:"Klaseak eta tarte pribatuak",es:"Clases y rangos privados"}, headers:["Klasea","1. zortzikotea","Erabilera"], rows:[
      ["A","1 – 126","Sare erraldoiak"],["B","128 – 191","Sare ertainak"],["C","192 – 223","Sare txikiak (aula)"],["D / E","224 – 255","Multicast / erreserbatua"]]},
    {mota:"teoria", testua:{eu:"**Helbide pribatuak** (NAT gabe Internetera irteten ez direnak): `10.0.0.0/8`, `172.16.0.0/12` eta `192.168.0.0/16`. Horregatik erabiltzen du aulak `192.168.4.0/24`.",es:"**Direcciones privadas** (las que no salen a Internet sin NAT): `10.0.0.0/8`, `172.16.0.0/12` y `192.168.0.0/16`. Por eso el aula usa `192.168.4.0/24`."}},
    {mota:"teoria", izenburua:{eu:"Sarea, broadcast eta hostak",es:"Red, broadcast y hosts"}, testua:{eu:"Sare bakoitzean: **sare-helbidea** (host-bitak 0 → `192.168.4.0`), **host-helbideak** (ekipoek erabilgarriak) eta **broadcast** (host-bitak 1 → `192.168.4.255`). /24 batean 254 host erabilgarri daude.",es:"En cada red: **dirección de red** (bits de host a 0 → `192.168.4.0`), **direcciones de host** (las usables por los equipos) y **broadcast** (bits de host a 1 → `192.168.4.255`). En un /24 hay 254 hosts utilizables."}},
    {mota:"simuladorea", id:"ip"},
    {mota:"izenburua", testua:{eu:"2. Enrutamendua: nondik irteten da paketea?",es:"2. Enrutamiento: ¿por dónde sale el paquete?"}},
    {mota:"analogia", testua:{eu:"Postariak ez ditu munduko etxe guztiak ezagutzen. **Gida** bat du: \"hiri honetarako → iparraldeko kamioia; ezagutzen ez dudana → erdiguneko biltegira\". Gida hori **bideratze-taula** da. Router batek gauza bera egiten du pakete bakoitzarekin: helmuga begiratu eta erabaki nondik bidali.",es:"El cartero no conoce todas las casas del mundo. Tiene una **guía**: \"para esta ciudad → el camión del norte; lo que no conozco → al almacén central\". Esa guía es la **tabla de enrutamiento**. Un router hace lo mismo con cada paquete: mira el destino y decide por dónde enviarlo."}},
    {mota:"oharra", izenburua:{eu:"Bideratze-taula irakurtzen",es:"Cómo leer una tabla de rutas"}, testua:{eu:"Errenkada bakoitzak dio: **helmuga-sare hau → bidali honantz**. `local` jartzen badu, sarea zuzenean konektatuta dago (router-ak berak entregatzen du). `via IP` jartzen badu, hurrengo router-ari pasatzen dio. Probatu goiko simuladorean: aldatu helmuga eta ikusi zein errenkada hautatzen den.",es:"Cada fila dice: **para esta red de destino → envía por aquí**. Si pone `local`, la red está conectada directamente (la entrega el propio router). Si pone `via IP`, se la pasa al siguiente router. Pruébalo en el simulador de abajo: cambia el destino y mira qué fila se elige."}},
    {mota:"teoria", testua:{eu:"**Urrezko araua:** helmugarekin bat datozen errenkadetatik, **aurrizki luzeena** (zehatzena) duena irabazten du. Adibidez, `192.168.4.20`-rentzat, `192.168.4.0/24` (zehatza) irabazten dio `0.0.0.0/0`-ri. Inork bat egiten ez badu, **lehenetsitako bidea** (`0.0.0.0/0`) erabiltzen da, atebidera doana.",es:"**Regla de oro:** de las filas que coinciden con el destino, gana la del **prefijo más largo** (la más específica). Por ejemplo, para `192.168.4.20`, gana `192.168.4.0/24` (específica) frente a `0.0.0.0/0`. Si ninguna coincide, se usa la **ruta por defecto** (`0.0.0.0/0`), que va a la puerta de enlace."}},
    {mota:"taula", izenburua:{eu:"Bideratze-taula",es:"Tabla de rutas"}, headers:[{eu:"Helmuga",es:"Destino"},{eu:"Bidea",es:"Vía"}], rows:[[{eu:"Helmuga-sare bat",es:"Una red de destino"},{eu:"`local` zuzena bada, edo hurrengo router-aren IP",es:"`local` si es directa, o la IP del siguiente router"}]]},
    {mota:"simuladorea", id:"routing"}
  ],
  ariketak:[
    {maila:1, izenburua:{eu:"IPak sailkatu (2_AS)",es:"Clasificar IPs (2_AS)"}, testua:{eu:"Erabili goiko simuladorea helbide hauekin eta apuntatu klasea eta publikoa/pribatua: `10.20.30.40`, `172.16.5.5`, `8.8.8.8`, `192.168.4.101`.",es:"Usa el simulador de arriba con estas direcciones y anota la clase y si son públicas/privadas: `10.20.30.40`, `172.16.5.5`, `8.8.8.8`, `192.168.4.101`."}, arrakasta:{eu:"Hiru pribatuak dira eta bat publikoa. Zein da publikoa?",es:"Tres son privadas y una pública. ¿Cuál es la pública?"}},
    {maila:2, izenburua:{eu:"Sarea eta broadcast",es:"Red y broadcast"}, testua:{eu:"`192.168.4.101/24`-rako kalkulatu eskuz sare-helbidea, broadcast-a eta host kopurua. Gero egiaztatu simuladorearekin.",es:"Para `192.168.4.101/24` calcula a mano la dirección de red, el broadcast y el número de hosts. Luego compruébalo con el simulador."}, arrakasta:{eu:"sarea `192.168.4.0`, broadcast `192.168.4.255`, 254 host.",es:"red `192.168.4.0`, broadcast `192.168.4.255`, 254 hosts."}},
    {maila:3, izenburua:{eu:"Bideratze-taula (2_AS_1)",es:"Tabla de rutas (2_AS_1)"}, testua:{eu:"Hiru sareko grafo bat emanda (192.168.3.0/24, 172.168.4.0/24, 169.172.100.0/24), idatzi router baten **Helmuga/Bidea** taula osoa. Adierazi zein sare diren `local`.",es:"Dado un grafo de tres redes (192.168.3.0/24, 172.168.4.0/24, 169.172.100.0/24), escribe la tabla **Destino/Vía** completa de un router. Indica qué redes son `local`."}, arrakasta:{eu:"Router-ak bi sare lokal ditu eta gainerakoetara hurrengo saltora birbidaltzen du.",es:"El router tiene dos redes locales y reenvía al siguiente salto el resto."}},
    {maila:4, izenburua:{eu:"Enkapsulazioa (Errepasoa)",es:"Encapsulación (Repaso)"}, testua:{eu:"Datagrama bat `192.168.100.200`-tik `172.168.6.43`-ra doa bi router zeharkatuz. Marraztu nola aldatzen diren jatorri/helmuga IP eta MAC saltoz salto. Soluziorik gabe.",es:"Un datagrama va de `192.168.100.200` a `172.168.6.43` atravesando dos routers. Dibuja cómo cambian la IP y la MAC de origen/destino salto a salto. Sin solución."}}
  ],
  galdetegia:[
    {galdera:{eu:"Zein klasetakoa da `192.168.4.101` eta zer motatakoa?",es:"¿De qué clase es `192.168.4.101` y de qué tipo?"}, aukerak:[{eu:"A klasea, publikoa",es:"Clase A, pública"},{eu:"B klasea, pribatua",es:"Clase B, privada"},{eu:"C klasea, pribatua",es:"Clase C, privada"}], zuzena:2, azalpena:{eu:"192 → C klasea; eta 192.168.0.0/16 tarte pribatua da.",es:"192 → clase C; y 192.168.0.0/16 es un rango privado."}},
    {galdera:{eu:"`/24` batean, zenbat helbide geratzen dira ekipoentzat?",es:"En un `/24`, ¿cuántas direcciones quedan para los equipos?"}, aukerak:[{eu:"256",es:"256"},{eu:"254",es:"254"},{eu:"255",es:"255"}], zuzena:1, azalpena:{eu:"256 guztira, ken sarea eta broadcast = 254 host.",es:"256 en total, menos red y broadcast = 254 hosts."}},
    {galdera:{eu:"Bidea `local` izateak zer esan nahi du?",es:"¿Qué significa que una vía sea `local`?"}, aukerak:[{eu:"Sarea zuzenean konektatuta dago; ez du beste router-ik behar",es:"La red está conectada directamente; no necesita otro router"},{eu:"Lehenetsitako bidea da",es:"Es la ruta por defecto"},{eu:"Helmuga eroria dago",es:"El destino está caído"}], zuzena:0, azalpena:{eu:"`local` = zuzenean konektatutako sarea; router-ak bere interfazetik entregatzen du.",es:"`local` = red conectada directamente; el router la entrega por su interfaz."}},
    {galdera:{eu:"Bi errenkada datoz bat: /24 bat eta lehenetsitako /0. Zein erabiltzen da?",es:"Coinciden dos filas: un /24 y la ruta por defecto /0. ¿Cuál se usa?"}, aukerak:[{eu:"Lehenetsia, beti lehenengo",es:"La por defecto, siempre primero"},{eu:"Lehenengo agertzen dena",es:"La que aparezca primero"},{eu:"/24, aurrizki luzeena delako",es:"El /24, por ser el prefijo más largo"}], zuzena:2, azalpena:{eu:"Beti irabazten du bat-etortze zehatzenak.",es:"Siempre gana la coincidencia más específica."}}
  ]
},

/* ============================ TEMA 2 ============================ */
{
  id:"zer-t2", zenbakia:2, izenburua:{eu:"DNS · bind9",es:"DNS · bind9"}, puntuak:140,
  laburpena:{eu:"Izenak IP bihurtu. Muntatu zure DNS zerbitzaria bind9-rekin Ubuntu-n: zuzeneko eta alderantzizko zona.",es:"Convertir nombres en IP. Monta tu servidor DNS con bind9 en Ubuntu: zona directa e inversa."},
  atalak:[
    {mota:"helburua", testua:{eu:"Instalatu eta konfiguratu DNS zerbitzaria `bind9`-rekin Ubuntu-n (3_AS). Sortu zure zona, izenak IP-ra eta IP-ak izenetara ebatziz.",es:"Instala y configura el servidor DNS con `bind9` en Ubuntu (3_AS). Crea tu zona, resolviendo nombres a IP e IP a nombres."}},
    {mota:"analogia", testua:{eu:"Mugikorraren agenda. Zuk \"Ama\" markatzen duzu, ez bere zenbakia. DNS-a Interneterako eskalan dagoen agenda hori da: **izena → zenbakia** korrespondentzia gordetzen du.",es:"La agenda del móvil. Tú marcas \"Mamá\", no su número. El DNS es esa agenda a escala de Internet: guarda la correspondencia **nombre → número**."}},
    {mota:"izenburua", testua:{eu:"1. Erregistro motak (RR)",es:"1. Tipos de registro (RR)"}},
    {mota:"taula", headers:["Mota","Zertarako","Adibidea"], rows:[
      ["SOA","Zonaren hasiera: zerbitzari autoritarioa","serial, refresh…"],["NS","Zonaren izen-zerbitzariak","u18zerbitzaria."],
      ["A","Izena → IPv4 helbidea",{eu:"192.168.4.111",es:"192.168.4.111"}],[{eu:"PTR",es:"PTR"},"IP → izena (alderantzizkoa)","w10zer.josebabilbao.net."],
      ["CNAME","Beste izen baten aliasa","www → u18zerbitzaria"],[{eu:"MX",es:"MX"},"Domeinuaren posta-zerbitzaria","10 u18zerbitzaria"]]},
    {mota:"simuladorea", id:"dns"},
    {mota:"izenburua", testua:{eu:"1.1 · Nola ebazten den izen bat",es:"1.1 · Cómo se resuelve un nombre"}},
    {mota:"teoria", testua:{eu:"DNS-a **hierarkia** bat da, alderantzizko zuhaitz bat. Goian **erro-zerbitzariak** (`.`), gero **TLDak** (`.net`, `.eus`…) eta gero domeinu autoritarioak (`josebabilbao.net`). Izen oso bat (FQDN) eskuinetik ezkerrera irakurtzen da: `www.josebabilbao.net.` → erroa → net → josebabilbao → www.",es:"El DNS es una **jerarquía**, un árbol invertido. Arriba los **servidores raíz** (`.`), luego los **TLD** (`.net`, `.eus`…) y luego los dominios autoritativos (`josebabilbao.net`). Un nombre completo (FQDN) se lee de derecha a izquierda: `www.josebabilbao.net.` → raíz → net → josebabilbao → www."}},
    {mota:"teoria", izenburua:{eu:"Ebazpen errekurtsiboa vs iteratiboa",es:"Resolución recursiva vs iterativa"}, testua:{eu:"Bezeroak galdera **errekurtsiboa** egiten dio bere DNS-ari (\"emaidazu erantzuna\"). DNS horrek, erantzuna ez badu cachean, galdera **iteratiboak** egiten ditu: erroari galdetu (\"nor da .net-en arduraduna?\"), gero TLDari, gero domeinu autoritarioari, harik eta IP-a lortu arte. Gero bezeroari itzultzen dio eta **cachean** gordetzen du.",es:"El cliente hace una consulta **recursiva** a su DNS (\"dame la respuesta\"). Ese DNS, si no la tiene en caché, hace consultas **iterativas**: pregunta a la raíz (\"¿quién lleva .net?\"), luego al TLD, luego al dominio autoritativo, hasta obtener la IP. Después se la devuelve al cliente y la guarda en **caché**."}},
    {mota:"teoria", izenburua:{eu:"Delegazioa eta TTL",es:"Delegación y TTL"}, testua:{eu:"**NS** erregistroek azpidomeinu baten ardura beste zerbitzari bati ematen diote (**delegazioa**). **TTL**-ak (Time To Live) cachean zenbat denbora gorde erantzuna esaten du: handiegia bada, aldaketak berandu zabaltzen dira; txikiegia bada, kontsulta gehiegi.",es:"Los registros **NS** delegan la responsabilidad de un subdominio a otro servidor (**delegación**). El **TTL** (Time To Live) dice cuánto tiempo guardar la respuesta en caché: si es muy alto, los cambios tardan en propagarse; si es muy bajo, demasiadas consultas."}},
    {mota:"taula", izenburua:{eu:"Ebazpenaren urratsak",es:"Pasos de la resolución"}, headers:["Urratsa","Galdera"], rows:[
      ["1","Bezeroa → DNS lokala: www.josebabilbao.net? (errekurtsiboa)"],["2","DNS lokala → erroa: nor da .net? (iteratiboa)"],["3","DNS lokala → .net TLD: nor da josebabilbao.net?"],["4","DNS lokala → josebabilbao.net: www-ren IP?"],["5","DNS lokala → bezeroa: 192.168.4.101 (eta cachean gorde)"]]},
    {mota:"izenburua", testua:{eu:"2. Instalazioa pausoz pauso (bind9)",es:"2. Instalación paso a paso (bind9)"}},
    {mota:"teoria", testua:{eu:"Zerbitzaria `u18zerbitzaria` izango da (adibidez `192.168.4.101`); `w10zerbitzuak` (.111) eta `u20zerbitzuak` (.112) bezeroak. Aldatu domeinua zureagatik (`izenaabizena.net`).",es:"El servidor será `u18zerbitzaria` (por ejemplo `192.168.4.101`); `w10zerbitzuak` (.111) y `u20zerbitzuak` (.112) los clientes. Cambia el dominio por el tuyo (`nombreapellido.net`)."}},
    {mota:"terminala", izenburua:{eu:"2.1 · bind9 instalatu",es:"2.1 · Instalar bind9"}, host:"u18zerbitzaria", lerroak:[{cmd:"sudo apt update && sudo apt install -y bind9 bind9utils dnsutils"}]},
    {mota:"teoria", izenburua:{eu:"2.2 · Zuzeneko zona deklaratu",es:"2.2 · Declarar la zona directa"}, testua:{eu:"Editatu `/etc/bind/named.conf.local` eta deklaratu zure zona, datu-fitxategira apuntatuz.",es:"Edita `/etc/bind/named.conf.local` y declara tu zona, apuntando al fichero de datos."}},
    {mota:"fitxategia", izena:{eu:"/etc/bind/named.conf.local",es:"/etc/bind/named.conf.local"}, edukia:'zone "josebabilbao.net" {\n    type master;\n    file "/etc/bind/db.josebabilbao";\n};'},
    {mota:"terminala", izenburua:{eu:"2.3 · Zona-fitxategia sortu",es:"2.3 · Crear el fichero de zona"}, host:"u18zerbitzaria", lerroak:[{cmd:"cd /etc/bind"},{cmd:"sudo cp db.local db.josebabilbao"},{cmd:"sudo nano db.josebabilbao"}]},
    {mota:"fitxategia", izena:"/etc/bind/db.josebabilbao", edukia:"$TTL    604800\n@   IN  SOA josebabilbao.net. admin.josebabilbao.net. (\n              2 604800 86400 2419200 604800 )\n@   IN  NS  josebabilbao.net.\n@   IN  A   192.168.4.101\nw10zer  IN  A   192.168.4.111\nu20zer  IN  A   192.168.4.112"},
    {mota:"terminala", izenburua:{eu:"2.4 · Egiaztatu eta berrabiarazi",es:"2.4 · Comprobar y reiniciar"}, host:"u18zerbitzaria", lerroak:[
      {cmd:"sudo named-checkzone josebabilbao.net /etc/bind/db.josebabilbao"},{cmd:"sudo systemctl restart bind9"},
      {cmd:"host josebabilbao.net 192.168.4.101"},{cmd:"host w10zer.josebabilbao.net 192.168.4.101"}]},
    {mota:"teoria", izenburua:{eu:"2.5 · Alderantzizko zona",es:"2.5 · Zona inversa"}, testua:{eu:"Gehitu bigarren zona bat `named.conf.local`-en `192` sarerako, eta sortu PTR-ak zortzikoteak **alderantziz** (192 kenduta). `192.168.4.111`-rentzat jabea `111.4.168` da.",es:"Añade una segunda zona en `named.conf.local` para la red `192`, y crea los PTR con los octetos **al revés** (quitando el 192). Para `192.168.4.111` el propietario es `111.4.168`."}},
    {mota:"fitxategia", izena:"/etc/bind/db.192", edukia:"@   IN  SOA josebabilbao.net. admin.josebabilbao.net. ( 2 604800 86400 2419200 604800 )\n@   IN  NS  josebabilbao.net.\n101.4.168   IN  PTR josebabilbao.net.\n111.4.168   IN  PTR w10zer.josebabilbao.net.\n112.4.168   IN  PTR u20zer.josebabilbao.net."},
    {mota:"oharra", izenburua:{eu:"Oharra · zerbitzuaren izena",es:"Nota · el nombre del servicio"}, testua:{eu:"Ubuntu 18/20-en zerbitzua `bind9` da. 22.04+-en `named` izan daiteke: erabili `sudo systemctl restart named`.",es:"En Ubuntu 18/20 el servicio es `bind9`. En 22.04+ puede ser `named`: usa `sudo systemctl restart named`."}},
    {mota:"errorea", testua:{eu:"**1. Puntu finala ahaztea** izen absolutuetan (`josebabilbao.net.`). **2. Serial-a ez igotzea** editatu ondoren: bezeroek bertsio zaharra ikusten jarraituko dute cachean.",es:"**1. Olvidar el punto final** en los nombres absolutos (`josebabilbao.net.`). **2. No subir el Serial** tras editar: los clientes seguirán viendo la versión vieja en caché."}}
  ],
  ariketak:[
    {maila:1, izenburua:{eu:"Simuladorean ebatzi",es:"Resolver en el simulador"}, testua:{eu:"Defektuzko zonarekin, kontsultatu `w10zer.josebabilbao.net`, `www.josebabilbao.net` eta `192.168.4.112` IP-a.",es:"Con la zona por defecto, consulta `w10zer.josebabilbao.net`, `www.josebabilbao.net` y la IP `192.168.4.112`."}, arrakasta:{eu:"www CNAME bidez zerbitzariaren IP-ra iristen da, eta .112-ren alderantzizkoak u20zer ematen du.",es:"www llega a la IP del servidor vía CNAME, y la inversa de .112 da u20zer."}},
    {maila:2, izenburua:{eu:"Host bat gehitu",es:"Añadir un host"}, testua:{eu:"Gehitu `u22 IN A 192.168.4.113` eta alias bat `intranet IN CNAME u22`. Ebatzi `intranet.josebabilbao.net`.",es:"Añade `u22 IN A 192.168.4.113` y un alias `intranet IN CNAME u22`. Resuelve `intranet.josebabilbao.net`."}, arrakasta:{eu:"intranet → u22 → 192.168.4.113. Gero errepikatu zure `db` errealan.",es:"intranet → u22 → 192.168.4.113. Luego repítelo en tu `db` real."}},
    {maila:3, izenburua:{eu:"Zure zona osoa (3_AS)",es:"Tu zona completa (3_AS)"}, testua:{eu:"`u18zerbitzaria`-n muntatu bind9 zure domeinuarekin, zuzeneko zona hiru ekiporekin eta alderantzizko zona funtzionatzen.",es:"En `u18zerbitzaria` monta bind9 con tu dominio, con la zona directa de tres equipos y la zona inversa funcionando."}, arrakasta:{eu:"Bezerotik `host zuredomeinua.net` ebazten da eta `host 192.168.4.111`-k izena ematen du.",es:"Desde el cliente se resuelve `host tudominio.net` y `host 192.168.4.111` devuelve el nombre."}},
    {maila:4, izenburua:{eu:"Forwarder-ak eta MX",es:"Forwarders y MX"}, testua:{eu:"Konfiguratu forwarder bat `named.conf.options`-en, zure DNS-ak Interneteko izenak ere ebatz ditzan `8.8.8.8` bidez, eta gehitu MX erregistro bat. Soluziorik gabe.",es:"Configura un forwarder en `named.conf.options` para que tu DNS resuelva también nombres de Internet vía `8.8.8.8`, y añade un registro MX. Sin solución."}}
  ],
  galdetegia:[
    {galdera:{eu:"Zein erregistro motak lotzen du izen bat IPv4-rekin?",es:"¿Qué tipo de registro asocia un nombre con una IPv4?"}, aukerak:[{eu:"PTR",es:"PTR"},"A",{eu:"MX",es:"MX"}], zuzena:1, azalpena:{eu:"A = izena → IPv4. PTR alderantzizkoa da.",es:"A = nombre → IPv4. PTR es la inversa."}},
    {galdera:{eu:"Non deklaratzen duzu zure zona?",es:"¿Dónde declaras tu zona?"}, aukerak:[{eu:"/etc/bind/db.local",es:"/etc/bind/db.local"},{eu:"/etc/resolv.conf",es:"/etc/resolv.conf"},{eu:"/etc/bind/named.conf.local",es:"/etc/bind/named.conf.local"}], zuzena:2, azalpena:{eu:"named.conf.local-en deklaratzen dira zonak; datuak db.* fitxategian.",es:"Las zonas se declaran en named.conf.local; los datos en el fichero db.*."}},
    {galdera:{eu:"`192.168.4.111`-rentzat, zein da PTR-aren jabea `192.in-addr.arpa`-n?",es:"Para `192.168.4.111`, ¿cuál es el propietario del PTR en `192.in-addr.arpa`?"}, aukerak:[{eu:"111.4.168",es:"111.4.168"},{eu:"192.168.4.111",es:"192.168.4.111"},{eu:"168.4.111",es:"168.4.111"}], zuzena:0, azalpena:{eu:"Zortzikoteak alderantziz eta 192 kenduta: 111.4.168.",es:"Octetos al revés y quitando el 192: 111.4.168."}},
    {galdera:{eu:"Zona editatu duzu baina bezeroek datu zaharrak ikusten dituzte. Zer ahaztu duzu?",es:"Editaste la zona pero los clientes ven datos viejos. ¿Qué olvidaste?"}, aukerak:[{eu:"dnsutils instalatu",es:"instalar dnsutils"},{eu:"SOA-ren Serial-a igo eta bind9 berrabiarazi",es:"Subir el Serial del SOA y reiniciar bind9"},{eu:"atebidea aldatu",es:"cambiar la puerta de enlace"}], zuzena:1, azalpena:{eu:"Serial-ak zona aldatu dela abisatzen du; igo gabe cachekoa zerbitzatzen da.",es:"El Serial avisa de que la zona cambió; sin subirlo se sirve lo de la caché."}}
  ]
},

/* ============================ TEMA 3 ============================ */
{
  id:"zer-t3", zenbakia:3, izenburua:{eu:"DHCP",es:"DHCP"}, puntuak:130,
  laburpena:{eu:"Helbide automatikoak. Muntatu isc-dhcp-server Ubuntu-n eta banatu IP-ak DORA bidez.",es:"Direcciones automáticas. Monta isc-dhcp-server en Ubuntu y reparte IPs por DORA."},
  atalak:[
    {mota:"helburua", testua:"Instalatu eta konfiguratu `DHCP` zerbitzaria (`isc-dhcp-server`) Ubuntu-n (4_AS). Banatu IP, maskara, atebidea eta DNS bezeroei automatikoki."},
    {mota:"analogia", testua:"Hotel baten harrera. Logelarik gabe iristen zara; harrerak zein libre dagoen begiratu, giltza (zure IP) ematen dizu egonaldirako (lease-a) eta apuntatu egiten du. Itzultzen bazara, berbera ematen saiatzen da."},
    {mota:"izenburua", testua:"1. DORA trukea"},
    {mota:"pausoak", izenburua:"Lau mezu", items:[
      {izen:"Discover", testua:"Bezeroak broadcast bidez galdetzen du \"ba al dago DHCP-rik?\". Oraindik ez du IP-rik."},
      {izen:"Offer", testua:"Zerbitzariak proposamen batekin erantzuten du: IP, maskara, atebidea eta DNS."},
      {izen:"Request", testua:"Bezeroak IP hori formalki eskatzen du (broadcast bidez berriz)."},
      {izen:"Acknowledge", testua:"Zerbitzariak berresten du, lease-a finkatu eta MAC ↔ IP bikotea apuntatzen du."}]},
    {mota:"simuladorea", id:"dhcp"},
    {mota:"izenburua", testua:"2. Instalazioa pausoz pauso"},
    {mota:"teoria", testua:"Zerbitzaria `u18zerbitzaria`-n (192.168.4.101). Erabili **irakasleak esandako range-a** (ikasle bakoitzak berea, talkarik ez egiteko: 4_AS_IP_Taldeak)."},
    {mota:"terminala", izenburua:"2.1 · Instalatu", host:"u18zerbitzaria", lerroak:[{cmd:"sudo apt update && sudo apt install -y isc-dhcp-server"}]},
    {mota:"teoria", izenburua:"2.2 · Interfazea adierazi", testua:"Editatu `/etc/default/isc-dhcp-server` eta jarri zure txartelaren izena (`ip a`)."},
    {mota:"fitxategia", izena:"/etc/default/isc-dhcp-server", edukia:'INTERFACESv4="enp0s3"'},
    {mota:"terminala", izenburua:"2.3 · Esparrua konfiguratu", host:"u18zerbitzaria", lerroak:[{cmd:"sudo nano /etc/dhcp/dhcpd.conf"}]},
    {mota:"fitxategia", izena:"/etc/dhcp/dhcpd.conf", edukia:"subnet 192.168.4.0 netmask 255.255.255.0 {\n    range 192.168.4.171 192.168.4.175;\n    option subnet-mask 255.255.255.0;\n    option routers 192.168.4.1;\n    option broadcast-address 192.168.4.255;\n    option domain-name-servers 192.168.4.101, 8.8.8.8;\n    option domain-name \"josebabilbao.net\";\n    default-lease-time 600;\n    max-lease-time 7200;\n}\n\nhost w10zerbitzuak {\n    hardware ethernet 08:00:27:ab:cd:ef;\n    fixed-address 192.168.4.180;\n}"},
    {mota:"terminala", izenburua:"2.4 · Abiarazi eta egiaztatu", host:"u18zerbitzaria", lerroak:[
      {cmd:"sudo dhcpd -t -cf /etc/dhcp/dhcpd.conf", cmt:"sintaxia egiaztatu"},{cmd:"sudo systemctl restart isc-dhcp-server"},
      {cmd:"journalctl -u isc-dhcp-server -e", cmt:"DORA mezuak ikusi"}]},
    {mota:"oharra", izenburua:"Garrantzitsua", testua:"Zerbitzua abiarazi aurretik, **deskonektatu aulako sare-kablea**, zure zerbitzariak soilik erantzun dezan eta ez zentruko DHCP-ak. Lease-ak `/var/lib/dhcp/dhcpd.leases`-en ikusten dira."},
    {mota:"errorea", testua:"**1. IP finkoak zapaltzen dituen range-a.** Zerbitzaria (.101) edo atebidea (.1) ezin dira range barruan egon. **2. Bi DHCP LAN berean.** Horregatik kablea deskonektatu. **3. Interfazea ez deklaratzea.**"}
  ],
  ariketak:[
    {maila:1, izenburua:"Lease-ak banatu", testua:"Simuladorean, konektatu bezeroak range-a (.171–.175) bete arte. Begiratu agortzen denean ateratzen den mezua.", arrakasta:"5 IP ematen ditu eta 6. bezeroak \"sin direcciones\" jasotzen du."},
    {maila:2, izenburua:"MAC bidezko erreserba", testua:"`dhcpd.conf`-en `host` deklarazioarekin lotu MAC bat IP finko batera.", arrakasta:"MAC hori beti `192.168.4.180` jasotzen du."},
    {maila:3, izenburua:"Zure DHCP erreala (4_AS)", testua:"Muntatu `isc-dhcp-server` zure range, atebide, maskara eta DNS-arekin (zure zerbitzaria + 8.8.8.8). Bezeroa automatikoan IP-a jasotzen du.", arrakasta:"Bezeroan `ip a`-k zure range-eko IP bat erakusten du."},
    {maila:4, izenburua:"DHCP + DNS batera", testua:"Lortu DHCP-ak Tema 2-ko zure DNS-a banatzea eta bezero batek `ping w10zer.zuredomeinua.net` egin dezan. Soluziorik gabe."}
  ],
  galdetegia:[
    {galdera:"Zein da DHCP trukearen ordena zuzena?", aukerak:["Request·Offer·Discover·Ack","Offer·Discover·Ack·Request","Discover·Offer·Request·Ack"], zuzena:2, azalpena:"DORA: Discover, Offer, Request, Acknowledge."},
    {galdera:"Zer protokolo eta portu erabiltzen ditu DHCP-ak?", aukerak:["UDP, 67 eta 68 portuak","TCP, 53 portua","TCP, 80 portua"], zuzena:0, azalpena:"DHCP UDP-z doa: 67 zerbitzarian, 68 bezeroan."},
    {galdera:"Zergatik deskonektatzen da kablea aulan zure DHCP abiarazi aurretik?", aukerak:["Energia aurrezteko","Beste DHCP-ekin lehiatu ez dadin","DHCP-ak sarerik gabe behar duelako"], zuzena:1, azalpena:"DHCP bat baino gehiago LAN berean talka egiten dute."},
    {galdera:"Zertarako balio du `host` deklarazio batek?", aukerak:["Ekipoa blokeatzeko","IP aleatorioa emateko","MAC horrek beti IP bera jasotzeko (erreserba)"], zuzena:2, azalpena:"MAC bat IP finko batera lotzen du."}
  ]
},

/* ============================ TEMA 4 ============================ */
{
  id:"zer-t4", zenbakia:4, izenburua:{eu:"Urruneko saioak",es:"Sesiones remotas"}, puntuak:140,
  laburpena:{eu:"Administratu urrunetik: SSH (testua), Webmin (web), VNC eta AnyDesk (mahaigain grafikoa).",es:"Administra en remoto: SSH (texto), Webmin (web), VNC y AnyDesk (escritorio gráfico)."},
  atalak:[
    {mota:"helburua", testua:"Administratu zerbitzaria urrunetik: `SSH` testu bidez (5_AS), `Webmin` web bidez (6_AS), eta `VNC`/`AnyDesk` mahaigain grafiko bidez (6_AS/7_AS)."},
    {mota:"analogia", testua:"Urrunetik aritzeko hiru modu. **SSH** makina-gelarako telefono-lerro segurua da: ahotsa baino ez (testua), baina azkarra eta zifratua. **Webmin** webeko aginte-panela da. **VNC/AnyDesk** pantaila ikusten duen kamera bat da."},
    {mota:"taula", headers:["Tresna","Mota","Portua","Noiz"], rows:[
      ["SSH","Terminala","22","Zerbitzarien administrazio azkar eta segurua"],["Webmin","Web","10000","Zerbitzuak interfaze grafikoz konfiguratu"],
      ["VNC","Mahaigaina","5900+","Zerbitzariaren mahaigaina LANean ikusi"],["AnyDesk","Mahaigaina","(relay)","Sarbide grafiko erraza, Internet/NAT bidez ere"]]},
    {mota:"izenburua", testua:"2. SSH (OpenSSH)"},
    {mota:"teoria", testua:"SSH-k urruneko terminal-saio bat irekitzen du modu **zifratuan**, TCP 22 portuan, bezero/zerbitzari ereduarekin. Inplementazio librea OpenSSH da. Lehen `telnet` erabiltzen zen, baina testu lauan bidaltzen zituen erabiltzailea eta pasahitza: edozein *sniffer*-ek atzeman zitzakeen. SSH-k hori konpontzen du **zifratzearekin**."},
    {mota:"izenburua", testua:"2.0 · Zifratzea: simetrikoa vs asimetrikoa"},
    {mota:"teoria", testua:"**Zifratze simetrikoa:** gako **bera** zifratzeko eta deszifratzeko. Azkarra da, baina arazo bat du: nola partekatu gako sekretua sarea segurua ez bada? **Zifratze asimetrikoa:** gako-bikote bat, **publikoa** (denei ematen zaie, zifratzeko) eta **pribatua** (sekretua, deszifratzeko). Publikoarekin zifratutakoa pribatuarekin bakarrik irekitzen da."},
    {mota:"taula", izenburua:"Bien alderaketa", headers:["","Simetrikoa","Asimetrikoa"], rows:[
      ["Gakoak","Bat, partekatua","Bi: publikoa + pribatua"],["Abiadura","Azkarra","Motelagoa"],["Arazoa","Gakoa nola partekatu","—"],["Erabilera","Datu-fluxua zifratu","Gakoak trukatu / sinatu"]]},
    {mota:"teoria", testua:"SSH-k **biak** konbinatzen ditu: hasieran **asimetrikoa** erabiltzen du bi aldeek saio-gako sekretu bat modu seguruan adosteko; behin adostuta, komunikazio guztia **simetrikoarekin** (azkarragoa) zifratzen du. Horrela autentikazioa, konfidentzialtasuna eta osotasuna bermatzen ditu."},
    {mota:"oharra", izenburua:"SSH tunela (port forwarding)", testua:"SSH-k beste zerbitzu baten trafikoa bere kanal zifratutik garraia dezake. `ssh -L 8080:localhost:80 mss2@192.168.4.101`-rekin, zure makinako `8080` portua zerbitzariko `80`-era \"tunelizatzen\" duzu: zifratu gabeko zerbitzu bat ere segurua bihurtzen da tunelean barrena."},
    {mota:"terminala", izenburua:"2.1 · Zerbitzaria instalatu (5_AS)", host:"u18zerbitzaria", lerroak:[
      {cmd:"sudo apt update && sudo apt install -y openssh-server"},{cmd:"sudo systemctl status ssh", cmt:"active (running)"},{cmd:"sudo systemctl enable ssh"}]},
    {mota:"terminala", izenburua:"2.2 · Bezerotik konektatu", host:"u20zerbitzuak — bezeroa", lerroak:[{cmd:"ssh mss2@192.168.4.101", cmt:"lehen aldian onartu fingerprint-a (yes)"}]},
    {mota:"terminala", izenburua:"2.3 · Fitxategiak kopiatu: scp", host:"u20zerbitzuak — bezeroa", lerroak:[
      {cmd:"scp txostena.txt mss2@192.168.4.101:/home/mss2/", cmt:"igo"},{cmd:"scp mss2@192.168.4.101:/home/mss2/datuak.csv .", cmt:"jaitsi"}]},
    {mota:"simuladorea", id:"sshcmd"},
    {mota:"terminala", izenburua:"2.4 · Gakoak (pasahitzik gabe)", host:"u20zerbitzuak — bezeroa", lerroak:[
      {cmd:"ssh-keygen -t ed25519"},{cmd:"ssh-copy-id mss2@192.168.4.101"},{cmd:"ssh mss2@192.168.4.101", cmt:"orain pasahitzik gabe"}]},
    {mota:"errorea", testua:"**1. \"Connection refused\".** `ssh` zerbitzua ez dago abiarazita edo suebakiak 22 ixten du. **2. Erabiltzailea ahaztea** (`usuario@host`). **3. Portua zerbitzarian aldatu eta bezeroan ez** (`ssh -p 2222 …`)."},
    {mota:"izenburua", testua:"3. Webmin (6_AS)"},
    {mota:"teoria", testua:"Webmin nabigatzailetik erabiltzen den administrazio-panela da, `https://IP:10000`-en. SSH bera ere konfigura daiteke terminala ukitu gabe."},
    {mota:"terminala", host:"u18zerbitzaria", lerroak:[
      {cmd:"curl -o setup-repos.sh https://raw.githubusercontent.com/webmin/webmin/master/setup-repos.sh"},{cmd:"sudo sh setup-repos.sh"},{cmd:"sudo apt install -y webmin"}]},
    {mota:"fitxategia", izena:"nabigatzailea", edukia:"https://192.168.4.101:10000\n# sistemako erabiltzailearekin (mss2). Onartu ziurtagiri-abisua."},
    {mota:"izenburua", testua:"4. VNC eta AnyDesk"},
    {mota:"terminala", izenburua:"4.1 · VNC LANean", host:"u18zerbitzaria", lerroak:[
      {cmd:"sudo apt install -y tigervnc-standalone-server", cmt:"apunteetan vnc4server"},{cmd:"vncserver", cmt:":1 saioa sortzen du eta pasahitza eskatzen du"},{cmd:"vncserver -list"}]},
    {mota:"teoria", testua:"Bezerotik, VNC ikustaile batekin, konektatu `192.168.4.101:1`-era (5901). **AnyDesk** grafikoa da eta NAT zeharkatzen du relay bidez: ez da porturik ireki behar. `anydesk.com`-tik jaisten da `.deb` paketea (`sudo apt install ./anydesk_*.deb`)."}
  ],
  ariketak:[
    {maila:1, izenburua:"Zure lehen ssh", testua:"Instalatu `openssh-server` `u18zerbitzaria`-n eta konektatu `u20zerbitzuak`-etik `ssh mss2@192.168.4.101`-rekin.", arrakasta:"Fingerprint-a onartu eta pasahitza sartu ondoren, prompt-a zerbitzariaren izenera aldatzen da."},
    {maila:2, izenburua:"Portua aldatu eta kopiatu", testua:"Konektatu `2222` portuarekin (`ssh -p 2222 …`). Gero kopiatu fitxategi bat zerbitzarira `scp`-rekin.", arrakasta:"Fitxategia zerbitzariaren home-an agertzen da."},
    {maila:3, izenburua:"Webmin martxan (6_AS)", testua:"Instalatu Webmin eta, bezero baten nabigatzailetik, sartu `https://192.168.4.101:10000`-en eta aurkitu SSH zerbitzariaren konfigurazioa.", arrakasta:"Webmin panela ikusten duzu eta SSH-ren konfigurazio-fitxategia webetik ireki dezakezu."},
    {maila:4, izenburua:"Pasahitzik gabe + saio grafikoa", testua:"Konfiguratu SSH gako bidez (`ssh-keygen` + `ssh-copy-id`) eta muntatu saio grafiko bat VNC edo AnyDesk-ekin. Soluziorik gabe."}
  ],
  galdetegia:[
    {galdera:"Zein portu eta garraio erabiltzen ditu SSH-k?", aukerak:["UDP 68","TCP 22","TCP 10000"], zuzena:1, azalpena:"SSH TCP 22-an. 10000 Webmin da; 68 DHCP bezeroa."},
    {galdera:"Fitxategi bat zerbitzarira modu zifratuan kopiatzeko, zer erabiltzen duzu?", aukerak:["scp fitxategia mss2@192.168.4.101:/home/mss2/","cp fitxategia 192.168.4.101","ping 192.168.4.101"], zuzena:0, azalpena:"`scp`-k SSH kanal seguruaren gainetik kopiatzen du."},
    {galdera:"Zein URL-tan sartzen zara Webmin-era?", aukerak:["http://192.168.4.101:80","ssh://192.168.4.101:22","https://192.168.4.101:10000"], zuzena:2, azalpena:"Webmin HTTPS bidez 10000 portuan."},
    {galdera:"Beste sare bateko ekipo bati grafikoki lagundu nahi diozu, router-ean porturik ireki gabe. Zer egokitzen da?", aukerak:["VNC zuzena","AnyDesk","scp"], zuzena:1, azalpena:"AnyDesk-ek relay bat erabiltzen du NAT zeharkatzeko."},
    {galdera:"Zergatik konbinatzen ditu SSH-k zifratze simetrikoa eta asimetrikoa?", aukerak:["Asimetrikoa azkarragoa delako datu guztietarako","Asimetrikoz saio-gakoa modu seguruan adosteko, eta gero simetrikoz (azkarragoa) zifratzeko","Simetrikoak bi gako behar dituelako"], zuzena:1, azalpena:"Asimetrikoak gako-trukea babesten du; behin gakoa adostuta, simetrikoa (azkarragoa) erabiltzen da fluxurako."}
  ]
},

/* ============================ TEMA 5 ============================ */
{
  id:"zer-t5", zenbakia:5, izenburua:{eu:"Baliabideak partekatu + Proxy",es:"Compartir recursos + Proxy"}, puntuak:130,
  laburpena:{eu:"Samba-rekin karpetak partekatu Linux↔Windows, eta Squid proxy-cachearekin Interneterako irteera kontrolatu.",es:"Compartir carpetas con Samba (Linux↔Windows) y controlar la salida a Internet con el proxy-caché Squid."},
  atalak:[
    {mota:"helburua", testua:"GNU/Linux-en karpeta bat sarean partekatu eta Windows zein Linux-etik erabili (8_AS, Samba). Gero, proxy-cache zerbitzari bat muntatu Squid-ekin (9_AS)."},
    {mota:"izenburua", testua:"1. Samba (8_AS)"},
    {mota:"analogia", testua:"Bulegoko fitxategi-armairu komun bat. Nork bere mahaian kopiak gorde beharrean, denek sartzen den armairu partekatu bat dago. Samba-k zure Linux karpeta bat armairu horretan bihurtzen du, **SMB** protokoloa hitz eginez."},
    {mota:"terminala", izenburua:"1.1 · Samba instalatu", host:"u18zerbitzaria", lerroak:[{cmd:"sudo apt update && sudo apt install -y samba"}]},
    {mota:"teoria", izenburua:"1.2 · Baliabidea deklaratu", testua:"Editatu `/etc/samba/smb.conf` eta gehitu amaieran bloke bat: izena, bidea eta baimenak."},
    {mota:"fitxategia", izena:"/etc/samba/smb.conf", edukia:"[elkarbanatu]\n    path = /home/mss2/Mahaigaina\n    valid users = mss2\n    read only = no\n    browseable = yes"},
    {mota:"terminala", izenburua:"1.3 · Samba erabiltzailea sortu", host:"u18zerbitzaria", lerroak:[
      {cmd:"sudo smbpasswd -a mss2", cmt:"Samba pasahitza ezarri"},{cmd:"sudo systemctl restart smbd"}]},
    {mota:"taula", izenburua:"1.4 · Sartu baliabidean", headers:["Sistema","Nola konektatu"], rows:[
      ["Linux (Fitxategiak)","Beste kokalekuak → smb://192.168.4.101"],["Windows","\\\\192.168.4.101\\elkarbanatu"]]},
    {mota:"errorea", testua:"**1. Erabiltzailea Samba pasahitzik gabe** (`smbpasswd -a` exekutatu). **2. Direktorioaren baimenak.** **3. Windows-eko suebakia.**"},
    {mota:"izenburua", testua:"2. Squid proxy-cache (9_AS)"},
    {mota:"analogia", testua:"Eraikin baten harrera, paketeak jasotzen dituena. Maizter bakoitza kalera jaitsi beharrean, harrera ateratzen da denen ordez, eskatuenaren kopia gordetzen du (**cachea**, azkartzen duena) eta bidalketa batzuk uka ditzake (**arauak/ACL**). Squid hori da web-trafikorako."},
    {mota:"teoria", testua:"Proxy bat bezeroen eta Internetaren artean jartzen da: irteera zentralizatu, cacheatu eta sarbide-arauak aplikatzen ditu. Squid `3128` portuan entzuten du defektuz."},
    {mota:"terminala", izenburua:"2.1 · Instalatu eta konfiguratu", host:"u20zerbitzuak — proxy", lerroak:[
      {cmd:"sudo apt update && sudo apt install -y squid"},{cmd:"sudo cp /etc/squid/squid.conf /etc/squid/squid.conf.bak"},{cmd:"sudo nano /etc/squid/squid.conf"}]},
    {mota:"teoria", testua:"`http_access` arauak **ordenan** ebaluatzen dira, eta **lehen bat-etortzeak irabazten du**:"},
    {mota:"fitxategia", izena:"/etc/squid/squid.conf", edukia:"http_port 3128\nvisible_hostname proxy.josebabilbao.net\n\nacl localnet src 192.168.4.0/24\nacl bloketuak dstdomain .facebook.com .youtube.com\n\nhttp_access deny bloketuak\nhttp_access allow localnet\nhttp_access deny all"},
    {mota:"terminala", host:"u20zerbitzuak — proxy", lerroak:[{cmd:"sudo systemctl restart squid"},{cmd:"sudo systemctl status squid"}]},
    {mota:"simuladorea", id:"squid"},
    {mota:"teoria", testua:"Bezeroan, jarri nabigatzailean proxy HTTP gisa Squid zerbitzariaren IP-a eta `3128` portua. Hortik aurrera bere web-trafiko guztia Squid-etik pasatzen da eta arauei obeditzen die."}
  ],
  ariketak:[
    {maila:1, izenburua:"Arauak probatu", testua:"Simuladorean, ebaluatu: `192.168.4.50 → google.com`, `192.168.4.50 → youtube.com` eta `10.0.0.5 → google.com`.", arrakasta:"google baimendua, youtube blokeatua eta LANetik kanpokoa ukatua (`deny all`)."},
    {maila:2, izenburua:"Ordenak garrantzia du", testua:"Simuladorean, mugitu `http_access allow localnet` `deny bloketuak`-en gainetik eta ebaluatu youtube berriz LANetik.", arrakasta:"Orain youtube baimentzen da, lehen bat-etortzeak irabazten duelako. Blokeoa lehenago joan behar dela frogatzen du."},
    {maila:3, izenburua:"Samba + Squid errealak (8/9_AS)", testua:"Muntatu `elkarbanatu` baliabide Samba bezero batetik atzigarria, eta Squid bat LANari nabigatzen uzten diona baina domeinu bat blokeatzen.", arrakasta:"Baliabidean idazten duzu; eta bezeroak, proxy jarrita, nabigatzen du baina ez sartzen blokeatutako domeinuan."},
    {maila:4, izenburua:"Ordutegi bidezko blokeoa", testua:"Ikertu Squid-en `time` motako ACL-ak eta sortu domeinu bat eskola-orduetan soilik blokeatzen duen araua. Soluziorik gabe."}
  ],
  galdetegia:[
    {galdera:"Zein komandok ematen dio Samba pasahitza erabiltzaile bati?", aukerak:["sudo useradd mss2","sudo smbpasswd -a mss2","sudo passwd mss2"], zuzena:1, azalpena:"`smbpasswd -a`-k Samba pasahitza ezartzen du."},
    {galdera:"Zein portutan entzuten du Squid-ek defektuz?", aukerak:["22","445","3128"], zuzena:2, azalpena:"Squid 3128. 445 SMB da, 22 SSH."},
    {galdera:"Squid-en `http_access` arauak nola aplikatzen dira?", aukerak:["Ordenan, lehen bat-etortzeak irabazten du","Denak batera, murriztaileenak","Alderantzizko ordenan"], zuzena:0, azalpena:"Goitik behera ebaluatzen ditu eta lehen bat-etortzean gelditzen da."},
    {galdera:"`deny bloketuak` `allow localnet` baino lehen badago, LANeko bezero batek youtube.com eskatzen du. Zer gertatzen da?", aukerak:["Baimendu, LANean dagoelako","Ukatu, lehen bat-etortzea deny bloketuak delako","Sintaxi-errorea"], zuzena:1, azalpena:"Lehen bat-etortzeak irabazten du: `deny bloketuak` lehenago ebaluatzen da."}
  ]
},

/* ============================ TEMA 6 ============================ */
{
  id:"zer-t6", zenbakia:6, izenburua:{eu:"FTP · vsftpd",es:"FTP · vsftpd"}, puntuak:120,
  laburpena:{eu:"Fitxategiak transferitu bi kanalekin (kontrola 21 / datuak). Modu aktibo eta pasiboa. vsftpd zerbitzaria.",es:"Transferir ficheros con dos canales (control 21 / datos). Modo activo y pasivo. Servidor vsftpd."},
  atalak:[
    {mota:"helburua", testua:"Konfiguratu `FTP` bezeroak (10_AS) eta muntatu `FTP` zerbitzaria GNU/Linux-en `vsftpd`-rekin (11_AS)."},
    {mota:"analogia", testua:"Leihatila eta zama-kaia duen jatetxe bat. **Leihatilatik** (21 portua) eskaerak egiten dituzu. Baina merkantzia ez da leihatilatik sartzen: **zama-kaitik** entregatzen da (datu-konexioa). Kontrola eta datuak ate desberdinetatik doaz."},
    {mota:"taula", headers:["Kanala","Portua","Zertarako"], rows:[
      ["Kontrola","21","Komandoak (login, ls, get, put)"],["Datuak","20 / dinamikoa","Fitxategiaren transferentzia erreala"]]},
    {mota:"izenburua", testua:"2. Modu aktiboa vs pasiboa"},
    {mota:"teoria", testua:"Gakoa: **nork irekitzen du datu-konexioa?** Modu **aktiboan** zerbitzariak konektatzen du bezerorantz (PORT). Modu **pasiboan** bezeroak konektatzen du zerbitzarirantz (PASV); horregatik dabil suebaki/NAT atzean. Bezeroa NAT atzean badago, erabili **pasiboa**."},
    {mota:"simuladorea", id:"ftpmode"},
    {mota:"taula", izenburua:"ftp bezeroaren komandoak", headers:["Komandoa","Egiten du"], rows:[
      ["ls / dir","Urruneko direktorioa zerrendatu"],["cd karpeta","Zerbitzariko direktorioa aldatu"],["get fitxategia","Zerbitzaritik jaitsi"],["put fitxategia","Zerbitzarira igo"],["bye / quit","Saioa itxi"]]},
    {mota:"izenburua", testua:"3. Instalazioa pausoz pauso"},
    {mota:"terminala", izenburua:"3.1 · Bezeroa (10_AS)", host:"u20zerbitzuak — bezeroa", lerroak:[
      {cmd:"ftp 192.168.4.10"},{txt:"ftp> ls"},{txt:"ftp> get incoming"},{txt:"ftp> bye"}]},
    {mota:"terminala", izenburua:"3.2 · vsftpd zerbitzaria (11_AS)", host:"u18zerbitzaria", lerroak:[
      {cmd:"sudo apt update && sudo apt install -y vsftpd"},{cmd:"sudo cp /etc/vsftpd.conf /etc/vsftpd.conf.bak"},{cmd:"sudo nano /etc/vsftpd.conf"}]},
    {mota:"fitxategia", izena:"/etc/vsftpd.conf", edukia:"anonymous_enable=NO\nlocal_enable=YES\nwrite_enable=YES\nchroot_local_user=YES\nallow_writeable_chroot=YES"},
    {mota:"terminala", host:"u18zerbitzaria", lerroak:[{cmd:"sudo systemctl restart vsftpd"},{cmd:"sudo systemctl status vsftpd"}]},
    {mota:"errorea", testua:"**1. chroot idazketa-baimenik gabe.** vsftpd ez da abiarazten kaiola idazgarria bada `allow_writeable_chroot=YES` gabe. **2. Modu aktiboa NAT atzean** → erabili pasiboa. **3. Sarbide anonimoa irekita** (`anonymous_enable=NO`)."}
  ],
  ariketak:[
    {maila:1, izenburua:"FTP saio bat bezerotik", testua:"Konektatu `ftp`-z zerbitzari batera, zerrendatu edukia, jaitsi fitxategi bat eta itxi saioa.", arrakasta:"Fitxategia zure karpeta lokalean agertzen da `get` ondoren."},
    {maila:2, izenburua:"Moduak alderatu", testua:"Identifikatu zein modutan irekitzen duen **bezeroak** datu-konexioa eta zeinetan zerbitzariak portu bat irekiz.", arrakasta:"Aktiboan zerbitzaria bezerorantz (PORT); pasiboan bezeroa zerbitzarirantz (PASV)."},
    {maila:3, izenburua:"Zure vsftpd zerbitzaria (11_AS)", testua:"Instalatu eta konfiguratu vsftpd, `mss2`-k igo eta jaitsi ahal izan dezan, bere home-an kaiolatuta, sarbide anonimorik gabe.", arrakasta:"Bezerotik autentikatu, `put` eta `get` egin, eta ezin zara zure karpetatik atera."},
    {maila:4, izenburua:"FTP TLS gainetik", testua:"Konfiguratu vsftpd zifratzearekin (FTPS), ziurtagiri bat sortuz eta `ssl_enable=YES` aktibatuz. Soluziorik gabe."}
  ],
  galdetegia:[
    {galdera:"Zein portu erabiltzen du FTP-k **kontrol** kanalerako?", aukerak:["20","21","22"], zuzena:1, azalpena:"21 kontrola; 20 datuak modu aktiboan; 22 SSH."},
    {galdera:"Modu **pasiboan**, nork irekitzen du datu-konexioa?", aukerak:["Zerbitzariak bezerorantz","Inork, 21etik doa","Bezeroak zerbitzarirantz"], zuzena:2, azalpena:"Pasiboan (PASV) bezeroak hasten du; horregatik dabil NAT atzean."},
    {galdera:"Zertarako balio du `chroot_local_user=YES`-k?", aukerak:["Erabiltzailea bere karpetan kaiolatzeko","Sarbide anonimoa baimentzeko","Konexioa zifratzeko"], zuzena:0, azalpena:"chroot-ek kaiola bat sortzen du: home-a erro gisa ikusten du."},
    {galdera:"Zein komandok igotzen du fitxategi bat zerbitzarira?", aukerak:["get","put","ls"], zuzena:1, azalpena:"`put` igotzen du; `get` jaisten du."}
  ]
},

/* ============================ TEMA 7 ============================ */
{
  id:"zer-t7", zenbakia:7, izenburua:{eu:"Posta elektronikoa",es:"Correo electrónico"}, puntuak:140,
  laburpena:{eu:"SMTP/POP3/IMAP, agenteak (MUA/MTA), eta zure posta-zerbitzaria muntatu Postfix + Dovecot-ekin.",es:"SMTP/POP3/IMAP, agentes (MUA/MTA) y monta tu servidor de correo con Postfix + Dovecot."},
  atalak:[
    {mota:"helburua", testua:"Ulertu posta elektronikoaren protokoloak eta agenteak, eta konfiguratu kontu bat Thunderbird-en (12_AS)."},
    {mota:"analogia", testua:"Betiko posta. Gutuna etxean idazten duzu (zure programa, **MUA**). Bulegora eramaten duzu eta kamioiek bulegoz bulego daramate hartzailearenaraino (hori **SMTP** da, garraioa). Han bere postontzian geratzen da hartzaileak jaso arte (hori **POP3** edo **IMAP** da)."},
    {mota:"taula", izenburua:"Agenteak", headers:["Agentea","Zer den"], rows:[
      ["MUA","Posta-bezeroa (Thunderbird): irakurri eta idatzi"],["MTA","Garraio-zerbitzaria (Postfix): postak mugitu"],["MDA","Mezua postontzian entregatu (Dovecot)"]]},
    {mota:"taula", izenburua:"Protokoloak", headers:["Protokoloa","Zertarako","Portua","Portaera"], rows:[
      ["SMTP","Bidali / garraiatu","25 · 587","Posta helmuga-zerbitzarirantz bultzatu"],
      ["POP3","Jaso","110","Jaitsi eta normalean zerbitzaritik ezabatu"],
      ["IMAP","Jaso","143","Postak zerbitzarian mantendu eta gailuak sinkronizatu"]]},
    {mota:"oharra", izenburua:"POP3 vs IMAP", testua:"**POP3**-rekin posta gailu batek \"eramaten du\". **IMAP**-ekin zerbitzarian bizi da eta gailu guztiek gauza bera ikusten dute. Gaur egun ia beti IMAP."},
    {mota:"izenburua", testua:"2.1 · Mezu baten egitura"},
    {mota:"teoria", testua:"Posta-mezu batek bi zati ditu: **goiburuak** (headers) eta **gorputza** (body), lerro huts batek banatuta. Goiburuek metadatuak dituzte; gorputzak testua. Eranskinak eta formatu aberatsa **MIME**-rekin kodetzen dira."},
    {mota:"fitxategia", izena:"posta-mezu gordina", edukia:"From: ainhoa@josebabilbao.net\nTo: jon@josebabilbao.net\nSubject: Bilera bihar\nDate: Mon, 16 Jun 2025 09:00:00 +0200\nMessage-ID: <abc123@josebabilbao.net>\n\nKaixo Jon,\nBihar 10:00etan elkartuko gara.\nAinhoa"},
    {mota:"taula", izenburua:"Goiburu nagusiak", headers:["Goiburua","Esanahia"], rows:[
      ["From / To","Igorlea / hartzailea"],["Subject","Gaia"],["Date","Bidalketa-data"],["Message-ID","Mezuaren identifikatzaile bakarra"],["CC / BCC","Kopia / ezkutuko kopia"]]},
    {mota:"izenburua", testua:"2.2 · MX erregistroak: nora bidali"},
    {mota:"teoria", testua:"SMTP-k mezu bat `jon@josebabilbao.net`-era bidaltzean, **DNS**-ari galdetzen dio domeinu horren **MX** erregistroa (Mail eXchanger): horrek esaten dio zein zerbitzarik jasotzen duen domeinu horren posta. Hainbat MX egon daitezke **lehentasunarekin** (zenbaki txikiena, lehenengo)."},
    {mota:"fitxategia", izena:"DNS zonan (MX)", edukia:"josebabilbao.net.   IN  MX  10  u18zerbitzaria.josebabilbao.net.\njosebabilbao.net.   IN  MX  20  ordezko.josebabilbao.net."},
    {mota:"oharra", testua:"Horrela lotzen dira Tema 2 (DNS) eta posta: MX gabe, SMTP-k ez daki nora eraman domeinu baten mezuak."},
    {mota:"simuladorea", id:"mail"},
    {mota:"izenburua", testua:"3. Posta-zerbitzaria muntatu (Postfix + Dovecot)"},
    {mota:"teoria", testua:"Posta-zerbitzari oso batek bi pieza konbinatzen ditu: **Postfix** MTA gisa (bidalketa eta garraioa, SMTP) eta **Dovecot** postontzietarako (jasotzea, IMAP/POP3). Biak `u18zerbitzaria`-n instalatzen dira."},
    {mota:"terminala", izenburua:"3.1 · Postfix instalatu (SMTP)", host:"u18zerbitzaria", lerroak:[
      {cmd:"sudo apt update && sudo apt install -y postfix", cmt:"'Internet Site' aukeratu; System mail name: josebabilbao.net"},
      {cmd:"sudo postconf -e 'home_mailbox = Maildir/'", cmt:"postontziak Maildir formatuan"},
      {cmd:"sudo systemctl restart postfix"}]},
    {mota:"teoria", izenburua:"3.2 · main.cf gakoak", testua:"`/etc/postfix/main.cf`-en oinarrizko parametroak: `myhostname` (zerbitzariaren izena), `mydomain` eta `mydestination` (hemen entregatzen diren domeinuak), eta `mynetworks` (zein saretik onartzen den bidalketa)."},
    {mota:"fitxategia", izena:"/etc/postfix/main.cf (zatia)", edukia:"myhostname = u18zerbitzaria.josebabilbao.net\nmydomain = josebabilbao.net\nmydestination = $myhostname, localhost, $mydomain\nmynetworks = 127.0.0.0/8, 192.168.4.0/24\nhome_mailbox = Maildir/\ninet_interfaces = all"},
    {mota:"terminala", izenburua:"3.3 · Dovecot instalatu (IMAP/POP3)", host:"u18zerbitzaria", lerroak:[
      {cmd:"sudo apt install -y dovecot-imapd dovecot-pop3d"},
      {cmd:"sudo nano /etc/dovecot/conf.d/10-mail.conf", cmt:"mail_location = maildir:~/Maildir"},
      {cmd:"sudo systemctl restart dovecot"}]},
    {mota:"terminala", izenburua:"3.4 · Posta-erabiltzailea sortu eta probatu", host:"u18zerbitzaria", lerroak:[
      {cmd:"sudo adduser ainhoa", cmt:"sistemako erabiltzailea = posta-kontua"},
      {cmd:"echo 'Kaixo' | mail -s 'Proba' ainhoa@josebabilbao.net", cmt:"mailutils behar da"},
      {cmd:"sudo ss -tlnp | grep -E ':25|:110|:143'", cmt:"portuak entzuten dutela egiaztatu"}]},
    {mota:"oharra", izenburua:"Bezeroa zure zerbitzariaren aurka", testua:"Thunderbird-en, jarri **sarrerako** zerbitzaria IMAP `192.168.4.101:143` eta **irteerakoa** SMTP `192.168.4.101:25`, `ainhoa` erabiltzailearekin. Bezeroak zure zerbitzarira bidaltzen eta hartzen du, betiko posta-hornitzaile batekin bezala."},
    {mota:"izenburua", testua:"4. Bezeroa konfiguratu (Thunderbird · 12_AS)"},
    {mota:"taula", headers:["Eremua","Zure zerbitzaria","Hornitzaile erreala"], rows:[
      ["Sarrera (IMAP)","192.168.4.101 · 143","imap.hornitzailea.net · 143/993"],["Irteera (SMTP)","192.168.4.101 · 25","smtp.hornitzailea.net · 587"],["Erabiltzailea","ainhoa","zure helbide osoa"]]},
    {mota:"errorea", testua:"**1. Bidalketa eta jasotzea nahastea:** SMTP-k bidali baino ez du; jasotzeko IMAP/POP3 (Dovecot) behar da. **2. `mynetworks` murritzegia:** bezeroak ezin du bidali ez badago bere sarea bertan. **3. Maildir/mbox bat ez etortzea** Postfix eta Dovecot-en artean. **4. Suebakiak 25/143 portuak ixtea**."}
  ],
  ariketak:[
    {maila:1, izenburua:"Protokoloak sailkatu", testua:"Simuladorean, egiaztatu lau konbinazioak: SMTP-rekin bidali, IMAP-ekin bidali, POP3-rekin jaso, SMTP-rekin jaso. Apuntatu zein diren baliozkoak.", arrakasta:"bidaltzea SMTP-rekin soilik; jasotzea POP3 edo IMAP-ekin."},
    {maila:2, izenburua:"Kontua Thunderbird-en", testua:"Konfiguratu kontu bat Thunderbird-en IMAP sarrera eta SMTP irteerarekin (irakaslearen edo hornitzaile erreal baten datuekin).", arrakasta:"Proba-mezu bat bidali eta sarrera-ontzian jasotzen duzu."},
    {maila:3, izenburua:"Zure posta-zerbitzaria (Postfix+Dovecot)", testua:"`u18zerbitzaria`-n instalatu Postfix eta Dovecot, sortu bi erabiltzaile eta konfiguratu Thunderbird zure zerbitzariaren aurka. Bidali mezu bat erabiltzaile batetik bestera.", arrakasta:"Erabiltzaile batek bidali eta besteak Thunderbird-en jasotzen du, dena zure VM-an."},
    {maila:4, izenburua:"SMTP eskuz telnet-ekin", testua:"Konektatu `telnet 192.168.4.101 25`-rekin eta bidali mezu bat eskuz `HELO`, `MAIL FROM`, `RCPT TO` eta `DATA` idatziz. Soluziorik gabe."}
  ],
  galdetegia:[
    {galdera:"Zein protokolok **bidaltzen** du posta zerbitzarien artean?", aukerak:["SMTP","IMAP","POP3"], zuzena:0, azalpena:"SMTP da garraio/bidalketakoa. POP3 eta IMAP postontzitik jasotzeko."},
    {galdera:"Posta bera mugikorrean eta ordenagailuan sinkronizatuta ikusi nahi duzu. Zer aukeratzen duzu?", aukerak:["POP3, jaitsi eta ezabatu","SMTP","IMAP, zerbitzarian mantendu"], zuzena:2, azalpena:"IMAP-ek zerbitzarian uzten du eta gailuak sinkronizatzen ditu."},
    {galdera:"Zein portu erabiltzen du POP3-k?", aukerak:["25","110","143"], zuzena:1, azalpena:"POP3 = 110, IMAP = 143, SMTP = 25/587."},
    {galdera:"Posta-agenteetan, zer da **MUA**?", aukerak:["Garraio-zerbitzaria","Erabiltzaileak irakurri/idazteko bezeroa (Thunderbird)","Postontzi fisikoa"], zuzena:1, azalpena:"MUA erabiltzailearen programa da; MTA garraio-zerbitzaria."}
  ]
},

/* ============================ TEMA 8 ============================ */
{
  id:"zer-t8", zenbakia:8, izenburua:{eu:"Web-zerbitzaria",es:"Servidor web"}, puntuak:180,
  laburpena:{eu:"HTTP, Apache, WordPress XAMPP-en, eta autentikazio zentralizatua: OpenLDAP (Linux) eta Samba AD DC Windows domeinurako.",es:"HTTP, Apache, WordPress en XAMPP y OpenLDAP para autenticación centralizada."},
  atalak:[
    {mota:"helburua", testua:"Muntatu web-zerbitzaria: `HTTP` protokoloa, `Apache` (13/14_AS), `WordPress` XAMPP-ekin (17_AS) eta `OpenLDAP` (18_AS)."},
    {mota:"analogia", testua:"Jatetxe batean plater bat eskatzea. **Eskaera** bat egiten duzu (metodo bat bide baten gainean) eta **erantzun** bat jasotzen duzu kode batekin: zerbitzatua (200), ez dago kartan (404), sukaldeak huts egin du (500). HTTP nabigatzailearen eta web-zerbitzariaren arteko joan-etorri hori da."},
    {mota:"teoria", testua:"HTTP TCP-ren gainean dabil `80` portuan (eta `443` HTTPS-rentzat, bertsio zifratua). Eskaera bakoitzak **metodo** bat erabiltzen du:"},
    {mota:"taula", headers:["Metodoa","Zertarako"], rows:[
      ["GET","Baliabide bat eskatu (nabigazio gehiena)"],["POST","Datuak zerbitzarira bidali (formularioak)"],["HEAD","GET bezala baina goiburuak soilik, gorputzik gabe"]]},
    {mota:"teoria", testua:"Erantzunak **egoera-kode** bat darama: `2xx` arrakasta, `3xx` birbideratzea, `4xx` bezeroaren errorea, `5xx` zerbitzariaren errorea."},
    {mota:"simuladorea", id:"http"},
    {mota:"izenburua", testua:"2. Apache (13/14_AS)"},
    {mota:"terminala", izenburua:"2.1 · Instalatu eta abiarazi", host:"u18zerbitzaria", lerroak:[
      {cmd:"sudo apt update && sudo apt install -y apache2"},{cmd:"sudo systemctl status apache2"}]},
    {mota:"teoria", testua:"Egiaztatu nabigatzailean `http://192.168.4.101`: Apache-ren defektuzko orria atera behar da. Gunearen fitxategiak `/var/www/html`-en doaz."},
    {mota:"terminala", izenburua:"2.2 · HTTPS aktibatu (SSL)", host:"u18zerbitzaria", lerroak:[
      {cmd:"sudo a2enmod ssl"},{cmd:"sudo mkdir /etc/apache2/ssl"},
      {cmd:"sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout /etc/apache2/ssl/apache.key -out /etc/apache2/ssl/apache.crt"},
      {cmd:"sudo a2ensite default-ssl.conf"},{cmd:"sudo systemctl restart apache2"}]},
    {mota:"izenburua", testua:"3. WordPress XAMPP-en (17_AS)"},
    {mota:"teoria", testua:"XAMPP-ek Apache + MySQL + PHP + Perl instalatzaile bakarrean biltzen ditu, WordPress lokal bat azkar muntatzeko `u20zerbitzuak`-en."},
    {mota:"pausoak", items:[
      {izen:"Jaitsi eta instalatu XAMPP", testua:"`apachefriends.org`-tik. Eman exekuzio-baimena eta abiarazi:", host:"u20zerbitzuak", terminala:[{cmd:"sudo chmod 755 xampp-linux-x64-*-installer.run"},{cmd:"sudo ./xampp-linux-x64-*-installer.run"},{cmd:"sudo /opt/lampp/lampp start"}]},
      {izen:"Datu-basea sortu", testua:"`http://localhost/phpmyadmin`-en sortu datu-base huts bat, adib. `wordpress`."},
      {izen:"WordPress zabaldu", testua:"Deskonprimitu WordPress `/opt/lampp/htdocs/wordpress`-en eta ireki `http://localhost/wordpress`; laguntzaileak datu-base horren datuak eskatuko ditu."}]},
    {mota:"oharra", izenburua:"LAMP vs XAMPP", testua:"Zerbitzari erreal batean LAMP pila paketez instalatzen da (`apache2`, `mysql-server`, `php`). XAMPP \"dena bat\" bertsioa da lokalean azkar probatzeko."},
    {mota:"izenburua", testua:{eu:"3.1 · Moodle (15_AS)",es:"3.1 · Moodle (15_AS)"}},
    {mota:"teoria", testua:{eu:"**Moodle** ikasteko ingurune birtual bat da (LMS). WordPress bezala, web-zerbitzaria + PHP + datu-basea behar ditu. Modurik errazena **Bitnami** pakete osoa erabiltzea da: dena (Apache, MariaDB, PHP eta Moodle) batera instalatzen du.",es:"**Moodle** es un entorno virtual de aprendizaje (LMS). Como WordPress, necesita servidor web + PHP + base de datos. La forma más fácil es usar el paquete **Bitnami**, que instala todo junto (Apache, MariaDB, PHP y Moodle)."}},
    {mota:"pausoak", izenburua:{eu:"Moodle instalatu Bitnami-rekin",es:"Instalar Moodle con Bitnami"}, items:[
      {izen:{eu:"Jaitsi Bitnami Moodle",es:"Descargar Bitnami Moodle"}, testua:{eu:"`bitnami.com` → Moodle → Linux instalatzailea. Eman exekuzio-baimena eta abiarazi:",es:"`bitnami.com` → Moodle → instalador Linux. Da permiso de ejecución y lánzalo:"}, host:"u20zerbitzuak", terminala:[{cmd:"sudo chmod 755 bitnami-moodle-*-installer.run"},{cmd:"sudo ./bitnami-moodle-*-installer.run"}]},
      {izen:{eu:"Administratzailea konfiguratu",es:"Configurar el administrador"}, testua:{eu:"Laguntzaileak administratzailearen izena, posta eta pasahitza eskatuko ditu. Datu-basea automatikoki sortzen da.",es:"El asistente pedirá nombre, correo y contraseña del administrador. La base de datos se crea automáticamente."}},
      {izen:{eu:"Sartu eta euskaraz jarri",es:"Entrar y poner en euskera/español"}, testua:{eu:"Ireki `http://localhost/moodle` eta hasi saioa. `Hizkuntza` ezarpenetan, jarri Moodle euskaraz.",es:"Abre `http://localhost/moodle` e inicia sesión. En ajustes de `Idioma`, configura Moodle en el idioma deseado."}}]},
    {mota:"izenburua", testua:"4. Autentikazio zentralizatua eta domeinua (18_AS)"},
    {mota:"teoria", testua:"LDAP-ek erabiltzaile-kontuak zentralizatzen ditu: makina bakoitzean erabiltzaile bera sortu beharrean, kontuak zerbitzari batean bizi dira eta bezeroak haren aurka autentikatzen dira. Hau **domeinu** baten muina da: kontu bakarra ekipo guztietan."},
    {mota:"teoria", izenburua:"4.1 · OpenLDAP zerbitzaria", testua:"Linux bezeroentzako kontu zentralizatuak emateko bidea."},
    {mota:"terminala", host:"u18zerbitzaria — LDAP", lerroak:[
      {cmd:"sudo apt update && sudo apt install -y slapd ldap-utils"},{cmd:"sudo dpkg-reconfigure slapd", cmt:"oinarri-domeinua: dc=josebabilbao,dc=net"},{cmd:"ldapsearch -x -b dc=josebabilbao,dc=net"}]},
    {mota:"teoria", izenburua:"4.2 · Linux bezeroa LDAPera lotu", testua:"Bezero Ubuntu-an `sssd` instalatzen da LDAP zerbitzariaren aurka autentikatzeko. Klabea: `ldap://` aurrizkia eta base DN zuzena."},
    {mota:"terminala", host:"u20zerbitzuak — bezeroa", lerroak:[
      {cmd:"sudo apt install -y sssd libnss-sss libpam-sss ldap-utils"},
      {cmd:"sudo nano /etc/sssd/sssd.conf", cmt:"ldap_uri = ldap://192.168.4.101 ; ldap_search_base = dc=josebabilbao,dc=net"},
      {cmd:"sudo systemctl restart sssd", cmt:"orain LDAPeko kontuekin saioa has daiteke"}]},
    {mota:"izenburua", testua:"5. Windows bezeroa domeinura: Samba AD DC"},
    {mota:"teoria", testua:"Windows bezero bat **domeinu batean sartzeko**, domeinu-kontrolatzaile (DC) bat behar da, ez LDAP soila. Zerbitzuak asignaturan, **Samba**-k AD domeinu-kontrolatzaile gisa joka dezake Ubuntu-ren gainean (Active Directory bateragarria). Horrela Windows-ek dominora benetan sar daiteke."},
    {mota:"oharra", testua:"Windows Server-en gaineko domeinua **Sareak** asignaturan lantzen da. Hemen Linux-en gaineko bidea (Samba AD DC) ematen da, Zerbitzuak-i dagokiona."},
    {mota:"terminala", izenburua:"5.1 · Samba AD DC hornitu (u18zerbitzaria)", host:"u18zerbitzaria — DC", lerroak:[
      {cmd:"sudo apt install -y samba krb5-config winbind"},
      {cmd:"sudo mv /etc/samba/smb.conf /etc/samba/smb.conf.bak"},
      {cmd:"sudo samba-tool domain provision --use-rfc2307 --interactive", cmt:"Realm: JOSEBABILBAO.NET · Domain: JOSEBABILBAO · DC role"},
      {cmd:"sudo systemctl restart samba-ad-dc", cmt:"DC martxan"}]},
    {mota:"terminala", izenburua:"5.2 · DC erabiltzaile bat sortu", host:"u18zerbitzaria — DC", lerroak:[
      {cmd:"sudo samba-tool user create ainhoa"},{cmd:"sudo samba-tool user list"}]},
    {mota:"pausoak", izenburua:"5.3 · Windows bezeroa domeinura sartu", items:[
      {izen:"DNS DCra apuntatu", testua:"Windows bezeroan, jarri DNS bakar gisa `192.168.4.101` (DCa). Domeinu-bilaketak DNS bidez egiten dira: hau ezinbestekoa da."},
      {izen:"Ordua sinkronizatu", testua:"DC eta bezeroaren ordua bat etorri behar dira (Kerberos-ek 5 minututik beherako aldea eskatzen du)."},
      {izen:"Domeinura sartu", testua:"`Sistema → Berrizendatu ekipo hau (aurreratua) → Domeinua: josebabilbao.net`. Sartu DCko administratzaile-kredentzialak eta berrabiarazi. Ondoren, `JOSEBABILBAO\\ainhoa`-rekin has dezakezu saioa Windows-en."}]},
    {mota:"errorea", testua:"**1. `ldap://` ahaztea** Linux bezeroan. **2. Base DN gaizki idatzia.** **3. DNS DCra ez apuntatzea** (Windows join-ak DNS behar du domeinua aurkitzeko). **4. Ordua desinkronizatuta** → Kerberos-ek huts egiten du. **5. Samba zerbitzu nahasiak**: AD DC moduan `samba-ad-dc` erabiltzen da, ez `smbd` solte."}
  ],
  ariketak:[
    {maila:1, izenburua:"Apache zerbitzatzen", testua:"Instalatu Apache `u18zerbitzaria`-n eta sortu `/var/www/html`-en zure `index.html` propio bat nabigatzailean ikusteko.", arrakasta:"`http://192.168.4.101`-k zure orria erakusten du, ez Apache-rena."},
    {maila:2, izenburua:"Egoera-kodeak", testua:"Simuladorean, eskatu `/index.html`, gero existitzen ez den bide bat eta gero `/admin`. Apuntatu bakoitzaren kodea.", arrakasta:"200, 404 eta 403 jasotzen dituzu hurrenez hurren."},
    {maila:3, izenburua:"WordPress martxan (17_AS)", testua:"Muntatu XAMPP `u20zerbitzuak`-en, sortu datu-basea eta osatu WordPress-en instalazioa administrazio-panelera sartu arte.", arrakasta:"Sarrera bat argitaratu eta `http://localhost/wordpress`-en ikusten duzu."},
    {maila:3, izenburua:"Kontu zentralizatua Linux-en (OpenLDAP)", testua:"Muntatu OpenLDAP `u18zerbitzaria`-n, sortu erabiltzaile bat eta lotu Ubuntu bezeroa `sssd`-rekin LDAPeko kontuarekin saioa hasteko.", arrakasta:"Ubuntu bezeroan LDAPeko erabiltzailearekin (zerbitzarian bakarrik dagoena) saioa hasten duzu."},
    {maila:4, izenburua:"Windows domeinura sartu (Samba AD DC)", testua:"Hornitu Samba AD DC bat `u18zerbitzaria`-n, apuntatu Windows bezeroaren DNS DCra, sinkronizatu ordua eta sartu Windows-a `josebabilbao.net` domeinura. Soluziorik gabe.", arrakasta:"Windows-ek domeinua onartzen du eta `JOSEBABILBAO\\erabiltzailea`-rekin saioa has dezakezu."}
  ],
  galdetegia:[
    {galdera:"Zein portu erabiltzen dituzte HTTP-k eta HTTPS-k?", aukerak:["21 eta 22","25 eta 110","80 eta 443"], zuzena:2, azalpena:"HTTP = 80, HTTPS (zifratua) = 443."},
    {galdera:"Datuak zerbitzarira bidaltzen dituen formulario batek zein metodo erabiltzen du?", aukerak:["GET","POST","HEAD"], zuzena:1, azalpena:"POST-ek datuak gorputzean bidaltzen ditu."},
    {galdera:"Existitzen ez den orri bat eskatzen duzu. Zein kode itzultzen du zerbitzariak?", aukerak:["404","200","500"], zuzena:0, azalpena:"404 = aurkitu gabe (bezeroaren errorea, 4xx)."},
    {galdera:"Zer ebazten du OpenLDAP-ek?", aukerak:["Web-orriak zerbitzatu","Fitxategiak transferitu","Erabiltzaile-kontuak zentralizatu autentikaziorako"], zuzena:2, azalpena:"LDAP-ek erabiltzaileak zerbitzari zentral batean gordetzen ditu."}
  ]
}

      ]
    },

    /* =====================================================================
       SAREKOAK — Windows Server eta Datu-baseak (euskeraz)
       Iturria: Joseba Mirena Bilbao Requena (CC BY-NC-SA 2.5)
       ===================================================================== */
    {
      id:"sarekoak", izena:"Sarekoak", ikonoa:"🪟",
      temak:[

/* ===================== SAR TEMA 0 ===================== */
{
  id:"sar-t0", zenbakia:0, izenburua:{eu:"Makina birtualak eta IPak",es:"Máquinas virtuales e IPs"}, puntuak:120,
  laburpena:{eu:"Prestatu laborategia: Windows Server 2008 R2 eta 2019, Ubuntu 20 eta Windows 10 bezeroak, IP finkoarekin.",es:"Prepara el laboratorio: Windows Server 2008 R2 y 2019, clientes Ubuntu 20 y Windows 10, con IP fija."},
  atalak:[
    {mota:"helburua", testua:"Instalatu `VirtualBox`-en laborategiko sistema eragileak (1_AS): bi **Windows Server** zerbitzari eta **Ubuntu/Windows** bezeroak. Jarri IP finkoa eta lotu denak."},
    {mota:"analogia", testua:"Bulego baten muntaketa. Lehenik altzariak eta makinak ekartzen dituzu (VMak sortu), gero argia eta telefonoa konektatu (sarea eta IP), eta orduan has zaitezke lanean (zerbitzuak). Tema honetan bulegoa muntatzen dugu."},
    {mota:"taula", izenburua:"Aulako makinak (SAREKOAK)", headers:["Izena","Sistema","RAM/Diskoa","Rola"], rows:[
      ["ws08","Windows Server 2008 R2 STD","4096 MB / 35 GB","**Zerbitzaria**"],
      ["ws19","Windows Server 2019 STD","4096 MB / 35 GB","**Zerbitzaria**"],
      ["u20sar","Ubuntu 20.04","4096 MB / 30 GB","Bezeroa (Linux)"],
      ["w10sar","Windows 10 Prof.","4096 MB / 35 GB","Bezeroa (Windows)"]]},
    {mota:"oharra", izenburua:"Kredentzialak eta izenak", testua:"Windows Server-en administratzailea: `administrador / 1617@m$$`. Aldatu ekipo-izena zurearekin (adib. `ws19zureizena`, `ub20sarzureizena`, `w10sarzureizena`)."},
    {mota:"izenburua", testua:"1. ISOak lortu eta VMak sortu"},
    {mota:"pausoak", izenburua:"Pausoak", items:[
      {izen:"ISOak kopiatu irakaslearengandik", testua:"`gftp` FTP bezeroarekin, konektatu irakaslearen ekipora (`192.168.4.50`, `mss2 / 1617@m$$`) eta kopiatu `ws08` eta `ws19` ISOak zure `ISO` karpetara."},
      {izen:"Sortu VMak", testua:"VirtualBox: `Berria → Izena · Mota: Microsoft Windows / Linux · Bertsioa`. RAM 4096 MB eta dagokion diskoa. Lotu ISOa eta instalatu."},
      {izen:"Sarea zubian", testua:"VM bakoitzean `Ezarpenak → Sarea → Zubi-adaptadorea`, makina guztiek elkar ikus dezaten."},
      {izen:"Guztiak prestatu", testua:"Windows-etan: instalatu `firefox`, kendu eguneraketa automatikoak eta **desgaitu Windows suebakia** (laborategirako). Ubuntu-n: `sudo apt update && sudo apt upgrade`."}]},
    {mota:"izenburua", testua:"2. IP finkoa"},
    {mota:"teoria", testua:"Windows Server-en IP finkoa interfaze grafikotik jartzen da: `Centro de redes → Cambiar configuración del adaptador → Propiedades → IPv4`. Aulako sarea `192.168.4.0/24`, atebidea `192.168.4.1`."},
    {mota:"taula", izenburua:"IP finkoa Windows Server-en", headers:["Eremua","Balioa"], rows:[
      ["IP helbidea","192.168.4.X (irakasleak ematen du)"],["Maskara","255.255.255.0"],["Atebidea","192.168.4.1"],["DNS","8.8.8.8 (gero zerbitzaria bera AD-rekin)"]]},
    {mota:"simuladorea", id:"ip"},
    {mota:"errorea", testua:"**1. NAT zubiaren ordez** → VMek ez dute elkar ikusten. **2. Windows suebakia piztuta** → ping eta zerbitzuak blokeatzen ditu. **3. IP errepikatua** klonatu ondoren. **4. Ekipo-izena ez aldatzea** klonatutako VMetan."}
  ],
  ariketak:[
    {maila:1, izenburua:"Windows Server 2008 sortu", testua:"Sortu `ws08` VM-a (WS2008 R2, 4096 MB, 35 GB), instalatu eta jarri `administrador / 1617@m$$`. Aldatu ekipo-izena.", arrakasta:"WS2008 abiarazten da eta saioa hasten duzu administratzaile gisa."},
    {maila:2, izenburua:"WS2019 eta bezeroak", testua:"Sortu `ws19` (WS2019), `u20sar` (Ubuntu) eta `w10sar` (Windows 10). Klonatzea erabil dezakezu bezeroentzat, izena aldatuz.", arrakasta:"Lau makinak abiarazten dira, bakoitza bere izen propioarekin."},
    {maila:3, izenburua:"Sarea eta IP finkoa", testua:"Jarri denak zubian, IP finkoekin (errepikatu gabe), desgaitu Windows suebakia eta egiaztatu denek elkarri ping egiten diotela.", arrakasta:"`ws19`-tik `ws08`, `u20sar` eta `w10sar`-i ping egiten diezu."},
    {maila:4, izenburua:"Azterketa-prestaketa", testua:"Dokumentatu zure IP banaketa eta egiaztatu zerbitzuak instalatzeko prest dagoela laborategia (zerbitzariak + bezeroak konektatuta). Soluziorik gabe."}
  ],
  galdetegia:[
    {galdera:"Zein dira SAREKOAK-eko bi zerbitzariak?", aukerak:["Ubuntu 18 eta 20","Windows Server 2008 R2 eta 2019","Windows 10 eta 11"], zuzena:1, azalpena:"Sarekoak Windows Server-en oinarritzen da: WS2008 R2 eta WS2019."},
    {galdera:"Zergatik desgaitzen da Windows suebakia laborategian?", aukerak:["Azkarrago doalako","Ping eta zerbitzuak blokeatzen dituelako defektuz","Beharrezkoa delako AD-rentzat"], zuzena:1, azalpena:"Defektuzko suebakiak probak oztopatzen ditu; laborategian desgaitzen da."},
    {galdera:"VMek elkar ikusteko, zein sare-modu?", aukerak:["NAT","Zubi-adaptadorea","Host-only soilik"], zuzena:1, azalpena:"Zubiak LANeko IP errealak ematen ditu eta makinak elkar ikusten dira."}
  ]
},

/* ===================== SAR TEMA 1 ===================== */
{
  id:"sar-t1", zenbakia:1, izenburua:{eu:"Datu-baseak",es:"Bases de datos"}, puntuak:200,
  laburpena:{eu:"Diseinatu (E/R, eredu erlazionala, normalizazioa) eta inplementatu datu-baseak MySQL 8-rekin.",es:"Diseña (E/R, modelo relacional, normalización) e implementa bases de datos con MySQL 8."},
  atalak:[
    {mota:"helburua", testua:"Ulertu datu-baseen diseinua (kontzeptuala, logikoa, normalizazioa) eta instalatu/erabili MySQL 8 eta tresna grafikoak (phpMyAdmin, DBeaver, HeidiSQL) datu-baseak sortzeko."},
    {mota:"analogia", testua:"Liburutegi bat. **Entitateak** apalategiak dira (liburuak, irakurleak), **atributuak** liburu bakoitzaren datuak (izenburua, ISBN), eta **erlazioak** \"nork zer mailegatu duen\" lotzen dute. Datu-baseak liburutegi hori antolatu eta galde dakiokeen sistema da."},
    {mota:"izenburua", testua:"1. Diseinuaren hiru mailak"},
    {mota:"taula", headers:["Maila","Zer egiten den","Tresna"], rows:[
      ["Kontzeptuala (E/R)","Entitateak, atributuak eta erlazioak identifikatu","E/R diagrama"],
      ["Logikoa (erlazionala)","E/R taula bihurtu: gako nagusi/arrotzak","Taulen eskema"],
      ["Fisikoa","Inplementatu DBKS batean","MySQL (SQL)"]]},
    {mota:"teoria", izenburua:"1.1 · Gakoak eta kardinalitatea", testua:"**Gako nagusia** (PRIMARY KEY) errenkada bakoitza modu bakarrean identifikatzen du. **Gako arrotza** (FOREIGN KEY) beste taula bateko gako nagusira apuntatzen du, taulak lotuz. **Kardinalitatea** erlazio batean zenbat elementu lotzen diren: `1:1`, `1:N` edo `N:M`."},
    {mota:"teoria", izenburua:"1.2 · E/R-tik eredu erlazionalera", testua:"Araua: **1:N** erlazioan, N aldeak hartzen du 1 aldearen gako nagusia gako arrotz gisa. **N:M** erlazioan, **lotura-taula** berri bat sortzen da, bi gakoekin (gako nagusi konposatua)."},
    {mota:"simuladorea", id:"ercard"},
    {mota:"teoria", izenburua:"1.3 · Normalizazioa", testua:"Datuak antolatzeko prozesua, errepikapenak eta anomaliak kentzeko. **1FN:** balio atomikoak (talde errepikakorrik ez). **2FN:** 1FN + atributu ez-gakoak gako nagusi osoaren mende (ez zati baten). **3FN:** 2FN + mendekotasun iragankorrik ez (atributu ez-gakoek ez dute beste ez-gakorik zehazten)."},
    {mota:"izenburua", testua:"2. MySQL 8 instalatu (DB1_AS)"},
    {mota:"terminala", izenburua:"2.1 · Zerbitzaria eta tresnak (Ubuntu)", host:"u20sar — datu-base zerbitzaria", lerroak:[
      {cmd:"sudo apt update && sudo apt install -y mysql-server"},
      {cmd:"sudo mysql_secure_installation", cmt:"erro-pasahitza eta segurtasuna"},
      {cmd:"sudo apt install -y phpmyadmin", cmt:"web tresna grafikoa"},
      {cmd:"sudo systemctl status mysql"}]},
    {mota:"oharra", testua:"**DBeaver** eta **HeidiSQL** bezero grafikoak dira (urrunetik konektatzeko); **phpMyAdmin** webetik administratzeko. Bezerotik konektatzeko, MySQL-k urruneko konexioak onartu behar ditu (`bind-address`)."},
    {mota:"izenburua", testua:"3. SQL: sortu datu-base bat"},
    {mota:"teoria", testua:"Adibidea: ikasleen notak (IKASLEA, IRAKASGAIA eta haien arteko N:M erlazioa IKASI lotura-taularekin)."},
    {mota:"terminala", izenburua:"mysql kontsolan", host:"u20sar", lerroak:[
      {txt:"CREATE DATABASE NOTAK;"},{txt:"USE NOTAK;"},
      {txt:"CREATE TABLE IKASLEA (NAN CHAR(9) PRIMARY KEY, IZENA VARCHAR(15) NOT NULL);"},
      {txt:"CREATE TABLE IRAKASGAIA (I_ZK INT UNSIGNED PRIMARY KEY AUTO_INCREMENT, IZENA VARCHAR(15));"},
      {txt:"CREATE TABLE IKASI ("},
      {txt:"  IKASLEA CHAR(9), IRAKASGAIA INT UNSIGNED, NOTA DOUBLE(3,1),"},
      {txt:"  PRIMARY KEY (IKASLEA, IRAKASGAIA),"},
      {txt:"  FOREIGN KEY (IKASLEA) REFERENCES IKASLEA(NAN),"},
      {txt:"  FOREIGN KEY (IRAKASGAIA) REFERENCES IRAKASGAIA(I_ZK));"}]},
    {mota:"terminala", izenburua:"3.1 · Datuak sartu eta kontsultatu", host:"u20sar", lerroak:[
      {txt:"INSERT INTO IKASLEA VALUES ('12345678Z', 'Ainhoa');"},
      {txt:"INSERT INTO IRAKASGAIA (IZENA) VALUES ('Sareak');"},
      {txt:"INSERT INTO IKASI VALUES ('12345678Z', 1, 8.5);"},
      {txt:"SELECT i.IZENA, k.IZENA AS irakasgaia, n.NOTA"},
      {txt:"  FROM IKASI n JOIN IKASLEA i ON n.IKASLEA=i.NAN"},
      {txt:"  JOIN IRAKASGAIA k ON n.IRAKASGAIA=k.I_ZK;"}]},
    {mota:"teoria", izenburua:"3.2 · Normalizazio-adibidea", testua:"Demagun taula bakar bat: `MATRIKULA(ikasle_nan, ikasle_izena, irakasgaia, irakaslea)`. **Arazoa:** ikasle batek 3 irakasgai baditu, bere izena 3 aldiz errepikatzen da (erredundantzia eta eguneratze-anomaliak). **3FN-ra normalizatuta:** `IKASLEA(nan, izena)`, `IRAKASGAIA(id, izena, irakaslea)` eta `MATRIKULA(nan, irakasgaia_id)` lotura-taula. Orain datu bakoitza behin baino ez dago."},
    {mota:"errorea", testua:"**1. N:M lotura-taularik gabe** modelatzea → datuak errepikatzen dira. **2. FK-a okerreko aldean** 1:N-n. **3. Normalizatu gabe** → eguneratze-anomaliak. **4. Gako nagusirik gabeko taula**."}
  ],
  ariketak:[
    {maila:1, izenburua:"Kardinalitateak (DB5_AS)", testua:"Simuladorean, aztertu hiru kardinalitateak `IKASLEA`/`IRAKASGAIA`-rekin eta apuntatu zein kasutan sortzen den lotura-taula.", arrakasta:"N:M-k bakarrik sortzen du hirugarren taula; 1:N-k FK darama N aldean."},
    {maila:2, izenburua:"Diseinu logiko erlazionala (DB2_AS)", testua:"Ikasleen notak kudeatzeko taulak emanda, irudikatu eskema logiko erlazionala gako nagusi eta arrotzak finkatuz. Errepikatu bideo-jokoen eta bideoklub baten kasuetarako.", arrakasta:"Taula bakoitzak bere gako nagusia du eta erlazioak FK-z adierazita daude."},
    {maila:3, izenburua:"E/R → erlazionala (DB6_AS)", testua:"`HOTELA` eta `AZTERKETA` E/R eskema kontzeptualetatik, lortu eskema logiko erlazionala eta normalizatu 3FN-raino.", arrakasta:"Eskema erlazionala 3FN-n dago: errepikapenik eta mendekotasun iragankorrik gabe."},
    {maila:4, izenburua:"MySQL-en sortu (DB7_AS)", testua:"Instalatu MySQL 8 eta sortu zure diseinuari dagozkion datu-baseak eta taulak SQL-rekin (PK eta FK barne). Konektatu phpMyAdmin edo DBeaver-etik.", arrakasta:"Taulak `SHOW TABLES`-ekin agertzen dira eta erlazioak FK-ekin sortuta daude."}
  ],
  galdetegia:[
    {galdera:"N:M erlazio bat eredu erlazionalean nola adierazten da?", aukerak:["Gako arrotza edozein taulatan","Lotura-taula berri batekin (gako konposatua)","Ezin da adierazi"], zuzena:1, azalpena:"N:M-k hirugarren taula behar du, bi gako nagusiak FK gisa dituena."},
    {galdera:"Zer da gako arrotz (FOREIGN KEY) bat?", aukerak:["Errenkada identifikatzen duen gakoa","Beste taula bateko gako nagusira apuntatzen duen eremua","Beti zenbaki bat"], zuzena:1, azalpena:"FK-ak taulak lotzen ditu beste taula bateko gako nagusira erreferentzia eginez."},
    {galdera:"1FN-k zer eskatzen du?", aukerak:["Balio atomikoak (talde errepikakorrik ez)","Mendekotasun iragankorrik ez","Gako arrotzik ez"], zuzena:0, azalpena:"Lehen forma normalak balio atomikoak eskatzen ditu, errepikakorrik gabe."},
    {galdera:"Zein da datu-baseak kudeatzeko web-tresna grafikoa?", aukerak:["DBeaver","phpMyAdmin","HeidiSQL"], zuzena:1, azalpena:"phpMyAdmin webetik erabiltzen da; DBeaver eta HeidiSQL bezero grafikoak dira."}
  ]
},

/* ===================== SAR TEMA 2 ===================== */
{
  id:"sar-t2", zenbakia:2, izenburua:{eu:"Windows sareak: zerbitzaria",es:"Redes Windows: el servidor"}, puntuak:120,
  laburpena:{eu:"Sareko sistema eragileak eta Windows Server. Instalatu WS2008 R2 eta WS2019.",es:"Sistemas operativos de red y Windows Server. Instala WS2008 R2 y WS2019."},
  atalak:[
    {mota:"helburua", testua:"Ulertu sareko sistema eragile baten rola eta instalatu `Windows Server 2008 R2` eta `Windows Server 2019 Standard` (2_AS)."},
    {mota:"analogia", testua:"Auzo bateko ur-biltegi nagusia. Etxe bakoitzak (bezeroak) bere txorrota du, baina ura biltegi zentralizatu batetik banatzen da. **Zerbitzaria** biltegi hori da: baliabideak (fitxategiak, inprimagailuak, kontuak) modu zentralizatuan kudeatzen ditu auzo osoarentzat."},
    {mota:"teoria", izenburua:"1. Sareko sistema eragileak", testua:"Sareko sistema eragile batek bi ekipo edo gehiago lotzen ditu, haien hardware eta software baliabideak partekatzeko. Sareko ekiporen batek sistema hau instalatu behar du baliabideak **zentralizatuta** kudeatzeko: ekipo hori **zerbitzaria** da. Hori gabe, sarea lan-talde soil bat da."},
    {mota:"taula", izenburua:"Bi osagai", headers:["Osagaia","Definizioa"], rows:[
      ["Bezeroak","Postu bakarreko sistema eragiledun ekipoak; zerbitzarira konektatu eta balidatzen dira baliabideak erabiltzeko"],
      ["Zerbitzariak","Sareko sistema eragiledun ekipoak; baliabideak zentralizatuta kudeatzen dituzte"]]},
    {mota:"teoria", izenburua:"2. Windows Server", testua:"Windows Server zerbitzarietarako sistema eragilea da (Novell Netware, UNIX edo GNU/Linux-en parekoa). **Funtzioen (rolen)** bidez antolatzen da: Active Directory, DNS, DHCP, IIS (web), fitxategi-zerbitzaria… Rol bakoitza `Administrador del servidor`-etik gehitzen da."},
    {mota:"izenburua", testua:"3. Instalazioa"},
    {mota:"pausoak", izenburua:"Windows Server instalatu", items:[
      {izen:"VM-a lotu ISOra", testua:"`ws08` eta `ws19` VMetan, lotu dagokion ISOa eta abiarazi instalatzailea."},
      {izen:"Instalazio-mota", testua:"Aukeratu edizio **Standard** ingurune grafikoarekin (`con experiencia de escritorio`), partizioa eta hasi instalazioa."},
      {izen:"Administratzailea", testua:"Amaitzean, ezarri `administrador`-en pasahitza (`1617@m$$`) eta hasi saioa. Instalatu Guest Additions eta firefox."}]},
    {mota:"errorea", testua:"**1. Core edizioa aukeratzea** nahi gabe (interfaze grafikorik gabe). **2. Pasahitz-konplexutasuna**: Windows-ek konplexua eskatzen du. **3. Guest Additions ahaztea**."}
  ],
  ariketak:[
    {maila:1, izenburua:"WS2008 R2 instalatu", testua:"Instalatu Windows Server 2008 R2 `ws08` makinan, ingurune grafikoarekin, eta hasi saioa administratzaile gisa.", arrakasta:"Mahaigaina kargatzen da eta `Administrador del servidor` ireki dezakezu."},
    {maila:2, izenburua:"WS2019 instalatu", testua:"Instalatu Windows Server 2019 Standard `ws19` makinan, ingurune grafikoarekin.", arrakasta:"WS2019 mahaigaina martxan, IP finkoarekin."},
    {maila:3, izenburua:"Rolak ezagutu", testua:"`Administrador del servidor → Administrar → Agregar roles`-en, identifikatu (gehitu gabe) AD DS, DNS, DHCP eta IIS rolak. Azaldu zertarako den bakoitza.", arrakasta:"Lau rolen funtzioa azaltzen duzu hitz gutxitan."},
    {maila:4, izenburua:"Bertsioak alderatu", testua:"Konparatu WS2008 R2 eta WS2019 hardware-eskakizunetan eta interfazean. Soluziorik gabe."}
  ],
  galdetegia:[
    {galdera:"Zerk bereizten du zerbitzari bat bezero batetik?", aukerak:["Hardware azkarragoa beti","Baliabideak zentralizatuta kudeatzen dituela sareko sistema eragile batekin","Internetera konektatuta egotea"], zuzena:1, azalpena:"Zerbitzariak baliabideak zentralizatzen ditu; bezeroak haietara konektatzen dira."},
    {galdera:"Windows Server-en, nola gehitzen da zerbitzu bat (DNS, DHCP…)?", aukerak:["apt install komandoarekin","Administrador del servidor → Agregar roles","Erregistroa editatuz"], zuzena:1, azalpena:"Windows Server-en funtzioak rol gisa gehitzen dira Administrador del servidor-etik."},
    {galdera:"Zer da lan-talde bat (zerbitzaririk gabe)?", aukerak:["Domeinu bat","Baliabideak zentralizatu gabeko ekipo-multzoa","Zerbitzari birtual bat"], zuzena:1, azalpena:"Zerbitzari/zentralizaziorik gabe, sarea lan-talde soil bat da."}
  ]
},

/* ===================== SAR TEMA 3 ===================== */
{
  id:"sar-t3", zenbakia:3, izenburua:{eu:"Domeinuak: Active Directory eta DNS",es:"Dominios: Active Directory y DNS"}, puntuak:160,
  laburpena:{eu:"Domeinu, zuhaitz eta basoa. Instalatu AD DS + DNS Windows Server-en eta sortu domeinua.",es:"Dominio, árbol y bosque. Instala AD DS + DNS en Windows Server y crea el dominio."},
  atalak:[
    {mota:"helburua", testua:"Instalatu **Active Directory** (AD DS) eta **DNS** Windows Server-en eta sortu domeinu bat (3_AS WS2008, 4_AS WS2019)."},
    {mota:"oharra", izenburua:"Ikuspegi sakona · zergatik domeinua", testua:"Pausoek \"nola\" erakusten dute; hona \"zergatik\". Domeinu gabe, ekipo bakoitzak bere kontuak ditu (lan-taldea): 30 ekipotan, 30 aldiz sortu erabiltzaile bera. Domeinuarekin, kontua **behin** sortzen da AD-n eta edozein ekipotatik sar daiteke (saio bakarra, SSO). Gainera **GPO** (talde-politikak) bidez arau berak ezar daitezke ekipo guztietan aldi berean. Hori da domeinuaren benetako irabazia: administrazio zentralizatua eskalan."},
    {mota:"analogia", testua:"Enpresa baten antolaketa. **Domeinua** enpresa bat da, langile eta arau komunekin. **Zuhaitza** enpresa-talde bat (domeinu lotuak). **Basoa** (forest) talde guztien multzoa. **Active Directory** giza baliabideen sail zentrala da: nor den nor, zer egin dezakeen, non sartu daitekeen."},
    {mota:"teoria", izenburua:"1. Kontzeptuak", testua:"**Domeinua:** administrazio-unitate bat, kontu eta baliabide partekatuekin. **Zuhaitza:** izen-espazio bera partekatzen duten domeinuak. **Basoa (forest):** zuhaitz baten edo gehiagoren multzoa. **Domeinu-kontrolatzailea (DC):** AD daukan zerbitzaria. **OU (unitate organizatiboa):** kontuak/ekipoak antolatzeko \"karpetak\"."},
    {mota:"oharra", testua:"AD-k **DNS** behar du nahitaez: domeinua DNS-izen bat da (adib. `bilbao.com`) eta bezeroek DNS bidez aurkitzen dute DCa. Horregatik instalatzen dira batera."},
    {mota:"izenburua", testua:"2. AD DS + DNS instalatu"},
    {mota:"pausoak", izenburua:"ws19 makinan (4_AS)", items:[
      {izen:"Rola gehitu", testua:"`Administrador del servidor → Administrar → Agregar Roles y Características → Instalación basada en características o roles → Servicios de dominio de Active Directory → Instalar`. (DNS-a prozesuan gehitzen da.)"},
      {izen:"DCra igo", testua:"Instalatu ondoren: `Promover este servidor a controlador de dominio → Agregar un nuevo bosque → Nombre de dominio raíz: zureabizena.com` (adib. `bilbao.com`)."},
      {izen:"Berrabiarazi", testua:"Ezarri DSRM pasahitza, jarraitu eta utzi berrabiarazten. Ondoren saioa domeinuan hasiko da: `ZUREABIZENA\\administrador`."}]},
    {mota:"simuladorea", id:"dns"},
    {mota:"teoria", testua:"Behin DCa martxan, **bezeroek DNS gisa DCaren IP-a** izan behar dute, domeinua aurkitu eta bertan sartzeko. Hori da Zerbitzuak-eko DNS teoriaren (izenak → IP) aplikazio praktikoa Windows-en."},
    {mota:"errorea", testua:"**1. DNS gabe AD muntatzea** → bezeroek ez dute domeinua aurkitzen. **2. Domeinu-izena `.local`/okerra**. **3. DSRM pasahitza ahaztea**. **4. Bezeroaren DNS DCra ez apuntatzea**."}
  ],
  ariketak:[
    {maila:1, izenburua:"Kontzeptuak lotu", testua:"Azaldu zure hitzetan domeinua, zuhaitza eta basoa, eta non kokatzen den AD eta DNS.", arrakasta:"Hiru kontzeptuak ondo bereizten dituzu eta AD/DNS-ren rola azaltzen duzu."},
    {maila:2, izenburua:"AD + DNS ws08-n (3_AS)", testua:"Instalatu Active Directory eta DNS `ws08`-n eta sortu `zureabizena.com` domeinua basoaren erro gisa.", arrakasta:"Zerbitzaria DC bihurtzen da eta saioa `ZUREABIZENA\\administrador`-ekin hasten duzu."},
    {maila:3, izenburua:"AD + DNS ws19-n (4_AS)", testua:"Errepikatu `ws19`-n eta egiaztatu DNS-ak domeinua ebazten duela (`nslookup zureabizena.com`).", arrakasta:"`nslookup`-ek DCaren IP-a itzultzen du domeinurako."},
    {maila:4, izenburua:"Bezeroa domeinura", testua:"Apuntatu `w10sar`-en DNS-a DCra eta sartu Windows 10 bezeroa domeinura. Soluziorik gabe.", arrakasta:"Windows 10-ek domeinua onartzen du eta domeinuko kontuekin saioa has dezakezu."}
  ],
  galdetegia:[
    {galdera:"Zergatik instalatzen dira AD eta DNS batera?", aukerak:["Azkarrago doazelako","Domeinua DNS-izen bat delako eta bezeroek DNS bidez aurkitzen dutelako DCa","Biak web-zerbitzariak direlako"], zuzena:1, azalpena:"AD-k DNS behar du domeinua ebazteko eta DCa aurkitzeko."},
    {galdera:"Zer da basoa (forest)?", aukerak:["Domeinu bakarra","Zuhaitz baten edo gehiagoren multzoa","OU bat"], zuzena:1, azalpena:"Basoa AD-ren goi-mailako egitura da: zuhaitzen multzoa."},
    {galdera:"Domeinu-kontrolatzailea (DC) zer da?", aukerak:["DNS bezeroa","Active Directory daukan zerbitzaria","DHCP esparru bat"], zuzena:1, azalpena:"DCa AD gordetzen eta autentikazioa kudeatzen duen zerbitzaria da."}
  ]
},

/* ===================== SAR TEMA 4 ===================== */
{
  id:"sar-t4", zenbakia:4, izenburua:{eu:"DHCP Windows Server-en",es:"DHCP en Windows Server"}, puntuak:130,
  laburpena:{eu:"Instalatu DHCP rola Windows Server-en eta sortu esparru bat (ámbito) IP-ak banatzeko.",es:"Instala el rol DHCP en Windows Server y crea un ámbito para repartir IPs."},
  atalak:[
    {mota:"helburua", testua:"Instalatu eta konfiguratu `DHCP` zerbitzua `Windows Server 2008 R2`-n (5_AS), IP-ak automatikoki banatzeko."},
    {mota:"analogia", testua:"Aparkaleku baten barrera automatikoa. Auto bat iristen denean (bezeroa), barrerak plaza libre bat esleitzen dio (IP), txartel batekin (lease) eta apuntatu egiten du. Itzultzen bada, plaza bera ematen saiatzen da. DHCP hori da sareko IP-entzat."},
    {mota:"teoria", testua:"DHCP-ak IP, maskara, atebidea eta DNS banatzen ditu automatikoki, **DORA** trukearekin (Discover, Offer, Request, Acknowledge). Windows Server-en **esparru (ámbito)** baten bidez definitzen da banatuko den IP-tartea."},
    {mota:"simuladorea", id:"dhcp"},
    {mota:"izenburua", testua:"Instalazioa pausoz pauso"},
    {mota:"pausoak", izenburua:"ws08 makinan (5_AS)", items:[
      {izen:"Rola gehitu", testua:"`Administrador del servidor → Roles → Agregar roles → Servidor DHCP → Instalar`."},
      {izen:"Esparru berria (ámbito)", testua:"`Ámbito nuevo`: jarri izena (`zure_izena sarea`), `Dirección IP inicial: 192.168.4.X` eta `Dirección IP final: 192.168.4.Y` (irakasleak ematen ditu, ikasle bakoitzak berea)."},
      {izen:"Aukerak", testua:"Ezarri `Puerta de enlace: 192.168.4.1`, `DNS: DCaren IP` eta lease-iraupena. Aktibatu esparrua."}]},
    {mota:"oharra", testua:"Aulan, **deskonektatu sare-kablea** zure DHCP probatu aurretik, zentruko DHCP-arekin talkarik ez egiteko. Erabili irakasleak emandako IP-tartea (`5_AS_IP_TARTEAK`)."},
    {mota:"errorea", testua:"**1. IP-tarteak finkoak (zerbitzaria, atebidea) zapaltzea**. **2. Esparrua ez aktibatzea** sortu ondoren. **3. Bi DHCP LAN berean** (kablea deskonektatu). **4. DNS aukerarik ez ematea** bezeroei."}
  ],
  ariketak:[
    {maila:1, izenburua:"DORA simuladorean", testua:"Simuladorean, konektatu bezeroak esparrua agortu arte eta begiratu agortzean ateratzen den mezua.", arrakasta:"IP-ak banatu ondoren, hurrengo bezeroak ez du IP-rik jasotzen."},
    {maila:2, izenburua:"DHCP rola instalatu", testua:"Instalatu DHCP rola `ws08`-n.", arrakasta:"DHCP kontsola irekitzen da `Herramientas administrativas`-etik."},
    {maila:3, izenburua:"Esparrua sortu (5_AS)", testua:"Sortu esparru bat zure IP-tartearekin, atebidea eta DNS-arekin, eta aktibatu. Egiaztatu bezero batek IP-a automatikoki jasotzen duela.", arrakasta:"Bezeroan `ipconfig`-ek zure esparruko IP bat erakusten du."},
    {maila:4, izenburua:"Erreserbak", testua:"Sortu MAC-IP erreserba bat, ekipo zehatz batek beti IP bera jaso dezan. Soluziorik gabe."}
  ],
  galdetegia:[
    {galdera:"Zer da esparru (ámbito) bat DHCP-n?", aukerak:["IP finko bat","Banatuko den IP-tartea eta bere aukerak","DNS zona bat"], zuzena:1, azalpena:"Esparruak IP-tartea eta aukerak (atebidea, DNS…) definitzen ditu."},
    {galdera:"Zein da DHCP trukearen ordena?", aukerak:["Discover, Offer, Request, Acknowledge","Offer, Request, Discover, Ack","Request, Ack, Offer, Discover"], zuzena:0, azalpena:"DORA: Discover, Offer, Request, Acknowledge."},
    {galdera:"Zergatik deskonektatzen da kablea DHCP probatu aurretik?", aukerak:["Energia aurrezteko","Beste DHCP-ekin talkarik ez egiteko","Beharrezkoa delako instalatzeko"], zuzena:1, azalpena:"DHCP bat baino gehiago LAN berean gatazka sortzen dute."}
  ]
},

/* ===================== SAR TEMA 5 ===================== */
{
  id:"sar-t5", zenbakia:5, izenburua:{eu:"Urruneko saioak eta baliabideak",es:"Sesiones remotas y recursos"}, puntuak:150,
  laburpena:{eu:"SSH (OpenSSH), VNC (TightVNC), AnyDesk, karpetak partekatu Windows↔Linux, eta Squid proxy Windows Server-en.",es:"SSH (OpenSSH), VNC (TightVNC), AnyDesk, carpetas compartidas Windows↔Linux y proxy Squid."},
  atalak:[
    {mota:"helburua", testua:"Administratu Windows Server urrunetik eta partekatu baliabideak: SSH (6_AS), VNC/TightVNC (7_AS), AnyDesk (8_AS), karpeta partekatuak (9/10_AS) eta Squid proxy (11_AS)."},
    {mota:"izenburua", testua:"1. Urruneko saioak"},
    {mota:"taula", headers:["Tresna","Mota","Oharra"], rows:[
      ["OpenSSH","Terminala","Windows Server-en ezaugarri gisa gaitzen da"],["TightVNC","Mahaigaina","LANeko saio grafikoa"],["AnyDesk","Mahaigaina","NAT/Internet zeharkatzen du relay bidez"]]},
    {mota:"pausoak", izenburua:"1.1 · OpenSSH Windows Server-en (6_AS)", items:[
      {izen:"Ezaugarria gaitu", testua:"`Configuración → Aplicaciones → Características opcionales → Agregar → Servidor de OpenSSH`. (Edo PowerShell-etik.)"},
      {izen:"Zerbitzua abiarazi", testua:"PowerShell administratzaile gisa:", host:"ws19 — PowerShell", terminala:[{cmd:"Start-Service sshd"},{cmd:"Set-Service -Name sshd -StartupType Automatic"}]},
      {izen:"Bezerotik konektatu", testua:"Ubuntu edo Windows bezerotik:", host:"u20sar — bezeroa", terminala:[{cmd:"ssh administrador@192.168.4.X"}]}]},
    {mota:"teoria", izenburua:"1.2 · VNC eta AnyDesk", testua:"**TightVNC** instalatu zerbitzarian (zerbitzari-zatia) eta bezeroan ikustailea; konektatu zerbitzariaren IP-ra LANean. **AnyDesk** instalatu eta partekatu IDa: relay bidez NAT zeharkatzen du, porturik ireki gabe."},
    {mota:"izenburua", testua:"2. Baliabideak partekatu (9/10_AS)"},
    {mota:"pausoak", izenburua:"Karpeta partekatu Windows Server-en", items:[
      {izen:"Karpeta partekatu", testua:"`Eskuin-klik karpetan → Propiedades → Compartir → Uso compartido avanzado → Compartir esta carpeta` eta ezarri baimenak (`Permisos`)."},
      {izen:"Linux-etik sartu", testua:"Ubuntu-ko Fitxategiak: `Beste kokalekuak → smb://192.168.4.X/karpeta`."},
      {izen:"Windows-etik sartu", testua:"Esploratzailean: `\\\\192.168.4.X\\karpeta`."}]},
    {mota:"izenburua", testua:"3. Squid proxy Windows Server-en (11_AS)"},
    {mota:"teoria", testua:"Squid Windows Server-en instalatzen da (zerbitzu gisa) Interneterako irteera kontrolatzeko: cachea + sarbide-arauak (ACL). `3128` portuan entzuten du. Bezeroek (Windows eta Ubuntu) nabigatzailean proxy hori jartzen dute."},
    {mota:"simuladorea", id:"squid"},
    {mota:"errorea", testua:"**1. OpenSSH zerbitzua abiarazi gabe** (`Start-Service sshd`). **2. Karpetaren baimenak (compartir vs seguridad NTFS) nahastea**. **3. Squid-en ACL ordena okerra**. **4. Windows suebakiak portuak ixtea**."}
  ],
  ariketak:[
    {maila:1, izenburua:"SSH Windows Server-en (6_AS)", testua:"Gaitu OpenSSH zerbitzaria `ws19`-n eta konektatu Ubuntu bezerotik `ssh administrador@IP`-rekin.", arrakasta:"Bezerotik Windows Server-eko PowerShell-ean sartzen zara."},
    {maila:2, izenburua:"Saio grafikoa (7/8_AS)", testua:"Instalatu TightVNC `ws08`-n eta konektatu bezerotik; gero proba egin AnyDesk-ekin.", arrakasta:"Zerbitzariaren mahaigaina ikusten duzu bezerotik."},
    {maila:3, izenburua:"Karpeta partekatua (9/10_AS)", testua:"Partekatu karpeta bat `ws08`-n eta sartu bertan Windows zein Ubuntu bezerotik, idazteko baimenarekin.", arrakasta:"Bi bezeroetatik fitxategi bat sortzen duzu karpeta partekatuan."},
    {maila:4, izenburua:"Squid proxy (11_AS)", testua:"Konfiguratu Squid `ws08`-n LANari nabigatzen uzteko baina domeinu bat blokeatuz; jarri bezeroetan proxy gisa. Soluziorik gabe.", arrakasta:"Bezeroak nabigatzen du baina ezin sartu blokeatutako domeinuan."}
  ],
  galdetegia:[
    {galdera:"Windows Server-en SSH gaitzeko, zer egiten da?", aukerak:["apt install openssh-server","Servidor de OpenSSH ezaugarria gehitu eta sshd abiarazi","IIS instalatu"], zuzena:1, azalpena:"Windows-en OpenSSH ezaugarri gisa gehitzen da eta sshd zerbitzua abiarazten."},
    {galdera:"Karpeta bat Linux-etik atzitzeko, zein protokolo/URL?", aukerak:["ftp://","smb:// (SMB)","http://"], zuzena:1, azalpena:"Windows fitxategi-partekatzea SMB da; Linux-etik smb:// erabiltzen da."},
    {galdera:"Zein portutan entzuten du Squid-ek defektuz?", aukerak:["22","3128","443"], zuzena:1, azalpena:"Squid 3128 portuan."}
  ]
},

/* ===================== SAR TEMA 6 ===================== */
{
  id:"sar-t6", zenbakia:6, izenburua:{eu:"FTP Windows Server-en",es:"FTP en Windows Server"}, puntuak:120,
  laburpena:{eu:"Konfiguratu FTP zerbitzaria IIS bidez Windows Server 2008 R2 eta 2019-n.",es:"Configura el servidor FTP mediante IIS en Windows Server 2008 R2 y 2019."},
  atalak:[
    {mota:"helburua", testua:"Konfiguratu `FTP` zerbitzaria `Windows Server 2008 R2`-n (12_AS) eta `Windows Server 2019`-n (13_AS), IIS bidez."},
    {mota:"oharra", izenburua:"Ikuspegi sakona · zergatik bi modu", testua:"Modu aktibo eta pasiboa ez dira kapritxo bat: FTP-ren historiaren ondorioa dira. Hasieran **aktiboa** zen (zerbitzariak bezerorantz irekitzen du datu-konexioa). Suebakiak eta NAT zabaltzean, hori hautsi egin zen: kanpotik bezerora konektatzea blokeatzen baita. **Pasiboa** sortu zen konponbide gisa: bezeroak beti irteten du (irteerako konexioak ia beti baimentzen dira). Horregatik da pasiboa gaur egungo lehenetsia web eta NAT- inguruetan."},
    {mota:"analogia", testua:"Leihatila eta zama-kaia duen biltegia. Leihatilatik (21 portua) eskaerak; zama-kaitik (datu-konexioa) fitxategiak. Kontrola eta datuak ate desberdinetatik: horregatik daude modu aktiboa eta pasiboa."},
    {mota:"teoria", testua:"Windows Server-en FTP **IIS** web-zerbitzariaren barruan dago. 21 portua kontrola da; datu-konexioak modu **aktiboan** (zerbitzariak irekitzen du) edo **pasiboan** (bezeroak) joan daitezke. NAT atzean, pasiboa."},
    {mota:"simuladorea", id:"ftpmode"},
    {mota:"pausoak", izenburua:"FTP gunea sortu", items:[
      {izen:"Rola/zerbitzua gehitu", testua:"`Agregar roles → Servidor web (IIS) → Servicio FTP`. WS2019-n `Servidor FTP` ezaugarria IIS-rekin."},
      {izen:"FTP gunea", testua:"`Administrador de IIS → Agregar sitio FTP`: izena, fisikoki zerbitzatuko den karpeta, lotura (`192.168.4.X:21`) eta SSL aukera."},
      {izen:"Autentikazioa eta baimenak", testua:"Aukeratu `Básica` autentikazioa, esleitu erabiltzaileak eta eman irakurketa/idazketa baimenak."}]},
    {mota:"teoria", testua:"Bezerotik probatu: Ubuntu-tik `ftp 192.168.4.X` (komandoak `ls`, `get`, `put`, `bye`) edo FileZilla bezeroarekin."},
    {mota:"errorea", testua:"**1. IIS gabe FTP bilatzea** (Windows-en IIS-en parte da). **2. Modu aktiboa NAT atzean** → pasiboa erabili. **3. Baimen-falta** (idazketa). **4. Suebakiak 21 portua ixtea**."}
  ],
  ariketak:[
    {maila:1, izenburua:"Moduak alderatu", testua:"Simuladorean, identifikatu nork irekitzen duen datu-konexioa modu aktiboan eta pasiboan.", arrakasta:"Aktiboan zerbitzariak (PORT); pasiboan bezeroak (PASV)."},
    {maila:2, izenburua:"FTP gunea WS2008-n (12_AS)", testua:"Konfiguratu FTP gune bat `ws08`-n IIS bidez, erabiltzaile batekin eta karpeta batekin.", arrakasta:"Bezerotik autentikatu eta zerrendatzen duzu gunearen edukia."},
    {maila:3, izenburua:"FTP gunea WS2019-n (13_AS)", testua:"Errepikatu `ws19`-n idazketa-baimenarekin eta igo/jaitsi fitxategiak bezerotik.", arrakasta:"`put` eta `get` ondo funtzionatzen dute Windows zein Ubuntu bezerotik."},
    {maila:4, izenburua:"FTPS", testua:"Aktibatu FTP gainean SSL (FTPS) ziurtagiri batekin. Soluziorik gabe."}
  ],
  galdetegia:[
    {galdera:"Windows Server-en, non dago FTP zerbitzaria?", aukerak:["Active Directory-n","IIS web-zerbitzariaren barruan","DHCP-n"], zuzena:1, azalpena:"Windows-en FTP IIS-en zerbitzu gisa konfiguratzen da."},
    {galdera:"Zein portu da FTP-ren kontrola?", aukerak:["21","80","443"], zuzena:0, azalpena:"21 kontrola; 20 datuak modu aktiboan."},
    {galdera:"Bezeroa NAT atzean dagoenean, zein modu erabili?", aukerak:["Aktiboa","Pasiboa","Berdin dio"], zuzena:1, azalpena:"Pasiboan bezeroak irekitzen du datu-konexioa, NAT zeharkatuz."}
  ]
},

/* ===================== SAR TEMA 7 ===================== */
{
  id:"sar-t7", zenbakia:7, izenburua:{eu:"Web, domeinuko erabiltzaileak eta kopiak",es:"Web, usuarios de dominio y copias"}, puntuak:180,
  laburpena:{eu:"IIS web-zerbitzaria, Moodle eta WordPress, domeinuko erabiltzaileak (ordutegiekin) eta segurtasun-kopiak.",es:"Servidor web IIS, Moodle y WordPress, usuarios de dominio (con horarios) y copias de seguridad."},
  atalak:[
    {mota:"helburua", testua:"Kudeatu IIS web-zerbitzaria (14_AS), instalatu Moodle (15_AS) eta WordPress (16_AS), administratu domeinuko erabiltzaileak ordutegiekin (17_AS) eta egin segurtasun-kopiak (18_AS)."},
    {mota:"oharra", izenburua:"Ikuspegi sakona · web-pila", testua:"Pausoek IIS instalatzen erakusten dute, baina zergatik ez da nahikoa web-zerbitzaria bakarrik WordPress edo Moodle-rentzat? Web orri **estatiko** batek (HTML) zerbitzaria baino ez du behar. Aplikazio **dinamiko** batek hiru pieza behar ditu: web-zerbitzaria (IIS/Apache, eskaerak jaso), **interpretea** (PHP, kodea exekutatu) eta **datu-basea** (MySQL, edukiak gorde). Hori da \"pila\" bat (LAMP/WAMP). Falta bada bat, aplikazioak huts egiten du: horregatik instalatzen dira batera."},
    {mota:"izenburua", testua:"1. IIS web-zerbitzaria (14_AS)"},
    {mota:"teoria", testua:"**IIS** (Internet Information Services) Windows-en web-zerbitzaria da (Apache-ren parekoa). HTTP 80 portuan zerbitzatzen ditu webguneak. Rol gisa gehitzen da eta guneak `Administrador de IIS`-etik kudeatzen dira."},
    {mota:"simuladorea", id:"http"},
    {mota:"pausoak", izenburua:"IIS instalatu eta gune bat sortu", items:[
      {izen:"Rola gehitu", testua:"`Agregar roles → Servidor web (IIS) → Instalar`."},
      {izen:"Gunea sortu", testua:"`Administrador de IIS → Sitios → Agregar sitio web`: izena, karpeta fisikoa eta lotura (`192.168.4.X:80`)."},
      {izen:"Probatu", testua:"Bezeroaren nabigatzailean `http://192.168.4.X`: IIS-en orria edo zure `index.html` agertu behar da."}]},
    {mota:"pausoak", izenburua:{eu:"Proba-orria sortu (froga.htm)",es:"Crear una página de prueba (froga.htm)"}, items:[
      {izen:{eu:"Fitxategia sortu",es:"Crear el fichero"}, testua:{eu:"Ohar-blokean idatzi testu bat eta gorde `froga.htm` gisa IIS-en erro-karpetan: `C:\\inetpub\\wwwroot\\`.",es:"En el Bloc de notas escribe un texto y guárdalo como `froga.htm` en la carpeta raíz de IIS: `C:\\inetpub\\wwwroot\\`."}},
      {izen:{eu:"Sartu nabigatzailetik",es:"Acceder desde el navegador"}, testua:{eu:"`http://localhost/froga.htm` edo `http://127.0.0.1/froga.htm` edo zure IP-tik. Zure testua agertu behar da.",es:"`http://localhost/froga.htm` o `http://127.0.0.1/froga.htm` o por tu IP. Debe aparecer tu texto."}}]},
    {mota:"izenburua", testua:{eu:"2. WordPress (16_AS)",es:"2. WordPress (16_AS)"}},
    {mota:"teoria", testua:{eu:"**WordPress**-ek PHP eta MySQL behar ditu. Windows Server-en bide errazena **XAMPP** instalatzea da (Apache + MySQL + PHP batera), eta gainean WordPress jartzea.",es:"**WordPress** necesita PHP y MySQL. En Windows Server la vía más fácil es instalar **XAMPP** (Apache + MySQL + PHP juntos) y poner WordPress encima."}},
    {mota:"pausoak", izenburua:{eu:"WordPress XAMPP-ekin",es:"WordPress con XAMPP"}, items:[
      {izen:{eu:"XAMPP jaitsi eta instalatu",es:"Descargar e instalar XAMPP"}, testua:{eu:"`ws08`-n: jaitsi XAMPP (`xampp download`) eta instalatu, `Apache` eta `MySQL` aukeratuta.",es:"En `ws08`: descarga XAMPP (`xampp download`) e instálalo, marcando `Apache` y `MySQL`."}},
      {izen:{eu:"Zerbitzuak abiarazi",es:"Arrancar los servicios"}, testua:{eu:"XAMPP kontrol-panelean: `Apache` → Start eta `MySQL` → Start.",es:"En el panel de control de XAMPP: `Apache` → Start y `MySQL` → Start."}},
      {izen:{eu:"WordPress jaitsi eta zabaldu",es:"Descargar y desplegar WordPress"}, testua:{eu:"Jaitsi WordPress azken bertsioa (`wordpress download`), deskonprimitu `C:\\xampp\\htdocs\\wordpress`-en. Sortu datu-base bat `http://localhost/phpmyadmin`-en eta ireki `http://localhost/wordpress` instalazioa amaitzeko.",es:"Descarga la última versión de WordPress (`wordpress download`), descomprime en `C:\\xampp\\htdocs\\wordpress`. Crea una base de datos en `http://localhost/phpmyadmin` y abre `http://localhost/wordpress` para terminar la instalación."}}]},
    {mota:"izenburua", testua:{eu:"3. Moodle (15_AS)",es:"3. Moodle (15_AS)"}},
    {mota:"pausoak", izenburua:{eu:"Moodle Bitnami-rekin",es:"Moodle con Bitnami"}, items:[
      {izen:{eu:"Bitnami LMS jaitsi",es:"Descargar Bitnami LMS"}, testua:{eu:"`ws08`-n: jaitsi Moodle daukan **Bitnami LMS** paketea (Apache + MariaDB + PHP + Moodle). `phpMyAdmin` ez da behar.",es:"En `ws08`: descarga el paquete **Bitnami LMS** con Moodle (Apache + MariaDB + PHP + Moodle). No hace falta `phpMyAdmin`."}},
      {izen:{eu:"Instalatu",es:"Instalar"}, testua:{eu:"Exekutatu instalatzailea. IIS-ekin gatazka ekiditeko, erabili `80` portua libre badago edo esleitu beste bat. Pasahitza, adib., `123456`.",es:"Ejecuta el instalador. Para evitar conflicto con IIS, usa el puerto `80` si está libre o asigna otro. Contraseña, p. ej., `123456`."}},
      {izen:{eu:"Euskaraz jarri",es:"Configurar idioma"}, testua:{eu:"Ireki Moodle nabigatzailean, hasi saioa administratzaile gisa eta hizkuntza-ezarpenetan jarri euskaraz.",es:"Abre Moodle en el navegador, inicia sesión como administrador y configura el idioma en los ajustes."}}]},
    {mota:"izenburua", testua:"4. Domeinuko erabiltzaileak eta ordutegiak (17_AS)"},
    {mota:"pausoak", izenburua:"Erabiltzaileak AD-n", items:[
      {izen:"Erabiltzailea sortu", testua:"`Herramientas administrativas → Usuarios y equipos de Active Directory → zuredomeinua.com → Users → Nuevo → Usuario`. Saio-izena: izen-inizial + abizena. Markatu `El usuario no puede cambiar la contraseña`."},
      {izen:"Ordutegiak", testua:"Erabiltzailearen `Propiedades → Cuenta → Horas de inicio de sesión`: mugatu noiz has dezakeen saioa (adib. eskola-orduetan soilik)."},
      {izen:"Taldeak eta OUak", testua:"Antolatu erabiltzaileak OU-etan eta esleitu taldeei baimenak errazago kudeatzeko."}]},
    {mota:"izenburua", testua:"4. Segurtasun-kopiak (18_AS)"},
    {mota:"teoria", testua:"**Windows Server Backup** ezaugarriak segurtasun-kopiak egiten ditu. Gehitu ezaugarria, programatu kopia (osoa edo gehigarria) eta hautatu helmuga (beste disko bat). Berreskuratzea kopiatik egiten da."},
    {mota:"pausoak", izenburua:"Kopia bat egin", items:[
      {izen:"Ezaugarria gehitu", testua:"`Agregar características → Copias de seguridad de Windows Server`."},
      {izen:"Kopia programatu", testua:"`Copia de seguridad única` edo `Programar`: hautatu bolumenak, helmuga eta maiztasuna."}]},
    {mota:"errorea", testua:"**1. IIS-ek PHP gabe** WordPress/Moodle ezin (PHP+DB behar dira). **2. Ordutegiak ezarri baina aplikatu ez** (politika). **3. Kopia disko berean** gordetzea (helmuga bereizia behar da). **4. Baimenak NTFS vs partekatze nahastea**."}
  ],
  ariketak:[
    {maila:1, izenburua:"Egoera-kodeak", testua:"Simuladorean, eskatu `/index.html`, ondoren existitzen ez den bide bat eta `/admin`. Apuntatu kodeak.", arrakasta:"200, 404 eta 403 jasotzen dituzu."},
    {maila:2, izenburua:"IIS gune bat (14_AS)", testua:"Instalatu IIS `ws08`-n eta sortu gune bat zure `index.html`-arekin, bezerotik ikusgai.", arrakasta:"`http://192.168.4.X`-k zure orria erakusten du bezerotik."},
    {maila:3, izenburua:"Domeinuko erabiltzaileak (17_AS)", testua:"Sortu bi erabiltzaile AD-n, mugatu haien saio-ordutegiak eta antolatu OU batean.", arrakasta:"Erabiltzaileak domeinuan agertzen dira eta ordutegiz kanpo ezin dute saioa hasi."},
    {maila:4, izenburua:"WordPress/Moodle + kopiak (15/16/18_AS)", testua:"Instalatu WordPress edo Moodle `ws08`-n eta egin segurtasun-kopia bat Windows Server Backup-ekin. Soluziorik gabe.", arrakasta:"Aplikazioa martxan dago eta kopia helmugan gordeta geratzen da."}
  ],
  galdetegia:[
    {galdera:"Zein da Windows-en web-zerbitzaria?", aukerak:["Apache","IIS","Squid"], zuzena:1, azalpena:"IIS (Internet Information Services) Windows-en web-zerbitzaria da."},
    {galdera:"Non mugatzen dira erabiltzaile baten saio-orduak?", aukerak:["DHCP esparruan","Usuarios y equipos de AD → Propiedades → Cuenta → Horas de inicio de sesión","IIS-en"], zuzena:1, azalpena:"AD-ko erabiltzailearen propietateetan ezartzen dira saio-orduak."},
    {galdera:"WordPress/Moodle-k zer behar dute web-zerbitzariaz gain?", aukerak:["DHCP eta DNS","PHP eta datu-base bat","FTP soilik"], zuzena:1, azalpena:"Aplikazio dinamikoak dira: PHP eta datu-basea behar dituzte."},
    {galdera:"Zerekin egiten dira segurtasun-kopiak Windows Server-en?", aukerak:["Windows Server Backup","Active Directory","Squid"], zuzena:0, azalpena:"Windows Server Backup ezaugarriak kopiak egiten ditu."}
  ]
}

      ]
    }
  ]
};
window.CURSO = CURSO;
