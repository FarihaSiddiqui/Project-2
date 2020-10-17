import numpy as np

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

from flask import Flask, jsonify
from flask_cors import CORS


engine = create_engine("postgres://zaduqyjf:EWKQdSG0Y6c1oin0T_bc6HaULsB8ODus@salt.db.elephantsql.com:5432/zaduqyjf")


Base = automap_base()

Base.prepare(engine, reflect=True)



canada_location = Base.classes.canada_location
canada_date = Base.classes.canada_date


app = Flask(__name__)
CORS(app)



@app.route("/")
def welcome():
    return ("/api/v1.0/location, /api/v1.0/date")

@app.route("/api/v1.0/location")
def locations():
    
    session = Session(engine)

    results = session.query(canada_location.Name, canada_location.Capacity, canada_location.Type, canada_location.lat, canada_location.lon, canada_location.Date).all()

    session.close()

    # all_locations = list(np.ravel(results))

    return jsonify(results)



@app.route("/api/v1.0/date")
def dates():

    session = Session(engine)

    results = session.query(canada_date.GEO, canada_date.Date, canada_date.Type, canada_date.VALUE).all()

    session.close()

    # all_dates = list(np.ravel(results))

    return jsonify(results)


if __name__ == '__main__':
    app.run(debug=True)
