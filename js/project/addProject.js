window.Router.route("/step1", function () {
    AddProject.prototype.ShowStep("step1");
});

window.Router.route("/step2", function () {
    AddProject.prototype.ShowStep("step2");
});

window.Router.route("/step3", function () {
    AddProject.prototype.ShowStep("step3");
});

window.Router.route("/step4", function () {
    AddProject.prototype.ShowStep("step4");
});

window.Router.route("/step5", function () {
    AddProject.prototype.ShowStep("step5");
});

window.Router.route("/step6", function () {
    AddProject.prototype.ShowStep("step6");
});

window.Router.route("/step7", function () {
    AddProject.prototype.ShowStep("step7");
});

$(document).ready(function () {
    Common.prototype.checkLoginStatu();
});

var isEdit = false;
var oldTitle = "";

$(function () {
    AddProject.prototype.initData();
    $(".back").on("click", AddProject.prototype.BackToProject);
    oldTitle = $(".title_center").html();
    //新建时的下一步按钮，编辑时的保存按钮点击事件
    $(".next_step").on("click", function () {
        if (AddProject.prototype.CheckNull.call(this)) {
            if (isEdit) {
                $(".next_step").off("click");//取消点击事件，防止多次保存
                var stepnum = parseInt($(this).data("step"));
                AddProject.prototype.SaveProject(stepnum);
            } else {
                fishedStep += 1;
            }
        } else {
            return false;
        }
    });

    $(".selectCustomer").on("click", AddProject.prototype.ShowSelectCousomerD);

    $(".selectContacts").on("click", AddProject.prototype.ShowSelectContactsD);

    // $(".addCustomerBtn").on("click",AddProject.prototype.ShowAddCustomer_direct);

    // $(".selectHangY").on("click",AddProject.prototype.ShowIndustry);

    $(".in_Choice").on("click", function () {
        $(".in_Choice").removeClass("modelSelected");
        $(this).addClass("modelSelected");
        $("#model").val($(this).data("value"));
    });

    $(".btn_search").on("click", function () {
        AddProject.prototype.search(1, 15);
    });

    $(".btn_search_contacts").on("click", function () {
        AddProject.prototype.searchContacts(1, 15);
    });

    $("#address").on("click", AddProject.prototype.ShowIndustry);

    $(".industry_left").find("li").on("click", AddProject.prototype.LoadCity);

    $("#getDistance").on("click",function(){
        layer.open({
            type: 2,
            title: false,
            shadeClose: true,
            shade: 0.8,
            area: ['100%', '100%'],
            content: '/common/map.html' //iframe的url
          }); 
    });

});

