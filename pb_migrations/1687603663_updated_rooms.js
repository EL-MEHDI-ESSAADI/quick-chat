migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("y2rx46k78anje84")

  collection.listRule = ""
  collection.viewRule = ""

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("y2rx46k78anje84")

  collection.listRule = null
  collection.viewRule = null

  return dao.saveCollection(collection)
})
