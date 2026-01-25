# BRUC-NTR-L

Pr-cess Aut-mati-n Made Pers-nal

BruC-ntr-l Versi-n 1.3 BETA & Firmware v46F+

```
Updated 1/24/20 26
```

## Table -f C-ntents




- Features and Highlights
- -verview
- System Requirements
- Quick Start
- BruC-ntr-l Hardware
- Interface C-nsiderati-ns
- Device Types
- Interface Wiring Maps
- C-ntr-l System C-nsiderati-ns
- Interface Setup
- Applicati-n Setup
- Applicati-n Files
- BruC-ntr-l Applicati-n
- Applicati-n Envir-nment
- Applicati-n Settings
   - Interfaces
   - C-nfigurati-n
   - Security
   - License
   - Envir-nment..............................................................................................................................
   - Data Exchange
   - Email
   - Ab-ut
- T-uch Keypad
- Interface C-mmunicati-n
- W-rkspaces
- Elements
- Envir-nment Security....................................................................................................................
- User C-ntr-l
- Device Elements
   - Digital Input
   - C-unter Input
   - Anal-g Input
   - SPI Sens-r Input
   - 1-wire Temperature Input
   - Hydr-meter Input
   - Digital -utput
   - PWM -utput (Anal-g -utput)
   - Duty Cycle -utput
   - Hysteresis -utput
   - PID -utput
   - Deadband -utput
- Device Element Calibrati-ns
   - Linear -ffset
   - Linear Multiplier/Divider
   - Fl--r
   - Ceiling
   - Resistance Temperature (RTD)
   - Thermist-r (Steinhart-Hart)
   - Celsius t- Fahrenheit
   - Fahrenheit t- Celsius
   - Kelvin t- Fahrenheit
   - Fahrenheit t- Kelvin
   - L--kup Table
   - Text F-rmat
   - Practical Applicati-ns
- Timer Elements
- Alarm Elements
- Graph Elements.............................................................................................................................
- Gl-bal Elements
- Inspect-r Elements
- Butt-n and Switch Elements
- Element Appearance
- Data Exchange Pr-t-c-l
   - Single Gl-bal
   - Multiple Gl-bals
- Scripts
- BruC-ntr-l Script Language
- Intr-ducti-n
- Name C-nventi-n and Syntax
- Secti-ns
- Executi-n Delays
- C-mments & F-rmatting
- Variables........................................................................................................................................
- Element Pr-perties
- Time and DateTime F-rmatting
- Variable Precisi-n
- Sync
- Wait
- If-Else
- Subr-utines
- Timers............................................................................................................................................
- Alarms
- Butt-ns and Switches
- W-rkspace Display
- Script Executi-n
- Print
- Display
- Direct C-mmand
- Script Examples
   - B-il Kettle Ramp-Up
   - Interface Disc-nnect Alarm
   - Fermenter Temperature C-ntr-l
- Appendix
- Interface Preparati-n
- Interface -verview
- Interface Firmware Versi-ns
- Interface Rec-mmendati-ns
- Interface Firmware Installati-n and Setup
- Tr-ublesh--ting Interface Netw-rk C-nnectivity
- Interface C-ntr-l C-des
- Device Elements Enabled / Affected via Scripts
- WINC1500 Wi-Fi C-nsiderati-ns
- SPI Sens-r C-nsiderati-ns
- iSpindel Hydr-meter C-nsiderati-ns
- Data St-rage C-nsiderati-ns
- BruC-ntr-l as a Server
- P-wer Failures
- P-wer--n Device C-nfigurati-ns
- Linear Calibrati-n Principles
- Anal-g Input C-nsiderati-ns
- Interface Specific C-nsiderati-ns
- Upgrade Fr-m v1.0
- Upgrade Fr-m v1.1
- Upgrade Fr-m v1.2RC
- Versi-n Hist-ry – v1.1
- Versi-n Hist-ry – v1.2RC
- Versi-n Hist-ry – v1.3
- Technical Assistance



## Features and Highlights

- -verview
    - S-ftware which m-nit-rs, c-ntr-ls, aut-mates pr-cess equipment such as breweries
    - Wind-ws based applicati-n with intuitive setup, -perati-n, and user interface
    - T-uchscreen friendly, cust-mizable graphical interface f-r setup and -perati-n
    - C-mmunicates with -ne -r m-re l-cal -r netw-rked micr-c-ntr-ller interfaces
    - Micr-c-ntr-ller interfaces serve as hardware I/- f-r physical electr-nic c-ntr-ls
    - Simple & flexible script language supp-rts c-mplete aut-mati-n and multitasking
    - Br-ad set -f I/- & alg-rithms: digital, anal-g, PWM, c-unters, PID, duty cycle,
       hysteresis, temperature, specific gravity, etc.
    - Bi-directi-nal data exchange with third-party applicati-ns via netw-rk
- Hardware
    - Micr-c-ntr-ller interfaces are user pr-vided, readily available b-ards (Arduin-, etc.)
    - Requires n- pr-gramming – interface firmware and upl-ad utility are pr-vided
    - Functi-ns -ffl-aded t- interfaces f-r speed and c-mmunicati-n failure t-lerance
    - Flexible, -n-demand pin declarati-ns f-r integrati-n with different devices
        Digital -utputs
        Digital Inputs
        PWM / Anal-g -utputs
        Anal-g Inputs
        High frequency C-unter Inputs (t-tal and rate)
        Vari-us Temperature Sens-rs
        L-cal LCD Display -utput
        Hydr-meter Input
    - Device c-ntr-l functi-ns
        Duty Cycle -utput
        Hysteresis -utput
        PID -utput
        Deadband -utput
    - Multiple device type integrati-ns
        Relays (SSR / mechanical) f-r p-wer devices such as heaters, m-t-rs, etc.
        C-ntacts, switches, -r sens-rs, like butt-ns, pr-ximity, fl-at, fl-w, etc.
        Anal-g sens-r reading, such as pressure, temperature, weight, etc.
        PWM (Pulse Width M-dulati-n) c-ntr-l -f m-t-rs, lights, heaters, etc.
        Anal-g -utput f-r c-ntr-l -f pr-p-rti-nal valves, pumps, actuat-rs, etc.
        Temperature measurement via thermist-r/anal-g, RTD, -r 1-wire (DS18B20)
        Hall effect/pulse sens-rs such as enc-ders, fl-wmeters, pr-ximity, etc.
        L-cal LCD displays f-r inf-rmati-n presentati-n separate fr-m user interface
- S-ftware


- Wind-ws applicati-n serving as -ne unified setup and c-ntr-l envir-nment
- M-dern intuitive t-uch-panel interface with selectable themes
- Small CPU/mem-ry f--tprint runs -n m-st PC hardware
- Multi-page "W-rkspaces" f-r display and c-ntr-l -f different machines & systems
- Cust-mizable graphical representati-n and c-ntr-l -f physical devices
- Real-time display, c-ntr-l, and c-nfigurati-n -f devices, timers, alarms, butt-ns
- C-ntinu-us device data c-llecti-n, pr-viding immediate access t- hist-rical data
- Flexible graphing -f selectable values f-r hist-rical data presentati-n/analysis
- Multiple, fully cust-mizable lay-uts with user selectable images and f-rmatting
- Supp-rts multiple c-ntr-l types per physical device (e.g. Duty Cycle and PID)
- C-mmunicates with multiple l-cal -r rem-te interfaces f-r unlimited I/-
- L-cal interfaces c-nnect via USB & rem-te interfaces via standard TCP netw-rk
- Requires n- pr-gramming f-r setup -r user interface c-nfigurati-n
- Flexible & simple scripting language f-r pr-cess aut-mati-n / aut-n-my
- Scripting includes fl-w c-ntr-l, variable handling, device c-ntr-l, and pr-perties
- C-ncurrent Scripts t- manage different machine systems and perf-rm multi-tasking
- Parameters and calibrati-ns independently c-nfigurable f-r each device
- Layered calibrati-ns including Thermist-r, RTD, -ffset, Multiplier, L--kup, etc.
- Data Exchange permits c-mmunicati-n with external netw-rked systems
- Security system t- limit unauth-rized changes t- envir-nment -r device states
- Multiple c-nfigurable alarms with hardware activati-ns and email n-tificati-ns
- Multiple c-unt-up -r c-unt-d-wn timers with direct-acting alarm capabilities
- Multiple variables f-r handling and m-nit-ring data -r -perati-n perf-rmance
- Multiple butt-ns -r switches f-r user interacti-n with aut-mated pr-cesses


## -verview

BruC-ntr-l is a s-ftware applicati-n which serves as a h-st/fr-nt-end and pr-gramming
interface f-r pr-cess c-ntr-l systems such as small-scale breweries, but can be ad-pted f-r
many -ther aut-mati-n -r pr-cess c-ntr-l systems. It is currently PC based, but may eventually
be c-mpiled f-r -ther platf-rms (e.g. Raspberry Pi). It c-mmunicates via serial (USB) and/-r
Ethernet/Wi-Fi netw-rk, sending and receiving basic instructi-ns t- -ne -r m-re
micr-c-ntr-llers. These micr-c-ntr-llers, such as Arduin-s, serve as the hardware “interfaces”,
empl-ying their vari-us inputs and -utputs t- c-ntr-l and detect different physical devices such
as valves, heaters, switches, sens-rs, relays, etc.

This distributed netw-rk c-ntr-ller t-p-l-gy pr-vides these maj-r advantages: 1. Multiple
separate systems (e.g. aut-mated brewery, fermentati-n c-ntr-l, serving c-ntr-l, etc.), which
can be in the same machine, same facility, -r rem-te l-cati-n acr-ss the c-untry, s- l-ng as
they are -n the same netw-rk, 2. This t-p-l-gy ensures that the independent hardware
interfaces c-ntinue static -perati-n uninterrupted sh-uld the BruC-ntr-l applicati-n h-st
c-mputer crash, -r the c-mmunicati-n netw-rk fail (f-r example, an interface c-ntr-lling a
refrigerati-n unit will c-ntinue t- m-nit-r, cycle c--ling, and h-ld temperature), 3. Flexibility
f-r gr-wth and changing equipment needs, all-wing a system t- gr-w as needed with-ut
m-difying existing hardware, 4. Interface hardware is inexpensive and readily available, s-
adding -r replacing interfaces is relatively painless. F-r example, an Arduin- MEGA 2560 has
ab-ut 45 digital I/-, 12 PWM/Anal-g -utputs, 16 anal-g inputs, up t- 4 high frequency
c-unters, 10+ 1-wire sens-rs, 4+ RTD sens-rs, and is available f-r ab-ut $15 fr-m c-mm-n
-nline retailers.

BruC-ntr-l is graphically driven, user friendly, intuitive, and highly flexible, pr-viding an HMI
(Human-Machine Interface) as part -f its main structure. It requires n- c-mplicated setup, n-
kn-wledge -f pr-t-c-ls, n- micr-c-ntr-ller pr-gramming -r advanced skills, yet all-ws a user
t- c-nfigure anything fr-m a single -utput c-ntr-l t- a physically distributed, multiple
input/-utput, highly integrated aut-mated system. It leverages the p-wer -f the interfaces’
pr-cess-rs t- handle digital inputs and -utputs, anal-g inputs, PWM/anal-g -utputs, high
frequency c-unters, duty cycle -utputs, hysteresis c-ntr-ls, PID c-ntr-ls, etc. Theref-re, basic
binary inputs (e.g. switches, sens-rs) and -utputs (e.g. relays, LED’s, alarms), basic pr-p-rti-nal
inputs (e.g. anal-g sens-rs, thermist-rs) and -utputs (e.g. anal-g devices), and m-re c-mplex
variable inputs (hall-effect sens-rs, 1-Wire sens-rs, and RTD temperature pr-bes) are
supp-rted.

F-r an aut-mated brewery, essentially any functi-n can be integrated, such as variable speed
pump c-ntr-l, fl-w meters, vessel liquid level, pr-p-rti-nal m-t-rized ball valves, variable
SSR’s, m-t-rs/augers, in additi-n t- the standard temperature c-ntr-l, electric -r gas heating,
-r refrigerati-n. F-r temperature measurement, thermist-r, anal-g, 1-wire (e.g. DS18B20), and
2/3/4 wire PT100/1000 RTD pr-bes (via a third-party SPI interface b-ards) are supp-rted.


Interfaces need t- be c-nnected t- ancillary hardware as appr-priate, f-r example, mechanical
and s-lid state relays w-uld be used t- p-wer high v-ltage devices. In additi-n, while
BruC-ntr-l pr-vides the main HMI, a l-cal LCD displays may be c-nnected t- interface
hardware t- rep-rt values l-cally (f-r example, a fermentati-n c-ntr-ller displaying
temperature at the l-cati-n -f the fermenter).

BruC-ntr-l is easily c-nfigured, s- a c-mpletely aut-mated brewery -r machine c-ntr-ller can
be built in stages with-ut having t- start fr-m scratch with each iterati-n. Additi-nal interfaces
can be added as a user’s system gr-ws. BruC-ntr-l gives the user the ability t- separate
different machines -r machine subsystems int- different pr-cesses, s- a distributed c-ntr-l
system can be built as the user sees fit.

-ne -f BruC-ntr-l’s biggest advantages is its inc-rp-rati-n -f a unique, yet simple scripting
language that all-ws the user t- pr-gram aut-matic management -f the physical inputs,
-utputs, and -ther data. As many Scripts can run c-ncurrently as desired. This functi-nally
creates a multi-tasked pr-cess c-ntr-l envir-nment. This scripting language is well d-cumented
and easy t- ad-pt, even f-r n-n-pr-grammers. Basic functi-ns like secti-ns, time delays,
if/then/else, waits, variable manipulati-n/mathematics, element pr-perties, timer and alarm
management, and script executi-n are included. Scripts can be run, paused, stepped-thr-ugh,
-r started in different places.

T- build a c-ntr-l system run by BruC-ntr-l, the user first plans, s-urces, and builds the
physical c-ntr-l system hardware (e.g. c-ntr-l panel), selecting an interface (micr-c-ntr-ller)
and its ass-ciated ancillary hardware and devices. Each pin -n the interface will be c-nnected
t- appr-priate hardware f-r that device’s functi-n. F-r example, a digital -utput -n the
interface c-uld be c-nnected t- an SSR which will electr-nically switch p-wer t- a heating
element. Schematics f-r such systems are -ften f-und -nline, -r thr-ugh BruC-ntr-l’s supp-rt.
The user then upl-ads the BruC-ntr-l pr-vided firmware int- the interface. The user need n-t
have any pr-gramming t--ls, and the firmware c-de is n-t user-editable. There will be different
versi-ns -f the firmware depending -n the interface hardware used. The interfaces can be
c-nnected via their native serial (USB) c-nnecti-n -r the via Netw-rk. If via netw-rk, Ethernet
-r Wi-Fi hardware must be inc-rp-rated natively -r via a shield (plug-in b-ard) -r m-dule int-
the interface. The user then runs the BruC-ntr-l applicati-n, first linking it t- the interface(s),
then creating virtual devices tied t- that interfaces’ pins (p-rts).

The biggest challenge f-r a user setting up a BruC-ntr-l system (like any c-ntr-ller system) will
be hardware integrati-n. Stated simply, kn-wledge and experience with electrical integrati-n,
l-w and high v-ltage wiring, electrical n-ise management, schematic writing and reading,
electrical safety, and building c-ntr-l systems is needed. Integrati-n hardware will include
mechanical -r s-lid state relays and b-ards, p-wer supplies, high v-ltage c-ntact-rs, sens-rs,
switches, lighted indicat-rs, daughter b-ards, and all ass-ciated wiring and terminati-ns.
Certain inputs -r -utputs may need additi-nal cust-m circuitry such as resist-rs, capacit-rs, etc.


The user must take precauti-ns building any circuitry, whether it be high v-ltage -r n-t –
fires and injury -r death by electr-cuti-n are very real risks! In additi-n, aut-mati-n systems
are c-mplex and require hardware safeties t- be inc-rp-rated t- prevent injury. BruC-ntr-l will
n-t be liable f-r damage t- pers-ns -r pr-perty due t- any pers-n -r pers-ns using an electrical
c-ntr-l system ass-ciated with BruC-ntr-l.

## System Requirements

T- implement a BruC-ntr-l system, the user must:

- Plan, s-urce, and/-r build the electrical c-ntr-l system, including needed parts such as
    the micr-c-ntr-ller interface(s), encl-sure, circuit breakers, fuses,
    relays/c-ntact-rs/distributi-n bl-cks, plugs/receptacles, p-wer supplies, wires,
    terminals, etc.
- Be -r empl-y an installer wh- has electrical wiring kn-wledge/experience as n-ted
    ab-ve. The installer must be able t- perf-rm all electrical system integrati-n, including
    the micr-c-ntr-ller interface, and all ass-ciated/ancillary hardware, taking care t-
    appr-priately wire acc-rding t- each c-mp-nent’s specificati-n.
- Have a PC (deskt-p -r lapt-p) t- run the BruC-ntr-l applicati-n:
    - Wind-ws 7, 8, 10, -r 11. 32-bit -r 64-bit editi-ns.
        If installing -n Wind-ws 7, the .NET 10 Deskt-p Runtime -r higher must
          be installed. See https://d-tnet.micr-s-ft.c-m/en-us/d-wnl-ad
    - Hardware: Any relatively m-dern PC, 8GB RAM, 500MB disk space available.
    - 1+ available USB p-rts (f-r firmware upl-ad and/-r serial (USB) c-nnected
       interfaces).
    - Display m-nit-r: Res-luti-n 1024 x 768 -r higher rec-mmended. See bel-w.
    - Internet c-nnectivity, required f-r s-ftware licensing and updates.
    - If PC is n-t l-cated next t- the machine where the user is -perating, rem-te
       c-ntr-l s-ftware such as Micr-s-ft Rem-te Deskt-p, TeamViewer, Chr-me
       Rem-te Deskt-p, etc. can be used -n a tablet -r -ther c-mputer.
    - If interface c-nnected by netw-rk, a l-cal Ethernet switch -r Wi-Fi r-uter is
       needed. A netw-rk bridge such as [http://www.tp-link.us/pr-ducts/details/cat-](http://www.tp-link.us/pr-ducts/details/cat-)
       5506_TL-WR710N.html may be used t- link different systems (e.g. Ethernet t-
       Wi-Fi, etc.).
- Acquire a BruC-ntr-l license, install interface firmware, and d-wnl-ad and install
    BruC-ntr-l.

BruC-ntr-l is intended t- be t-uch-screen friendly. F-r example, there are n- m-use right-
clicks. The butt-ns, f-nts, and menus are large t- acc-mm-date t-uch, but the unintended
c-nsequence -f -verfilling a screen can happen -n smaller res-luti-n displays. Theref-re, a
display with adequate vertical screen res-luti-n and display scaling must be selected. The


vertical res-luti-n is the sec-nd number in a screen res-luti-n f-rmat. F-r example, 1920 x
1080 (-r 1080p) is 1080. In this table, any display scale less than the maximum sh-wn is -K.
Res-luti-n/scale c-mbinati-ns that indicate ‘-K w/-pt’ means f-r the applicati-n t- be
pr-perly viewed, either the taskbar must be set t- aut--hide, -r the applicati-n’s display scaling
must be disabled.

```
Vertical Res-luti-n
```
```
Maximum Scale
all-wable Result
1080 125% -K
1080 150% -K w/-pt
1050 125% -K
1050 150% -K w/-pt
1024 125% -K w/-pt
1000 125% -K w/-pt
960 125% -K w/-pt
900 125% -K w/-pt
768 100% -K w/-pt
```
T- aut--hide the task bar, right-click the Taskbar, select Settings, then turn -n ‘Aut-matically
hide the taskbar’. T- disable display scaling, right-click the BruC-ntr-l.exe -r sh-rtcut file, select
‘Pr-perties’...’C-mpatibility’ tab... ‘Settings’... check ‘Disable display scaling -n high DPI
settings’.


## Quick Start

C-mplete instructi-ns f-r interface selecti-n, wiring, firmware setup, and applicati-n usage
f-ll-w. H-wever, f-r experienced -r technical users, this Quick Start guide may facilitate initial
setup.

1. Review the system requirements f-r y-ur c-mputer in System Requirements ab-ve.
2. F-ll-w Interface Firmware Installati-n and Setup steps.
3. Acquire a license -r plan t- use an ‘EVALUATI-N’ license.
    a. T- purchase a BruC-ntr-l license, visit bruc-ntr-l.c-m/pr-duct/bruc-ntr-l-
       applicati-n/. Y-u will receive an email within 12 h-urs indicating license
       auth-rizati-n.
4. F-ll-w Applicati-n Setup steps.
5. -nce BruC-ntr-l is running, -pen the Settings (gear ic-n). Select the ‘Interfaces’ tab.
    Select ‘ADD...’ and fill-in -r select the appr-priate settings f-r the interface. Select ‘-K’
    and cl-se the Settings.
6. Create a test device be selecting the Menu ic-n, then ‘ADD DEVICE’. Select the Interface
    name and select the p-rt # -f the -nb-ard LED (per the Interface Wiring Map f-r y-ur
    interface). Select ‘Digital -utput’ as the device type.
7. Enable the device. Select -K, then select the device element t- t-ggle it’s -N and -FF
    state. The LED -nb-ard the interface sh-uld illuminate and turn -ff acc-rdingly.
8. Y-u are ready t- c-ntinue setting up y-ur BruC-ntr-l system!


## BruC-ntr-l Hardware

## Interface C-nsiderati-ns

BruC-ntr-l uses c-mm-nly available, inexpensive, -ff-the-shelf micr-c-ntr-llers such as
Arduin- b-ards t- serve as the “interface” between the s-ftware and physical hardware
devices. These b-ards are -pen s-urce, are very reliable, c-me in multiple different mixes -f
I/- and features, and are available fr-m many -nline retailers.

Fr-m here f-rward, and in the applicati-n itself, these micr-c-ntr-llers are referred t- as
interfaces.

The system builder can s-urce their -wn interface -r purchase a pre-built interface assembly
fr-m BruC-ntr-l d-es n-t supply interface hardware. It is up t- the system builder t- determine
which interface t- use f-r the applicati-n. N-te that interface b-ards are typically -pen s-urce,
which means the manufacturer -f the actual b-ard may duplicate an -fficial reference design,
-r make changes t- reduce c-st -r facilitate manufacture. This means the b-ard may have
different specificati-ns than the -fficial reference design, which might intr-duce unexpected
inc-mpatibilities. It is rec-mmended t- s-urce interface b-ards fr-m reputable vend-rs wh-
-ffer unm-dified hardware.

Several c-nsiderati-ns must be made when selecting the interface t- use in a c-ntr-l system.
The first determinati-n is serial (USB) vs. Netw-rk c-nnecti-n. Serial via USB (Universal Serial
Bus) is c-nnected thr-ugh a standard USB cable, and can be used when the c-mputer running
BruC-ntr-l is l-cated in cl-se pr-ximity t- the interface. The distance is determined by the
length -f the USB cable, which will likely be less than 6 feet. In circumstances where this is n-t
practical, a Netw-rk c-nnecti-n may be used. The interface will then need netw-rk hardware,
such as -ne built -nb-ard, via a shield (plug-in b-ard), -r via a discreet m-dule. The netw-rk
meth-d can be Ethernet -r Wi-Fi. Ethernet is the rec-mmended meth-d -f netw-rk c-nnecti-n
due t- its speed and reliability. Ethernet may be c-nnected t- the BruC-ntr-l h-st PC via a
r-uter, switch, -r bridge -r directly via an appr-priate cr-ss-ver cable. Alternatively, Wi-Fi may
be used, but wireless c-nvenience c-mes with caveats, as the reliability -f wireless netw-rks is
l-wer than hardwired s-luti-ns. with appr-priate netw-rk lay-ut, adequate signal between the
Wi-Fi radi- and the r-uter, minimal radi- c-mpetiti-n, l-w bandwidth utilizati-n fr-m -ther
devices -n the netw-rk, and in s-luti-ns which are n-t time critical, Wi-Fi can be a very
successful implementati-n. Since alg-rithms run -n the interface, sh-uld the netw-rk
c-nnectivity fail, the interface will c-ntinue t- run its current state uninterrupted.

An-ther maj-r c-nsiderati-n which must be made when integrating an interface int- the
c-ntr-l system is the interface’s v-ltage requirements. B-th the p-wer supply v-ltage and the
input/-utput (I/-) v-ltage must meet the interface’s and ancillary hardware specificati-ns. It is


critical that the appr-priate v-ltages are implemented when designing and building a system,
-therwise c-mp-nent failures will -ccur. S-me m-dels run -n 5VDC p-wer and l-gic, s-me are
3.3VDC l-gic, and s-me are 3.3VDC l-gic but are 5VDC t-lerant. 5VDC is a c-mm-n standard f-r
ancillary hardware, whereas 3.3V is n-t. F-r example, relay b-ards exist in 5V versi-ns, th-ugh
m-st will switch with a 3.3V input signal. Anal-g sens-rs typically range 0-5V, s- these sh-uld
be evaluated carefully. The interface sh-uld generally be p-wered via the VIN pin -r DC jack s-
that the internal regulat-r is used as a layer -f filtering, but can be p-wered via the USB p-rt. In
either circumstance, it is imp-rtant a clean, regulated supply v-ltage is used.

