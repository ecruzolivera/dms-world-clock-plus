.pragma library

// Bundled offline search data. Format: "City|Country|IANA zone", one per line.
var CITY_DATA = `
Abidjan|Côte d'Ivoire|Africa/Abidjan
Abu Dhabi|United Arab Emirates|Asia/Dubai
Abuja|Nigeria|Africa/Lagos
Accra|Ghana|Africa/Accra
Adelaide|Australia|Australia/Adelaide
Addis Ababa|Ethiopia|Africa/Addis_Ababa
Ahmedabad|India|Asia/Kolkata
Albuquerque|United States|America/Denver
Alexandria|Egypt|Africa/Cairo
Algiers|Algeria|Africa/Algiers
Almaty|Kazakhstan|Asia/Almaty
Amman|Jordan|Asia/Amman
Amsterdam|Netherlands|Europe/Amsterdam
Anchorage|United States|America/Anchorage
Andorra la Vella|Andorra|Europe/Andorra
Ankara|Turkey|Europe/Istanbul
Antalya|Turkey|Europe/Istanbul
Antananarivo|Madagascar|Indian/Antananarivo
Apia|Samoa|Pacific/Apia
Asmara|Eritrea|Africa/Asmara
Astana|Kazakhstan|Asia/Almaty
Asunción|Paraguay|America/Asuncion
Athens|Greece|Europe/Athens
Atlanta|United States|America/New_York
Auckland|New Zealand|Pacific/Auckland
Austin|United States|America/Chicago
Baghdad|Iraq|Asia/Baghdad
Baku|Azerbaijan|Asia/Baku
Baltimore|United States|America/New_York
Bamako|Mali|Africa/Bamako
Bandung|Indonesia|Asia/Jakarta
Bangalore|India|Asia/Kolkata
Bengaluru|India|Asia/Kolkata
Bangkok|Thailand|Asia/Bangkok
Bangui|Central African Republic|Africa/Bangui
Banjul|Gambia|Africa/Banjul
Barcelona|Spain|Europe/Madrid
Barranquilla|Colombia|America/Bogota
Basel|Switzerland|Europe/Zurich
Beijing|China|Asia/Shanghai
Beirut|Lebanon|Asia/Beirut
Belfast|United Kingdom|Europe/London
Belgrade|Serbia|Europe/Belgrade
Belize City|Belize|America/Belize
Belo Horizonte|Brazil|America/Sao_Paulo
Bergen|Norway|Europe/Oslo
Berlin|Germany|Europe/Berlin
Bern|Switzerland|Europe/Zurich
Bilbao|Spain|Europe/Madrid
Birmingham|United Kingdom|Europe/London
Bishkek|Kyrgyzstan|Asia/Bishkek
Bissau|Guinea-Bissau|Africa/Bissau
Bogotá|Colombia|America/Bogota
Boise|United States|America/Boise
Bologna|Italy|Europe/Rome
Bordeaux|France|Europe/Paris
Boston|United States|America/New_York
Brasília|Brazil|America/Sao_Paulo
Bratislava|Slovakia|Europe/Bratislava
Brazzaville|Republic of the Congo|Africa/Brazzaville
Bremen|Germany|Europe/Berlin
Brisbane|Australia|Australia/Brisbane
Bristol|United Kingdom|Europe/London
Brno|Czechia|Europe/Prague
Brussels|Belgium|Europe/Brussels
Bucharest|Romania|Europe/Bucharest
Budapest|Hungary|Europe/Budapest
Buenos Aires|Argentina|America/Argentina/Buenos_Aires
Bujumbura|Burundi|Africa/Bujumbura
Busan|South Korea|Asia/Seoul
Cairo|Egypt|Africa/Cairo
Calgary|Canada|America/Edmonton
Cali|Colombia|America/Bogota
Cambridge|United Kingdom|Europe/London
Canberra|Australia|Australia/Sydney
Cancún|Mexico|America/Cancun
Cape Town|South Africa|Africa/Johannesburg
Caracas|Venezuela|America/Caracas
Cardiff|United Kingdom|Europe/London
Casablanca|Morocco|Africa/Casablanca
Cebu|Philippines|Asia/Manila
Chandigarh|India|Asia/Kolkata
Charlotte|United States|America/New_York
Chengdu|China|Asia/Shanghai
Chennai|India|Asia/Kolkata
Chiang Mai|Thailand|Asia/Bangkok
Chicago|United States|America/Chicago
Chișinău|Moldova|Europe/Chisinau
Chittagong|Bangladesh|Asia/Dhaka
Chongqing|China|Asia/Shanghai
Christchurch|New Zealand|Pacific/Auckland
Cincinnati|United States|America/New_York
Cleveland|United States|America/New_York
Cluj-Napoca|Romania|Europe/Bucharest
Colombo|Sri Lanka|Asia/Colombo
Cologne|Germany|Europe/Berlin
Columbus|United States|America/New_York
Conakry|Guinea|Africa/Conakry
Copenhagen|Denmark|Europe/Copenhagen
Córdoba|Argentina|America/Argentina/Cordoba
Cork|Ireland|Europe/Dublin
Curitiba|Brazil|America/Sao_Paulo
Dakar|Senegal|Africa/Dakar
Dallas|United States|America/Chicago
Damascus|Syria|Asia/Damascus
Dar es Salaam|Tanzania|Africa/Dar_es_Salaam
Darwin|Australia|Australia/Darwin
Davao|Philippines|Asia/Manila
Delhi|India|Asia/Kolkata
New Delhi|India|Asia/Kolkata
Denpasar|Indonesia|Asia/Makassar
Bali|Indonesia|Asia/Makassar
Denver|United States|America/Denver
Detroit|United States|America/Detroit
Dhaka|Bangladesh|Asia/Dhaka
Dili|Timor-Leste|Asia/Dili
Djibouti|Djibouti|Africa/Djibouti
Doha|Qatar|Asia/Qatar
Dortmund|Germany|Europe/Berlin
Douala|Cameroon|Africa/Douala
Dresden|Germany|Europe/Berlin
Dubai|United Arab Emirates|Asia/Dubai
Dublin|Ireland|Europe/Dublin
Durban|South Africa|Africa/Johannesburg
Dushanbe|Tajikistan|Asia/Dushanbe
Düsseldorf|Germany|Europe/Berlin
Edinburgh|United Kingdom|Europe/London
Edmonton|Canada|America/Edmonton
Eindhoven|Netherlands|Europe/Amsterdam
El Paso|United States|America/Denver
Faro|Portugal|Europe/Lisbon
Florence|Italy|Europe/Rome
Fortaleza|Brazil|America/Fortaleza
Frankfurt|Germany|Europe/Berlin
Freetown|Sierra Leone|Africa/Freetown
Fukuoka|Japan|Asia/Tokyo
Funchal|Portugal|Atlantic/Madeira
Gaborone|Botswana|Africa/Gaborone
Gdańsk|Poland|Europe/Warsaw
Geneva|Switzerland|Europe/Zurich
Genoa|Italy|Europe/Rome
Georgetown|Guyana|America/Guyana
Ghent|Belgium|Europe/Brussels
Glasgow|United Kingdom|Europe/London
Gothenburg|Sweden|Europe/Stockholm
Graz|Austria|Europe/Vienna
Guadalajara|Mexico|America/Mexico_City
Guangzhou|China|Asia/Shanghai
Guatemala City|Guatemala|America/Guatemala
Guayaquil|Ecuador|America/Guayaquil
Halifax|Canada|America/Halifax
Hamburg|Germany|Europe/Berlin
Hamilton|Bermuda|Atlantic/Bermuda
Hangzhou|China|Asia/Shanghai
Hanoi|Vietnam|Asia/Bangkok
Hanover|Germany|Europe/Berlin
Harare|Zimbabwe|Africa/Harare
Havana|Cuba|America/Havana
Helsinki|Finland|Europe/Helsinki
Hiroshima|Japan|Asia/Tokyo
Ho Chi Minh City|Vietnam|Asia/Ho_Chi_Minh
Saigon|Vietnam|Asia/Ho_Chi_Minh
Hobart|Australia|Australia/Hobart
Hong Kong|China|Asia/Hong_Kong
Honolulu|United States|Pacific/Honolulu
Houston|United States|America/Chicago
Hyderabad|India|Asia/Kolkata
Indianapolis|United States|America/Indiana/Indianapolis
Irkutsk|Russia|Asia/Irkutsk
Islamabad|Pakistan|Asia/Karachi
Istanbul|Turkey|Europe/Istanbul
Izmir|Turkey|Europe/Istanbul
Jacksonville|United States|America/New_York
Jaipur|India|Asia/Kolkata
Jakarta|Indonesia|Asia/Jakarta
Jeddah|Saudi Arabia|Asia/Riyadh
Jerusalem|Israel|Asia/Jerusalem
Johannesburg|South Africa|Africa/Johannesburg
Juba|South Sudan|Africa/Juba
Kabul|Afghanistan|Asia/Kabul
Kaliningrad|Russia|Europe/Kaliningrad
Kampala|Uganda|Africa/Kampala
Kansas City|United States|America/Chicago
Kaohsiung|Taiwan|Asia/Taipei
Karachi|Pakistan|Asia/Karachi
Kathmandu|Nepal|Asia/Kathmandu
Kazan|Russia|Europe/Moscow
Khartoum|Sudan|Africa/Khartoum
Kharkiv|Ukraine|Europe/Kyiv
Kigali|Rwanda|Africa/Kigali
Kingston|Jamaica|America/Jamaica
Kinshasa|DR Congo|Africa/Kinshasa
Kobe|Japan|Asia/Tokyo
Kolkata|India|Asia/Kolkata
Calcutta|India|Asia/Kolkata
Kraków|Poland|Europe/Warsaw
Krasnoyarsk|Russia|Asia/Krasnoyarsk
Kuala Lumpur|Malaysia|Asia/Kuala_Lumpur
Kuwait City|Kuwait|Asia/Kuwait
Kyiv|Ukraine|Europe/Kyiv
Kyoto|Japan|Asia/Tokyo
La Paz|Bolivia|America/La_Paz
Lagos|Nigeria|Africa/Lagos
Lahore|Pakistan|Asia/Karachi
Las Palmas|Spain|Atlantic/Canary
Las Vegas|United States|America/Los_Angeles
Leeds|United Kingdom|Europe/London
Leipzig|Germany|Europe/Berlin
Libreville|Gabon|Africa/Libreville
Lille|France|Europe/Paris
Lilongwe|Malawi|Africa/Blantyre
Lima|Peru|America/Lima
Linz|Austria|Europe/Vienna
Lisbon|Portugal|Europe/Lisbon
Liverpool|United Kingdom|Europe/London
Ljubljana|Slovenia|Europe/Ljubljana
Lomé|Togo|Africa/Lome
London|United Kingdom|Europe/London
Los Angeles|United States|America/Los_Angeles
Luanda|Angola|Africa/Luanda
Lusaka|Zambia|Africa/Lusaka
Luxembourg|Luxembourg|Europe/Luxembourg
Lviv|Ukraine|Europe/Kyiv
Lyon|France|Europe/Paris
Macau|China|Asia/Macau
Madrid|Spain|Europe/Madrid
Malabo|Equatorial Guinea|Africa/Malabo
Málaga|Spain|Europe/Madrid
Malé|Maldives|Indian/Maldives
Malmö|Sweden|Europe/Stockholm
Managua|Nicaragua|America/Managua
Manama|Bahrain|Asia/Bahrain
Manaus|Brazil|America/Manaus
Manchester|United Kingdom|Europe/London
Manila|Philippines|Asia/Manila
Maputo|Mozambique|Africa/Maputo
Maracaibo|Venezuela|America/Caracas
Marrakesh|Morocco|Africa/Casablanca
Marseille|France|Europe/Paris
Maseru|Lesotho|Africa/Maseru
Mecca|Saudi Arabia|Asia/Riyadh
Medan|Indonesia|Asia/Jakarta
Medellín|Colombia|America/Bogota
Melbourne|Australia|Australia/Melbourne
Memphis|United States|America/Chicago
Mérida|Mexico|America/Merida
Mexico City|Mexico|America/Mexico_City
Miami|United States|America/New_York
Milan|Italy|Europe/Rome
Milwaukee|United States|America/Chicago
Minneapolis|United States|America/Chicago
Minsk|Belarus|Europe/Minsk
Mogadishu|Somalia|Africa/Mogadishu
Mombasa|Kenya|Africa/Nairobi
Monaco|Monaco|Europe/Monaco
Monrovia|Liberia|Africa/Monrovia
Monterrey|Mexico|America/Monterrey
Montevideo|Uruguay|America/Montevideo
Montreal|Canada|America/Toronto
Moscow|Russia|Europe/Moscow
Mumbai|India|Asia/Kolkata
Bombay|India|Asia/Kolkata
Munich|Germany|Europe/Berlin
Muscat|Oman|Asia/Muscat
Nagoya|Japan|Asia/Tokyo
Nairobi|Kenya|Africa/Nairobi
Nanjing|China|Asia/Shanghai
Nantes|France|Europe/Paris
Naples|Italy|Europe/Rome
Nashville|United States|America/Chicago
Nassau|Bahamas|America/Nassau
N'Djamena|Chad|Africa/Ndjamena
New Orleans|United States|America/Chicago
New York|United States|America/New_York
Newcastle|United Kingdom|Europe/London
Niamey|Niger|Africa/Niamey
Nice|France|Europe/Paris
Nicosia|Cyprus|Asia/Nicosia
Nouakchott|Mauritania|Africa/Nouakchott
Nouméa|New Caledonia|Pacific/Noumea
Novosibirsk|Russia|Asia/Novosibirsk
Nuremberg|Germany|Europe/Berlin
Nuuk|Greenland|America/Nuuk
Oakland|United States|America/Los_Angeles
Odesa|Ukraine|Europe/Kyiv
Oklahoma City|United States|America/Chicago
Omaha|United States|America/Chicago
Omsk|Russia|Asia/Omsk
Orlando|United States|America/New_York
Osaka|Japan|Asia/Tokyo
Oslo|Norway|Europe/Oslo
Ottawa|Canada|America/Toronto
Ouagadougou|Burkina Faso|Africa/Ouagadougou
Oxford|United Kingdom|Europe/London
Palermo|Italy|Europe/Rome
Palma|Spain|Europe/Madrid
Panama City|Panama|America/Panama
Papeete|French Polynesia|Pacific/Tahiti
Paramaribo|Suriname|America/Paramaribo
Paris|France|Europe/Paris
Perth|Australia|Australia/Perth
Philadelphia|United States|America/New_York
Phnom Penh|Cambodia|Asia/Phnom_Penh
Phoenix|United States|America/Phoenix
Pittsburgh|United States|America/New_York
Podgorica|Montenegro|Europe/Podgorica
Port Louis|Mauritius|Indian/Mauritius
Port Moresby|Papua New Guinea|Pacific/Port_Moresby
Port of Spain|Trinidad and Tobago|America/Port_of_Spain
Port-au-Prince|Haiti|America/Port-au-Prince
Portland|United States|America/Los_Angeles
Porto|Portugal|Europe/Lisbon
Porto Alegre|Brazil|America/Sao_Paulo
Prague|Czechia|Europe/Prague
Praia|Cape Verde|Atlantic/Cape_Verde
Pretoria|South Africa|Africa/Johannesburg
Pristina|Kosovo|Europe/Belgrade
Puebla|Mexico|America/Mexico_City
Pune|India|Asia/Kolkata
Punta Cana|Dominican Republic|America/Santo_Domingo
Pyongyang|North Korea|Asia/Pyongyang
Quebec City|Canada|America/Toronto
Quito|Ecuador|America/Guayaquil
Rabat|Morocco|Africa/Casablanca
Raleigh|United States|America/New_York
Recife|Brazil|America/Recife
Reykjavík|Iceland|Atlantic/Reykjavik
Riga|Latvia|Europe/Riga
Rio de Janeiro|Brazil|America/Sao_Paulo
Riyadh|Saudi Arabia|Asia/Riyadh
Rome|Italy|Europe/Rome
Rosario|Argentina|America/Argentina/Buenos_Aires
Rotterdam|Netherlands|Europe/Amsterdam
Sacramento|United States|America/Los_Angeles
Saint Petersburg|Russia|Europe/Moscow
Salt Lake City|United States|America/Denver
Salvador|Brazil|America/Bahia
Salzburg|Austria|Europe/Vienna
San Antonio|United States|America/Chicago
San Diego|United States|America/Los_Angeles
San Francisco|United States|America/Los_Angeles
San José|Costa Rica|America/Costa_Rica
San Jose|United States|America/Los_Angeles
San Juan|Puerto Rico|America/Puerto_Rico
San Salvador|El Salvador|America/El_Salvador
Sana'a|Yemen|Asia/Aden
Santa Cruz|Bolivia|America/La_Paz
Santiago|Chile|America/Santiago
Santo Domingo|Dominican Republic|America/Santo_Domingo
São Paulo|Brazil|America/Sao_Paulo
Sapporo|Japan|Asia/Tokyo
Sarajevo|Bosnia and Herzegovina|Europe/Sarajevo
Seattle|United States|America/Los_Angeles
Sendai|Japan|Asia/Tokyo
Seoul|South Korea|Asia/Seoul
Seville|Spain|Europe/Madrid
Shanghai|China|Asia/Shanghai
Shenzhen|China|Asia/Shanghai
Singapore|Singapore|Asia/Singapore
Skopje|North Macedonia|Europe/Skopje
Sofia|Bulgaria|Europe/Sofia
St. Louis|United States|America/Chicago
St. John's|Canada|America/St_Johns
Stockholm|Sweden|Europe/Stockholm
Strasbourg|France|Europe/Paris
Stuttgart|Germany|Europe/Berlin
Surabaya|Indonesia|Asia/Jakarta
Suva|Fiji|Pacific/Fiji
Sydney|Australia|Australia/Sydney
Taipei|Taiwan|Asia/Taipei
Tallinn|Estonia|Europe/Tallinn
Tampa|United States|America/New_York
Tampere|Finland|Europe/Helsinki
Tashkent|Uzbekistan|Asia/Tashkent
Tbilisi|Georgia|Asia/Tbilisi
Tegucigalpa|Honduras|America/Tegucigalpa
Tehran|Iran|Asia/Tehran
Tel Aviv|Israel|Asia/Jerusalem
Thessaloniki|Greece|Europe/Athens
Thimphu|Bhutan|Asia/Thimphu
Tianjin|China|Asia/Shanghai
Tijuana|Mexico|America/Tijuana
Tirana|Albania|Europe/Tirane
Tokyo|Japan|Asia/Tokyo
Toronto|Canada|America/Toronto
Toulouse|France|Europe/Paris
Tripoli|Libya|Africa/Tripoli
Trondheim|Norway|Europe/Oslo
Tucson|United States|America/Phoenix
Tunis|Tunisia|Africa/Tunis
Turin|Italy|Europe/Rome
Ulaanbaatar|Mongolia|Asia/Ulaanbaatar
Utrecht|Netherlands|Europe/Amsterdam
Valencia|Spain|Europe/Madrid
Valletta|Malta|Europe/Malta
Vancouver|Canada|America/Vancouver
Venice|Italy|Europe/Rome
Victoria|Canada|America/Vancouver
Vienna|Austria|Europe/Vienna
Vientiane|Laos|Asia/Vientiane
Vilnius|Lithuania|Europe/Vilnius
Vladivostok|Russia|Asia/Vladivostok
Warsaw|Poland|Europe/Warsaw
Washington, D.C.|United States|America/New_York
Wellington|New Zealand|Pacific/Auckland
Windhoek|Namibia|Africa/Windhoek
Winnipeg|Canada|America/Winnipeg
Wrocław|Poland|Europe/Warsaw
Wuhan|China|Asia/Shanghai
Xi'an|China|Asia/Shanghai
Yakutsk|Russia|Asia/Yakutsk
Yangon|Myanmar|Asia/Yangon
Yaoundé|Cameroon|Africa/Douala
Yekaterinburg|Russia|Asia/Yekaterinburg
Yerevan|Armenia|Asia/Yerevan
Yokohama|Japan|Asia/Tokyo
Zagreb|Croatia|Europe/Zagreb
Zaragoza|Spain|Europe/Madrid
Zurich|Switzerland|Europe/Zurich
`;

