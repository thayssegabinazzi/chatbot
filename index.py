from flask import Flask, redirect, render_template, request, session, abort 

app = Flask(__name__)

@app.route("/")
def hello():
	return render_template('/public/index.html')

if __name__ == "__main__":
	app.run()

