migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("7mxw572yz0vi8a0")

  collection.createRule = "room.public = true || @request.auth.id = room.users.id"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("7mxw572yz0vi8a0")

  collection.createRule = null

  return dao.saveCollection(collection)
})
