var db = openDatabase('roundbets_db', '1.0', 'bets database', 1024 * 1024);

db.transaction(function (tr) {
  // tr.executeSql('DROP TABLE IF EXISTS bets');
  tr.executeSql('CREATE TABLE IF NOT EXISTS bets (code VARCHAR)');
  tr.executeSql('SELECT COUNT(*) total FROM bets', [], function(tx, r) {
    $('#bets_total').text(r.rows.item(0).total * 5)
  });
});

$('#bet_form').on('submit', function(e) {  
  e.preventDefault();
  
  localStorage.setItem('bets_total', parseInt(bets_total) + 5)
  
  var bet_results = $(this).serializeArray(),
      bet_code_enc = [1, 0, 2, 2, 3, 0, 0, 3],
      bet_code = "";

  $.each(bet_results, function( key, value ) {
    bet_code = bet_code + (parseInt(value['value'] || 0) + bet_code_enc[key]);
  });

  db.transaction(function (tr) {
    tr.executeSql('INSERT INTO bets (code) VALUES (?)', [bet_code]);
  });
  
  alert('Seu código de aposta é ' + bet_code + '\nPara validar sua aposta, envie esse código para seu colaborador');
  location.reload();
});