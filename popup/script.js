let saveInput = document.querySelector("#save-tabs input");
let saveButton = document.querySelector('#save-tabs button');

let rootId;
let supportedProtocols = ["https:", "http:", "ftp:", "file:"];


/* Setting bookmarks */
// Get the id of root(tabLoader folder)
// Create root if it not exists
browser.bookmarks.search({title: "tabLoader"})
    .then((res) => {
        if (res.length === 0) {
            browser.bookmarks.create({title: "tabLoader", type: "folder"})
            .then((node) => {
                rootId = node.id;
            });
        } else {
            // It should be guarenteed that
            // There is no other folder named "tabLoader"..
            rootId = res[0].id;
        }
    });


/* Save tabs */
saveButton.addEventListener("click", (e) => {
    browser.tabs.query({ currentWindow: true })
        .then(res => {
            validTabList = [];
            
            // Tab filtering
            res.forEach(tab => {
                let url = document.createElement('a');
                url.href = tab.url;
                
                if (supportedProtocols.includes(url.protocol)) {                    
                    validTabList.push({title: tab.title, url: tab.url});
                }
            });

            
            if (validTabList.length > 0) {
                title = saveInput.value;

                browser.bookmarks.create({title: title, type: "folder", parentId: rootId})
                    .then(node => {
                        validTabList.forEach(tab => {
                            browser.bookmarks.create({title: tab.title, type:"bookmark", url: tab.url, parentId: node.id});
                        });
                    });
            }
        })
});


/* load tabs */