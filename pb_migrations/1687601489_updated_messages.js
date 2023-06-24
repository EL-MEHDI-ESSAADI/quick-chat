migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("7mxw572yz0vi8a0")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "s2vt5qmm",
    "name": "room",
    "type": "relation",
    "required": true,
    "unique": false,
    "options": {
      "collectionId": "y2rx46k78anje84",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("7mxw572yz0vi8a0")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "s2vt5qmm",
    "name": "room",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "y2rx46k78anje84",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
})
