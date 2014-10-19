exports.definition = {
	config: {
		columns: {
			"id": "INTEGER PRIMARY KEY AUTOINCREMENT",
		    "systemid": "TEXT",
		    "companyid": "TEXT",
		    "searchid": "TEXT",
		    "lastDT": "TEXT",
		    "ntype": "TEXT",
		    "tablefieldname": "TEXT",
		    "model": "TEXT",
		    "displayname":"TEXT",
		    "namevalue": "TEXT",
		    "dataType": "TEXT",
		    "stored": "TEXT",
		    "format": "TEXT"
		},
		adapter: {
			type: "sql",
			idAttribute: "id",
			collection_name: "commondata"
		}
	},
	extendModel: function(Model) {
		_.extend(Model.prototype, {
			// extended functions and properties go here
		});

		return Model;
	},
	extendCollection: function(Collection) {
		_.extend(Collection.prototype, {
			// extended functions and properties go here
		});

		return Collection;
	}
};