console.log("ART330 Script v1.2 Loaded");
 

// Copyright (c) 2015 Florian Hartmann, https://github.com/florian https://github.com/florian/cookie.js
!function(a,b){var c=function(){return c.get.apply(c,arguments)},d=c.utils={isArray:Array.isArray||function(a){return"[object Array]"===Object.prototype.toString.call(a)},isPlainObject:function(a){return!!a&&"[object Object]"===Object.prototype.toString.call(a)},toArray:function(a){return Array.prototype.slice.call(a)},getKeys:Object.keys||function(a){var b=[],c="";for(c in a)a.hasOwnProperty(c)&&b.push(c);return b},encode:function(a){return String(a).replace(/[,;"\\=\s%]/g,function(a){return encodeURIComponent(a)})},decode:function(a){return decodeURIComponent(a)},retrieve:function(a,b){return null==a?b:a}};c.defaults={},c.expiresMultiplier=86400,c.set=function(c,e,f){if(d.isPlainObject(c))for(var g in c)c.hasOwnProperty(g)&&this.set(g,c[g],e);else{f=d.isPlainObject(f)?f:{expires:f};var h=f.expires!==b?f.expires:this.defaults.expires||"",i=typeof h;"string"===i&&""!==h?h=new Date(h):"number"===i&&(h=new Date(+new Date+1e3*this.expiresMultiplier*h)),""!==h&&"toGMTString"in h&&(h=";expires="+h.toGMTString());var j=f.path||this.defaults.path;j=j?";path="+j:"";var k=f.domain||this.defaults.domain;k=k?";domain="+k:"";var l=f.secure||this.defaults.secure?";secure":"";f.secure===!1&&(l=""),a.cookie=d.encode(c)+"="+d.encode(e)+h+j+k+l}return this},c.setDefault=function(a,e,f){if(d.isPlainObject(a)){for(var g in a)this.get(g)===b&&this.set(g,a[g],e);return c}if(this.get(a)===b)return this.set.apply(this,arguments)},c.remove=function(a){a=d.isArray(a)?a:d.toArray(arguments);for(var b=0,c=a.length;b<c;b++)this.set(a[b],"",-1);return this},c.removeSpecific=function(a,b){if(!b)return this.remove(a);a=d.isArray(a)?a:[a],b.expires=-1;for(var c=0,e=a.length;c<e;c++)this.set(a[c],"",b);return this},c.empty=function(){return this.remove(d.getKeys(this.all()))},c.get=function(a,b){var c=this.all();if(d.isArray(a)){for(var e={},f=0,g=a.length;f<g;f++){var h=a[f];e[h]=d.retrieve(c[h],b)}return e}return d.retrieve(c[a],b)},c.all=function(){if(""===a.cookie)return{};for(var b=a.cookie.split("; "),c={},e=0,f=b.length;e<f;e++){var g=b[e].split("="),h=d.decode(g.shift()),i=d.decode(g.join("="));c[h]=i}return c},c.enabled=function(){if(navigator.cookieEnabled)return!0;var a="_"===c.set("_","_").get("_");return c.remove("_"),a},"function"==typeof define&&define.amd?define(function(){return{cookie:c}}):"undefined"!=typeof exports?exports.cookie=c:window.cookie=c}("undefined"==typeof document?null:document);



// section to save stats etc.
if( document.querySelector('.cookie') ){

    document.querySelectorAll('.cookie').forEach(function(obj) {
        
        // Now do something with my button
        if( cookie.get( obj.dataset.name ) ){
            // if cookie exist and has value set that equal to varable cookieValue
            let cookieValue = cookie.get(obj.dataset.name);

            if( obj.dataset.display ){
                // if 'data-disply' is true than the cookie value is inserted to that element                 
                obj.innerHTML = cookieValue;
            }else{

                if(obj.dataset.threshold){
                    if( Number(cookieValue) > Number(obj.dataset.threshold) ){
                        // if there is a show threshold and the cookie value is great than it reveal the element 
                        obj.classList.toggle('none');
                    }
                }

                if(obj.dataset.value){
                    cookie.set(obj.dataset.name, obj.dataset.value);
                }

                if(obj.dataset.destination && obj.dataset.effect){
                    // if the element has a destination add a click event to exicute that on click
                    obj.addEventListener("click", function(){
                        if(obj.dataset.effect == "reset"){
                            cookie.set(obj.dataset.name, "");
                        }else{
                            cookiehNumber = eval(cookieValue + obj.dataset.effect);
                            cookie.set(obj.dataset.name, cookiehNumber);
                        }
                        window.location.href = obj.dataset.destination
                    }); 
                }else if(obj.dataset.effect){
                    
                    if(obj.dataset.effect == "reset"){
                        cookie.set(obj.dataset.name, "");
                    }else{
                        cookiehNumber = eval(cookieValue + obj.dataset.effect);
                        cookie.set(obj.dataset.name, cookiehNumber);
                    }
                    
                }

            }

        }else{
            // get the vlaue and set that
            cookie.set(obj.dataset.name, 1);
        }

    });

}




// This is the way we link to pages based on a dice roll
document.querySelectorAll('.random_link').forEach(function(random_link) {
    // Now do something with my button
    random_link.addEventListener("click", function(){
        let data = Object.assign({}, random_link.dataset);
        // We get the number of links and roll a dice of that many sides
        let number_of_links = Object.keys(data).length;
        let dice_roll = Math.floor(Math.random() * Math.floor(number_of_links));

        // we send the window to the rolled link
        window.location.href = Object.values(data)[dice_roll]
    })
});




if( document.querySelector('.text_io') ){
    let output;
    
    document.querySelectorAll('.text_io').forEach( function(obj) {
        if(obj.classList.contains('output')){
            output = obj;
        }


        if(obj.classList.contains('input')){
            let pass = obj.dataset.password;
            let destination = obj.dataset.destination;
            let message = obj.dataset.message;

            obj.addEventListener('input', function(e){
                if(obj.innerText == pass){
                    // console.log("hit");
                    // Forward to desination
                    window.location.href = destination;
                }else{
                    // send message to output
                    output.innerHTML = message;
                }
            });
        }
    });
}