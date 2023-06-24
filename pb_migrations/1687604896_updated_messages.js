migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("7mxw572yz0vi8a0")

  collection.listRule = "room.public = true || room.users.id ?= @request.auth.id  "
  collection.viewRule = "room.public = true || room.users.id ?= @request.auth.id"
  collection.createRule = "room.public = true ||room.users.id ?= @request.auth.id"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("7mxw572yz0vi8a0")

  collection.listRule = null
  collection.viewRule = null
  collection.createRule = null

  return dao.saveCollection(collection)
})
