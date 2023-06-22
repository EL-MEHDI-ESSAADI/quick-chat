migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("y2rx46k78anje84")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "trbgqbfr",
    "name": "messages",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "7mxw572yz0vi8a0",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": null,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("y2rx46k78anje84")

  // remove
  collection.schema.removeField("trbgqbfr")

  return dao.saveCollection(collection)
})
