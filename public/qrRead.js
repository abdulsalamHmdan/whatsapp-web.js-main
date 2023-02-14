function getqr(mgm3) {

    $.ajax({
        method: "post",
        url: "/qr",
        data: { mgm3: mgm3 },
        error: function () {
            console.log("err")
        },
        success: function (qr) {
            console.log("ok")
            document.querySelector("." + mgm3).innerHTML = "";
            var qrcode = new QRCode(document.querySelector("." + mgm3), {
                text: qr,
                width: 400,
                height: 400,
                colorDark: "#000",
                colorLight: "#fff",
                correctLevel: QRCode.CorrectLevel.L
            });
        }
    })



}