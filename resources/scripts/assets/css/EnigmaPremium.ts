import tw from 'twin.macro';
import { createGlobalStyle } from 'styled-components/macro';

export default createGlobalStyle`
:root {
    --gradient:linear-gradient(to right,#f86e1f,#944fa2);
    --text:#eee;
    --second-text:#ccc;
    --placeholder:#6c6c6c;

    --700:hsl(0, 0%, 13%);
    --800:hsl(0, 0%, 9%);
    --900:hsl(0, 0%, 7%);
}

::-webkit-scrollbar {
    width:5px;
    height:3px;
}
::-webkit-scrollbar-track {
    background:var(--900);
}
::-webkit-scrollbar-thumb {
    background:var(--700);
    border-radius:0;
}

body {
    overflow-x:hidden !important;
}
input,textarea {
    border:none !important;
    outline:none !important;
    box-shadow:none !important;
    border-radius:8px !important;
}
input::placeholder {
    color:var(--placeholder);
    font-size:14px;
}
label {
    background:var(--900) !important;
    border:1px solid var(--700) !important;
}
label::before {
    background:var(--700) !important;
    border:0 !important;
}
input[type="checkbox"]:checked + label {
    background:var(--gradient) !important;
}
select, textarea {
    outline:none !important;
    border:none !important;
}

.leftMenu {
    min-width:220px;
    max-width:220px;
    height:100vh;
    position:relative;
    display:block;
}
.leftMenuFixed {
    position:fixed;
    width:220px;
    height:100%;
    box-sizing:border-box;
    padding:30px 15px 15px;
    z-index:1;
}
.leftLogo {
    padding:0 20px;
}
.leftMenuContent {
    height:100%;
}
.leftMenuContent > * {
    border:none !important;
    box-shadow:none !important;
    display:flex;
    align-items:center;
    min-width:100%;
    min-height:46px;
    border-radius:10px;
    box-sizing:border-box;
    padding:0 15px !important;
    margin:3px 0;
    position:relative;
}
.leftMenuContent > *::before {
    content:'';
    position:absolute;
    width:100%;
    height:100%;
    margin-left:-15px;
    border-radius:10px;
    z-index:0;
    background:var(--gradient) !important;
    opacity:0;
    transition:.2s;
}
.leftMenuContent > *:hover::before,
.leftMenuContent > .active::before {
    opacity:1;
}
.leftMenuContent > *:hover {
    background:transparent !important;
}
.leftMenuContent > * > * {
    z-index:1;
    color:#eee;
}
.subcategory {
    opacity:.5;
    font-size:14px;
    text-transform:uppercase;
    font-weight:bold;
    margin-top:25px !important;
    margin-bottom:5px !important;
    min-height:fit-content !important;
}
.subcategory::before {
    background:transparent !important;
}
.mainContent {
    width:100%;
    max-width:1200px;
    margin:0 auto;
    box-sizing:border-box;
    padding:0 25px;
}
.homeBg {
    width:calc(100% + 74px);
    margin-left:-50px;
    margin-bottom:70px;
    position:relative;
}
.homeBg h1,.homeBg h2 {
    margin-left:50px;
    z-index:1;
    position:relative;
}
.homeBg h1 {
    font-size:30px;
    color:var(--text);
    font-weight:800;
    line-height:120%;
}
.homeBg h2 {
    font-size:18px;
    color:var(--second-text);
    font-weight:400;
    line-height:100%;
}
.waves {
    position:absolute;
    width:100%;
    overflow-x:hidden;
    height:135px;
    overflow:hidden;
    left:0;
    top:0;
    display:flex;
    z-index:0;
}
.waves svg {
    min-width:974px;
    height:218px;
    margin-top:-115px;
}
.waves svg:nth-child(even) {
    transform:scaleX(-1);
}
.waves::after {
    content:'';
    position:absolute;
    width:100%;
    height:135px;
    background: linear-gradient(to right,#171717 1%,transparent 15%),linear-gradient(to left,#171717 1%,transparent 15%), linear-gradient(to top,#171717 25%,transparent 100%);
}
.userAvatar {
    width:100%;
    height:100%;
    border-radius:inherit;
}
.clear {
    clear:both;
}
.homeServers {
    width:calc(100% - 300px);
    box-sizing:border-box;
    float:left;
}
.homeAds {
    width:300px;
    box-sizing:border-box;
    float:right;
    padding:15px;
    padding-right:0;
    padding-top:35px;
}
.homeServers h2 {
    text-transform:uppercase;
    font-weight:bold;
    color:var(--text);
    margin-bottom:10px;
}
.tarifBox {
    display:flex;
    justify-content:space-between;
    margin:0 0 40px;
}
.tarif {
    background:var(--700);
    width:24%;
    box-sizing:border-box;
    padding:10px;
    border-radius:10px;
    display:flex;
    flex-wrap:wrap;
    align-items:center;
    justify-content:center;
    text-align:center;
    border-bottom:3px solid var(--900);
}
.tarif img {
    width:40%;
    margin:0 30%;
    clear:both;
    margin-top:10px;
    margin-bottom:15px;
}
.tarif p {
    font-size:14px;
    font-weight:400;
    line-height:100%;
    margin-top:10px;
    color:var(--second-text);
}
.tarif a {
    width:90%;
    background:var(--800);
    box-sizing:border-box;
    padding:10px;
    text-align:center;
    border-radius:10px;
    font-size:14px;
    text-transform:uppercase;
    margin-top:15px;
    color:var(--text);
}
.tarif h2 {
    width:100%;
    text-align:center;
}
.searchInput input {
    min-width:400px !important;
    box-sizing:border-box !important;
    padding-left:40px !important;
}
.searchInput svg {
    position:absolute;
    margin-left:15px;
    margin-top:14px;
    color:var(--placeholder);
}
.serverRow {
    padding:0 !important;
    border:none !important;
    background:transparent !important;
    display:flex !important;
    justify-content:space-between !important;
}
.serverRowDetails {
    min-width:110px;
}
.serverIcon {
    min-width:46px;
    max-width:46px;
    height:46px;
    border-radius:10px;
    display:flex;
    justify-content:center;
    align-items:center;
    background:var(--700);
}
.btn {
    background:var(--700);
    box-sizing:border-box;
    padding:6px 12px;
    text-align:center;
    border-radius:10px;
    font-size:14px;
    color:var(--text);
}
.status-bar {
    min-width: 8px;
    min-height:8px;
    max-width: 8px;
    max-height:8px;
}
.serverDetails {
    display:flex;
}
.serverDetails > p {
    color:var(--second-text);
    ${tw`mr-5`};
}
.serverDetails > p > svg {
    ${tw`mr-1`};
}
.footer {
    opacity:.5;
    position:absolute;
    right:0;
    width:calc(100vw - 220px);
    margin-left:-25px;
    background:var(--900);
    padding:10px 0;
}
.stats_icon {
    position:absolute;
    width:75px;
    opacity:.05;
    right:-35px;
    top:10px;
}
.power_btn {
    width:100px;
    height:100px;
    border-radius:10px !important;
    margin-bottom:5px;
    outline:none !important;
    box-shadow:none !important;
    background:var(--900) !important;
    border:2px solid transparent;
    transition:.15s !important;
    transition-timing-function:linear !important;
    display:flex !important;
    flex-wrap:wrap !important;
    align-items:center !important;
    align-content:center !important;
    justify-content:center !important;
    color:var(--text) !important;
    position:relative !important;
}
.power_btn svg {
    width:26px !important;
    height:auto;
    margin-bottom:10px;
}
.power_btn span {
    width:100%;
    display:block;
    position:relative;
    font-weight:400 !important;
    font-size:12px !important;
    opacity:.3;
    position:absolute;
    bottom:5px;
}
.power_btn.btn_start:hover {
    border:2px solid rgba(37, 99, 235, 1) !important;
}
.power_btn.btn_restart:hover {
    border:2px solid darkorange;
}
.power_btn.btn_stop {
    border:2px solid rgba(220, 38, 38, .5);
}
.power_btn.btn_stop:hover {
    background:rgba(220, 38, 38, .5) !important;
}
.backdrop {
    background:rgba(0,0,0,.5);
    backdrop-filter:blur(5px);
    border-radius:10px !important;
}
.modal_components > div > div > .bg-gray-700 {
    background:var(--800) !important;
}
.modal_components label {
    background:transparent !important;
    border:none !important;
}
.modal_components input[type="checkbox"] + label {
    background:var(--800) !important;
    border:2px solid var(--800) !important;
}
.modal_components input[type="checkbox"]:checked + label {
    background:var(--gradient) !important;
}
.greyBox input,
.greyBox textarea,
.greyBox select,
.greyBox code {
    background:var(--800) !important;
}
.greyBox input[type="checkbox"]:checked {
    background:var(--placeholder) !important;
}
.greyBox label {
    background:transparent !important;
}
.accountAva {
    width:75px;
    height:75px;
    margin-right:12px;
    border:5px solid var(--700);
    border-radius:10px;
    overflow:hidden;
}
.accountAva * {
    border-radius:0 !important;
}
.role {
    background:var(--gradient);
    border-radius:5px;
    font-size:11px;
    font-weight:400;
    padding:0px 7px;
    max-height:fit-content;
    margin-left:10px;
}
.accountContainer {
    background:var(--700);
    width:fit-content;
    height:fit-content;
    border-radius:8px;
    box-sizing:border-box;
    padding:15px 15px 20px;
}
.accountContainer input,
.accountContainer textarea,
.accountContainer select,
.accountContainer code {
    background:var(--800) !important;
}
.accountContainer input[type="checkbox"]:checked {
    background:var(--placeholder) !important;
}
.accountContainer label {
    background:transparent !important;
}
.accountSubmenu {
    width:100%;
    display:flex;
    align-items:center;
    background:var(--900);
    box-sizing:border-box;
    padding:10px 15px 0;
    border-radius:8px 8px 0 0;
}
.accountSubmenu > p {
    margin-right:8px;
    cursor:pointer;
    padding-bottom:10px;
}
.accountSubmenu .active {
    box-shadow:inset 0 -2px #565656;
}
.accountSettings {
    position:relative;
    width:100%;
    box-sizing:border-box;
    padding:10px 15px 15px;
}
.dopSettings {
    margin-top:-8px;
    padding:3px 8px;
    border-radius:5px;
    background:var(--700);
    display:flex;
    align-items:center;
    cursor:pointer;
    margin-left:3px;
}
.closeDop {
    height:fit-content;
    width:20px;
    height:20px;
    display:flex;
    align-items:center;
    justify-content:center;
    font-size:12px;
    align-content:center;
    border-radius:5px;
    background:var(--800);
    margin-left:5px;
}
.authBg {
    width:100vw;
    height:100%;
    background:var(--900);
}
.authContainer {
    width:50vw;
    min-height:100vh;
    display:flex;
    align-items:center;
}
.authContainer:after {
    content:'';
    right:0;
    top:0;
    width:50vw;
    height:100vh;
    background:linear-gradient(to right,#121212,transparent), url('/themes/enigma_premium/img/waves.jpg');
    background-size:cover;
    position:fixed;
}
.loginBox {
    width:500px;
    margin:0 auto;
    box-sizing:border-box;
    padding:0 25px;
}
.loginBox label {
    background:transparent !important;
    border:none !important;
    color:var(--text) !important;
    margin-top:0 !important;
}
.loginBox a {
    color:var(--text) !important;
}
.loginBox input {
    background:var(--700) !important;
}
.loginBox button {
    background:var(--gradient) !important;
    border-radius:10px !important;
}
.mobileMenuOpen {
    width:40px;
    height:40px;
    border-radius:8px;
    background:var(--700);
    border:2px solid var(--800);
    justify-content:center;
    align-items:center;
    z-index:9999999;
    position:absolute;
    left:calc(100vw + 220px - 50px);
    top:10px;
    display:none;
}

@media(max-device-width:1200px) {
    .homeAds {
        display:none;
    }
    .homeServers {
        width:100%;
    }
}
@media(max-device-width:1050px) {
    .leftMenu {
        left:-221px;
        position:absolute;
        z-index:99999;
    }
    .closed {
        left:-221px !important;
    }
    .opened {
        left:0 !important;
    }
    .opened .mobileMenuOpen {
        left:calc(100vw - 50px);
    }
    .mobileMenuOpen {
        display:flex;
    }
    .power_btn {
        width:80px;
        height:80px;
    }
    .footer {
        width:100% !important;
        margin-left:0 !important;
    }
    .accountBlocks {
        flex-wrap:wrap;
    }
    .accountContainer,
    .accountContAdapt {
        min-width:fit-content !important;
        width:100% !important;
    }
    .accountRight {
        margin-left:0;
        margin-top:10px;
    }
}
@media(max-device-width:750px) {
    .serverRow > div:nth-child(2) {
        display:none !important;
    }
    .tarifBox {
        flex-wrap:wrap;
    }
    .tarif {
        width:49%;
        margin-bottom:10px;
    }
    .switcher {
        top:-34px !important;
    }
    .searchInput {
        width:100%;
    }
    .searchInput input {
        min-width:100% !important;
    }
    .serverPowers {
        display:flex !important;
        width:100% !important;
        margin-bottom:10px;
    }
    .consoleAdapt {
        display:block !important;
        margin-top:12px;
    }
    .power_btn {
        display:flex !important;
        align-items:center;
        flex-wrap:nowrap !important;
        width:fit-content !important;
        height:fit-content !important;
        margin-right:10px;
        margin-bottom:0;
    }
    .power_btn svg {
        width:18px !important;
        margin:0 8px 0 0;
    }
    .power_btn span {
        width:fit-content !important;
        position:relative !important;
        height:16px;
    }
    .serverMore {
        display:none;
    }
    .authContainer {
        width:100vw;
    }
    .authContainer:after {
        display:none;
    }
}
@media(max-device-width:640px) {
    .serverDetailsBlockAdapt {
        grid-template-columns:repeat(3, minmax(0, 1fr));
    }
}
`;