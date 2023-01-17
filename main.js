const APIKey = 'I2w%2F30MpTQ3LX98IqOUzQU1ZakQ7ve1aednkpe%2BEBE44%2FumPaOEdZ1yV279k%2FZ0%2FuE5WvbvE5ZJqtVEAdsQQBA%3D%3D'


async function getData(){
    const url = `http://apis.data.go.kr/B552061/frequentzoneBicycle/getRestFrequentzoneBicycle?servicekey=${APIKey}&searchYearCd=2015&siDo=11&guGun=680&type=json&numOfRows=10&pageNo=1`
    //호출
    const respone = await fetch(url) //await을 사용하기 위해 async사용
    const data = await respone.json()
    console.log("data",data);

    //공공데이터 array Map으로 호출
    const locations = data.items.item.map(spot=>[spot.spot_nm,spot.la_crd,spot.lo_crd]);

    console.log("locations",locations);

    drawMap(locations);
}   

function drawMap(locations) {
    /*
    매개변수 형태
    locations = [ ["지역이름",위도,경도],
                    ["지역이름",위도,경도]
                ]
    */
    
    //맵을 생성
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 13,
      center: new google.maps.LatLng(locations[0][1], locations[0][2]),
      mapTypeId: google.maps.MapTypeId.ROADMAP,
    });
  
    const infowindow = new google.maps.InfoWindow();
  
    let marker, i;
    
    //위치별 마크 생성
    for (i = 0; i < locations.length; i++) {
      marker = new google.maps.Marker({
        position: new google.maps.LatLng(locations[i][1], locations[i][2]),
        map: map,
      });
      
      //마크 클릭시 정보
      google.maps.event.addListener(
        marker,
        "click",
        (function (marker, i) {
          return function () {
            infowindow.setContent(locations[i][0]);
            infowindow.open(map, marker);
          };
        })(marker, i)
      );
    }
  }

getData();