var AddProject = function () {};
AddProject.prototype.LoadCity = function () {
    $(".addressSelect").removeClass("addressSelect");
    $(this).addClass("addressSelect");
    var province = $(this).data("value");
    var cityList = "";
    $(".subIndustry").html();
    $(".subIndustry").data("province", province);
    switch (province) {
        case "北京市":
            {
                cityList += "<li>北京市-010</li>";
                break;
            }
        case "天津市":
            {
                cityList += "<li>天津市-022</li>";
                break;
            }
        case "上海市":
            {
                cityList += "<li>上海市-021</li>";
                break;
            }
        case "重庆市":
            {
                cityList += "<li>重庆市-023</li>";
                break;
            }
        case "河北省":
            {
                cityList += "<li>石家庄市-311</li>";
                cityList += "<li>唐山市-315</li>";
                cityList += "<li>秦皇岛市-335</li>";
                cityList += "<li>邯郸市-310</li>";
                cityList += "<li>邢台市-319</li>";
                cityList += "<li>保定市-312</li>";
                cityList += "<li>张家口市-313</li>";
                cityList += "<li>承德市-314</li>";
                cityList += "<li>沧州市-317</li>";
                cityList += "<li>廊坊市-316</li>";
                cityList += "<li>衡水市-318</li>";
                break;
            }
        case "河南省":
            {
                cityList += "<li>郑州市-371</li>";
                cityList += "<li>开封市-378</li>";
                cityList += "<li>洛阳市-379</li>";
                cityList += "<li>平顶山市-375</li>";
                cityList += "<li>安阳市-372</li>";
                cityList += "<li>鹤壁市-392</li>";
                cityList += "<li>新乡市-373</li>";
                cityList += "<li>焦作市-391</li>";
                cityList += "<li>济源市-391</li>";
                cityList += "<li>濮阳市-393</li>";
                cityList += "<li>许昌市-374</li>";
                cityList += "<li>漯河市-395</li>";
                cityList += "<li>三门峡市-398</li>";
                cityList += "<li>南阳市-377</li>";
                cityList += "<li>商丘市-370</li>";
                cityList += "<li>信阳市-376</li>";
                cityList += "<li>周口市-394</li>";
                cityList += "<li>驻马店市-396</li>";
                break;
            }
        case "云南省":
            {
                cityList += "<li>昆明市-871</li>";
                cityList += "<li>曲靖市-874</li>";
                cityList += "<li>玉溪市-877</li>";
                cityList += "<li>保山市-875</li>";
                cityList += "<li>昭通市-870</li>";
                cityList += "<li>丽江市-888</li>";
                cityList += "<li>临沧市-883</li>";
                cityList += "<li>楚雄彝族自治州-878</li>";
                cityList += "<li>红河哈尼族彝族自治州-873</li>";
                cityList += "<li>文山壮族苗族自治州-876</li>";
                cityList += "<li>西双版纳傣族自治州-691</li>";
                cityList += "<li>大理白族自治州-872</li>";
                cityList += "<li>德宏傣族景颇族自治州-692</li>";
                cityList += "<li>怒江傈僳族自治州-886</li>";
                cityList += "<li>迪庆藏族自治州-887</li>";
                break;
            }
        case "辽宁省":
            {
                cityList += "<li>沈阳市-024</li>";
                cityList += "<li>大连市-411</li>";
                cityList += "<li>鞍山市-412</li>";
                cityList += "<li>抚顺市-413</li>";
                cityList += "<li>本溪市-414</li>";
                cityList += "<li>丹东市-415</li>";
                cityList += "<li>锦州市-416</li>";
                cityList += "<li>营口市-417</li>";
                cityList += "<li>阜新市-418</li>";
                cityList += "<li>辽阳市-419</li>";
                cityList += "<li>盘锦市-427</li>";
                cityList += "<li>铁岭市-410</li>";
                cityList += "<li>朝阳市-421</li>";
                cityList += "<li>葫芦岛市-429</li>";
                break;
            }
        case "黑龙江省":
            {
                cityList += "<li>哈尔滨市-451</li>";
                cityList += "<li>齐齐哈尔市-452</li>";
                cityList += "<li>鸡西市-467</li>";
                cityList += "<li>鹤岗市-468</li>";
                cityList += "<li>双鸭山市-469</li>";
                cityList += "<li>大庆市-459</li>";
                cityList += "<li>伊春市-458</li>";
                cityList += "<li>佳木斯市-454</li>";
                cityList += "<li>七台河市-464</li>";
                cityList += "<li>牡丹江市-453</li>";
                cityList += "<li>黑河市-456</li>";
                cityList += "<li>绥化市-455</li>";
                cityList += "<li>大兴安岭地区-457</li>";
                break;
            }
        case "湖南省":
            {
                cityList += "<li>长沙市-731</li>";
                cityList += "<li>株洲市-733</li>";
                cityList += "<li>湘潭市-732</li>";
                cityList += "<li>衡阳市-734</li>";
                cityList += "<li>邵阳市-739</li>";
                cityList += "<li>岳阳市-730</li>";
                cityList += "<li>常德市-736</li>";
                cityList += "<li>张家界市-744</li>";
                cityList += "<li>益阳市-737</li>";
                cityList += "<li>郴州市-735</li>";
                cityList += "<li>永州市-746</li>";
                cityList += "<li>怀化市-745</li>";
                cityList += "<li>娄底市-738</li>";
                cityList += "<li>湘西土家族苗族自治州-743</li>";
                break;
            }
        case "安徽省":
            {
                cityList += "<li>合肥市-551</li>";
                cityList += "<li>芜湖市-553</li>";
                cityList += "<li>蚌埠市-552</li>";
                cityList += "<li>淮南市-554</li>";
                cityList += "<li>马鞍山市-555</li>";
                cityList += "<li>淮北市-561</li>";
                cityList += "<li>铜陵市-562</li>";
                cityList += "<li>安庆市-556</li>";
                cityList += "<li>黄山市-559</li>";
                cityList += "<li>滁州市-550</li>";
                cityList += "<li>阜阳市-558</li>";
                cityList += "<li>宿州市-557</li>";
                cityList += "<li>六安市-564</li>";
                cityList += "<li>亳州市-558</li>";
                cityList += "<li>池州-566</li>";
                cityList += "<li>宣城市-563</li>";
                break;
            }
        case "山东省":
            {
                cityList += "<li>济南市-531</li>";
                cityList += "<li>青岛市-532</li>";
                cityList += "<li>淄博市-533</li>";
                cityList += "<li>枣庄市-632</li>";
                cityList += "<li>东营市-546</li>";
                cityList += "<li>烟台市-535</li>";
                cityList += "<li>潍坊市-536</li>";
                cityList += "<li>济宁市-537</li>";
                cityList += "<li>泰安市-538</li>";
                cityList += "<li>威海市-631</li>";
                cityList += "<li>日照市-633</li>";
                cityList += "<li>莱芜市-634</li>";
                cityList += "<li>临沂市-539</li>";
                cityList += "<li>德州市-534</li>";
                cityList += "<li>聊城市-635</li>";
                cityList += "<li>滨州市-543</li>";
                cityList += "<li>菏泽市-530</li>";
                break;
            }
        case "新疆维吾尔自治区":
            {
                cityList += "<li>乌鲁木齐市-991</li>";
                cityList += "<li>克拉玛依市-990</li>";
                cityList += "<li>吐鲁番地区-995</li>";
                cityList += "<li>哈密地区-902</li>";
                cityList += "<li>昌吉回族自治州-994</li>";
                cityList += "<li>博尔塔拉蒙古自治州-909</li>";
                cityList += "<li>巴音郭楞蒙古自治州-996</li>";
                cityList += "<li>阿克苏地区-997</li>";
                cityList += "<li>克孜勒苏柯尔克孜自治州-908</li>";
                cityList += "<li>喀什地区-998</li>";
                cityList += "<li>和田地区-903</li>";
                cityList += "<li>伊犁哈萨克自治州-999</li>";
                cityList += "<li>塔城地区-901</li>";
                cityList += "<li>阿勒泰地区-906</li>";
                cityList += "<li>石河子市-993</li>";
                cityList += "<li>阿拉尔市-997</li>";
                cityList += "<li>图木舒克市-998</li>";
                cityList += "<li>五家渠市-994</li>";
                break;
            }
        case "江苏省":
            {
                cityList += "<li>南京市-025</li>";
                cityList += "<li>无锡市-510</li>";
                cityList += "<li>徐州市-516</li>";
                cityList += "<li>常州市-519</li>";
                cityList += "<li>苏州市-512</li>";
                cityList += "<li>南通市-513</li>";
                cityList += "<li>连云港市-518</li>";
                cityList += "<li>淮安市-517</li>";
                cityList += "<li>盐城市-515</li>";
                cityList += "<li>扬州市-514</li>";
                cityList += "<li>镇江市-511</li>";
                cityList += "<li>泰州市-523</li>";
                cityList += "<li>宿迁市-527</li>";
                break;
            }
        case "浙江省":
            {
                cityList += "<li>杭州市-571</li>";
                cityList += "<li>宁波市-574</li>";
                cityList += "<li>温州市-577</li>";
                cityList += "<li>嘉兴市-573</li>";
                cityList += "<li>湖州市-572</li>";
                cityList += "<li>绍兴市-575</li>";
                cityList += "<li>金华市-579</li>";
                cityList += "<li>衢州市-570</li>";
                cityList += "<li>舟山市-580</li>";
                cityList += "<li>台州市-576</li>";
                cityList += "<li>丽水市-578</li>";
                break;
            }
        case "江西省":
            {
                cityList += "<li>南昌市-791</li>";
                cityList += "<li>景德镇市-798</li>";
                cityList += "<li>萍乡市-799</li>";
                cityList += "<li>九江市-792</li>";
                cityList += "<li>新余市-790</li>";
                cityList += "<li>鹰潭市-701</li>";
                cityList += "<li>赣州市-797</li>";
                cityList += "<li>吉安市-796</li>";
                cityList += "<li>宜春市-795</li>";
                cityList += "<li>抚州市-794</li>";
                cityList += "<li>上饶市-793</li>";
                break;
            }
        case "湖北省":
            {
                cityList += "<li>武汉市-027</li>";
                cityList += "<li>黄石市-714</li>";
                cityList += "<li>十堰市-719</li>";
                cityList += "<li>宜昌市-717</li>";
                cityList += "<li>襄樊市-710</li>";
                cityList += "<li>鄂州市-711</li>";
                cityList += "<li>荆门市-724</li>";
                cityList += "<li>孝感市-712</li>";
                cityList += "<li>荆州市-716</li>";
                cityList += "<li>黄冈市-713</li>";
                cityList += "<li>咸宁市-715</li>";
                cityList += "<li>随州市-722</li>";
                cityList += "<li>恩施土家族苗族自治州-718</li>";
                cityList += "<li>仙桃市-728</li>";
                cityList += "<li>潜江市-728</li>";
                cityList += "<li>天门市-728</li>";
                cityList += "<li>神农架林区-719</li>";
                break;
            }
        case "广西壮族":
            {
                cityList += "<li>南宁市-771</li>";
                cityList += "<li>柳州市-772</li>";
                cityList += "<li>桂林市-773</li>";
                cityList += "<li>梧州市-774</li>";
                cityList += "<li>北海市-779</li>";
                cityList += "<li>防城港市-770</li>";
                cityList += "<li>钦州市-777</li>";
                cityList += "<li>贵港市-775</li>";
                cityList += "<li>玉林市-775</li>";
                cityList += "<li>百色市-776</li>";
                cityList += "<li>贺州市-774</li>";
                cityList += "<li>河池市-778</li>";
                cityList += "<li>来宾市-772</li>";
                cityList += "<li>崇左市-771</li>";
                break;
            }
        case "甘肃省":
            {
                cityList += "<li>兰州市-931</li>";
                cityList += "<li>嘉峪关市-937</li>";
                cityList += "<li>金昌市-935</li>";
                cityList += "<li>白银市-943</li>";
                cityList += "<li>天水市-938</li>";
                cityList += "<li>武威市-935</li>";
                cityList += "<li>张掖市-936</li>";
                cityList += "<li>平凉市-933</li>";
                cityList += "<li>酒泉市-937</li>";
                cityList += "<li>庆阳市-934</li>";
                cityList += "<li>定西市-932</li>";
                cityList += "<li>陇南市-939</li>";
                cityList += "<li>临夏回族自治州-930</li>";
                cityList += "<li>甘南藏族自治州-941</li>";
                break;
            }
        case "山西省":
            {
                cityList += "<li>太原市-351</li>";
                cityList += "<li>大同市-352</li>";
                cityList += "<li>阳泉市-353</li>";
                cityList += "<li>长治市-355</li>";
                cityList += "<li>晋城市-356</li>";
                cityList += "<li>朔州市-349</li>";
                cityList += "<li>晋中市-354</li>";
                cityList += "<li>运城市-359</li>";
                cityList += "<li>忻州市-350</li>";
                cityList += "<li>临汾市-357</li>";
                cityList += "<li>吕梁市-358</li>";
                break;
            }
        case "内蒙古自治区":
            {
                cityList += "<li>呼和浩特市-471</li>";
                cityList += "<li>包头市-472</li>";
                cityList += "<li>乌海市-473</li>";
                cityList += "<li>赤峰市-476</li>";
                cityList += "<li>通辽市-475</li>";
                cityList += "<li>鄂尔多斯市-477</li>";
                cityList += "<li>呼伦贝尔市-470</li>";
                cityList += "<li>巴彦淖尔市-478</li>";
                cityList += "<li>乌兰察布市-474</li>";
                cityList += "<li>兴安盟-482</li>";
                cityList += "<li>锡林郭勒盟-479</li>";
                cityList += "<li>阿拉善盟-483</li>";
                break;
            }
        case "陕西省":
            {
                cityList += "<li>西安市-029</li>";
                cityList += "<li>铜川市-919</li>";
                cityList += "<li>宝鸡市-917</li>";
                cityList += "<li>咸阳市-029</li>";
                cityList += "<li>渭南市-913</li>";
                cityList += "<li>延安市-911</li>";
                cityList += "<li>汉中市-916</li>";
                cityList += "<li>榆林市-912</li>";
                cityList += "<li>安康市-915</li>";
                cityList += "<li>商洛市-914</li>";
                break;
            }
        case "吉林省":
            {
                cityList += "<li>长春市-431</li>";
                cityList += "<li>吉林市-432</li>";
                cityList += "<li>四平市-434</li>";
                cityList += "<li>辽源市-437</li>";
                cityList += "<li>通化市-435</li>";
                cityList += "<li>白山市-439</li>";
                cityList += "<li>松原市-438</li>";
                cityList += "<li>白城市-436</li>";
                cityList += "<li>延边朝鲜族自治州-433</li>";
                break;
            }
        case "福建省":
            {
                cityList += "<li>福州市-591</li>";
                cityList += "<li>厦门市-592</li>";
                cityList += "<li>莆田市-594</li>";
                cityList += "<li>三明市-598</li>";
                cityList += "<li>泉州市-595</li>";
                cityList += "<li>漳州市-596</li>";
                cityList += "<li>南平市-599</li>";
                cityList += "<li>龙岩市-597</li>";
                cityList += "<li>宁德市-593</li>";
                break;
            }
        case "贵州省":
            {
                cityList += "<li>贵阳市-851</li>";
                cityList += "<li>六盘水市-858</li>";
                cityList += "<li>遵义市-852</li>";
                cityList += "<li>安顺市-853</li>";
                cityList += "<li>铜仁地区-856</li>";
                cityList += "<li>黔西南布依族苗族自治州-859</li>";
                cityList += "<li>毕节地区-857</li>";
                cityList += "<li>黔东南苗族侗族自治州-855</li>";
                cityList += "<li>黔南布依族苗族自治州-854</li>";
                break;
            }
        case "广东省":
            {
                cityList += "<li>广州市-020</li>";
                cityList += "<li>韶关市-751</li>";
                cityList += "<li>深圳市-755</li>";
                cityList += "<li>珠海市-756</li>";
                cityList += "<li>汕头市-754</li>";
                cityList += "<li>佛山市-757</li>";
                cityList += "<li>江门市-750</li>";
                cityList += "<li>湛江市-759</li>";
                cityList += "<li>茂名市-668</li>";
                cityList += "<li>肇庆市-758</li>";
                cityList += "<li>惠州市-752</li>";
                cityList += "<li>梅州市-753</li>";
                cityList += "<li>汕尾市-660</li>";
                cityList += "<li>河源市-762</li>";
                cityList += "<li>阳江市-662</li>";
                cityList += "<li>清远市-763</li>";
                cityList += "<li>东莞市-769</li>";
                cityList += "<li>中山市-760</li>";
                cityList += "<li>潮州市-768</li>";
                cityList += "<li>揭阳市-663</li>";
                cityList += "<li>云浮市-766</li>";
                break;
            }
        case "青海省":
            {
                cityList += "<li>西宁市-971</li>";
                cityList += "<li>海东地区-972</li>";
                cityList += "<li>海北藏族自治州-970</li>";
                cityList += "<li>黄南藏族自治州-973</li>";
                cityList += "<li>海南藏族自治州-974</li>";
                cityList += "<li>果洛藏族自治州-975</li>";
                cityList += "<li>玉树藏族自治州-976</li>";
                cityList += "<li>海西蒙古族藏族自治州-977</li>";
                break;
            }
        case "西藏":
            {
                cityList += "<li>拉萨市-891</li>";
                cityList += "<li>昌都地区-895</li>";
                cityList += "<li>山南地区-893</li>";
                cityList += "<li>日喀则地市-892</li>";
                cityList += "<li>那曲地区-896</li>";
                cityList += "<li>阿里地区-897</li>";
                cityList += "<li>林芝地区-894</li>";
                break;
            }
        case "四川省":
            {
                cityList += "<li>成都市-028</li>";
                cityList += "<li>自贡市-813</li>";
                cityList += "<li>攀枝花市-812</li>";
                cityList += "<li>泸州市-830</li>";
                cityList += "<li>德阳市-838</li>";
                cityList += "<li>绵阳市-816</li>";
                cityList += "<li>广元市-839</li>";
                cityList += "<li>遂宁市-825</li>";
                cityList += "<li>内江市-832</li>";
                cityList += "<li>乐山市-833</li>";
                cityList += "<li>南充市-817</li>";
                cityList += "<li>眉山市-028</li>";
                cityList += "<li>宜宾市-831</li>";
                cityList += "<li>广安市-826</li>";
                cityList += "<li>达州市-818</li>";
                cityList += "<li>雅安市-835</li>";
                cityList += "<li>巴中市-827</li>";
                cityList += "<li>资阳市-028</li>";
                cityList += "<li>阿坝藏族羌族自治州-837</li>";
                cityList += "<li>甘孜藏族自治州-836</li>";
                cityList += "<li>凉山彝族自治州-834</li>";
                break;
            }
        case "宁夏回族自治区":
            {
                cityList += "<li>银川市-951</li>";
                cityList += "<li>石嘴山市-952</li>";
                cityList += "<li>吴忠市-953</li>";
                cityList += "<li>固原市-954</li>";
                cityList += "<li>中卫市-955</li>";
                break;
            }
        case "海南省":
            {
                cityList += "<li>海口市-898</li>";
                cityList += "<li>三亚市-898</li>";
                cityList += "<li>五指山市-898</li>";
                cityList += "<li>琼海市-898</li>";
                cityList += "<li>儋州市-898</li>";
                cityList += "<li>文昌市-898</li>";
                cityList += "<li>万宁市-898</li>";
                cityList += "<li>东方市-898</li>";
                cityList += "<li>定安县-898</li>";
                cityList += "<li>屯昌县-898</li>";
                cityList += "<li>澄迈县-898</li>";
                cityList += "<li>临高县-898</li>";
                cityList += "<li>白沙黎族自治县-898</li>";
                cityList += "<li>昌江黎族自治县-898</li>";
                cityList += "<li>乐东黎族自治县-898</li>";
                cityList += "<li>陵水黎族自治县-898</li>";
                cityList += "<li>保亭黎族苗族自治县-898</li>";
                cityList += "<li>琼中黎族苗族自治县-898</li>";
                break;

            }
        case "台湾省":
            {
                cityList += "<li>台北市-002</li>";
                cityList += "<li>高雄市-007</li>";
                cityList += "<li>基隆市-002</li>";
                cityList += "<li>台中市-004</li>";
                cityList += "<li>台南市-006</li>";
                cityList += "<li>新竹市-003</li>";
                cityList += "<li>嘉义市-005</li>";
                break;
            }
        case "香港特别行政区":
            {
                cityList += "<li>香港特别行政区-852</li>";
                break;
            }
        case "澳门特别行政区":
            {
                cityList += "<li>澳门特别行政区-853</li>";
                break;
            }
    } //switch end
    $(".subIndustry").html(cityList);
    $(".industry_right").find("li").on("click", function () {
        $(".subIndustry").find(".addressSelect").removeClass("addressSelect");
        $(this).addClass("addressSelect");
        var province = $(this).parent().data("province");
        var city = $(this).html();
        $("#province").val(province);
        $("#city").val(city);
        AddProject.prototype.IndustryBackToStep();
    });
}

