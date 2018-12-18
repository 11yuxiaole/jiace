(function ($) {
    $(".mark").click(function () {
        $(".mark,.fixed-login").hide();
    });
    $(".login-menu,.login-img").click(function () {
        $(".mark,.fixed-login").show();
    });
    defaultError = "网络异常"
    var apiprefix = "";
    window.api_list = {
        /**省份 */
        province: apiprefix + "/jiacerapps/api/common/area/province",//学院-省条件
        city: apiprefix + "/jiacerapps/api/common/area/city",//学院-市条件
        course_base: apiprefix + "/jiacerapps/course/base/page/",//
        course_usable: apiprefix + "/jiacerapps/course/base/usable/",
        course_detail: apiprefix + '/jiacerapps/course/base/',
        college_filter: apiprefix + '/jiacerapps/api/school/pageSchoolwithLearn',
        college_detail: apiprefix + '/jiacerapps/api/school/',
        college_courselist: apiprefix + '/jiacerapps/course/page',
        college_qr: apiprefix + '/jiacerapps/api/school/qrcode/',
        schoollist_incourse: apiprefix + '/jiacerapps/api/school/pageByCourse',
        job_age_range: apiprefix + '/jiacerapps/api/gs/bridge/ageRange', //年龄条件
        job_city: apiprefix + '/jiacerapps/api/gs/bridge/city', //工作-城市条件
        job_province: apiprefix + '/jiacerapps/api/gs/bridge/province', //工作-省条件
        job_service_income: apiprefix + '/jiacerapps/api/gs/bridge/serviceIncome', //薪资条件
        job_service_type: apiprefix + '/jiacerapps/api/gs/bridge/serviceType', //工种条件
        job_list: apiprefix + '/jiacerapps/api/gs/bridge/job', //工作查询
    }
    String.prototype.format = function (e) {
        var result = this;
        if (arguments.length > 0) {
            if ((e.constructor + '').indexOf('Array') > 0) {
                for (var i = 0; i < e.length; i++) {
                    var reg = new RegExp("({)" + i + "(})", "g");
                    result = result.replace(reg, e[i]);
                }
            } else if (typeof (e) === 'object') {

            }
        }
        return result;
    }
    $.extend({
        AkmiiAjaxPost: function (url, data, loading) {
            var dtd = $.Deferred();
            if (loading) { };
            $.ajax(url, {
                type: "POST",
                data: JSON.stringify(data),
                contentType: 'application/json',
                dataType: "json",
                xhrFields: {
                    // withCredentials: true
                },
                beforeSend: function (request) { },
            }).then(function (d) {
                if (loading) { }
                dtd.resolve(d);
            }, function (d) {
                if (loading) { }
                dtd.reject(defaultError);
            });
            return dtd.promise();
        },
        AkmiiAjaxGet: function (url, data, loading) {
            if (loading) { }
            var dtd = $.Deferred();
            url = url + $.ObjectToParameter(data);
            var thisurl = url;
            if (url.indexOf('?') < 0) {
                thisurl += '?_timestamp=' + (new Date()).getTime();
            } else {
                thisurl += '&_timestamp=' + (new Date()).getTime();
            }
            $.ajax({
                url: thisurl,
                dataType: "json",
                xhrFields: {
                    // withCredentials: true
                },
                beforeSend: function (request) {

                }
            }).then(function (d) {
                dtd.resolve(d);
            }, function (d) {
                dtd.reject(defaultError);
            });
            return dtd.promise();
        },
        ObjectToParameter: function (obj) {
            var arr = Object.keys(obj);
            if (arr.length == 0)
                return '';
            var result = '';
            arr.forEach(function (item, index) {
                if (index == 0) {
                    result += "?" + item + "=" + obj[item] + "&";
                } else {
                    result += item + "=" + obj[item] + "&";
                }
            });
            return result.substring(0, result.length - 1);
        },
        //获取url参数
        getQueryStringByName: function (name) {
            var result = location.search.match(new RegExp("[\?\&]" + name + "=([^\&]+)", "i"));
            if (result == null || result.length < 1) {
                return "";
            }
            return result[1];
        },
        imgLoad: function (img, callback) {
            $.each(img, function (index, entry) {
                var timer = setInterval(function () {
                    if (entry.complete) {
                        // callback(entry);
                        $(entry).attr("src", $(entry).data('src'))
                        clearInterval(timer)
                    }

                }, 100);
            });
        },
        RetainedDecimalPlacesNF: function (num) {
            var source = String(num).split(".");
            source[0] = source[0].replace(new RegExp('(\\d)(?=(\\d{3})+$)', 'ig'), "$1,");
            return source[0];
        },
        gradeText: function (no) {
            switch (no) {
                case '02':
                    return '初级';
                case '03':
                    return '中级';
                case '04':
                    return '高级';
                default:
                    return no;
            }
        }
    })
})($)