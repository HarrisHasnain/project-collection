/*
 * Harris Hasnain
 */

#include <stdio.h>
#include <string.h>
#include <ctype.h>
#define SIZE 100


int is_palindrome (const char *str);



void strip_out(char *str);



int main(void)
{
    
    char str[100];
    
    printf("Please give a word below to see if it is a palindrome:\n");
    
    scanf("%s", str);
    
    
    int p = 0;
            
    strip_out(str);
        
    p = is_palindrome(str);
        
    if(!p)
        printf("\n\"%s\" is not a palindrome.\n\n", str);
    else
        printf("\n\"%s\" is a palindrome.\n\n", str);
    
    return 0;
}

int is_palindrome (const char *str)
{
    
    int a;
    int str_len = 0;
    for (a = 0; str[a] != '\0'; a++)
    {
        str_len++;
    }
    
    int i;
    int j = 0;
    char reverse_str[100];
    for (i = (str_len - 1); i >= 0; i--)
    {
        reverse_str[j] = str[i];
        j++;
    }
    
    reverse_str[j] = '\0';
    
    
    if (strcmp(str, reverse_str) != 0)
    {
        return 0;
    }
    else
    {
        return 1;
    }

    return 0;
}



void strip_out(char *str)
{
    int i;
    int j = 0;
    char str_al[100];
    
    for (i = 0; str[i] != '\0'; i++)
    {
        if (isalnum(str[i]))
        {
            str_al[j] = str[i];
            j++;
        }
    }
    str_al[j] = '\0';
    
    strcpy(str, str_al);
    int k;
    for (k = 0; str[k] != '\0'; k++)
        str[k] = tolower(str[k]);
}

