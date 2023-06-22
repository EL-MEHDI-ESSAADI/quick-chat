migrate((db) => {
  const collection = new Collection({
    "id": "y2rx46k78anje84",
    "created": "2023-06-19 19:54:35.846Z",
    "updated": "2023-06-19 19:54:35.846Z",
    "name": "rooms",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "yzskbtj7",
        "name": "title",
        "type": "text",
        "required": true,
        "unique": false,
        "options": {
          "min": 2,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "o5ronijj",
        "name": "public",
        "type": "bool",
        "required": false,
        "unique": false,
        "options": {}
      },
      {
        "system": false,
        "id": "zdro4zz3",
        "name": "users",
        "type": "relation",
        "required": false,
        "unique": false,
        "options": {
          "collectionId": "_pb_users_auth_",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": null,
          "displayFields": []
        }
      }
    ],
    "indexes": [],
    "listRule": "users.id = @request.auth.id || public = true",
    "viewRule": "users.id = @request.auth.id || public = true",
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("y2rx46k78anje84");

  return dao.deleteCollection(collection);
})
