# Wartungswelt.de

[wartungswelt.de](http://wartungswelt.de)





## API

### 1) Get Products by `technology` and `postalcode`

**type: GET**

```
/api/products/:technology/:brand/:postalcode
```

#### Example Response (Success):

```
[
    {
        _id: "56716943e9e0b5d35804d63a",
        company: "Santitär Tester",
        credits: 5,
        name: "Max",
        lastname: "Tester",
        email: "andy@ixis.io",
        phone: "+49 123 12223456",
        street: "Testerweg 7",
        postalcode: "50678",
        city: "Köln",
        postalcodeRange: [
            "50678",
            "50677"
        ],
        products: [{
            _id: "56716138e9e0b5d35804d634",
            id: "economy",
            price: {
                currency: "€",
                cent: "99",
                euro: 100
            },
            technology: "gas",
            brand: "vaillant"
        }]
    }
]
```

#### Example Response (Error):

```
{
    error: true,
    message: "Es wurden leider keine Ergebnisse für Ihren Postleitzahlenbereich gefunden."
}
```






### 2) Create Order (Customer)

**Hint**: Set `product_id` to `none`, to send order without any fixed price product

**type: POST**

```
/api/create/order/

// POST Data (JSON Format)

{
    "product_id": "56716138e9e0b5d35804d634",
    "dealer_id": "56716943e9e0b5d35804d63a",
    "customer": {
        "name": "Peter",
        "lastname": "Tester",
        "email": "kontakt@wartungswelt.de",
        "phone": "+49 123456789",
        "note": "Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum",
        "agb": true,
        "contact_permitted": true
    },
    "postalcode": "50678",
    "brand": "vaillant",
    "model": "ca 1234",
    "installationyear": 2001,
    "productdisplayname": "Premium",
    "productdisplaytechnology": "Ölheizung",
    "productdisplaybrand": "Vaillant"
}
```

#### Example Response (Success):

```
{
  "error": false,
  "message": "Order successful!"
}
```

#### Example Response (Error AGBs or contact_permitted checkbox not enabled):

```
{
  "error": true,
  "message": "Sie müssen unsere AGBs akzeptieren und uns die Möglichkeit geben Sie zu kontaktieren."
}
```

#### Example Response (Error `agb` or `contact_permitted checkbox not enabled):

```
{
  "error": true,
  "message": "Es ist ein unbekannter Fehler aufgetreten. Bitte versuchen Sie es erneut."
}
```






### 3) Create Dealer (Dealer)

**type: POST**

```
/api/create/dealer/

// POST Data (JSON Format)

{
    "dealer": {
        "company": "Sanitär Tester",
        "name": "Max",
        "lastname": "Tester",
        "email": "kontakt@wartungswelt.de",
        "phone": "+49 123456789",
        "street": "Street 1",
        "postalcode": "50678",
        "city": "Cologne",
        "radius": 30,
        "description": "30"
    },
    "products": [{
        "brand": "vaillant",
        "technology": "gas",
        "displayname": "Premium",
        "displaytechnology": "Ölheizung",
        "displaybrand": "Vaillant"
        "id": "economy",
        "price": {
            "euro": "100",
            "cent": "99",
            "currency": "€"
        }
    }, {
        "brand": "vaillant",
        "technology": "gas",
        "displayname": "Premium",
        "displaytechnology": "Ölheizung",
        "displaybrand": "Vaillant"
        "id": "standard",
        "price": {
            "euro": "150",
            "cent": "99",
            "currency": "€"
        }
    }, {
        "brand": "vaillant",
        "technology": "gas",
        "displayname": "Premium",
        "displaytechnology": "Ölheizung",
        "displaybrand": "Vaillant"
        "id": "premium",
        "price": {
            "euro": "250",
            "cent": "99",
            "currency": "€"
        }
    }, {
        "brand": "vaillant",
        "technology": "oel",
        "displayname": "Premium",
        "displaytechnology": "Ölheizung",
        "displaybrand": "Vaillant"
        "id": "economy",
        "price": {
            "euro": "120",
            "cent": "99",
            "currency": "€"
        }
    }]
}
```

#### Example Response (Success):

```
{
  "error": false,
  "message": "Ihre Registrierung war erfolgreich"
}
```

#### Example Response (Error duplicate Account):

```
{
  "error": true,
  "message": "Sie haben bereits einen Account mit Ihre Email-Adresse test@test.de."
}
```

#### Example Response (Unknown Error):

```
{
  "error": true,
  "message": "Es ist ein unbekannter Fehler aufgetreten. Bitte versuchen Sie es erneut."
}
```






## MongoDB Database

__Local Mongo Database__

Install MongoDB on your local machine by following this [guide](https://docs.mongodb.org/v3.0/tutorial/install-mongodb-on-os-x/).

### Start MongoDB locally

```
$ sudo mongod
```

Logs are available under: `/usr/local/var/log/mongodb/mongo.log`.

```
$ tail -f /usr/local/var/log/mongodb/mongo.log
```

Hint: Use [Robomongo](http://robomongo.org/) for local database management

## Create a Database

Right click `Localhost` in Robomongo and choose `Create Database`. Name it `wartungswelt-db`.

## Insert Database-Testdata:

```
// Products
db.products.insert({
        name: 'Premium',
        services: [
            'Invidunt ut labore et dolore magna aliquyam erat',
            'Lorem ipsum'
        ],
        price: {
            euro: "250",
            cent: "99",
            currency: '€'
        },
        technology: 'gas'
});

db.products.insert({
        name: 'Premium',
        services: [
            'Invidunt ut labore et dolore magna aliquyam erat',
            'Lorem ipsum'
        ],
        price: {
            euro: "250",
            cent: "99",
            currency: '€'
        },
        technology: 'gas'
});


```


## Heroku

### Sandbox

* URL: [wartungswelt.herokuapp.com](https://wartungswelt.herokuapp.com/)
* User: `vgoa`
* Pass: `vg04`

### Deployment

`git push heroku master`

### Change Environment Variables

`heroku config:set NODE_ENV=production`

### Heroku MongoLabs

* Database: __heroku_j27b3sn9__
* Auth: __db.addUser('​root','jonvecaz')__

Logging: `heroku logs --tail`
