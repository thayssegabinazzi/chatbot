from flask import Flask 

variavelweb = Flask(__name__)

@variavelweb.route("/")

def hello():
	return "hello world"

if __name__ == "__main__":
	variavelweb.run()