AddProject.prototype.BackToProject = function () {
    history.back(-1);
};

AddProject.prototype.BackToStep = function (obj, title) {
    $(obj).addClass("none");
    $(".title_center").html(title);
    $(".back").off("click");
    $(".back").on("click", AddProject.prototype.BackToProject);
    $(".right_menu").css("display", "block");
    $("#btn_new_sure").remove();
    $(".title_center").removeClass("flexLayout");
};

var fishedStep = 1;

AddProject.prototype.ShowStep = function (step) {
    var id = Common.prototype.GetQueryString("id");
    if (!varIsNull(id)) {
        isEdit = true;
    }
    var currentStep = $(".currentStep");
    if (currentStep != null && currentStep != undefined && currentStep != "") {
        currentStep.removeClass("currentStep");
    }
    $("#" + step).addClass("currentStep");

    var stepNum = step.replace("step", "");
    $(".creatMessage-step").find(".none").removeClass("none");
    switch (stepNum) {
        case "1":
            {
                $(".a_step5").addClass("none");
                $(".arrow4").addClass("none");
                $(".a_step6").addClass("none");
                $(".arrow5").addClass("none");
                $(".a_step7").addClass("none");
                $(".arrow6").addClass("none");
                break;
            }
        case "2":
            {
                $(".a_step5").addClass("none");
                $(".arrow4").addClass("none");
                $(".a_step6").addClass("none");
                $(".arrow5").addClass("none");
                $(".a_step7").addClass("none");
                $(".arrow6").addClass("none");
                break;
            }
        case "3":
            {
                $(".a_step1").addClass("none");
                $(".arrow1").addClass("none");
                $(".a_step6").addClass("none");
                $(".arrow5").addClass("none");
                $(".a_step7").addClass("none");
                $(".arrow6").addClass("none");
                break;
            }
        case "4":
            {
                $(".a_step1").addClass("none");
                $(".arrow1").addClass("none");
                $(".a_step6").addClass("none");
                $(".arrow5").addClass("none");
                $(".a_step7").addClass("none");
                $(".arrow6").addClass("none");
                break;
            }
        case "5":
            {
                $(".a_step1").addClass("none");
                $(".arrow1").addClass("none");
                $(".a_step2").addClass("none");
                $(".arrow2").addClass("none");
                $(".a_step7").addClass("none");
                $(".arrow6").addClass("none");
                var xmlx = $("#xmlx").val();
                $("#step5").find(".none").removeClass("none");
                if (xmlx == "管廊") {
                    $(".li_cplx").addClass("none");
                    $(".li_zghjzmj").addClass("none");
                    $(".li_zpjzmj").addClass("none");
                    // $(".li_yjhte").addClass("none");
                    // $(".li_pcl").addClass("none");
                    $(".li_ds").addClass("none");
                    $(".li_cs").addClass("none");
                } else {
                    $(".li_cd").addClass("none");
                    $(".li_cas").addClass("none");
                }
                break;
            }
        case "6":
            {
                $(".a_step1").addClass("none");
                $(".arrow1").addClass("none");
                $(".a_step2").addClass("none");
                $(".arrow2").addClass("none");
                $(".a_step3").addClass("none");
                $(".arrow3").addClass("none");
                break;
            }
        case "7":
            {
                $(".a_step1").addClass("none");
                $(".arrow1").addClass("none");
                $(".a_step2").addClass("none");
                $(".arrow2").addClass("none");
                $(".a_step3").addClass("none");
                $(".arrow3").addClass("none");
                break;
            }
    }
    // if (parseInt(stepNum) > (fishedStep)) {
    //     window.location = "#/step" + fishedStep;
    //     return;
    // }
    // $(".next_step").attr("href", "#/step" + (parseInt(stepNum) + 1));
    $(".current").removeClass("current");
    $(".a_" + step).addClass("current");
    if (!isEdit) {
        for (var i = stepNum; i > 0; i--) {
            $(".a_step" + i).attr("href", "#/step" + i);
        }
    } else {
        $(".add_step" + stepNum).find("a[class='next_step']").attr("href", "javascript:void(0);");
        $(".add_step" + stepNum).find("a[class='next_step']").html("保存");
    }

};