// Common abbreviations → representative zone. Label defaults to the abbreviation.
var ABBREV_DATA = `
UTC|Coordinated Universal Time|Etc/UTC
GMT|Greenwich Mean Time|Etc/GMT
PT|Pacific Time|America/Los_Angeles
PST|Pacific Time|America/Los_Angeles
PDT|Pacific Time|America/Los_Angeles
MT|Mountain Time|America/Denver
MST|Mountain Time|America/Denver
MDT|Mountain Time|America/Denver
CT|Central Time (US)|America/Chicago
CST|Central Time (US)|America/Chicago
CDT|Central Time (US)|America/Chicago
ET|Eastern Time|America/New_York
EST|Eastern Time|America/New_York
EDT|Eastern Time|America/New_York
AKST|Alaska Time|America/Anchorage
HST|Hawaii Time|Pacific/Honolulu
AST|Atlantic Time|America/Halifax
NST|Newfoundland Time|America/St_Johns
BRT|Brasília Time|America/Sao_Paulo
ART|Argentina Time|America/Argentina/Buenos_Aires
WET|Western European Time|Europe/Lisbon
BST|British Time|Europe/London
CET|Central European Time|Europe/Paris
CEST|Central European Time|Europe/Paris
EET|Eastern European Time|Europe/Athens
EEST|Eastern European Time|Europe/Athens
MSK|Moscow Time|Europe/Moscow
GST|Gulf Time|Asia/Dubai
PKT|Pakistan Time|Asia/Karachi
IST|India Time|Asia/Kolkata
ICT|Indochina Time|Asia/Bangkok
WIB|Western Indonesia Time|Asia/Jakarta
SGT|Singapore Time|Asia/Singapore
HKT|Hong Kong Time|Asia/Hong_Kong
JST|Japan Time|Asia/Tokyo
KST|Korea Time|Asia/Seoul
AWST|Australian Western Time|Australia/Perth
ACST|Australian Central Time|Australia/Adelaide
AEST|Australian Eastern Time|Australia/Sydney
AEDT|Australian Eastern Time|Australia/Sydney
NZST|New Zealand Time|Pacific/Auckland
NZDT|New Zealand Time|Pacific/Auckland
`;

