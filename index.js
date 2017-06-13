const
    {MongoClient} = require('mongodb'),
    url = 'mongodb://localhost:27017/potato'

MongoClient.connect(url, (err, db) => {
    //List a collection
    if(!err) {
        db.listCollections().toArray((err, items) => {
            if(!err) {
                console.log('****listing collections****')
                console.log(items)
                console.log('***************************')
            }
        })

        //Insert document, print out contents, remove item from collection, print out collection again
        const sandwiches = [
            {type: 'hotdog'},
            {type: 'hamburger'},
            {type: 'hogie'},
        ]
        db.collection('sandwiches').insertMany(sandwiches, (err, result) => {
            if(!err) {
                db.collection('sandwiches').find().toArray((err, sandwiches) => {
                    if(!err) {
                        console.log('****initial insert****')
                        console.log(sandwiches)
                        db.collection('sandwiches').deleteOne({type: 'hotdog'}, (err, result) => {
                            if(!err) {
                                db.collection('sandwiches').find().toArray((err, sandwiches) => {
                                    if(!err) {
                                        console.log('****After deletion****')
                                        console.log(sandwiches)
                                        console.log('**********************')
                                    }
                                    db.close()
                                })
                            } else {
                                db.close()
                            }
                        })
                    } else {
                        db.close()
                    }
                })
            } else {
                db.close()
            }
        })
    } else {
        db.close()
    }
})