An-ther c-nsiderati-n is ancillary hardware requirements current needs. The pins fr-m the
interfaces can s-urce (pr-vide p-sitive v-ltage) -r sink (pr-vide a path t- gr-und), but have
limited v-ltages and currents they can acc-mm-date. F-r example, the Arduin- MEGA has a
per-pin limit -f 15mA, but it is rec-mmended devices which -nly use 5mA -r less are
implemented. In this example, a s-lid-state relay (SSR) sh-uld be selected which -nly requires
5mA -r less at 5VDC t- be triggered. All interfaces have per pin and maximum t-tal current
limitati-ns – the manufacturers specificati-n sheet sh-uld be c-nsulted.

Certain interfaces have mem-ry in them which all-ws f-r settings t- be st-red permanently,
whereas -thers -nly have temp-rary st-rage. BruC-ntr-l uses this mem-ry t- st-re settings f-r
interfaces c-nnecting via default Netw-rk. Interfaces with permanent mem-ry will retain their
netw-rk settings each time the firmware is installed -r updated, whereas interfaces with
temp-rary st-rage will require their settings t- be re-entered each time their firmware is
installed -r updated (identified by “Until new FW” in the table bel-w). N-te that in b-th
circumstances, the interface can be p-wered -ff and -n with-ut l-sing its netw-rk settings.

A Screw Shield is rec-mmended f-r m-unting and ease/reliability -f wiring terminati-n. N-te
that s-me screw shields d- n-t all-w f-r an additi-nal shield t- be attached, which w-uld
prevent a Netw-rk -r -ther I/- shield fr-m being used. BruC-ntr-l supp-rt -r the BruC-ntr-l
website can help system builders s-urce appr-priate shields and c-mbinati-ns.

See the Appendix f-r the -verview -f interfaces, specificati-ns, limitati-ns, c-mbinati-ns, etc.

## Device Types

BruC-ntr-l can address many different device types. In m-st cases, supp-rting hardware will be
required t- integrate them int- the system. F-r example, a m-t-r will need t- be p-wered
thr-ugh a relay circuit t- c-nvert the l-w p-wer signal fr-m the interface int- a high-p-wer
switch. The “input” -r “-utput” directi-n refers t- the interface’s perspective. The types -f
physical devices that BruC-ntr-l can address include:

1. Digital -utputs – these are c-mmanded -n/-ff devices such as m-t-rs, heaters,
    refrigerati-n c-mpress-rs, m-t-rized valves, s-len-ids, relays, etc.
2. Digital Inputs – these are the read states -f -n/-ff switches, sens-rs, c-ntacts, etc.


3. PWM -utputs (Anal-g -utputs) – these are c-mmanded variable -r pr-p-rti-nal
    devices which resp-nd t- different c-mmand levels f-r a range -f perf-rmance. These
    include pr-p-rti-nal valves, pumps, actuat-rs, etc. Specifically, PWM can c-ntr-l
    m-t-rs, lights, heaters, etc. by reducing the net p-wer t- th-se devices. PWM can be
    c-nverted int- an Anal-g -utput via additi-nal circuitry such as a RC l-w-pass filter.
4. Anal-g Inputs – these are the read v-ltages -f variable -r pr-p-rti-nal sens-rs such as
    pressure, temperature (anal-g -r thermist-r), fl-w, etc.
5. C-unter Inputs – these are read high-speed pulsed pr-p-rti-nal sens-rs such as
    enc-ders -r hall effect sens-rs.
6. Special temperature sens-rs – these are read variable sens-rs f-r measuring
    temperature and include Resistive Temperature Devices (RTDs), -r 1-wire temperature
    sens-rs.
7. Special device sens-rs – these sens-rs pr-vide data fr-m particular devices used in
    pr-cessing applicati-ns, like electr-nic hydr-meters.

## Interface Wiring Maps

-nce an interface is selected, it will need t- be integrated int- the c-ntr-l system. Each -f the
interface’s pins can supp-rt specific Device Types (n-ted ab-ve). Theref-re, each physical
device must be wired t- a suitable input -r -utput type. The types (and c-rresp-nding letter
c-des) are Digital Input -r -utput (D), PWM -utput/Anal-g -utput (P), Anal-g Input (A),
C-unter Input (C), and special temperature sens-rs RTDs (R) and 1-wire (-).

There is a different Interface Wiring Map f-r each interface and each firmware that is installed.
The variati-ns in firmware include c-nnecti-n types (Serial [USB], Ethernet Netw-rk, Wi-Fi
Netw-rk), and whether it is capable -f interfacing with RTD b-ards (f-r use with RTD sens-rs).

-nce the appr-priate interface/firmware c-mbinati-n is selected, the interface sh-uld be wired
acc-rding t- that c-lumn. Each interface pin will sh-w the letter c-des which reflect the types
-f devices that can be wired t- it. See the Interface Wiring Maps f-r current Interface Wiring
Maps.

## C-ntr-l System C-nsiderati-ns

Ancillary electr-nic hardware are the c-mp-nents the interface is integrated in t- create the
c-mplete c-ntr-l system. As n-ted ab-ve, the wiring -f the ancillary electr-nic hardware is a
critical p-rti-n -f the c-ntr-l system, and d-ing s- inc-rrectly can p-se danger t- pers-ns -r
pr-perty, p-tentially causing injury -r death! A pr-per schematic sh-uld always be f-ll-wed
when wiring a c-ntr-l system. Appr-priate wire size, terminati-n, and c-mp-nents f-r the task
must be inc-rp-rated. Pr-per wiring techniques and standards sh-uld be f-ll-wed. M-st
imp-rtantly, upstream pr-tective circuitry must be inc-rp-rated and meet building c-de
specificati-ns. Pr-tective circuitry includes breakers and/-r fuses placed at each branch circuit.


A GFI / GCFI sh-uld be included f-r any c-ntr-l system inv-lving liquid -r any p-ssibility f-r
alternate gr-und paths.

In systems where high v-ltage, high p-wer, -r high energy, -r high strength devices (HV)
are used, -r where d-wnstream devices p-tentially interface with human c-ntact, several
c-nsiderati-ns sh-uld be made. First, it is rec-mmended a tw--stage interrupt is empl-yed. F-r
example, the first stage w-uld be switch which p-wers the c-ntr-l main p-wer (either directly
-r via c-ntact-r) sh-uld be activated first. This circuit p-wers l-w v-ltage devices, such as the
BruC-ntr-l interface’s DC p-wer supply, but d-es n-t enable HV electr-nic c-mp-nents -r
devices. This ensures that the c-ntr-l system is pr-perly running and prepared bef-re all-wing
high v-ltage devices t- bec-me activated. A sec-nd switch (interl-ck -r E-St-p, f-r example)
can then be activated t- all-w th-se devices t- be p-wered. This sec-nd switch sh-uld be
manually c-ntr-lled, n-t via the interface s-ftware c-ntr-l, but there may be circumstances
where this is p-ssible.

When designing and wiring a BruC-ntr-l Interface, the appr-priate Interface Wiring Map
sh-uld be selected and f-ll-wed. These maps indicate which device types can be wired t-
which interface pins. Each map will depend -n the type -f d-wnstream hardware that is being
implemented and the firmware which is installed -n the interface.

When testing and debugging a new BruC-ntr-l system, it sh-uld be perf-rmed with the
l-w v-ltage circuitry first, and the HV side interl-cked -r de-p-wered. Aut-mated machinery
can be very unpredictable, s- a stepwise testing meth-d-l-gy sh-uld be empl-yed t- ensure
each subsystem is functi-ning as expected.

D- n-t perf-rm “pr-ducti-n runs” with-ut c-nducting simulated runs pri-r. As with
aut-mati-n hardware, aut-mati-n scripts will have bugs and/-r perf-rm in unexpected -r
unanticipated ways. It is critical that the builder test with s-urce materials that can aff-rd t- be
wasted pri-r t- using real materials in a pr-duct envir-nment. F-r example, f-r a Brewery, a
water run sh-uld be perf-rmed bef-re initiating an actual brew.

## Interface Setup

T- prepare an interface f-r use with BruC-ntr-l, firmware (s-ftware which runs -n the
micr-c-ntr-ller) must first be installed int- the interface. Typically, interface firmware is
created and upl-aded using an integrated devel-pment envir-nment (IDE). F-r th-se with-ut
pr-gramming -r micr-c-ntr-ller experience, this is a c-mplicated pr-cess -f learning, writing,
upl-ading, testing, re-writing, etc. BruC-ntr-l’s s-luti-n rem-ves this c-mplexity by creating a
firmware install and setup pr-cess which d-es n-t require any s-ftware installati-n.

See the Interface Preparati-n and Interface Firmware -verview and Setup secti-ns -f the
Appendix f-r the specific interface being used.


## Applicati-n Setup

Applicati-n setup steps:

1. Review the system requirements f-r the c-mputer, n-ted ab-ve.
2. D-wnl-ad the latest release -f the BruC-ntr-l applicati-n fr-m BruC-ntr-l.c-m.
3. Unzip the files int- a new, empty f-lder (n-t the same as the firmware). This can be
    d-ne with Wind-ws Expl-rer by -pening the zip file, then using the extract functi-n.
4. Navigate t- the f-lder where the files were unzipped (extracted) t-.
5. Run the “BruC-ntr-l_<versi-n>.exe” file. The c-mputer may display a security warning.
    This is n-rmal as the safety filter may n-t rec-gnize the applicati-n. The applicati-n is
    digitally signed f-r security.
6. -pen the Settings (gear ic-n). Select 'License'.
7. If activating with an ‘EVALUATI-N’ licence:
    a. Select the ‘START EVALUATI-N...’ butt-n and f-ll-w the steps t- initiate this
       license.
8. If activating with an existing license:
    a. Enter the license email in the License field. Enter a unique passw-rd. Rec-rd the
       passw-rd and d- n-t share it.
    b. Select 'ACTIVATE'. The license status sh-uld indicate the license activati-n and
       verificati-n date.
9. T- c-nnect t- an interface, make sure the appr-priate interface firmware is installed
    int- the interface. See the Firmware Installati-n and Setup in the Appendix f-r steps.
10. BruC-ntr-l will n-w c-nnect with the interface(s). See Applicati-n Settings - Interfaces
    bel-w f-r steps.

## Applicati-n Files

When BruC-ntr-l is first run, it will create a new f-lder in the user’s D-cuments f-lder called
‘BruC-ntr-l’. This is the l-cati-n where data, l-gs, and c-nfigurati-n inf-rmati-n are st-red.
Files in this f-lder and subf-lders sh-uld n-t be deleted -r edited with-ut careful
understanding -f their purp-se -r direct instructi-n fr-m BruC-ntr-l Technical Assistance.

C-nfigurati-ns are st-red in respective ‘.brucfg’ extensi-n files. These are the m-st imp-rtant
file t- maintain backups -f in case the current c-nfigurati-n bec-me c-rrupt. BruC-ntr-l will
create daily backups (up t- 30 days) -f the active c-nfigurati-n file as a safety. H-wever, it is
rec-mmended this entire BruC-ntr-l f-lder be frequently backed-up t- a rem-te st-rage
l-cati-n in case any c-rrupti-n -r accidental deleti-n -ccurs.

In -rder t- rest-re an aut-matically backed-up c-nfigurati-n file, these steps sh-uld be taken:

1. Cl-se the BruC-ntr-l applicati-n if it is running.
2. Delete the current c-nfigurati-n file.
3. -pen the ‘BruC-ntr-l/C-nfig Backup’ f-lder.


4. Identify the backup file t- be rest-red. Backup files use the -riginal c-nfigurati-n file
    name and append the backup date c-de plus ‘.bak’ extensi-n (e.g.
    default.brucfg.20190331.bak)
5. C-py the selected f-lder and paste it in the ‘BruC-ntr-l’ f-lder. Delete the date c-de
    and ‘.bak’ extensi-n t- leave a pr-per c-nfigurati-n file extensi-n -f ‘.brucfg’.
6. Start the BruC-ntr-l applicati-n and select the appr-priate c-nfigurati-n matching the
    rest-red file if necessary.


## BruC-ntr-l Applicati-n

## Applicati-n Envir-nment

BruC-ntr-l is launched by executing ‘BruC-ntr-l.exe’. The applicati-n is a unified envir-nment
where setup, -perati-n, and c-ntr-l -f different elements are managed. The applicati-n sh-uld
be run full screen (maximized) f-r best results.

Al-ng the t-p -f the applicati-n is a t--lbar which c-ntains a series -f ic-ns and tabs:

Fr-m left t- right: The Menu ic-n (h-riz-ntal bars) -pens the Menu. The tab(s) t- the right -f
this ic-n represent the different W-rkspaces which are established. The L-ck ic-n, which can be
t-ggled -n -r -ff, indicates the envir-nment’s l-cked -r unl-cked status, discussed bel-w. The
Visibility (eye) ic-n, which can be t-ggled -n -r -ff, indicates whether hidden elements are
f-rced t- be visible -r n-t. The Scripts ic-n (braces), which can be t-ggled -n -r -ff, indicates
whether the Script list and ass-ciated scripts are sh-wn. The Status ic-n, which is either a green
check -r a red X, indicates whether c-mmunicati-n with the c-nfigured interface(s) is
functi-nal -r n-t. Finally, the Settings ic-n (gear) -pens the envir-nment’s Settings menu.

## Applicati-n Settings

The applicati-n’s settings are raised by selecting the Settings ic-n.


### Interfaces

The ‘Interfaces’ secti-n is where the interfaces BruC-ntr-l will c-mmunicate with are managed.
The current list -f established interfaces is displayed, al-ng with their c-mmunicati-n Status
and Enabled status.

Interfaces can be disabled -r enabled by selecting the ‘Enabled’ checkb-x. The
‘C-MMUNICATI-NS...’ butt-n will raise the current c-mmunicati-ns dial-g f-r the selected
interface. This sh-uld -nly be used f-r debugging when instructed by BruC-ntr-l Technical
Assistance. H-wever, an interface’s c-mmunicati-ns can be suspended by disabling the
‘C-mmunicati-ns’ switch. Device Elements ass-ciated with these suspended interfaces will read
‘SUSPENDED’.


T- add a new interface, select the ‘ADD...’ butt-n. T- edit an existing interface, select it in the
list and select the ‘EDIT’ butt-n. T- rem-ve an interface, select it in the list and select the
‘REM-VE’ butt-n. N-te that rem-ving an interface will delete all -f the Device Elements
ass-ciated with it. See Device Elements f-r details.

When adding -r editing an interface, multiple pr-perties need be defined. In the ‘Name’ field,
give the interface a unique name t- identify it. It is rec-mmended that it be named acc-rding t-
its l-cati-n -r primary functi-n. ‘Diagn-stic L-gging’ (-ff by default) rec-rds interface
c-mmunicati-ns in a l-g file f-r debugging purp-ses and is enabled with the switch. In the
‘Type’ field, select the interface’s micr-c-ntr-ller type. In the ‘C-nnecti-n’ field, select either
‘Serial P-rt’ -r ‘Netw-rk TCP’, which describes the physical c-mmunicati-ns c-nnecti-n
between BruC-ntr-l and the interface. If the interface is c-nnected via USB cable, select ‘Serial
P-rt’. If the interface is c-nnected via Ethernet -r Wi-Fi, select ‘Netw-rk TCP’.

F-r the ‘Wiring Map’ field, select the appr-priate f-r the applicati-n and micr-c-ntr-ller. This
map will match the type defined in the Interface Wiring Maps in the Build secti-n -f
BruC-ntr-l.c-m. The physical hardware will have been wired acc-rding t- that map, s-
c-nsistency acr-ss the interface firmware, wiring, and selected wiring map is critical.

Under ‘C-nnecti-n Settings’, select the pr-perties f-r that c-nnecti-n type. ‘Serial P-rt’ (USB)
c-nnecti-ns require the C-M p-rt number and the baud rate. The C-M p-rt number was
assigned by the c-mputer, and can be identified in its Device Manager. The baud rate sh-uld be


left at its default -f 115200, as this rate defined firmware (-ffers the best mix -f speed and
reliability), unless special versi-ns are used. ‘Netw-rk TCP’ (Ethernet -r Wi-Fi) c-nnecti-ns
require the interface’s IP address. This is either assigned manually -r by the r-uter via DHCP,
which was selected when the interface firmware was set up. P-rt 5000 is the default p-rt and is
defined as such in the firmware. See Interface Setup f-r details.

F-r ‘Refresh Interval’ select the am-unt -f time appr-priate t- that interface. See Interface
C-mmunicati-n f-r details.

‘Resp-nse Time-ut’ refers t- the am-unt -f time, in sec-nds, BruC-ntr-l will wait t- receive a
resp-nse fr-m the interface bef-re flagging the c-mmunicati-ns err-r and attempting t-
rec-nnect. The default -f 3 sec-nds is adequate f-r l-cal wired c-nnecti-ns such as serial (USB)
and Ethernet. It sh-uld be increased t- 5 -r m-re f-r Wi-Fi c-nnecti-ns -r where the interface
is -n a WAN (Wide Area Netw-rk).

### C-nfigurati-n

BruC-ntr-l uses C-nfigurati-ns t- define the pr-perties -f the entire Envir-nment, including
the interfaces, W-rkspaces, Elements, Scripts, etc. This all-ws f-r -ne applicati-n t- w-rk with


entirely different systems. It can als- be used t- differentiate pr-ducti-n fr-m test machines -r
systems. T- create a new C-nfigurati-n, select ‘NEW...’ and assign a name. T- delete the
current C-nfigurati-n, select ‘DELETE’. N-te that deleting a c-nfigurati-n will erase all the
interfaces, W-rkspaces, etc. T- switch C-nfigurati-ns, select the desired -ne in the ‘Active’ list.

### Security

BruC-ntr-l c-ntains s-me basic security t- prevent unauth-rized -r accidental changes t- the
system. See Envir-nment Security f-r details. The Security setting all-ws f-r the creati-n -f a
f-ur-digit PIN (Pers-nal Identificati-n Number) which will need t- be entered anytime the
Envir-nment is unl-cked.

T- create a new PIN, enter f-ur digits (numbers -nly) int- the ‘New PIN’ field, then enter the
same f-ur digits int- the ‘C-nfirm PIN’ field. Select ‘APPLY’ t- set the PIN. When the L-ck ic-n is
next t-ggled -ff, the PIN c-de will be required t- c-mplete the unl-ck.

T- rem-ve the PIN, select the ‘REM-VE PIN’ butt-n.


### License

BruC-ntr-l uses a license system t- ensure auth-rized installati-ns are utilized. Licenses are
activated in the applicati-n, and the applicati-n is fully functi-nal with-ut activati-n except f-r
interface c-mmunicati-ns. This system requires that the h-st c-mputer access a rem-te web
server t- c-nfirm auth-rizati-n. Theref-re, the h-st c-mputer must be c-nnected t- the
internet f-r initial and c-ntinual auth-rizati-n. BruC-ntr-l will c-nfirm auth-rizati-n r-ughly
-nce per day. If auth-rizati-n cann-t be achieved because the h-st c-mputer is n-t c-nnected
t- the internet, it will c-ntinue t- attempt auth-rizati-n f-r 30 days bef-re suspending
interface c-mmunicati-ns.

The first step in a new installati-n is t- activate a license. T- d- s-, either an established license
can be activated, -r an ‘EVALUATI-N’ license can be initiated. T- activate an established
license, enter the credentials -f the licensee, including the ‘Email’ and ‘Passw-rd’ in their


respective fields, then select the ‘ACTIVATE’ butt-n. The license will be verified, and the
‘License Status’ will be updated t- reflect its status and level.

T- initiate an ‘evaluati-n’ license, select the ‘START EVALUATI-N’ butt-n and enter an
appr-priate email address. Select the link in the evaluati-n email -nce received t- receive a
verificati-n c-de. Enter the c-de int- the BruC-ntr-l applicati-n and an evaluati-n license will
bec-me activated. Evaluati-n licenses pr-vide full functi-nality, including interface
c-mmunicati-ns, f-r 15 days bef-re expiring. Evaluati-n licenses can be c-nverted t-
established licenses using the same credentials.

Levels include ‘EVALUATI-N’, ‘BASIC’, ‘ADVANCED’, and ‘PR-FESSI-NAL’. Ensure the activated
license level matches the purchased -r acquired license.

The ‘BASIC’ license all-ws BruC-ntr-l t- c-ntr-l -ne Serial Interface. The ‘ADVANCED’ license
adds the ability t- c-ntr-l unlimited Serial and Netw-rk c-nnected Interfaces. The
‘PR-FESSI-NAL’ license adds the ability f-r third-party applicati-ns t- c-mmunicate with the
BruC-ntr-l applicati-n via a Data Exchange Pr-t-c-l. ‘EVALUATI-N’ licenses mirr-r
‘ADVANCED’ license level functi-nality.

N-te: If the h-st c-mputer’s hardware (and resulting the machine ID) is changed, the activati-n
will bec-me invalid. In -rder t- delete the activati-n t- res-lve this, -r t- release the license f-r
installati-n -n an-ther c-mputer, c-ntact BruC-ntr-l Technical Assistance.


### Envir-nment..............................................................................................................................

The Envir-nment setting all-ws f-r cust-mizati-n -f the applicati-n’s appearance. The general
c-l-ring, f-nts, butt-n types, etc. can be gl-bally changed using the ‘Theme’ selecti-n. Light,
dark, and vari-us -ther themes are available. It is rec-mmended t- use ‘Basic’ -r ‘The Bezier’
Themes and any ch-sen sub-theme, as thess pr-vide the best perf-rmance -n high-res-luti-n
m-nit-rs.

The Element Grid Size setting determines a grid up-n which the Element’s l-cati-n, width, and
height are l-cated up-n. This is kn-wn as “Snap t- Grid”. This helps the user align Elements and
create a unif-rm lay-ut -r array -f elements. The default is ‘10x10’ Pixels. Setting t- ‘1x1 Pixels’
effectively turns -ff this functi-n.

Elements have a default appearance, which is defined here. Each new Element will be created
with these default settings. T- change Elements’ default appearance, select the ‘ELEMENT
APPEARANCE...’ butt-n. The explanati-n f-r each -f the fields in ‘Appearance Settings’ can be
f-und in Element Appearance.


The applicati-n can be minimized t- the Wind-ws system tray rather than being minimized t-
the Wind-ws task bar. This is c-mm-nly d-ne in server-type applicati-ns t- prevent users fr-m
accidentally cl-sing the applicati-n. T- enable this functi-n, enable it via the ‘Minimize t-
system tray’ switch. The applicati-n can als- be set t- aut-matically l-ck after a peri-d -f
inactivity. Select the pulld-wn -pti-ns f-r ‘Aut- L-ck’ t- ch--se time ranges fr-m -ne minute
t- -ne h-ur, -r ‘Never’ t- disable aut-matic l-cking.

### Data Exchange

BruC-ntr-l c-ntains a functi-n t- facilitate data exchange with -ther applicati-ns. It utilizes a
server type HTTP service t- c-mmunicate the values -f certain Gl-bal variables. In -rder t- f-r
this service t- functi-n c-rrectly, the URL reservati-n must be established -n the h-st
c-mputer. T- d- this, select ‘RESERVE URL’. Then t- enable the service, set the ‘Service’ switch
t- ‘Enabled’. See Data Exchange Pr-t-c-l f-r utilizati-n -f this functi-n. N-te: The Data
Exchange Service requires a PR-FESSI-NAL’ level license.


### Email

BruC-ntr-l c-ntains an Email N-tificati-n system which will all-w the applicati-n t- send a
n-tificati-n email in certain circumstances, primarily when an Alarm is activated.

T- enable this n-tificati-n system, turn the ‘Email N-tificati-ns’ switch -n. Then add -ne -r
m-re email addresses t- be n-tified using the ‘ADD...’ butt-n. The selected email address in the
list can be rem-ved with the ‘REM-VE’ butt-n.

Establish the sending email acc-unt using the ‘ACC-UNT SETTINGS...’ butt-n. In this b-x, select
a pre-c-nfigured email server by selecting -ne in the list, -r use the ‘Cust-m’ entry t- pr-vide
discreet server settings. When using ‘Cust-m’, the ‘SMTP H-st’, ‘SMTP P-rt’, and ‘Use SSL’
settings must be c-nfigured.

Enter the email acc-unt credentials f-r the selected acc-unt in the ‘Username’ and ‘Passw-rd’.
Ensure the entire email address is used f-r the ‘Username’. Select ‘SEND TEST MESSAGE...’ t-
test the email acc-unt is c-rrect and the Email N-tificati-n system is functi-ning.



### Ab-ut

The ‘Ab-ut’ tab displays the current versi-n and build number. This sh-uld be pr-vided when
c-ntacting BruC-ntr-l Technical Supp-rt.

## T-uch Keypad

Many numerical fields thr-ugh-ut the applicati-n c-ntain a built-in t-uch keypad t- facilitate
data entry. These fields are demarked by a 9-d-t matrix ic-n at the right end -f the field. T-
access the keypad, select the ic-n.

The keypad c-ntains n-rmal number butt-ns, plus backspace and clear butt-ns. ‘-K’ and
‘CANCEL’ butt-ns will keep -r ign-re the entry, respectively.


## Interface C-mmunicati-n

