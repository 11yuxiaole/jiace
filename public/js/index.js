$(function () {
    var pageIndex = 1,
        pageSize = 6,
        isFirst = true
        ;
    getCollegeList();
    jobList();
    courseList();

    //获取培训学校
    function getCollegeList() {
        $.AkmiiAjaxGet(window.api_list.college_filter, { pageIndex: pageIndex, pageSize: pageSize }, false).then(function (d) {
            if (d.jsonData && d.jsonData.rows && d.jsonData.rows.length > 0) {
                var str = '';
                var template = '<li><a class="school-link" href="{0}"><div class="school-info">\
                <div class="school-logo fl"><img data-src="{1}" src="../images/colloge-logo.png"></div><div class="school-name fl">\
                <p>{2}</p><img src="../images/stars.png"></div></div><p class="school-position">\
                {3}</p></a></li>';
                d.jsonData.rows.forEach(function (item) {
                    str += template.format([
                        "college-detail.html?id=" + item.id,
                        item.logoUrl || "../images/colloge-logo.png",
                        item.schoolName,
                        item.learnTypes || ''
                    ]);
                });
                if ($("#pagelist li").length <= 0) {
                    createPageList(d.jsonData.records);
                }
                $("#cologe-list").html(str);
                $("#cologe-list").find('.school-logo img').error(function () {
                    $(this).attr('src', '../images/colloge-logo.png')
                });
                $.imgLoad($("#cologe-list").find('img'));
            }
        }, function () {

        })
    }

    /**生成分页 */
    function createPageList(records) {
        var str = '',
            _pageSize = Math.floor(records / pageSize)
        for (var i = 1; i <= _pageSize; i++) {
            str += '<li class="' + (i == 1 ? 'active' : '') + '" data-num="' + i + '"></li>'
        }
        $("#pagelist").append(str);
    }
    $("#pagelist").on('click', 'li', function () {
        var _self = $(this);
        pageIndex = _self.data('num');
        _self.addClass('active').siblings().removeClass('active');
        getCollegeList();
    });
    /**工作机会 */
    function jobList() {
        $.AkmiiAjaxGet(window.api_list.job_list, {
            showMore: '',
            pageNumber: pageIndex,
            pageSize: pageSize
        }, false).then(function (d) {
            if (d.jsonData) {
                var str = '';
                var template = '<li class="buss_list">\
                <a href="{0}">\
                <span class="first">[{1}]</span>\
                <span class="second">{7}</span>{2}&nbsp;&nbsp;\
                <span class="test">{3}</span>\
                </a><p><span>{4}{5}</span>{6}</p></li>';
                d.jsonData.forEach(function (item) {
                    var address = "";
                    if (item.city == "") {
                        address = item.privince;
                    } else {
                        address = item.privince + "-" + item.city;
                    }
                    var salary = "";
                    if (item.salary != null) {
                        salary = $.RetainedDecimalPlacesNF(item.salary);
                    }
                    str += template.format([
                        'job.html',
                        item.websiteName,
                        address,
                        item.demand,
                        salary,
                        item.salaryTypeValue,
                        item.addDate,
                        item.positionName
                    ]);
                });
                $("#job-list").html(str);
                $(".buss_list a .test").each(function () {
                    var text = $(this).text();
                    $(this).html(text);
                });
            } else {
            }
        }, function () {

        })
        var scrollTimer;
        $(".ul_box").on("mouseenter mouseleave", "a", function (e) {
            var $this = $(this);
            if (e.type == "mouseenter") {
                clearInterval(scrollTimer);
                $(this).css("color", "#31c27c");
            } else {
                $(this).css("color", "#545454");
                scrollTimer = setInterval(function () {

                    scrollNews($this);
                }, 2000);
            }
        });

        function scrollNews(obj) {
            var $self = obj.parent("li").parent("ul");
            var lineHeight = $self.find("li:first").height();
            $self.animate({
                "marginTop": -lineHeight + "px"
            }, 600, function () {
                $self.css({
                    marginTop: 0
                }).find("li:first").appendTo($self);
            })
        };
        $(".ul_box").find("a:first").trigger("mouseleave");
    }
	String.prototype.startWith=function(str){     
	  var reg=new RegExp("^"+str);     
	  return reg.test(this);        
	}  
    /**推荐课程 */
    function courseList() {
        $.AkmiiAjaxGet(window.api_list.course_base, { pageIndex: 1, pageSize: 10,isHot:1 }, false).then(function (d) {
            if (d.jsonData) {
                var str = '';
                var template = '<li><a class="school-link" href="{0}"><div class="courses-info">\
                <img class="courses-logo" src="{1}"><div class="courses-name">\
                <p class="c-name">{2}</p><p class="online"><img src="../images/online.png">\
                <span>{3}</span></p></div><div class="skill">{4}</div><hr>\
                <div class="work-type">适合工种：{5}</div><img class="hot" {6} src="../images/hot.png"></div></a></li>';
				var licount=0;
                d.jsonData.rows.forEach(function (item, index) {
                    if (licount >= 4) {
                        return;
                    }
					if(item.courseName.startWith("母婴护理")
						||item.courseName.startWith("高级泌乳师")
						||item.courseName.startWith("初级育婴员")
						||item.courseName.indexOf("养老护理")>-1){
						str += template.format([
                        'course-detail.html?id=' + item.courseId,
                        item.courseImg || '../images/courses-logo.jpg',
                        item.courseName,
                        item.orderNum,
                        item.orgName,
                        item.courseSuitableJob || '',
                        item.isHot ? "" : "style='visibility: hidden;'"
						]);
						licount++;
					}                    
                });
                $("#course-list").html(str);
                hotCourseList(d.jsonData.rows);
            } else {
                //$("#course-list-warp").hide();
            }
        }, function () {

        })
    }
    /**热门课程 */
    function hotCourseList(list) {
        var str = '';
        var template = '<li><a href="{0}">{1}</a></li >';
        list.forEach(function (item, index) {
			if (index >= 6) {
				return;
            }
            str += template.format([
                'course-detail.html?id=' + item.courseId,
                item.courseName
            ]);
        });
        $("#hot-course").append(str);
    }
})