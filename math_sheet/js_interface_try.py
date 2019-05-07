import sys
from math_gen import dispatch, html_output

problem_num = int(sys.argv[1])


# problem_list,answer_list=dispatch(10,
#              first_num_max,
#              second_num_max,
#              result_max,
#              first_num_min,
#              second_num_min,
#              operator,
#              problem_num,
#              "noone@gmx.com",
#              "on",
#              "on")
# problem_output,answer_output=html_output(problem_list, answer_list)

result = {
    'problem_list': problem_num,
    'answer_list': 'x2=%d' % problem_num * 2,
}

print("str(result)")
print("test")
sys.stdout.flush()
