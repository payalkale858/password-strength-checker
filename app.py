from flask import Flask, render_template, request
#pip install flask
#flask is micro web fremwork an flask is very minimilstic you want light weight app or more controle on it and easy to learn
#no need any tool or lybrary is web framework are used to make webapplications in python and used to rander the html templates.
from zxcvbn import zxcvbn
import os
app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/check_password', methods=['POST'])
def check_password():
    password = request.form['password']
    strength = zxcvbn(password)
    
    feedback = strength['feedback']['suggestions']
    score = strength['score']  # Score: 0 (weak) to 4 (strong)

    if score == 0:
        strength_label = "Weak"
    elif score == 1:
        strength_label = "Medium"
    elif score == 2:
        strength_label = "Good"
    elif score == 3:
        strength_label = "Strong"
    else:
        strength_label = "Very Strong"
    
    return render_template('index.html', strength_label=strength_label, feedback=feedback)

if __name__ == "__main__":
    # app.run(debug=True, port=8080)
    port = int(os.environ.get("PORT", 10000))
    app.run(host="0.0.0.0", port=port)


