document.addEventListener('DOMContentLoaded', function(){
    
    var today = new Date(),
        year = today.getFullYear(),
        month = today.getMonth(),
        monthTag =["1","2","3","4","5","6","7","8","9","10","11","12"],
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
            headMonth[0].innerHTML = year +" . " + monthTag[month];        
     };
    
    Calendar.prototype.drawDays = function() {
        var startDay = new Date(year, month, 1).getDay(),
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
            console.log(len)
        if(len !== 0){
            selected[0].className = "";
            
        }
        console.log(selected)
        for (i = 0; i < selected.length; i++) {
            text = selected[i].innerText;
            console.log(text)
          }
        
        
        console.log('select '+new Date(year, month, o.innerHTML))
        var actual_date= new Date(year, month, o.innerHTML)
        actual_date=actual_date.toLocaleString()
        console.log(dates+' VS '+actual_date);
        var appointmets="";
        function addHours(date, hours) {
            date.setHours(date.getHours() + hours);
          
            return date;
          }
        function addMinutes(date, minutes) {
           date.setMinutes(date.getMinutes() + minutes);
           return date;
        }
        for(let i = 9; i < 20; i++){
            var date_= new Date(year, month, o.innerHTML)
            const newDate = addHours(date_, i);
            var newDate1 = newDate.toLocaleString("ru-RU");
            newDate.setTime(newDate.getTime() + (30 * 60 * 1000));
            var newDate2 = newDate.toLocaleString("ru-RU");
            var time= ""+i+":00"
            var time2= ""+i+":30"
            var van1 = 0;
            var van2 = 0;
            for(let y = 0; y < dates.length; y++){
                console.log(dates[y]+' VS '+newDate1)
                if (dates[y] == newDate1 ){
                    console.log('ugyan az')
                    van1 = 1
                }
                if (dates[y] == newDate2){
                    van2 = 1
                }
            }
            if(van1 ==  0){
                appointmets+='\
                <div class="radio__button chip" id ="div_'+time+'" onclick="selected_time(this.id)">\
                    <input class="radio__input" name="time" type="radio" value="'+time+'" id="&quot;'+time+'&quot;">\
                    <label class="radio__label" for="&quot; '+time+'&quot;">\
                        <div class="chip__label" id ="div_'+time+'_">'+time+'</div>\
                    </label>\
                </div>'
            }
            else{
                appointmets+='\
                <div class="radio__button chip reserved_container" id ="div_'+time+'" onclick="selected_time(this.id)">\
                    <input class="radio__input" name="time" type="radio" value="'+time+'" id="&quot;'+time+'&quot;">\
                    <label class="radio__label" for="&quot; '+time+'&quot;">\
                        <div class="chip__label reserved" id ="div_'+time+'_">'+time+'</div>\
                    </label>\
                </div>'
            }
            if(van2 ==  0){
                appointmets+='\
                <div class="radio__button chip" id ="div_'+time2+'" onclick="selected_time(this.id)">\
                    <input class="radio__input" name="time" type="radio" value="'+time2+'" id="&quot;'+time2+'&quot;">\
                    <label class="radio__label" for="&quot; '+time2+'&quot;">\
                        <div class="chip__label" id ="div_'+time2+'_">'+time2+'</div>\
                    </label>\
                </div>'
            }
            else{
                appointmets+='\
                <div class="radio__button chip" id ="div_'+time2+'" onclick="selected_time(this.id)">\
                    <input class="radio__input" name="time" type="radio" value="'+time2+'" id="&quot;'+time2+'&quot;">\
                    <label class="radio__label" for="&quot; '+time2+'&quot;">\
                        <div class="reserved" id ="div_'+time2+'_">'+time2+'</div>\
                    </label>\
                </div>'
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
        var time= ""+i+":00"
        var time2= ""+i+":30"
        document.getElementById('div_'+time+'_').style.backgroundColor = "rgb(50 255 43)";
        document.getElementById('div_'+time2+'_').style.backgroundColor = "rgb(50 255 43)";
    }
    
    let selectedSize;
    selectedSize = id;
    document.getElementById(id+'_').style.backgroundColor = "rgb(227 94 10)";
    // show the output:
    console.log(selectedSize)
    last_id=id
};
function btn_selected(id){
    document.getElementById(id).style.backgroundColor = "rgb(227 94 10)";
    console.log('selected')
}
function get_value1(value){
    console.log( $(value).text())
}
function get_value(value){
    var csrftoken = jQuery("[name=csrfmiddlewaretoken]").val();

    function csrfSafeMethod(method) {
        return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
    }

    $.ajaxSetup({
        beforeSend: function (xhr, settings) {
            if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
                xhr.setRequestHeader("X-CSRFToken", csrftoken);
            }
        }
    });

    $.ajax({
        url: "/home",
        data: {
            'value': inputDataArray  //I have already defined "inputDataArray" before
        },
        success: function (res, status) {
            alert(res);
            alert(status);
        },
        error: function (res) {
            alert(res.status);                                                                                                                          
        }
    });
}