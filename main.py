#!/usr/bin/python
import os

virtenv = os.path.join(os.environ.get('OPENSHIFT_PYTHON_DIR','.'), 'virtenv')
virtualenv = os.path.join(virtenv, 'bin/activate_this.py')
try:
    execfile(virtualenv, dict(__file__=virtualenv))
except IOError:
    pass
#
# IMPORTANT: Put any additional includes below this line.  If placed above this
# line, it's possible required libraries won't be in your searchable path
#
from flask import Flask,render_template,request,redirect,url_for
from flask.ext.socketio import SocketIO, emit, join_room, leave_room
import urllib
application = Flask(__name__)
socketio = SocketIO(application)
dictionary = {}
@socketio.on('connect', namespace="/commander")
def stationconnect():
    emit("update",dictionary)
@socketio.on('connect', namespace="/navigator")
def stationconnect():
    emit("update",dictionary)
@socketio.on('connect', namespace="/tactical")
def stationconnect():
    emit("update",dictionary)
@socketio.on('connect', namespace="/engineer")
def stationconnect():
    emit("update",dictionary)
@socketio.on('connect', namespace="/operations")
def stationconnect():
    emit("update",dictionary)
@socketio.on('connect', namespace="/mvs")
def stationconnect():
    emit("update",dictionary)
@socketio.on('connect', namespace="/fd")
def stationconnect():
    emit("update",dictionary)
@application.route('/')
def home():
    templateData = {
        }
    return render_template('main.html', **templateData)
@application.route("/commander/", methods=['POST'])
def commander():
	templateData = {
		'name':request.form.get("name")
	}
	return render_template("commander.html", **templateData)
@application.route("/navigator/", methods=['POST'])
def navigator():
	templateData = {
		'name':request.form.get("name")
	}
	return render_template("navigator.html", **templateData)
@application.route("/tactical/", methods=['POST'])
def tactical():
	templateData = {
		'name':request.form.get("name")
	}
	return render_template("tactical.html", **templateData)
@application.route("/operations/", methods=['POST'])
def operations():
	templateData = {
		'name':request.form.get("name")
	}
	return render_template("operations.html", **templateData)
@application.route("/engineer/", methods=['POST'])
def engineer():
	templateData = {
		'name':request.form.get("name")
	}
	return render_template("engineer.html", **templateData)
@application.route("/mvs/", methods=['POST'])
def mvs():
	templateData = {
		'name':request.form.get("name")
	}
	return render_template("mvs.html", **templateData)
@application.route("/fd/", methods=['POST'])
def fd():
	templateData = {
		'name':request.form.get("name")
	}
	return render_template("fd.html", **templateData)
@application.errorhandler(404)
def page_not_found(error):
    templateData = {
        'error':"Page Not Found"
        }
    return render_template("error.html",**templateData)
@application.errorhandler(500)
def internalerror(error):
    templateData = {
        'error':error
        }
    return render_template("error.html",**templateData)
@application.after_request
def no_cache(response):
    response.headers['X-UA-Compatible'] = 'IE=Edge,chrome=1'
    response.headers['Cache-Control'] = 'no-cache, no-store'
    response.headers['Pragma'] = 'no-cache'
    return response
if __name__ == '__main__':
    print "Server running"
    socketio.run(application, "0.0.0.0",8051)