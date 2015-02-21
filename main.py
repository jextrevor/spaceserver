from flask import Flask,render_template,request,redirect,url_for
from flask.ext.socketio import SocketIO, emit, join_room, leave_room
import urllib
app = Flask(__name__)
socketio = SocketIO(app)
@app.route('/')
def home():
    templateData = {
        }
    return render_template('main.html', **templateData)
@app.errorhandler(404)
def page_not_found(error):
    templateData = {
        'error':"Page Not Found"
        }
    return render_template("error.html",**templateData)
@app.errorhandler(500)
def internalerror(error):
    templateData = {
        'error':"Server Error"
        }
    return render_template("error.html",**templateData)
@app.after_request
def no_cache(response):
    response.headers['X-UA-Compatible'] = 'IE=Edge,chrome=1'
    response.headers['Cache-Control'] = 'no-cache, no-store'
    response.headers['Pragma'] = 'no-cache'
    return response
if __name__ == '__main__':
    print "Server running"
    socketio.run(app, "0.0.0.0",80)