function _parse(data) {
    var out = [];
    var lines = data.split("\n");
    for (var i = 0; i < lines.length; i++) {
        var p = lines[i].split("|");
        if (p.length === 3)
            out.push({ name: p[0], extra: p[1], tz: p[2] });
    }
    return out;
}

var CITIES = _parse(CITY_DATA);
var ABBREVS = _parse(ABBREV_DATA);

function fold(s) {
    s = String(s || "").toLowerCase();
    try {
        s = s.normalize("NFD").replace(/[̀-ͯ]/g, "");
    } catch (e) {}
    return s.replace(/[_\-.,']/g, " ").replace(/\s+/g, " ").trim();
}

function cityFromTz(tz) {
    if (!tz)
        return "";
    var parts = String(tz).split("/");
    return parts[parts.length - 1].replace(/_/g, " ");
}

// 0 = prefix of whole name, 1 = prefix of a word, 2 = substring, -1 = no match
function _score(hay, q) {
    if (hay.indexOf(q) === 0)
        return 0;
    if (hay.indexOf(" " + q) >= 0)
        return 1;
    if (hay.indexOf(q) >= 0)
        return 2;
    return -1;
}

// Returns up to `limit` results: [{label, detail, timezone}]
// `zones` is the list of IANA zone names available on the system.
function search(query, zones, limit) {
    var q = fold(query);
    if (!q)
        return [];
    var hits = [];
    var i, s;

    for (i = 0; i < ABBREVS.length; i++) {
        var a = ABBREVS[i];
        if (fold(a.name) === q)
            hits.push({ rank: 0, label: a.name, detail: a.extra + " · " + a.tz, timezone: a.tz });
    }

    // Country-only matches: one entry per zone, preferring the zone's namesake city.
    var byCountry = {};
    for (i = 0; i < CITIES.length; i++) {
        var c = CITIES[i];
        s = _score(fold(c.name), q);
        if (s >= 0) {
            hits.push({ rank: s, label: c.name, detail: c.extra + " · " + c.tz, timezone: c.tz });
            continue;
        }
        if (q.length >= 3) {
            var cs = _score(fold(c.extra), q);
            if (cs >= 0 && cs < 2) {
                var prev = byCountry[c.tz];
                if (!prev || fold(c.name) === fold(cityFromTz(c.tz)))
                    byCountry[c.tz] = { rank: 3, label: c.name, detail: c.extra + " · " + c.tz, timezone: c.tz };
            }
        }
    }

    var seenZone = {};
    for (i = 0; i < hits.length; i++)
        seenZone[hits[i].timezone] = true;
    for (var tz in byCountry) {
        if (!seenZone[tz]) {
            hits.push(byCountry[tz]);
            seenZone[tz] = true;
        }
    }

    for (i = 0; i < (zones || []).length; i++) {
        var z = zones[i];
        if (seenZone[z])
            continue;
        var label = cityFromTz(z);
        s = _score(fold(label), q);
        if (s < 0)
            s = _score(fold(z), q) >= 0 ? 3 : -1;
        if (s >= 0)
            hits.push({ rank: s + 0.5, label: label, detail: z, timezone: z });
    }

    hits.sort(function (x, y) {
        if (x.rank !== y.rank)
            return x.rank - y.rank;
        return x.label.localeCompare(y.label);
    });
    return hits.slice(0, limit || 8);
}
