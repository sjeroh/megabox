let $select = {
  body: $('body'),
  overlay: $('#blackout'),
  modal: $('#trailerModal'),
  showButton: $('#showTrailer'),
  hideButton: $('#hideTrailer'),

}

let play = {
  obj: null,
  query: {
    autoplay: 1,
    controls: 0,
    iv_load_policy: 3,
  },
};

// $select.showButton.click(()=>{
//   showPlayer()
// });
$select.showButton.click(showPlayer);
$select.hideButton.click(hidePlayer);
// $select.hideButton.click(() => {
//   hidePlayer();
//   play.obj.stopVideo();
//   $select.overlay.hide();
// });

function setPlayer(id) {
  play.obj = new YT.Player('trailer', {
    //#trailer를 불러서 사용할거야.
    // height: '360',
    // width: '640', 
    // -> 이놈들은 직접 쓸거야
    videoId: id, //매개변수로 받아올거야. 밑에 showplayer안에 있는놈
    playerVars: play.query,

  });
  resizePlayer();

    //리사이즈,화면 회전되거나 화면의 사이즈를 바꿀때 다시 설정
  $(window).on('resize orientationchange', function () {
    resizePlayer();
  })
   
}

function resizePlayer() {
  let viewport_w = $(window).width(); // 현재화면의 넓이
  let viewport_h = $(window).height();

  let frame_w = viewport_w; //16
  let frame_h = viewport_w / 1.6; //10 
  // 16의 넓이 일때 10이 되게..? 높이가..?

  let modal_t=(viewport_h - frame_h) / 2 + 'px';
  let modal_l = 0;

  $select.modal.css({top:modal_t, left:modal_l});
  play.obj.setSize(frame_w, frame_h);


}


function showPlayer() {
  // console.log($select.showButton.data('youtube'))
  if (!play.obj) {
    setPlayer($select.showButton.data('youtube'));
  }
  $select.overlay.show();

}

function hidePlayer() {
  play.obj.stopVideo();
  $select.overlay.hide();
}

// function stopVideo() {
//   play.obj.stopVideo();
//   $select.overlay.hide();
// }