AddProject.prototype.ShowSelectCousomerD = function () {
    var id = $(this).data("id");
    $("#selectCustomerDialogs").addClass("flexLayout");
    $("#selectCustomerDialogs").removeClass("none");
    $("#selectCustomerDialogs").data("id", id);
    $(".title_center").addClass("flexLayout");

    $(".title_center").html("<span class='flexItem'>选择客户</span><a class='new'></a>");
    $(".new").on("click", AddProject.prototype.ShowAddCustomer);
    $(".back").off("click", AddProject.prototype.BackToProject);
    $(".back").on("click", function () {
        AddProject.prototype.BackToStep("#selectCustomerDialogs", oldTitle);
    });
    $(".right_menu").css("display", "none");
    $(".title_btn").append("<a id='btn_new_sure'>确定</a>");
    $("#btn_new_sure").on("click", AddProject.prototype.SelectCustomer);
    // $(".addNewCustomer-input").css("display","none");
    // $(".addNewCustomer-input").val("");
};

AddProject.prototype.ShowSelectContactsD = function () {
    var id = $(this).data("id");
    $("#selectContactsDialogs").addClass("flexLayout");
    $("#selectContactsDialogs").removeClass("none");
    $("#selectContactsDialogs").data("id", id);
    $(".title_center").addClass("flexLayout");
    $(".title_center").html("<span class='flexItem'>选择联系人</span><a class='new'></a>");
    // $(".new").on("click", AddProject.prototype.ShowAddCustomer);  前往新建联系人界面
    $(".back").off("click", AddProject.prototype.BackToProject);
    $(".back").on("click", function () {
        AddProject.prototype.BackToStep("#selectContactsDialogs", oldTitle);
    });
    $(".right_menu").css("display", "none");
    $(".title_btn").append("<a id='btn_new_sure'>确定</a>");
    $("#btn_new_sure").on("click", AddProject.prototype.SelectCustomer);
}

