word = "google"
def detect_capital(param1):
    if param1.isupper() or param1.islower() or param1.istitle():
        return True
    return False

print(detect_capital(word))