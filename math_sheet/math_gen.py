# Copyright 2017 Garry Du

#import argparse
#import glob
#import os
# import output
# from press_any_key import press_any_key_to_continue
from int_gen import two_number_operation


def html_output(problem_list, answer_list):
    problem_output = ('<style type="text/css">' +
                      'table {table-layout: auto;border-collapse: collapse;width: 100%;}' +
                      'table td {border: 0px solid #ccc;}table .absorbing-column {' +
                      'width: 100%;}</style><table BORDERCOLOR=white><tr>')
    answer_output = problem_output
    counter = 0
    for problem, answer in zip(problem_list, answer_list):
        problem_output += '<td>' + problem + '</td>'
        answer_output += '<td>' + answer + '</td>'
        counter += 1
        if (counter % 5) == 0:
            problem_output += "</tr><tr><td><br></td></tr><tr>"
            answer_output += "</tr><tr><td><br></td></tr><tr>"
    problem_output += "  </tr></table>"
    answer_output += "  </tr></table>"
    return problem_output, answer_output


def dispatch(time_length,
             first_num_max,
             second_num_max,
             result_max,
             first_num_min,
             second_num_min,
             operator,
             problem_num,
             email_addr,
             no_one,
             html_file):
    ###### input validation ########
    if not (0 < time_length <= 1000):
        print "Expect time within 1 to 1000 minutes. Set time to 10 min."
        press_any_key_to_continue()
        time_length = 10
    if not (0 < first_num_max <= 1e8):
        print "Digits of a number is expected between 1 and 1E8. Set to 100."
        press_any_key_to_continue()
        first_num_max = 100
    if not (0 < second_num_max <= 1e8):
        print "Digits of a number is expected between 1 and 1E8. Set to 100."
        press_any_key_to_continue()
        second_num_max = 100
    if (result_max == 0):
        result_max = first_num_max * second_num_max
    if not (0 < result_max <= 2e8):
        result_max == 2e8
    operator_in_number = 1  # 1 is add
    #  print operator
    if (operator == "s"):
        operator_in_number = 2  # 2 is sub
    elif (operator == "m"):
        operator_in_number = 3  # 3 is mul
    elif (operator == "d"):
        operator_in_number = 4  # 4 is div
    if not (0 < problem_num <= 200):
        print "We usually give at least one problem or no more than 200... Set to 10."
        press_any_key_to_continue()
        problem_num = 10
    if no_one == "on":
        no_one = True
    else:
        no_one = False
    if html_file == "on":
        html_file = True
    else:
        html_file = False

    ##### Generate problems. #####
    problem_list, answer_list = two_number_operation(
        first_num_max, second_num_max, result_max,
        first_num_min, second_num_min, operator_in_number, problem_num, no_one)
    return problem_list, answer_list
    # problem and answer should be lists of strings

    ##### Output answer and problems #####
    # if html_file: # if output HTML
    #     output.html_file(problem_list,answer_list)
    # else:
    #     output.output(problem_list, answer_list, time_length, email_addr)


# if __name__ == "__main__":
#     parser = argparse.ArgumentParser()
#     parser.add_argument('--time-length',
#                         required=False,
#                         type=int,
#                         default=5,
#                         help='How many minutes to finish the problem set. After that an email reminder will be sent.')
#     parser.add_argument('--first-num-max',
#                         required=True,
#                         type=int,
#                         help='The max value the first number is smaller or equal to.')
#     parser.add_argument('--second-num-max',
#                         required=True,
#                         type=int,
#                         help='The max value the second nubmer is smaller or equal to.')
#     parser.add_argument('--result-max',
#                         required=False,
#                         type=int,
#                         default=0,
#                         help='The max value the answer is smaller or equal to.')
#     parser.add_argument('--first-num-min',
#                         required=False,
#                         type=int,
#                         default=2,
#                         help='The min value the first number is larger or equal to.')
#     parser.add_argument('--second-num-min',
#                         required=False,
#                         type=int,
#                         default=2,
#                         help='The min value the second nubmer is larger or equal to.')
#     parser.add_argument('--operator',
#                         type=str,
#                         default='a',
#                         help="The operator in the middle. Can be a, s, m, and d.")
#     parser.add_argument('--problem-num',
#                         type=int,
#                         default=10,
#                         help='The number of problems to generate.')
#     parser.add_argument('--email-addr',
#                         type=str,
#                         default="gdu@gmx.us",
#                         help='The Email address to receive ansers and reminders.')
#     parser.add_argument('--no-one',
#                         type=str,
#                         default="on",
#                         help='If division and multiple has one, like 3x1 or 45/1. Default is on.')
#     parser.add_argument('--html-file',
#                         type=str,
#                         default="off",
# help='Print the output quesitons and answers to html files. Default is
# off.')

#     parse_args, unknown = parser.parse_known_args()
#     dispatch(**parse_args.__dict__)
