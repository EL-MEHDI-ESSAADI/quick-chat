migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("y2rx46k78anje84")

  collection.listRule = "users.id = @request.auth.id || public = true"
  collection.viewRule = "users.id = @request.auth.id || public = true"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("y2rx46k78anje84")

  collection.listRule = null
  collection.viewRule = null

  return dao.saveCollection(collection)
})
