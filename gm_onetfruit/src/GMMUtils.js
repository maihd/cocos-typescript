var util = {
    getRandomInt: function (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    getDollarNumber: function (inumber) {
        var isMinus = inumber < 0 ? true : false;
        var strNumber = Math.abs(inumber) + "";
        var result = "";
        var temp = strNumber.length;
        for (var i = 0; i < strNumber.length ; i++) {
            result = result + strNumber[i];
            temp--;
            if (temp % 3 == 0 && i != strNumber.length - 1)
                result = result + ",";
        }
        if (isMinus)
            result = "-" + result;
        return result;
    },
    getTimeFormat: function (nSecond) {
        var s = nSecond, p = 0, h = 0;
      
        h = Math.round(s / 3600);
        s = s % 3600;
        p = Math.round(s / 60 - 0.5);
        s = s % 60;
  
        var gio = "";
        var phut = "";
        var giay = "";
  
        if ((p + "").length < 2)
            phut = "0" + p;
        else
            phut = p;
        if ((s + "").length < 2)
            giay = "0" + s;
        else
            giay = s;
  
        if (h == 0)
            return phut + ":" + giay;
        else if (p == 0 && h == 0)
            return giay;
  
        //if (gio  "00")
        //    return phut + ":" + giay;
        //return gio + ":" + phut + ":" + giay;
        return phut + ":" + giay;
    }
}