document.addEventListener('DOMContentLoaded', function(){
    
    var today = new Date(),
        year = today.getFullYear(),
        month = today.getMonth(),
        monthTag =["01","02","03","04","05","06","07","08","09","10","11","12"],
        day = today.getDate(),
        days = document.getElementsByTagName('td'),
        selectedDay,
        setDate,
        daysLen = days.length;
  // options should like '2014-01-01'
    function Calendar(selector, options) {
        this.options = options;
        this.draw();
    }
    
    Calendar.prototype.draw  = function() {
        this.getCookie('selected_day');
        this.getOptions();
        this.drawDays();
        var that = this,
            reset = document.getElementById('reset'),
            pre = document.getElementsByClassName('pre-button'),
            next = document.getElementsByClassName('next-button');
            
            pre[0].addEventListener('click', function(){that.preMonth(); });
            next[0].addEventListener('click', function(){that.nextMonth(); });
        while(daysLen--) {
            days[daysLen].addEventListener('click', function(){that.clickDay(this); });
        }
        this.clickDay(this);
    };
    
    Calendar.prototype.drawHeader = function(e) {
        var headDay = document.getElementsByClassName('head-day'),
            headMonth = document.getElementsByClassName('head-month');
  
            e?headDay[0].innerHTML = e : headDay[0].innerHTML = day;
            headMonth[0].innerHTML = year +" . " + monthTag[month] + " . " + day;        
     };
    
    Calendar.prototype.drawDays = function() {
        var startDay = new Date(year, month, 0).getDay(),
  //      下面表示这个月总共有几天
            nDays = new Date(year, month + 1, 0).getDate(),
    
            n = startDay;
  //      清除原来的样式和日期
        for(var k = 0; k <42; k++) {
            days[k].innerHTML = '';
            days[k].id = '';
            days[k].className = '';
        }
  
        for(var i  = 1; i <= nDays ; i++) {
            days[n].innerHTML = i; 
            n++;
        }
        
        for(var j = 0; j < 42; j++) {
            if(days[j].innerHTML === ""){
                
                days[j].id = "disabled";
                
            }else if(j === day + startDay - 1){
                if((this.options && (month === setDate.getMonth()) && (year === setDate.getFullYear())) || (!this.options && (month === today.getMonth())&&(year===today.getFullYear()))){
                    this.drawHeader(day);
                    days[j].id = "today";
                }
            }
            if(selectedDay){
                if((j === selectedDay.getDate() + startDay - 1)&&(month === selectedDay.getMonth())&&(year === selectedDay.getFullYear())){
                days[j].className = "selected";
                this.drawHeader(selectedDay.getDate());
                }
            }
        }
    };
    
    Calendar.prototype.clickDay = function(o) {
        var selected = document.getElementsByClassName("selected"),
            len = selected.length;
        if(len !== 0){
            selected[0].className = "";
            
        }
        for (i = 0; i < selected.length; i++) {
            text = selected[i].innerText;
          }
        
        var actual_date= new Date(year, month, o.innerHTML)
        actual_date=actual_date.toLocaleString()
        // console.log(dates+' VS '+actual_date);
        // document.getElementById('date').value=actual_date;
        var appointmets="";
        function addHours(date, hours) {
            date.setHours(00);
            date.setMinutes(00);
            date.setSeconds(00);
            date.setHours(date.getHours() + hours);
            document.getElementById('date').value=date.toLocaleString();
            return date;
          }
        function addMinutes(date, minutes) {
           date.setMinutes(date.getMinutes() + minutes);
           return date;
        }
        function convert_to_seconds(dateTimeString){
            const dateArray = dateTimeString.split(", ")[0].split(".");
            const timeArray = dateTimeString.split(", ")[1].split(":");

            const year = parseInt(dateArray[2]);
            const month = parseInt(dateArray[1]) - 1;
            const day = parseInt(dateArray[0]);
            const hour = parseInt(timeArray[0]);
            const minute = parseInt(timeArray[1]);
            const second = parseInt(timeArray[2]);

            const date = new Date(year, month, day, hour, minute, second);

            const seconds = Math.floor(date.getTime() / 1000);
            return seconds
        }

        function addTimeToTimestamp(timestamp, time) {
            // Az idő értékét szétválasztjuk órákra, percekre és másodpercre
            const [hours, minutes, seconds] = time.split(':').map(Number);
            // Az idő értékét másodpercben számoljuk ki
            console.log('minutes: '+ parseInt(minutes-1))
            const timeInSeconds = hours * 3600 + parseInt(minutes-1) * 60 + seconds;
            // Hozzáadjuk az idő értékét a timestamphez
            const resultTimestamp = timestamp + timeInSeconds;
            // Visszatérünk az eredménnyel
            console.log('resultTimestamp: '+resultTimestamp)
            return resultTimestamp;
          }
        for(let i = 9; i < 20; i++){
            var date_= new Date(year, month, o.innerHTML)
            if(date_ != 'Invalid Date'){
            
                // console.log(date_);
                var newDate1 = addHours(date_, i);
                var newDate1 = newDate1.toLocaleString("ru-RU");
                var newDate2 = addHours(date_, i);
                newDate2.setTime(newDate2.getTime() + (15 * 60 * 1000));
                var newDate2 = newDate2.toLocaleString("ru-RU");
                var newDate3 = addHours(date_, i);
                newDate3.setTime(newDate3.getTime() + (30 * 60 * 1000));
                var newDate3 = newDate3.toLocaleString("ru-RU");
                var newDate4 = addHours(date_, i);
                newDate4.setTime(newDate4.getTime() + (45 * 60 * 1000));
                var newDate4 = newDate4.toLocaleString("ru-RU");
                //var category_time_array = category_time.split(":")
                // add 30 minutes to the time
                //var newDate5 = addHours(date_, parseInt(category_time_array[0]));
                //var newDate4 = newDate4.toLocaleString("ru-RU");
                var time= ""+i+":00"
                var time2= ""+i+":15"
                var time3= ""+i+":30"
                var time4= ""+i+":45"
                var van1 = 0;
                var van2 = 0;
                var van3 = 0;
                var van4 = 0;
                for(let y = 0; y < dates2.length; y++){
                    
                    const timeString = dates2[y]['time'];
                    const timeArray = timeString.split(":");
                    const time = new Date();
                    time.setHours(timeArray[0]);
                    time.setMinutes(timeArray[1]);
                    time.setSeconds(timeArray[2]);

                    const booking_time_string = dates2[y]['booking_time'];
                    const booking_time_Array2 = booking_time_string.split(":");
                    const booking_time = new Date();
                    booking_time.setHours(booking_time_Array2[0]);
                    booking_time.setMinutes(booking_time_Array2[1]);
                    booking_time.setSeconds(booking_time_Array2[2]);
                    // console.log(time+ "add"+ time2)
                    hour1 = time.getHours()
                    hour2_ = booking_time.getHours()
                    minute1 = time.getMinutes()
                    minute2_ = booking_time.getMinutes()
                    var theFutureTime = moment().hour(hour1).minute(minute1).add(hour2_,'hours').add(minute2_,'minutes').format("HH:mm:00");

                   
                    date__ = dates2[y]['date']
                    date_time=''+dates2[y]['date']+', '+dates2[y]['time']+'';
                    booking_datetime_long = ''+dates2[y]['date']+', '+theFutureTime;
                    
                    const booking_datetime=''+dates2[y]['date']+', '+dates2[y]['time']+'';
                    const date_time_seconds = convert_to_seconds(booking_datetime);
                    const booking_time_seconds = convert_to_seconds(booking_datetime_long);
                    const newDate1_seconds = convert_to_seconds(newDate1);
                    const newDate2_seconds = convert_to_seconds(newDate2);
                    const newDate3_seconds = convert_to_seconds(newDate3);
                    const newDate4_seconds = convert_to_seconds(newDate4);
                    //const category_seconds = convert_to_seconds(category_date)

                    if ( barber_id == dates2[y]['hairdresser_id']){
                        //console.log(newDate1_seconds+' vs '+ addTimeToTimestamp(newDate1_seconds, category_time))
                        //console.log(addTimeToTimestamp(newDate1_seconds, category_time) + 'VS' + booking_time_seconds)
                        //console.log(addTimeToTimestamp(newDate1_seconds, category_time) + 'VS' + date_time_seconds)
                        console.log(''+newDate1+ ' + '+ category_time +' <= '+ booking_datetime)
                        if (newDate1_seconds >= date_time_seconds && newDate1_seconds<= booking_time_seconds || addTimeToTimestamp(newDate1_seconds, category_time) >= date_time_seconds && addTimeToTimestamp(newDate1_seconds, category_time) <= booking_time_seconds){
                            van1 = 1
                        }
                        if (newDate2_seconds >= date_time_seconds && newDate2_seconds<= booking_time_seconds || addTimeToTimestamp(newDate2_seconds, category_time) >= date_time_seconds && addTimeToTimestamp(newDate2_seconds, category_time) <= booking_time_seconds){
                            van2 = 1
                        }
                        if (newDate3_seconds >= date_time_seconds && newDate3_seconds<= booking_time_seconds || addTimeToTimestamp(newDate3_seconds, category_time) >= date_time_seconds && addTimeToTimestamp(newDate3_seconds, category_time) <= booking_time_seconds){
                            van3 = 1
                        }
                        if (newDate4_seconds >= date_time_seconds && newDate4_seconds<= booking_time_seconds || addTimeToTimestamp(newDate4_seconds, category_time) >= date_time_seconds && addTimeToTimestamp(newDate4_seconds, category_time) <= booking_time_seconds){
                            van4 = 1
                        }
                    }

                    if(date_ < today){
                        van1 = 1
                        van2 = 1
                        van3 = 1
                        van4 = 1
                    }
                }
                if(van1 ==  0){
                    appointmets+='\
                    <div class="radio__button chip" id ="'+time+'" onclick="selected_time(this.id)">\
                        <input class="radio__input" name="time" type="radio" value="'+time+'" id="&quot;'+time+'&quot;">\
                        <label class="radio__label" for="&quot; '+time+'&quot;">\
                            <div class="chip__label" id ="'+time+'_">'+time+'</div>\
                        </label>\
                    </div>'
                }
                else{
                    appointmets+='\
                    <div class="radio__button chip reserved_container" id ="'+time+'" onclick="selected_time(this.id)">\
                        <input class="radio__input" name="time" type="radio" value="'+time+'" id="&quot;'+time+'&quot;">\
                        <label class="radio__label" for="&quot; '+time+'&quot;">\
                            <div class="chip__label reserved" id ="'+time+'_">'+time+'</div>\
                        </label>\
                    </div>'
                }
                if(van2 ==  0){
                    appointmets+='\
                    <div class="radio__button chip" id ="'+time2+'" onclick="selected_time(this.id)">\
                        <input class="radio__input" name="time" type="radio" value="'+time2+'" id="&quot;'+time2+'&quot;">\
                        <label class="radio__label" for="&quot; '+time2+'&quot;">\
                            <div class="chip__label" id ="'+time2+'_">'+time2+'</div>\
                        </label>\
                    </div>'
                }
                else{
                    appointmets+='\
                    <div class="radio__button chip reserved_container" id ="'+time2+'" onclick="selected_time(this.id)">\
                        <input class="radio__input" name="time" type="radio" value="'+time2+'" id="&quot;'+time2+'&quot;">\
                        <label class="radio__label" for="&quot; '+time2+'&quot;">\
                            <div class="chip__label reserved" id ="'+time2+'_">'+time2+'</div>\
                        </label>\
                    </div>'
                }
                if(van3 ==  0){
                    appointmets+='\
                    <div class="radio__button chip" id ="'+time3+'" onclick="selected_time(this.id)">\
                        <input class="radio__input" name="time" type="radio" value="'+time3+'" id="&quot;'+time3+'&quot;">\
                        <label class="radio__label" for="&quot; '+time3+'&quot;">\
                            <div class="chip__label" id ="'+time3+'_">'+time3+'</div>\
                        </label>\
                    </div>'
                }
                else{
                    appointmets+='\
                    <div class="radio__button chip reserved_container" id ="'+time3+'" onclick="selected_time(this.id)">\
                        <input class="radio__input" name="time" type="radio" value="'+time3+'" id="&quot;'+time3+'&quot;">\
                        <label class="radio__label" for="&quot; '+time3+'&quot;">\
                            <div class="chip__label reserved" id ="'+time3+'_">'+time3+'</div>\
                        </label>\
                    </div>'
                }
                if(van4 ==  0){
                    appointmets+='\
                    <div class="radio__button chip" id ="'+time4+'" onclick="selected_time(this.id)">\
                        <input class="radio__input" name="time" type="radio" value="'+time4+'" id="&quot;'+time4+'&quot;">\
                        <label class="radio__label" for="&quot; '+time4+'&quot;">\
                            <div class="chip__label" id ="'+time4+'_">'+time4+'</div>\
                        </label>\
                    </div>'
                }
                else{
                    appointmets+='\
                    <div class="radio__button chip reserved_container" id ="'+time4+'" onclick="selected_time(this.id)">\
                        <input class="radio__input" name="time" type="radio" value="'+time4+'" id="&quot;'+time4+'&quot;">\
                        <label class="radio__label" for="&quot; '+time4+'&quot;">\
                            <div class="chip__label reserved" id ="'+time4+'_">'+time4+'</div>\
                        </label>\
                    </div>'
                }
            }
            else{
                appointmets='<h3 class="head-month">Válasz egy napot!</h3>'
            }
            

        }
        document.getElementById("demo").innerHTML = appointmets;

        o.className = "selected";
        selectedDay = new Date(year, month, o.innerHTML);
        this.drawHeader(o.innerHTML);
        this.setCookie('selected_day', 1);
        
    };
    
    Calendar.prototype.preMonth = function() {
        if(month < 1){ 
            month = 11;
            year = year - 1; 
        }else{
            month = month - 1;
        }
        this.drawHeader(1);
        this.drawDays();
    };
    
    Calendar.prototype.nextMonth = function() {
        if(month >= 11){
            month = 0;
            year =  year + 1; 
        }else{
            month = month + 1;
        }
        this.drawHeader(1);
        this.drawDays();
    };
    
    Calendar.prototype.getOptions = function() {
        if(this.options){
            var sets = this.options.split('-');
                setDate = new Date(sets[0], sets[1]-1, sets[2]);
                day = setDate.getDate();
                year = setDate.getFullYear();
                month = setDate.getMonth();
        }
    };
    
     Calendar.prototype.reset = function() {
         month = today.getMonth();
         year = today.getFullYear();
         day = today.getDate();
         this.options = undefined;
         this.drawDays();
     };
    
    Calendar.prototype.setCookie = function(name, expiredays){
        if(expiredays) {
            var date = new Date();
            date.setTime(date.getTime() + (expiredays*24*60*60*1000));
            var expires = "; expires=" +date.toGMTString();
        }else{
            var expires = "";
        }
        document.cookie = name + "=" + selectedDay + expires + "; path=/";
    };
    
    Calendar.prototype.getCookie = function(name) {
        if(document.cookie.length){
            var arrCookie  = document.cookie.split(';'),
                nameEQ = name + "=";
            for(var i = 0, cLen = arrCookie.length; i < cLen; i++) {
                var c = arrCookie[i];
                while (c.charAt(0)==' ') {
                    c = c.substring(1,c.length);
                    
                }
                if (c.indexOf(nameEQ) === 0) {
                    selectedDay =  new Date(c.substring(nameEQ.length, c.length));
                }
            }
        }
    };
    var calendar = new Calendar();
    
        
  }, false);
        
const btn = document.querySelector('#btn');     
const radioButtons = document.querySelectorAll('input[name="time"]');
// console.log(radioButtons)
function selected_time(id){
    for(let i = 9; i < 20; i++){
        var time= ""+i+":00_"
        var time2= ""+i+":15_"
        var time3= ""+i+":30_"
        var time4= ""+i+":45_"
        document.getElementById(time).style.backgroundColor = "rgb(50 255 43)";
        document.getElementById(time2).style.backgroundColor = "rgb(50 255 43)";
        document.getElementById(time3).style.backgroundColor = "rgb(50 255 43)";
        document.getElementById(time4).style.backgroundColor = "rgb(50 255 43)";
    }
    
    let selectedSize;
    selectedSize = id;
    document.getElementById(id+'_').style.backgroundColor = "rgb(227 94 10)";
    // show the output:
    document.getElementById('time').value=id;
    last_id=id
};
function btn_selected(id){
    document.getElementById(id).style.backgroundColor = "rgb(227 94 10)";
}