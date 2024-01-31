"""Flask app for sharebandb backend"""

import os
from dotenv import load_dotenv

from flask import Flask, request, jsonify
from flask_debugtoolbar import DebugToolbarExtension
from models import db, connect_db, Listing

load_dotenv()

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = os.environ['DATABASE_URL']
app.config['SQLALCHEMY_ECHO'] = False
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False
app.config['SECRET_KEY'] = os.environ['SECRET_KEY']
toolbar = DebugToolbarExtension(app)

connect_db(app)

################################################################################


@app.get('/listings')
def get_listings():
    """Makes a request to database for details about all listings
        Takes a query parameter 'search' to search for listings that fit that
        criteria
        Returns [ {id, name, description, price},... ]
    """
    searchParams = request.args.get('search')
    if not searchParams:
        listings = Listing.query.all()
    else:
        listings = Listing.query.filter(
            Listing.name.like(f"%{searchParams}%")).all()
    serializedListings = [item.serialize() for item in listings]
    return jsonify(serializedListings)

@app.get('/listings/<int:listing_id>')
def get_listing(listing_id):
    """Makes a request to database for details about a certain listing
        Returns
        {
            id,
            name,
            description,
            price,
            photos:
            [{
                id,
                description,
                aws_url
            }]
        }
    """
    listing = Listing.query.get_or_404(listing_id)
    return jsonify(listing)



@app.post('/listings/new')
def add_listing():
    """Add a new listing to database
    Input
        {
            name,
            address,
            description,
            price,
            photos: [
                {
                    source,
                    description,
                }
            ]
        }

    Return
    {
        name,
        description,
        price,
        photos: [URL locations]
    }
    """

    listing = request.json
    print("received request. Listing:", listing)

    Listing.add_listing(
        name=listing["name"],
        address=listing["address"],
        description=listing["description"],
        price=listing["price"],
        photos=listing["photos"],
    )

    db.session.commit()

    # change to return actual result
    return jsonify({"result": "added"})



