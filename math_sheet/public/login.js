localStorage.setItem("stage", "login");

var socket = io();
var problem_num = document.getElementById('problem_num'),
    first_num_max = document.getElementById('first_num_max'),
    first_num_min = document.getElementById('first_num_min'),
    second_num_max = document.getElementById('second_num_max'),
    second_num_min = document.getElementById('second_num_min'),
    operator = document.getElementById('operator'),
    generate = document.getElementById('generate'),
    result_max = document.getElementById('result_max');

generate.addEventListener('click', function() {
  problem_num=get_number(problem_num.value,100);
  first_num_min=get_number(first_num_min.value,2);
  first_num_max=get_number(first_num_max.value,100);
  second_num_min=get_number(second_num_min.value,2);
  second_num_max=get_number(second_num_max.value,100);
  result_max=get_number(result_max.value,10000);
  socket.emit("gen",
    problem_num,first_num_min,first_num_max,second_num_min,second_num_max,result_max,
    operator.value,
    function(result){
      if (result['done']==true){
        go_next(result['problem_list'],result['answer_list']);
      }
    }
    );
});

function go_next(problem_list,answer_list) {
  localStorage.setItem("problem_list",problem_list);
  localStorage.setItem("answer_list",answer_list);
  window.location.href = "chat.html";
}

function get_number(text,system_default=10,radix=10){
  result=parseInt(text, radix);
  if (result==NaN){
    result=system_default;
  }
  return result;
}