BruC-ntr-l c-mmunicates with each interface using messages t- c-mmand and/-r query its
devices -n a timed basis. BruC-ntr-l uses a queuing system, s- that messages are sent -nly
when they need t- be and the c-mmunicati-n timer elapses. This timer is called the Refresh
Interval, and is set by the interface’s c-nnecti-n settings. See Applicati-n Settings/Interfaces f-r
details. By default, this interval is every 1 sec-nd, but can be made faster -r sl-wer. F-r serial
(USB) and Ethernet c-nnecti-ns, this default is rec-mmended. F-r Wi-Fi c-nnecti-ns, 1 – 3
sec-nds are rec-mmended.

The devices c-nnected thr-ugh that interface are then c-mmunicated with individually
acc-rding t- their Refresh Multiple. The Refresh Multiple is set in a device’s pr-perties (device
‘i’ ic-n... General tab... Element... Refresh Multiple) and is 1 by default. Multiplying the
interface’s Refresh Interval by a specific device’s Refresh Multiple results in its actual refresh
interval. F-r example, if an interface’s Refresh Interval is 3 sec-nds and its device’s Refresh
Multiple is 2, the refresh interval f-r that device is 6 sec-nds. This means that updates t- -r
queries fr-m that device will -ccur every six sec-nds.

Device’s statuses and values are updated acc-rding t- these peri-ds, s- it is imp-rtant t- keep
these in mind when expecting device’s values t- update. Scripts may need be written t-
acc-mm-date these delays. F-r example, a time delay may need t- be intr-duced in the Script
if a device -utput is c-ntingent up-n an-ther device’s value.

N-te that interface internal alg-rithms like Hysteresis, PID, -r Deadband -utputs are n-t
affected by this schedule. -nly the c-mmunicati-n between the interface and BruC-ntr-l is.


The benefit t- a higher Refresh Interval and/-r Refresh Multiple is reduced c-mmunicati-n
-verhead, and p-tentially faster interface executi-n (depending -n its calculati-n l-ad and CPU
speed), and sh-uld be adjusted acc-rding t- the c-ntr-l system’s rep-rting needs and
c-nnecti-n quality. F-r example, a refrigerati-n unit need n-t rep-rt its temperature t-
BruC-ntr-l but every 30 sec-nds -r m-re, whereas a fast-changing heating vessel’s
temperature device may need be rep-rted every 1 sec-nd. Increasing these settings can help
reduce netw-rk traffic (slightly) and p-ssibly increase reliability.

## W-rkspaces

A W-rkspace is an “-pen canvas” where the user can add, -rganize, and manage different
graphical “Elements”. The area under the t--lbar is the current W-rkspace area. W-rkspaces
are highly flexible, all-wing f-r an easily cust-mized lay-uts per the user’s needs. The
envir-nment can h-st multiple W-rkspaces. Each W-rkspace can represent multiple c-mbined
c-ntr-l systems, a single c-ntr-l system, -r just a sub-secti-n -f a c-ntr-l system. Each
W-rkspace can h-ld as many -r as few Elements as desired, and Elements can be m-ved
anywhere in the W-rkspace. Elements can als- be sized and f-rmatted as desired t- create
unique appearances.

W-rkspaces are created via Menu... Add W-rkspace. The current W-rkspace is sh-wn by the
highlighted tab in the t--lbar, and -ther W-rkspaces can be selected there. Dragging a
W-rkspace tab left -r right re-rganizes the tab -rder. The current W-rkspace can be renamed
via Menu... Rename W-rkspace. The current W-rkspace can be wiped clean -f all its elements
via Menu... Clear W-rkspace. Finally, the current W-rkspace can be deleted via Menu... Delete
W-rkspace.

```
When a W-rkspace is deleted, its Elements are als- deleted.
```

The current W-rkspace can be further cust-mized by adding a backgr-und image via Menu...
Backgr-und Image... then Br-wse... t- select .JPG -r .PNG image t- display. The Width and
Height -pti-ns all-w f-r size cust-mizati-n. T- fill the wh-le w-rkspace, it is rec-mmended t-
enter the m-nit-r’s display res-luti-n. T- rem-ve the selected image, click the X ic-n in the file
selecti-n field. The image is aut-matically scaled t- fill the W-rkspace.

## Elements

Elements represent different c-mp-nents -f the c-ntr-l system, and each displays real time
inf-rmati-n related t- its functi-n. This serves as the HMI (Human-Machine Interface). The
Elements can be placed, m-ved, and sized, and f-rmatted as desired.

Element’s pr-perties are accessed by selecting its inf-rmati-n ic-n, represented by a circular ‘i’
in its upper right c-rner. The Element can be m-ved by dragging this ic-n. In additi-n, the
Element can be resized by dragging the resize indicat-r in its l-wer right c-rner. Elements will
align acc-rding t- the grid established in Settings... Envir-nment. B-th the inf-rmati-n and
resize ic-ns are -nly available when the envir-nment is unl-cked. Elements can be m-ved
acr-ss W-rkspaces using the ‘W-RKSPACE...’ butt-n in its pr-perties dial-g. In additi-n,
Elements may be deleted using the ‘DELETE’ butt-n in its pr-perties dial-g.

BruC-ntr-l will aut-matically assign a name when an Element is created, but these names can
be changed.

```
Elements must be given unique names, -therwise c-nflicts will -ccur.
```
The Element types are as f-ll-ws:

1. Device Elements – Graphical representati-ns f-r c-ntr-l and rep-rting -f physical
    devices.
2. Timer Elements – S-ftware timers which can be used t- m-nit-r -r c-ntr-l pr-cesses in
    the c-ntr-l system.
3. Alarm Elements – S-ftware alarms activated and deactivated manually -r aut-matically
    t- alert a user, depending -n c-ntr-l system c-nditi-ns.
4. Graph Elements – Line graphs which pl-t data t- present values -ver time.
5. Gl-bal Elements – S-ftware elements which h-ld and display user data -r values.
6. Butt-n Elements – S-ftware elements which all-w the user t- generate inputs t- the
    c-ntr-l system.
7. Switch Elements – S-ftware elements which all-w the user t- generate an -n/-ff input
    t- the c-ntr-l system.
8. Inspect-r Elements – S-ftware elements which display variables used in scripts.


## Envir-nment Security....................................................................................................................

When the envir-nment is l-cked, elements cann-t be edited, m-ved -r resized. W-rkspaces
cann-t be edited -r deleted and their tabs cann-t be re--rdered. This is t- prevent accidental
-r unauth-rized changes t- the c-ntr-l system. In -rder t- unl-ck the envir-nment, the user
un-t-ggles the L-ck ic-n, and enters the Pin C-de if -ne is established in the Security tab -f the
Settings.

## User C-ntr-l

M-st Elements c-ntain a pr-perty called ‘User C-ntr-l’, which is set in their respective
pr-perties. Scripts als- have a User C-ntr-l pr-perty. This all-ws f-r the user t- interact with
pieces -f the c-ntr-l system with-ut inappr-priately making gl-bal changes.

If User C-ntr-l is disabled, the Element’s -r Script’s c-ntr-l -r value cann-t be changed when
the envir-nment is l-cked. When this is enabled, the c-ntr-l -r value can be changed even
when the Envir-nment is l-cked. User C-ntr-l disabled by default.

## Device Elements

Device Elements represent the c-ntr-l system’s physical devices. These physical devices are
c-nnected t- the interface pins and are c-nsidered inputs -r -utputs, depending -n the signal
“directi-n” with respect t- the interface. -utputs are signals fr-m the interface t- physical
devices such as a relays, m-t-r c-ntr-ls, etc. Inputs are signals fr-m physical devices such as
switches, sens-rs, etc. t- the interface.

Device Elements address interface ‘p -rts’ rather than pins. In m-st circumstances the p-rt
number and pin number are identical. See the Interface Wiring Maps in the Build secti-n -f
BruC-ntr-l.c-m f-r p-rt/pin mapping. Certain devices are addressed virtually and in th-se
cases, p-rt numbers will n-t have a c-rresp-nding pin. F-r example, 1-wire temperature
sens-rs may wired -n pin 5 but are addressed virtually (f-r example: p-rt 205), as there is n-
pin number 205 -n the interface. Devices which are addressed virtually are n-ted bel-w.

A Device Element’s ass-ciated Interface and P-rt can be viewed (but n-t edited) -n the
Element pr-perties ‘INTERFACE’ tab.


S-me Device Elements which display multiple values (e.g. a C-unter) c-ntain a pr-perty called
“Primary Value”. This selecti-n determines which value is m-st pr-minently displayed and used
when its value is being referenced in a Graph -r Script.

Create a new Device Element by selecting Menu... Add Device. In the New Device b-x, select
the name -f the Interface where the device is wired, select the p-rt, and the select the type -f
device is physically wired t- that p-rt.

The physical devices represented by its Device Element are n-t actually addressed by the
interface until the Device Element enabled. When a Device Element is disabled, it is essentially
idle, and it will n-t be c-ntr-llable -r present any value. T- enable a device, -pen the Device
Element’s pr-perties and change the ‘Enabled’ switch t- -n. Disabled devices will rep-rt
‘DISABLED’.

Multiple Device Elements can be c-nfigured t- address an individual p-rt, but n-t
simultane-usly. Enabling a Device Element which addresses a particular p-rt will aut-matically
disable -ther enabled Device Elements which address the same p-rt.

### Digital Input

These are binary devices which read the v-ltage -f the interface’s pin. These types -f devices
are n-ted ab-ve under Device Types, list #2. The state is presented as the Element’s value and
will either be -N -r -FF depending if the v-ltage is high -r l-w. High is ab-ve ~65% and l-w is
bel-w ~30% -f the interface’s -perating v-ltage (appr-ximate values, depends -n the
interface’s CPU).

Digital Inputs have n- User C-ntr-l, as they are read--nly Elements.

The -nly specific pr-perty f-r a Digital Input is the ‘Active L-w’ switch. This setting is -FF by
default, which means that a high v-ltage equates t- an -N state. If this pr-perty is enabled, the
setting will bec-me active l-w, meaning that a l-w v-ltage equates t- the -N state -f the
Device Element. N-te that this setting is n-t strictly an inversi-n in the applicati-n. It causes the


interface t- enable a pull-up resist-r in the pin, which will ensure the v-ltage reads high v-ltage
unless a gr-und (l-w) signal is applied.

### C-unter Input

These are devices which c-unt the number and rate -f v-ltage change cycles -n the interface’s
pin. These types -f devices are n-ted ab-ve under Device Types, list #5. Each time the v-ltage
changes fr-m a high t- a l-w v-ltage, the c-unter is incremented. See v-ltage definiti-ns in
Digital Input f-r details. Theref-re, the C-unter Input is measuring the number -f pulses


received -n its respective pin. B-th the t-tal (t-tal pulses) and rate (pulses per sec-nd) are
presented as the Element’s values.

C-unter Inputs have n- User C-ntr-l, as they are read--nly elements.

The -nly specific pr-perty f-r a C-unter Input is the ‘Sampling Peri-d’ field. This pr-perty
c-ntr-ls the hist-ric wind-w -f time, in sec-nds, that the rate is being calculated -ver. It is set
t- 1 sec-nd by default, but can be as l-ng as 10 sec-nds. This pr-perty d-es n-t affect the
pulses per sec-nd rate, but acts t- sm--th the values -ver time. F-r example, if this pr-perty
were set t- 5 sec-nds, the t-tal number -f pulses received -ver 5 sec-nds w-uld be rep-rted.

A C-unter Input’s t-tal value is maintained as l-ng as the interface is p-wered. Its c-unt limit is
appr-ximately 4.29 x 10^9 (~4.3 billi-n), and when exceeded will revert t- zer-. T- reset this
value, disable the device and re-enable it, delayed by a peri-d -f time which is at least l-nger
than the device’s refresh interval. This disable and enable sequence can be perf-rmed manually
via the C-unter Input Pr-perties -r via a script.


### Anal-g Input

These are variable devices which read the v-ltage -f the interface’s pin. These types -f devices
are n-ted ab-ve under Device Types, list #4. The value al-ng a range pr-p-rti-nal t- the
reference v-ltage is averaged and presented as the Element’s value. The number -f divisi-ns in
the ranges will be c-mmensurate with the interface’s Anal-g t- Digital C-nverter (ADC)
res-luti-n, which is dependent -n the interface’s CPU m-del (see Interface -verview in the
Appendix). If an interface’s res-luti-n is 10 bits (2^10 = 1024), the rep-rted value al-ng the range
will be divided int- 1024 steps, where 0 indicates 0 v-lts and 1023 indicates a v-ltage equal t-
-r ab-ve reference v-ltage (typically either 5V -r 3.3V, depending -n the reference v-ltage and


respective wiring). The reference v-ltage is typically the CPU v-ltage. Theref-re, f-r example,
with 1024 v-ltage divisi-ns and a 5V reference v-ltage, the step fr-m -ne rep-rted value t- the
next represents an increase -f appr-ximately 4.9mV. See Schematics f-r details -n wiring
anal-g sens-rs.

Anal-g Inputs have n- User C-ntr-l, as they are read--nly elements.

There are tw- specific pr-perties f-r an Anal-g Input. The first is the ‘Avg Weight’ (average
weight) field which has a range -f 1 t- 100 percent and a default -f 25 percent, and the sec-nd
is the ‘P-ll Rate’ field which has a range -f 250 t- 25,000 millisec-nds (25 sec-nds) and a
default -f 500 millisec-nds. A new measurement, -r “sample” -f the v-ltage -n the interface’s
pin is taken c-ntinu-usly, acc-rding t- the time interval -f the ‘P-ll Rate’. This sampling is
independent -f h-w -ften this device’s value is read by BruC-ntr-l (determined by its actual
refresh interval). That sample is then averaged int- the a running average with the weight
dictated by the ‘Avg Weight’. The P-ll Rate’s time unit is millisec-nds.

This averaging is perf-rmed f-r digital sm--thing -f the samples, which functi-nally reduces
n-ise c-mm-n with anal-g devices and circuitry. Theref-re, f-r example, with these default
settings, a new anal-g v-ltage measurement will be taken twice a sec-nd, and the resulting
average will be equal t- 75% -f the existing average and 25% -f the new sample. If the current
sample needs be displayed, the ‘Avg Weight’ sh-uld be set t- 100%. See Anal-g Input
C-nsiderati-ns f-r m-re inf-rmati-n -n filtering.


### SPI Sens-r Input

These are variable devices which read a RTD (Resistive Temperature Device) pr-be’s
temperature via a separate b-ard c-nnected via SPI (Serial Peripheral Interc-nnect). See
Schematics f-r details -f these b-ards. These types -f devices are n-ted ab-ve under Device
Types, list #6. The value al-ng a range pr-p-rti-nal t- the temperature is presented as the
Element’s value.

SPI Sens-r Inputs have n- User C-ntr-l, as they are read--nly elements.


There are tw- specific pr-perties f-r a SPI Sens-r Input. The first is the ‘Avg Weight’ (average
weight) field which has a range -f 1 t- 100 percent and a default -f 25 percent, and the sec-nd
is the ‘P-ll Rate’ field which has a range -f 250 t- 25,000 millisec-nds (25 sec-nds) and a
default -f 500 millisec-nds. A new measurement, -r “sample” -f the value -f the SPI b-ard is
taken c-ntinu-usly, acc-rding t- the time interval -f the ‘P-ll Rate’. This sampling is
independent -f h-w -ften this device’s value is read by BruC-ntr-l (determined by its actual
refresh interval). That sample is then averaged int- the a running average with the weight
dictated by the ‘Avg Weight’. The P-ll Rate’s time unit is millisec-nds.

This averaging is perf-rmed f-r digital sm--thing -f the samples, which functi-nally reduces
n-ise c-mm-n with anal-g devices and circuitry. Theref-re, f-r example, with these default
settings, a new anal-g v-ltage measurement will be taken twice a sec-nd, and the resulting
average will be equal t- 75% -f the existing average and 25% -f the new sample. If the current
sample needs be displayed, the ‘Avg Weight’ sh-uld be set t- 100%. High impedance sens-rs
such as RTDs are mildly pr-ne t- n-ise, s- an average weight such as 75% -r m-re can be used.

### 1-wire Temperature Input

These are variable devices which read a 1-wire (DS18B20) sens-r’s temperature. These types -f
devices are n-ted ab-ve under Device Types, list #6. The temperature -f the device is
presented as the Element’s value.

1-wire Temperature Inputs have n- User C-ntr-l, as they are read--nly elements.

There are tw- specific pr-perties f-r a 1-wire Temperature Input. The first is the ‘Sens-r Index’,
which has a range -f 0-99, and the sec-nd is the rep-rted value’s unit. When an interface is first
p-wered, all the 1-wire sens-rs c-nnected t- it are enumerated, with each receiving a unique
index, numbered fr-m 0 upward. F-r example, if a system has three sens-rs, they will be
assigned indexes 0, 1, and 2 respectively.

The Sens-r Index is used t- ass-ciate a Device Element t- a specific sens-r. The actual index will
need be determined by trial and err-r, but -nce the index is selected, it will always be
maintained, unless additi-nal sens-rs are added -r rem-ved fr-m the interface.

1-wire Temperature inputs are addressed virtually, -n p-rts 200 – 219.


### Hydr-meter Input

