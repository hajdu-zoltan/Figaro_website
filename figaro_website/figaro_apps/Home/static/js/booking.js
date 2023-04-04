var barber_id=-1
function select_hairdresser(id){
    barber_id = id;
    const list = document.getElementById("price_list");
    var options=`<option value="" selected hidden>Válassz egy szolgáltatást</option>`;
    _price.forEach(function (item, index) {
        var barber_name = "";
        if (id == 1){
            var barber_name = "Kerekes Helga";
        }
        if (id == 2){
            var barber_name = "Huszár Krisztián"
        }
        if(item["barber_name"]  == barber_name){
            options +=`<option value=${item["id"]}>${item["tittle"]} ${item["price"]}Ft (időtartam: ${item["time"]})</option>`;
            console.log(options);
        }
      });
      console.log(options)
      list.innerHTML=options;
}
var category_time =""
function select_category(category_id){
    const list = document.getElementById("price_list");
    _price.forEach(function (item, index) {
        if(item["id"] == category_id){
            console.log(item["id"])
            category_time = item["time"]
            
        }  
    });
    document.getElementById( 'calendar_container' ).style.display = 'block';
    document.getElementById("demo").innerHTML = '<h3 class="head-month">Válasz egy napot!</h3>';
}