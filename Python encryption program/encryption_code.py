# encryption.py
# Harris Hasnain


def appropriate_cipher(cipher_string):     #function that checks if the cipher is valid
    """Verifies that the cipher used to encode or decode the message is valid.
    In order for the cipher to be valid, it must have 26 unique alphanumeric characters.

    Paramaters:
    cipher_string -- the string of text that the user inputs as their cipher.

    Returns:
    Either true or false will be returned, after verifying whether or not the cipher is valid.
    True -- The cipher is valid and the program will proceed to the next stage.
    False -- The cipher is invalid and the program will restart from the beginning.

    """

    cipher_string_as_list = []     #converts the cipher from a string to a list

    for letter_or_num in cipher_string:
        cipher_string_as_list.append(letter_or_num)

    cipher_string_as_set = set(cipher_string_as_list)     #converts the cipher from a list to a set to remove duplicates

    if len(cipher_string_as_set) == 26 and cipher_string.isalnum() == True:     #verifies whether or not the cipher has 26 unique alphanumeric characters
        return True
    else:
        return False



def message_encoder(decoded_text_string, cipher_string):     #function to encode the input text with the input cipher
    """encodes the users alphabetical text string, with the provided alphanumeric cipher.
    The encoded text is then returned as a result.

    Parameters:
    decoded_text_string -- the string of text that the user inputs as the text they would like to be encoded.
    All characters in this text are in the alphabet.
    cipher_string -- the string of text that the user inputs as their cipher.
    The cipher contains 26 unique alphanumeric characters.

    Returns:
    The text that the user provided, after it has been encoded with their provided cipher.
    encoded_text_as_string -- the encoded text as a string, that is returned.
    All characters in the encoded text are alphanumeric.
    
    """

    cipher_list = list(cipher_string)     #turns the cipher from a string to a list

    cipher_list_norepeats = []     #removes duplicates from the cipher list while retaining order

    for letter_or_num in cipher_list:
        if letter_or_num not in cipher_list_norepeats:
            cipher_list_norepeats.append(letter_or_num)

    cipher_keys = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']     #list of keys for the cipher dictionary

    combined_lists = zip(cipher_keys, cipher_list_norepeats)     #combines the cipher keys and values

    cipher = dict(combined_lists)     #turns the combined cipher keys and values into a dictionary where the keys correspond to the values

    encoded_text_as_list = []     #turns the users input text string into an encoded text as a list, using the input cipher

    for letter in decoded_text_string:
        encoded_value = cipher[letter]
        encoded_text_as_list.append(encoded_value)
    
    encoded_text_as_string = ''.join(encoded_text_as_list)     #turns the encoded text as a list into a string

    return encoded_text_as_string     #returns the encoded text as a string as a result
    


def message_decoder(encoded_text_string, cipher_string):     #function to decode the input text with the input cipher
    """decodes the users alphanumeric text string, with the provided alphanumeric cipher.
    The decoded text is then returned as a result.

    Parameters:
    encoded_text_string -- the string of text that the user inputs as the text they would like to be decoded.
    All characters in this text are alphanumeric.
    cipher_string -- the string of text that the user inputs as their cipher.
    The cipher contains 26 unique alphanumeric characters.

    Returns:
    The text that the user provided, after it has been decoded with their provided cipher.
    decoded_text_as_string -- the decoded text as a string, that is returned.
    All characters in the decoded text are in the alphabet.
    
    """

    cipher_list = list(cipher_string)     #turns the cipher from a string to a list

    cipher_list_norepeats = []     #removes dupliactes from the cipher list while retaining order

    for letter_or_num in cipher_list:     
        if letter_or_num not in cipher_list_norepeats:
            cipher_list_norepeats.append(letter_or_num)

    cipher_values = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']    #list of values for the cipher dictionary

    combined_lists = zip(cipher_list_norepeats, cipher_values)     #combines the cipher keys and values

    cipher = dict(combined_lists)    #turns the combined cipher keys and values into a dictionary where the keys correspond to the values

    decoded_text_as_list = []    #turns the users input text string into a decoded text as a list, using the input cipher
    
    for letter_or_num in encoded_text_string:
        decoded_value = cipher[letter_or_num]
        decoded_text_as_list.append(decoded_value)
    
    decoded_text_as_string = ''.join(decoded_text_as_list)    #turns the decoded text as a list into a string

    return decoded_text_as_string    #returns the decoded text as a string as a result



