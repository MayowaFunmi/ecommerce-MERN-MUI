"""
Input: "AkjhZ zLKIJz , 23y "
Output: "BlkiA aMLJKa , 23z "
print(ord("A")+1)
print(chr(77))
"""

def rotone(word):
    str = ""
    for i in word:
        if i.isspace():
            str += i
        if i.isupper() or i.islower():
            str += chr(ord(i)+1)
    return str

word = "AkjhZ zLKIJz , 23y "
print(rotone(word))