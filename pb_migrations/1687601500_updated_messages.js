migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("7mxw572yz0vi8a0")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ysknvcpr",
    "name": "user",
    "type": "relation",
    "required": true,
    "unique": false,
    "options": {
      "collectionId": "_pb_users_auth_",
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
    "id": "ysknvcpr",
    "name": "user",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "_pb_users_auth_",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
})