AddProject.prototype.ShowAddCustomer = function () {
    $("#newCustomer").css("display", "block");
    $(".addNewCustomer-input").css("display", "block");
    $(".addNewCustomer-input").val("");
    $(".title_center").html("新建客户");
    $(".right_menu").css("display", "none");
    $(".title_center").removeClass("flexLayout");
    $(".back").off("click");
    $(".back").on("click", AddProject.prototype.backToSelect);
};

AddProject.prototype.backToSelect = function () {
    $("#newCustomer").css("display", "none");
    $(".title_center").addClass("flexLayout");
    $(".title_center").html("<span class='flexItem'>选择客户</span><a class='new'></a>");
    $(".new").on("click", AddProject.prototype.ShowAddCustomer);
    // $(".right_menu").css("display","block");
    $(".back").off("click");
    $(".back").on("click", function () {
        AddProject.prototype.BackToStep("#selectCustomerDialogs", oldTitle);
    });
};

//选择客户
AddProject.prototype.SelectCustomer = function () {
    var input_id = $("#selectCustomerDialogs").data("id");
    var value = $(this).find("span").html();
    var id = $(this).data("id");
    $("#" + input_id).val(value);
    $("#" + input_id + "Id").val(id);
    AddProject.prototype.BackToStep("#selectCustomerDialogs", oldTitle);
};

//选择客户
AddProject.prototype.SelectContacts = function () {
    var input_id = $("#selectContactsDialogs").data("id");
    var value = $(this).find("span").html();
    var id = $(this).data("id");
    $("#" + input_id).val(value);
    $("#" + input_id + "Id").val(id);
    AddProject.prototype.BackToStep("#selectContactsDialogs", oldTitle);
};

AddProject.prototype.ShowIndustry = function () {
    $(".industry_content").css("display", "block");
    $(".back").off("click");
    $(".back").on("click", AddProject.prototype.IndustryBackToStep);
    $(".title_center").html("选择行业");
    $(".right_menu").css("display", "none");
};

AddProject.prototype.IndustryBackToStep = function () {
    $(".industry_content").css("display", "none");
    $(".title_center").html(oldTitle);
    $(".right_menu").css("display", "block");
    $(".back").off("click");
    $(".back").on("click", AddProject.prototype.BackToProject);
}

AddProject.prototype.CheckNull = function () {
    step = parseInt($(this).data("step"));
    var entry_name = $("#khmc").val();

    if ((!isEdit && step >= 1) || (isEdit && step == 1)) {
        if (entry_name == null || entry_name == undefined || $.trim(entry_name) == "") {
            layer.msg("客户名称不能为空");
            return false;
        }
    }


    if ((!isEdit && step > 1) || (isEdit && step == 2)) {
        var xmmc = $("#xmmc").val();
        if (xmmc == null || xmmc == undefined || $.trim(xmmc) == "") {
            layer.msg("项目名称不能为空");
            return false;
        }

        var province = $("#province").val();
        if (province == null || province == undefined || $.trim(province) == "") {
            layer.msg("项目所在省市不能为空");
            return false;
        }

        var city = $("#city").val();
        if (city == null || city == undefined || $.trim(city) == "") {
            layer.msg("项目所在省市不能为空");
            return false;
        }

        var xmdz = $("#xmdz").val();
        if (xmdz == null || xmdz == undefined || $.trim(xmdz) == "") {
            layer.msg("项目地址不能为空");
            return false;
        }

        var xmlx = $("#xmlx").val();
        if (xmlx == null || xmlx == undefined || $.trim(xmlx) == "") {
            layer.msg("项目类型不能为空");
            return false;
        }

        var xmgs = $("#xmgs").val();
        if (xmgs == null || xmgs == undefined || $.trim(xmgs) == "") {
            layer.msg("项目归属不能为空");
            return false;
        }
    }

    if ((!isEdit && step > 2) || (isEdit && step == 3)) {
        var ysjl = $("#ysjl").val();
        if (ysjl == null || ysjl == undefined || $.trim(ysjl) == "") {
            layer.msg("运输距离不能为空");
            return false;
        }

        var xmcgl = $("#xmcgl").val();
        if (xmcgl == null || xmcgl == undefined || $.trim(xmcgl) == "") {
            layer.msg("项目成功率不能为空");
            return false;
        }

        var sjgs = $("#sjgs").val();
        if (sjgs == null || sjgs == undefined || $.trim(sjgs) == "") {
            layer.msg("设计归属不能为空");
            return false;
        }

        var tdndrq = $("#tdndrq").val();
        if (tdndrq == null || tdndrq == undefined || $.trim(tdndrq) == "") {
            layer.msg("土地拿地日期不能为空");
            return false;
        }

        var yxjbl = $("#yxjbl").val();
        if (yxjbl == null || yxjbl == undefined || $.trim(yxjbl) == "") {
            layer.msg("异形件比例不能为空");
            return false;
        }
    }

    if ((!isEdit && step > 3) || (isEdit && step == 4)) {
        var yjkgsj = $("#yjkgsj").val();
        if (yjkgsj == null || yjkgsj == undefined || $.trim(yjkgsj) == "") {
            layer.msg("预计开工时间不能为空");
            return false;
        }

        var yjqyyf = $("#yjqyyf").val();
        if (yjqyyf == null || yjqyyf == undefined || $.trim(yjqyyf) == "") {
            layer.msg("预计签约月份不能为空");
            return false;
        }

        var cglx = $("#cglx").val();
        if (cglx == null || cglx == undefined || $.trim(cglx) == "") {
            layer.msg("采购类型不能为空");
            return false;
        }

        var khcbms = $("#khcbms").val();
        if (khcbms == null || khcbms == undefined || $.trim(khcbms) == "") {
            layer.msg("客户承包模式不能为空");
            return false;
        }

        var jfjd = $("#jfjd").val();
        if (jfjd == null || jfjd == undefined || $.trim(jfjd) == "") {
            layer.msg("甲方进度不能为空");
            return false;
        }

        var yzjyqksm = $("#yzjyqksm").val();
        if (yzjyqksm == null || yzjyqksm == undefined || $.trim(yzjyqksm) == "") {
            layer.msg("业主简要说明不能为空");
            return false;
        }

    }

    if ((!isEdit && step > 4) || (isEdit && step == 5)) {
        var xmlx = $("#xmlx").val();
        if (xmlx == "管廊") {
            var yjhte = $("#yjhte").val();
            if (yjhte == null || yjhte == undefined || $.trim(yjhte) == "") {
                layer.msg("预计PC合同额不能为空");
                return false;
            }

            var cd = $("#cd").val();
            if (cd == null || cd == undefined || $.trim(cd) == "") {
                layer.msg("长度不能为空");
                return false;
            }

            var cas = $("#cas").val();
            if (cas == null || cas == undefined || $.trim(cas) == "") {
                layer.msg("仓数不能为空");
                return false;
            }
        } else {
            var cplx = $("#cplx").val();
            if (cplx == null || cplx == undefined || $.trim(cplx) == "") {
                layer.msg("产品类型不能为空");
                return false;
            }

            var zghjzmj = $("#zghjzmj").val();
            if (zghjzmj == null || zghjzmj == undefined || $.trim(zghjzmj) == "") {
                layer.msg("总规划建筑面积不能为空");
                return false;
            }

            var zpjzmj = $("#zpjzmj").val();
            if (zpjzmj == null || zpjzmj == undefined || $.trim(zpjzmj) == "") {
                layer.msg("装配建筑面积不能为空");
                return false;
            }

            var yjhte = $("#yjhte").val();
            if (yjhte == null || yjhte == undefined || $.trim(yjhte) == "") {
                layer.msg("预计合同不能为空");
                return false;
            }

            var ds = $("#ds").val();
            if (ds == null || ds == undefined || $.trim(ds) == "") {
                layer.msg("栋数不能为空");
                return false;
            }

            var cs = $("#cs").val();
            if (cs == null || cs == undefined || $.trim(cs) == "") {
                layer.msg("层数不能为空");
                return false;
            }
        }
    }

    if ((!isEdit && step > 5) || (isEdit && step == 6)) {

    }

    if ((!isEdit && step > 6) || (isEdit && step == 7)) {
        var lxrxm = $("#lxrxm").val();
        if (lxrxm == null || lxrxm == undefined || $.trim(lxrxm) == "") {
            layer.msg("联系人姓名不能为空");
            return false;
        }

        var jaose = $("#jaose").val();
        if (jaose == null || jaose == undefined || $.trim(jaose) == "") {
            layer.msg("角色不能为空");
            return false;
        }
        if (!isEdit) {
            $(".next_step").off("click");//取消点击事件，防止多次保存
            AddProject.prototype.newProject();
        }

    }

    return true;
};