This special Device Element reads real-time Hydr-meters used in pr-cessing applicati-ns. TILT
Hydr-meters (https://tilthydr-meter.c-m/), which c-mmunicate via Bluet--th techn-l-gy,
c-nnect thr-ugh specific Bluet--th capable interfaces and use the Hydr-meter Element
described here. Please see Interface Rec-mmendati-ns f-r m-re details.

N-te: iSpindel Hydr-meters (http://www.ispindel.de/), which c-nnect via Wi-Fi, c-nnect t-
BruC-ntr-l thr-ugh Data Exchange (see iSpindel Hydr-meter C-nsiderati-ns f-r details).

Hydr-meter Inputs have n- User C-ntr-l, as they are read--nly elements.


The -nly specific pr-perty f-r a Hydr-meter Input is the ‘C-l-r’ field. This c-rrelates t- the
particular c-l-r c-de -f the TILT Hydr-meter being read.

Hydr-meter inputs are addressed virtually, -n p-rts 220 – 229.

### Digital -utput

These are binary devices which c-mmand the interface’s pin t- be a high -r l-w v-ltage. These
types -f devices are n-ted ab-ve under Device Types, list #1. The state is presented as the
Element’s state and will either be -N -r -FF depending if the v-ltage is high -r l-w. High is
~90% and l-w is ~10% -f the interface’s -perating v-ltage (appr-ximate values, depends -n the


interface’s CPU). By default, when the Device Element is -N, the interface pin’s v-ltage is high
(Active High).

Digital -utputs have a pr-perty f-r User C-ntr-l, as they are c-mmanded elements. When the
pr-perty is enabled -r the envir-nment is unl-cked, selecting the Element’s -N -r -FF value
will invert its state. This can be used t- quickly turn a device -n -r -ff. Digital -utputs can be
turned -N -r -FF permanently, -r they may be aut-matically inverted after a defined peri-d -f
time using the -ne-Sh-t functi-n.

There are f-ur specific pr-perties f-r a Digital -utput. The first is the ‘State’ switch, which is the
state -f the interface -utput. The sec-nd is the ‘-ne-Sh-t Time’, which when defined ab-ve
zer-, will aut-matically revert the -utput after this peri-d -f time elapses, in millisec-nds,
acc-rding t- the third pr-perty, ‘-ne-Sh-t Directi-n’. Theref-re, f-r example, when a ‘-ne-Sh-t
Time’ is defined as 2000 and the ‘-ne-Sh-t Directi-n’ is set as “-N -> -FF”, the -utput will
aut-matically turn -FF 2000 millisec-nds after it turns -N (but will n-t aut-matically turn -N if
turned -FF).

The last pr-perty is the ‘Active L-w’ switch, which inverts the -utput, meaning that an -N state
creates l-w v-ltage -n the interface pin. This w-uld be used with an “Active L-w” -r “L-w
Trigger” relay b-ard, f-r example.


### PWM -utput (Anal-g -utput)

These are variable devices which c-mmand the interface’s pin t- be pulsed at a fixed high
frequency but with varied pulse widths. These types -f devices are n-ted ab-ve under Device
Types, list #3. PWM stands f-r Pulse Width M-dulati-n, which is a rectangular -utput wave
where the -N time and -FF time add up t- a c-nsistent peri-d. That peri-d equates t- a
frequency which is ~500 Hz, ~1000 Hz, -r similar, depending -n the interface and pin. A PWM
value -f 50% will create a square wave -utput, whereas a value -f 75% will create an -utput
which is -n f-r 75% -f the peri-d, then -ff f-r the remaining 25%. The net effect t- devices
which “average” this -utput creates the effect -f varying p-wer. An anal-g v-ltage can be


created fr-m a PWM -utput with appr-priate hardware, such as a l-w pass filter -r BruC-ntr-l
Anal-g Amplifier M-del AA-1 -r AA-2 t- c-nvert the PWM -utput t- an Anal-g -utput. See
Schematics f-r details. The value al-ng a relative range pr-p-rti-nal t- the -N time percentage
is presented as the Element’s value. By default, that range is 0-255.

PWM -utputs have a pr-perty f-r User C-ntr-l, as they are c-mmanded elements. When the
pr-perty is enabled -r the envir-nment is unl-cked, selecting the Element’s value will bring up
a b-x where this value can be changed.

There is -ne specific pr-perty f-r a PWM/Anal-g -utput, ‘Value’. This is the Device Element’s
value.


### Duty Cycle -utput

These are binary devices which c-mmand the interface’s pin v-ltage high and l-w at a definable
frequency and pulse width. These types -f devices are n-ted ab-ve under Device Types, list #1.
The current state -f the -utput is presented as the Element’s state and will be either -N -r
-FF. The current -N time percentage is presented as the Element’s value. An -N value equates
t- high v-ltage -n the interface pin.

It is imp-rtant t- differentiate the difference between Duty Cycle and PWM -utputs.
PWM’s frequency is high and fixed, and the intent f-r this type -f -utput is t- l-wer the net
p-wer t- a physical device with-ut the -N and -FF states being n-ticeable with respect t-
human percepti-n. Their d-wnstream switching and physical devices (such as a transist-r and
m-t-r) must be able t- -perate at the high PWM frequencies. Duty Cycle -utputs are
technically PWM and als- have the g-al -f reducing net p-wer -ver time, but switch -N and
-FF at a much l-wer frequency and are geared f-r switches and devices which cann-t switch at
high speed (such as a s-lid-state relay and a heating element). In additi-n, the Duty Cycle’s
cycle length is c-nfigurable. The -N and -FF states are perceptible t- human and machine
alike. F-r example, in a 5 sec-nd peri-d, a PWM -utput will switch -N and -FF 5000 times
each, whereas a Duty Cycle with a 2500 millisec-nd time will switch -nly -N and -FF twice
each.

Duty Cycle -utputs have a pr-perty f-r User C-ntr-l, as they are c-mmanded elements. When
the pr-perty is enabled -r the envir-nment is unl-cked, selecting the Element’s value will bring
up a b-x where this value can be changed.

There are tw- specific pr-perties f-r a Duty Cycle -utput. The first is the ‘Duty Cycle’ -utput,
which is the percentage -f time the -utput is -N and high v-ltage is applied t- the interface
pin. This is the Device Element’s value, and its default is 50%. The sec-nd is the ‘Cycle Time’,
which is the t-tal peri-d -f time, in millisec-nds, f-r a -N/-FF cycle t- be c-mpleted. Its
recipr-cal is the frequency, s- a peri-d -f 1000 millisec-nds (1 sec-nd) equates t- a frequency
-f 1 Hz. Its default is 1000 millisec-nds.


### Hysteresis -utput

These are binary devices which c-mmand the interface’s pin v-ltage high -r l-w depending -n
an input signal. These types -f devices are n-ted ab-ve under Device Types, list #1. The input
signal may be an Anal-g Input, an SPI Sens-r Input, -r a 1-wire Temperature Input. The
hysteresis alg-rithm lets a c-ntr-l system achieve a target within a definable range. This range
is called the hysteresis wind-w, and is designed t- prevent rapid cycling -f the -utput due t-
slight changes in the input signal c-mpared t- the target (like a standard temperature
therm-stat). The current state -f the -utput is presented as the Element’s value and will be
either -N -r -FF. An -N value equates t- high v-ltage (when the Active L-w pr-perty is


disabled) -r l-w v-ltage (when the Active L-w pr-perty is enabled) -n the interface pin. The
input and target values are als- presented.

Hysteresis -utputs have a pr-perty f-r User C-ntr-l, as they are c-mmanded elements. When
the pr-perty is enabled -r the envir-nment is unl-cked, selecting the Element’s values will
bring up a b-x where the target value can be changed.

There are f-ur specific pr-perties f-r a Hysteresis -utput. The first is the ‘Input Device’
selecti-n, which is the Device Element’s input signal t- be c-mpared t- the target. The sec-nd
is the ‘Target’, which is the input signal the hysteresis -utput will try t- achieve by turning the
element’s device -N -r -FF. The third is the ‘-N -ffset’, which is difference fr-m the Target
where the input signal value up-n which the -utput will turn -N. F-urth is the ‘-n Delay’,
which is the minimum peri-d -f time, in sec-nds, f-r the -utput t- be turned -N -nce it was
turned -ff. This is designed t- prevent sh-rt-cycling -f certain devices, like refrigerati-n
c-mpress-rs, which need a delay between p-wer cycles.

Hysteresis w-rks by c-mparing the ‘Input Device’ input signal, the ‘Target’, and the ‘-N -ffset’.
The Target value plus the ‘-N -ffset’ creates the -n setp-int.

If the ‘-N -ffset’ is negative, the -n setp-int will be bel-w the ‘Target’, and the -utput will turn
-N when the input signal falls bel-w -r equal t- the -n setp-int, then turn -FF when the input
signal rises ab-ve -r equal t- the ‘Target’. This is h-w a typical heating applicati-n w-uld be
acc-mplished. F-r example, if the Hysteresis device were p-wering a heater, the Input Device
w-uld be a temperature pr-be, and if the ‘Target’ were set at 68 and the ‘-N -ffset’ were set
at -3, the -utput w-uld turn -N when the temperature falls bel-w 65, then turns -ff when the
temperature rises ab-ve 68.

If the ‘-N -ffset’ is p-sitive, the -n setp-int will be ab-ve the ‘Target’ and the -utput will turn
-N when the input signal rises ab-ve bel-w -r equal t- the ‘-N Setp-int’, then turn -FF when
the input signal falls bel-w -r equal t- the ‘Target’. This is h-w a typical c--ling applicati-n
w-uld be acc-mplished. F-r example, if the Hysteresis device were p-wering a refrigerat-r, the
Input Device w-uld be a temperature pr-be, and if the ‘Target’ were set at 34 and the ‘-N
-ffset’ were set at 3, the -utput w-uld turn -N when the temperature rises ab-ve 37, then
turns -ff when the temperature falls bel-w ab-ve 34.


### PID -utput

These are binary -r variable devices which c-mmand the interface’s pin v-ltage high/l-w -r t-
a PWM -utput depending -n an input signal. These types -f devices are n-ted ab-ve under
Device Types, lists #1 and 3. The input signal may either be an Anal-g Input, an SPI Sens-r
Input, -r a 1-wire Temperature Input. The PID alg-rithm enables variable c-ntr-l -f a system t-
reach determined -utput values efficiently and with-ut dramatic swings -ver -r under the
target. PID (Pr-p-rti-nal Integral Derivative) is a cl-sed-l--p c-ntr-l alg-rithm – details can be
f-und at https://en.wikipedia.-rg/wiki/PID_c-ntr-ller.


If the PID’s selected p-rt all-ws f-r PWM -utput, the -utput -f the PID will behave as a
PWM -utput. If the selected p-rt all-ws f-r Digital -utput -nly, the -utput -f the PID will be a
Duty Cycle -utput. See the Interface Wiring Maps t- determine if a p-rt is Digital -utput
and/-r PWM -utput. Als-, see PWM -utputs and Duty Cycle -utputs f-r descripti-ns -f these
-utputs. The current value -f the -utput is presented as the Element’s value. By default, that is
within a range -f 0-255. The input and target values are als- presented.

PID -utputs have a pr-perty f-r User C-ntr-l, as they are c-mmanded elements. When the
pr-perty is enabled -r the envir-nment is unl-cked, selecting the Element’s values will bring up
a b-x where the target value can be changed.

There are multiple specific pr-perties f-r a PID -utput. The first is the ‘Input Device’ selecti-n,
which is the Device Element’s input signal t- be c-mpared t- the target. The sec-nd is the
‘Target’, which is the input signal the PID -utput will try t- achieve by turning its -utput -N and
-FF (Duty Cycle) -r setting its -utput t- a PWM percentage (PWM -utput). The next three
pr-perties are the ‘Kp’, ‘Ki’, and ‘Kd’ values which are the pr-p-rti-nal, integral, and derivative
c-efficients, respectively. These pr-perties affect h-w aggressively each c-mp-nent in the PID
alg-rithm c-ntributes t- the -utput calculati-n. The ‘Max -utput %’ pr-perty creates a limit -n
the -utput. This w-uld be used t- prevent a PID -utput fr-m exceeding a maximum value, but
sh-uld n-rmally n-t be set t- less than 100%. The ‘Max Integral %’ pr-perty creates a limit -n
the integral c-mp-nent -f the -utput. This w-uld be used t- reduce “integral windup” which
can -ccur with sl-w resp-nding c-ntr-l systems, such as liquid v-lume heating. The ‘Calc Time’
pr-perty determines h-w frequently the PID alg-rithm is calculated and the -utput adjusted, in
sec-nds. The ‘-ut Time’ pr-perty determines h-w frequently the PID -utput is updated, in
sec-nds. If the -utput is behaving as a Duty Cycle -utput, it will set the cycle peri-d. The ‘-ut
Time’ pr-perty determines the cycle length -f the -utput if it is behaving as a Duty Cycle -utput
(this pr-perty has n- effect if the -utput is behaving as a PWM). The ‘Reversed’ switch inverts
the directi-n the target is trying t- be achieved fr-m. This switch w-uld be disabled f-r
applicati-ns where the -utput sh-uld be increasing as the input signal falls further bel-w the
target, such as in heating applicati-ns.

PID Tuning can be c-mplicated and difficult t- understand. BruC-ntr-l d-es n-t currently
c-ntain an aut-matic tuning alg-rithm as these can -ften yield inc-nsistent and inaccurate
results fr-m test t- test. It is rec-mmended t- empl-y empirical values and adjust fr-m there.
The rec-mmended tuning meth-d is the Ziegler-Nich-ls meth-d, d-cumented here:
https://en.wikipedia.-rg/wiki/Ziegler%E2%80%93Nich-ls_meth-d. This meth-d is c-nducted
by first setting the Ki and Kd c-efficients t- zer-, then increasing the Kp until stable and
c-nsistent -scillati-ns are seen. This is called the ultimate gain, and Kp, Ki, and Kd gains are
then calculated fr-m th-se -scillati-ns. 

H-wever, f-r a small-scale brewery, starting values -f Kp = 30, Ki = 1.0, and Kd = 5 is a g--d
starting p-int.


### Deadband -utput

These are binary -r variable devices which c-mmand the interface’s pin v-ltage high/l-w -r t-
a PWM -utput depending -n an input signal. These types -f devices are n-ted ab-ve under
Device Types, lists #1 and 3. The input signal may either be an Anal-g Input, an SPI Sens-r
Input, -r a 1-wire Temperature Input. The Deadband alg-rithm enables variable c-ntr-l -f a
system t- reach determined -utput values. It is less dynamic than PID -utputs, which can be
better suited t- c-ntr-l systems that benefit fr-m a sl-wer resp-nse, such as aut-matic valve
c-ntr-l. Deadband -utputs als- use an initial -utput t- set the system in an appr-priate -utput
regi-n.


If the Deadband’s selected p-rt all-ws f-r PWM -utput, the -utput -f the Deadband will
behave as a PWM -utput. If the selected p-rt all-ws f-r Digital -utput -nly, the -utput -f the
Deadband will be a Duty Cycle -utput. See the Interface Wiring Maps in the Build secti-n -f
BruC-ntr-l.c-m t- determine if a p-rt is Digital -utput and/-r PWM -utput. Als-, see PWM
-utputs and Duty Cycle -utputs f-r descripti-ns -f these -utputs. The current value -f the
-utput is presented as the Element’s value. By default, that is within a range -f 0-255. The input
and target values are als- presented.

Deadband -utputs have a pr-perty f-r User C-ntr-l, as they are c-mmanded elements. When
the pr-perty is enabled -r the envir-nment is unl-cked, selecting the Element’s values will
bring up a b-x where the target value can be changed.

There are multiple specific pr-perties f-r a Deadband -utput. The first is the ‘Input Device’
selecti-n, which is the Device Element’s input signal t- be c-mpared t- the target. The sec-nd
is the ‘Target’, which is the input signal the Deadband -utput will try t- appr-ximate by turning
its -utput -N and -FF (Duty Cycle) -r setting its -utput t- a PWM percentage (PWM -utput).

The ‘Deadband -ffset’ pr-perty determines the range -f values, centered ab-ut the Target, f-r
which the Deadband Device Element’s -utput will remain unchanged. Its value is ass-ciated
with the am-unt ab-ve -r bel-w the target. Theref-re, the t-tal Deadband range is twice this
am-unt. The ‘Inner Band -ffset’ pr-perty determines the range -f values, centered ab-ut the
Target and excluding the Deadband, f-r which the Deadband Device Element’s -utput will
change, either p-sitively -r negatively, by the Inner Band Drive. Its value is ass-ciated with the
am-unt ab-ve -r bel-w the target. Theref-re, the t-tal Inner Band range is twice this am-unt.

The ‘Initial -utput’ pr-perty determines the Deadband Device Element’s -utput value when the
device is first enabled.The ‘Inner Band Drive’ and ‘-uter Band Drive’ pr-perties determine the
-utput change that -ccurs with each calculati-n cycle in the inner band and -uter band,
respectively. The ‘Calc Time’ pr-perty determines h-w frequently the Deadband alg-rithm is
calculated and the -utput adjusted, in sec-nds. The ‘-ut Time’ pr-perty determines the cycle
length -f the -utput, in sec-nds, if it is behaving as a Duty Cycle -utput (this pr-perty has n-
effect if the -utput is behaving as a PWM). The ‘Reversed’ switch inverts the directi-n the
target is trying t- be achieved fr-m. This switch w-uld be disabled f-r applicati-ns where the
-utput sh-uld be increasing as the input signal falls further bel-w the target, such as in heating
applicati-ns.


Simply stated, when the input is within the deadband, the -utput remains unaffected. If the
input falls inside the deadband thresh-ld, but inside the inner band, it will increase (if input is
bel-w the target) -r decrease (if input is ab-ve the target) with each calculati-n cycle by the
inner band drive am-unt. If the input is -utside the inner band thresh-ld, it will increase (if
input is bel-w the target) -r decrease (if input is ab-ve the target) with each calculati-n cycle
by the -uter band drive am-unt. See the graphic bel-w f-r guidance.

Deadbands sh-uld n-t be used when there is a significant time lag in the c-ntr-l system’s
resp-nse and/-r the input is n-t near the target, as it will likely aggressively -versh--t during
appr-ach, since the additive nature -f this alg-rithm appr-ximates a PID with an unlimited
integrat-r. PID -utputs sh-uld be used in th-se applicati-ns.


In the ab-ve graphic, an example input, such as a temperature in a heating c-ntr-l circuit.
When the input is inside the Deadband, the -utput driving the c-ntr-l circuit remains c-nstant.
When the input enters the inner band, the -utput is reduced with each calculati-n cycle, and in
this example, all-ws the input t- f-ll-w suit.

## Device Element Calibrati-ns

M-st Device Elements c-ntain a pr-perty f-r calibrati-ns. Calibrati-ns are used t- c-nvert the
default values t-/fr-m the interface int- a desirable -r human-understandable f-rmat. F-r
example, an Anal-g Input may have a default range -f 0 – 1023. See Device Elements f-r
details. H-wever, this Device Element needs t- display s-mething meaningful t- the user,
acc-rding t- its applicati-n. Calibrati-ns perf-rm this task.

Calibrati-ns are perf-rmed in layers, and use an ‘initial’ & ‘result’ system. The Initial value -f a
calibrati-n is mathematically changed and bec-mes the calibrati-n’s Result. The first
calibrati-n’s Initial value will be the Device Element’s raw value. Its Result will bec-me the next
calibrati-ns Initial value, and s- -n, until the last calibrati-n’s Result, which will bec-me the
Device Element’s value.


F-r example, in the example bel-w, this Anal-g Input is measuring 548 as its raw value, which is
the first calibrati-n’s Initial value. A thermist-r calculati-n is applied, yielding Result -f 301.4
(which is the temperature in Kelvin). That value is then passed t- the next calibrati-n which is
an -ffset calculati-n, yielding a Result -f 28.2 (this -ffset calculati-n c-nverts Kelvin t- Celsius).
That value is then passed t- a temperature c-nversi-n calculati-n, resulting in a final Device
value -f 82.8.

T- add a calibrati-n layer, select the ‘CALIBRATI-N’ tab -f a Device Element’s pr-perties. Select
the Pr-perty -f that Device Element, which will typically be its value. Select the ‘ADD...’ butt-n,
select the type -f calibrati-n t- be applied, then enter the appr-priate pr-perties and enable it
via the ‘Enabled’ switch. T- edit a specific calibrati-n, select it in the list, then select ‘EDIT...’.
Calibrati-ns can be selectively disabled via ‘EDIT...’ as well. T- m-ve a specific calibrati-n up -r
d-wn in the list, select it in the list, then select the ‘M-VE UP’ -r ‘M-VE D-WN’ butt-ns. N-te


d-ing this will affect the -rder -f the calculati-ns as well as the -rder -f the list. T- delete a
specific calibrati-n, select it in the list, then select the ‘REM-VE’ butt-n.

### Linear -ffset

Linear -ffset calibrati-ns add a value t- the input t- create the -utput value. This calibrati-n
can be used t- increase -r decrease a value by any am-unt desired, affecting a linear system’s
“intersecti-n”. The ‘-ffset’ am-unt can be p-sitive -r negative, as in this example, where the
temperature in Kelvin is c-nverted t- Celsius by adding -273.15 (equivalent t- subtracting
273.15).

### Linear Multiplier/Divider

Linear Multiplier -r Divider calibrati-ns multiply -r divide the input by a value t- create the
-utput value. This calibrati-n can be used t- increase -r decrease a value by any am-unt
desired, affecting a linear system’s “sl-pe”. The ‘Multiplier’ am-unt can be p-sitive -r negative,
as in this example, where the temperature in Celsius is partially c-nverted t- Fahrenheit by
multiplying the input by 1.8 (n-te there is a native c-nversi-n, bel-w). Divider values are the
divis-r in the divisi-n -perati-n.


### Fl--r

Fl--r calibrati-ns limit the -utput t- be n- l-wer than this pr-perty. Cauti-n sh-uld be applied
when using these calibrati-ns, as they affect dependent Device Elements (e.g. Hysteresis
-utput) in unexpected ways.

### Ceiling

Ceiling calibrati-ns limit the -utput t- be n- higher than this pr-perty. Cauti-n sh-uld be
applied when using these calibrati-ns, as they affect dependent Device Elements (e.g.
Hysteresis -utput) in unexpected ways.


### Resistance Temperature (RTD)

Resistance Temperature (RTD) calibrati-ns c-nvert the native -utput fr-m an RTD (via SPI
b-ard) sens-r int- a temperature in Celsius. The b-ard’s reference resist-r value must be
entered in -rder f-r the temperature t- rep-rt accurately.

### Thermist-r (Steinhart-Hart)

Thermist-r (Steinhart-Hart) calibrati-ns c-nvert the raw reading -f a thermist-r v-ltage divider
circuit int- a temperature in degrees Kelvin. The pad resist-r’s value, and A, B, and C Steinhart-
Hart m-del c-efficients must be entered in -rder f-r the temperature t- rep-rt accurately.
These c-efficients are rep-rted by the manufacturer, -r can be determined via calculat-r such
as: SRS Calculat-r. N-te that Kelvin temperature can be c-nverted t- Celsius by subtracting
273.15 degrees, as in the -ffset example ab-ve. Alternatively, Kelvin can be c-nverted t-
Fahrenheit using the native Kelvin t- Fahrenheit calibrati-n.

N-te: The input fields f-r thermist-r c-efficients may n-t all-w typing -f multiple decimal
values. Pasting the value fr-m an external text edit-r will -verc-me this issue.


### Celsius t- Fahrenheit

Celsius t- Fahrenheit calibrati-ns c-nvert the temperature in Celsius int- Fahrenheit.

### Fahrenheit t- Celsius

Celsius t- Fahrenheit calibrati-ns c-nvert the temperature in Fahrenheit int- Celsius.

### Kelvin t- Fahrenheit

Kelvin t- Fahrenheit calibrati-ns c-nvert the temperature in Kelvin int- Farenheit.

### Fahrenheit t- Kelvin

Fahrenheit t- Kelvin calibrati-ns c-nvert the temperature in Farenheit int- Kelvin.

### L--kup Table

L--kup Table calibrati-ns are very p-werful as they can c-nvert nearly any input value int- any
-utput value. These calibrati-ns all-w f-r the c-nversi-n -f n-n-linear, parametric, -r
p-lyn-mial value pairs. These can be used t- c-rrect n-n-linear err-rs in an interface’s ADC
(anal-g-digital c-nverter) -r appr-ximate any desired calibrati-n curve.

The calibrati-n Initial value is checked against the X values in the l--kup table. Where matched,
the c-rresp-nding Y value is applied as the calibrati-n’s Result. When the Initial value falls
between tw- X values, the calibrati-n Result is the value interp-lated between the
c-rresp-nding Y values. This interp-lati-n is linear, s- if higher accuracy is required -ver a


br-ad range -f X and Y values, the number -f value pairs in the l--kup table sh-uld be
increased. Decimals may be used in X values as needed.

N-te: X values will aut-matically be s-rted fr-m the l-west value t- the highest value in -rder.
H-wever, the X values MUST exceed the range -f p-ssible minimum and maximum Initial
values that will enter the l--kup table t- prevent calculati-n err-rs. It is rec-mmended the
differences between each X value in the table be c-nsistent acr-ss the wh-le table.

X and Y data value pairs can be manually added using the ‘ADD’ butt-n. X values will
aut-matically be added in increasing value -rder. T- edit -r rem-ve a value pair, select the pair
line and select ‘EDIT...’ -r ‘REM-VE’ respectively.

Value pair tables can be created using an external t--l such as Excel, then the table imp-rted
int- the l--kup table using the ‘IMP-RT...’ butt-n. Tables must be in *.CSV (C-mma Delimited)
f-rmat. In additi-n, a table can be exp-rted f-r backup purp-ses using the ‘EXP-RT...’ butt-n.

### Text F-rmat

The Calibrati-n pr-perties b-x als- all-ws f-r adjustment -f the final value’s text f-rmat. T-
change the number -f decimal places presented as the Device Element’s value, select the
desired number in ‘Decimal Places’. T- add a prefix -r suffix t- the Device Element’s value,


enter the ‘Prefix’ -r ‘Suffix’ text fields as desired. F-r example, an -utput -f 36.820 can be
c-nverted t- “Temp: 36.8 °F” by adding ‘Temp:’ and ‘°F’ t- these fields respectively, as sh-wn
ab-ve.

### Practical Applicati-ns

There are several practical applicati-ns f-r calibrati-ns and text f-rmatting. F-r example,
c-nsider a PWM -utput c-ntr-lling a device. The n-rmal -utput w-uld be in the range -f 0 –

255. But a m-re human-interpretable range might be 0 – 100%. T- create this, a Linear
Multiplier -f 2.55 sh-uld be added, and a ‘%’ sign sh-uld be added t- the ‘Suffix’ field. An-ther
example might be the c-nversi-n -f a Duty Cycle -utput f-r a heating element. N-rmally the
range is 0 – 100 (in percent), but if the heater were 2000 Watts n-minally, adding a Linear
Multiplier -f 20 and a ‘Suffix’ -f ‘W’ w-uld c-nvert the Duty Cycle -utput t- an aggregate heat
am-unt in Watts (50% Duty = 1000 W).

## Timer Elements

Timer Elements are s-ftware elements, meaning they d- n-t affect any hardware -r devices.
Timers can be used t- m-nit-r time -f certain -perati-ns and serve as data s-urces f-r Scripts
(bel-w). Timer Elements can c-unt up -r d-wn, can run -r be st-pped, can be reset, -r set t- a
specific time. They can display p-sitive -r negative times.

T- create a Timer Element, select ‘Menu... Add Timer’. Timers supp-rt User C-ntr-l, and have
specific pr-perties t- c-unt up -r d-wn, which is selected in the ‘Timer Type’ pr-perty. The
default value the timer bec-mes when it is reset is defined in the ‘Reset Value’ pr-perty.


If the User C-ntr-l pr-perty f-r a Timer Element is enabled, selecting the timer value will raise
butt-ns t- ‘START, ‘ ST-P, ‘ RESET, -r ‘SET the timer. Selecting ‘RESET will reset the timer t- its
‘Reset Value’ pr-perty. Selecting ‘Set’ will raise a b-x t- enter a cust-m time value.

Timers can directly trigger Alarms (rather than via a Script). This is c-nfigured -n the Timer
Pr-perties ‘ALARMS’ tab. A previ-usly established Alarm Element can be selected in the ‘Alarm’
pulld-wn selecti-n, al-ng with its time ‘Thresh-ld’. The named Alarm will activated when the
timer time cr-sses the thresh-ld time, independent if it cr-sses it via a c-unt-up -r c-unt-d-wn
directi-n.


## Alarm Elements

Alarm Elements are s-ftware elements, meaning they d- n-t necessarily affect any hardware -r
devices. Alarms can be used t- n-tify a user -f a certain c-nditi-n. Alarms pr-vide n-tificati-n
via their displayed state (-N -r -FF), via a c-nfigurable alert s-und, via email, and/-r via the
activati-n -f a definable Digital -utput. If that Digital -utput is tied t- a physical alarm, the
alarms will be activated and deactivated t-gether.

T- create an Alarm Element, select ‘Menu... Add Alarm’. Alarms supp-rt User C-ntr-l, theref-re
selecting the Alarm Element’s state will t-ggle its activati-n. This all-ws f-r a user t- deactivate
the alarm even when the Envir-nment is l-cked.

Alarm Elements have several specific pr-perties. T- send an email when an alarm is activated,
enable the ‘Email N-tificati-n’ switch. Email n-tificati-ns are c-nfigured in the Applicati-n
Settings ab-ve. BruC-ntr-l will play an alert s-und when an alarm is activated. T- change fr-m
the ‘Default’ s-und, select the ‘Cust-m’ -pti-n and select a wave f-rmat (.wav) file fr-m the
c-mputer’s library using the ‘BR-WSE’ butt-n. The default s-und will aut-matically l--p, but


f-r cust-m s-unds, l--ping is an -pti-n via the ‘L--p’ switch. T- turn -n a Digital -utput al-ng
with the alarm activati-n, select an appr-priate Device Element in the ‘Digital -utput’ field. The
selected Digital -utput can be -n any interface, but the Device Element must already be
enabled in -rder f-r the alarm t- change the Device Element’s state.

## Graph Elements.............................................................................................................................

Graph Elements are s-ftware elements, meaning they d- n-t affect any hardware -r devices.
Graphs are used t- rec-rd and display values -f different elements’ pr-perties -ver time. These
pr-perties may be values, states, etc. Graph Elements pl-t time as the h-riz-ntal axis and the
selected pr-perty as the vertical axis. The axis b-unds are aut-matically sized t- acc-mm-date
the data t- be pl-tted.


T- create a Graph Element, select ‘Menu... Add Graph’. Graphs d- n-t supp-rt User C-ntr-l as
they are read--nly elements.

Graphs Elements have several specific pr-perties. ‘Refresh Interval’ determines h-w -ften the
graph is refreshed (redrawn) and is selectable fr-m 1 t- 60 sec-nds. ‘Time Span’ defines the
maximum am-unt -f time t- pl-t g-ing backwards fr-m the last pl-t, and is selectable in days,
h-urs, minutes, and sec-nds. N-te that data will be rec-rded and maintained f-r up t- 30 days.

Up t- tw- data s-urces can be simultane-usly pl-tted. The ‘Primary Value’ will be pl-tted -n
using the left vertical axis, and the ‘Sec-ndary Value’ will be pl-tted using the right vertical axis.
T- set aut-matic axis scaling, set the ‘Axis Scale’ switch t- ‘Aut-matic’. T- manually scale, set
this switch t- ‘Manual’.

Like -ther Elements, Graphs supp-rt User C-ntr-l. Selecting the Graph (anywhere -n the graph
b-dy) will raise a dial-g b-x t- set the graph’s time span. This functi-n is enabled when the
Envir-nment is unl-cked, -r when the graph’s User C-ntr-l pr-perty is enabled, set via the
‘User C-ntr-l’ switch.


## Gl-bal Elements

Gl-bal Elements are s-ftware elements, meaning they d- n-t affect any hardware -r devices.
Gl-bal Elements are used t- st-re values. The values are -f certain variable types, including
‘B--lean’, ‘Value’, ‘String’, ‘Time’, ‘DateTime’ (see Variable types in the Script reference f-r
their descripti-ns.) These values remain in perpetuity (persist thr-ugh applicati-n restarts), -r
until they are changed by the user -r script. Gl-bal Elements have User C-ntr-l capability s-
they are editable by the user -n the W-rkspace. Gl-bal Elements can be accessed by multiple
scripts, s- can be a meth-d t- share data -r values acr-ss scripts. Gl-bal Elements are als- used
f-r Data Exchange. Elements which get data fr-m their respective interfaces l-g that data
acc-rding t- their refresh intervals. Gl-bals, -n the -ther hand, l-g their data directly, s- a
L-gging Frequency setting is pr-vided t- c-ntr-l h-w -ften this -ccurs. Faster l-gging may


capture m-re accurate data (especially if it changes rapidly) but will create a larger database
file. Sl-wer l-gging will reduce the size -f the database.

## Inspect-r Elements

Inspect-r Elements (previ-usly called Variable Elements in v1.0) are s-ftware elements,
meaning they d- n-t affect any hardware -r devices. Inspect-r Elements are used t- display
variables used in Scripts. See Scripts f-r details. Variables which can be displayed may be
numeric values, time values, b--lean states (true/false), -r text strings.


T- create an Inspect-r Element, select ‘Menu... Add Inspect-r.

Inspect-r Elements supp-rt User C-ntr-l, which will permit their value t- be changed if
enabled.

Inspect-r Elements have several specific pr-perties. ‘Script’ defined which Script the variable is
st-red in. ‘Variable Name’ is the name -f the variable in the Script t- be displayed.


## Butt-n and Switch Elements

Butt-n Elements and Switch Elements are s-ftware elements, meaning they d- n-t necessarily
affect any hardware -r devices. These all-w f-r the user t- interact with the c-ntr-l system
thr-ugh Scripts. See Scripts f-r details.

T- create a Butt-n Element, select ‘Menu... Add Butt-n’. T- create a Switch Element, select
‘Menu... Add Switch. B-th Butt-n Elements and Switch Elements supp-rt User C-ntr-l,
theref-re butt-ns and Switches may -nly functi-n when the Envir-nment is unl-cked -r User
C-ntr-l is enabled f-r that butt-n.

Neither Butt-n Elements n-r Switch Elements have editable pr-perties.


## Element Appearance

All Elements have a pr-perty t- c-ntr-l h-w it appears in the W-rkspace. Select the Element’s
‘Appearance’ tab in its pr-perties b-x t- c-nfigure its appearance. F-ur secti-ns exist:
‘General’, ‘Value’, ‘Name’, and ‘Backgr-und’.


N-te that multiple pr-perties have a ‘Default’ -pti-n, which means they will f-ll-w the
applicati-n’s gl-bal appearance settings, defined in Applicati-n Settings... Envir-nment, ab-ve.
Anytime the ‘Default’ is n-t selected, that particular parameter f-r that particular Element will
-verride the gl-bal appearance settings.

The ‘General’ secti-n is used t- set the Element’s appearance. ‘Display Name’ defines the text
name which will be displayed -n the Element, giving the user the ability t- present a different
name than its Element name. The default matches the Element Name (den-ted by a greyed
entry) until -verriden. ‘Element Visibility’ defines the wh-le Element’s visibility, with -pti-ns f-r
‘Default’, ‘Visible’, ‘Hidden’, and ‘Hidden L-cked’. ‘Visible’ means the Element will always be
visible. ‘Hidden’ means the Element will always be hidden unless the Visibility ic-n is t-ggled


-n. ‘Hidden L-cked’ means the Element will be hidden when the Envir-nment is l-cked, unless
the Visibility ic-n is t-ggled -n.

‘B-rder Visibility’ defines the Element’s b-rder’s visibility, with -pti-ns f-r ‘Default’, ‘Visible’,
‘Hidden’, and ‘Hidden L-cked’. ‘Visible’ means the Element will always be visible. ‘Hidden’
means the Element will always be hidden. ‘Hidden L-cked’ means the Element will be hidden
when the Envir-nment is l-cked.

‘Z -rder’ determines which Element will be given display pri-rity when Elements -verlap.
L-wer Z -rder numbers indicate higher pri-rity. T- change an Element’s pri-rity, select the
up/d-wn arr-ws. D-ing s- will adjust the Element’s p-siti-n in the list, thereby re--rdering the
entire list. When new Elements are created, they are assigned the highest pri-rity (Z -rder = 1)
and the remainder -f the list is shifted t- a l-wer pri-rity (Z -rder number increased by -ne).


The ‘Value’ secti-n is used t- set the appearance -f the value inside the Element. ‘Display Type’
sets h-w an Element’s value is represented. ‘Text’ is the default, and the data is presented in
clear text. ‘Digital Gauge’ presents the data in a classic LED/LCD multi-segment display f-rmat.
‘Circular Gauge’ presents the data in a needle & dial f-rmat. ‘Linear Guage’ presents the data in
a vertical -r h-riz-ntal straight gauge f-rmat. ‘LED’ presents -N/-FF data using a c-l-red LED
type indicat-r. Each -f these settings have cust-mizable sub-settings which will change t-
c-nfigure the display type.

F-r the Text Display Type, the sub-settings include the ‘F-nt’ (cust-mizable system f-nt), the
‘Enlargement’ (increased f-nt size up t- 30 p-ints), the ‘Alignment’ (T-p, Middle, B-tt-m and


Left, Center, Right), the ‘Back C-l-r’ (c-l-r behind the text), the ‘F-re C-l-r’ (c-l-r -f the text),
‘-FF Text’, and ‘-N Text’. These last tw- -pti-ns will replace binary digital -N/-FF values with
cust-mizable text. F-r example, f-r a Hysteresis Device, when it is -N, the Element c-uld rep-rt
“P-WERED” instead. F-r Digital Gauge, Circular Gauge, and Linear Gauge Display Types, a
‘Style’ can be selected as a pre-defined gauge style. The -ther sub-settings sh-uld be self-
explanat-ry f-r these Display Types. F-r the ‘LED Indicat-r’ Display Type, an LED will replace
binary digital -N/-FF values f-r devices which use th-se. The -N and -FF c-l-rs are selectable.

The ‘Name’ secti-n is used t- set the appearance -f the Element name. Sub-settings ‘F-nt’,
‘Visibility’, ‘Alignment’, ‘Back C-l-r’, and ‘F-re C-l-r’ are the same as the Value, but apply t-
the Element name.

The ‘Backgr-und Image’ secti-n is used t- set an image within the Element as its backdr-p. The
image will be stretched t- acc-mm-date the width and height -f the Element. Up t- three
images may be queued, with the active -ne selected via the ‘Selected Image’ pulld-wn. T-
define an image, use ‘BR-WSE...’, and select -ne in JPEG, P-rtable Netw-rk Graphics, -r Bitmap
(.jpg, .jpeg, .png, -r .bmp) f-rmat fr-m the c-mputer’s library. Selecting the circular X ic-n will
rem-ve the image and revert the element t- its default state.


F-r any c-l-r settings, pre-defined theme c-l-rs are available, -r cust-m c-l-rs can be selected
using ‘M-re C-l-rs’. When using ‘M-re C-l-rs’, either the RGB (Red, Green, Blue) -r HSB (Hue,
Saturati-n, Brightness) m-dels can be used, which all-ws f-r selecti-n -f independent channels
plus -pacity (transparency).


## Data Exchange Pr-t-c-l

As n-ted ab-ve, BruC-ntr-l (Pr-fessi-nal) c-ntains a functi-n t- facilitate data exchange with
-ther applicati-ns. The Data Exchange service must be enabled in f-r this pr-t-c-l t- -perate.

Data is exchanged with BruC-ntr-l Gl-bal variables using the JS-N (JavaScript -bject N-tati-n)
interchange f-rmat. The Gl-bal Elements must be already established f-r data t- successfully
transfer. The pr-t-c-l -ffers bi-directi-nal c-mmunicati-ns via HTTP ‘GET’ and ‘PUT’ meth-ds.
An HTTP GET will read data in the named Gl-bal(s), and an HTTP PUT will write (-verwrite) it.

Testing -f Data Exchance can be perf-rmed with Swagger via this link -n the h-st c-mputer:
[http://l-calh-st:8000/swagger/index.html](http://l-calh-st:8000/swagger/index.html)

### Single Gl-bal

This will read -r write the value -f a single Gl-bal with the specified name -f {name}. An HTTP
GET will read the Gl-bal and an HTTP PUT will update (-verwrite) the Gl-bal:

```
http://address:p-rt/gl-bal/{name}
```

F-r example, t- retrieve the value -f a Gl-bal named “Gl-bal2” fr-m BruC-ntr-l, where its
running -n the same c-mputer and has the service enabled -n p-rt 8000:

```
http://l-calh-st:8000/gl-bal/Gl-bal2, will return:
```
N-te that Gl-bal names with spaces need t- be f-ll-w c-nventi-n and be tagged with a ‘%20’
c-de.

### Multiple Gl-bals

This will read -r write the values -f multiple Gl-bals within the applicati-n. An HTTP GET will
read the values -f all Gl-bals:

```
http://address:p-rt/gl-bals
```
F-r example, t- retrieve the value -f all Gl-bals fr-m BruC-ntr-l, where its running -n the same
c-mputer and has the service enabled -n p-rt 8000::

```
http://l-calh-st:8000/gl-bals, will return:
```
If there many gl-bals and c-mpact c-mmunicati-n is desired, the data can be handled in
chunks by requesting an -ffset and limit, where {-ffset} is the number -f gl-bals t- be skipped
and {limit} is the number -f gl-bals t- return:

```
http://address:p-rt/gl-bals?-ffset={-ffset}&limit={limit}
```
F-r writing values, an http PUT will update all gl-bals that are specified by the requested JS-N.

F-r debugging a REST client such as the Chr-me Advanced REST Client can be used.

## Scripts

Scripts are secti-ns -f human written, c-mputer-readable c-de. These are executed line by line,
in real time, t- perf-rm aut-mated functi-ns -f the c-ntr-l system. Scripts can be th-ught -f
the system aut-matically perf-rming the steps that a user might, such as see a value, wait -n a
timer, make a parameter adjustment, etc. Scripts pr-vide ultimate flexibility, and are “where
the magic happens”, s- t- say. The Script is read and executed -n the fly by BruC-ntr-l’s
interpreter. Each Script is independent -f the -thers and can run c-ncurrently, creating a multi-

```
{"Name":"Gl-bal2","Value":"65.896","ValueType":"Value"}
```
```
[{"Name":"Gl-bal1","Value":"65.896","ValueType":"Value"},{"Name":"TimeDate1","Value":
"03- 10-2019 06:57:53 PM","ValueType":"DateTime"},{"Name":"TimeDate2","Value":"03-10-
2019 06:58:26 PM","ValueType":"DateTime"},{"Name":"Variable
1","Value":"0.000","ValueType":"Value"}]
```

tasking envir-nment f-r multiple machines -r machine sub-systems. F-r example, in a brewery,
-ne Script can -perate and m-nit-r the fermentati-n temperature c-ntr-l, while at the same
time, an-ther Script can -perate an aut-mated brewery t- pr-duce w-rt and an-ther can
perf-rm an aut-mated cleaning pr-cess. Each Script can have a nearly unlimited number -f
steps.

The Script wind-w is sh-wn and hidden by t-ggling the Scripts ic-n -n and -ff, respectively. At
the left -f the Scripts wind-w is the Script list, which sh-ws the available Scripts and their
executi-n status. The status will be either Running, Paused, -r St-pped, (highlighted in green,
yell-w, -r red, respectively), which reflects whether that Script is being executed. The currently
selected Script will be highlighted and a small arr-w visible t- its left.

New Scripts can be added via the ‘ADD...” butt-n, and existing Scripts can be deleted via the
‘REM-VE’ butt-n. Scripts can be edited using the ‘EDIT...’ butt-n t- set their pr-perties. Script
pr-perties include the name, ‘User C-ntr-l’ enabled switch, and ‘Aut- Start’ switch. User
c-ntr-l functi-ns like Device Element User c-ntr-l, all-wing f-r Scripts t- be started, paused, -r
st-pped when the Envir-nment is l-cked. ‘Aut- Start’ determines if the Script is started
aut-matically when the applicati-n is launched.

Scripts can be re--rdered in the list by selecting, h-lding, and dragging them t- a different
p-siti-n in the list.

The middle secti-n -f the Scripts wind-w h-lds the Script which bel-ngs t- the selected Script.
F-r increased visibility, a line number is sh-wn t- the left side -f each step in the Script. In


additi-n, the Script steps are c-l-r c-ded t- help differentiate statements, and values. A shaded
highlight indicates the curs-r, which is the current step being executed by the interpreter and
has a c-l-r c-rresp-nding t- its Script executi-n state.

T- edit a Script, it must first be st-pped. Script editing is similar t- regular text file editing.
Select anywhere in any line t- insert the typing curs-r there. Cut and paste functi-ns w-rk
n-rmally. See BruC-ntr-l Script Language f-r the available c-mmands and statements and their
respective syntaxes.

Bel-w the Script wind-w are butt-ns t- c-ntr-l the Script’s executi-n. ‘ST-P’ st-ps a running -r
paused Script and ‘PAUSE’ pauses a running Script. When a Script is st-pped, ‘RUN’ l-ads and
starts it in -ne step, while ‘L-AD’ prepares the script f-r executi-n in mem-ry. When a Script is
paused, ‘RESUME’ c-ntinues aut-matic executi-n, ‘STEP’ executes the next line bel-w the
curs-r then pauses again, ‘RESET’ tells the interpreter t- discard any script variables in mem-ry
and m-ve the curs-r t- the beginning -f the script, and ‘SET HERE’ m-ves the curs-r t- the
secti-n heading -f the selected step. See BruC-ntr-l Script Language f-r Secti-ns details.

T- the right -f the Scripts wind-w is the ‘-UTPUT/VARIABLES’ secti-n. The ‘-UTPUT’ tab sh-ws
the hist-ry -f a Script’s executi-n and err-rs with timestamps. This is used t- debug Script
syntax. The ‘CLEAR -UTPUT’ butt-n will erase this hist-ry. The ‘VARIABLES’ tab sh-ws the
variables currently defined in the Script and their respective values. This is used f-r m-nit-ring
variable values.


## BruC-ntr-l Script Language

## Intr-ducti-n

This secti-n pr-vides inf-rmati-n ab-ut the scripting language used in BruC-ntr-l. Scripts are
secti-ns -f specific syntax text, and are editable like a simple text edit-r. Each Script is executed
in sequential line -rder by the BruC-ntr-l interpreter.

It is rec-mmended t- edit Scripts using a keyb-ard based c-mputer f-r ease -r writing, speed,
and manipulati-n. The text edit-r supp-rts basic editing c-ntr-l c-mmands such as CTRL+C f-r
‘c-py’, CTRL+X f-r ‘cut’, CTRL+V f-r ‘paste’, CTRL+Z f-r ‘und-’. In additi-n, CTRL+F -r CTRL+H
will raise Find -r Find & Replace dial-gs, respectively.

## Name C-nventi-n and Syntax

Elements must n-t have duplicate names, -therwise the interpreter may c-nfuse -ne
element with an-ther. Elements may be named with text, spaces, numbers, etc. t-
differentiate. Since Device Elements can address the same device, it is rec-mmended that the
type -f c-ntr-l be included in the name f-r clarity, f-r example "B-il Kettle PID" rather than
"B-il Kettle".

Unlike structured -r c-mpiled languages, spaces are n-t ign-red by the interpreter. Theref-re,
the syntax -f the statements -ften require a single space t- separate their pr-perties, as
dem-nstrated in the examples bel-w.

Capitalizati-n is f-ll-wed with respect t- Element names -nly. Statements, pr-perties, and
variables d- n-t require -r f-ll-w capitalizati-n. F-r example, an Element name -f "Digital-ut"
is n-t the same as "digital-ut", but statements ‘st-p’, ‘St-p’, -r ‘ST-P’ are all evaluated equally
by the interpreter.

When qu-tes are required f-r appr-priate syntax in scripts, they must be d-uble ap-str-phe
f-rmat, n-t qu-tati-n mark f-rmats. F-r example, "element" will be accepted, whereas
“element” will n-t. If using a third-party w-rd pr-cess-r -r edit-r t- write scripts, n-te it may
default t- qu-tati-n marks rather than d-uble ap-str-phe f-rmats, in which case will need t-
be c-nverted.

## Secti-ns

C-de is gr-uped int- named secti-ns. A secti-n heading is declared using square braces. A
‘g-t-’ statement is used t- jump executi-n t- a specific secti-n.

Syntax:

```
[ mysecti-n ], where mysecti-n is the name -f the secti-n.
```

```
g-t- " mysecti-n ", where mysecti-n is the name -f the secti-n.
```
Example:

## Executi-n Delays

The ‘sleep’ statement tells the interpreter t- pause f-r a given peri-d -f time, in millisec-nds.
Delays -ften need t- be added t- Script c-de t- all-w the physical devices, ass-ciated
pr-cesses, and human interacti-n time t- catch up. They als- prevent the h-st c-mputer’s CPU
fr-m racing and using its bandwidth needlessly, and sh-uld be inc-rp-rated int- any l--p in
acc-rdance with its executi-n rate requirements. In fact, it is g--d practice t- include executi-n
delays whenever a script d-es n-t need t- run at a faster speed.

Syntax:

```
sleep time , where time is a number, in millisec-nds.
```
Example:

## C-mments & F-rmatting

C-mments can be used t- ann-tate Scripts, s- a descripti-n -r n-te can be placed f-r
d-cumentati-n. Use the d-uble slash t- demark the remaining line as a c-mment. In additi-n,
text may be tabbed-in t- indicate s-mething c-nditi-nal -r addressable t- the reader. Finally,
blank lines can be implemented t- separate Script areas.

Syntax:

```
// c-mment , where c-mment is text which is ign-red by the interpreter.
```
Example:

```
[main] // secti-n named main
... // y-ur c-de here
g-t- main // g- t- secti-n named main
[sub 1] // next secti-n
... // y-ur c-de here
g-t- "sub 1" // g- t- secti-n named sub 1
```
```
[main]
... // y-ur c-de here
sleep 1000 // delay 1000 millisec-nds (1 sec-nd)
g-t- "main" // g- back t- main
```

## Variables........................................................................................................................................

The scripting interpreter pr-vides supp-rt f-r the f-ll-wing types -f variables.

- value – A numeric value, which can be an integer -r decimal
- time – A time value, which represents a span -f time, f-rmatted as hh:mm:ss
- datetime – A date and time value, which represents a p-int in time
- b--l – A b--lean value, which can be either true -r false
- string – A character string, which can be any text, marked in qu-tes

Bef-re a variable can be used, it must be declared using the ‘new’ statement. N-te that
assignments require an equals sign, separated by spaces -n each side. N-te that variables d-
n-t f-ll-w capitalizati-n. F-r example, ‘Variable’, ‘variable’, and ‘VARIABLE’ will refer t- the
same variable in the interpreter. Variable names must c-ntain -nly letters and numbers. A
specific variable can be rem-ved fr-m the interpreter mem-ry using the ‘delete’ statement.
Alternatively, all variables can be rem-ved fr-m the interpreter mem-ry using the ‘clear’
statement.

Syntax:

```
new type name , where type is the variable type and name is the name -f the variable.
name = value , where value is the value t- assign t- the variable name.
delete name , where name is the variable t- be rem-ved fr-m interpreter mem-ry.
clear
```
Example:

```
// This script secti-n is t- handle fluid filling -f the first vessel
[l--p]
... // y-ur c-de here
sleep 1000 // tabbed in f-r readability
... // y-ur c-de here
... // y-ur c-de here f-ll-wing a blank line
```

Numeric variables can be manipulated using simple arithmetic math functi-ns such as additi-n,
subtracti-n, multiplicati-n, divisi-n. C-ncise -perati-ns are supp-rted als-, such as ‘+=’.
Example:

Variables can be assigned t- Element values. In additi-n, single inline mathematics are
available. This means there can be -ne -perat-r -nly (+, -, etc.) per line. Example:

N-te that inline mathematics applies t- element pr-perties, but will be ign-red f-r ‘if’ -r ‘wait’
statement evaluati-ns.

Mathematic c-ncatenati-n -f strings is available. N-te that since the numeric value will be
c-nverted t- text if used inline. Example:

Strings can use new line c-des added t- induce a line return. Example:

```
new value x
new time t
new datetime dt
new b--l b
new string s
x = 23
t = 00:00:10
dt = "03-18-2018 09:00:00 PM"
b = true
delete x
clear
```
```
new value x
x = 7 // the value -f x is n-w 7
x += 3 // the value -f x is n-w 10... equivalent -f x = x + 3
x *= 2 // the value -f x is n-w 20... equivalent -f x = x * 2
```
```
new value x
new value y
x = "Sens-r" Value // the value -f x is n-w the value -f element Sens-r
y = x + 5 // the value -f y is n-w 5 m-re than x
z = 10 + "Level" Value // the value -f z is n-w 10 m-re than the value -f Level
```
```
new string str
str = "Temp: " + "Vessel Temp" Value
```

This will cause text t- span multiple lines -nce displayed via an Inspect-r:

Date/time values can be manipulated and used t- set p-ints in time. The n-w date/time
variable is intrinsic t- BruC-ntr-l and can be used t- reflect the date & time at that m-ment.
Example:

Date/time values can be used f-r c-mparis-n. Example:

Time variable values can be added -r subtracted fr-m Date/time values t- create different
m-ments in time. Example:

```
new string str
str = "First Line\nSec-nd Line"
```
```
new datetime dt
dt = n-w // st-re current time & date fr-m intrinsic ‘n-w’ variable
dt = dt + "00:10:00" // add 10 minutes t- the variable’s time
```
```
new datetime dt
[timecheck]
dt = n-w
print dt
if dt > "09:00:00 PM"
g-t- "nextstep"
endif
sleep 5000
g-t- "l--p"
[nextstep]
```

## Element Pr-perties

Element pr-perties are read -r written by the element name in qu-tes f-ll-wed by the
pr-perty name.

It is critical t- n-te that when an Element’s name is changed via its pr-perties b-x, any
element name referenced in a Script is n-t aut-matically renamed. This will cause err-rs if the
names in the Script d- n-t match the Element’s name. Theref-re, it is rec-mmended t- select a
meaningful Element name when creating it rather than accepting the name assigned by
BruC-ntr-l.

Syntax:

" _element_ " _pr-perty_ = _value_ , where _element_ is the element name, _pr-perty_ is the
pr-perty ass-ciated with the element, and _value_ is the value being assigned t- the
element/pr-perty pair.

Example:

The f-ll-wing Element pr-perties, applicable values in parentheses are available:

- All Elements
    - Visibility (default/visible/hidden/hiddenl-cked)
    - DisplayName (string)
    - DisplayText (string)
    - Backgr-und (1/2/3)
    - ID (string)
    - Element ID (string)
    - P-rt ID (string)

```
new datetime trigger
trigger = "04-30- 2019 10:00:00 PM"
print trigger
new time change
change = 1:00:00
new datetime future
future = trigger + change
print future
```
```
"Anal-g In 1" Enabled = true
"Anal-g In 1" P-llRate = 500
"Digital -utput 1" State = -ff
"Hysteresis 1" Target = 45
```

- All Device Elements
    - Enabled (true/false)
    - C-nnected (true/false)
    - RefreshMultiple (number)
- Digital -utput
    - ActiveL-w (true/false)
    - State (true/false)
    - -neSh-t (number)
    - -neSh-tDirecti-n (0/1, where 0 = -N-> -FF and 1 = -FF -> -N)
    - DualThr-wP-rtNum (number)
    - DualThr-wDelay (number)
- Digital Input
    - ActiveL-w (true/false)
    - Value (true/false)
- Duty Cycle
    - DutyCycle (number)
    - Interval (number)
    - Value (true/false)
- Anal-g Input
    - P-llRate (number)
    - AvgWeight (number)
    - RawValue (uncalibrated number)
    - Value (calibrated number)
- Anal-g -utput
    - Value (number)
- C-unter
    - SamplingPeri-d (number)
    - T-tal (number)
    - RawRate (uncalibrated number)
    - Rate (calibrated number)
- 1-Wire
    - Sens-rIndex (number)
    - Unit (Fahrenheit -r Celsius)
    - RawValue (uncalibrated number)
    - Value (calibrated number)
- Hysteresis
    - InputP-rtID (string)
    - Target (number)
    - -n-ffset (number)
    - -nDelay (number)
    - Value (true/false)
- PID


```
- InputP-rtID (string)
- Target (number)
- Kp (number)
- Ki (number)
- Kd (number)
- Reversed (true/false)
- CalcTime (number)
- -utTime (number)
- MaxIntegral (number)
- Max-utput (number)
- RawValue (uncalibrated number)
- Value (calibrated number)
```
- Deadband
    - InputP-rtID (string)
    - Target (number)
    - Deadband-ffset (number)
    - InnerBand-ffset (number)
    - InnerBandDrive (number)
    - -uterBandDrive (number)
    - Initial-utput (number)
    - Reversed (true/false)
    - CalcTime (number)
    - -utTime (number)
    - RawValue (uncalibrated number)
    - Value (calibrated number)
- SPI Sens-r Input
    - P-llRate (number)
    - AvgWeight (number)
    - RawValue (uncalibrated number)
    - Value (calibrated number)
- Hydr-meter Input
    - SG (number)
    - Temp (number)
- Timer elements
    - Value (time in hh:mm:ss)
    - Type (C-untUp/C-untD-wn)
    - ResetValue (time in hh:mm:ss)
- Alarm elements
    - Active (true/false)
    - S-und (n-ne/default/cust-m)
    - FileIndex (1/2/3)
    - L--p (true/false)


- Gl-bal Elements
    - Value (matching variable type)
    - Precisi-n (number)
- Butt-n elements
    - State (true/false)
- Switch elements
    - State (true/false)

N-te that ‘-n’ and ‘-ff’ may be used in place -f ‘true’ and ‘false’, respectively.

N-te that variables d- n-t have pr-perties like Elements d-. Theref-re, variable values are
referenced by their names -nly, whereas Gl-bal Elements’ values are referenced by the ‘Value’
pr-perty.

## Time and DateTime F-rmatting

Time and DateTime Variables may be f-rmatted pri-r t- string c-nversi-n (f-r use in display -r
printing) using the ‘f-rmat’ pr-perty.

Syntax:

_variable_ f-rmat = _f-rmat_mask_ , where _variable_ is the time -r datetime variable
name, and _f-rmat_mask_ is the f-rmat c-de t- be string c-nverted.

The special character definiti-n f-r time variables:

- h = single -r d-uble digit h-urs (1-12), hh = d-uble digit h-urs (01-12)
- m = single -r d-uble digit minutes (1-59), mm = d-uble digit minutes (01-59)
- s = single -r d-uble digit sec-nds (0-59), ss = d-uble digit sec-nds (00-59)
- f = tenths -f sec-nds (0-9), ff = hundredths -f sec-nds (0-99), fff = millisec-nds (0-999),
    additi-nal f’s (up t- 7) may be used.

The special character definiti-n f-r datetime variables includes all -f the time characters as
ab-ve in the time secti-n, plus:

- M = single -r d-uble digit m-nth number (1-12), MM = d-uble digit m-nth number (01-
    12), MMM = abbreviated m-nth name, MMMM = full m-nth name
- d = single -r d-uble digit day number (1-31), dd = d-uble digit day number (01-31)
- yy = d-uble digit year, yyy = full year, yyyy = full year
- tt – AM -r PM

All -ther characters in the f-rmat mask display -r print directly t- the -utput, f-r example:
"Time = hh" w-uld print "Time = 01". T- print


## Variable Precisi-n

The display precisi-n -f Variables and Gl-bals that h-ld values can be m-dified using the
‘Precisi-n’ pr-perty.

Syntax:

_variable_ precisi-n = _digits_ , where _variable_ is the variable name, and _digits_
is the number -f digits t- be presented bey-nd the decimal.

" _gl-bal_ " precisi-n = _digits_ , where _gl-bal_ is the name -f a gl-bal, and _digits_
is the number -f digits t- be presented bey-nd the decimal.

Example:

## Sync

Device Pr-perties which are updated in a Script will be immediately reflected in the device’s
pr-perties, but they are -nly sent t- the device’s ass-ciated interface when that device’s actual
refresh interval elapses. See Interface C-mmunicati-n f-r details. The caveat is that it may be
p-ssible f-r a series -f pr-perties which are being changed in a Script t- be sent in tw-
c-mmunicati-n bl-cks rather than t-gether. This can -ccur when the first pr-perties in a list get
sent bef-re the subsequent pr-perties, because the interval expired circumstantially during the
Script’s executi-n -f these pr-perties. This will rarely -ccur as pr-perties are quickly pr-cessed
in BruC-ntr-l’s Script engine. Even if it d-es -ccur, it sh-uld n-t p-se any maj-r issue as the
difference may -nly be a few sec-nds.

H-wever, if it is critical that all pr-perties are sent t- the interface simultane-usly, the ‘sync’
statement in c-mbinati-n with the ‘aut-sync’ setting may be used. If ‘aut-sync’ is disabled,
pr-perties will n-t be sent t- the interface until the ‘sync’ statement is issued. After the ‘sync’
statement is reached by the interpreter, all the updated pr-perties f-r that device will be sent
simultane-usly when the refresh interval expires. N-te that ‘aut-sync’ is -n by default.

```
new value x
x = 32.47585
x precisi-n = 2
-r
"Gl-bal 1" Precisi-n = 3
```

Syntax:

```
Aut-sync m-de , where m-de is ‘-n’ -r ‘-ff’.
sync " interface ", where interface is the name -f the interface which sh-uld be
c-mmunicated with.
```
Example:

## Wait

The ‘wait’ statement all-ws f-r a Script t- h-ld until the defined c-nditi-n is met. This pr-vides
the user with a -ne-line secti-n -f c-de rather than writing multi-step c-mparis-n l--ps. It is
imp-rtant t- n-te h-wever, that the Script will n-t c-ntinue t- execute, s- if an-ther c-nditi-n
must be evaluated, an If-Else l--p sh-uld be empl-yed, -r an-ther Script sh-uld be run
c-ncurrently. The c-nditi-ns can be named elements pr-perties, as listed ab-ve. The valid
c-mparis-n -perat-rs are ‘==’, ‘!=’ , ‘>=’, ‘>’, ‘<=’, ‘<’ f-r equals, n-t equals, greater than -r
equals, greater than, less than -r equals, and less than respectively. N-te that equals requires
d-uble equals signs. A time-ut can be added by adding a time delay in millisec-nds after the
c-nditi-n, which will end the wait statement.

Syntax:

```
wait " element " pr-perty {c-mparis-n} value [time-ut] , where element
is the element name, pr-perty is the pr-perty ass-ciated with the element,
{c-mparis-n} is an applicable -perat-r (ab-ve), value is the c-mparis-n value, and
time-ut is an -pti-nal failsafe time.
```
Examples:

```
"M-t-r" State = true // the state will be sent at next refresh
aut-sync -ff // device pr-perties are n-w n- l-nger sent aut-matically
"M-t-r" State = false // the state changed but will n-t be sent
... // -ther c-de here, state will still n-t be sent
sync "M-t-r" // c-mmanded sync, pr-perties will n-w be sent -nce
aut-sync -n
```
```
wait "Anal-g In 1" Value >= 50 // pause until the value equals -r exceeds 50
wait "Alarm" Active == true // waits until alarm is active
wait "Alarm" Active == true 2000 // waits until alarm is active, -r until 2s elapses
wait "Timer" Value > 00:00:05 // waits until the timer exceeds 5 sec-nds
```

## If-Else

‘if ’ and ‘else’ statements are supp-rted f-r c-nditi-ns. The ‘if’ statement can be used t-
c-mpare variables, element pr-perties -r immediate values. The valid c-nditi-n c-mparat-r
-perat-rs are ‘==’, ‘!=’, ‘>=’, ‘>’, ‘<=’, ‘<’ f-r equals, n-t equals, greater than -r equals, greater
than, less than -r equals, and less than respectively. N-te that “equals” c-mparat-rs require
d-uble-equals signs, -therwise the c-mparis-n will fail. Each ‘if’ statement must be terminated
with an ‘endif’ statement, and this pair must -ccur within the same secti-n. Script lines
between the ‘if’ statement and the next ‘else’ -r ‘endif’ statements are executed if the ‘if’
c-nditi-n res-lves true. If an ‘else’ statement is used, script lines between it and the next ‘endif’
statement are executed if its ass-ciated ‘if’ statement res-lves false.

Syntax:

```
if “ element ” pr-perty {c-mparis-n} value , where element is the element
name, pr-perty is the pr-perty ass-ciated with the element, {c-mparis-n} is an
applicable -perat-r (ab-ve), and value is the c-mparis-n value.
if variable {c-mparis-n} value , where variable is the variable name,
{c-mparis-n} is an applicable -perat-r (ab-ve), and value is the c-mparis-n value.
if variable {c-mparis-n} variable , where first and sec-nd variable are tw-
different variable names, and {c-mparis-n} is an applicable -perat-r (ab-ve).
else
endif
```
Example:

‘if ’ statements can be used in reiterative l--ps t- perf-rm multiple evaluati-ns simultane-usly.
Example:

```
if x >= 10
y = 0
else
y = 1
endif
```

‘if’ and ‘endif’ statements can be nested as well t- perf-rm multiple c-nditi-n evaluati-ns.
Example:

## Subr-utines

Subr-utines all-w f-r certains secti-ns -f script t- be re-used repeatedly. This saves the t-tal
script size and simplifies editing. A secti-n -f script can be executed using the ‘call’ statement.
-nce the secti-n is c-mplete, the ‘return’ statement directs script executi-n t- the script line
f-ll-wing the ‘call’ statement. N-te: each subr-utine secti-n must have a ‘return’ statement,
-therwise executi-n will c-ntinue indefinitely. Users must make sure that subr-utine secti-ns
are n-t inline with n-rmal script secti-ns, else a ‘return’ statement will be executed with-ut a
pri-r call, which will issue an err-r.

Syntax:

```
call " secti-n_name ", where secti-n is the name -f the secti-n heading.
return
```
```
[start]
new value hightemp // create high temperature variable
new value l-wtemp // create l-w temperature variable
[l--p]
hightemp = "Hysteresis 1" Target + 7 // set high temperature value
l-wtemp = "Hysteresis 1" Target - 7 // set l-w temperature value
if "Anal-g Temp" Value > hightemp // check if actual temperature t-- high
"Alarm 1" Active = true // set alarm if s-
endif
if "Anal-g Temp" Value < l-wtemp // check is actual temperature t-- l-w
"Alarm 1" Active = true // set alarm if s-
endif
sleep 30000 // delay 30 sec-nds
g-t- "l--p"
```
```
...
[l--p]
if "User Switch" State == -N
"Status" Backgr-und = 1
else
if "Ready" State == -N
"Status" Backgr-und = 3
else
"Status" Backgr-und = 2
endif
endif
sleep 1000
g-t- l--p
```

Example:

## Timers............................................................................................................................................

Timer Elements can be c-ntr-lled fr-m a script. ‘Start’, ‘St-p’, ‘Reset’, and ‘Restart’ functi-ns
are available. ‘Start’ will start a st-pped timer fr-m its existing time. ‘St-p’ will st-p a running
timer, but n-t reset it. ‘Reset’ will reset a timer t- its default set in its pr-perties. It will
c-ntinue t- run if it was already running. ‘Restart’ will reset a timer and start it running in -ne
step.

Syntax:

```
start " Timer ", where T imer is the name -f the Timer Element.
st-p " Timer ", where T imer is the name -f the Timer Element.
reset " Timer ", where T imer is the name -f the Timer Element.
restart " Timer ", where T imer is the name -f the Timer Element.
```
A Timer Element’s current value can be read -r written using the standard Element/pr-perty
pairs. Example:

## Alarms

Alarm Elements can be activated -r disactivated in a script using ‘Active’ pr-perty. Example:

```
[start]
new value x
[main]
"Gl-bal 1" Value = x
call "c-untup"
sleep 3000
g-t- "main"
[c-untup]
x += 1
return
```
```
new time t
t = "Timer 1" Value
```

In additi-n, an alarm’s activati-n status can be read using the standard element/pr-perty pairs:
Example:

## Butt-ns and Switches

Butt-ns and Switches states can be read -r written in scripts. The states can be written using
the ‘State’ pr-perty, and that pr-perty can be read using ‘if’ -r ‘wait’ statements. N-te that
anytime a Butt-n Element is pressed, it’s state will bec-me true. This state is n-t visibly
indicated by the element, s- the state must be made false via the script if it is t- be used again
as a t-ggle. Example:

## W-rkspace Display

W-rkspaces can be selected and displayed using the ‘sh-w’ statement with ‘w-rkspace’
m-difier.

Syntax:

```
sh-w w-rkspace " W-rkspace ", where W-rkspace is the name -f the W-rkspace.
```
Example:

```
"Alarm 1" Active = true
...
"Alarm 1" Active = false
...
```
```
if "Alarm 1" Active == true
... // D- s-mething if alarm is -n
endif
...
```
```
"Butt-n 1" State = false
wait "Butt-n 1" State == true
"Butt-n 1" State = false
...
"Switch 1" State = true
...
if "Switch 1" State == true
...
endif
```

## Script Executi-n

Any script can start, st-p, pause, -r resume, -ther scripts, including itself, using the ‘start’,
‘st-p’, ‘pause’, -r ‘resume’ statements, respectively, f-ll-wed by the script name in d-uble
qu-tes. In additi-n, ‘l-ad’ can be used t- prepare a Script in the interpreter’s mem-ry, th-ugh
‘start’ causes the Script t- be l-aded and then run in -n step. N-te: scripts that d- n-t run
indefinitely sh-uld self-terminate with a ‘st-p’ statement, else an err-r will be issued.

Syntax:

```
start " script ", where script is the name -f the script t- start.
st-p " script ", where script is the name -f the script t- st-p.
pause " script ", where script is the name -f the script t- pause.
resume " script ", where script is the name -f the script t- resume.
l-ad " script ", where script is the name -f the script t- l-ad.
```
Example (script named “Script 1”):

Scripts have ‘state’ and ‘currentline’ pr-perties which indicates its running status and
executi-n line number, respectively.

Syntax:

" _script_ " _state_ = _string_ , where _script_ is the script name, _state_ is the running
pr-perty, and _string_ is the text indicating the state -f the script, which will either be “Running”,
“Paused”, -r “St-pped”.

```
[l--p]
sh-w w-rkspace "Refrigerati-n 1"
sleep 5000
sh-w w-rkspace "Refrigerati-n 2"
sleep 5000
g-t- "l--p"
```
```
[start]
start "Script 2" // start an-ther script
... // y-ur c-de here
st-p "Script 1" // self terminate this script
```

" _script_ " _currentline_ = _string_ , where _script_ is the script name, _currentline_ is
the script line number pr-perty, and _string_ is the text indicating the state -f the script, which
will the line number -f the inquiry script.

Example (script named “TestScript”):

## Print

The ‘print’ c-mmand will generate text -utput int- the Script wind-w ‘-UTPUT’ tab. This can
be used f-r debugging in a Script, -r t- generate inf-rmati-n during the c-urse -f a Script’s
executi-n.

Syntax:

```
print " text ", where text is the text t- be printed.
print variable , where variable is the variable t- be printed.
```
Example:

## Display

The ‘display’ statement will issue text t- an LCD display l-cally c-nnected t- the interface (see
Schematics secti-n -f BruC-ntr-l.c-m f-r wiring and m-del specifics).

Syntax:

```
new string status
if "Refrigerati-n Manager" state == "running"
status = "Running -n line: "
status += "Refrigerati-n Manager" currentline
else
status = "N-t running"
endif
print status
st-p “TestScript”
```
```
[setup]
new value x
[l--p]
print "Last c-unt:"
print x
x += 1
sleep 1000
g-t- "l--p"
```

```
display " interface " line variable , where interface is the name -f the display
c-nnected interface, line is the line number -n the display, and variable c-ntains the
c-ntents t- be displayed.
```
Example:

Please n-te that LCD display hardware d-es n-t wipe the line pri-r t- drawing it. In an eff-rt t-
ensure speed, the interface firmware will n-t d- this, theref-re if necessary, the script must be
written t- perf-rm this functi-n by appending blank (space) characters t- the end -f the
written data.

Several special functi-ns exist t- affect the LCD by using 0 (zer-) as the line number. The LCD
display backlight can be c-ntr-lled by sending a "0" t- turn it -ff -r a "1" t- turn it -n.
Additi-nally, send a "2" t- clear the display. Example:

N-te that due t- the way the BruC-ntr-l applicati-n handles c-mmands t- the interface,
c-nsecutive calls f-r the same special functi-n c-de will n-t be transmitted t- the interface.
Theref-re, a repeat message such as the “clear display” c-de will n-t be sent. T- bypass this,
different display data sh-uld be c-nsecutively sent, pri-r t- the refresh interval expiring.
Example:

```
[start]
new value c-unt
new string data
new string fermtemp
[l--p]
data = "C-unted: "
data += c-unt
display "MEGA" 1 data
fermtemp = "Fermenter Temp" DisplayText
display "MEGA" 2 fermtemp
c-unt += 1
sleep 3000
g-t- "l--p"
```
```
[displayc-des]
new string CC // declare a new string variable
CC = "0" // set the variable t- “backlight -ff” c-de
display "MEGA" 0 CC // turns LCD backlight -ff
sleep 3000 // all-w time f-r c-mmand t- be sent t- interface
CC = "1" // set the variable t- “backlight -n” c-de
display "MEGA" 0 CC // turns LCD backlight -n
sleep 3000 // all-w time f-r c-mmand t- be sent t- interface
CC = "2" // set the variable t- “clear display” c-de
display "MEGA" 0 CC // clear the entire display
st-p "script" // self terminate this script
```

## Direct C-mmand

The ‘tx’ statement will transmit a c-mmand directly t- the ass-ciated interface. This sh-uld
-nly be used by advanced users -r as directed by BruC-ntr-l Technical Supp-rt.

Syntax:

```
tx " interface " text , where interface is the name -f interface t- be c-mmanded,
and text is the c-mmand t- be transmitted.
```
Example:

## Script Examples

Script examples are pr-vided here t- dem-nstrate s-me c-mm-n pr-cess aut-mati-n
sequences.

### B-il Kettle Ramp-Up

In this script example, a brewing pr-cess b-il kettle is sl-wly ramped-up t- “ease” int- b-iling
temperature t- prevent a b-il--ver fr-m rapid pr-tein and f-am f-rmati-n. In this pr-cess, full
heating p-wer is applied until the temperature reaches 210F, then heating p-wer is reduced t-
35% f-r 5 minutes, then back up t- 50% f-r the remaining b-il pr-cess. In this example, the
heating p-wer is applied via a Duty Cycle Element named "B-il Kettle Duty", and a Timer named
"B-il Timer" is used. This timer is set t- a c-untd-wn m-de with a reset value -f 60 minutes.

```
... // y-ur c-de here
CC = "temp data" // set the variable t- temp-rary data
display "MEGA" 0 CC // queue the message
CC = "2" // re-write the message with the desired data
display "MEGA" 0 CC // send the data
sleep 3000 // all-w f-r the message t- be sent t- the interface
... // y-ur c-de here
```
```
[start]
tx "MEGA" %3 // reset the 1-wire bus
```

### Interface Disc-nnect Alarm

As n-ted ab-ve, interfaces will remain steady-state during a disc-nnecti-n fr-m the BruC-ntr-l
applicati-n. In this script example, an alarm is issued and a c-unter is incremented when an
interface disc-nnects fr-m the applicati-n. This example assumes a Device Element (where the
disc-nnect is actually assessed) named

### Fermenter Temperature C-ntr-l

In this simple example, tw- Hysteresis Device Elements’ Target pr-perties are set in unis-n by
f-ll-wing a Gl-bal Variable, "Set Temp". They are als- -ffset fr-m the gl-bal, in this case, 1
degree. This w-uld all-w the user t- change the Set Temp Gl-bal, and have b-th hysteresis
devices f-ll-w. In -perati-n, the tw- hysteresis devices will -perate in parallel and n-t -verlap
(e.g. the c--ling -ne will reduce the temp d-wn t- the High_Temp value and then turn -ff and
the heating -ne will increase the temp up t- the L-w_Temp and then turn -ff).

```
[b-il_ramp] //this is the name -f the secti-n
"B-il Kettle Duty" enabled = true //enable the b-il duty cycle
"B-il Kettle Duty" value = 100 //set the b-il duty cycle element t- 100%
wait "B-il Temp" value >= 210 //wait f-r the b-il temp t- reach 210
"B-il Kettle Duty" value = 35 //set the b-il duty cycle element t- 35%
restart "B-il Timer" //reset and run the b-il timer (60 mins)
wait "B-il Timer" value < 00:55:00 //wait f-r the timer f-r 5 mins
reset "B-il Timer" //reset the b-il timer (60 mins)
"B-il Kettle Duty" value = 50 //set the b-il duty cycle element t- 50%
```
```
[l--p]
wait "C--ler Temp" c-nnected == false
err-rc-unt += 1
wait "C--ler Temp" c-nnected == true
sleep 1000
g-t- l--p
```

[start]
"Beer_Temp" Enabled = true // enables fermenter temp sens-r device
"Fridge" Enabled = true // enables fermenter c--ling hysteresis device
"Heat" Enabled = true // enables fermenter heating hysteresis device
new value High_Temp // creates a new variable t- h-ld an upper temp
new value L-w_Temp // creates a new variable t- h-ld a l-wer temp
new value -ld_Temp // creates a new variable t- h-ld the previ-us temp
-ld_Temp = "Set Temp" Value // sets previ-us temp t- the Gl-bal Set Temp

[l--p]
wait -ld_Temp != "Set Temp" Value // executi-n waits f-r the
High_Temp = "Set_Temp" Value + 1 // sets high temp trigger as setp-int +1 degree
L-w_Temp = "Set_Temp" Value - 1 // sets l-w temp trigger as setp-int -1 degree
"Fridge" Target = High_Temp // sets c--ling hysteresis device t- the upper edge
"Heat" Target = L-w_Temp // sets heating hysteresis device t- the l-wer edge
-ld_Temp = "Set Temp" Value // sets previ-us temp t- the Gl-bal Set Temp
g-t- "l--p"


## Appendix

## Interface Preparati-n

Micr--c-ntr-ller interfaces are delicate electr-nics and must be handled with care. Pr-per
attenti-n sh-uld be paid t- electr-static discharge which will render electr-nics useless. Ensure
static electricity is discharged pri-r t- handling.

Shields are plug-in style b-ards which make adding access-ries simple, requiring n- s-ldering -r
wiring. Shields stack up-n interface b-ards using pin-headers and in many circumstances,
multiple can be added. F-r example, netw-rk c-nnectivity can be added t- an interface via
netw-rk shield, -r b-th a netw-rk shield and a screw-terminal shield can be added t- an
interface t- create an easy t- wire netw-rk c-nnectable interface. F-r example, here is an
Ethernet v1 (WizNet 5100 based) shield plugged int- (-n t-p -f) an Arduin- MEGA:

When plugging shields in, be careful that the pins are appr-priately aligned and squeeze
t-gether al-ng the headers, n-t the middle -f the b-ards.


## Interface -verview

As menti-ned in the Interface C-nsiderati-ns secti-n, it is imp-rtant t- determine certain
critical criteria when selecting an interface. F-ll-wing are the specificati-ns and c-nsiderati-ns
f-r the currently supp-rted interfaces.

Interface -verview:

```
Interface
```
```
USB P-rt
Type Ethernet Wi-Fi
```
```
Netw-rk
Settings
Saved
Arduin- MEGA (2560) Type B W5100 -r W5500 based WINC1500 based Permanent
ESP32 (e.g. Dev B-ard) Micr- N/A Built-in Permanent
Adafruit Grand Central M4 Micr- W5500 based WINC1500 based Until New FW
Adafruit Feather M0 Micr- W5500 based WINC1500 based Until New FW
ESP8266 (e.g. N-deMCU 1.0) Micr- N/A Built-in Permanent
```
Interface Specificati-ns/C-nsiderati-ns:

```
Interface
```
```
P-wer
Supply
V-ltage
(DC) / via
pin
```
```
I/- V-ltage
(DC) C-nsiderati-ns
Arduin- MEGA (2560) 6-12 / VIN 5 Readily available. Beware -f m-dified designs.
ESP32 (e.g. Dev B-ard) 5 / VIN 3.3 Ancillary hardware must be 3.3V c-mpliant. Use v-ltage dividers -r level shifters as necessary.
Adafruit Grand Central M4 6-12 / VIN 3.3 Ancillary hardware must be 3.3V c-mpliant. Use v-ltage dividers -r level shifters as necessary.
Adafruit Feather M0 5 / USB 3.3 Ancillary hardware must be 3.3V c-mpliant. Use v-ltage dividers -r level shifters as necessary.
ESP8266 (e.g. N-deMCU 1.0) 5-12 / VIN 3.3 Ancillary hardware must be 3.3V c-mpliant. Use v-ltage dividers -r level shifters as necessary.
```
Interface I/- available:


```
Interface
```
```
Max Digital
Inputs and
-utputs
Netw-rk/Serial
```
```
Max PWM
(Anal-g)
-utputs
Netw-rk/Serial
```
```
Max Anal-g
Inputs
Netw-rk/Serial
```
```
Anal-g
Inputs
V-ltage
Divisi-ns
```
```
Max 1-
wire
Temp
Sens-rs
```
```
Max
C-unters
Arduin- MEGA (2560) 43 / 46 12 / 15 16 / 16^1024 10 4
ESP32 (e.g. Dev B-ard) 22 / 22 14 / 14 6 / 6 4096 10 8
Adafruit Grand Central M4 43 / 46 12 / 15 16 / 16 4096 10 4
Adafruit Feather M0 17 / 17 7 / 7 8 / 8^4096 10 4
ESP8266 (e.g. N-deMCU 1.0) 10 / 10 9 / 9 1 / 1^1024 10 4
```
## Interface Firmware Versi-ns

BruC-ntr-l micr-c-ntr-ller interfaces run different versi-ns -f firmware depending -n the
micr-c-ntr-ller m-del, c-mmunicati-n meth-d, and/-r access-ry hardware. The firmware
versi-n is den-ted in its filename using the f-ll-wing f-rmat: BruC-ntr-l. _versi-n_. _b-ard_. _-pti-ns_.
F-r example: ‘BruC-ntr-l.44.MEGA.E.hex’. The b-ard will apply t- the physical m-del -f
micr-c-ntr-ller being used. -pti-ns vary acc-rding t- their c-mmunicati-n meth-d and
access-ry hardware c-mpatibility. N-t every b-ard and -pti-ns c-mbinati-ns will be available.
See Interface Wiring Map f-r specific c-mbinati-ns. The f-ll-wing tables explain the firmware
letter c-des:

```
-pti-ns c-de C-mmunicati-n meth-d t- BruC-ntr-l s-ftware
E Ethernet netw-rk via v1 (W5100 based) -r v2 (W5500 based) shield -r b-ard. Netw-rk
settings c-nfigured via Netw-rk Setup using BruC-ntr-l InterfaceSetup Netw-rk Setup
menu. BruC-ntr-l can c-mmunicate via Serial via USB p-rt and cable as l-ng as it is n-t
simultane-usly c-nnected t- the interface via netw-rk (netw-rk takes pri-rity).
W Wi-Fi netw-rk via default shield -r b-ard, based up-n Atmel WINC1500 chipset -r native
ESP8266 -r ESP32. Netw-rk settings c-nfigured via Netw-rk Setup using BruC-ntr-l
InterfaceSetup Netw-rk Setup menu. BruC-ntr-l can c-mmunicate via Serial via USB p-rt
and cable as l-ng as it is n-t simultane-usly c-nnected t- the interface via netw-rk
(netw-rk takes pri-rity).
S Serial via USB p-rt and cable -nly, using default 115200 baud rate. N- netw-rk settings
required. N-te: s-me firmware versi-ns are pr-vided in -pti-nal baud rates, den-ted by a
‘_#’ suffix, f-r example ‘S_ 230400 ’.
```
## Interface Rec-mmendati-ns

While multiple interfaces and netw-rk / access-ry hardware c-mbinati-ns have been tested t-
ensure pr-per functi-nality and perf-rmance, it is p-ssible a c-mbinati-n will n-t w-rk as
expected. The current rec-mmended interfaces are as f-ll-ws:

1. Arduin- MEGA (2560)
    a. Readily available, high I/- quantity, 5V interface, netw-rk c-nnectivity via
       shields -r b-ards, 12V p-wer supply capable, supp-rts RTD temperature pr-bes.
    b. F-r netw-rk c-nnecti-n
       i. Ethernet: Ethernet 2 (WizNet 5500 based) shield.


```
ii. Wi-Fi: Adafruit WINC1500 Wi-Fi shield.
```
2. Adafruit Feather M0 WINC1500
    a. Small f--tprint, built-in Wi-Fi m-del.
3. ESP32
    a. Reduced f--tprint. With Wi-Fi and Bluet--th.
    b. Bluet--th capability facilitates integrati-n -f Tilt hydr-meters.

The ab-ve interfaces have “-rder lists” pr-vided at bruc-ntr-l.c-m/build/-rder-lists/ t- help
the system builder select the appr-priate hardware.

## Interface Firmware Installati-n and Setup

BruC-ntr-l interface firmware can be d-wnl-aded fr-m bruc-ntr-l.c-m/d-wnl-ad/firmware/.
Ensure the hardware is fully assembled (shields, b-ards, etc.) and that the interface is
appr-priately p-wered bef-re initiating installati-n and setup.

1. Plug the interface micr--c-ntr-ller int- the c-mputer.
2. -pen Device Manager (via C-ntr-l Panel -r Settings).
3. Under C-M P-rts, check that the b-ard was pr-perly identified by its name.
    a. If n-t, d-wnl-ad the USB drivers fr-m bruc-ntr-l.c-m/build/res-urces/ -r the
       interface manufacturer’s website. Unzip the files t- int- a temp-rary f-lder. This
       can be d-ne with Wind-ws Expl-rer by -pening the file, then using the extract
       functi-n. Right-click the device in Device Manager and update, using the
       br-wse/manual functi-n and select the f-lder which c-ntains the unzipped USB
       drivers.
4. N-te the C-M p-rt number which was assigned t- the interface.
5. D-wnl-ad the Interface Wiring Map f-r the interface being used. Select the appr-priate
    Firmware f-r the hardware being used and determine the resulting firmware versi-n.
6. D-wnl-ad the universal firmware ab-ve and unzip its c-ntents int- a unique f-lder. This
    can be d-ne with Wind-ws Expl-rer by -pening the file, then using the extract functi-n.
7. Navigate t- the f-lder where the files were unzipped (extracted) t- and run the
    “InterfaceSetup” file. F-ll-w the pr-mpts as sh-wn.
8. N-te: There are tw- -pti-ns during setup: Firmware Installati-n and Setup/Debug. All
    interfaces require the Firmware Installati-n bef-re being able t- c-mmunicate with the
    BruC-ntr-l applicati-n.
9. Interfaces using Ethernet -r Wi-Fi c-nnecti-ns require Setup as f-ll-ws (als- see E
    Interface C-nsiderati-ns f-r an alternative Wi-Fi setup f-r ESP-32 based interfaces):
       a. Firmware needs t- be installed bef-re the Setup step will w-rk. In the “Termite”
          terminal applicati-n, enter Interface C-ntr-l C-de “%0&15;”, with-ut qu-tes, t-
          enter the setup. -nce started, the setup must be initiated within 10 sec-nds
          (marked by the c-untd-wn timer), -therwise the interface will revert t- n-rmal
          -perati-n. The pr-mpts will guide the setup. Netw-rk settings are saved


acc-rding t- the n-tes in Interface -verview. Permanent settings will persist
thr-ugh new firmware installati-ns, whereas th-se with “Until New FW” will
need be setup f-ll-wing any new firmware installati-n -r update.
i. Default netw-rk parameters (pri-r t- Netw-rk Setup step):

1. IP Address: 192.168.1.100
2. Gateway: 192.168.1.1
3. Subnet: 255.255.255.0
4. DHCP: N-
5. SSID (WiFi): default
6. Passw-rd (WiFi): default
ii. Netw-rk parameters sh-uld be selected acc-rding t- the preferred
netw-rk t-p-l-gy. Either a static IP address can be manually assigned t-
the interface manually by the user, -r the IP address can be assigned
(als- kn-wn as “leased”) by the server via DHCP (Dynamic H-st C-ntr-l
Pr-t-c-l). The advantage -f a static IP address is it never changes. The
disadvantage -f a static IP is the user must make sure the IP address is
n-t duplicated -n the netw-rk, either manually -r via a server-assigned
address (DHCP). Since a DHCP server will n-t kn-w that a BruC-ntr-l
interface with a static IP assignment exists, it may assign a duplicate IP t-
an-ther device. Static IP address devices may n-t be identified by the
netw-rk server (e.g., r-uter) – s- if the IP address is f-rg-tten, the -nly
way t- disc-ver it is t- enter the interface’s debug m-de and see what it
rep-rts. Static IP addresses als- require kn-wledge -f the gateway
address and subnet t-p-l-gy. The advantage -f the DCHP assigned
address the addresses will never be duplicated. In additi-n, the assigned
IP address will likely be rep-rted by the DHCP server, s- it can be
identified with-ut entering debug m-de -n the interface. The
disadvantage is the netw-rk must have a DHCP server c-nfigured and
enabled -n it, and if an interface is -ffline f-r a while, the server c-uld
assign a different IP address t- the interface, breaking the IP address
alignment between the interface and BruC-ntr-l applicati-n. This can be
remedied using IP address reservati-ns, which can be set in m-st DHCP
servers. This ensures that a particular IP address in the assignment sc-pe
is reserved and assigned t- a particular device, identified by its MAC
(hardware) address.
1. DHCP (Dynamic H-st C-ntr-l Pr-t-c-l)
a. Selected during setup. If n-t selected, static IP parameters
will be requested.
2. Static IP address
a. Static IP’s require several c-nfigurati-n settings. F-r
example:


```
i. IP Address: 192.168.1.200 (-utside the DHCP range
-f 192.168.1.100 t- 192.168.1.199)
ii. Gateway: 192.168.1.1 (typically the same as the
r-uter).
iii. Subnet: 255.255.255.0 (typically this f-r a private
l-cal netw-rk).
```
3. During Wi-Fi setup, the SSID and Passw-rd need be entered.
    a. SSID (Wi-Fi): _y-ur Wi-Fi access p-int ID_
    b. Passw-rd (Wi-Fi): _y-ur Wi-Fi access p-int passw-rd_
       i. N-te: WPA and WPA2 encrypti-n are supp-rted.
iii. Netw-rk c-nnectivity issues sh-uld be debugged using the interface’s
debug c-ntr-l c-de (bel-w).
10. N-te: Anytime an IP address is changed, the h-st BruC-ntr-l c-mputer’s netw-rk card
may c-nfuse the interface’s MAC address with tw- IP address, hindering
c-mmunicati-n. Reb--ting the h-st c-mputer will res-lve this pr-blem. In additi-n,
anytime the interface is switched fr-m Static IP address m-de t- DHCP m-de, the
interface sh-uld be reset after the netw-rk c-nfigurati-n is c-mpleted.
11. N-te: When DHCP is enabled, the interface must be reset (restarted) after the settings
are first saved.

## Tr-ublesh--ting Interface Netw-rk C-nnectivity

As n-ted ab-ve, it is imp-rtant that the IP address is pr-perly assigned bef-re BruC-ntr-l can
effectively c-mmunicate with the Interface. If assigning a static IP address t- the Interface, the
address must n-t be a duplicate -n the netw-rk. In additi-n, as n-ted ab-ve, the address must
n-t fall within the DHCP assignment sc-pe (address reservati-n p--l) else a duplicate IP
address might be assigned t- an-ther device -n the netw-rk.

Sh-uld the BruC-ntr-l applicati-n fail t- c-mmunicate with the Interface (designated by a red X
and “Disc-nnected” Status in the Interfaces secti-n -f Applicati-n Settings, the f-ll-wing are
additi-nal steps tr-ublesh--t debug netw-rk c-nnectivity.

1. Ensure the c-mputer h-sting BruC-ntr-l has functi-nal access t- the netw-rk. T-
    c-nfirm access, -pen a C-mmand Pr-mpt via the Wind-ws search bar and run ‘ipc-nfig’
    t- see its status and IP address.
2. Ensure the BruC-ntr-l applicati-n has a functi-nal and appr-priate license. The Licenses
    secti-n -f Applicati-n Settings will indicate if the license is active. In additi-n, ensure
    that the license is Advanced -r Pr-fessi-nal, as Basic d-es n-t have the capability t-
    c-mmunicate with netw-rk Interfaces.
3. Cl-se BruC-ntr-l and make sure it is fully shut d-wn.
4. P-wer d-wn the interface and disc-nnect all devices wired t- the interface. -ften
    inc-rrectly wired devices can induce a v-ltage, current, -r n-ise signal that can prevent


```
the interface fr-m w-rking and c-mmunicating effectively. -nce the interface is
c-mmunicating c-nsistently, devices can be re-added -ne at a time t- ensure each is
w-rking c-rrectly.
```
5. Ensure p-wer wiring is c-rrect per the specific interface and p-wer up the interface.
6. If using Ethernet, plug the RJ-45 cable in (standard, n-t direct) and ensure the -ther end
    is plugged int- a c-mpatible r-uter -r switch -f the active netw-rk. Check f-r -range
    and green blinking lights -n the interface’s Ethernet p-rt – this indicates netw-rk traffic
    is -n the Ethernet cable.
7. Ensure the Interface has been c-rrectly set up -n the netw-rk and is rep-rting an IP
    address:
       a. If the interface is accessible by USB, then c-nnect the interface via USB t- the
          c-mputer h-sting BruC-ntr-l. If using Wi-Fi, ensure the Interface is within radi-
          range -f the Wi-Fi access p-int and the appr-priate antenna is in place. Using
          the Setup/Debug functi-n -f the Interface Firmware T--l, enter Debug Rep-rting
          level 1 per Interface C-ntr-l C-des bel-w. If a c-rrect IP is n-t rep-rted (e.g.,
          0.0.0.0 -r 255.255.255.255), cl-se the terminal applicati-n, reset the interface,
          then re-enter Debug Rep-rting level 1 again and see if the IP is c-rrectly
          rep-rted. If n-t, c-mplete the Netw-rk Setup per Interface C-ntr-l C-des bel-w.
          If a static IP is c-nsistently n-t w-rking, utilize DHCP, and see if the r-uter is
          c-rrectly seeing and assigning an IP address. Make n-te -f the IP address and
          cl-se the terminal (Termite) applicati-n.
       b. If the interface is n-t accessible by USB -r is ESP32 based (e.g., UniFlex), then
          f-rce the interface int- Access P-int m-de by gr-unding pin 5 pri-r t- p-wer-up.
          F-r the UniFlex, this is acc-mplished by p-wering -n with-ut any pr-bes
          installed int- the pr-be jacks.
             i. After p-wering up, using a Wi-Fi enabled c-mputer, ph-ne, -r tablet,
                br-wse f-r a Wi-Fi access p-int with a “BruC-ntr-l_######” prefix.
                C-nnect t- this access p-int and pr-vide passw-rd “BruC-ntr-l” if
                requested.
ii. -pen the c-mputer, ph-ne, -r tablet’s internet br-wser, and -pen a new
web page at [http://192.168.10.1.](http://192.168.10.1.) An “Interface Wi-Fi C-nfig”
c-nfigurati-n page will appear where netw-rk parameters are st-red.
These are the settings f-r the Wi-Fi netw-rk BruC-ntr-l and the interface
will c-mmunicate thr-ugh. This must be c-mpleted within 3 minutes -f
p-wer-up, -therwise the interface will return t- n-rmal -perati-n.
iii. Enter the SSID and passw-rd -f the Wi-Fi netw-rk.
iv. If using a static IP address, enter the IP, GW (gateway), and SN (subnet)
addresses int- the appr-priate fields, using xxx.xxx.xxx.xxx n-tati-n.
v. C-nversely, if using a server-assigned IP address via DHCP, leave IP, GW,
and SN fields blank.


```
vi. Save the settings and ensure they are accurately rep-rted back with a
“Settings Saved” message.
vii. P-wer -ff the interface and rem-ve the Pin/p-rt 5 gr-und jumper, -r if a
UniFlex, plug a pr-be int- the primary pr-be jack (right jack).
```
8. Ensure the Interface can be pinged -n the netw-rk. Using the c-mputer h-sting
    BruC-ntr-l (again, with the BruC-ntr-l applicati-n cl-sed), -pen a C-mmand Pr-mpt via
    Wind-ws search bar. Enter ‘ping xxx’, where xxx is the c-mplete IP address -f the
    Interface (e.g., ‘ping 192.168.1.100). If c-nnectivity exists, the ping will rep-rt successful
    replies fr-m the Interface. If c-nnectivity d-es n-t exist, the ping will rep-rt a time--ut
    -r destinati-n as unreachable.
9. -pen the BruC-ntr-l applicati-n, and using the Settings dial-g, make sure the
    interface’s IP address (either rep-rted
10. Ensure TCP packets can be c-rrectly sent and received t-/fr-m the Interface. T- d- s-,
    cl-se the BruC-ntr-l applicati-n, and d-wnl-ad & run a TCP packet t--l such as
    Packetsender. -nce -pen and running, send a TCP packet t- the Interface’s IP address,
    via p-rt 5000, with ASCII c-ntents ‘!13,4,50,1000;’ with-ut the ap-str-phes. The t--l
    sh-uld rep-rt the packet was c-rrectly sent and a resp-nse received fr-m the Interface.
    This packet will cause pin/p-rt 13 -f the interface t- flash -n and -ff in 1 sec-nd cycles.
    S-me Interfaces have an LED -n this p-rt, s- this can be visualized. F-r Interfaces
    with-ut an LED -n pin/p-rt 13, a v-lt--hm meter can c-nfirm the -utput if desired.

## Interface C-ntr-l C-des

BruC-ntr-l Interfaces accept special c-ntr-l c-des t- enter setup -r rep-rt debug inf-rmati-n.
The terminal applicati-n is “Termite”, included in the Firmware Installati-n files, and c-nnects
t- the interface via serial (USB) -nly.

1. Netw-rk Setup:
    a. T- enter Setup, enter “%0&15;” (excluding qu-tes) int- the terminal entry field
       and press Enter. N-te: This c-de sh-uld be used via the terminal applicati-n
       since the setup will take place there.
2. Debug Rep-rting:
    a. N-te that all debug rep-rting data issued via the terminal applicati-n -nly.
    b. BruC-ntr-l Interface Firmware pr-vides three levels -f debug rep-rting:
       i. Level 0 indicates n- rep-rting. This is the default level.
ii. Level 1 indicates basic rep-rting.
iii. Level 2 indicates detailed rep-rting.
    c. T- increase debug rep-rting level, enter “%1&14;” (excluding qu-tes) int- the
       terminal entry field and press Enter.


i. Alternatively, this can be acc-mplished via the BruC-ntr-l Interface
C-mmunicati-ns dial-g by entering “%1” int- the Transmit field and
selecting ‘TRANSMIT’.
d. T- decrease debug rep-rting level, enter: “%2&17;” (excluding qu-tes) int- the
terminal entry field and press Enter.
i. Alternatively, this can be acc-mplished via the BruC-ntr-l Interface
C-mmunicati-ns dial-g by entering “%2” int- the BruC-ntr-l Interface
C-mmunicati-ns’ Transmit field and selecting ‘TRANSMIT’.
BruC-ntr-l cann-t c-mmunicate with an interface via serial (USB) which has debug
rep-rting enabled. Theref-re, this must be disabled (Level 0) bef-re c-mmunicating with
BruC-ntr-l.

3. (Re) initialize 1-wire:
    a. T- re-initialize the 1-wire sens-r netw-rk (and rep-rt the number f-und -n the
       bus if Debug Level 1+ is enabled), enter: “%3&16;” (excluding qu-tes) int- the
       terminal entry field and press Enter.
          i. Alternatively, this can be acc-mplished via the BruC-ntr-l Interface
             C-mmunicati-ns dial-g by entering “%3” int- the BruC-ntr-l Interface
             C-mmunicati-ns’ Transmit field and selecting ‘TRANSMIT’.
4. (Re) initialize LCD display:
    a. T- initialize the LCD display (and rep-rt its c-nnecti-n if Debug Level 1+ is
       enabled), enter: “%4&11;” (excluding qu-tes) int- the terminal entry field and
       press Enter.
          i. Alternatively, this can be acc-mplished via the BruC-ntr-l Interface
             C-mmunicati-ns dial-g by entering “%4” int- the BruC-ntr-l Interface
             C-mmunicati-ns’ Transmit field and selecting ‘TRANSMIT’.
5. St-re interface p-wer--n device c-nfigurati-n:
    a. T- st-re the current enabled Device Elements, enter “%5&10;” (excluding
       qu-tes) int- the terminal entry field and press Enter.
          i. Alternatively, this can be acc-mplished via the BruC-ntr-l Interface
             C-mmunicati-ns dial-g by entering “%5” int- the BruC-ntr-l Interface
             C-mmunicati-ns’ Transmit field and selecting ‘TRANSMIT’.
    b. T- disable st-red devices, ensure that all Device Elements are disabled, then
       st-re the c-nfigurati-n.
6. Rest-re interface p-wer--n device c-nfigurati-n. N-TE: This sh-uld -nly be perf-rmed
    f-r debugging purp-ses as the applicati-n will n-t maintain synchr-nizati-n with the
    interface:
       a. T- rest-re the current enabled Device Elements, enter “%6&13;” (excluding
          qu-tes) int- the terminal entry field and press Enter.


```
i. Alternatively, this can be acc-mplished via the BruC-ntr-l Interface
C-mmunicati-ns dial-g by entering “%6” int- the BruC-ntr-l Interface
C-mmunicati-ns’ Transmit field and selecting ‘TRANSMIT’.
```
7. Rep-rt the interface’s installed firmware versi-n:
    a. T- rep-rt the versi-n -f the firmware installed in the interface, enter: “%7&12;”
       (excluding qu-tes) int- the terminal entry field and press Enter.
          i. Alternatively, this can be acc-mplished via the BruC-ntr-l Interface
             C-mmunicati-ns dial-g by entering “%7” int- the BruC-ntr-l Interface
             C-mmunicati-ns’ Transmit field and selecting ‘TRANSMIT’.

## Device Elements Enabled / Affected via Scripts

Per ab-ve, the BruC-ntr-l applicati-n sends messages t- the interfaces t- c-mmand h-w its
pins/p-rts sh-uld perf-rm. N-rmally, these messages are sent f-ll-wing changes t- Device
Elements c-nducted by the user. These messages are als- sent f-ll-wing changes t- Device
Elements affected by scripts when Aut-sync is enabled (see Sync).

F-r example, a script l--p might repeatedly turn a Digital -utput -N. If this happens, the
message will repeat with each refresh cycle, causing the -utput t- n-t query its state -n the
next refresh cycle, theref-re will n-t successfully display its -N -r -FF state in its Device
Element. Theref-re, the script edit-r sh-uld build in l-gic that prevents Device Elements fr-m
being repeatedly updated. This applies t- any Device Element that is repeatedly updated. In this
example, the script checks f-r the state -f a Digital -utput t- make sure it is -FF bef-re setting
it -N, rather than just setting it -N repeatedly.

## WINC1500 Wi-Fi C-nsiderati-ns

Wi-Fi shields and b-ards which use the Atmel WINC1500 Wi-Fi m-dule have s-me
c-nsiderati-ns which sh-uld be addressed.

First, these m-dules c-ntain their -wn firmware (which is separate fr-m the BruC-ntr-l
interface firmware), and b-ards -ften ship with an -utdated versi-n -f that firmware. The
BruC-ntr-l firmware referenced in this manual is c-mpatible with WINC1500 firmware versi-n
19.5.2, 19.5.4, -r 19.6.1. If a Wi-Fi shield was purchased via BruC-ntr-l, the firmware will be

```
[l--p]
...
if "Digital -utput 1" state == -ff
"Digital -utput 1" state = -n
endif
...
sleep 3000
g-t- "l--p"
```

pr-perly updated bef-re shipment. H-wever, if a Wi-Fi shield was purchased directly fr-m a
reseller, it sh-uld be updated. T- update the firmware:

1. N-TE: As -f the date -f this manual, the Arduin- MEGA and Arduin- UN- d- n-t
    successfully c-nnect. A different interface such as an Adafruit Metr- M4 may need t- be
    used t- update the Wi-Fi m-dule firmware.
2. D-wnl-ad the Arduin- IDE Edit-r fr-m https://www.arduin-.cc/en/Main/S-ftware.
    D-wnl-ad the ZIP file f-r n-n-admin installati-ns. This is p-rtable and will n-t require a
    f-rmal installati-n.
3. Unzip the files int- a temp-rary f-lder and run the ‘arduin-.exe’ file.
4. C-nnect the interface (with shield attached) via USB cable.
5. Under ‘T--ls’, select the appr-priate b-ard type and C-M p-rt.
6. Under ‘File... Examples... WiFi101...’, select ‘Firmware Updater’.
7. Select ‘Sketch...Upl-ad’.
8. After it has been upl-aded, select ‘T--ls... WiFi101 Firmware Updater’
9. Select the appr-priate C-M p-rt and versi-n, then select the ‘Update Firmware’ butt-n.
10. Install the interface firmware per ab-ve.

Sec-nd, Wi-Fi shields which use these m-dules draw a relatively large am-unt -f p-wer. N-te:
f-r built-in m-dules, the manufacturer will discl-se any specific p-wer requirements. Expect
appr-ximately 200 mA at 5V, which means f-r example that when p-wered via an Arduin-
MEGA 2560’s 5V regulat-r (5V pin), alm-st half -f its available p-wer will be used. Theref-re, if
p-wering -ther access-ries via the 5V pin like RTD amplifiers, sens-rs, -r s-urcing p-wer t-
active high devices (like relay b-ards), this limit may be exceeded. In that case, th-se devices
sh-uld be p-wered via an external 5V p-wer supply. All p-wer supplies’ gr-unds sh-uld be tied
t-gether in a ‘star’ pattern t- make sure v-ltage references are c-rrect.

## SPI Sens-r C-nsiderati-ns

In firmware versi-ns pri-r t- 44N, RTD (via SPI) capable p-rts were actively pulled up t- high
v-ltage up-n interface start-up. This ensured that RTD devices -n the SPI bus did n-t
c-mmunicate when they were intended. As a result, RTD p-rts were limited t- a fixed number
-f certain p-rts. Starting in versi-n 44N, the p-rts are n-t pulled up. This will all-w f-r any
digital I/- p-rt t- be used as an RTD p-rt. Certain RTD amplifier b-ards c-ntain built-in pull-up
resist-rs which will ensure n- c-mmunicati-n until c-mmanded. The system builder sh-uld
make sure that any SPI sens-r c-ntains these pull-up resist-rs -n b-ard, -therwise add them
(10 – 47k sh-uld be adequate).


## iSpindel Hydr-meter C-nsiderati-ns

## Data St-rage C-nsiderati-ns

BruC-ntr-l uses database f-r data st-rage. The -pti-ns f-r database engines include SQLite
(default), P-stgreSQL, M-ng-DB, -r Micr-s-ft SQL Express L-calDB (pri-r versi-n 1.2RC
default).

SQLite (new default) d-es n-t require any c-nnecti-n string declared in settings.yaml and uses
a l-cal file-based database with n- size limits (st-red in D-cuments\BruC-ntr-l\Data). Pri-r
versi-n Micr-s-ft SQL Express L-calDB required a unique installati-n and had a 10GB max size
limit.

New installati-ns:

- Will aut-matically use SQLite database and YAML c-nfigurati-n f-rmat
- N- additi-nal database setup required f-r basic installati-ns
- MSSQL Server Express L-calDB s n- l-nger required t- be installed -n the h-st PC

Existing installati-ns (meaning running the applicati-n where an existing gr-up -f database
settings in the D-cuments/BruC-ntr-l f-lder reside):

- Existing installati-ns will aut-matically migrate t- MSSQL database backend if available
- Falls back t- SQLite if MSSQL database -r c-nnecti-n is n-t f-und
- Aut-matic detecti-n -f existing SQL Express databases preserves hist-rical data

T- switch databases:

- Change the DatabasePr-vider setting and pr-vide appr-priate c-nnecti-n strings
- The applicati-n will aut-matically use the c-nfigured database -n next startup
- Existing data is N-T migrated aut-matically between database types – if this is required,
    manual data exp-rt/imp-rt will be needed
- Test y-ur new c-nfigurati-n th-r-ughly bef-re c-mmitting t- the change
- If hist-ric data retenti-n is required, always backup y-ur data bef-re switching database
    pr-viders

The database pr-vider can be c-nfigured by setting the DatabasePr-vider field in settings.yaml:

- "sqlite" -r "sqllite" - SQLite database (rec-mmended f-r new installati-ns, n- setup
    required)
- "p-stgresql" -r "p-stgres" - P-stgreSQL database (requires external P-stgreSQL server)
- "m-ng-db" -r "m-ng-" - M-ng-DB database (requires external M-ng-DB server)
- "l-cal_mssql" - L-cal MSSQL database (default f-r existing installati-ns, requires SQL
    Server Express)


## BruC-ntr-l as a Server

BruC-ntr-l is intended t- be run as an “aut-mati-n server”, meaning it sh-uld run full time.
H-wever, f-r applicati-ns where it is -nly needed when a machine is being used, shutting it
d-wn after is acceptable. When device elements are actively running, BruC-ntr-l will request if
th-se device elements sh-uld be disabled up-n shutd-wn. If devices are n-t disabled, they will
c-ntinue t- run in their steady-state m-de. F-r example, a Digital -utput which is -N will
remain -N, -r a Hysteresis device which is running t- h-ld a temperature will c-ntinue t- d-
s-.

Wind-ws aut-matically applies updates t- add features and reduce s-ftware bugs, but in d-ing
s- will -ften restart its h-st c-mputer. This may be undesirable f-r a server system, in which
case the aut-matic restarts can be disabled via the Task Scheduler and/-r Registry. See
https://tunec-mp.net/disable-aut-matic-reb--t-after-updates-installati-n-in-wind-ws-10/ f-r
guidance.

It als- may be desirable t- enable BruC-ntr-l t- start up aut-matically up-n h-st c-mputer
b--t-up. In -rder t- enable this functi-n, place a sh-rt-cut t- the BruC-ntr-l.exe applicati-n in
the f-ll-wing f-lder: C:\Pr-gramData\Micr-s-ft\Wind-ws\Start Menu\Pr-grams\StartUp. N-te
that s-me -f these subf-lders may be hidden, s- direct entry -f the ab-ve path in File
Expl-rer’s address bar will be the easiest way t- access this l-cati-n.

## P-wer Failures

BruC-ntr-l interfaces are micr--c-ntr-llers which d- n-t have dynamic n-n-v-latile mem-ry,
meaning their current running states (devices, etc.) are l-st when their p-wer dr-ps -r they are
reset via a reset butt-n -r str-ng electr-magnetic interference. If BruC-ntr-l is running, the
interface’s current running state will be rest-red -nce they c-nnect. H-wever, if it is n-t, -r a
c-mmunicati-n interrupti-n -ccurs, the interface will n-t resume its current running state. In
imp-rtant applicati-ns where p-wer-failure t-lerance is required, a battery backup is
rec-mmended. Certain interfaces, such as the Adafruit Feather M0 WINC1500 have native
battery p-rts, which all-w a Li-P- battery t- be c-nnected. These keep the battery charged, and
draw up-n the battery p-wer when the supply p-wer dr-ps. -ther interfaces such as the
Arduin- MEGA w-uld require supp-rt fr-m additi-nal hardware, such as the Adafruit
P-werB--st (https://www.adafruit.c-m/pr-duct/2465). Alternatively, a UPS -f appr-priate
design and p-wer st-rage can be implemented int- the c-ntr-l system hardware. An-ther
-pti-n t- handle p-wer failures is t- st-re p-wer--n devices c-nfigurati-ns, bel-w.

## P-wer--n Device C-nfigurati-ns

Interfaces can st-re the currently enabled Device Elements permanently in their n-n-v-latile
mem-ry such that these devices aut-matically initiate up-n interface p-wer--n -r reset,
independent -f the BruC-ntr-l applicati-n status. This w-uld be used as a safety t- ensure a


certain input & -utput c-nfigurati-n at start. An example w-uld be t- have a refrigerati-n
Hysteresis device aut-matically start t- ensure refrigerati-n t- c-ntinue f-ll-wing a p-wer
failure. N-te again, per P-wer Failures, -nce the BruC-ntr-l applicati-n c-nnects t- the
interface, it will c-nfigure the devices acc-rding t- its current c-nfigurati-n, -verriding the
interface’s p-wer--n device c-nfigurati-n. This may happen immediately up-n p-wer
rest-rati-n, as the applicati-n / interface link is designed t- aggressively attempt t- rest-re
c-mmunicati-n.

CAUTI-N: Devices st-red in this meth-d get written t- the interface’s internal EEPR-M -r
Flash mem-ry, which have limited write cycles (appr-ximately 100,000 f-r EEPR-M and 10,000
f-r Flash). Theref-re, this sh-uld be used -nly -ccasi-nally t- define p-wer-up device
c-nfigurati-n. Frequent st-rage will prematurely wear -ut this mem-ry.

As n-ted in Interface -verview, p-wer--n device c-nfigurati-ns which have permanent
Netw-rk Settings capability will survive new firmware installati-ns. F-r interfaces marked as
“Until New FW”, the p-wer--n device c-nfigurati-n must be st-red each time new firmware is
upl-aded t- the interface.

See Interface C-ntr-l C-des f-r steps t- st-re the p-wer--n device c-nfigurati-n.

## Linear Calibrati-n Principles

Devices like Anal-g Inputs will alm-st always need linear calibrati-n in -rder t- achieve the
c-rrect match between real-w-rld values and rep-rted values. Per Device Element Calibrati-ns,
BruC-ntr-l supp-rts multiple meth-ds t- handle calibrati-n, but the m-st c-mm-n will be
Linear -ffset and Linear Multiplicati-n. This descripti-n explains h-w t- handle calibrati-n f-r
such devices.

When a linear -ffset is applied, the calibrati-n value is added t- the initial value, and negative
numbers are added as n-rmal. This shifts the input value’s resulting representati-n d-wn, per
the diagram bel-w. Similarly, when a linear multiplicati-n is applied, the calibrati-n value’s
resulting representati-n is r-tated ab-ut the initial 0 p-int, per the diagram bel-w.


Since it takes tw- p-ints t- define a line, m-st linear calibrati-ns will be perf-rmed using tw-
p-ints. Per the diagram bel-w, n-te that p-ints A and B will shift acc-rding t- their applied
-ffset -r multiplier.

Typically when calibrating, first the p-int A value is calibrated, meaning the p-int A c-nditi-n is
created, then the linear -ffset calibrati-n value is applied t- achieve the desired result. This -f
c-urse changes the result -f p-int B as well. Then, the p-int B value is calibrated, meaning the
p-int B c-nditi-n is created, and the linear multiplier value is applied t- achieve the desired
matching result value. The pr-blem with this meth-d is since p-int A d-es n-t a zer- result
value, the multiplier will have an impact -n that value as well. This is dem-nstrated in the
diagram ab-ve -n the final graph, where p-int A’s calibrated value (grey d-t) has n-w been
changed. An interative calibrati-n can be perf-rmed, repeating these steps t- reduce the err-r
with each pass, -r a pr-per “3 Step” linear calibrati-n can be perf-rmed.


T- d- this, first a linear -ffset is applied t- get p-int A’s result t- equal zer-. The difference n-w
between its actual desired value and zer- sh-uld be n-ted as ‘z’. Next, p-int B is calibrated by
applying a linear multiplier, with its resulting value calibrated t- be a value that is its desired
value minus z. Finally, a third calibrati-n is applied, using a linear -ffset t- shift p-int A back t-
the desired value. This is d-ne by setting z as the -ffset value. Future calibrati-ns are made
simple using this meth-d as well.

## Anal-g Input C-nsiderati-ns

The anal-g inputs -f an interface divide the v-ltage -n the respective pin int- -ne -f several
th-usand steps (see Anal-g Inputs). These inputs are very sensitive t- min-r v-ltage changes,
with f-r example, a 3.3V reference divided int- 4096 steps equates t- 0.805 milliv-lts-per-step.
This level -f sensitivity will invariably result in reading variati-ns even when the input v-ltage
circuit is n-t changing. This is a result -f ambient electrical n-ise and built-in err-r in the
anal-g-t--digital c-nverter circuit -n the interface. Filtering sh-uld be empl-yed t- reduce
n-ise and create a reading that is m-re steady -ver time.

First, electrical filtering and is-lati-n sh-uld be implemented -n all circuits. Is-lati-n refers t-
placing and r-uting l-w v-ltage devices and wiring separate fr-m high v-ltage wiring. Shielded
wiring can als- help. Usage -f filter induct-rs and capacit-rs are als- highly rec-mmended.

Sec-nd, s-ftware filtering -r “digital sm--thing” sh-uld als- be implanted -n all inputs where
reading speed is n-t critical. The ‘Avg Weight’ pr-perty -f an anal-g input affects its digital
sm--thing, with l-wer numbers (~20%) yielding m-re c-nsistent readings but react t- changes
m-re sl-wly. C-nversely, higher averages (~75%) resp-nd t- changes m-re rapidly but als- will
rep-rt m-re variati-n fr-m n-ise. High impedance sens-rs like thermist-rs are m-re pr-ne t-
n-ise, theref-re sh-uld have an ‘Avg Weight’ -f ar-und 10-30%, whereas l-w impedance
sens-rs like pr-p-rti-nal v-ltage sens-rs can have an average weight which is higher, such as
75% -r m-re. Capacit-rs sh-uld always be placed in parallel with high impedance sens-rs t-
reduce n-ise and ensure rapid accurate readings.


F-r example, High impedance sens-rs like thermist-rs are m-re pr-ne t- n-ise, theref-re
sh-uld have an ‘Avg Weight’ -f ar-und 10-30%, whereas l-w impedance sens-rs like
pr-p-rti-nal v-ltage sens-rs can have an average weight which is higher, such as 75% -r m-re.

F-r example, here is a graph -f a sens-r where the ‘Avg Weight’ pr-perty was changed fr-m
100% t- 20% at the arr-w:

## Interface Specific C-nsiderati-ns

#### 1. ESP32

```
a. The BruC-ntr-l Firmware (v45- and bey-nd) includes an Access P-int m-de f-r
Wi-Fi netw-rk setup.
b. Pulling GPI- 5 (pin 5) t- gr-und (via resist-r str-ng en-ugh t- -verride the
internal pull-up resist-r) pri-r t- p-wer-up will cause the ESP-32 t- enter Access
P-int m-de. This m-de will remain active f-r 3 minutes, then revert t- n-rmal
applicati-n. Sh-uld an ESP-32 based micr-c-ntr-ller b-ard which has this pin
hardwired t- gr-und by default, then BruC-ntr-l will n-t be able t-
c-mmunicate with the interface f-r these first thr-ugh minutes f-ll-wing p-wer-
up.
c. The Access P-int will be created with the SSID prefixed by “BruC-ntr-l_######”,
where ###### represents the m-dules hardware address. Using a Wi-Fi enabled
c-mputer, ph-ne, -r tablet, c-nnect t- this access p-int and pr-vide passw-rd
“BruC-ntr-l” if requested. -pen the c-mputer, ph-ne, -r tablet’s internet
br-wser, and -pen a new web page at http://192.168.10.1. An “Interface Wi-Fi
C-nfig” c-nfigurati-n page will appear where netw-rk parameters are st-red.
These are the settings f-r the Wi-Fi netw-rk BruC-ntr-l and the UniFlex will
c-mmunicate thr-ugh.
i. Enter the SSID and passw-rd -f the Wi-Fi netw-rk.
ii. If using a static IP address, enter the IP, GW (gateway), and SN (subnet)
addresses int- the appr-priate fields, using xxx.xxx.xxx.xxx n-tati-n.
```

```
iii. C-nversely, if using a server-assigned IP address via DHCP, leave IP, GW,
and SN fields blank.
d. Save the settings and ensure they are accurately rep-rted back with a “Settings
Saved” message.
```
2. Serial (USB) c-nnecti-ns t- ESP32 may cause a misc-mmunicati-n l--p due t- a p-wer-
    -n reset message issued by the ESP32 internal -perating system. In -rder t- suppress
    this message, I-15 may need be tied t- GND (gr-und) via a 47k resist-r. This w-rk-
    ar-und is -nly required f-r Serial (USB) c-nnecti-ns – n-t Wi-Fi.

## Upgrade Fr-m v1.0

When upgrading fr-m v1.0 t- v1.1, it is imp-rtant t- f-ll-w these instructi-ns c-mpletely:

1. Backup existing BruC-ntr-l data f-lder. This f-lder is l-cated in the user’s
    “D-cuments” f-lder. Make a duplicate -f this f-lder and c-py it t- a safe l-cati-n,
    preferably -n an-ther drive (USB key, netw-rk share, cl-ud st-re, etc.).
2. Extract the files int- a new, unique BruC-ntr-l applicati-n f-lder. D- n-t delete the
    previ-us versi-n in case y-u need t- rest-re.
3. Cl-se the existing BruC-ntr-l applicati-n if running, and make sure t- select
    “DISABLE ALL AND SHUTD-WN”.
4. v1.1 includes updated Interface Wiring Maps. In s-me circumstances, interface
    wiring maps have been changed (f-r example, RTD specific maps have been
    eliminated). The installer must c-mpare the existing v1.0 Interface Wiring Map with
    the v1.1 versi-n t- ensure the existing interface wiring, pin and p-rt definiti-ns
    match the v1.1 map. If any -f the wiring, pins, -r p-rts are different:
       a. The installer sh-uld c-rrect the interface wiring.
       b. The Device Elements which reference inc-rrect p-rts sh-uld be deleted and
          re-created t- address the c-rrect p-rts.
       c. Alternatively, v1.0 Interface Definiti-n files (.brumc files) are included in a
          “v1_Interface_Definiti-ns” f-lder.
             i. T- use these maps, c-py the desired Interface Definiti-n file fr-m the
                “v1_Interface_Definiti-ns” f-lder t- the BruC-ntr-l installati-n
                f-lder, -verwriting the v1.1 Interface Definiti-n file.
5. Execute the new versi-n -f BruC-ntr-l, and carefully check that all Elements, Scripts,
    W-rkspaces, etc. are functi-ning as expected. Rest-re the previ-usly back-ed up
    f-lder if needed.

## Upgrade Fr-m v1.1

1. Cl-se the existing BruC-ntr-l applicati-n if running. Select “DISABLE ALL AND
    SHUTD-WN” -r “SHUTD-WN APP -NLY” as appr-priate.


2. Backup existing BruC-ntr-l data f-lder. This f-lder is l-cated in the user’s “D-cuments”
    f-lder. Make a duplicate -f this f-lder and c-py it t- a safe l-cati-n, preferably -n
    an-ther drive (USB key, netw-rk share, cl-ud st-re, etc.). D- N-T SKIP THIS STEP!
3. Backup existing BruC-ntr-l Applicati-n f-lder. This f-lder is where the BruC-ntr-l
    applicati-n files are l-cated, which was selected up-n initial install. Make a duplicate -f
    this f-lder and c-py it t- a safe l-cati-n, preferably -n an-ther drive (USB key, netw-rk
    share, cl-ud st-re, etc.). -nce backed up, rename this f-lder t- a new backup name,
    such as ‘BruC-ntr-l backup’.
4. Create a new BruC-ntr-l applicati-n f-lder and extract the v1.2 BruC-ntr-l applicati-n
    files there. D- n-t delete the existing versi-n in step 3 in case it needs t- be rest-red.
5. N-te: Existing Element Data will n-t carry -ver fr-m the previ-us versi-n. Theref-re,
    graphs will reset and n-t display hist-ric data.
6. Execute the new versi-n -f BruC-ntr-l, and carefully check that all Elements, Scripts,
    W-rkspaces, etc. are functi-ning as expected.
       a. If n-t, Rest-re the previ-usly back-ed up f-lder if needed.
7. Tr-ublesh--ting
    a. BruC-ntr-l v1.2 utilizes the .NET Framew-rk 4.4. If an -lder -r un-updated
       c-mputer is being used, this may need t- be d-wnl-aded and installed fr-m
       here: https://www.micr-s-ft.c-m/en-us/d-wnl-ad/details.aspx?id=48130
    b. The c-ntr-ller l-g (l-cated in <user>/D-cuments/BruC-ntr-l/L-gs, with a prefix
       -f ‘c-ntr-ller.’ and suffix -f the date) will d-cument any err-rs c-nnecting t- the
       new database.
    c. If the installati-n c-mputer issues a versi-n err-r, please see:
       https://webl-gs.asp.net/dixin/installing-sql-server-2017- 2019 -l-caldb-and-
       res-lve-the-engine-versi-ning-pr-blem

## Upgrade Fr-m v1.2RC

1. Cl-se the existing BruC-ntr-l applicati-n if running. Select “DISABLE ALL AND
    SHUTD-WN” -r “SHUTD-WN APP -NLY” as appr-priate.
2. Backup existing BruC-ntr-l data f-lder. This f-lder is l-cated in the user’s ‘D-cuments’
    f-lder, f-r example ‘D-cuments\BruC-ntr-l’. Make a duplicate -f this f-lder and c-py it
    t- a safe l-cati-n, preferably -n an-ther drive (USB key, netw-rk share, cl-ud st-re,
    etc.). D- N-T SKIP THIS STEP!
3. Backup existing BruC-ntr-l Applicati-n f-lder. This f-lder is where the BruC-ntr-l
    applicati-n files are l-cated, which was selected up-n initial install. Make a duplicate -f
    this f-lder and c-py it t- a safe l-cati-n, preferably -n an-ther drive (USB key, netw-rk
    share, cl-ud st-re, etc.). -nce backed up, rename this f-lder t- a new backup name,
    such as ‘BruC-ntr-l backup’.
4. Decide which data st-rage database t- use g-ing f-rward.


```
a. If preserving existing data is critical, c-ntinue t- use MS SQL Express L-calDB. N-
changes need t- be made t- the existing data f-lder.
b. If preserving data is n-t critical, a switch t- new SQLite database is
rec-mmended. T- make this switch:
i. Delete the “Data” f-lder, including its c-ntents, in the BruC-ntr-l data
f-lder (e.g. D-cuments\BruC-ntr-l\Data)
ii. -pen settings.brusettings using a text edit-r such as N-tepad, and delete
the entire DBC-nnecti-n line, such as ‘<DBC-nnecti-n i:nil="true" />’
```
5. Create a new BruC-ntr-l applicati-n f-lder and extract the v1.3 BruC-ntr-l applicati-n
    file(s) there. D- n-t delete the existing versi-n in step 3 in case it needs t- be rest-red.
6. Execute the new versi-n -f BruC-ntr-l, and carefully check that all Elements, Scripts,
    W-rkspaces, etc. are functi-ning as expected. N-te: With the update t- v2 DPI supp-rt,
    element f-nt sizes may appear differently and need t- be updated.

## Versi-n Hist-ry – v1.1

V1.1 includes the f-ll-wing updates:

- Vari-us bug & missing d-cumented functi-nality fixes
- User interface update
    - Menu updated
    - Settings ic-n m-ved t- right
    - SVG theme called "The Bezier" faster drawing and g--d f-r high res-luti-n
       displays - REC-MMEND USING
    - Minimize t- system tray -pti-n
- Element display
    - Value
        Digital gauge
        Circular gauge
        Linear gauge
    - State
        LED indicat-r
        -FF/-N cust-m text
- Elements
    - Ability t- m-ve acr-ss w-rkspaces
    - Backgr-und images
        Multiple can be assigned and selected
        Backgr-unds can be changed via script (see scripts bel-w)
- Device Elements


```
- TILT sens-r Device Element (ESP32 -nly, -n virtual p-rts 220 – 224)
- Deadband Device Element
```
- Pr-perties dial-gs
    - APPLY butt-n t- inspect changes
    - T-uchscreen butt-n keypad f-r all numerical dial-gs
- Interfaces
    - Anal-g res-luti-n bey-nd 10-bit (per interface capability) PENDING FIRMWARE
       UPDATE
    - Interfaces can be disabled in Interfaces Settings dial-g via checkb-x
- Timers
    - State and value (within 30 sec-nds) saved up-n applicati-n restart
    - Spans n-w include days
    - Tw- alarm thresh-lds can be set natively (n- script required)
- Scripts
    - Wait statements with time-uts can be stepped -ver during pause m-de
    - C-mmands
        Element Backgr-unds
          - Syntax: "Element 1" backgr-und = 1
        W-rkspace display
          - Syntax: sh-w w-rkspace “W-rkspace”
    - Subr-utines
        Secti-ns -f c-de can be re-used f-r simplicity
        Syntax:
          - T- start executi-n -f secti-n: call “secti-n_name”
          - T- return t- call p-int: return
    - Real time functi-ns
        New date/time variable value
          - Declare date/time variable
             - Syntax: new datetime my_date
          - Assign a time
             - Syntax: my_date = “09:05:45”
          - Current time
             - Syntax: my_date = n-w
    - Scripts are st-pped in applicati-n startup, n-t paused
- Data Exchange
    - Data exchange in and -ut -f Gl-bals
    - Pr-fessi-nal license required
- C-nfigurati-n files
    - Aut-matic daily backups with 30-day hist-ry in BruC-ntr-l/C-nfig Backup f-lder


```
- T- rest-re, manual c-py/paste/rename is required
```
- Calibrati-n
    - Added Kelvin -> Fahrenheit
    - Added l--kup table
    - Added Divider (rather than using inverse multiply)
- Variables – MAJ-R CHANGE
    - “Inspect-r Elements”
        Replace “Variable” Elements
        Same -perati-n as bef-re: display values -f discrete in-script variables
    - “Gl-bal” Elements
        New type -f element which st-res a value, text, time, date/time
        Value exists in the element, n-t in a script
        Value lasts in perpetuity (saved inside c-nfigurati-n files)
        Values saved int- c-nfigurati-n file f-r perpetuity
        Can be accessed via multiple scripts (als- t- share data acr-ss scripts)
    - Previ-us in-script variables
        -perate as bef-re

## Versi-n Hist-ry – v1.2RC

V1.2RC includes the f-ll-wing updates:

- Vari-us bug & missing d-cumented functi-nality fixes
- Elements
    - P-rt ID and Element ID differentiated. The “ID” pr-perty is still there and is equal
       t- the ElementID when it is a n-n-device element. It is equal t- the P-rtID if it is
       a device element. The data l-gging is always using the ElementID.
- Device Elements
    - Added Use PWM -pti-n f-r PID’s & Deadbands rather than f-ll-wing PWM
       capability in Interface Wiring Maps
    - Added “Predictive Hysteresis” m-de which attempts t- reduce temperature
       -versh--t -ver time. N-te: will likely cause m-re cycling, which c-uld accelerate
       wear -n devices (e.g. refrigerati-n c-mpress-rs).
- User Interface
    - Swapped Settings/Menu ic-ns
    - Aut-matic L-ck functi-n added
    - Script wind-w height in settings
- C-re Applicati-n
    - Updated t- use .NET Framew-rk 4.4
    - Updated t- use new c-ntr-ls library
    - SQL Database added f-r data l-gging


```
- L-g files f-r diagn-stics c-nfigurable by interface, n-w -ff by default
```
- Licensing
    - New license system
    - ‘EVALUATI-N’ license added (requires n- activati-n f-r 15 days)
- Scripts
    - Direct script c-mmand
    - String text line feed
    - Script running status available in an-ther script
- Elements
    - Added Display Name (alias) field
    - Dual Thr-w -utput (requires FW 45-+)
    - Device Element Enable Switch
    - Element l-cati-n and size in pr-perties
    - Use PWM (if available) in PID and Deadband (requires FW 45-+)
    - Pr-file Element (n-t c-mplete yet)

## Versi-n Hist-ry – v1.3

V1.3 includes the f-ll-wing updates:

- C-re Applicati-n
    - Pr-ject upgraded t- .NET 10 - All supp-rting libraries updated t- their latest
       versi-ns
    - Added v2 DPI supp-rt - Impr-ved high-res-luti-n display c-mpatibility f-r
       Wind-ws F-rms UI
    - Fixed settings c-rrupti-n bug - Implemented ACID saves with backup pr-tecti-n
       f-r c-nfig files
    - An-nym-us crash rep-rting - Err-r rep-rts sent t- help m-nit-r and impr-ve
       system stability
    - Settings f-rmat changed t- YAML - Impr-ved readability with aut-matic
       migrati-n fr-m XML
    - Migrati-n state tracking - New system t- manage versi-n depl-yments and
       c-nfigurati-n changes
- Database
    - MSSQL database maintenance - Aut-matic size m-nit-ring and index rebuilding
       f-r -ptimal perf-rmance
    - Default database changed t- SQLite - New installati-ns n-w use SQLite by
       default instead -f MSSQL
    - Database migrati-n impr-vements - Existing installati-ns n-w default t- MSSQL
       unless database is missing, then fallback t- SQLite
    - Expanded database supp-rt - Added P-stgreSQL and M-ng-DB backend -pti-ns


```
- C-nfigurable data retenti-n - Data retenti-n time can n-w be set in settings
instead -f fixed 30-day peri-d
```
- Gl-bals
    - Gl-bal Variables l-gging frequency c-ntr-l - New pr-perty t- reduce l-gging
       frequency and save database space

## Technical Assistance

Technical assistance, tr-ublesh--ting, and build res-urces are available via:

1. Website: BruC-ntr-l.c-m
2. C-mmunity F-rum: Bruc-ntr-l.c-m/c-mmunity
3. H-meBrewTalk F-rum: H-meBrewTalk
4. Email BruC-ntr-l Technical Supp-rt: inf-@bruc-ntr-l.c-m


