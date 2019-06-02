# GDU 2019 encoding an integer list into a shorter string


def parameter_to_string(parameter_list, max_list):
    # Both parameter list and max list should be positive integers
    result = parameter_list[0]
    for i in range(1, len(max_list)):
        result = result * max_list[i] + parameter_list[i]
    result = base_encode(result)
    # string = number_to_stacking_string(parameter_list)
    # dec_num = base_decode(string, alphabet=alphabet_stacking)
    # result = base_encode(dec_num, alphabet=global_alphabet)
    return result


def string_backto_parameter(input_key, max_list):
    input_key = base_decode(input_key)
    result = max_list
    for i in range(len(max_list) - 1, 0, -1):
        input_key, result[i] = divmod(input_key, max_list[i])
    result[0] = input_key
    # dec_num = base_decode(input_key, alphabet=global_alphabet)
    # string = base_encode(dec_num, alphabet=alphabet_stacking)
    # result = stacking_string_to_number_list(string)
    return result

# global_alphabet =
# '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()-=+[]{}<>/?'
# abcdefghijklmnopqrstuvwxyz!@#$%^&*()-=+[]{}<>/?'
global_alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'
alphabet_stacking = '0123456789-/'


def number_to_stacking_string(input_list):
    # the input list should only be integers
    result = ''
    for i in input_list:
        result += str(i) + '/'
    return result[:-1]


def stacking_string_to_number_list(input_string):
    return [int(_) for _ in input_string.split('/')]


def base_encode(number, alphabet=global_alphabet):
    """Converts an integer to a base36 string."""
    if not isinstance(number, (int)):
        raise TypeError('number must be an integer')
    base36 = ''
    sign = ''
    if number < 0:
        sign = '-'
        number = -number
    if 0 <= number < len(alphabet):
        return sign + alphabet[number]
    while number != 0:
        number, i = divmod(number, len(alphabet))
        base36 = alphabet[i] + base36
    return sign + base36


def base_decode(number_string, alphabet=global_alphabet):
    result = 0
    number_string = number_string.upper()
    for i in range(len(number_string)):
        result += len(alphabet)**(len(number_string) - i - 1) * \
            alphabet.find(number_string[i])
    return result  # int(number, 36)


def main():
    print(base_encode(1412823931503067241))
    print(base_decode('AQF8AA0006EH'))
    max_list = [  # 20000,  # problem list max 20k
        2000,  # num min and max both have -1000 to 1000 range thus 0-1999
        2000,
        2000,
        2000,
        1000001,  # result max in 1M
        5,  # operator 1-4
        65535  # max of rand seed
    ]
    page_key = parameter_to_string([
        2 + 100, 100 + 999, 2 + 100,
        100 + 999, 1000, 1, 23423], max_list)
    print(page_key)
    print(string_backto_parameter(page_key, max_list))
    print(number_to_stacking_string(max_list))
    print(stacking_string_to_number_list(number_to_stacking_string(max_list)))
    print(string_backto_parameter('page_key@#$!@#!$', max_list))

if __name__ == "__main__":
    # execute only if run as a script
    main()
