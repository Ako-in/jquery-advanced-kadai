$(function(){
  $('.button-more').on('mouseover',function(){
    $(this).animate({
      opacity:0.5,
      marginLeft:20,
    },100);
  });
  
  $('.button-more').on('mouseout',function(){
    $(this).animate({
      marginLeft:0,
      opacity:1.0,
    },100);
  })
});

// カルーセル
$('.carousel').slick({
  autoplay:true,
  dots:true,
  indinite:true,
  autoplaySpeed:5000,
  arrows:false,
});

// AjaxでStatic formsにデータ送信
$('#submit').on('click',function(event){
  // formタグによる送信拒否
  event.preventDefault();
  // 入力チェックをした後、エラーがあるかないか判定
  let result = inputCheck();

  // エラー判定とメッセージ取得
  let error = result.error;
  let message = result.message;

  // エラーがなかったらフォームを送信する
  if(error == false){
    // Ajaxでフォームを送信する
    $.ajax({
      url: 'https://api.staticforms.xyz/submit',
      type:'POST',
      dataType:'json',
      data:$('#form').serialize(),
      success:function(result){
        alert('お問い合わせを送信しました');
      },
      error:function(xhr, resp, text){
        alert('お問い合わせを送信できませんでした');
      }
    })
  }else{
    // エラーメッセージを表示する
    alert(message);
  }
});

// フォーカスが外れた時(=blurイベント)にフォームの入力をチェックする
$('#name').blur(function(){
  inputCheck();
});
$('#furigana').blur(function(){
  inputCheck();
});
$('#email').blur(function(){
  inputCheck();
});
$('#tel').blur(function(){
  inputCheck();
});
$('#message').blur(function(){
  inputCheck();
});

// 都道府県追加
$('#prefecture').blur(function(){
  inputCheck();
});
// 同意クリックイベント
$('#agree').click(function(){
  inputCheck();
});

// お問い合わせフォームの入力チェック
function inputCheck(){
  // エラーチェックの結果
  let result;

  // エラーメッセージテキスト
  let message = '';

  // エラーがない＝false, ある＝true
  let error = false;

  // 名前欄が空欄の時
  // 名前の入力チェック
  if($('#name').val()==''){
    // エラーがある時、フォームを赤にする
    $('#name').css('background-color','#f79999');
    error=true;
    //エラーが発生している宣言
    
    message+='お名前を入力してください。\n';
    console.log(message);
    //エラーメッセージを出力する
    } else {
    // エラーがない時
    console.log('エラーなし');
    $('#name').css('background-color','#fafafa');
  }
  
  // フリガナの入力チェック
  if($('#furigana').val()==''){
    $('#furigana').css('background-color','#f79999');
    error=true;
    message+='フリガナを入力してください\n';
  } else {
    $('#furigana').css('background-color','#fafafa');
  }
  // お問い合わせ内容の入力チェック
  if($('#message').val()==''){
    $('#message').css('background-color','#f79999');
    error=true;
    message+='お問い合わせ内容を入力してください\n';
    } else {
    $('#message').css('background-color','#fafafa');
  }
  // emailの入力チェック
  if($('#email').val()=='' || $('#email').val().indexOf('@')== -1 || $('#email').val().indexOf('.')==-1) {
    // @.が含まれないときはエラーと表示する
    $('#email').css('background-color','#f79999');
    error=true;
    message+='メールアドレスが未記入、または@.が含まれていません。\n';
    } else {
    $('#email').css('background-color','#fafafa');
  }
  // 電話番号の入力チェック
  if($('#tel').val()!='' && $('#tel').val().indexOf('-')==-1) {
    $('#tel').css('background-color','#f79999');
    error=true;
    message= message+'電話番号に「-」が含まれていません。\n';
    } else {
    $('#tel').css('background-color','#fafafa');
  } 

  //都道府県選択のチェックボックス
  if($('#prefecture').val()==''){
    $('#prefecture').css('background-color','#f79999');
    error=true;
    message+='都道府県を選択してください。\n';

  }else{
    $('#prefecture').css('background-color','#fafafa');
  }

  // 個人情報のチェックボックス
  if($('#agree').prop('checked')==false){
    error = true;
    message+='個人情報の取り扱いについてご同意いただける場合は、チェックボックスにチェックしてください。\n';
  }

  // エラーの有無で送信ボタンを切り替える
  // エラーの時は押せない
  // 全部入力しているときはボタンが押せる
  if(error == true){
    $('#submit').attr('src','images/button-submit.png');
  }else{
    $('#submit').attr('src','images/button-submit-blue.png')
  }
  // オブジェクトでエラー判定とメッセージを返す
  result = {
    error:error,
    message:message,
  }
  // 戻り値としてエラーがあるかどうか返す
  return result;
  
};
