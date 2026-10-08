const fs = require("fs");
const express = require("express");

const app = express();

const PORT = process.env.PORT || 3000;

const TEN_DANG_NHAP = "admin";
const MAT_KHAU = "ductep2026";


/* =========================
   CẤU HÌNH
========================= */

app.use(express.urlencoded({
    extended: true
}));

app.use(express.static(__dirname));


/* =========================
   ĐĂNG NHẬP ADMIN
========================= */

app.post("/dang-nhap", function(req, res) {

    const tenDangNhap = req.body.tenDangNhap;
    const matKhau = req.body.matKhau;

    if (
        tenDangNhap === TEN_DANG_NHAP &&
        matKhau === MAT_KHAU
    ) {

        res.send(`
            <!DOCTYPE html>

            <html lang="vi">

            <head>

                <meta charset="UTF-8">

                <meta
                    http-equiv="refresh"
                    content="0;url=/admin.html"
                >

                <title>DUCTEP - Đăng nhập</title>

            </head>

            <body
                style="
                    font-family: Arial;
                    text-align: center;
                    padding-top: 100px;
                "
            >

                <h2>
                    Đăng nhập thành công!
                </h2>

                <p>
                    Đang chuyển đến trang quản trị...
                </p>

            </body>

            </html>
        `);

        return;
    }


    res.send(`
        <!DOCTYPE html>

        <html lang="vi">

        <head>

            <meta charset="UTF-8">

            <title>
                DUCTEP - Đăng nhập
            </title>

            <style>

                body {
                    font-family: Arial;
                    text-align: center;
                    padding-top: 100px;
                    background: #f5f7fb;
                }

                .khung {
                    width: 400px;
                    max-width: 90%;
                    margin: auto;
                    padding: 40px;
                    background: white;
                    border-radius: 15px;
                    box-shadow:
                        0 10px 30px
                        rgba(0,0,0,0.08);
                }

                h2 {
                    color: #dc2626;
                }

                a {
                    display: inline-block;
                    margin-top: 20px;
                    color: #2563eb;
                    text-decoration: none;
                    font-weight: bold;
                }

            </style>

        </head>

        <body>

            <div class="khung">

                <h2>
                    Sai tên đăng nhập hoặc mật khẩu!
                </h2>

                <p>
                    Vui lòng kiểm tra lại thông tin.
                </p>

                <a href="/dangnhap.html">
                    ← Quay lại đăng nhập
                </a>

            </div>

        </body>

        </html>
    `);

});


/* =========================
   FORM LIÊN HỆ
========================= */

app.post("/lien-he", function(req, res) {

    const hoTen = req.body.hoTen || "";
    const email = req.body.email || "";
    const soDienThoai = req.body.soDienThoai || "";
    const dichVu = req.body.dichVu || "";
    const noiDung = req.body.noiDung || "";


    const duLieu =
        "Họ tên: " + hoTen + "\n" +
        "Email: " + email + "\n" +
        "Số điện thoại: " + soDienThoai + "\n" +
        "Dịch vụ: " + dichVu + "\n" +
        "Nội dung: " + noiDung + "\n" +
        "Thời gian: " +
        new Date().toLocaleString("vi-VN") +
        "\n" +
        "------------------------\n";


    fs.appendFile(
        "lienhe.txt",
        duLieu,
        function(err) {

            if (err) {

                res.send(`
                    <!DOCTYPE html>

                    <html lang="vi">

                    <head>

                        <meta charset="UTF-8">

                        <title>
                            DUCTEP
                        </title>

                    </head>

                    <body
                        style="
                            font-family: Arial;
                            text-align: center;
                            padding-top: 100px;
                        "
                    >

                        <h2>
                            Có lỗi khi lưu thông tin!
                        </h2>

                        <p>
                            Vui lòng thử lại sau.
                        </p>

                        <a href="/lienhe.html">
                            Quay lại
                        </a>

                    </body>

                    </html>
                `);

                return;
            }


            res.send(`
                <!DOCTYPE html>

                <html lang="vi">

                <head>

                    <meta charset="UTF-8">

                    <meta
                        http-equiv="refresh"
                        content="3;url=/"
                    >

                    <title>
                        DUCTEP - Thành công
                    </title>

                    <style>

                        body {
                            font-family: Arial;
                            text-align: center;
                            padding-top: 100px;
                            background: #f5f7fb;
                        }

                        .khung {
                            width: 500px;
                            max-width: 90%;
                            margin: auto;
                            padding: 50px 30px;
                            background: white;
                            border-radius: 20px;
                            box-shadow:
                                0 10px 30px
                                rgba(0,0,0,0.08);
                        }

                        h2 {
                            color: #2563eb;
                            margin-bottom: 15px;
                        }

                        p {
                            color: #666;
                            line-height: 1.6;
                        }

                        a {
                            display: inline-block;
                            margin-top: 20px;
                            color: #2563eb;
                            font-weight: bold;
                            text-decoration: none;
                        }

                    </style>

                </head>

                <body>

                    <div class="khung">

                        <h2>
                            ✓ Đã nhận yêu cầu!
                        </h2>

                        <p>
                            DUCTEP đã lưu thông tin
                            liên hệ của bạn.
                        </p>

                        <p>
                            Đang chuyển về trang chủ...
                        </p>

                        <a href="/">
                            Về trang chủ ngay
                        </a>

                    </div>

                </body>

                </html>
            `);

        }
    );

});


/* =========================
   LẤY DỮ LIỆU LIÊN HỆ
========================= */

app.get(
    "/du-lieu-lien-he",
    function(req, res) {

        fs.readFile(
            "lienhe.txt",
            "utf8",
            function(err, data) {

                if (err) {

                    res.send(
                        "Chưa có dữ liệu liên hệ."
                    );

                    return;
                }

                res.send(data);

            }
        );

    }
);


/* =========================
   KIỂM TRA SERVER
========================= */

app.get(
    "/kiem-tra",
    function(req, res) {

        res.send(`
            <h1>
                DUCTEP SERVER ĐANG HOẠT ĐỘNG
            </h1>

            <p>
                Server chạy bình thường.
            </p>
        `);

    }
);


/* =========================
   KHỞI ĐỘNG SERVER
========================= */

app.listen(
    PORT,
    "0.0.0.0",
    function() {

        console.log(
            "================================"
        );

        console.log(
            "DUCTEP đang chạy!"
        );

        console.log(
            "PORT: " + PORT
        );

        console.log(
            "================================"
        );

    }
);