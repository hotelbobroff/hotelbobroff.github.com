var image_dir = "assets/img/";
var image_dir_banya = image_dir + "banya/";
var image_dir_bath = image_dir + "bath/";
var image_dir_bed = image_dir + "bed/";

var index_image_url_array = [
    image_dir + "/interior/entry1.jpg",
    image_dir + "/interior/entry2.jpg",
    image_dir + "/interior/dining1.jpg",
    image_dir + "/interior/dining2.jpg",
    image_dir + "/interior/dining3.jpg"
];

var image_banya_array = [
    image_dir_banya + "1.jpg",
    image_dir_banya + "2.jpg",
    image_dir_banya + "3.jpg",
    image_dir_banya + "4.jpg"
];
var image_bath_array = [
    image_dir_bath + "1.jpg",
    image_dir_bath + "2.jpg",
    image_dir_bath + "3.jpg"
];
var image_bed_array = [
    image_dir_bed + "1.jpg",
    image_dir_bed + "2.jpg",
    image_dir_bed + "3.jpg",
    image_dir_bed + "4.jpg"
];

// todo: button-ratio images
var loopspeed = 10000;
var coverSizeMult = 0.5;
$(document).foundation()

function make_image_div(x, div_class){ return( "<div class='" + div_class + "'><img src='" + x + "'/></div>" + x ) }
function set_h(selector, size){ $(selector).css("height", size) };
function set_w(selector, size){ $(selector).css("width", size) };

var waitUntilDone = (function(){
    var timer = {};
    return function (cb, ms, uniq_fid){
        if (!uniq_fid){ uniq_fid = 'default'}
        if (timer[uniq_fid]){ clearTimeout(timer[uniq_fid]); }
        timer[uniq_fid] = setTimeout(cb, ms);
    }
})();

function create_standard_slick(target_div, image_array){

    $(target_div).slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows:true,
        dots:false,
        draggable:true,
        swipeToSlide: true,
        autoplay: true,
        autoplaySpeed: loopspeed,
        pauseOnHover: true,
        infinite: true,
        fade: true,
        cssEase: "linear",
        //transition speed between slides
        speed: loopspeed / 100,
    });

    image_array.map(function(x){
        $(target_div).slick("slickAdd", make_image_div(x, target_div + "-img"))
    });

}

$(document).on("ready", function(){

    if ( $("#sentinel_index_page").length ) {

        $(".slider-for").slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows:true,
            dots:false,
            draggable:true,
            swipeToSlide: true,
            autoplay: true,
            autoplaySpeed: loopspeed,
            pauseOnHover: true,
            infinite: true,
            fade: true,
            cssEase: "linear",
            //transition speed between slides
            speed: loopspeed / 100,
        });

        index_image_url_array.map(function(x){
            $(".slider-for").slick("slickAdd", make_image_div(x, "index-gallery-img"))
        });

        // left/right mouse arrows to round out mouse&finger drag
        var $index_img_carousel = $(".slider-for");
        $(document).on("keydown", function(e) {
            if(e.keyCode == 37) {
                $index_img_carousel.slick("slickPrev");
            }
            if(e.keyCode == 39) {
                $index_img_carousel.slick("slickNext");
            }
        });

        /* initial set to window scale */
        set_w("#yandex_map", $(window).innerWidth());

        /* subsequent with delay to wait for resize to finish */
        $(window).resize(function(){
            waitUntilDone(function(){ set_w("#yandex_map", $(window).innerWidth()); }, 50, 'ymap')
        });

    }

    if ( $("#sentinel_gallery_page").length ){
        create_standard_slick(".slider-for-banya", image_banya_array);
        create_standard_slick(".slider-for-bath", image_bath_array);
        create_standard_slick(".slider-for-bed", image_bed_array);
    }

});

