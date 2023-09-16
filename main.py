from flask import Flask,render_template,request,send_file
from flask_socketio import SocketIO, emit
import os
app = Flask(__name__)
socketio = SocketIO(app, cors_allowed_origins=[os.environ["BASE_URL"]])
dictionary = {}
def emittoallstations(event,data):
	socketio.emit(event,data, namespace="/commander")
	socketio.emit(event,data, namespace="/navigator")
	socketio.emit(event,data, namespace="/tactical")
	socketio.emit(event,data, namespace="/engineer")
	socketio.emit(event,data, namespace="/operations")
	socketio.emit(event,data, namespace="/mvs")
	socketio.emit(event,data, namespace="/fd")
@socketio.on('broadcast', namespace="/commander")
def broadcast(json):
	for key,value in json.items():
		emittoallstations(key,value)
@socketio.on('broadcast', namespace="/navigator")
def broadcast(json):
	for key,value in json.items():
		emittoallstations(key,value)
@socketio.on('broadcast', namespace="/tactical")
def broadcast(json):
	for key,value in json.items():
		emittoallstations(key,value)
@socketio.on('broadcast', namespace="/operations")
def broadcast(json):
	for key,value in json.items():
		emittoallstations(key,value)
@socketio.on('broadcast', namespace="/engineer")
def broadcast(json):
	for key,value in json.items():
		emittoallstations(key,value)
@socketio.on('broadcast', namespace="/mvs")
def broadcast(json):
	for key,value in json.items():
		emittoallstations(key,value)
@socketio.on('broadcast', namespace="/fd")
def broadcast(json):
	for key,value in json.items():
		emittoallstations(key,value)
@socketio.on('update', namespace="/commander")
def update(json):
	for key,value in json.items():
		dictionary[key] = value
	emittoallstations("update",json)
@socketio.on('update', namespace="/navigator")
def update(json):
	for key,value in json.items():
		dictionary[key] = value
	emittoallstations("update",json)
@socketio.on('update', namespace="/tactical")
def update(json):
	for key,value in json.items():
		dictionary[key] = value
	emittoallstations("update",json)
@socketio.on('update', namespace="/operations")
def update(json):
	for key,value in json.items():
		dictionary[key] = value
	emittoallstations("update",json)
@socketio.on('update', namespace="/engineer")
def update(json):
	for key,value in json.items():
		dictionary[key] = value
	emittoallstations("update",json)
@socketio.on('update', namespace="/mvs")
def update(json):
	for key,value in json.items():
		dictionary[key] = value
	emittoallstations("update",json)
@socketio.on('update', namespace="/fd")
def update(json):
	for key,value in json.items():
		dictionary[key] = value
	emittoallstations("update",json)
@socketio.on('reset', namespace="/fd")
def reset(json):
	for key,value in dictionary.items():
		dictionary[key] = ""
	emittoallstations("update",dictionary)
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
@app.route('/')
def home():
    templateData = {
        }
    return render_template('main.html', **templateData)
@app.route("/robots.txt")
def verify():
	return send_file("robots.txt")
@app.route("/commander/")
def commander():
	templateData = {
	}
	return render_template("commander.html", **templateData)
@app.route("/navigator/")
def navigator():
	templateData = {
	}
	return render_template("navigator.html", **templateData)
@app.route("/tactical/")
def tactical():
	templateData = {
	}
	return render_template("tactical.html", **templateData)
@app.route("/operations/")
def operations():
	templateData = {
		
	}
	return render_template("operations.html", **templateData)
@app.route("/engineer/")
def engineer():
	templateData = {
		
	}
	return render_template("engineer.html", **templateData)
@app.route("/mvs/")
def mvs():
	templateData = {
		
	}
	return render_template("mvs.html", **templateData)
@app.route("/fd/", methods=['POST'])
def fd():
	password = request.form['pass']
	if password != os.environ['PASSWORD']:
		return "<h1>Access denied. Please contact the admin for the password.</h1>"
	templateData = {

	}
	return render_template("fd.html", **templateData)
@app.errorhandler(404)
def page_not_found(error):
    templateData = {
        'error':"Page Not Found"
        }
    return render_template("error.html",**templateData)
@app.errorhandler(500)
def internalerror(error):
    templateData = {
        'error':error
        }
    return render_template("error.html",**templateData)
if __name__ == '__main__':
    print("Server running")
    if 'PORT' in os.environ:
      socketio.run(app, "0.0.0.0",int(os.environ['PORT']))
    else:
      socketio.run(app, "0.0.0.0", 3000)
