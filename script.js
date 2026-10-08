document.addEventListener(
    "DOMContentLoaded",
    function() {

        /* =========================
           NÚT CHÀO MỪNG
        ========================= */

        window.batDau = function() {

            alert(
                "Chào mừng bạn đến với DUCTEP - Dịch vụ mạng xã hội!"
            );

        };


        /* =========================
           CUỘN MƯỢT KHI BẤM LINK #
        ========================= */

        const cacLienKet =
            document.querySelectorAll(
                'a[href^="#"]'
            );


        cacLienKet.forEach(
            function(lienKet) {

                lienKet.addEventListener(
                    "click",
                    function(e) {

                        const id =
                            lienKet.getAttribute(
                                "href"
                            );

                        if (
                            id === "#" ||
                            id === ""
                        ) {
                            return;
                        }


                        const phanTu =
                            document.querySelector(id);


                        if (phanTu) {

                            e.preventDefault();

                            phanTu.scrollIntoView({
                                behavior: "smooth"
                            });

                        }

                    }
                );

            }
        );


        /* =========================
           HIỆU ỨNG KHI CUỘN
        ========================= */

        const cacThe =
            document.querySelectorAll(
                ".o, .anh-card, .gia-card, .danh-gia-card, .lienhe-item"
            );


        cacThe.forEach(
            function(the) {

                the.style.opacity = "0";

                the.style.transform =
                    "translateY(25px)";

                the.style.transition =
                    "opacity 0.6s ease, transform 0.6s ease";

            }
        );


        function kiemTraHienThi() {

            cacThe.forEach(
                function(the) {

                    const viTri =
                        the.getBoundingClientRect();

                    if (
                        viTri.top <
                        window.innerHeight - 80
                    ) {

                        the.style.opacity = "1";

                        the.style.transform =
                            "translateY(0)";

                    }

                }
            );

        }


        window.addEventListener(
            "scroll",
            kiemTraHienThi
        );


        kiemTraHienThi();


        /* =========================
           XÁC NHẬN FORM LIÊN HỆ
        ========================= */

        const formLienHe =
            document.querySelector(
                'form[action="/lien-he"]'
            );


        if (formLienHe) {

            formLienHe.addEventListener(
                "submit",
                function(e) {

                    const hoTen =
                        formLienHe.querySelector(
                            '[name="hoTen"]'
                        );

                    const email =
                        formLienHe.querySelector(
                            '[name="email"]'
                        );

                    const dichVu =
                        formLienHe.querySelector(
                            '[name="dichVu"]'
                        );


                    if (
                        !hoTen ||
                        !email ||
                        !dichVu
                    ) {
                        return;
                    }


                    if (
                        hoTen.value.trim() === ""
                    ) {

                        e.preventDefault();

                        alert(
                            "Vui lòng nhập họ tên."
                        );

                        hoTen.focus();

                        return;
                    }


                    if (
                        email.value.trim() === ""
                    ) {

                        e.preventDefault();

                        alert(
                            "Vui lòng nhập email."
                        );

                        email.focus();

                        return;
                    }


                    if (
                        dichVu.value === ""
                    ) {

                        e.preventDefault();

                        alert(
                            "Vui lòng chọn dịch vụ."
                        );

                        dichVu.focus();

                        return;
                    }


                    const xacNhan =
                        confirm(
                            "Bạn có chắc muốn gửi yêu cầu cho DUCTEP không?"
                        );


                    if (!xacNhan) {

                        e.preventDefault();

                    }

                }
            );

        }


        /* =========================
           FAQ
        ========================= */

        const danhSachFAQ =
            document.querySelectorAll(
                ".khung-faq details"
            );


        danhSachFAQ.forEach(
            function(faq) {

                faq.addEventListener(
                    "toggle",
                    function() {

                        if (faq.open) {

                            danhSachFAQ.forEach(
                                function(faqKhac) {

                                    if (
                                        faqKhac !== faq &&
                                        faqKhac.open
                                    ) {

                                        faqKhac.open =
                                            false;

                                    }

                                }
                            );

                        }

                    }
                );

            }
        );


        /* =========================
           HIỂN THỊ NĂM HIỆN TẠI
        ========================= */

        const namHienTai =
            new Date().getFullYear();

        const cacNam =
            document.querySelectorAll(
                ".nam-hien-tai"
            );


        cacNam.forEach(
            function(the) {

                the.textContent =
                    namHienTai;

            }
        );


    }
);