print('\nWelcome to the Encryption Program!\n')
num_chosen = int(input('Select 1 to encode or 2 to decode your message, select 0 to quit: '))     #prompts the user to choose whether they want to encode, decode or quit
while num_chosen == 0 or num_chosen == 1 or num_chosen == 2:     #while loop ensures the program runs continuously until the user decides to quit, or enters an invalid number choice

    if num_chosen == 1:     #executes if the user wants to encode a message
        decoded_text = str(input('Please enter the decoded text to be encoded: '))   #prompts the user to enter the text they want to be encoded
        if decoded_text.isalpha() == True:     #verifies that the text to be encoded only contains characters from the alphabet
            cipher_input = str(input('Please enter the cipher text with 26 unique alphanumeric characters (a -> ?, b -> ? ... z -> ?): '))     #prompts the user to enter the cipher they want to encode their message with
            cipher_input = cipher_input.lower()     #converts all alphabetcal characters in the cipher to lowercase
            if appropriate_cipher(cipher_input) == True:     #verifies that the cipher is valid
                print('Your cipher is valid.')
                encoded_message = message_encoder(decoded_text, cipher_input)      #encodes the users input text with their input cipher
                print(f'Your encoded text is: {encoded_message}\n')    #outputs the encoded text as a string
            else:
                print ('Your cipher must contain 26 unique elements of a-z or 0-9. Please try again.\n')    #occurs if the cipher is invalid
        else:
            print('The decoded text must only contain characters from the alphabet. Please try again.\n')     #occurs if the text to be encoded is invalid
        num_chosen = int(input('Select 1 to encode or 2 to decode your message, select 0 to quit: '))     #takes the user back to the number selection, allowing the program to run continuously until the user decides to quit, or an invalid number is entered

    elif num_chosen == 2:     #executes if the user wants to decode a message
        encoded_text = str(input('Please enter the encoded text to be decoded: '))      #prompts the user to enter the text they want to be decoded
        if encoded_text.isalnum() == True:     #verifies that the text to be decoded is alphanumerical
            cipher_input = str(input('Please enter the cipher text with 26 unique alphanumeric characters (a -> ?, b -> ? ... z -> ?): '))     #prompts the user to enter the cipher they want to encode their message with
            cipher_input = cipher_input.lower()     #converts all alphabetical characters in the cipher to lowercase
            if appropriate_cipher(cipher_input) == True:     #verifies that the cipher is valid
                print('Your cipher is valid.')
                decoded_message = message_decoder(encoded_text, cipher_input)     #decodes the users input text with their input cipher
                print(f'Your decoded text is: {decoded_message}\n')     #outputs the decoded text as a string
            else:
                print ('Your cipher must contain 26 unique elements of a-z or 0-9. Please try again.\n')     #occurs if the cipher is invalid
        else:
            print('The encoded text must only contain alphanumeric characters. Please try again.\n')     #occurs if the text to be decoded is invalid
        num_chosen = int(input('Select 1 to encode or 2 to decode your message, select 0 to quit: '))     #takes the user back to the number selection, allowing the program to run continuously until the user decides to quit, or an invalid number is entered

    elif num_chosen == 0:      #executes if the user wants to quit the program
        print('Thank you for using the encryption program.\n')
        break     #causes the program to terminate

else:
    print('Invalid number chosen, please start again.\n')    #occurs if an invalid number is chosen by the user, causes the program to terminate