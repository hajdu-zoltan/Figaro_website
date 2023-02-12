var barber_id=-1
function select_hairdresser(id){
    barber_id = id;
    const list = document.getElementById("price_list");
    var options='';
    _price.forEach(function (item, index) {
        console.log(item["categori"], id);
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
      document.getElementById( 'calendar_container' ).style.display = 'block';
}