## HTTP - Fetch Api Ödevi

Javascript Fetch API, web tarayıcılarından sunuculara HTTP istekleri yapmamızı sağlayan modern bir arayüzdür. FETCH API basit ve temizdir. Web tarayıcılarından sunuculara istekte bulunmak için daha esnek özellikler sunmaktadır.

fetch() yöntemi, web tarayıcılarına bir URL’ye istek gönderme talimatı veren global kapsamda mevcuttur.

fetch() getirmek istediğiniz kaynağın URL’si olan yalnızca bir parametre gerektirir:

`let response = fetch(url);`

fetch()yöntemi bir Promise döndürür. Böylece then() ve catch() kullanabiliriz.

`fetch(url).then(response => { // handle the response }).catch(error => { // handle the error });`

İstek tamamlandığında kaynak kullanılabilir hale gelir. Şu anda, Promise bir Response nesnesine dönüşecektir.

Response nesnesi, alınan kaynağın API sarmalayıcısıdır. Response nesnesi, yanıtı incelemek için bir dizi faydalı özelliğe ve yönteme sahiptir.

Yanıtın içeriği ham metin biçimindeyse, text() yöntemini kullanabiliriz. text() yöntemi, alınan kaynağın tüm içeriğiyle çözümlenen bir Promise döndürür:

`fetch(url) .then(response => { fetch('/readme.txt') .then(response => response.text()) .then(data => console.log(data));`

Pratikte, genellikle async/await’i fetch() yöntemiyle şu şekilde kullanırız:

`async function fetchText() { let response = await fetch('/readme.txt'); let data = await response.text(); console.log(data); }`

text() yönteminin yanı sıra Response nesnesi, ilgili veri türünü işlemek için json(), blob(), formData() ve arrayBuffer() gibi başka yöntemlere sahiptir.

Response nesnesi, status ve statusText özellikleri aracılığıyla durum kodunu ve durum metnini sağlar. Bir istek başarılı olduğunda durum kodu 200‘dür ve durum metni OK‘dur:

`async function fetchText() {
let response = await fetch('/readme.txt');
let data = await response.text();
console.log(data);
async function fetchText() {
let response = await fetch('/readme.txt');

    console.log(response.status); // 200
    console.log(response.statusText); // OK

    if (response.status === 200) {
        let data = await response.text();
        // handle data
    }`

fetchText();
`
Çıktı:

`200 OK`

İstenen kaynak mevcut değilse, yanıt kodu 404‘tür:

`let response = await fetch('/non-existence.txt'); console.log(response.status); // 400 console.log(response.statusText); // Not Found`

Çıktı:

`400 Not Found`

İstenen URL bir sunucu hatası verirse yanıt kodu 500 olur.

İstenen URL 300-309 yanıtıyla yenisine yönlendirilirse, Response nesnesinin durumu 200‘e ayarlanır. Ayrıca, yeniden yönlendirilen özellik true olarak ayarlanır.

fetch(), web tarayıcısı zaman aşımı, ağ bağlantısı kaybı ve CORS ihlali gibi gerçek bir hata oluştuğunda reddeden bir Promise verir.

///////////////////

- HTTP Status Kodlari

HTTP status kodları beş farklı sınıf altında yer almaktadır. Bu üç haneli kodların ik hanesi kodun hangi sınıfa ait olduğunu göstermektedir. HTTP status 200 kodu 2xx sınıfında yer alırken 404 hata kodu 4xx sınıfında yer almaktadır. Bu sınıfların kodun özelliğine ve fonksiyonuna göre belirlenmektedir.

1xx Sınıfı – Bilgilendirme Yanıtları: 1xx ile başlayan HTTP status kodu geldiğinde sunucu kullanıcıya isteğin işlemde olduğunu belirtmektedir. Bu sınıf kullanıcının ziyaret ettiği internet sitesindeki ulaştırma bilgilerinden sorumludur.

2xx Sınıfı – Başarı Yanıtları: 2xx kodları başarılı işlemleri bildirmeye yöneliktir. Eğer bu kodun iletilmesi kullanıcının isteğinin sunucu tarafından alındığını, anlaşıldığını ve kabul edildiğini göstermektedir. 2xx kodları genellikle ziyaret edilmek istenen site bilgisi ile beraber gönderilmektedir.

3xx Sınıfı – Yönlendirme Yanıtları: 3xx kodu isteğin sunucuya ulaştığını göstermektedir. Ancak isteğin başarılı bir şekilde işlenebilmesi için kullanıcının yapması gereken bazı adımlar bulunmaktadır. 3xx kodları yönlendirmelerde ve iletmelerde ortaya çıkmaktadır.

