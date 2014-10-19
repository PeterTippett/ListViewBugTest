var commondata = Alloy.Collections.commondata;

var company = "a74a33a2-7ae4-4c05-b704-099c08fce51e";

var query = 'SELECT * FROM commondata WHERE ntype = \'Invite\' AND companyid = ?';
commondata.fetch({
	query: {
	statement: query,
	params: company
	}
});


function filterInvites(collection) {
    var data = collection.where({ntype:'Invite'});
    Ti.API.info(data.length);
    $.LeftNavButton.title = data.length;
    return data;
}


function doTransform(model) {
	var o = model.toJSON();
	o.name = o.displayname;
	//var jsondata = JSON.parse(o.namevalue);	
	o.dname = ''; // jsondata.email + " "+ jsondata.mobile;
	o.sorter = o.name + o.dname;
	return o;
}



function loadinvites(){
	var json;
    var xhrlists = Ti.Network.createHTTPClient({
        onload : function() {
            var json, rtdata;
            json = JSON.parse(this.responseText);
            for (var i = 0; i < json.length; i++) {
                rtdata = json[i];
                //Ti.API.info(rtdata);
                createinvite(rtdata);
  			}
  			
            Ti.API.info("Invites updated");
            Ti.API.info(commondata.length);
            fullload = false;
            json = null;
        },
        onerror : function(e) {
            Ti.API.info("STATUS: " + this.status);
            Ti.API.info("TEXT: " + this.responseText);
            Ti.API.info("ERROR: " + e.error);
            Ti.API.info('There was an error retrieving the remote data. Try again.');
            fullload = false;
        },
        timeout : 10000
    });
	var get ='http://rapporr-002.azurewebsites.net/api/InvitesAPI1?c=a74a33a2-7ae4-4c05-b704-099c08fce51e&d=2014-10-18T10:28:02.76&s=83f8f7cde26ed002531f30e55f30ed776573746cd8daaf39347c639ac48e2fad&u=b22f6202-d4c0-4a0a-98c1-8fa5d2af632c';
	
    xhrlists.open("GET", get);
    xhrlists.send();
}

function createinvite(data){
	
        var model = Alloy.createModel('commondata', {
				systemid: data.id,
			    companyid: data.company,
			    searchid: data.id,
			    lastDT: data.modified,
			    ntype: "Invite",
			    tablefieldname: "invite",
			    displayname:data.name,
			    
			    dataType: "json"
			});
			commondata.add(model, { silent: false });
			model.save();
    
   
}


function doRefresh(e){
	loadinvites();
}

$.index.open();