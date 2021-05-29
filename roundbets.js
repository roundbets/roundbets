var bets_total = localStorage.getItem('bets_total') || 0;

$('#bets_total').text(bets_total);

$('#bet_form').on('submit', function(e) {  
  e.preventDefault();
  
  localStorage.setItem('bets_total', parseInt(bets_total) + 5)
  
  bet_results = $(this).serializeArray();
  bet_code_enc = [1, 0, 2, 2, 3, 0, 0, 3]
  bet_code = "";

  $.each(bet_results, function( key, value ) {
    bet_code = bet_code + (parseInt(value['value'] || 0) + bet_code_enc[key]);
  });
  
  alert('Seu código de aposta é ' + bet_code + '\nPara validar sua aposta, envie esse código para seu colaborador');
  location.reload();
});