4xx Sınıfı – İstemci Hatası Yanıtları: 4xx sınıfından bir hata kodları genellikle kullanıcıdan kaynaklı hatalarda ekrana gelmektedir. Bu noktada kullanıcının isteği sunucuya iletilir ancak bu işlenemez. Bunun en büyük nedenlerinden bir tanesi yanlış isteklerdir. İnternet kullanıcıları genellikle bu sınıfa ait hata kodlarını otomatik olarak oluşturulmuş HTML sayfaları olarak görmektedir.

5xx Sınıfı – Sunucu Hatası Yanıtları: 5xx hata kodu sunucunun kullanıcıdan gelen isteği işleyemediği durumlarda ortaya çıkmaktadır. Bu sunucu hata kodları internet sitesinin suanda erişilemez durumda olduğunu göstermektedir ve tıpkı 4xx sınıfı hata kodları gibi otomatik oluşturulmuş HTML sayfası olarak ekrana gelmektedir.

- En Önemli HTTP Kodları
  HTTP kodları özellikle site sahipleri ve SEO uzmanları için önemli bilgiler içermektedir. 404 gibi istemiş yanıtları ya da 503 gibi sunucu yanıtları bilgisayar kullanıcının ekranına gelmektedir. Birçok HTTP kodu bu sınıflara ait kodlar gibi bilgisayar kullanıcılarına gösterilmemektedir. Ancak bunu özel araçlar ya da tarayıcı eklentileri ile görmek mümkün olmaktadır. Bu hataları bulmak ve düzenlemek son derece önemlidir.

Status Kod 200 – OK: HTTP 200 status kodu her şeyin olması gerektiği gibi olduğunu göstermektedir. Sunucuda yer alan tüm veri kullanıcıya aktarılmaktadır. Kullanıcılar genellikle bu kodu görmezler.

Status Kod 301 – Moved Permanently (Kalıcı Taşındı): 301 hata kodu kullanıcının isteği verilerin girilen adreste olmadığını ve kalıcı olarak taşındığını gösterir. Bu hata kodu ile beraber kullanıcının erişmek istediği verilerin yer aldığı yeni adres de beraberinde gelmektedir ve tarayıcı otomatik olarak bu yeni adrese yönlenmektedir. Kullanıcılar genelde bu durumu fark etmeden işlem tamamlanmaktadır.

Status Kod 302 – Moved Temporarily (Geçici Taşındı): 301 kodunun aksine 302 kodu kullanıcı tarafından erişilmek istenen verinin geçici olarak taşındığını gösterir. Bu kodda da içeriğe otomatik olarak yönlendirmek mevcuttur. Ancak bu hatada asıl adres hala geçerlidir.

Status Kod 403 – Forbidden (Yasaklandı): Bu hata kodu kullanıcıya erişmek istediği verilerde erişim koruması olduğunu ve kullanıcıda erişim izni olmadığı için istediği sayfaya erişemeyeceğini gösterir. Otomatik olarak üretilen HTML sayfası bu bilgiyi kullanıcıya göstermektedir.

Status Kod 404 – Not Found (Bulunamadı): Eğer sunucu 404 hatası verirse bu erişilmek istenen internet sitesinin bilgilerinin ulaşılan sunucuda yer almadığını gösterir. Adres geçerli olmayabilir ya da iste içerikleri herhangi bir bilgi verilmeden başka bir yere taşınmış olabilir. 404 hatası alan kullanıcıların adresi doğru yazdıklarından emin olmaları gerekir. Mevcut olmayan sayfaları götüren linkler ölü linkler olarak bilinmektedir.

Status Kod 500 – Internal Server Error (Sunucu Hatası): HTTP 500 hatası internette en sık karşılaşılan hatalardan bir tanesidir. Sunucuda beklenmeyen bir hata meydana geldiğinde ekrana gelir. Eğer bu hata sunucu tarafından kaynaklanıyorsa erişilmek istenen site ekrana gelmez. Site sahibinin ya da sistem yöneticisinin hatanın nedenini bulup ortadan kaldırması gerekmektedir.

Status Kod 503 – Service Unavailable (Hizmet Yok): 503 hatası internet sitesinin saklandığı sunucunun aşırı yüklendiği anlamına gelmektedir. Sunucu bu gibi durumlarda daha önce gelen isteklere verdiği cevapları vermektedir. Bu hata kodu sistem yöneticisinin meydana gelen hata üzerinde çalıştığı ve sitenin bir süre sonra tekrar erişilebilir olacağı anlamını taşımaktadır.