//加载客户  -- 查找客户框 搜索
AddProject.prototype.LoadCustomer = function (pageNum, pageSize, expressions) {
    var binding = Cookies.prototype.GetCookie('binding');
    var keyword = $("#keyWord").val();
    //var id = //Common.prototype.GetQueryString('id');
    currentExpressions = expressions;
    if (binding != null && keyword != null) {
        $.ajax({
            type: "get",
            dataType: "json",
            url: url,
            data: "serviceName=pageQueryWithRoleRight&objectApiName=Account&expressions=" + encodeURIComponent(expressions) + "&binding=" + binding + "&pageNUM=" + pageNum + "&pageSize=" + pageSize,
            success: function (data) {
                //加载客户名称
                if (data != "") {
                    if (data.result) {
                        if (data.data.length > 0) {
                            if (pageNum == 1) {
                                $("#customers").html("");
                            }
                            data.data.forEach(function (value, index) {
                                var account = value;
                                $("#customers").append("<li data-id='" + account.id + "'><span>" + account.name + "</span><div>" + account.accounttype + "</div></li>");
                            });
                            $(".CustomerList").find("li").on("click", AddProject.prototype.SelectCustomer);
                            currentPage = pageNum;
                        } else {
                            layer.msg("没有数据了！");
                        }
                        return;
                    } else {
                        layer.msg(data.returnInfo);
                    }
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                //debugger;
            }
        });
    }
};

//加载联系人  -- 查找联系人框 搜索
AddProject.prototype.LoadContacts = function (pageNum, pageSize, expressions) {
    var binding = Cookies.prototype.GetCookie('binding');
    // var keyword = $("#keyWord").val();
    //var id = //Common.prototype.GetQueryString('id');
    currentExpressions = expressions;
    if (binding != null) {
        $.ajax({
            type: "get",
            dataType: "json",
            url: url,
            data: "serviceName=pageQueryWithRoleRight&objectApiName=Contact&expressions=" + encodeURIComponent(expressions) + "&binding=" + binding + "&pageNUM=" + pageNum + "&pageSize=" + pageSize,
            success: function (data) {
                //加载联系人名称
                if (data != "") {
                    if (data.result) {
                        if (data.data.length > 0) {
                            if (pageNum == 1) {
                                $("#contacts").html("");
                            }
                            data.data.forEach(function (value, index) {
                                $("#contacts").append("<li data-id='" + value.id + "'><span>" + value.name + "</span><div>" + value.khmcccname + "</div><div>" + value.shouji + "</div></li>");
                            });
                            $(".ContactsList").find("li").on("click", AddProject.prototype.SelectContacts);
                            currentPage = pageNum;
                        } else {
                            layer.msg("没有数据了！");
                        }
                        return;
                    } else {
                        layer.msg(data.returnInfo);
                    }
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                //debugger;
            }
        });
    }
};

AddProject.prototype.search = function (pageNum, pageSize) {
    var expressions = "";
    var keyword = $("#keyWord").val();
    if (keyword != "") {
        expressions += "name like '%" + keyword + "%'"
    } else {
        expressions = "";
    }
    AddProject.prototype.LoadCustomer(pageNum, pageSize, expressions);
    return false;

}

AddProject.prototype.searchContacts = function (pageNum, pageSize) {
    var expressions = "";
    var keyword = $("#keyWordContacts").val();
    if (keyword != "") {
        expressions += "name like '%" + keyword + "%'"
    } else {
        expressions = "";
    }
    AddProject.prototype.LoadContacts(pageNum, pageSize, expressions);
    return false;

}

AddProject.prototype.ScrollToTop = function (obj) {
    $("." + obj).animate({
        scrollTop: 0
    }, 'slow');
}

var currentPage = 1;
var currentExpressions = "";

$(".CustomerList").scroll(function () {
    var scrollTop = $(this).scrollTop();
    var scrollHeight = $("#customers").height();
    if (scrollTop > 1500) {
        $("#goToTop").fadeIn("slow");
    } else {
        $("#goToTop").fadeOut("slow");
    }
    var windowHeight = $(this).height();
    var positionValue = (scrollTop + windowHeight) - scrollHeight;
    if (positionValue >= -1) {
        //执行ajax，获取数据
        AddProject.prototype.search(currentPage + 1, 15);
    }
});

$(".ContactsList").scroll(function () {
    var scrollTop = $(this).scrollTop();
    var scrollHeight = $("#contacts").height();
    if (scrollTop > 1500) {
        $("#ContactsGoToTop").fadeIn("slow");
    } else {
        $("#ContactsGoToTop").fadeOut("slow");
    }
    var windowHeight = $(this).height();
    var positionValue = (scrollTop + windowHeight) - scrollHeight;
    if (positionValue >= -1) {
        //执行ajax，获取数据
        AddProject.prototype.searchContacts(currentPage + 1, 15);
    }
});

AddProject.prototype.initData = function () {
    var binding = Cookies.prototype.GetCookie('binding');
    var id = Common.prototype.GetQueryString("id");
    if (varIsNull(id)) {
        return;
    } else {
        $("title").html("远大住工-编辑项目");
        $(".title_center").html("编辑项目");
        oldTitle = "编辑项目";
    }
    var expressions = "id = '" + id + "'";
    var params = "serviceName=cqueryWithRoleRight&objectApiName=xmbb&expressions=" + encodeURIComponent(expressions) + "&binding=" + binding + "&isAddDelete=" + false;

    var index = layer.load(1, {
        shade: false
    });
    $.ajax({
        type: "get",
        dataType: "json",
        url: url,
        data: params,
        success: function (data) {
            if (data != "") {
                if (data.result) {
                    if (data.data.length > 0) {
                        var pro = data.data[0];
                        $("#khmc").val(pro.khmcccname);
                        $("#khmcId").val(pro.khmc);
                        $("#kff").val(pro.kfsccname);
                        $("#kffId").val(pro.kfs);
                        $("#jzs").val(pro.jzsccname);
                        $("#jzsId").val(pro.jzs);
                        $("#sheji").val(pro.sjyccname);
                        $("#shejiId").val(pro.sjy);
                        $("#tjsj").val(pro.tjsj);
                        $("#bjxtj").val(pro.bjxtj == true ? "是" : "否");
                        $("#xmmc").val(pro.name);
                        $("#xmbh").val(pro.xmbh11);
                        $("#province").val(pro.szs);
                        $("#city").val(pro.szsjqy);
                        $("#xmdz").val(pro.xmdz);
                        $("#xmlx").val(pro.xmlx);
                        $("#xmgs").val(pro.xmgs);
                        $("#shengjgs").val(pro.sjgsg);
                        $("#ysjl").val(pro.ysjl);
                        $("#dqjd").val(pro.dqjd);
                        $("#xmcgl").val(pro.xmcgl);
                        $("#sjgs").val(pro.shsj);
                        $("#tdndrq").val(pro.yjtbsj);
                        $("#yxjbl").val(pro.yxjbl);
                        $("#yjkgsj").val(pro.yjkgsj);
                        $("#yjqyyf").val(pro.yjqyyf);
                        $("#cglx").val(pro.khcglx);
                        $("#khcbms").val(pro.cbms);
                        $("#jfjd").val(pro.jfjd);
                        $("#yzjyqksm").val(pro.yzjyqksm);
                        $("#cplx").val(pro.cplx);
                        $("#zghjzmj").val(pro.zpmj);
                        $("#zpjzmj").val(pro.mj);
                        $("#yjhte").val(pro.yjpchte);
                        $("#pcl").val(pro.pcmj);
                        $("#ds").val(pro.jzds);
                        $("#cs").val(pro.cs);
                        $("#cd").val(pro.cd);
                        $("#cangs").val(pro.cangs);
                        $("#beizhu").val(pro.bz);
                        $("#txcs").val(pro.txcs);

                        $(".add_step5").find(".none").removeClass("none");
                        if (pro.xmlx == "管廊") {
                            $(".li_cplx").addClass("none");
                            $(".li_zghjzmj").addClass("none");
                            $(".li_zpjzmj").addClass("none");
                            // $(".li_yjhte").addClass("none");
                            // $(".li_pcl").addClass("none");
                            $(".li_ds").addClass("none");
                            $(".li_cs").addClass("none");
                        } else {
                            $(".li_cd").addClass("none");
                            $(".li_cas").addClass("none");
                        }

                    }

                }
            }
            layer.close(index);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            //debugger;
            layer.close(index);
        }
    });
}

AddProject.prototype.newProject = function () {
    var data = "[{";
    var khmcId = $("#khmcId").val();
    data += "\"khmc\":\"" + khmcId + "\""; //客户Id
    var khmc = $("#khmc").val();
    data += ",\"khmcccname\":\"" + khmc + "\""; //客户名称
    var kff = $("#kff").val();
    data += ",\"kfsccname\":\"" + kff + "\""; //开发方
    var kffId = $("#kffId").val();
    data += ",\"kfs\":\"" + kffId + "\""; //开发方Id
    var jzs = $("#jzs").val();
    data += ",\"jzsccname\":\"" + jzs + "\""; //建筑商
    var jzsId = $("#jzsId").val();
    data += ",\"jzs\":\"" + jzsId + "\""; //建筑商Id
    var sheji = $("#sheji").val();
    data += ",\"sjyccname\":\"" + sheji + "\""; //设计院
    var shejiId = $("#shejiId").val();
    data += ",\"sjy\":\"" + shejiId + "\""; //设计院Id
    var xmmc = $("#xmmc").val();
    data += ",\"name\":\"" + xmmc + "\""; //项目名称
    var province = $("#province").val();
    data += ",\"szs\":\"" + province + "\""; //项目所在省
    var city = $("#city").val();
    data += ",\"szsjqy\":\"" + city + "\""; //项目所在市
    var xmdz = $("#xmdz").val();
    data += ",\"xmdz\":\"" + xmdz + "\""; //项目地址
    var xmlx = $("#xmlx").val();
    data += ",\"xmlx\":\"" + xmlx + "\""; //项目类型
    var xmgs = $("#xmgs").val();
    data += ",\"xmgs\":\"" + xmgs + "\""; //项目归属
    var ysjl = $("#ysjl").val();
    data += ",\"ysjl\":\"" + ysjl + "\""; //运输距离
    var xmcgl = $("#xmcgl").val();
    data += ",\"xmcgl\":\"" + xmcgl + "\""; //项目成功率
    var sjgs = $("#sjgs").val();
    data += ",\"shsj\":\"" + sjgs + "\""; //设计归属
    var tdndrq = $("#tdndrq").val();
    data += ",\"yjtbsj\":\"" + tdndrq + "\""; //土地拿地日期
    var yxjbl = $("#yxjbl").val();
    data += ",\"yxjbl\":\"" + yxjbl + "\""; //异形件比例
    var yjkgsj = $("#yjkgsj").val();
    data += ",\"yjkgsj\":\"" + yjkgsj + "\""; //预计开工时间
    var yjqyyf = $("#yjqyyf").val();
    data += ",\"yjqyyf\":\"" + yjqyyf + "\""; //预计签约月份
    var cglx = $("#cglx").val();
    data += ",\"khcglx\":\"" + cglx + "\""; //采购类型
    var khcbms = $("#khcbms").val();
    data += ",\"cbms\":\"" + khcbms + "\""; //客户承包模式
    var jfjd = $("#jfjd").val();
    data += ",\"jfjd\":\"" + jfjd + "\""; //甲方进度
    var scgc = $("#scgc").val();
    data += ",\"scgs\":\"" + scgc + "\""; //生产工厂
    var yzjyqksm = $("#yzjyqksm").val();
    data += ",\"yzjyqksm\":\"" + yzjyqksm + "\""; //业主情况简要说明
    var cplx = $("#cplx").val();
    data += ",\"cplx\":\"" + cplx + "\""; //产品类型
    var zghjzmj = $("#zghjzmj").val();
    data += ",\"zpmj\":\"" + zghjzmj + "\""; //总规划建筑面积
    var zpjzmj = $("#zpjzmj").val();
    data += ",\"mj\":\"" + zpjzmj + "\""; //装配建筑面积
    var yjhte = $("#yjhte").val();
    data += ",\"yjpchte\":\"" + yjhte + "\""; //预计pc合同金额
    var pcl = $("#pcl").val();
    data += ",\"pcmj\":\"" + pcl + "\""; //PC量
    var ds = $("#ds").val();
    data += ",\"jzds\":\"" + ds + "\""; //栋数
    var cs = $("#cs").val();
    data += ",\"cs\":\"" + cs + "\""; //层数
    var cd = $("#cd").val();
    data += ",\"cd\":\"" + cd + "\""; //长度
    var cas = $("#cas").val();
    data += ",\"cangs\":\"" + cas + "\""; //仓数
    var beizhu = $("#beizhu").val();
    data += ",\"bz\":\"" + beizhu + "\""; //备注
    // var txcs = $("#txcs").val();
    // data += ",\"txcs\":\"" + txcs + "\""; //提醒次数
    data += ",\"dqjd\":\"0-项目线索\""; //当前阶段
    data += "}]";

    var binding = Cookies.prototype.GetCookie('binding');
    if (binding != null) {
        $.ajax({
            type: "post",
            dataType: "json",
            url: url,
            data: "serviceName=insertWithRoleRight&objectApiName=xmbb&data=" + encodeURIComponent(data) + "&binding=" + binding,
            success: function (data) {
                //加载联系人名称
                if (data != "") {
                    if (data.result) {
                        layer.msg("项目保存成功");
                        var lxrxmId = $("#lxrxmId").val();
                        var jaose = $("#jaose").val();
                        var zylxr = ($("#zylxr").val() == "是" ? true : false);
                        var data_lxr = "[{";
                        data_lxr += "\"lxrxm\":\"" + lxrxmId + "\"";
                        data_lxr += ",\"js\":\"" + jaose + "\"";
                        data_lxr += ",\"sfzylxr\":\"" + zylxr + "\"";
                        data_lxr += ",\"glxm\":\"" + data.data.ids[0].id + "\"";
                        data_lxr += "}]";

                        $.ajax({
                            type: "post",
                            dataType: "json",
                            url: url,
                            data: "serviceName=insertWithRoleRight&objectApiName=lxrjs&data=" + encodeURIComponent(data_lxr) + "&binding=" + binding,
                            success: function (data) {
                                //加载联系人名称
                                if (data != "") {
                                    if (data.result) {
                                        layer.msg("联系人角色保存成功");
                                        return;
                                    } else {
                                        layer.msg(data.returnInfo);
                                    }
                                }
                            },
                            error: function (XMLHttpRequest, textStatus, errorThrown) {
                                //debugger;
                            }
                        });
                        return;
                    } else {
                        layer.msg(data.returnInfo);
                    }
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                //debugger;
            }
        });
    }

}

//保存项目（编辑用）
AddProject.prototype.SaveProject = function (stepNum) {
    var data = "[{";
    var id = Common.prototype.GetQueryString("id");
    data += "\"id\":\"" + id + "\""; //项目Id
    switch (stepNum + "") {
        case "1":
            {
                var khmcId = $("#khmcId").val();
                data += ",\"khmc\":\"" + khmcId + "\""; //客户Id
                var khmc = $("#khmc").val();
                data += ",\"khmcccname\":\"" + khmc + "\""; //客户名称
                var kff = $("#kff").val();
                data += ",\"kfsccname\":\"" + kff + "\""; //开发方
                var kffId = $("#kffId").val();
                data += ",\"kfs\":\"" + kffId + "\""; //开发方Id
                var jzs = $("#jzs").val();
                data += ",\"jzsccname\":\"" + jzs + "\""; //建筑商
                var jzsId = $("#jzsId").val();
                data += ",\"jzs\":\"" + jzsId + "\""; //建筑商Id
                var sheji = $("#sheji").val();
                data += ",\"sjyccname\":\"" + sheji + "\""; //设计院
                var shejiId = $("#shejiId").val();
                data += ",\"sjy\":\"" + shejiId + "\""; //设计院Id                
                break;
            }
        case "2":
            {
                var xmmc = $("#xmmc").val();
                data += ",\"name\":\"" + xmmc + "\""; //项目名称
                var province = $("#province").val();
                data += ",\"szs\":\"" + province + "\""; //项目所在省
                var city = $("#city").val();
                data += ",\"szsjqy\":\"" + city + "\""; //项目所在市
                var xmdz = $("#xmdz").val();
                data += ",\"xmdz\":\"" + xmdz + "\""; //项目地址
                var xmlx = $("#xmlx").val();
                data += ",\"xmlx\":\"" + xmlx + "\""; //项目类型
                var xmgs = $("#xmgs").val();
                data += ",\"xmgs\":\"" + xmgs + "\""; //项目归属
                break;
            }
        case "3":
            {
                var ysjl = $("#ysjl").val();
                data += ",\"ysjl\":\"" + ysjl + "\""; //运输距离
                var xmcgl = $("#xmcgl").val();
                data += ",\"xmcgl\":\"" + xmcgl + "\""; //项目成功率
                var sjgs = $("#sjgs").val();
                data += ",\"shsj\":\"" + sjgs + "\""; //设计归属
                var tdndrq = $("#tdndrq").val();
                data += ",\"yjtbsj\":\"" + tdndrq + "\""; //土地拿地日期
                var yxjbl = $("#yxjbl").val();
                data += ",\"yxjbl\":\"" + yxjbl + "\""; //异形件比例
                break;
            }
        case "4":
            {
                var yjkgsj = $("#yjkgsj").val();
                data += ",\"yjkgsj\":\"" + yjkgsj + "\""; //预计开工时间
                var yjqyyf = $("#yjqyyf").val();
                data += ",\"yjqyyf\":\"" + yjqyyf + "\""; //预计签约月份
                var cglx = $("#cglx").val();
                data += ",\"khcglx\":\"" + cglx + "\""; //采购类型
                var khcbms = $("#khcbms").val();
                data += ",\"cbms\":\"" + khcbms + "\""; //客户承包模式
                var jfjd = $("#jfjd").val();
                data += ",\"jfjd\":\"" + jfjd + "\""; //甲方进度
                var scgc = $("#scgc").val();
                data += ",\"scgs\":\"" + scgc + "\""; //生产工厂
                var yzjyqksm = $("#yzjyqksm").val();
                data += ",\"yzjyqksm\":\"" + yzjyqksm + "\""; //业主情况简要说明
                break;
            }
        case "5":
            {
                var cplx = $("#cplx").val();
                data += ",\"cplx\":\"" + cplx + "\""; //产品类型
                var zghjzmj = $("#zghjzmj").val();
                data += ",\"zpmj\":\"" + zghjzmj + "\""; //总规划建筑面积
                var zpjzmj = $("#zpjzmj").val();
                data += ",\"mj\":\"" + zpjzmj + "\""; //装配建筑面积
                var yjhte = $("#yjhte").val();
                data += ",\"yjpchte\":\"" + yjhte + "\""; //预计pc合同金额
                var pcl = $("#pcl").val();
                data += ",\"pcmj\":\"" + pcl + "\""; //PC量
                var ds = $("#ds").val();
                data += ",\"jzds\":\"" + ds + "\""; //栋数
                var cs = $("#cs").val();
                data += ",\"cs\":\"" + cs + "\""; //层数
                var cd = $("#cd").val();
                data += ",\"cd\":\"" + cd + "\""; //长度
                var cas = $("#cas").val();
                data += ",\"cangs\":\"" + cas + "\""; //仓数
                break;
            }
        case "6":
            {
                var beizhu = $("#beizhu").val();
                data += ",\"bz\":\"" + beizhu + "\""; //备注
                // var txcs = $("#txcs").val();
                // data += ",\"txcs\":\"" + txcs + "\""; //提醒次数
                break;
            }
        default:
            {
                break;
            }
    }

    data += ",\"txcs\":\"0\""; //提醒次数  暂用于项目更新提示，每次更新均置0，每次进入项目详情页则加1
    data += "}]";

    var binding = Cookies.prototype.GetCookie('binding');
    // return;
    if (binding != null) {
        $.ajax({
            type: "post",
            dataType: "json",
            url: url,
            data: "serviceName=updateWithRoleRight&objectApiName=xmbb&data=" + encodeURIComponent(data) + "&binding=" + binding,
            success: function (data) {
                //加载联系人名称
                if (data != "") {
                    if (data.result) {
                        layer.msg("项目保存成功", function () {
                            window.location.href = "/crm/project/projectDetail.html?id=" + id;
                        });
                        return;
                    } else {
                        layer.msg(data.returnInfo);
                    }
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                //debugger;
            }
        });
    }

}

window.addPro = new AddProject();

function setDistanct(value) {
    $("#ysjl").val(value);
}